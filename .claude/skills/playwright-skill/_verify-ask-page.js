const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const HERO_EXPECTED = [
  'ASK NORTHWEST OREGON PAC',
  'Have a question? Start here.',
  'Ask us about our mission, policy priorities, supported candidates, volunteer opportunities, events, contributions, or the process of running for office.',
  'Our team reviews each message and directs it to the appropriate contact.',
];

const HERO_REMOVED = [
  'Our Issues',
  'Five priorities. One region.',
  'Northwest Oregon PAC advances a common-sense agenda focused on prosperity',
];

const PRIORITY_SECTION_REMOVED = [
  'Our position',
  'Why it matters here',
  'ECONOMIC PROSPERITY & SMALL BUSINESS',
  'GOVERNMENT ACCOUNTABILITY & FISCAL RESPONSIBILITY',
  'Economic freedom is the engine of human flourishing.',
  'History offers a clear verdict',
  'Support the mission',
];

const FORM_FIELDS = ['name', 'email', 'phone', 'city', 'zip_code', 'issue_category', 'issue_location', 'issue_subject', 'issue_description', 'email_updates'];

const SUCCESS_EXPECTED = [
  'Thank you for reaching out.',
  'Your question has been submitted to Northwest Oregon PAC.',
  'Our team will review your message and route it to the appropriate person.',
  'Explore Our Priorities',
  'Get Involved',
];

const SUCCESS_REMOVED = [
  'Your question is in.',
  'We’ll be in touch from',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));
  const failed = [];
  page.on('requestfailed', (r) => failed.push(r.url()));

  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const normBody = norm(bodyText);

  console.log('=== Hero content matches doc ===');
  const missingHero = [];
  for (const s of HERO_EXPECTED) {
    const found = normBody.includes(norm(s));
    console.log(`  ${found ? '✓' : '✗'} "${s.slice(0, 70)}${s.length > 70 ? '…' : ''}"`);
    if (!found) missingHero.push(s);
  }

  console.log('\n=== Old hero copy removed ===');
  const leftoverHero = [];
  for (const s of HERO_REMOVED) {
    const found = normBody.includes(norm(s));
    console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${s.slice(0, 70)}${s.length > 70 ? '…' : ''}"`);
    if (found) leftoverHero.push(s);
  }

  console.log('\n=== Priority cards + anti-socialism sections gone ===');
  const priorityLeftover = [];
  for (const s of PRIORITY_SECTION_REMOVED) {
    const found = normBody.includes(norm(s));
    console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${s.slice(0, 70)}${s.length > 70 ? '…' : ''}"`);
    if (found) priorityLeftover.push(s);
  }

  console.log('\n=== Form fields still present (unchanged) ===');
  const missingFields = [];
  for (const name of FORM_FIELDS) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${el ? '✓' : '✗'} [name="${name}"]`);
    if (!el) missingFields.push(name);
  }

  console.log('\n=== Submit button still labeled "Submit" ===');
  const btnText = await page.locator('button[type="submit"]').first().innerText();
  console.log(`  "${btnText}"`);
  if (!/Submit/i.test(btnText)) throw new Error('Submit label changed');

  console.log('\n=== Trigger success state to verify success message ===');
  // Track API calls
  const api = [];
  page.on('request', (req) => { if (req.url().includes('/api/ask')) api.push({ dir: 'req', body: req.postData() }); });
  page.on('response', async (res) => { if (res.url().includes('/api/ask')) api.push({ dir: 'res', status: res.status(), body: await res.text().catch(() => null) }); });

  await page.fill('[name="name"]', 'Ask Verify');
  await page.fill('[name="email"]', 'ask-verify@example.com');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="issue_category"]').click();
  await page.locator('[role="option"]:has-text("Events")').first().click();
  await page.fill('[name="issue_subject"]', 'Verify success message');
  await page.fill('[name="issue_description"]', 'Trigger success state to check copy.');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });
  await page.waitForTimeout(400);

  const successText = await page.evaluate(() => {
    const el = document.querySelector('[role="status"]');
    return el ? el.textContent || '' : '';
  });
  const normSuccess = norm(successText);
  const missingSuccess = [];
  for (const s of SUCCESS_EXPECTED) {
    const found = normSuccess.includes(norm(s));
    console.log(`  ${found ? '✓' : '✗'} "${s}"`);
    if (!found) missingSuccess.push(s);
  }

  console.log('\n=== Old success copy gone ===');
  const leftoverSuccess = [];
  for (const s of SUCCESS_REMOVED) {
    const found = normSuccess.includes(norm(s));
    console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${s}"`);
    if (found) leftoverSuccess.push(s);
  }

  console.log('\n=== CTAs in success card have expected hrefs ===');
  const priHref = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[role="status"] a')).find((a) => (a.textContent || '').trim().toLowerCase().includes('explore our priorities'));
    return el?.getAttribute('href');
  });
  const secHref = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll('[role="status"] a')).find((a) => (a.textContent || '').trim().toLowerCase().includes('get involved'));
    return el?.getAttribute('href');
  });
  console.log(`  Explore Our Priorities → ${priHref}`);
  console.log(`  Get Involved → ${secHref}`);

  console.log('\n=== Server webhook success ===');
  const res = api.find((c) => c.dir === 'res');
  console.log('  response:', res?.status, res?.body);

  await page.screenshot({ path: path.join(OUT, 'ask_success_state.png'), fullPage: false });

  // Layout stability
  const h1 = await page.evaluate(() => document.body.scrollHeight);
  await page.waitForTimeout(400);
  const h2 = await page.evaluate(() => document.body.scrollHeight);
  console.log('\nscrollHeight before/after:', h1, h2, h1 === h2 ? '✓ stable' : '✗ shift');

  console.log('\n=== Failed requests ===');
  if (failed.length) failed.forEach((u) => console.log(' ', u));
  else console.log('  (none) ✓');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  if (missingHero.length) { console.error('❌ Hero missing:', missingHero); process.exit(1); }
  if (leftoverHero.length) { console.error('❌ Old hero:', leftoverHero); process.exit(1); }
  if (priorityLeftover.length) { console.error('❌ Extra sections still present:', priorityLeftover); process.exit(1); }
  if (missingFields.length) { console.error('❌ Form fields missing:', missingFields); process.exit(1); }
  if (missingSuccess.length) { console.error('❌ Success message missing:', missingSuccess); process.exit(1); }
  if (leftoverSuccess.length) { console.error('❌ Old success copy:', leftoverSuccess); process.exit(1); }
  if (consoleErrs.length) process.exit(1);

  await browser.close();
  console.log('\n=== ASK PAGE VERIFIED ✓ ===');
})();
