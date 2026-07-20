const { chromium } = require('playwright');
const fs = require('fs');

const TARGET_URL = 'http://localhost:3003';
const OUT = 'C:\\Users\\General\\AppData\\Local\\Temp\\pw-verify-3003';
try { fs.mkdirSync(OUT, { recursive: true }); } catch {}

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'mobile-390',   width: 390,  height: 844 },
];

const PAGES = [
  '/', '/about', '/ask', '/blogs', '/contact', '/donate', '/events',
  '/faq', '/funnel', '/privacy-policy', '/social-posts', '/terms-of-service',
  '/volunteer',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errors = [];
  const failedResponses = [];
  page.on('pageerror', (e) => errors.push({ type: 'pageerror', msg: e.message, url: page.url() }));
  page.on('console', (m) => { if (m.type() === 'error') errors.push({ type: 'console.error', msg: m.text(), url: page.url() }); });
  page.on('response', (r) => {
    if (r.status() >= 400) failedResponses.push({ page: page.url(), url: r.url(), status: r.status() });
  });

  const imgReqs = { total: 0, avif: 0, webp: 0, other: 0, bytes: 0 };
  const nextImgReqs = { total: 0, avif: 0, webp: 0, bytes: 0 };
  page.on('response', async (r) => {
    const url = r.url();
    const ct = r.headers()['content-type'] || '';
    const len = parseInt(r.headers()['content-length'] || '0', 10) || 0;
    if (url.includes('/_next/image')) {
      nextImgReqs.total++;
      nextImgReqs.bytes += len;
      if (ct.includes('avif')) nextImgReqs.avif++;
      else if (ct.includes('webp')) nextImgReqs.webp++;
    }
    if (ct.startsWith('image/') || /\.(jpg|jpeg|png|webp|avif|svg)(\?|$)/i.test(url)) {
      imgReqs.total++;
      imgReqs.bytes += len;
      if (ct.includes('avif')) imgReqs.avif++;
      else if (ct.includes('webp')) imgReqs.webp++;
      else imgReqs.other++;
    }
  });

  for (const p of PAGES) {
    const routeName = p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-/, '');
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      try {
        await page.goto(TARGET_URL + p, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(1200);
        await page.addStyleTag({ content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `});
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}\\${routeName}-${vp.name}.png`, fullPage: true });
        console.log(`✓ ${routeName} @ ${vp.name}`);
      } catch (e) {
        console.log(`✗ ${routeName} @ ${vp.name}: ${e.message}`);
      }
    }
  }
  console.log(`\nerrors: ${errors.length}`);
  for (const e of errors.slice(0, 20)) console.log(`  [${e.type}] ${e.url} — ${e.msg.slice(0, 200)}`);
  console.log(`\nfailed responses: ${failedResponses.length}`);
  const failedByUrl = {};
  for (const f of failedResponses) failedByUrl[f.url] = (failedByUrl[f.url] || 0) + 1;
  const sortedFails = Object.entries(failedByUrl).sort((a, b) => b[1] - a[1]).slice(0, 15);
  for (const [url, count] of sortedFails) console.log(`  ${count}× [${failedResponses.find(f => f.url === url).status}] ${url}`);

  console.log(`\nAll image requests: total=${imgReqs.total}  bytes=${imgReqs.bytes}  avif=${imgReqs.avif}  webp=${imgReqs.webp}  other=${imgReqs.other}`);
  console.log(`/_next/image requests: total=${nextImgReqs.total}  bytes=${nextImgReqs.bytes}  avif=${nextImgReqs.avif}  webp=${nextImgReqs.webp}`);

  await browser.close();
})();
