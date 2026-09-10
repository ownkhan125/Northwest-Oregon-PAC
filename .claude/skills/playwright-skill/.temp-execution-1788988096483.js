const { chromium } = require('playwright');

const URL = 'http://localhost:3003/ciatta-thompson-vs-shannon-jones-isadore';
const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/funnel_playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const [theme, size] of [['dark', { w: 1440, h: 900 }], ['dark', { w: 768, h: 1024 }], ['dark', { w: 390, h: 844 }]]) {
    const context = await browser.newContext({
      viewport: { width: size.w, height: size.h },
      colorScheme: theme,
      deviceScaleFactor: 2,
      reducedMotion: 'reduce',
    });
    await context.addInitScript((th) => { try { localStorage.setItem('nwop-theme', th); } catch {} }, theme);
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(500);
    try {
      const a = page.getByRole('button', { name: /accept/i });
      if (await a.isVisible().catch(() => false)) { await a.click({ timeout: 1500 }); await page.waitForTimeout(300); }
    } catch {}

    // Find the section that contains "What Changes at 1,001 Feet?" - the <section> ancestor
    const heading = page.getByRole('heading', { name: /What Changes at 1,001 Feet/i }).first();
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Get section element by evaluating from heading
    const box = await page.evaluate(() => {
      const h2 = [...document.querySelectorAll('h2')].find((h) => /What Changes at 1,001 Feet/i.test(h.textContent || ''));
      if (!h2) return null;
      let section = h2;
      while (section && section.tagName !== 'SECTION') section = section.parentElement;
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      return { top: rect.top + scrollY, height: rect.height, width: rect.width, left: rect.left };
    });

    if (!box) continue;
    console.log(`${theme}/${size.w}x${size.h}  section top=${box.top}, height=${box.height}`);

    // Set viewport to fit the section height for a proper screenshot
    await page.setViewportSize({ width: size.w, height: Math.ceil(box.height) });
    await page.evaluate((topY) => window.scrollTo(0, topY), box.top);
    await page.waitForTimeout(400);
    await page.screenshot({
      path: `${OUT}/thousand-feet-clean-${theme}-${size.w}.png`,
      clip: { x: 0, y: 0, width: size.w, height: Math.ceil(box.height) },
    });
    await context.close();
  }
  await browser.close();
})();
