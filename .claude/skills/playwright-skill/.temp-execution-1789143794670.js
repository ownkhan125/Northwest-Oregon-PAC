const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3003';
const EXPECTED_PIXEL_ID = '989250890820379';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const context = await browser.newContext();

  const fbqCalls = [];

  // Intercept fbq BEFORE any script on the page runs.
  await context.addInitScript(() => {
    const record = (args, tag) => {
      window.__fbqLog = window.__fbqLog || [];
      window.__fbqLog.push({ tag, args: JSON.parse(JSON.stringify(args)) });
    };
    let real = undefined;
    Object.defineProperty(window, 'fbq', {
      configurable: true,
      set(v) {
        real = v;
        // Wrap so we still record every call after Meta's snippet assigns fbq
        const wrapped = function (...args) {
          record(args, 'call');
          return real.apply(this, args);
        };
        wrapped.callMethod = function (...args) {
          record(args, 'callMethod');
          return real.callMethod && real.callMethod.apply(this, args);
        };
        Object.defineProperty(window, 'fbq', {
          value: wrapped,
          writable: true,
          configurable: true,
        });
      },
      get() { return real; }
    });
  });

  const page = await context.newPage();

  // Count Meta network requests as an independent signal
  const metaRequests = [];
  page.on('request', (req) => {
    const u = req.url();
    if (u.includes('facebook.net') || u.includes('facebook.com/tr')) {
      metaRequests.push(u);
    }
  });

  console.log('---- Step 1: load home page ----');
  await page.goto(TARGET_URL + '/', { waitUntil: 'networkidle' });

  // Basic head-source check
  const headHTML = await page.evaluate(() => document.head.innerHTML);
  const scriptInHead = /id="meta-pixel"/.test(headHTML);
  const initInHead = new RegExp("fbq\\('init','" + EXPECTED_PIXEL_ID + "'\\)").test(headHTML);
  console.log('meta-pixel <script id="meta-pixel"> present in <head>:', scriptInHead);
  console.log(`fbq('init','${EXPECTED_PIXEL_ID}') present in <head>:`, initInHead);

  // Count fbevents.js occurrences on the entire document
  const fbeventsCount = await page.evaluate(() => {
    return Array.from(document.scripts).filter(s => (s.src || '').includes('fbevents.js')).length;
  });
  console.log('fbevents.js <script src=...> tag count (should be 1):', fbeventsCount);

  // Give the pixel a moment to attach and fire the initial route-tracker events
  await page.waitForTimeout(1500);

  const homeLog = await page.evaluate(() => window.__fbqLog || []);
  console.log('---- fbq calls after home load ----');
  console.log(JSON.stringify(homeLog, null, 2));

  const countHome = (name) =>
    homeLog.filter((e) => e.args[0] === 'track' && e.args[1] === name).length;
  console.log(`PageView calls on home: ${countHome('PageView')}`);
  console.log(`ViewContent calls on home: ${countHome('ViewContent')}`);

  // Reset log to isolate what fires during client nav
  await page.evaluate(() => { window.__fbqLog = []; });

  console.log('---- Step 2: client-navigate to /about ----');
  // Prefer clicking an in-app link so it's a true client nav.
  const aboutLink = page.locator('a[href="/about"]').first();
  if (await aboutLink.count()) {
    await aboutLink.click();
  } else {
    await page.evaluate(() => { window.location.href = '/about'; });
  }
  await page.waitForURL('**/about', { timeout: 10000 });
  await page.waitForTimeout(1500);

  const aboutLog = await page.evaluate(() => window.__fbqLog || []);
  console.log('---- fbq calls after /about nav ----');
  console.log(JSON.stringify(aboutLog, null, 2));
  const countAbout = (name) =>
    aboutLog.filter((e) => e.args[0] === 'track' && e.args[1] === name).length;
  console.log(`PageView calls on /about: ${countAbout('PageView')}`);
  console.log(`ViewContent calls on /about: ${countAbout('ViewContent')}`);

  console.log('---- Meta network requests observed ----');
  console.log(JSON.stringify(metaRequests, null, 2));

  console.log('---- SUMMARY ----');
  console.log(JSON.stringify({
    scriptInHead,
    initInHead,
    fbeventsCount,
    home: { PageView: countHome('PageView'), ViewContent: countHome('ViewContent') },
    about: { PageView: countAbout('PageView'), ViewContent: countAbout('ViewContent') },
    metaRequestCount: metaRequests.length,
  }, null, 2));

  await browser.close();
})();
