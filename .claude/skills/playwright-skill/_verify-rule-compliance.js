const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

// Rule-file-mandated payload keys (excluding source/submitted_at/type which are server-set)
const PAYLOAD_KEYS = {
  contact: ['firstName', 'lastName', 'email', 'phone', 'message', 'sms_updates', 'sms_promo'],
  ask: ['name', 'email', 'issue_category', 'issue_location', 'issue_subject', 'issue_description'],
  volunteer: ['firstName', 'lastName', 'email', 'phone', 'zipCode', 'county', 'region',
    'registeredVoter', 'campaignExperience', 'helpOptions', 'availability', 'issues',
    'anythingElse', 'sms_updates', 'sms_promo'],
  event: ['firstName', 'lastName', 'email', 'phone', 'eventName', 'eventDate', 'eventTime', 'eventCategory'],
};

// A2P consent text snippets (partial match is fine)
const A2P_UPDATES_SNIPPET =
  'By checking this box, I consent to receive campaign updates from Northwest Oregon PAC via automated text messages at the phone number provided.';
const A2P_PROMO_SNIPPET =
  'By checking this box, I consent to receive promotional messages, event invitations, and fundraising communications from Northwest Oregon PAC via automated text messages.';

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

async function testContact(page) {
  console.log('\n============ /contact ============');
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  console.log('A2P Updates label present:', bodyText.includes(A2P_UPDATES_SNIPPET) ? '✓' : '✗');
  console.log('A2P Promo label present:', bodyText.includes(A2P_PROMO_SNIPPET) ? '✓' : '✗');
  if (!bodyText.includes(A2P_UPDATES_SNIPPET) || !bodyText.includes(A2P_PROMO_SNIPPET)) {
    throw new Error('Contact A2P labels missing');
  }
  // Legacy fields must be gone
  for (const legacy of ['organization', 'city', 'zip_code', 'help_topic', 'email_updates']) {
    const el = await page.$(`[name="${legacy}"]`);
    if (el) throw new Error(`Legacy field ${legacy} still present on /contact`);
  }

  const calls = await collectApiCalls(page, '/api/contact');

  await page.fill('[name="firstName"]', 'Rule');
  await page.fill('[name="lastName"]', 'ContactTest');
  await page.fill('[name="email"]', 'rule-contact@example.com');
  await page.fill('[name="phone"]', '5035550100');
  await page.fill('[name="message"]', 'Rule-compliance verification.');
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]:has-text("Send message")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  const req = calls.find((c) => c.dir === 'request' && c.body);
  const res = calls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const missing = PAYLOAD_KEYS.contact.filter((k) => !(k in parsed));
  console.log('  keys:', Object.keys(parsed).join(', '));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  sms_updates:', parsed.sms_updates, '(expect "Yes")');
  console.log('  sms_promo:', parsed.sms_promo, '(expect "No")');
  console.log('  response:', res.status, res.body);
  if (missing.length) throw new Error('contact payload missing keys');
  if (res.status !== 200) throw new Error('contact non-200');
}

async function testAsk(page) {
  console.log('\n============ /ask (Issue_Report) ============');
  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Legacy fields gone
  for (const legacy of ['firstName', 'lastName', 'phone', 'city', 'zip_code', 'question_category', 'question', 'email_updates']) {
    const el = await page.$(`[name="${legacy}"]`);
    if (el) throw new Error(`Legacy field ${legacy} still present on /ask`);
  }
  // Required present
  for (const name of ['name', 'email', 'issue_category', 'issue_location', 'issue_subject', 'issue_description']) {
    const el = await page.$(`[name="${name}"]`);
    if (!el) throw new Error(`Missing field ${name} on /ask`);
  }
  console.log('  fields ✓ / legacy removed ✓');

  const calls = await collectApiCalls(page, '/api/ask');

  await page.fill('[name="name"]', 'Jane Rule Doe');
  await page.fill('[name="email"]', 'rule-ask@example.com');
  await page.locator('button[id="issue_category"]').click();
  await page.locator('[role="option"]:has-text("Public Safety")').first().click();
  await page.fill('[name="issue_location"]', 'Beaverton, OR');
  await page.fill('[name="issue_subject"]', 'Rule-compliance verification');
  await page.fill('[name="issue_description"]', 'Verifying that the Ask form now emits Issue_Report payload.');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 15000 });

  const req = calls.find((c) => c.dir === 'request' && c.body);
  const res = calls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const missing = PAYLOAD_KEYS.ask.filter((k) => !(k in parsed));
  console.log('  keys:', Object.keys(parsed).join(', '));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  name:', parsed.name);
  console.log('  response:', res.status, res.body);
  if (missing.length) throw new Error('ask payload missing keys');
  if (res.status !== 200) throw new Error('ask non-200');
}

