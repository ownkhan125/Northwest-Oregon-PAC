const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'issue_category',
  'issue_location',
  'issue_subject',
  'issue_description',
  'issue_image',
  'sms_updates',
  'sms_promo',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text());
  });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const apiCalls = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/ask')) {
      apiCalls.push({ dir: 'request', method: req.method(), body: req.postData() });
    }
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/ask')) {
      apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
    }
  });

  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  console.log('=== Field presence ===');
  for (const name of REQUIRED_FIELDS) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? 'FOUND ✓' : 'MISSING ✗'}`);
    if (!el) throw new Error(`Missing field: ${name}`);
  }
  // Legacy fields removed
  for (const legacy of ['fullName', 'zip', 'topic', 'question', 'smsConsent', 'smsCampaign', 'smsPromo']) {
    const el = await page.$(`[name="${legacy}"]`);
    console.log(`  legacy ${legacy}: ${el ? 'STILL PRESENT ✗' : 'REMOVED ✓'}`);
  }

  await page.screenshot({ path: path.join(OUT, 'ask_before.png'), fullPage: false });

  console.log('\n=== HTML5 required blocks empty submit ===');
  const beforeCount = apiCalls.length;
  await page.locator('button[type="submit"]:has-text("Send question")').first().click();
  await page.waitForTimeout(400);
  console.log('  api calls after empty submit:', apiCalls.length - beforeCount, '(expect 0)');

  console.log('\n=== Fill form and submit ===');
  await page.fill('[name="firstName"]', 'Playwright');
  await page.fill('[name="lastName"]', 'AskTest');
  await page.fill('[name="email"]', 'playwright-ask@example.com');
  await page.fill('[name="phone"]', '+1 (503) 555-0180');
  // Custom Select: click trigger button (aria-haspopup=listbox) then click the option
  await page.locator('button[id="issue_category"]').click();
  await page.locator('[role="option"]:has-text("Public Safety & Quality of Life")').first().click();
  await page.fill('[name="issue_location"]', 'Beaverton');
  await page.fill('[name="issue_subject"]', 'Playwright end-to-end verification');
  await page.fill('[name="issue_description"]', 'Automated Playwright verification that the Ask form fires the GHL Issue_Report webhook with all expected fields.');
  // issue_image: leave blank to confirm empty-string flows through
  await page.check('[name="sms_updates"]');
  // leave sms_promo unchecked
  await page.screenshot({ path: path.join(OUT, 'ask_filled.png'), fullPage: false });

  await page.locator('button[type="submit"]:has-text("Send question")').first().click();

  // Wait for success role="status"
  await page
    .waitForFunction(
      () => !!document.querySelector('[role="status"]'),
      null,
      { timeout: 20000 },
    )
    .catch(() => {});

  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'ask_after_submit.png'), fullPage: false });

  const successVisible = await page.evaluate(() => !!document.querySelector('[role="status"]'));
  const errText = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.textContent : null;
  });

  console.log('  success visible:', successVisible);
  console.log('  error text (should be null):', errText);

  console.log('\n=== Network trace ===');
  for (const c of apiCalls) console.log(' ', JSON.stringify(c));

  // Check double-click doesn't produce duplicate submission
  console.log('\n=== Double-click after success (should stay success) ===');
  const cta = page.locator('button[type="submit"]');
  const isDisabled = await cta.first().isDisabled().catch(() => null);
  console.log('  submit button disabled after success:', isDisabled);

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  // Validate the api POST body contains all 11 expected fields with correct sms values
  const reqRow = apiCalls.find((c) => c.dir === 'request' && c.body);
  if (reqRow) {
    let parsed = {};
    try {
      parsed = JSON.parse(reqRow.body);
    } catch {}
    const missing = REQUIRED_FIELDS.filter((k) => !(k in parsed));
    console.log('\n=== Payload field check ===');
    console.log('  missing keys:', missing);
    console.log('  sms_updates:', parsed.sms_updates, '(expect "Yes")');
    console.log('  sms_promo:', parsed.sms_promo, '(expect "No")');
    console.log('  issue_image:', JSON.stringify(parsed.issue_image), '(expect "")');
  }

  await browser.close();
  console.log('\n---DONE---');
})();
