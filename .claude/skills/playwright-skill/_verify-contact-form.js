const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text());
  });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  // Track network requests for /api/contact and the upstream webhook
  const apiCalls = [];
  const upstreamCalls = [];
  page.on('request', (req) => {
    const u = req.url();
    if (u.includes('/api/contact')) apiCalls.push({ url: u, method: req.method(), body: req.postData() });
  });
  page.on('response', async (res) => {
    const u = res.url();
    if (u.includes('/api/contact')) {
      let body = null;
      try { body = await res.text(); } catch {}
      apiCalls.push({ response: { url: u, status: res.status(), body } });
    }
  });

  console.log('=== 1. Load /contact ===');
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, 'contact_before.png') });

  console.log('\n=== 2. Verify form fields present ===');
  const fields = ['firstName', 'lastName', 'email', 'phone', 'message', 'sms_updates', 'sms_promo'];
  for (const name of fields) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? 'FOUND' : 'MISSING'}`);
    if (!el) throw new Error(`Missing field: ${name}`);
  }

  // Confirm audience select was removed
  const audience = await page.$('[name="audience"]');
  console.log(`  audience (should be removed): ${audience ? 'STILL PRESENT ❌' : 'REMOVED ✓'}`);

  console.log('\n=== 3. HTML5 validation blocks empty submit ===');
  // Click submit without filling anything
  const submitBtn = page.locator('button[type="submit"]');
  await submitBtn.click();
  await page.waitForTimeout(300);
  const firstNameInvalid = await page.evaluate(() => {
    const el = document.querySelector('[name="firstName"]');
    return el ? el.validity && !el.validity.valid : null;
  });
  console.log(`  firstName invalid after empty submit: ${firstNameInvalid}`);

  console.log('\n=== 4. Fill valid data and submit ===');
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const testData = {
    firstName: 'Playwright',
    lastName: `Test-${stamp}`,
    email: 'playwright-test@example.com',
    phone: '(503) 555-0123',
    message: `Automated Playwright test of the Contact form GHL webhook wiring at ${new Date().toISOString()}.`,
  };
  await page.fill('[name="firstName"]', testData.firstName);
  await page.fill('[name="lastName"]', testData.lastName);
  await page.fill('[name="email"]', testData.email);
  await page.fill('[name="phone"]', testData.phone);
  await page.fill('[name="message"]', testData.message);
  await page.check('[name="sms_updates"]');
  // Leave sms_promo unchecked -> should send "No"
  await page.screenshot({ path: path.join(OUT, 'contact_filled.png') });

  await submitBtn.click();

  // Wait for either success state or error alert
  await page.waitForFunction(
    () => {
      const success = document.querySelector('form') == null;
      const errAlert = document.querySelector('[role="alert"]');
      return success || !!errAlert;
    },
    null,
    { timeout: 15000 },
  );

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'contact_after_submit.png') });

  const successVisible = await page.evaluate(() =>
    !!document.body.textContent?.includes('Thank you. We will be in contact soon.'),
  );
  const errText = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.textContent : null;
  });

  console.log('  success visible:', successVisible);
  console.log('  error text (should be null):', errText);

  console.log('\n=== 5. Network activity ===');
  for (const c of apiCalls) console.log(' ', JSON.stringify(c));

  console.log('\n=== 6. Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none)');

  console.log('\n=== 7. Also probe API directly for invalid input ===');
  const badRes = await page.evaluate(async () => {
    const r = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: '', email: 'bad', message: '' }),
    });
    return { status: r.status, body: await r.text() };
  });
  console.log('  invalid input ->', badRes);

  await browser.close();
  console.log('\n---DONE---');
})();
