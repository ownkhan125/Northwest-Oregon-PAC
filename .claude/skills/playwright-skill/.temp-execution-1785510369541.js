const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000';
const EXPECTED = 'https://www.randallfororegon.com/';
const OUT_DIR = 'C:\\Users\\General\\AppData\\Local\\Temp\\randall-shots';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const pages = [
  { name: 'home', url: '/', section: '#candidates' },
  { name: 'about', url: '/about', section: '#candidates' },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  const warnings = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') warnings.push(`[error] ${msg.text()}`);
  });
  page.on('pageerror', (err) => warnings.push(`[pageerror] ${err.message}`));

  for (const vp of viewports) {
    for (const p of pages) {
      const label = `${p.name}-${vp.name}`;
      console.log(`\n=== ${label} ${vp.width}x${vp.height} ===`);
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TARGET_URL + p.url, { waitUntil: 'networkidle' });

      // Find element containing "Randall" text within the candidates section
      const info = await page.evaluate((sectionSel) => {
        const sec = document.querySelector(sectionSel);
        if (!sec) return { error: `no ${sectionSel}` };
        // find anchor whose href matches randallfororegon.com
        const anchors = Array.from(sec.querySelectorAll('a'));
        const matches = anchors
          .filter((a) => (a.href || '').includes('randallfororegon.com'))
          .map((a) => ({
            href: a.href,
            target: a.getAttribute('target'),
            rel: a.getAttribute('rel'),
            text: (a.textContent || '').trim().slice(0, 100),
            aria: a.getAttribute('aria-label'),
            box: (() => {
              const r = a.getBoundingClientRect();
              return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
            })(),
          }));
        return { matches };
      }, p.section);

      console.log(JSON.stringify(info, null, 2));
      results.push({ label, ...info });

      if (info.matches && info.matches.length) {
        // Scroll Randall link into view and screenshot
        await page.evaluate((sectionSel) => {
          const sec = document.querySelector(sectionSel);
          const anchor = Array.from(sec.querySelectorAll('a')).find((a) =>
            (a.href || '').includes('randallfororegon.com'),
          );
          if (anchor) anchor.scrollIntoView({ block: 'center', behavior: 'instant' });
        }, p.section);
        await page.waitForTimeout(1000);

        const shotPath = path.join(OUT_DIR, `${label}.png`);
        await page.screenshot({ path: shotPath, fullPage: false });
        console.log('  screenshot:', shotPath);

        // Try hovering to confirm hover works (only on desktop)
        if (vp.name === 'desktop') {
          const anchor = page.locator('a[href*="randallfororegon.com"]').first();
          try {
            await anchor.hover({ timeout: 3000 });
            await page.waitForTimeout(400);
            const hoverShot = path.join(OUT_DIR, `${label}-hover.png`);
            await page.screenshot({ path: hoverShot, fullPage: false });
            console.log('  hover screenshot:', hoverShot);
          } catch (e) {
            console.log('  hover skipped:', e.message);
          }
        }

        // Confirm click opens new tab with correct URL (don't actually navigate)
        const anchor = page.locator('a[href*="randallfororegon.com"]').first();
        const target = await anchor.getAttribute('target');
        const rel = await anchor.getAttribute('rel');
        const href = await anchor.getAttribute('href');
        console.log(`  href=${href} target=${target} rel=${rel}`);

        // Verify by intercepting: use context.waitForEvent('page') with click
        try {
          const [popup] = await Promise.all([
            context.waitForEvent('page', { timeout: 5000 }),
            anchor.click({ modifiers: [] }),
          ]);
          console.log('  popup url:', popup.url());
          const finalUrl = popup.url();
          await popup.close();
          results[results.length - 1].opened = finalUrl;
        } catch (e) {
          console.log('  popup wait timed out:', e.message);
        }
      }
    }
  }

  console.log('\n=== WARNINGS ===');
  if (warnings.length === 0) console.log('  (none)');
  else warnings.forEach((w) => console.log('  ' + w));

  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
