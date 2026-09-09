// Verify:
//  (A) Hero image now loads thompson-hero.jpg (not ciatta.png)
//      but candidate cards still use ciatta.png / shannon.png.
//  (B) When hovering any Issues row (rows 0..3), all sibling rows'
//      top borders remain visible (non-transparent color).
const { chromium } = require('playwright');

const URL = 'http://localhost:3003/ciatta-thompson-vs-shannon-jones-isadore';
const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/funnel_playwright';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['light', 'dark'];

const ROW_LABELS = [
  'NEEDLES NEAR SCHOOLS',
  'THE PEARL SHELTER',
  'ADDICTION & MENTAL HEALTH',
  'HOMELESSNESS SPENDING',
  'AFFORDABILITY',
];

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
      await context.addInitScript((th) => {
        try { localStorage.setItem('nwop-theme', th); } catch {}
      }, theme);
      const page = await context.newPage();

      const errors = [];
      page.on('pageerror', (e) => errors.push(String(e.message)));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

      await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(600);

      try {
        const a = page.getByRole('button', { name: /accept/i });
        if (await a.isVisible().catch(() => false)) { await a.click({ timeout: 1500 }); await page.waitForTimeout(300); }
      } catch {}

      // (A) Hero image check
      const heroSrc = await page.evaluate(() => {
        const img = document.querySelector('img[alt*="candidate for Oregon House"]');
        return img ? (img.getAttribute('src') || '').match(/([a-zA-Z0-9._+-]+\.(png|jpg|jpeg|webp))/)?.[1] : null;
      });
      const cardImgs = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs
          .map((i) => (i.getAttribute('src') || '').match(/([a-zA-Z0-9._+-]+\.(png|jpg|jpeg|webp))/)?.[1])
          .filter(Boolean);
      });

      // Screenshot hero at scrollTop 0
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/restore-hero-${theme}-${vp.name}.png`, fullPage: false });

      // (B) Borders check — hover each row and read all other rows' border-top color
      const eyebrow0 = page.getByText(new RegExp(ROW_LABELS[0], 'i')).first();
      await eyebrow0.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.mouse.move(2, 2);
      await page.waitForTimeout(300);

      const borderReport = [];
      for (let hoverIdx = 0; hoverIdx < ROW_LABELS.length; hoverIdx++) {
        const target = page.getByRole('button', { name: new RegExp(ROW_LABELS[hoverIdx], 'i') }).first();
        await target.hover({ position: { x: 100, y: 30 } });
        await page.waitForTimeout(300);

        const state = await page.evaluate((labels) => {
          const out = [];
          for (let i = 0; i < labels.length; i++) {
            const li = document.querySelector(`li[aria-label^="${labels[i]}"]`);
            if (!li) { out.push({ i, missing: true }); continue; }
            const cs = getComputedStyle(li);
            out.push({
              i,
              borderTopColor: cs.borderTopColor,
              borderTopWidth: cs.borderTopWidth,
              isTransparent: /rgba?\(.*,\s*0\)/.test(cs.borderTopColor) || cs.borderTopColor === 'transparent',
            });
          }
          return out;
        }, ROW_LABELS);
        borderReport.push({ hoverRow: hoverIdx, siblings: state });

        // Park mouse to reset before next hover
        await page.mouse.move(2, 2);
        await page.waitForTimeout(150);
      }

      // For rows with i > 0 (they have border-t): border must be visible (not transparent) in EVERY hover state.
      const allBordersVisible = borderReport.every((rpt) =>
        rpt.siblings.every((s) => s.i === 0 || !s.isTransparent),
      );

      rows.push({
        theme,
        vp: vp.name,
        heroSrc,
        cardImgs: [...new Set(cardImgs)],
        allBordersVisible,
        borderReport,
        errors: errors.length,
      });
      console.log(`[${theme}/${vp.name}]  hero=${heroSrc}  bordersVisible=${allBordersVisible}  err=${errors.length}`);
      await context.close();
    }
  }

  await browser.close();

  console.log('\n===== SUMMARY =====');
  for (const r of rows) {
    const heroOk = r.heroSrc === 'thompson-hero.jpg';
    const cardsOk = r.cardImgs.includes('ciatta.png') && r.cardImgs.includes('shannon.png');
    const ok = heroOk && cardsOk && r.allBordersVisible && r.errors === 0;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.theme}/${r.vp}  hero=${r.heroSrc}  cardsHavePNGs=${cardsOk}  bordersVisibleInAllHoverStates=${r.allBordersVisible}  err=${r.errors}`);
    if (!ok) {
      console.log('  detail:', JSON.stringify(r, null, 2));
    }
  }
})();
