// Verify:
//  (A) Shannon card is NOT clickable (no <button>, no role=button on wrapper,
//      cursor is not "pointer" on the card).
//  (B) On hover, all card text renders in cream (high-contrast on brown).
const { chromium } = require('playwright');

const URL = 'http://localhost:3003/ciatta-thompson-vs-shannon-jones-isadore';
const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/funnel_playwright';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['light', 'dark'];

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 25 });
  const rows = [];

  for (const theme of themes) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
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

      const heading = page.getByRole('heading', { name: /Two Candidates\. One District\./i }).first();
      await heading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.mouse.move(2, 2);
      await page.waitForTimeout(300);

      // (A) Is Shannon card clickable? Look for a role=button or link with Shannon in name
      const shannonRole = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button, [role="button"], a');
        for (const el of buttons) {
          const txt = (el.textContent || '').trim();
          const label = el.getAttribute('aria-label') || '';
          if (/Shannon Jones Isadore/i.test(txt) && !/See Shannon/i.test(label)) continue;
          if (/Shannon Jones Isadore/i.test(txt) || /Shannon/i.test(label)) {
            return { tag: el.tagName, role: el.getAttribute('role'), label };
          }
        }
        return null;
      });

      // Find Shannon card wrapper
      const cardCsRest = await page.evaluate(() => {
        const h3 = [...document.querySelectorAll('h3')].find((h) => /Shannon Jones Isadore/i.test(h.textContent || ''));
        if (!h3) return null;
        let c = h3;
        while (c && c.getAttribute && c.getAttribute('data-card') !== 'hover') c = c.parentElement;
        if (!c) return null;
        const wrapperCs = getComputedStyle(c.parentElement);
        return { wrapperCursor: wrapperCs.cursor, cardCursor: getComputedStyle(c).cursor };
      });

      // (B) Hover — read all p text colors
      await page.locator('h3').filter({ hasText: /Shannon Jones Isadore/i }).first().hover();
      await page.waitForTimeout(700);
      const hoverColors = await page.evaluate(() => {
        const h3 = [...document.querySelectorAll('h3')].find((h) => /Shannon Jones Isadore/i.test(h.textContent || ''));
        if (!h3) return null;
        let c = h3;
        while (c && c.getAttribute && c.getAttribute('data-card') !== 'hover') c = c.parentElement;
        const ps = c.querySelectorAll('p');
        return Array.from(ps).slice(0, 5).map((p) => getComputedStyle(p).color);
      });

      const shot = `${OUT}/shannon-nonclick-${theme}-${vp.name}.png`;
      const section = heading.locator('..').locator('..');
      await section.screenshot({ path: shot });

      const notClickable = !shannonRole || (shannonRole.tag !== 'BUTTON' && shannonRole.tag !== 'A' && shannonRole.role !== 'button');
      const cursorNotPointer = cardCsRest?.wrapperCursor !== 'pointer' && cardCsRest?.cardCursor !== 'pointer';
      // hover colors: all should be a "cream-ish" — check R > 200 (light)
      const allLightText = hoverColors && hoverColors.every((c) => {
        const m = c.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/);
        if (!m) return false;
        const [, r, g, b] = m.map(Number);
        const luma = (0.299 * r + 0.587 * g + 0.114 * b);
        return luma > 150; // reasonable brightness on brown bg
      });

      rows.push({ theme, vp: vp.name, notClickable, shannonRole, cursorNotPointer, cardCsRest, hoverColors, allLightText });
      console.log(`[${theme}/${vp.name}]  clickable=${!notClickable}  cursorPointer(wrap/card)=${cardCsRest?.wrapperCursor}/${cardCsRest?.cardCursor}  hoverAllLight=${allLightText}`);
      await context.close();
    }
  }

  await browser.close();

  console.log('\n===== SUMMARY =====');
  for (const r of rows) {
    const ok = r.notClickable && r.cursorNotPointer && r.allLightText;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.theme}/${r.vp}  notClickable=${r.notClickable}  cursorNotPointer=${r.cursorNotPointer}  hoverAllLight=${r.allLightText}`);
    if (!ok) console.log('  detail:', JSON.stringify(r, null, 2));
  }
})();
