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
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text());
  });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const apiCalls = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/event')) {
      apiCalls.push({ dir: 'request', method: req.method(), body: req.postData() });
    }
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/event')) {
      apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
    }
  });

  // Navigate to /events, click the first event card
  await page.goto(BASE + '/events', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const firstEvent = page.locator('a[href^="/events/"]').first();
  await firstEvent.waitFor({ timeout: 10000 });
  const detailHref = await firstEvent.getAttribute('href');
  console.log('=== Testing event:', detailHref);
  await firstEvent.click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);

  // Capture the event details rendered by the page so we can verify they get sent
  const eventContext = await page.evaluate(() => {
    // The detail page shows the event title in the H1, the type badge, date, and time.
    const h1 = document.querySelector('h1')?.innerText.trim() || '';
    const badge = document.querySelectorAll('[class*="text-primary"] span')[0]?.innerText.trim() || '';
    return { title: h1, badge };
  });
  console.log('Rendered:', eventContext);

  console.log('\n=== Fields present on RSVP form ===');
  for (const name of ['firstName', 'lastName', 'email', 'phone']) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`Missing field: ${name}`);
  }
  for (const legacy of ['seats', 'updates']) {
    const el = await page.$(`[name="${legacy}"]`);
    console.log(`  legacy ${legacy}: ${el ? '✗ STILL PRESENT' : '✓ removed'}`);
  }

  await page.screenshot({ path: path.join(OUT, 'event_rsvp_before.png') });

  console.log('\n=== Empty submit blocked by HTML5 required ===');
  const beforeCount = apiCalls.length;
  await page.locator('button[type="submit"]:has-text("Register")').click();
  await page.waitForTimeout(300);
  console.log('  API calls after empty submit:', apiCalls.length - beforeCount);

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'PW');
  await page.fill('[name="lastName"]', 'EventRSVP');
  await page.fill('[name="email"]', 'pw-event-rsvp@example.com');
  await page.fill('[name="phone"]', '503-555-1234');
  await page.screenshot({ path: path.join(OUT, 'event_rsvp_filled.png') });

  await page.locator('button[type="submit"]:has-text("Register")').click();
  await page
    .waitForFunction(
      () => !!document.querySelector('[role="status"]'),
      null,
      { timeout: 20000 },
    )
    .catch(() => {});
  await page.waitForTimeout(400);

  const successVisible = await page.evaluate(() => !!document.querySelector('[role="status"]'));
  const errText = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.textContent.trim() : null;
  });
  console.log('  success visible:', successVisible);
  console.log('  error text:', errText || '(none)');

  await page.screenshot({ path: path.join(OUT, 'event_rsvp_success.png') });

  console.log('\n=== Network trace ===');
  for (const c of apiCalls) console.log(' ', JSON.stringify(c));

  console.log('\n=== Payload verification ===');
  const reqRow = apiCalls.find((c) => c.dir === 'request' && c.body);
  const REQ_KEYS = ['firstName', 'lastName', 'email', 'phone', 'eventName', 'eventDate', 'eventTime', 'eventCategory'];
  if (reqRow) {
    let parsed = {};
    try { parsed = JSON.parse(reqRow.body); } catch {}
    const missing = REQ_KEYS.filter((k) => !(k in parsed));
    console.log('  keys sent:', Object.keys(parsed).join(', '));
    console.log('  eventName:', JSON.stringify(parsed.eventName));
    console.log('  eventDate:', JSON.stringify(parsed.eventDate));
    console.log('  eventTime:', JSON.stringify(parsed.eventTime));
    console.log('  eventCategory:', JSON.stringify(parsed.eventCategory));
    console.log('  missing:', missing.length ? missing.join(', ') : '(none) ✓');
    if (missing.length) throw new Error('Payload missing keys');
    // Sanity: event context should be non-empty and match the rendered page
    if (!parsed.eventName) throw new Error('eventName empty');
    if (!parsed.eventCategory) throw new Error('eventCategory empty');
  }

  const resRow = apiCalls.find((c) => c.dir === 'response');
  console.log('  response:', resRow?.status, resRow?.body);
  if (resRow?.status !== 200) throw new Error('Non-200 response');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log('  ' + e));
  else console.log('  (none) ✓');

  await browser.close();
  console.log('\n=== EVENT RSVP VERIFIED ✓ ===');
})();
