const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const ORIGINAL_KEYS = ['name', 'email', 'issue_category', 'issue_location', 'issue_subject', 'issue_description'];
const NEW_KEYS = ['phone', 'city', 'zip_code', 'email_updates'];
const ALL_KEYS = [...ORIGINAL_KEYS, ...NEW_KEYS];

const EMAIL_OPTIN_LABEL = 'Send me occasional updates from Northwest Oregon PAC.';
const OPTIN_HELPER = 'Submitting a question should not add someone to the email list unless this box is selected.';
const DESC_HELPER = 'Please do not include sensitive financial, account, or identification information in your message.';
const PRIVACY_NOTE = 'The information submitted through this form will be used to review and respond to your inquiry.';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
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
  await page.waitForTimeout(500);

  console.log('=== Existing fields still present ===');
  for (const name of ORIGINAL_KEYS) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING (regression)'}`);
    if (!el) throw new Error(`Existing field removed: ${name}`);
  }

  console.log('\n=== New fields added ===');
  for (const name of NEW_KEYS) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`New field missing: ${name}`);
  }

  const bodyText = await page.evaluate(() => document.body.textContent || '');

  console.log('\n=== New helper / opt-in copy present ===');
  console.log('  Email opt-in label:', bodyText.includes(EMAIL_OPTIN_LABEL) ? '✓' : '✗');
  console.log('  Opt-in helper text:', bodyText.includes(OPTIN_HELPER) ? '✓' : '✗');
  console.log('  Description helper: ', bodyText.includes(DESC_HELPER) ? '✓' : '✗');
  console.log('  Privacy note:       ', bodyText.includes(PRIVACY_NOTE) ? '✓' : '✗');
  if (!bodyText.includes(EMAIL_OPTIN_LABEL) || !bodyText.includes(OPTIN_HELPER) ||
      !bodyText.includes(DESC_HELPER) || !bodyText.includes(PRIVACY_NOTE)) {
    throw new Error('New copy missing');
  }

  console.log('\n=== Existing button label preserved ===');
  const btnText = await page.locator('button[type="submit"]').first().innerText();
  console.log('  button:', JSON.stringify(btnText));
  if (!/Submit/i.test(btnText)) throw new Error(`Button label regressed: ${btnText}`);

  console.log('\n=== Existing category options preserved ===');
  await page.locator('button[id="issue_category"]').click();
  const expected = ['Economic Prosperity & Small Business', 'Government Accountability & Fiscal Responsibility',
    'Public Safety & Quality of Life', 'Education & Workforce Development',
    'Affordable, Reliable Energy', 'Judicial Philosophy', 'Other'];
  for (const opt of expected) {
    const el = await page.$(`[role="option"]:has-text("${opt}")`);
    console.log(`  "${opt}": ${el ? '✓' : '✗'}`);
    if (!el) throw new Error(`Existing option removed: ${opt}`);
  }
  await page.locator('[role="option"]:has-text("Public Safety")').first().click();

  console.log('\n=== Fill and submit (all fields, email_updates checked) ===');
  await page.fill('[name="name"]', 'Additive Ask Doe');
  await page.fill('[name="email"]', 'additive-ask@example.com');
  await page.fill('[name="phone"]', '5035550123');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.fill('[name="issue_subject"]', 'Additive Ask verification');
  await page.fill('[name="issue_description"]', 'Verifying additive Ask-form update.');
  await page.check('[name="email_updates"]');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });
  await page.screenshot({ path: path.join(OUT, 'ask_additive.png') });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const missing = ALL_KEYS.filter((k) => !(k in parsed));

  console.log('\n=== Payload verification ===');
  console.log('  keys sent:', Object.keys(parsed).join(', '));
  console.log('  original keys preserved:', ORIGINAL_KEYS.every((k) => k in parsed) ? '✓' : '✗');
  console.log('  new keys added:', NEW_KEYS.every((k) => k in parsed) ? '✓' : '✗');
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  email_updates:', parsed.email_updates, '(expect "Yes")');
  console.log('  phone:', JSON.stringify(parsed.phone));
  console.log('  city:', parsed.city);
  console.log('  zip_code:', parsed.zip_code);
  const resBody = JSON.parse(res.body);
  console.log('  response.ok:', resBody.ok);
  console.log('  response.sms_optin:', JSON.stringify(resBody.sms_optin));
  if (missing.length) throw new Error('Payload missing keys');
  if (res.status !== 200) throw new Error('Non-200 response');
  if (!resBody.sms_optin || !resBody.sms_optin.ok) throw new Error('SMS opt-in webhook fanout failed');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== ADDITIVE ASK UPDATE VERIFIED ✓ ===');
})();
