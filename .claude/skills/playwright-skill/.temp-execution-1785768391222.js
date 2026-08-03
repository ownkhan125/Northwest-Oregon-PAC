const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'http://localhost:3000/';
const OUT = 'C:\\Users\\General\\Pictures\\Screenshots\\after-fix';

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ headless: true });

  for (const [name, viewport] of [
    ['desktop', { width: 1920, height: 1080 }],
    ['tablet',  { width: 768,  height: 1024 }],
    ['mobile',  { width: 375,  height: 667  }],
  ]) {
    const ctx = await browser.newContext({ viewport });
    const page = await ctx.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `${OUT}\\home-${name}-final.png`, fullPage: false });
    console.log(`Saved home-${name}-final.png`);
    await ctx.close();
  }

  // Final ARIA sanity check
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  const anyProhibited = await page.$$eval('span[aria-label]', (spans) => spans.length);
  const cookieUnderline = await page.$eval(
    '[role="dialog"] p a[href="/privacy-policy"]',
    (a) => getComputedStyle(a).textDecorationLine.includes('underline'),
  ).catch(() => 'not found');
  console.log('span[aria-label] count (should be 0):', anyProhibited);
  console.log('cookie inline link underlined:', cookieUnderline);

  await browser.close();
})();
