const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3003';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const requestedFbEvents = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('facebook.net') || url.includes('facebook.com/tr')) {
      requestedFbEvents.push(url);
    }
  });

  await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded' });

  const initial = await page.evaluate(() => {
    const el = document.getElementById('meta-pixel');
    return {
      pixelInHead: !!(el && document.head.contains(el)),
      pixelId:
        (el && (el.innerHTML.match(/fbq\('init','(\d+)'\)/) || [])[1]) || null,
      pixelIsScriptTag: el ? el.tagName.toLowerCase() : null,
      fbqDefined: typeof window.fbq === 'function',
      headScriptIdsBefore: Array.from(
        document.head.querySelectorAll('script[id]'),
      ).map((s) => s.id),
    };
  });

  await page.waitForLoadState('networkidle').catch(() => {});

  const linkHref = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href^="/"]'));
    const internal = links.find((a) => {
      const h = a.getAttribute('href');
      return h && h !== '/' && !h.startsWith('/#') && !h.startsWith('//');
    });
    return internal ? internal.getAttribute('href') : null;
  });

  let navigatedTo = null;
  let afterNav = null;

  if (linkHref) {
    navigatedTo = linkHref;
    await page.goto(TARGET_URL + linkHref, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle').catch(() => {});
    afterNav = await page.evaluate(() => {
      const el = document.getElementById('meta-pixel');
      return {
        stillInHeadAfterNav: !!(el && document.head.contains(el)),
        fbqStillDefinedAfterNav: typeof window.fbq === 'function',
      };
    });
  }

  const result = {
    pixelInHead: initial.pixelInHead,
    pixelIsScriptTag: initial.pixelIsScriptTag,
    pixelId: initial.pixelId,
    fbqDefined: initial.fbqDefined,
    stillInHeadAfterNav: afterNav ? afterNav.stillInHeadAfterNav : null,
    fbqStillDefinedAfterNav: afterNav ? afterNav.fbqStillDefinedAfterNav : null,
    navigatedTo,
    facebookRequestsSeen: requestedFbEvents.length,
    facebookRequestSample: requestedFbEvents.slice(0, 4),
    headScriptIdsBefore: initial.headScriptIdsBefore,
  };

  console.log('RESULT_JSON=' + JSON.stringify(result, null, 2));

  await browser.close();
})();
