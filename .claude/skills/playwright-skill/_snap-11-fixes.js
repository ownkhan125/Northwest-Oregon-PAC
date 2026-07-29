const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-qa/fixes-11';
try { fs.rmSync(outDir, { recursive: true, force: true }); } catch {}
try { fs.mkdirSync(outDir, { recursive: true }); } catch {}

const POSTS = [
  'feed-13-prosperity-policy', 'feed-18-worth-fighting-for', 'feed-22-powered-by-innovation',
  'feed-26-mark-norman', 'feed-29-ciatta-thompson', 'feed-32-volunteer',
  'feed-34-campaigns-gather', 'feed-42-support-makes-possible',
  'feed-51-every-four-years', 'feed-52-open-sign', 'feed-54-deserves-to-compete',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  for (const id of POSTS) {
    await page.goto('http://localhost:3001/social/feed/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    console.log('   ok:', id);
  }
  await browser.close();
})();
