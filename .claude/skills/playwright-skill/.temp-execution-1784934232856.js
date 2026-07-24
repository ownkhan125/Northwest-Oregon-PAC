const { chromium } = require('playwright');
const BASE = 'http://localhost:3000';
const OUT = 'C:\\Users\\General\\AppData\\Local\\Temp\\';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/social-media-posts', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const hasLibrary = await page.getByText('THE FULL LIBRARY').count();
  const hasHeading = await page.getByText('10 completed posts').count();
  console.log(`"THE FULL LIBRARY" count: ${hasLibrary} (expect 0)`);
  console.log(`"10 completed posts" count: ${hasHeading} (expect 0)`);
  console.log(`Removal: ${hasLibrary === 0 && hasHeading === 0 ? 'PASS' : 'FAIL'}`);

  // Scroll through to trigger any lazy load and screenshot bottom
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= height; y += 400) {
    await page.evaluate((_y) => window.scrollTo(0, _y), y);
    await page.waitForTimeout(100);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + 'gallery-bottom-after-removal.png' });
  console.log('Saved gallery-bottom-after-removal.png');

  await browser.close();
})();
