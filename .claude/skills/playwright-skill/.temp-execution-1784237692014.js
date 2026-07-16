const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const API_PATHS = ['/api/ask', '/api/contact', '/api/volunteer', '/api/event'];

const SPEC = {
  '/api/contact': { workflow: 'Contact_Form', expectedWebhookCount: 1 },
  '/api/ask':     { workflow: 'Issue_Report', expectedWebhookCount: 1 },
  '/api/event':   { workflow: 'Event_RSVP',   expectedWebhookCount: 1 },
  '/api/volunteer': { workflow: 'Volunteer_Form', expectedWebhookCount: 3 },
}

async function trackApi(page) {
  const calls = { byPath: {} };
  for (const p of API_PATHS) calls.byPath[p] = { requests: [], responses: [] };

  page.on('request', (req) => {
    for (const p of API_PATHS) {
      if (req.url().includes(p)) {
        calls.byPath[p].requests.push({ body: req.postData(), url: req.url() });
      }
    }
  });
  page.on('response', async (res) => {
    for (const p of API_PATHS) {
      if (res.url().includes(p)) {
        calls.byPath[p].responses.push({ status: res.status(), body: await res.text().catch(() => null) });
      }
    }
  });
  return calls;
}

function assertOnlyPathHit(calls, expectedPath) {
  for (const p of API_PATHS) {
    const count = calls.byPath[p].requests.length;
    if (p === expectedPath) {
      if (count !== 1) throw new Error(`Expected 1 request to ${p}, got ${count}`);
    } else {
      if (count !== 0) throw new Error(`Cross-triggering: ${p} was hit ${count} times but shouldn't have been`);
    }
  }
}

function assertIsolation(calls, path) {
  const spec = SPEC[path];
  const resp = calls.byPath[path].responses[0];
  if (!resp || resp.status !== 200) throw new Error(`${path} non-200: ${resp?.status}`);
  const body = JSON.parse(resp.body);
  console.log(`  workflow: ${body.workflow} (expect ${spec.workflow})`);
  console.log(`  webhooks: ${JSON.stringify(body.webhooks)} (expect ${spec.expectedWebhookCount} × 200)`);
  console.log(`  sms_optin: ${JSON.stringify(body.sms_optin)}`);
  if (body.workflow !== spec.workflow) throw new Error(`Workflow tag mismatch: ${body.workflow}`);
  if (!Array.isArray(body.webhooks) || body.webhooks.length !== spec.expectedWebhookCount) {
    throw new Error(`Expected ${spec.expectedWebhookCount} webhook(s), got ${body.webhooks?.length}`);
  }
  const all2xx = body.webhooks.every((s) => s >= 200 && s < 300);
  if (!all2xx) throw new Error(`Not all webhooks 2xx: ${body.webhooks.join(',')}`);
  if (!body.sms_optin?.ok) throw new Error(`SMS opt-in failed on ${path}`);
}

async function testContact(page) {
  console.log('\n============ Contact Form ============');
  const calls = await trackApi(page);
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.fill('[name="firstName"]', 'Iso');
  await page.fill('[name="lastName"]', 'Contact');
  await page.fill('[name="email"]', 'iso-contact@example.com');
  await page.fill('[name="phone"]', '5035550100');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="help_topic"]').click();
  await page.locator('[role="option"]:has-text("General inquiry")').first().click();
  await page.fill('[name="message"]', 'isolation test');
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]:has-text("Send message")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });
  assertOnlyPathHit(calls, '/api/contact');
  assertIsolation(calls, '/api/contact');
}

async function testAsk(page) {
  console.log('\n============ Ask Form ============');
  const calls = await trackApi(page);
  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.fill('[name="name"]', 'Iso Ask');
  await page.fill('[name="email"]', 'iso-ask@example.com');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="issue_category"]').click();
  await page.locator('[role="option"]:has-text("Events")').first().click();
  await page.fill('[name="issue_subject"]', 'isolation test');
  await page.fill('[name="issue_description"]', 'isolation test description');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });
  assertOnlyPathHit(calls, '/api/ask');
  assertIsolation(calls, '/api/ask');
}

async function testVolunteer(page) {
  console.log('\n============ Volunteer Form ============');
  const calls = await trackApi(page);
  await page.goto(BASE + '/volunteer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.fill('[name="firstName"]', 'Iso');
  await page.fill('[name="lastName"]', 'Vol');
  await page.fill('[name="email"]', 'iso-vol@example.com');
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
  await page.locator('button[id="frequency"]').click();
  await page.locator('[role="option"]:has-text("Occasionally")').first().click();
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });
  assertOnlyPathHit(calls, '/api/volunteer');
  assertIsolation(calls, '/api/volunteer');
}

async function testEvent(page) {
  console.log('\n============ Event RSVP Form ============');
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' });
  const href = await page.locator('a[href^="/events/"]').first().getAttribute('href');
  await page.goto(BASE + href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const calls = await trackApi(page);
  await page.fill('[name="firstName"]', 'Iso');
  await page.fill('[name="lastName"]', 'RSVP');
  await page.fill('[name="email"]', 'iso-rsvp@example.com');
  await page.locator('button[type="submit"]:has-text("Register")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 25000 });
  assertOnlyPathHit(calls, '/api/event');
  assertIsolation(calls, '/api/event');
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
  } catch (e) {
    console.error('\n❌ ISOLATION FAILURE:', e.message);
    await browser.close();
    process.exit(1);
  }

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== EVERY FORM ISOLATED — no cross-triggering ✓ ===');
})();
