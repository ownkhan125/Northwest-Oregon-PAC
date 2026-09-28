const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3001/barbara-kahl-vs-suzanne-bonamici';
const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'mobile-390', width: 390, height: 844 },
];

async function shoot(page, tag) {
  const card = page.locator('[data-vote-card]').nth(1);
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const path = `C:/tmp/votecard-${tag}.png`;
  await card.screenshot({ path });
  console.log(`Saved ${path}`);
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  await context.addInitScript(() => {
    try { localStorage.setItem('cookieConsent', 'accepted'); } catch {}
  });
  const page = await context.newPage();

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate((t) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(t);
      }, theme);
      await page.waitForTimeout(500);

      const card = page.locator('[data-vote-card]').nth(1);
      await card.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Rest state
      await page.mouse.move(0, 0);
      await page.waitForTimeout(600);
      await card.screenshot({ path: `C:/tmp/votecard-${vp.name}-${theme}-rest.png` });
      console.log(`Rest ${vp.name} ${theme}`);

      // Hover state
      await card.hover();
      await page.waitForTimeout(800);
      await card.screenshot({ path: `C:/tmp/votecard-${vp.name}-${theme}-hover.png` });
      console.log(`Hover ${vp.name} ${theme}`);
    }
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
