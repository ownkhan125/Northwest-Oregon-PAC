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

  console.log('=== Fill and submit exactly once ===');
  await page.fill('[name="firstName"]', 'Dual');
  await page.fill('[name="lastName"]', 'Webhook');
  await page.fill('[name="email"]', 'dual-webhook@example.com');
  await page.fill('[name="phone"]', '5035550700');
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

  // Single click, and try to double-click to prove duplicate-guard works
  const btn = page.locator('button[type="submit"]').first();
  await Promise.all([btn.click(), btn.click().catch(() => {})]);
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  await page.screenshot({ path: path.join(OUT, 'volunteer_dual_webhook.png') });

  console.log('\n=== Client-side submissions ===');
  const requestCount = apiCalls.filter((c) => c.dir === 'request').length;
  console.log('  POST /api/volunteer requests fired:', requestCount, '(expect 1 — no dup)');
  if (requestCount !== 1) throw new Error(`Duplicate submission: ${requestCount}`);

  console.log('\n=== Response body ===');
  const res = apiCalls.find((c) => c.dir === 'response');
  const resBody = JSON.parse(res.body);
  console.log(' ', JSON.stringify(resBody));
  console.log('  status:', res.status);
  console.log('  primary ok:', resBody.ok);
  console.log('  webhooks array:', JSON.stringify(resBody.webhooks));
  console.log('  sms_optin:', JSON.stringify(resBody.sms_optin));

  if (res.status !== 200) throw new Error(`Non-200: ${res.status}`);
  if (!resBody.ok) throw new Error('primary not ok');
  if (!Array.isArray(resBody.webhooks)) throw new Error('webhooks not an array');
  const EXPECTED_WEBHOOK_COUNT = 3;
  if (resBody.webhooks.length !== EXPECTED_WEBHOOK_COUNT) {
    throw new Error(`Expected ${EXPECTED_WEBHOOK_COUNT} webhooks, got ${resBody.webhooks.length}: ${JSON.stringify(resBody.webhooks)}`);
  }
  const all2xx = resBody.webhooks.every((s) => s >= 200 && s < 300);
  console.log(`  all ${EXPECTED_WEBHOOK_COUNT} webhooks 2xx:`, all2xx ? '✓' : '✗');
  if (!all2xx) throw new Error(`Some webhooks failed: ${resBody.webhooks.join(',')}`);
  if (!resBody.sms_optin?.ok) throw new Error('SMS opt-in fanout failed');

  console.log('\n=== Verify payload sent by client is complete ===');
  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const parsed = JSON.parse(req.body);
  const requiredKeys = ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'city',
    'county', 'region', 'registeredVoter', 'campaignExperience', 'availability',
    'frequency', 'anythingElse', 'sms_updates', 'sms_promo'];
  const missing = requiredKeys.filter((k) => !(k in parsed));
  console.log('  keys sent:', Object.keys(parsed).join(', '));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  if (missing.length) throw new Error(`Payload keys missing: ${missing.join(',')}`);

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== DUAL-WEBHOOK FAN-OUT VERIFIED (single submit → both workflows) ✓ ===');
})();
