const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3001';

const SAMPLE = [
  { label: 'Feed 01', title: 'A Stronger Voice for Northwest Oregon', expectSrc: '/social/feed/feed-01-hero.html' },
  { label: 'Feed 09', title: 'What Matters Most?', expectSrc: '/social/feed/feed-09-what-matters.html' },
  { label: 'Feed 22', title: 'Northwest Oregon has always been powered by innovation.', expectSrc: '/social/feed/feed-22-powered-by-innovation.html' },
  { label: 'Feed 43', title: 'Strong Campaigns Are Built With Strong Support.', expectSrc: '/social/feed/feed-43-not-boardrooms.html' },
  { label: 'Story 01', title: 'Attention every four years.', expectSrc: '/social/stories/story-01-attention.html' },
  { label: 'Story 18', title: 'Communities thrive when neighbours work together.', expectSrc: '/social/stories/story-18-neighbours-thrive.html' },
  { label: 'Carousel 01', title: 'For Northwest Oregon', expectSrc: '/social/carousels/carousel-01-meet-the-pac/slide-1.html' },
  { label: 'Carousel 06', title: 'WHAT WE BELIEVE', expectSrc: '/social/carousels/carousel-06-what-we-believe/slide-1.html' },
];

const stripQuery = (u) => (u ? u.split('?')[0] : '');
const pathOf = (u) => {
  try { return new URL(u, 'http://x').pathname; } catch { return stripQuery(u); }
};

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const previewsHits = [];
  const notFound = [];
  page.on('response', (res) => {
    const url = res.url();
    const status = res.status();
    if (url.includes('/social/previews/')) previewsHits.push(status + ' ' + url);
    if (status === 404 && /\/social\/(feed|stories|carousels)\//.test(url)) {
      notFound.push(status + ' ' + url);
    }
  });

  console.log('Loading ' + TARGET_URL + '/social-posts ...');
  await page.goto(TARGET_URL + '/social-posts', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const outDir = 'C:/Users/General/AppData/Local/Temp/nwop-social-posts-check';
  const fs = require('fs');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch {}

  await page.screenshot({ path: outDir + '/index.png', fullPage: false });
  console.log('index screenshot -> ' + outDir + '/index.png');

  // scroll to the feed grid and screenshot
  const firstFeedBtn = page.locator('button[aria-label^="Preview"]').first();
  await firstFeedBtn.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: outDir + '/feed-grid.png', fullPage: false });
  console.log('feed-grid screenshot -> ' + outDir + '/feed-grid.png');

  const results = [];

  for (const item of SAMPLE) {
    const btnLoc = page.locator('button[aria-label="Preview ' + item.title + '"]').first();
    if (!(await btnLoc.count())) {
      results.push({ label: item.label, pass: false, note: 'Card button not found' });
      continue;
    }
    await btnLoc.scrollIntoViewIfNeeded();
    const cardFrameLoc = btnLoc.locator('iframe').first();
    await cardFrameLoc.waitFor({ state: 'attached', timeout: 8000 }).catch(() => {});
    const cardSrc = await cardFrameLoc.getAttribute('src').catch(() => null);

    let svgCount = 0;
    let canvasCount = 0;
    let bodyText = '';
    try {
      // find loaded child frame by url (avoids contentFrame timing quirks)
      let childFrame = page.frames().find((f) => f.url().includes(item.expectSrc));
      // poll briefly for the frame to appear/load
      for (let i = 0; i < 30 && !childFrame; i++) {
        await page.waitForTimeout(150);
        childFrame = page.frames().find((f) => f.url().includes(item.expectSrc));
      }
      if (childFrame) {
        await childFrame.waitForLoadState('load', { timeout: 8000 }).catch(() => {});
        await page.waitForTimeout(300);
        canvasCount = await childFrame.locator('.canvas, body > div').count().catch(() => 0);
        svgCount = await childFrame.locator('svg').count().catch(() => 0);
        bodyText = (await childFrame.locator('body').innerText().catch(() => '')) || '';
      }
    } catch {}

    await btnLoc.click();
    const dialog = page.locator('[role="dialog"]');
    await dialog.waitFor({ state: 'visible', timeout: 6000 }).catch(() => {});
    const dialogIframeLoc = dialog.locator('iframe').first();
    await dialogIframeLoc.waitFor({ state: 'attached', timeout: 6000 }).catch(() => {});
    const lightboxSrc = await dialogIframeLoc.getAttribute('src').catch(() => null);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(350);

    const cardPath = pathOf(cardSrc);
    const lbPath = pathOf(lightboxSrc);
    const matches = cardPath === lbPath;
    const pathOK = cardPath === item.expectSrc && lbPath === item.expectSrc;
    const hasContent = canvasCount > 0 || svgCount > 0 || bodyText.trim().length > 0;

    const pass = matches && pathOK && hasContent;
    results.push({
      label: item.label,
      pass,
      cardPath,
      lightboxPath: lbPath,
      expected: item.expectSrc,
      hasContent,
      svgCount,
      canvasCount,
      bodyTextLen: bodyText.trim().length,
    });
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: outDir + '/index-top.png', fullPage: false });

  const firstBtn = page.locator('button[aria-label="Preview ' + SAMPLE[0].title + '"]').first();
  await firstBtn.scrollIntoViewIfNeeded();
  await firstBtn.click();
  await page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(1000);
  await page.screenshot({ path: outDir + '/lightbox.png', fullPage: false });
  console.log('lightbox screenshot -> ' + outDir + '/lightbox.png');
  await page.keyboard.press('Escape');

  console.log('\n===== RESULTS =====');
  let passCount = 0;
  for (const r of results) {
    const flag = r.pass ? 'PASS' : 'FAIL';
    console.log(flag + ' ' + r.label + ': cardPath=' + r.cardPath + ' | lightboxPath=' + r.lightboxPath + ' | expected=' + r.expected + ' | hasContent=' + r.hasContent + ' (canvas=' + r.canvasCount + ', svgs=' + r.svgCount + ', text=' + r.bodyTextLen + ')');
    if (r.pass) passCount++;
  }
  console.log('\nPassed ' + passCount + '/' + results.length);
  console.log('\n/social/previews/ requests observed: ' + previewsHits.length);
  if (previewsHits.length) previewsHits.forEach((l) => console.log('  ', l));
  console.log('\n404s on /social/(feed|stories|carousels)/ : ' + notFound.length);
  if (notFound.length) notFound.forEach((l) => console.log('  ', l));

  await browser.close();
})();
