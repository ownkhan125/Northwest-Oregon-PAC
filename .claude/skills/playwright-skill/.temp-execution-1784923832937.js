const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
];

const pathsExpect404 = ['/survey', '/survey/thank-you'];
const pathsExpectOk = ['/', '/about', '/events', '/ask', '/volunteer', '/faq', '/contact', '/blogs', '/social-posts', '/privacy-policy', '/terms-of-service'];

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push({ url: page.url(), text: msg.text() }); });
  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push({ url: page.url(), text: String(err) }));

  const results = { removed: {}, kept: {}, brokenLinks: {} };

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    results.removed[vp.name] = {};
    results.kept[vp.name] = {};

    // 1. Removed routes should be 404 / not-found
    for (const path of pathsExpect404) {
      const resp = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const status = resp?.status();
      const bodyText = (await page.locator('body').innerText().catch(() => '')).toLowerCase();
      const looksNotFound = /404|not found|couldn.?t find|page not found/.test(bodyText);
      results.removed[vp.name][path] = { status, looksNotFound };
    }

    // 2. Kept routes should all load OK
    for (const path of pathsExpectOk) {
      const resp = await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
      results.kept[vp.name][path] = { status: resp?.status() };
    }
  }

  // 3. Homepage: verify no anchor/link points to /survey anywhere on the site (spot-check homepage + footer sample)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
  const surveyLinks = await page.$$eval('a', (as) =>
    as.map((a) => a.getAttribute('href') || '').filter((h) => /(^|\/)survey(\/|$|\?)/i.test(h)),
  );
  results.brokenLinks.homepage = surveyLinks;

  await page.goto(BASE + '/contact', { waitUntil: 'networkidle', timeout: 30000 });
  const surveyLinksContact = await page.$$eval('a', (as) =>
    as.map((a) => a.getAttribute('href') || '').filter((h) => /(^|\/)survey(\/|$|\?)/i.test(h)),
  );
  results.brokenLinks.contact = surveyLinksContact;

  console.log('\n=== REMOVED ROUTES (should be 404 / not-found body) ===');
  console.log(JSON.stringify(results.removed, null, 2));
  console.log('\n=== KEPT ROUTES (should be 200 across all viewports) ===');
  console.log(JSON.stringify(results.kept, null, 2));
  console.log('\n=== ANY REMAINING /survey ANCHORS ===');
  console.log(JSON.stringify(results.brokenLinks, null, 2));
  console.log('\n=== CONSOLE ERRORS ===');
  console.log(consoleErrors.length ? consoleErrors : '(none)');
  console.log('\n=== PAGE ERRORS ===');
  console.log(pageErrors.length ? pageErrors : '(none)');

  // Screenshots of homepage per viewport, plus the /survey 404 on desktop
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: `C:\\Users\\General\\AppData\\Local\\Temp\\home-${vp.name}.png`, fullPage: false });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/survey', { waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: 'C:\\Users\\General\\AppData\\Local\\Temp\\survey-404.png', fullPage: false });

  await browser.close();
})();
