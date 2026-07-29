const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-qa/completed-feed';
try { fs.mkdirSync(outDir, { recursive: true }); } catch {}

// Sample of 12 completed posts spanning all 5 agent batches
const SAMPLE = [
  'feed-03-prosperity', 'feed-06-we-exist',
  'feed-13-prosperity-policy', 'feed-18-worth-fighting-for', 'feed-25-candidates-intro',
  'feed-28-barbara-kahl', 'feed-31-run-for-office', 'feed-37-stay-informed',
  'feed-40-invest', 'feed-46-raised-invested',
  'feed-52-open-sign', 'feed-58-our-promise',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1080 });
  for (const id of SAMPLE) {
    await page.goto('http://localhost:3001/social/feed/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(outDir, id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
    console.log('   ok:', id);
  }
  await browser.close();
})();
