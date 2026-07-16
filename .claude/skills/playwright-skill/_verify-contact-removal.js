const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const EXPECTED_KEYS = [
  'firstName', 'lastName', 'email', 'phone',
  'organization', 'city', 'zip_code', 'help_topic', 'message',
  'sms_updates', 'sms_promo',
];

const EMAIL_UPDATES_LABEL = 'I would also like to receive email updates from Northwest Oregon PAC.';
const A2P_UPDATES_SNIPPET =
  'By checking this box, I consent to receive campaign updates from Northwest Oregon PAC via automated text messages at the phone number provided.';
const A2P_PROMO_SNIPPET =
  'By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Northwest Oregon PAC via automated text messages.';

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

  console.log('=== email_updates checkbox removed ===');
  const emailCheckbox = await page.$('[name="email_updates"]');
  console.log('  DOM element [name="email_updates"]:', emailCheckbox ? '✗ STILL PRESENT' : '✓ removed');
  if (emailCheckbox) throw new Error('email_updates checkbox still in DOM');

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  console.log('  Label copy present:', bodyText.includes(EMAIL_UPDATES_LABEL) ? '✗ STILL PRESENT' : '✓ removed');
  if (bodyText.includes(EMAIL_UPDATES_LABEL)) throw new Error('Label copy still on page');

  console.log('\n=== A2P consent checkboxes preserved ===');
  const smsUpdates = await page.$('[name="sms_updates"]');
  const smsPromo = await page.$('[name="sms_promo"]');
  console.log('  sms_updates:', smsUpdates ? '✓' : '✗');
  console.log('  sms_promo: ', smsPromo ? '✓' : '✗');
  console.log('  A2P Updates label present:', bodyText.includes(A2P_UPDATES_SNIPPET) ? '✓' : '✗');
  console.log('  A2P Promo label present:  ', bodyText.includes(A2P_PROMO_SNIPPET) ? '✓' : '✗');
  if (!smsUpdates || !smsPromo || !bodyText.includes(A2P_UPDATES_SNIPPET) || !bodyText.includes(A2P_PROMO_SNIPPET)) {
    throw new Error('A2P consent regressed');
  }

  console.log('\n=== Other fields still intact ===');
  for (const name of ['firstName', 'lastName', 'email', 'phone', 'organization', 'city', 'zip_code', 'help_topic', 'message']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`Field ${name} missing`);
  }

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Removal');
  await page.fill('[name="lastName"]', 'Test');
  await page.fill('[name="email"]', 'removal-test@example.com');
  await page.fill('[name="phone"]', '5035550400');
  await page.fill('[name="organization"]', 'Post-removal QA');
  await page.fill('[name="city"]', 'Portland');
  await page.fill('[name="zip_code"]', '97205');
  await page.locator('button[id="help_topic"]').click();
  await page.locator('[role="option"]:has-text("General inquiry")').first().click();
  await page.fill('[name="message"]', 'Verifying email_updates removal.');
  await page.check('[name="sms_updates"]');
  await page.check('[name="sms_promo"]');
  await page.locator('button[type="submit"]:has-text("Send message")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  await page.screenshot({ path: path.join(OUT, 'contact_removal.png') });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);

  console.log('\n=== Payload verification ===');
  console.log('  keys sent:', Object.keys(parsed).join(', '));
  const missing = EXPECTED_KEYS.filter((k) => !(k in parsed));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  email_updates in payload:', 'email_updates' in parsed ? '✗ STILL PRESENT' : '✓ absent');
  if ('email_updates' in parsed) throw new Error('email_updates leaked to payload');
  if (missing.length) throw new Error('Payload missing keys');
  console.log('  sms_updates:', parsed.sms_updates, '(expect "Yes")');
  console.log('  sms_promo:', parsed.sms_promo, '(expect "Yes")');
  console.log('  response:', res.status, res.body);
  if (res.status !== 200) throw new Error('Non-200 response');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== EMAIL_UPDATES REMOVAL VERIFIED ✓ ===');
})();
