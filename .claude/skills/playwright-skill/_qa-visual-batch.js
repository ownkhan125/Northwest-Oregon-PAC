// Batch-screenshots every post at native size for visual QA review.

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-qa/visual';
try { fs.rmSync(outDir, { recursive: true, force: true }); } catch {}
try { fs.mkdirSync(outDir, { recursive: true }); } catch {}
try { fs.mkdirSync(path.join(outDir, 'feed')); } catch {}
try { fs.mkdirSync(path.join(outDir, 'story')); } catch {}
try { fs.mkdirSync(path.join(outDir, 'carousel')); } catch {}

const spec = JSON.parse(fs.readFileSync('C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/image-text-spec.json', 'utf8'));

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const overflows = [];

  for (const id of Object.keys(spec.feed)) {
    await page.setViewportSize({ width: 1080, height: 1080 });
    await page.goto('http://localhost:3001/social/feed/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'feed', id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    const overflow = await page.evaluate(() => {
      const h = Math.max(document.body.scrollHeight, document.body.clientHeight, document.documentElement.scrollHeight);
      const w = Math.max(document.body.scrollWidth, document.body.clientWidth, document.documentElement.scrollWidth);
      return { h, w };
    });
    if (overflow.h > 1090 || overflow.w > 1090) overflows.push({ id, kind: 'feed', ...overflow });
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  for (const id of Object.keys(spec.story)) {
    await page.setViewportSize({ width: 1080, height: 1920 });
    await page.goto('http://localhost:3001/social/stories/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'story', id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1920 } });
    const overflow = await page.evaluate(() => {
      const h = Math.max(document.body.scrollHeight, document.body.clientHeight, document.documentElement.scrollHeight);
      const w = Math.max(document.body.scrollWidth, document.body.clientWidth, document.documentElement.scrollWidth);
      return { h, w };
    });
    if (overflow.h > 1930 || overflow.w > 1090) overflows.push({ id, kind: 'story', ...overflow });
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  for (const [cid, cEntry] of Object.entries(spec.carousel)) {
    for (let i = 0; i < cEntry.slides.length; i++) {
      await page.setViewportSize({ width: 1080, height: 1080 });
      const url = 'http://localhost:3001/social/carousels/' + cid + '/slide-' + (i + 1) + '.html';
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(400);
      const name = cid + '_slide-' + (i + 1) + '.png';
      await page.screenshot({ path: path.join(outDir, 'carousel', name), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
      const overflow = await page.evaluate(() => {
        const h = Math.max(document.body.scrollHeight, document.body.clientHeight, document.documentElement.scrollHeight);
        const w = Math.max(document.body.scrollWidth, document.body.clientWidth, document.documentElement.scrollWidth);
        return { h, w };
      });
      if (overflow.h > 1090 || overflow.w > 1090) overflows.push({ id: cid + '/slide-' + (i + 1), kind: 'carousel', ...overflow });
      process.stdout.write('.');
    }
  }
  process.stdout.write('\n');

  console.log('\nOverflow candidates:', overflows.length);
  for (const o of overflows) {
    console.log(`  ${o.kind} ${o.id} — content ${o.w}x${o.h}`);
  }

  console.log('\nScreenshots saved to:', outDir);
  await browser.close();
})();
