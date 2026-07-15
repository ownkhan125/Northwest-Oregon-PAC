const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/public';
const OUT_DIR = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill';

const svgs = [];
for (let i = 1; i <= 16; i++) {
  const name = `Untitled-3-${String(i).padStart(2, '0')}.svg`;
  svgs.push(name);
}

const svgTags = svgs
  .map(
    (n) =>
      `<div class="cell"><img src="file:///${PUBLIC_DIR}/${n}" alt="${n}"/><div class="label">${n}</div></div>`
  )
  .join('');

const html = `<!doctype html>
<html><head><meta charset="utf-8"/>
<style>
  body { background:#0a0a0a; color:#fafafa; font-family: monospace; padding: 20px; margin:0;}
  h1 { font-size: 18px; margin: 0 0 20px; }
  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
  .cell { background:#fff; border-radius: 10px; padding: 12px; display:flex; flex-direction:column; align-items:center; }
  .cell img { width: 220px; height: 220px; }
  .label { color:#111; font-size: 12px; margin-top: 6px; }
</style></head>
<body>
<h1>SVG Catalog</h1>
<div class="grid">${svgTags}</div>
</body></html>`;

const tmpHtml = path.join(OUT_DIR, '_svg-catalog.html');
fs.writeFileSync(tmpHtml, html);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 2400 } });
  await page.goto('file:///' + tmpHtml.replace(/\\/g, '/'));
  await page.waitForLoadState('networkidle');
  const outPng = path.join(OUT_DIR, '_svg-catalog.png');
  await page.screenshot({ path: outPng, fullPage: true });
  console.log('OK screenshot saved to', outPng);
  await browser.close();
})();
