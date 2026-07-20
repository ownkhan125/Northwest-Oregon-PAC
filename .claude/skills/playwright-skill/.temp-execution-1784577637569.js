const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3004';
const PAGES = [
  '/', '/about', '/ask', '/blogs', '/contact', '/donate', '/events',
  '/faq', '/funnel', '/privacy-policy', '/social-posts', '/terms-of-service',
  '/volunteer',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  // Emulate a modern Chrome that accepts AVIF (all modern Chromes do)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    extraHTTPHeaders: { Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8' },
  });
  const page = await context.newPage();

  const errors = [];
  const failed = [];
  page.on('pageerror', (e) => errors.push({ type: 'pageerror', msg: e.message, url: page.url() }));
  page.on('console', (m) => { if (m.type() === 'error') errors.push({ type: 'console.error', msg: m.text(), url: page.url() }); });
  page.on('response', (r) => { if (r.status() >= 400) failed.push({ url: r.url(), status: r.status(), page: page.url() }); });

  const imgs = { total: 0, bytes: 0, avif: 0, webp: 0, other: 0 };
  const nextImgs = { total: 0, bytes: 0, avif: 0, webp: 0, other: 0 };
  page.on('response', (r) => {
    const url = r.url();
    const ct = r.headers()['content-type'] || '';
    const len = parseInt(r.headers()['content-length'] || '0', 10) || 0;
    if (url.includes('/_next/image')) {
      nextImgs.total++;
      nextImgs.bytes += len;
      if (ct.includes('avif')) nextImgs.avif++;
      else if (ct.includes('webp')) nextImgs.webp++;
      else nextImgs.other++;
    }
    if (ct.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|svg)(\?|$)/i.test(url)) {
      imgs.total++;
      imgs.bytes += len;
      if (ct.includes('avif')) imgs.avif++;
      else if (ct.includes('webp')) imgs.webp++;
      else imgs.other++;
    }
  });

  // Track LCP via performance metrics
  const perfResults = {};
  for (const p of PAGES) {
    const routeName = p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-/, '');
    try {
      await page.goto(TARGET_URL + p, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.evaluate(async () => {
        await new Promise(res => {
          const step = Math.max(400, window.innerHeight / 2);
          let y = 0;
          const timer = setInterval(() => {
            window.scrollTo(0, y);
            y += step;
            if (y > document.body.scrollHeight) { clearInterval(timer); res(); }
          }, 40);
        });
      });
      await page.waitForTimeout(400);
      // Grab LCP metric
      const lcp = await page.evaluate(() => new Promise(res => {
        try {
          const po = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            res(last ? Math.round(last.renderTime || last.loadTime || last.startTime) : null);
          });
          po.observe({ type: 'largest-contentful-paint', buffered: true });
          setTimeout(() => res(null), 800);
        } catch { res(null); }
      }));
      perfResults[routeName] = { lcp };
      console.log(`✓ ${routeName}  lcp=${lcp}ms`);
    } catch (e) {
      console.log(`✗ ${routeName}: ${e.message.slice(0, 100)}`);
    }
  }

  console.log(`\n=== FINAL RESULTS ===`);
  console.log(`errors: ${errors.length}`);
  for (const e of errors.slice(0, 15)) console.log(`  [${e.type}] ${e.url} — ${e.msg.slice(0, 200)}`);
  console.log(`\nfailed responses: ${failed.length}`);
  const byUrl = {};
  for (const f of failed) byUrl[f.url] = (byUrl[f.url] || 0) + 1;
  for (const [url, c] of Object.entries(byUrl).slice(0, 15)) console.log(`  ${c}× ${url}`);
  console.log(`\nall image requests: total=${imgs.total} bytes=${(imgs.bytes/1024).toFixed(0)}KB avif=${imgs.avif} webp=${imgs.webp} other=${imgs.other}`);
  console.log(`/_next/image:       total=${nextImgs.total} bytes=${(nextImgs.bytes/1024).toFixed(0)}KB avif=${nextImgs.avif} webp=${nextImgs.webp} other=${nextImgs.other}`);
  await browser.close();
})();
