// Verify the "Issues You See Every Day" rows adopt the filled-panel
// hover treatment: transparent → bg-primary + text flip on hover.
// Test on desktop / tablet / mobile in both themes.
const { chromium } = require('playwright');

const URL = 'http://localhost:3003/ciatta-thompson-vs-shannon-jones-isadore';
const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/funnel_playwright';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];
const themes = ['light', 'dark'];

const readRow = (page) =>
  page.evaluate(() => {
    // The row now has role="button" with an aria-label starting with the eyebrow.
    const row = document.querySelector(
      'li[aria-label^="NEEDLES NEAR SCHOOLS"]',
    );
    if (!row) return { found: false };
    const cs = getComputedStyle(row);
    const ps = row.querySelectorAll('p');
    const eyebrow = ps[0];
    const bodyP = ps[1];
    const icon = row.querySelector('span');
    const iconCs = icon ? getComputedStyle(icon) : null;
    return {
      found: true,
      rowBg: cs.backgroundColor,
      rowColor: cs.color,
      rowRadius: cs.borderRadius,
      rowShadow: (cs.boxShadow || 'none').slice(0, 60),
      cursor: cs.cursor,
      eyebrowColor: eyebrow ? getComputedStyle(eyebrow).color : null,
      bodyColor: bodyP ? getComputedStyle(bodyP).color : null,
      iconBg: iconCs?.backgroundColor,
      iconColor: iconCs?.color,
      iconBorder: iconCs?.borderColor,
    };
  });

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
      await page.waitForTimeout(500);

      try {
        const a = page.getByRole('button', { name: /accept/i });
        if (await a.isVisible().catch(() => false)) {
          await a.click({ timeout: 1500 });
          await page.waitForTimeout(300);
        }
      } catch {}

      // Scroll to the issues section
      const eyebrow = page.getByText(/NEEDLES NEAR SCHOOLS/i).first();
      await eyebrow.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);

      // Park mouse so no row is accidentally hovered
      await page.mouse.move(2, 2);
      await page.waitForTimeout(400);
      const rest = await readRow(page);

      // Hover the first row via its aria-labelled role="button"
      const row = page.getByRole('button', {
        name: /NEEDLES NEAR SCHOOLS/i,
      }).first();
      await row.hover({ position: { x: 100, y: 30 } });
      await page.waitForTimeout(650);
      const hover = await readRow(page);

      const shot = `${OUT}/issues-hover-${theme}-${vp.name}.png`;
      // Screenshot just the issues section area (find nearest section)
      const section = eyebrow.locator('..').locator('..').locator('..').locator('..');
      await section.screenshot({ path: shot });

      const bgSwaps = rest && hover && rest.rowBg !== hover.rowBg;
      const textSwaps = rest && hover && rest.rowColor !== hover.rowColor;

      rows.push({ theme, vp: vp.name, rest, hover, bgSwaps, textSwaps, errors: errors.length });
      console.log(`[${theme}/${vp.name}] restBg=${rest?.rowBg}  hoverBg=${hover?.rowBg}  swap=${bgSwaps}  textSwap=${textSwaps}  cursor=${rest?.cursor}  err=${errors.length}`);
      await context.close();
    }
  }

  await browser.close();

  console.log('\n===== SUMMARY =====');
  for (const r of rows) {
    const ok = r.bgSwaps && r.textSwaps && r.errors === 0;
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.theme}/${r.vp}`);
    console.log('  rest  :', JSON.stringify(r.rest));
    console.log('  hover :', JSON.stringify(r.hover));
  }
})();
