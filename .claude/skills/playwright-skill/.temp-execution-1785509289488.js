const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000';
const OUT_DIR = 'C:\\Users\\General\\AppData\\Local\\Temp\\about-shots-v3';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name.toUpperCase()} ${vp.width}x${vp.height} ===`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

    // Scroll image into view center
    await page.evaluate(() => {
      const img = document.querySelector('#about img');
      if (img) img.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    // Now take viewport screenshot
    const shotPath = path.join(OUT_DIR, `${vp.name}-viewport.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log('  viewport:', shotPath);
  }

  await browser.close();
})();
