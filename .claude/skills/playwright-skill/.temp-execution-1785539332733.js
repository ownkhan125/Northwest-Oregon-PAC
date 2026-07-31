const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:3000';
const LABEL = process.env.LABEL || 'after3';
const OUT_DIR = `C:\\Users\\General\\AppData\\Local\\Temp\\perf-${LABEL}`;
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const pages = [
  { name: 'home', url: '/' },
  { name: 'about', url: '/about' },
  { name: 'contact', url: '/contact' },
  { name: 'faq', url: '/faq' },
  { name: 'privacy', url: '/privacy-policy' },
  { name: 'terms', url: '/terms-of-service' },
];

async function forceAllImagesEagerAndWait(page) {
  // Convert every img to eager loading, re-trigger loads if needed,
  // then wait until every img reports naturalWidth > 0 (or empty src).
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    imgs.forEach((img) => {
      try {
        img.loading = 'eager';
        img.decoding = 'sync';
        // Re-assign currentSrc via srcset by touching sizes; nudge browser to fetch
        if (!img.complete || img.naturalWidth === 0) {
          const s = img.src;
          img.src = '';
          img.src = s;
        }
      } catch {}
    });
    // Wait a tick
    await new Promise((r) => setTimeout(r, 100));
  });

  await page.waitForFunction(
    () => {
      const imgs = Array.from(document.images);
      if (imgs.length === 0) return true;
      return imgs.every((img) => {
        if (!img.src && !img.currentSrc) return true;
        return img.complete && img.naturalWidth > 0;
      });
    },
    { timeout: 45000 },
  );
}

async function incrementalScroll(page) {
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = 300;
  for (let y = 0; y < totalHeight + step; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(150);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  const metrics = {};
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    for (const p of pages) {
      const t0 = Date.now();
      await page.goto(BASE + p.url, { waitUntil: 'networkidle' });
      const loaded = Date.now() - t0;

      await page.evaluate(() => {
        try { localStorage.setItem('nwop_cookie_consent', 'accepted'); } catch {}
      });
      await page.reload({ waitUntil: 'networkidle' });

      // Let motion + hydration settle
      await page.waitForTimeout(1200);

      // Scroll to trigger whileInView animations & intersection observers
      await incrementalScroll(page);

      // Force lazy images and wait until every img is fully painted
      try {
        await forceAllImagesEagerAndWait(page);
      } catch (e) {
        console.warn(`  WARN ${p.name}-${vp.name} image wait: ${e.message}`);
      }

      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);

      const shotPath = path.join(OUT_DIR, `${p.name}-${vp.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });

      const perf = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] || {};
        const paint = performance.getEntriesByType('paint');
        return {
          fcp: paint.find((e) => e.name === 'first-contentful-paint')?.startTime,
          domContentLoaded: nav.domContentLoadedEventEnd,
          load: nav.loadEventEnd,
          transferSize: nav.transferSize,
          decodedBodySize: nav.decodedBodySize,
        };
      });
      metrics[`${p.name}-${vp.name}`] = { loaded, ...perf };
      console.log(`${p.name}-${vp.name}: loaded=${loaded}ms fcp=${Math.round(perf.fcp||0)}ms`);
    }
    await context.close();
  }
  fs.writeFileSync(path.join(OUT_DIR, 'metrics.json'), JSON.stringify(metrics, null, 2));
  console.log('\nMetrics saved:', path.join(OUT_DIR, 'metrics.json'));
  await browser.close();
})();
