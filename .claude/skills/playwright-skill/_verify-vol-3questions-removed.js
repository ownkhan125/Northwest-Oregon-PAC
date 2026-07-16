const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const REMOVED_LABELS = [
  'How would you like to help?',
  'What issue(s) matter most to you?',
  'Do you have relevant experience or skills?',
];

// 8 help checkboxes previously used name pattern `help_${optionName}`
const REMOVED_CHECKBOX_NAMES = [
  'help_Host a Fundraiser',
  'help_Phone Banking',
  'help_Volunteer Coordination',
  'help_Digital/Social Media',
  'help_Door Knocking',
  'help_Host a Meet & Greet',
  'help_Event Planning',
  'help_Media',
];

const EXPECTED_PAYLOAD_KEYS = [
  'firstName', 'lastName', 'email', 'phone', 'zipCode', 'city', 'county', 'region',
  'registeredVoter', 'campaignExperience', 'availability', 'frequency',
  'anythingElse', 'sms_updates', 'sms_promo',
];

const REMOVED_PAYLOAD_KEYS = ['helpOptions', 'issues', 'experience'];

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

  console.log('=== Removed fields not in DOM ===');
  for (const name of ['issues', 'experience', ...REMOVED_CHECKBOX_NAMES]) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  [name="${name}"]: ${el ? '✗ STILL PRESENT' : '✓ removed'}`);
    if (el) throw new Error(`${name} still in DOM`);
  }

  console.log('\n=== Removed labels not on page ===');
  const bodyText = await page.evaluate(() => document.body.textContent || '');
  for (const label of REMOVED_LABELS) {
    const found = bodyText.includes(label);
    console.log(`  "${label}": ${found ? '✗ STILL PRESENT' : '✓ removed'}`);
    if (found) throw new Error(`Label still present: ${label}`);
  }

  console.log('\n=== Kept fields present ===');
  for (const name of ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'city',
                       'sms_updates', 'sms_promo', 'anythingElse']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`Kept field ${name} regressed`);
  }

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Q3');
  await page.fill('[name="lastName"]', 'Removed');
  await page.fill('[name="email"]', 'q3-removed@example.com');
  await page.fill('[name="phone"]', '5035550600');
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
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("1-2 hours/week")').first().click();
  await page.locator('button[id="frequency"]').click();
  await page.locator('[role="option"]:has-text("Occasionally")').first().click();
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  await page.screenshot({ path: path.join(OUT, 'volunteer_3q_removed.png') });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);

  console.log('\n=== Payload verification ===');
  console.log('  keys sent:', Object.keys(parsed).join(', '));
  const stillPresent = REMOVED_PAYLOAD_KEYS.filter((k) => k in parsed);
  console.log('  removed keys still present:', stillPresent.length ? stillPresent.join(',') : '(none) ✓');
  if (stillPresent.length) throw new Error(`Removed keys leaked: ${stillPresent.join(',')}`);

  const missing = EXPECTED_PAYLOAD_KEYS.filter((k) => !(k in parsed));
  console.log('  expected keys missing:', missing.length ? missing.join(',') : '(none) ✓');
  if (missing.length) throw new Error(`Expected keys missing: ${missing.join(',')}`);

  const resBody = JSON.parse(res.body);
  console.log('  response:', res.status, JSON.stringify(resBody));
  if (res.status !== 200 || !resBody.ok) throw new Error('Non-200 or not ok');
  if (!resBody.sms_optin?.ok) throw new Error('SMS opt-in fanout failed');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== 3-QUESTION REMOVAL VERIFIED ✓ ===');
})();
