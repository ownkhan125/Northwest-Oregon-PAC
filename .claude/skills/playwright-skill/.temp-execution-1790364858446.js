const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3001/barbara-kahl-vs-suzanne-bonamici';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'mobile-390', width: 390, height: 844 },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  // Pre-set cookie consent so the banner doesn't intercept the screenshot.
  await context.addInitScript(() => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
      localStorage.setItem('cookieConsent', 'accepted');
    } catch {}
  });

  const page = await context.newPage();

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name} ===`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(700);

    // Click Accept if the banner is still there
    try {
      const accept = page.getByRole('button', { name: /accept/i }).first();
      if (await accept.isVisible({ timeout: 800 })) await accept.click();
      await page.waitForTimeout(400);
    } catch {}

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer').first();
    const path = `C:/tmp/kahl-footer2-${vp.name}.png`;
    await footer.screenshot({ path });
    console.log(`Saved ${path}`);
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
