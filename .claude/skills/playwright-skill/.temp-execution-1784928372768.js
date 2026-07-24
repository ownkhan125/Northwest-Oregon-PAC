const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000/guide-to-action';
const OUT = 'C:/Users/General/AppData/Local/Temp';

(async () => {
  const browser = await chromium.launch({ headless: false });

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 667 },
  ];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });
    const page = await context.newPage();

    console.log(`\n=== ${vp.name.toUpperCase()} (${vp.width}x${vp.height}) ===`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });

    const privacyLocator = page.locator('p', { hasText: 'By submitting, you agree' }).first();
    const count = await privacyLocator.count();
    console.log(`Found "By submitting" paragraph: ${count > 0}`);

    if (count === 0) {
      await page.screenshot({ path: `${OUT}/vg-${vp.name}-fullpage.png`, fullPage: true });
      console.log(`Full page saved: ${OUT}/vg-${vp.name}-fullpage.png`);
      await context.close();
      continue;
    }

    await privacyLocator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const styles = await privacyLocator.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        fontSize: cs.fontSize,
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        color: cs.color,
        lineHeight: cs.lineHeight,
        width: rect.width,
        height: rect.height,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        text: el.innerText,
      };
    });

    console.log('Computed styles:', JSON.stringify(styles, null, 2));
    const overflows = styles.scrollWidth > styles.clientWidth + 1;
    const lh = parseFloat(styles.lineHeight) || 20;
    console.log(`Horizontal overflow: ${overflows}`);
    console.log(`Approx line count: ${(styles.height / lh).toFixed(2)}`);

    const box = await privacyLocator.boundingBox();
    if (box) {
      const pad = 40;
      await page.screenshot({
        path: `${OUT}/vg-${vp.name}-privacy.png`,
        clip: {
          x: Math.max(0, box.x - pad),
          y: Math.max(0, box.y - pad),
          width: Math.min(vp.width, box.width + pad * 2),
          height: Math.min(vp.height, box.height + pad * 2),
        },
      });
      console.log(`Cropped: ${OUT}/vg-${vp.name}-privacy.png`);
    }

    await page.screenshot({ path: `${OUT}/vg-${vp.name}-fullpage.png`, fullPage: true });

    await context.close();
  }

  await browser.close();
  console.log('\nDone');
})();
