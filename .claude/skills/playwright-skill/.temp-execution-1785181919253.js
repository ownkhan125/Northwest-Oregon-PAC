const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1000);
  const text = (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
  const hasPostscript = text.includes('exists to recruit strong candidates');
  console.log('Postscript still present?', hasPostscript);
  await browser.close();
  process.exit(hasPostscript ? 1 : 0);
})();
