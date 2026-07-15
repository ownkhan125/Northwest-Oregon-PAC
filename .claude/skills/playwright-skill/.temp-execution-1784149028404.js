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
    if (req.url().includes('/api/contact')) {
      apiCalls.push({ method: req.method(), body: req.postData() });
    }
  });
  page.on('response', async (res) => {
    if (res.url().includes('/api/contact')) {
      apiCalls.push({ status: res.status(), body: await res.text().catch(() => null) });
    }
  });

  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('=== Empty submit ===');
  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(400);
  // Confirm no POST was made — HTML5 required should have blocked it
  console.log('  API calls after empty submit:', apiCalls.length);

  console.log('\n=== Fill and submit ===');
  await page.fill('[name="firstName"]', 'Playwright');
  await page.fill('[name="lastName"]', 'Final-Verification');
  await page.fill('[name="email"]', 'playwright-final@example.com');
  await page.fill('[name="phone"]', '(503) 555-0100');
  await page.fill('[name="message"]', 'Final Playwright verification of the wired-up GHL Contact form after removing noValidate.');
  await page.check('[name="sms_updates"]');
  await page.check('[name="sms_promo"]');

  await page.locator('button[type="submit"]').click();

  await page.waitForFunction(
    () => !!document.body.textContent?.includes('Thank you. We will be in contact soon.'),
    null,
    { timeout: 15000 },
  );

  await page.screenshot({ path: path.join(OUT, 'contact_final_success.png') });

  console.log('\n=== Network trace ===');
  for (const c of apiCalls) console.log(' ', JSON.stringify(c));

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  await browser.close();
})();
