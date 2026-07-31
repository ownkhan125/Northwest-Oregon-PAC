const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:3000/';
const OUT_DIR = 'C:\\Users\\General\\AppData\\Local\\Temp\\tram-shots';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const warnings = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') warnings.push(`[error] ${msg.text()}`);
  });
  page.on('pageerror', (err) => warnings.push(`[pageerror] ${err.message}`));
  page.on('response', (resp) => {
    if (resp.url().includes('portland-aerial-tram') || resp.url().includes('_next/image')) {
      if (!resp.ok()) warnings.push(`[img ${resp.status()}] ${resp.url()}`);
    }
  });

  const results = [];

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name.toUpperCase()} ${vp.width}x${vp.height} ===`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });

    // Scroll image center into view for animation
    await page.evaluate(() => {
      const img = document.querySelector('#about img');
      if (img) img.scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await page.waitForTimeout(1500);

    const info = await page.evaluate(() => {
      const section = document.querySelector('#about');
      if (!section) return { error: 'no #about' };
      const img = section.querySelector('img');
      if (!img) return { error: 'no img inside #about' };
      const r = img.getBoundingClientRect();
      const containerR = img.parentElement.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        complete: img.complete,
        rendered: { w: Math.round(r.width), h: Math.round(r.height) },
        container: { w: Math.round(containerR.width), h: Math.round(containerR.height) },
        objectFit: getComputedStyle(img).objectFit,
        objectPosition: getComputedStyle(img).objectPosition,
      };
    });
    console.log(JSON.stringify(info, null, 2));
    results.push({ vp: vp.name, info });

    // Screenshots
    const imgLoc = page.locator('#about img').first();
    const imgOnlyPath = path.join(OUT_DIR, `${vp.name}-image-only.png`);
    await imgLoc.screenshot({ path: imgOnlyPath });
    console.log('  image-only:', imgOnlyPath);

    const viewportPath = path.join(OUT_DIR, `${vp.name}-viewport.png`);
    await page.screenshot({ path: viewportPath, fullPage: false });
    console.log('  viewport:', viewportPath);
  }

  console.log('\n=== WARNINGS ===');
  if (warnings.length === 0) console.log('  (none)');
  else warnings.forEach((w) => console.log('  ' + w));

  console.log('\n=== SUMMARY ===');
  console.log(JSON.stringify(results, null, 2));

  await browser.close();
})();
