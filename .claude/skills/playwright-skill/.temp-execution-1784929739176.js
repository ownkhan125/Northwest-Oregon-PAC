const { chromium } = require('playwright');

const FILE = 'file:///' + 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/public/social/stories/story-21-leadership-not-titles.html'.replace(/ /g, '%20');
const OUT = 'C:/Users/General/AppData/Local/Temp';

function rectsOverlap(a, b, pad = 0) {
  return !(a.right - pad <= b.left + pad || b.right - pad <= a.left + pad || a.bottom - pad <= b.top + pad || b.bottom - pad <= a.top + pad);
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  // Canvas render at native 1080 x 1920 (Instagram Story)
  const context = await browser.newContext({ viewport: { width: 1080, height: 1920 } });
  const page = await context.newPage();
  await page.goto(FILE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/s21-after-canvas.png`, fullPage: false });

  const info = await page.evaluate(() => {
    const rect = (sel) => {
      const el = document.querySelector(sel);
      return el ? el.getBoundingClientRect() : null;
    };
    const rectAll = (sel) => [...document.querySelectorAll(sel)].map(el => ({ text: el.innerText, ...el.getBoundingClientRect().toJSON() }));
    const strikeBar = document.querySelector('.s21-para .strike');
    let barRect = null;
    if (strikeBar) {
      const style = window.getComputedStyle(strikeBar, '::before');
      barRect = { height: style.height, background: style.background, top: style.top };
    }
    return {
      canvas: rect('.canvas'),
      page: rect('.s21-page'),
      mast: rect('.s21-mast'),
      editor: rect('.s21-editor'),
      header: rect('.s21-header'),
      paras: rectAll('.s21-para'),
      strike: rect('.s21-para .strike'),
      strikeBar: barRect,
      m1: rect('.s21-marginmark.m1'),
      m2: rect('.s21-marginmark.m2'),
      highlight: rect('.s21-para .highlight'),
      note: rect('.s21-note'),
      foot: rect('.s21-foot'),
    };
  });

  console.log('=== Canvas 1080x1920 ===');
  console.log(JSON.stringify(info, null, 2));

  // Check overlaps between margin marks and paragraphs
  const p1 = info.paras[0], p2 = info.paras[1];
  const checks = [];
  checks.push({ name: 'm1 x-overlaps p1', overlap: !(info.m1.right <= p1.left) });
  checks.push({ name: 'm2 x-overlaps p2', overlap: !(info.m2.right <= p2.left) });
  checks.push({ name: 'm2 y-aligned to serving line (line1 of p2)',
    aligned: info.m2.top < (p2.top + p2.height/2) });
  checks.push({ name: 'note stays inside canvas', ok: info.note.right <= info.canvas.right && info.note.bottom <= info.canvas.bottom });
  checks.push({ name: 'foot stays inside canvas', ok: info.foot.right <= info.canvas.right && info.foot.bottom <= info.canvas.bottom });
  checks.push({ name: 'paras stay inside page', ok: p1.right <= info.page.right && p2.right <= info.page.right });
  console.log('\n=== Checks ===');
  console.log(JSON.stringify(checks, null, 2));

  // Cropped area around title
  await page.screenshot({
    path: `${OUT}/s21-after-title.png`,
    clip: { x: 60, y: 280, width: 960, height: 420 },
  });

  await context.close();

  // Also render responsive: how it appears embedded on typical viewports
  for (const vp of [
    { name: 'desktop', w: 1280, h: 800 },
    { name: 'tablet', w: 768, h: 1024 },
    { name: 'mobile', w: 375, h: 667 },
  ]) {
    const c = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
    const p = await c.newPage();
    await p.goto(FILE, { waitUntil: 'networkidle' });
    await p.waitForTimeout(400);
    await p.screenshot({ path: `${OUT}/s21-after-${vp.name}.png`, fullPage: true });
    await c.close();
  }

  await browser.close();
  console.log('\nDone');
})();
