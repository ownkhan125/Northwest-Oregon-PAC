const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000';
const OUT_DIR = 'C:/Users/General/AppData/Local/Temp/politco-audit-focus';
fs.mkdirSync(OUT_DIR, { recursive: true });

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    const r = document.documentElement;
    r.classList.remove('light', 'dark');
    r.classList.add(t);
    try { localStorage.setItem('nwop-theme', t); } catch (_) {}
  }, theme);
  await page.waitForTimeout(400);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  for (const theme of ['light', 'dark']) {
    await page.goto(TARGET_URL + '/', { waitUntil: 'domcontentloaded' });
    await setTheme(page, theme);
    await page.waitForTimeout(500);

    // Focus screenshots of specific sections
    for (const sel of ['#vision', '#events', '#news', '#donate', 'footer']) {
      const el = await page.$(sel);
      if (!el) continue;
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: path.join(OUT_DIR, `${sel.replace(/[#\.]/g, '')}-${theme}.png`) });
    }

    // Hover on a card to test hover state on `hover:text-primary` links
    await page.goto(TARGET_URL + '/', { waitUntil: 'domcontentloaded' });
    await setTheme(page, theme);
    const link = await page.$('a:has-text("Read the position")');
    if (link) {
      await link.scrollIntoViewIfNeeded();
      await link.hover();
      await page.waitForTimeout(200);
      const parent = await link.evaluateHandle(el => el.closest('div'));
      await parent.asElement()?.screenshot({ path: path.join(OUT_DIR, `hover-read-position-${theme}.png`) });
    }
  }

  console.log('✅ Focus screenshots complete');
  await browser.close();
})();
