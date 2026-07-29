const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-qa/spotcheck';
try { fs.rmSync(outDir, { recursive: true, force: true }); } catch {}
try { fs.mkdirSync(outDir, { recursive: true }); } catch {}

// Sample across all 8 agent batches + fixed feed-06
const FEED = [
  'feed-01-hero', 'feed-02-region-voice', 'feed-06-we-exist',
  'feed-14-safe-neighborhoods', 'feed-18-worth-fighting-for',
  'feed-25-candidates-intro', 'feed-29-ciatta-thompson',
  'feed-31-run-for-office', 'feed-35-host-meetup',
  'feed-43-not-boardrooms', 'feed-46-raised-invested', 'feed-49-let-builders-build',
  'feed-51-every-four-years', 'feed-58-our-promise', 'feed-60-decisions-today',
];
const STORY = ['story-07-hope-support-heard', 'story-14-every-town', 'story-24-brian-schimmel', 'story-25-randall-fryer'];
const CAROUSEL = [
  ['carousel-01-meet-the-pac', 1], ['carousel-03-where-donation-goes', 3],
  ['carousel-05-every-volunteer', 3], ['carousel-06-what-we-believe', 1],
  ['carousel-08-meet-the-pac', 1], ['carousel-10-this-movement', 4],
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const id of FEED) {
    await page.setViewportSize({ width: 1080, height: 1080 });
    await page.goto('http://localhost:3001/social/feed/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  }
  for (const id of STORY) {
    await page.setViewportSize({ width: 1080, height: 1920 });
    await page.goto('http://localhost:3001/social/stories/' + id + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, id + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  }
  for (const [cid, n] of CAROUSEL) {
    await page.setViewportSize({ width: 1080, height: 1080 });
    await page.goto('http://localhost:3001/social/carousels/' + cid + '/slide-' + n + '.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, cid + '_slide-' + n + '.png'), clip: { x: 0, y: 0, width: 1080, height: 1080 } });
  }

  console.log('spotcheck screenshots in', outDir);
  await browser.close();
})();
