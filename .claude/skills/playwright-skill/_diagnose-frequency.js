const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const apiRequests = [];
  page.on('request', (req) => {
    if (req.url().includes('/api/volunteer')) apiRequests.push({ body: req.postData() });
  });
  const apiResponses = [];
  page.on('response', async (res) => {
    if (res.url().includes('/api/volunteer')) apiResponses.push({ status: res.status(), body: await res.text().catch(() => null) });
  });

  await page.goto('http://localhost:3000/volunteer', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  console.log('=== BEFORE selecting frequency ===');
  const before = await page.evaluate(() => {
    const el = document.querySelector('[name="frequency"]');
    return { exists: !!el, tag: el?.tagName, type: el?.type, name: el?.name, value: el?.value };
  });
  console.log(' ', JSON.stringify(before));

  console.log('\n=== Click frequency dropdown and select "Regularly during election season" ===');
  await page.locator('button[id="frequency"]').click();
  await page.waitForTimeout(200);
  await page.locator('[role="option"]:has-text("Regularly during election season")').first().click();
  await page.waitForTimeout(200);

  console.log('\n=== AFTER selecting frequency ===');
  const after = await page.evaluate(() => {
    const el = document.querySelector('[name="frequency"]');
    return { exists: !!el, tag: el?.tagName, type: el?.type, name: el?.name, value: el?.value };
  });
  console.log(' ', JSON.stringify(after));

  console.log('\n=== FormData snapshot from within the form ===');
  const fd = await page.evaluate(() => {
    const form = document.querySelector('form');
    if (!form) return { error: 'no form' };
    const data = new FormData(form);
    const out = {};
    for (const [k, v] of data.entries()) out[k] = v;
    return out;
  });
  console.log('  frequency in FormData:', JSON.stringify(fd.frequency));
  console.log('  availability in FormData:', JSON.stringify(fd.availability));

  console.log('\n=== Fill remaining required fields and submit ===');
  await page.fill('[name="firstName"]', 'Freq');
  await page.fill('[name="lastName"]', 'Test');
  await page.fill('[name="email"]', 'freq-test@example.com');
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
  await page.locator('button[type="submit"]').first().click();
  await page.waitForFunction(() => !!document.querySelector('[role="status"]'), null, { timeout: 20000 });

  console.log('\n=== Client-side POST body ===');
  const parsed = JSON.parse(apiRequests[0].body);
  console.log('  frequency in POST body:', JSON.stringify(parsed.frequency));
  console.log('  full client payload:', JSON.stringify(parsed));

  console.log('\n=== Server response (includes webhook fan-out statuses) ===');
  console.log(' ', apiResponses[0].body);

  await browser.close();
})();
