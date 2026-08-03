const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3100/';
const OUT = 'C:\\Users\\General\\Pictures\\Screenshots\\after-fix';

(async () => {
  const browser = await chromium.launch({ headless: true });

  const runs = [
    { name: 'light-os-default', colorScheme: 'light' },
    { name: 'dark-os-default', colorScheme: 'dark' },
    { name: 'light-forced', colorScheme: 'dark', seed: 'light' },
    { name: 'dark-forced', colorScheme: 'light', seed: 'dark' },
  ];

  for (const r of runs) {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 200 }, colorScheme: r.colorScheme });
    if (r.seed) await ctx.addInitScript((v) => localStorage.setItem('nwop-theme', v), r.seed);
    const page = await ctx.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'load' });
    await page.waitForTimeout(500);
    const bbox = await page.locator('header a[aria-label*="Home"]').first().boundingBox();
    await page.screenshot({
      path: `${OUT}\\logo-${r.name}.png`,
      clip: bbox
        ? { x: Math.max(0, bbox.x - 20), y: Math.max(0, bbox.y - 20), width: bbox.width + 40, height: bbox.height + 40 }
        : { x: 0, y: 0, width: 320, height: 120 },
    });
    console.log(`Saved logo-${r.name}.png`);
    await ctx.close();
  }

  await browser.close();
})();