async function testVolunteer(page) {
  console.log('\n============ /volunteer ============');
  await page.goto(BASE + '/volunteer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  console.log('A2P Updates label present:', bodyText.includes(A2P_UPDATES_SNIPPET) ? '✓' : '✗');
  console.log('A2P Promo label present:', bodyText.includes(A2P_PROMO_SNIPPET) ? '✓' : '✗');
  if (!bodyText.includes(A2P_UPDATES_SNIPPET) || !bodyText.includes(A2P_PROMO_SNIPPET)) {
    throw new Error('Volunteer A2P labels missing');
  }

  // Confirm all 6 Oregon regions are options
  await page.locator('button[id="region"]').click();
  for (const r of ['Portland Metro', 'Willamette Valley', 'Oregon Coast', 'Central Oregon', 'Eastern Oregon', 'Southern Oregon']) {
    const el = await page.$(`[role="option"]:has-text("${r}")`);
    if (!el) throw new Error(`Missing region option ${r}`);
  }
  await page.keyboard.press('Escape');

  const calls = await collectApiCalls(page, '/api/volunteer');

  await page.fill('[name="firstName"]', 'Rule');
  await page.fill('[name="lastName"]', 'VolTest');
  await page.fill('[name="email"]', 'rule-vol@example.com');
  await page.fill('[name="phone"]', '5035550200');
  await page.fill('[name="zipCode"]', '97005');
  await page.locator('button[id="county"]').click();
  await page.locator('[role="option"]:has-text("Washington")').first().click();
  await page.locator('button[id="region"]').click();
  await page.locator('[role="option"]:has-text("Portland Metro")').first().click();
  await page.locator('button[id="registeredVoter"]').click();
  await page.locator('[role="option"]:has-text("Yes")').first().click();
  await page.locator('button[id="campaignExperience"]').click();
  await page.locator('[role="option"]:has-text("Some Volunteering")').first().click();
  await page.check('[name="help_Phone Banking"]');
  await page.check('[name="help_Door Knocking"]');
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("3-5 hours/week")').first().click();
  await page.fill('[name="issues"]', 'Rule-compliance verification issues.');
  await page.check('[name="sms_updates"]');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  const req = calls.find((c) => c.dir === 'request' && c.body);
  const res = calls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const missing = PAYLOAD_KEYS.volunteer.filter((k) => !(k in parsed));
  console.log('  keys:', Object.keys(parsed).join(', '));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  helpOptions (array):', JSON.stringify(parsed.helpOptions));
  console.log('  region:', parsed.region);
  console.log('  county:', parsed.county);
  console.log('  registeredVoter:', parsed.registeredVoter);
  console.log('  campaignExperience:', parsed.campaignExperience);
  console.log('  availability:', parsed.availability);
  console.log('  sms_updates:', parsed.sms_updates);
  console.log('  response:', res.status, res.body);
  if (missing.length) throw new Error('volunteer payload missing keys');
  if (res.status !== 200) throw new Error('volunteer non-200');
}

async function testEvent(page) {
  console.log('\n============ /events/[id] RSVP ============');
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const firstLink = await page.locator('a[href^="/events/"]').first().getAttribute('href');
  await page.goto(BASE + firstLink, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Phone should be OPTIONAL per rule (no `required` attribute)
  const phoneRequired = await page.evaluate(() => {
    const el = document.querySelector('[name="phone"]');
    return el ? el.hasAttribute('required') : null;
  });
  console.log('phone required (should be false):', phoneRequired);
  if (phoneRequired) throw new Error('phone should be optional per rule');

  // Placeholders per rule spec
  const placeholders = await page.evaluate(() => ({
    firstName: document.querySelector('[name="firstName"]')?.placeholder,
    lastName: document.querySelector('[name="lastName"]')?.placeholder,
    email: document.querySelector('[name="email"]')?.placeholder,
    phone: document.querySelector('[name="phone"]')?.placeholder,
  }));
  console.log('placeholders:', placeholders);
  if (placeholders.firstName !== 'Barbara') throw new Error('firstName placeholder wrong');
  if (placeholders.lastName !== 'Kahl') throw new Error('lastName placeholder wrong');

  const calls = await collectApiCalls(page, '/api/event');

  await page.fill('[name="firstName"]', 'Rule');
  await page.fill('[name="lastName"]', 'RSVPTest');
  await page.fill('[name="email"]', 'rule-rsvp@example.com');
  // Leave phone empty to prove optional
  await page.locator('button[type="submit"]:has-text("Register")').click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 25000 });

  const req = calls.find((c) => c.dir === 'request' && c.body);
  const res = calls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const missing = PAYLOAD_KEYS.event.filter((k) => !(k in parsed));
  console.log('  keys:', Object.keys(parsed).join(', '));
  console.log('  missing:', missing.length ? missing.join(',') : '(none) ✓');
  console.log('  eventName:', parsed.eventName);
  console.log('  phone (should be ""):', JSON.stringify(parsed.phone));
  const resBody = res.body ? JSON.parse(res.body) : {};
  console.log('  response.ok:', resBody.ok);
  console.log('  response.contactId:', resBody.contactId);
  if (missing.length) throw new Error('event payload missing keys');
  if (res.status !== 200) throw new Error('event non-200');
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
    console.error('\n❌ FAILURE:', e.message);
    await page.screenshot({ path: path.join(OUT, 'fail.png'), fullPage: false });
    await browser.close();
    process.exit(1);
  }

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== ALL FOUR FORMS RULE-COMPLIANT ✓ ===');
})();
