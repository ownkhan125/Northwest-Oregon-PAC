const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3001/mark-norman-vs-tammy-carpenter';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'mobile-390', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
      await page.evaluate((t) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(t);
      }, theme);
      await page.waitForTimeout(500);

      const heading = page.getByText("Don’t Compare the Promises", { exact: false }).first();
      await heading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      const section = page.locator('section', { has: heading }).first();
      const path = `C:/tmp/hd27-v3-${vp.name}-${theme}.png`;
      await section.screenshot({ path });
      console.log(`Saved ${path}`);
    }
  }
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
