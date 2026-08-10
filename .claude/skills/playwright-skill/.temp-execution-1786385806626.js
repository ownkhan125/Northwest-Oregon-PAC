const { chromium, expect } = require('playwright/test');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const EVENT_URL = `${TARGET_URL}/pw-test-event`;
const TEST_EMAIL = 'usertestingop1776@gmail.com';
const TEST_PHONE = '5035550123';

const VIEWPORTS = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 390, height: 844 },
];

const results = [];
function record(form, viewport, check, pass, detail = '') {
  const s = pass ? '✅' : '❌';
  console.log(`${s} [${viewport}][${form}] ${check}${detail ? ' — ' + detail : ''}`);
  results.push({ form, viewport, check, pass, detail });
}

async function stubApis(page) {
  await page.route('**/api/**', (route) =>
    route.request().method() === 'POST'
      ? route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true }) })
      : route.continue(),
  );
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await stubApis(page);

    try {
      await page.goto(EVENT_URL, { waitUntil: 'domcontentloaded' });
      await page.locator('form').first().waitFor({ timeout: 15000 });

      const smsUpdates = page.locator('input[name="sms_updates"]');
      const smsPromo = page.locator('input[name="sms_promo"]');

      record('EventRSVP', vp.name, 'SMS Updates checkbox exists', (await smsUpdates.count()) === 1);
      record('EventRSVP', vp.name, 'SMS Promo checkbox exists', (await smsPromo.count()) === 1);
      record('EventRSVP', vp.name, 'SMS Updates disabled with no phone', await smsUpdates.isDisabled());
      record('EventRSVP', vp.name, 'SMS Promo disabled with no phone', await smsPromo.isDisabled());

      const phoneInput = page.locator('input[name="phone"]');
      await phoneInput.click();
      await phoneInput.pressSequentially(TEST_PHONE, { delay: 30 });

      let enabled = false;
      try {
        await expect(smsUpdates).toBeEnabled({ timeout: 3000 });
        await expect(smsPromo).toBeEnabled({ timeout: 3000 });
        enabled = true;
      } catch {}
      const phoneVal = await phoneInput.inputValue();
      record('EventRSVP', vp.name, 'SMS Updates enabled after phone entry', enabled, `phone="${phoneVal}"`);
      record('EventRSVP', vp.name, 'SMS Promo enabled after phone entry', !(await smsPromo.isDisabled()));

      const smsUpdatesRequired = await smsUpdates.evaluate((el) => el.required);
      const smsPromoRequired = await smsPromo.evaluate((el) => el.required);
      record('EventRSVP', vp.name, 'SMS Updates NOT required (even with phone)', !smsUpdatesRequired);
      record('EventRSVP', vp.name, 'SMS Promo NOT required (even with phone)', !smsPromoRequired);

      await page.fill('input[name="firstName"]', 'Test');
      await page.fill('input[name="lastName"]', 'User');
      await page.fill('input[name="email"]', TEST_EMAIL);

      record('EventRSVP', vp.name, 'SMS Updates unchecked before submit', !(await smsUpdates.isChecked()));
      record('EventRSVP', vp.name, 'SMS Promo unchecked before submit', !(await smsPromo.isChecked()));

      const formValid = await page.evaluate(() => {
        const form = document.querySelector('form');
        const invalid = [];
        for (const el of form.elements) {
          if (el.willValidate && !el.checkValidity()) invalid.push(el.name || el.type);
        }
        return { valid: form.checkValidity(), invalid };
      });
      record(
        'EventRSVP',
        vp.name,
        'Form is valid without SMS opt-in checked',
        formValid.valid,
        formValid.valid ? '' : 'invalid: ' + formValid.invalid.join(', '),
      );

      const submit = page.locator('form button[type="submit"]').first();
      const respPromise = page
        .waitForResponse((r) => r.url().includes('/api/'), { timeout: 8000 })
        .catch(() => null);
      await submit.click();
      const resp = await respPromise;

      let ok = false;
      try {
        await Promise.race([
          page.locator('[role="status"]').first().waitFor({ state: 'visible', timeout: 6000 }),
          page.waitForFunction(() => !document.querySelector('form button[type="submit"]'), null, {
            timeout: 6000,
          }),
        ]);
        ok = true;
      } catch {}
      record(
        'EventRSVP',
        vp.name,
        'Form submitted successfully without SMS opt-in',
        ok,
        resp ? `api status=${resp.status()}` : 'no /api/ response',
      );
    } catch (e) {
      record('EventRSVP', vp.name, 'Test run without exception', false, e.message.split('\n')[0]);
    }

    await context.close();
  }

  await browser.close();
  const failures = results.filter((r) => !r.pass);
  console.log(`\nSummary: ${results.length - failures.length}/${results.length} checks passed`);
  if (failures.length) {
    console.log('\nFailures:');
    failures.forEach((f) => console.log(`  ❌ [${f.viewport}] ${f.check} ${f.detail}`));
    process.exit(1);
  } else {
    console.log('All checks passed ✅');
  }
})().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
