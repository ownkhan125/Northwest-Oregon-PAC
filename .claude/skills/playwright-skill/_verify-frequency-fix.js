const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';
const CHOSEN_FREQUENCY = 'Regularly during election season';

const EXPECTED_ALIASES = ['frequency', 'helpFrequency', 'howOften'];
const EXPECTED_OTHER_KEYS = [
  'type', 'firstName', 'lastName', 'email', 'phone', 'zipCode', 'city', 'county',
  'region', 'registeredVoter', 'campaignExperience', 'availability',
  'anythingElse', 'sms_updates', 'sms_promo', 'source', 'submitted_at',
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
  await page.waitForTimeout(400);

  console.log('=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Freq');
  await page.fill('[name="lastName"]', 'Fix');
  await page.fill('[name="email"]', 'freq-fix@example.com');
  await page.fill('[name="phone"]', '5035550100');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zipCode"]', '97005');
  await page.locator('button[id="region"]').click();
  await page.locator('[role="option"]:has-text("Portland Metro")').first().click();
  await page.locator('button[id="registeredVoter"]').click();
  await page.locator('[role="option"]:has-text("Yes")').first().click();
  await page.locator('button[id="campaignExperience"]').click();
  await page.locator('[role="option"]:has-text("None")').first().click();
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("1-2 hours/week")').first().click();
  // The field we care about
  await page.locator('button[id="frequency"]').click();
  await page.locator(`[role="option"]:has-text("${CHOSEN_FREQUENCY}")`).first().click();

  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  await page.screenshot({ path: path.join(OUT, 'volunteer_freq_fix.png') });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const clientPayload = JSON.parse(req.body);
  const resBody = JSON.parse(res.body);

  console.log('\n=== Client payload ===');
  console.log('  frequency:', JSON.stringify(clientPayload.frequency));
  if (clientPayload.frequency !== CHOSEN_FREQUENCY) {
    throw new Error(`Client frequency mismatch: ${clientPayload.frequency}`);
  }

  console.log('\n=== Server response ===');
  console.log('  status:', res.status);
  console.log('  primary ok:', resBody.ok);
  console.log('  webhooks:', JSON.stringify(resBody.webhooks));
  console.log('  outgoingPayloadKeys:', resBody.outgoingPayloadKeys.join(', '));

  console.log('\n=== Frequency aliases in outgoing payload ===');
  for (const alias of EXPECTED_ALIASES) {
    const found = resBody.outgoingPayloadKeys.includes(alias);
    console.log(`  ${alias}: ${found ? '✓' : '✗ MISSING'}`);
    if (!found) throw new Error(`Alias ${alias} missing from outgoing payload`);
  }

  console.log('\n=== Other required keys still present ===');
  const missingOthers = EXPECTED_OTHER_KEYS.filter((k) => !resBody.outgoingPayloadKeys.includes(k));
  console.log('  missing:', missingOthers.length ? missingOthers.join(',') : '(none) ✓');
  if (missingOthers.length) throw new Error(`Missing other keys: ${missingOthers.join(',')}`);

  console.log('\n=== All 3 webhooks 2xx ===');
  if (!Array.isArray(resBody.webhooks) || resBody.webhooks.length !== 3) {
    throw new Error(`Expected 3 webhook statuses, got ${resBody.webhooks?.length}`);
  }
  const all2xx = resBody.webhooks.every((s) => s >= 200 && s < 300);
  console.log('  all 200:', all2xx ? '✓' : '✗');
  if (!all2xx) throw new Error(`Not all 2xx: ${resBody.webhooks.join(',')}`);

  console.log('\n=== SMS opt-in fanout ===');
  console.log('  sms_optin:', JSON.stringify(resBody.sms_optin));
  if (!resBody.sms_optin?.ok) throw new Error('SMS opt-in fanout failed');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== FREQUENCY FIELD REACHES ALL 3 WEBHOOKS (frequency + helpFrequency + howOften) ✓ ===');
})();
