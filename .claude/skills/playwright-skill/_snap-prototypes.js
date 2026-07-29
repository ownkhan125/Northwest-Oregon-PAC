const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-redesign-prototypes';
try { fs.rmSync(outDir, { recursive: true, force: true }); } catch {}
try { fs.mkdirSync(outDir, { recursive: true }); } catch {}

const POSTS = [
  // approved 8
  { path: '/social/feed/feed-01-hero.html',                        name: 'a1-feed-01-hero',              w:1080, h:1080 },
  { path: '/social/feed/feed-15-something-bigger.html',            name: 'a2-feed-15-something-bigger',  w:1080, h:1080 },
  { path: '/social/feed/feed-23-priorities-nw.html',               name: 'a3-feed-23-priorities',        w:1080, h:1080 },
  { path: '/social/feed/feed-26-mark-norman.html',                 name: 'a4-feed-26-mark-norman',       w:1080, h:1080 },
  { path: '/social/feed/feed-38-contact.html',                     name: 'a5-feed-38-contact',           w:1080, h:1080 },
  { path: '/social/feed/feed-41-donate-ladder.html',               name: 'a6-feed-41-donate-ladder',     w:1080, h:1080 },
  { path: '/social/feed/feed-44-not-headlines.html',               name: 'a7-feed-44-not-headlines',     w:1080, h:1080 },
  { path: '/social/stories/story-15-issue-question.html',          name: 'a8-story-15-issue',            w:1080, h:1920 },
  // new 10
  { path: '/social/feed/feed-02-region-voice.html',                name: 'b1-feed-02-region-voice',      w:1080, h:1080 },
  { path: '/social/feed/feed-07-small-actions.html',               name: 'b2-feed-07-small-actions',     w:1080, h:1080 },
  { path: '/social/feed/feed-08-building-tomorrow.html',           name: 'b3-feed-08-building-tomorrow', w:1080, h:1080 },
  { path: '/social/feed/feed-09-what-matters.html',                name: 'b4-feed-09-what-matters',      w:1080, h:1080 },
  { path: '/social/feed/feed-12-future-belongs.html',              name: 'b5-feed-12-future-belongs',    w:1080, h:1080 },
  { path: '/social/feed/feed-17-education-workforce.html',         name: 'b6-feed-17-education',         w:1080, h:1080 },
  { path: '/social/feed/feed-19-every-dollar-here.html',           name: 'b7-feed-19-every-dollar',      w:1080, h:1080 },
  { path: '/social/feed/feed-20-more-than-promises.html',          name: 'b8-feed-20-promises',          w:1080, h:1080 },
  { path: '/social/feed/feed-27-brian-schimmel.html',              name: 'b9-feed-27-brian-schimmel',    w:1080, h:1080 },
  { path: '/social/feed/feed-42-support-makes-possible.html',      name: 'b10-feed-42-support-possible', w:1080, h:1080 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  for (const p of POSTS) {
    await page.setViewportSize({ width: p.w, height: p.h });
    await page.goto('http://localhost:3001' + p.path, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, p.name + '.png'), clip: { x: 0, y: 0, width: p.w, height: p.h } });
    console.log('   ok:', p.name);
  }
  await browser.close();
  console.log('\nSnapshots in:', outDir);
})();
