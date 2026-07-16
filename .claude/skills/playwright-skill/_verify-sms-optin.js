const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

async function collectApiCalls(page, apiPath) {
  const calls = [];
  page.on('request', (req) => {
    if (req.url().includes(apiPath)) {
      calls.push({ dir: 'request', method: req.method(), body: req.postData() });
    }
  });
  page.on('response', async (res) => {
    if (res.url().includes(apiPath)) {
      calls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
    }
  });
  return calls;
}

function assertDualWebhookFired(calls, apiPath) {
  const res = calls.find((c) => c.dir === 'response');
  if (!res) throw new Error(`No response captured for ${apiPath}`);
  if (res.status !== 200) throw new Error(`${apiPath} responded ${res.status}`);
  const body = JSON.parse(res.body);
  console.log(`  primary ok: ${body.ok}`);
  console.log(`  sms_optin:`, JSON.stringify(body.sms_optin));
  if (!body.ok) throw new Error(`${apiPath} primary not ok`);
  if (!body.sms_optin) throw new Error(`${apiPath} response missing sms_optin field`);
  if (!body.sms_optin.ok) throw new Error(`${apiPath} SMS opt-in webhook failed`);
  if (body.sms_optin.status !== 200) throw new Error(`${apiPath} SMS opt-in returned ${body.sms_optin.status}`);
  return body;
}

async function testContact(page) {
  console.log('\n============ /contact ============');
  const calls = await collectApiCalls(page, '/api/contact');
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.fill('[name="firstName"]', 'SMS');
  await page.fill('[name="lastName"]', 'ContactDual');
  await page.fill('[name="email"]', 'sms-contact@example.com');
  await page.fill('[name="phone"]', '5035550100');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="help_topic"]').click();
  await page.locator('[role="option"]:has-text("General inquiry")').first().click();
  await page.fill('[name="message"]', 'SMS opt-in dual-webhook fan-out test.');
  await page.check('[name="sms_updates"]');
  await page.check('[name="sms_promo"]');
  await page.locator('button[type="submit"]:has-text("Send message")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  assertDualWebhookFired(calls, '/api/contact');
}

async function testAsk(page) {
  console.log('\n============ /ask ============');
  const calls = await collectApiCalls(page, '/api/ask');
  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.fill('[name="name"]', 'SMS AskDual');
  await page.fill('[name="email"]', 'sms-ask@example.com');
  await page.locator('button[id="issue_category"]').click();
  await page.locator('[role="option"]:has-text("Public Safety")').first().click();
  await page.fill('[name="issue_subject"]', 'SMS fan-out test');
  await page.fill('[name="issue_description"]', 'Verify SMS opt-in fan-out from Ask/Issue Report.');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  assertDualWebhookFired(calls, '/api/ask');
}

async function testVolunteer(page) {
  console.log('\n============ /volunteer ============');
  const calls = await collectApiCalls(page, '/api/volunteer');
  await page.goto(BASE + '/volunteer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.fill('[name="firstName"]', 'SMS');
  await page.fill('[name="lastName"]', 'VolDual');
  await page.fill('[name="email"]', 'sms-vol@example.com');
  await page.fill('[name="phone"]', '5035550200');
  await page.locator('button[id="region"]').click();
  await page.locator('[role="option"]:has-text("Portland Metro")').first().click();
  await page.locator('button[id="registeredVoter"]').click();
  await page.locator('[role="option"]:has-text("Yes")').first().click();
  await page.locator('button[id="campaignExperience"]').click();
  await page.locator('[role="option"]:has-text("None")').first().click();
  await page.check('[name="help_Phone Banking"]');
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("1-2 hours/week")').first().click();
  await page.fill('[name="issues"]', 'Verifying volunteer SMS fanout.');
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  assertDualWebhookFired(calls, '/api/volunteer');
}

async function testEvent(page) {
  console.log('\n============ /events/[id] ============');
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' });
  const href = await page.locator('a[href^="/events/"]').first().getAttribute('href');
  await page.goto(BASE + href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const calls = await collectApiCalls(page, '/api/event');

  await page.fill('[name="firstName"]', 'SMS');
  await page.fill('[name="lastName"]', 'RSVPDual');
  await page.fill('[name="email"]', 'sms-rsvp@example.com');
  await page.locator('button[type="submit"]:has-text("Register")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 25000 });

  assertDualWebhookFired(calls, '/api/event');
}

async function testNoDuplicateSubmission(page) {
  console.log('\n============ No duplicate on rapid double-click ============');
  const calls = await collectApiCalls(page, '/api/contact');
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  await page.fill('[name="firstName"]', 'NoDup');
  await page.fill('[name="lastName"]', 'Test');
  await page.fill('[name="email"]', 'no-dup@example.com');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="help_topic"]').click();
  await page.locator('[role="option"]:has-text("Other")').first().click();
  await page.fill('[name="message"]', 'Duplicate-guard test.');
  const btn = page.locator('button[type="submit"]:has-text("Send message")');
  await Promise.all([btn.click(), btn.click().catch(() => {})]);
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  const requestCount = calls.filter((c) => c.dir === 'request').length;
  console.log('  /api/contact requests fired:', requestCount, '(expect 1)');
  if (requestCount !== 1) throw new Error(`Duplicate submission: ${requestCount} requests`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  try {
    await testContact(page);
    await testAsk(page);
    await testVolunteer(page);
    await testEvent(page);
    await testNoDuplicateSubmission(page);
  } catch (e) {
    console.error('\n❌ FAILURE:', e.message);
    await page.screenshot({ path: path.join(OUT, 'sms_optin_fail.png') });
    await browser.close();
    process.exit(1);
  }

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== SMS OPT-IN FAN-OUT VERIFIED ACROSS ALL FORMS ✓ ===');
})();
