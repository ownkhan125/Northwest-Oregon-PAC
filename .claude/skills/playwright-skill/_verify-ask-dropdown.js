const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const EXPECTED_OPTIONS = [
  'The PAC and its mission',
  'Policy priorities',
  'Supported candidates',
  'Candidate support',
  'Running for office',
  'Volunteering',
  'Events',
  'Contributions',
  'Media or interview request',
  'Website assistance',
  'Something else',
];

const REMOVED_OPTIONS = [
  'Economic Prosperity & Small Business',
  'Government Accountability & Fiscal Responsibility',
  'Public Safety & Quality of Life',
  'Education & Workforce Development',
  'Affordable, Reliable Energy',
  'Judicial Philosophy',
  'Other',
];

async function runInMode(mode) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: mode,
  });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const apiCalls = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/ask')) apiCalls.push({ dir: 'request', body: req.postData() });
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/ask')) apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
  });

  console.log(`\n============ colorScheme=${mode} ============`);
  await page.goto(BASE + '/ask', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  console.log('-- Open dropdown, verify options --');
  await page.locator('button[id="issue_category"]').click();
  await page.waitForTimeout(200);

  for (const opt of EXPECTED_OPTIONS) {
    const el = await page.$(`[role="option"]:has-text("${opt}")`);
    console.log(`  ✓ "${opt}":`, el ? 'present' : 'MISSING');
    if (!el) throw new Error(`Missing new option: ${opt}`);
  }

  for (const gone of REMOVED_OPTIONS) {
    const el = await page.$(`[role="option"]:has-text("${gone}")`);
    console.log(`  removed "${gone}":`, el ? 'STILL PRESENT ✗' : '✓');
    if (el) throw new Error(`Old option still present: ${gone}`);
  }

  // Total options = 11 real + 1 disabled placeholder ("Choose a category")
  const optionCount = await page.locator('[role="option"]').count();
  const selectableCount = await page.locator('[role="option"]:not([aria-disabled="true"])').count();
  console.log('  total options:', optionCount, '(expect 12 incl. disabled placeholder)');
  console.log('  selectable options:', selectableCount, '(expect 11)');
  if (selectableCount !== EXPECTED_OPTIONS.length) throw new Error(`Wrong selectable count: ${selectableCount}`);

  await page.screenshot({ path: path.join(OUT, `ask_dropdown_${mode}.png`) });

  console.log('\n-- Pick "Media or interview request" and submit --');
  await page.locator('[role="option"]:has-text("Media or interview request")').first().click();
  await page.fill('[name="name"]', 'DropdownTest');
  await page.fill('[name="email"]', 'dropdown-test@example.com');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.fill('[name="issue_subject"]', 'Dropdown option verification');
  await page.fill('[name="issue_description"]', 'Verifying the selected value reaches the webhook.');
  await page.locator('button[type="submit"]:has-text("Submit")').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  const req = apiCalls.find((c) => c.dir === 'request' && c.body);
  const res = apiCalls.find((c) => c.dir === 'response');
  const parsed = JSON.parse(req.body);
  const resBody = JSON.parse(res.body);
  console.log('  issue_category sent:', JSON.stringify(parsed.issue_category));
  console.log('  response:', res.status, '/', JSON.stringify(resBody));
  if (parsed.issue_category !== 'Media or interview request') {
    throw new Error(`Wrong value submitted: ${parsed.issue_category}`);
  }
  if (res.status !== 200 || !resBody.ok) throw new Error('Webhook not 200');
  if (!resBody.sms_optin || !resBody.sms_optin.ok) throw new Error('SMS opt-in fanout failed');

  console.log('\n-- Console errors --');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
}

(async () => {
  try {
    await runInMode('light');
    await runInMode('dark');
  } catch (e) {
    console.error('\n❌ FAILURE:', e.message);
    process.exit(1);
  }
  console.log('\n=== ASK DROPDOWN UPDATE VERIFIED (light + dark) ✓ ===');
})();
