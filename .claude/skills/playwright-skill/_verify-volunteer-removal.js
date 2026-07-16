const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const REMOVED_LABELS = [
  'I understand that submitting this form expresses interest and does not guarantee a specific volunteer assignment.',
  'I agree to receive volunteer and organizational updates from Northwest Oregon PAC.',
];

const KEEP_LABELS = [
  'By checking this box, I consent to receive campaign updates from Northwest Oregon PAC via automated text messages at the phone number provided.',
  'By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Northwest Oregon PAC via automated text messages.',
];

const EXPECTED_PAYLOAD_KEYS = [
  'firstName', 'lastName', 'email', 'phone', 'zipCode', 'city', 'county', 'region',
  'registeredVoter', 'campaignExperience', 'helpOptions', 'availability', 'frequency',
  'issues', 'experience', 'anythingElse', 'sms_updates', 'sms_promo',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const apiCalls = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/volunteer')) apiCalls.push({ dir: 'request', body: req.postData() });
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/volunteer')) apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
  });

  await page.goto(BASE + '/volunteer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('=== Removed checkboxes ===');
  for (const name of ['acknowledgment', 'email_consent']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  [name="${name}"]: ${el ? '✗ STILL PRESENT' : '✓ removed'}`);
    if (el) throw new Error(`${name} still in DOM`);
  }

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  for (const label of REMOVED_LABELS) {
    const found = bodyText.includes(label);
    console.log(`  label present: ${found ? '✗ STILL PRESENT' : '✓ removed'} — "${label.slice(0, 60)}…"`);
    if (found) throw new Error('Removed label still on page');
  }

  console.log('\n=== A2P SMS consent checkboxes preserved ===');
  for (const name of ['sms_updates', 'sms_promo']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}:`, el ? '✓' : '✗');
    if (!el) throw new Error(`SMS consent ${name} regressed`);
  }
  for (const label of KEEP_LABELS) {
    console.log('  A2P label:', bodyText.includes(label) ? '✓' : '✗');
    if (!bodyText.includes(label)) throw new Error('A2P label regressed');
  }

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Removal');
  await page.fill('[name="lastName"]', 'VolTest');
  await page.fill('[name="email"]', 'removal-vol@example.com');
  await page.fill('[name="phone"]', '5035550500');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zipCode"]', '97005');
  await page.locator('button[id="county"]').click().catch(() => {});
  await page.locator('[role="option"]:has-text("Washington")').first().click().catch(() => {});
  await page.locator('button[id="region"]').click();
  await page.locator('[role="option"]:has-text("Portland Metro")').first().click();
  await page.locator('button[id="registeredVoter"]').click();
  await page.locator('[role="option"]:has-text("Yes")').first().click();
  await page.locator('button[id="campaignExperience"]').click();
  await page.locator('[role="option"]:has-text("None")').first().click();
  await page.check('[name="help_Phone Banking"]');
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("1-2 hours/week")').first().click();
  await page.locator('button[id="frequency"]').click().catch(() => {});
  await page.locator('[role="option"]:has-text("Occasionally")').first().click().catch(() => {});
  await page.fill('[name="issues"]', 'Verifying acknowledgment/email_consent removal.');
  await page.check('[name="sms_updates"]');
  // Submit — no acknowledgment needed anymore
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  await page.screenshot({ path: path.join(OUT, 'volunteer_removal.png') });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);

  console.log('\n=== Payload verification ===');
  console.log('  keys sent:', Object.keys(parsed).join(', '));
  const acknowledgmentGone = !('acknowledgment' in parsed);
  const emailConsentGone = !('email_consent' in parsed);
  console.log('  acknowledgment absent:', acknowledgmentGone ? '✓' : '✗');
  console.log('  email_consent absent: ', emailConsentGone ? '✓' : '✗');
  if (!acknowledgmentGone) throw new Error('acknowledgment leaked to payload');
  if (!emailConsentGone) throw new Error('email_consent leaked to payload');

  const missing = EXPECTED_PAYLOAD_KEYS.filter((k) => !(k in parsed));
  console.log('  expected keys missing:', missing.length ? missing.join(',') : '(none) ✓');
  if (missing.length) throw new Error('expected keys missing from payload');

  console.log('  sms_updates:', parsed.sms_updates, '(expect "Yes")');
  console.log('  sms_promo:', parsed.sms_promo, '(expect "No")');
  const resBody = JSON.parse(res.body);
  console.log('  response:', res.status, JSON.stringify(resBody));
  if (res.status !== 200) throw new Error('non-200 response');
  if (!resBody.ok) throw new Error('primary not ok');
  if (!resBody.sms_optin?.ok) throw new Error('SMS opt-in fanout failed');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== VOLUNTEER CHECKBOX REMOVAL VERIFIED ✓ ===');
})();
