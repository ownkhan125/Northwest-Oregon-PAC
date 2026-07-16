const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

// The complete key set now expected in the Contact payload — original fields
// (must be preserved) plus the newly added ones from the spec.
const ORIGINAL_KEYS = ['firstName', 'lastName', 'email', 'phone', 'message', 'sms_updates', 'sms_promo'];
const NEW_KEYS = ['organization', 'city', 'zip_code', 'help_topic', 'email_updates'];
const ALL_KEYS = [...ORIGINAL_KEYS, ...NEW_KEYS];

const A2P_UPDATES_SNIPPET =
  'By checking this box, I consent to receive campaign updates from Northwest Oregon PAC via automated text messages at the phone number provided.';
const A2P_PROMO_SNIPPET =
  'By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Northwest Oregon PAC via automated text messages.';
const EMAIL_UPDATES_LABEL = 'I would also like to receive email updates from Northwest Oregon PAC.';
const HELPER_TEXT = 'Provide any names, dates, districts, or other details that will help us understand your inquiry.';
const PRIVACY_NOTE = 'We use the information submitted through this form to review and respond to your inquiry.';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const apiCalls = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/contact')) {
      apiCalls.push({ dir: 'request', method: req.method(), body: req.postData() });
    }
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/contact')) {
      apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
    }
  });

  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('=== Existing fields still present ===');
  for (const name of ['firstName', 'lastName', 'email', 'phone', 'message', 'sms_updates', 'sms_promo']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓ present' : '✗ MISSING (regression!)'}`);
    if (!el) throw new Error(`Existing field removed: ${name}`);
  }

  console.log('\n=== New fields added ===');
  for (const name of ['organization', 'city', 'zip_code', 'help_topic', 'email_updates']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`New field missing: ${name}`);
  }

  console.log('\n=== Existing A2P labels preserved verbatim ===');
  const bodyText = await page.evaluate(() => document.body.textContent || '');
  console.log('A2P Updates: ', bodyText.includes(A2P_UPDATES_SNIPPET) ? '✓' : '✗');
  console.log('A2P Promo:   ', bodyText.includes(A2P_PROMO_SNIPPET) ? '✓' : '✗');
  if (!bodyText.includes(A2P_UPDATES_SNIPPET) || !bodyText.includes(A2P_PROMO_SNIPPET)) {
    throw new Error('A2P labels regressed');
  }

  console.log('\n=== New helper / privacy / email-consent copy present ===');
  console.log('Message helper:', bodyText.includes(HELPER_TEXT) ? '✓' : '✗');
  console.log('Email consent label:', bodyText.includes(EMAIL_UPDATES_LABEL) ? '✓' : '✗');
  console.log('Privacy note:', bodyText.includes(PRIVACY_NOTE) ? '✓' : '✗');
  if (!bodyText.includes(HELPER_TEXT) || !bodyText.includes(EMAIL_UPDATES_LABEL) || !bodyText.includes(PRIVACY_NOTE)) {
    throw new Error('New copy missing');
  }

  console.log('\n=== Existing button label preserved ===');
  const btnText = await page.locator('button[type="submit"]').first().innerText();
  console.log('  button:', JSON.stringify(btnText));
  if (!/Send message/i.test(btnText)) throw new Error(`Button label regressed: ${btnText}`);

  console.log('\n=== Confirm 10 dropdown options match spec ===');
  await page.locator('button[id="help_topic"]').click();
  const expected = ['General inquiry', 'Candidate support', 'Running for office', 'Volunteer opportunity',
    'Event information', 'Host an event', 'Contribution question', 'Media or interview request',
    'Website assistance', 'Other'];
  for (const opt of expected) {
    const el = await page.$(`[role="option"]:has-text("${opt}")`);
    console.log(`  "${opt}": ${el ? '✓' : '✗'}`);
    if (!el) throw new Error(`Missing dropdown option: ${opt}`);
  }
  await page.locator(`[role="option"]:has-text("Event information")`).first().click();

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Additive');
  await page.fill('[name="lastName"]', 'Test');
  await page.fill('[name="email"]', 'additive-test@example.com');
  await page.fill('[name="phone"]', '5035550300');
  await page.fill('[name="organization"]', 'NW Oregon QA');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.fill('[name="message"]', 'Verifying additive Contact-form update.');
  await page.check('[name="email_updates"]');
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]:has-text("Send message")').click();

  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });
  await page.screenshot({ path: path.join(OUT, 'contact_additive.png') });

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
  console.log('  sms_updates:', parsed.sms_updates, '(expect "Yes")');
  console.log('  sms_promo:', parsed.sms_promo, '(expect "No")');
  console.log('  help_topic:', parsed.help_topic);
  console.log('  organization:', parsed.organization);
  console.log('  city:', parsed.city);
  console.log('  zip_code:', parsed.zip_code);
  console.log('  response:', res.status, res.body);
  if (missing.length) throw new Error('Payload missing keys');
  if (res.status !== 200) throw new Error('Non-200 response');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== ADDITIVE CONTACT UPDATE VERIFIED ✓ ===');
})();
