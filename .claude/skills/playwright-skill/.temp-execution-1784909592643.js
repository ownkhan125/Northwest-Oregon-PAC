const { chromium } = require('playwright');

const TARGET = 'http://localhost:3000';
const WINRED = 'https://secure.winred.com/northwest-oregon/donate-today?sc=winred-directory&money_pledge=false&recurring=false';

const results = [];
const record = (id, pass, detail) => {
  results.push({ id, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} [${id}] ${detail}`);
};

// Pages to crawl for Donate buttons/links
const PAGES = ['/', '/about', '/ask', '/blogs', '/events', '/volunteer', '/faq', '/contact', '/survey'];
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

async function collectDonateAnchors(page) {
  return page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    const donateAnchors = anchors
      .filter((a) => /donate/i.test((a.textContent || '').trim()))
      .map((a) => ({
        text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60),
        href: a.getAttribute('href'),
        target: a.getAttribute('target'),
        rel: a.getAttribute('rel'),
        visible: !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length),
      }));
    return donateAnchors;
  });
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 30 });
  const context = await browser.newContext();

  // ---- old /donate returns 404 ----
  {
    const page = await context.newPage();
    const resp = await page.goto(`${TARGET}/donate`, { waitUntil: 'networkidle' });
    const status = resp ? resp.status() : 0;
    record('old-donate-404', status === 404, `GET /donate -> ${status}`);
    await page.close();
  }

  // ---- every Donate anchor points to WinRed on every page ----
  for (const path of PAGES) {
    for (const vp of VIEWPORTS) {
      const page = await context.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      try {
        const resp = await page.goto(`${TARGET}${path}`, { waitUntil: 'networkidle', timeout: 30000 });
        const status = resp ? resp.status() : 0;
        if (status >= 400) {
          record(`page-${path}-${vp.name}-load`, false, `Load status ${status}`);
          await page.close();
          continue;
        }
      } catch (e) {
        record(`page-${path}-${vp.name}-load`, false, `Load error: ${e.message}`);
        await page.close();
        continue;
      }
      // On tablet/mobile the header's Donate button is inside the mobile menu — open it
      if (vp.name !== 'desktop') {
        const btn = page.locator('header button[aria-label="Open menu"]');
        if (await btn.isVisible().catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(400);
        }
      }
      const donates = await collectDonateAnchors(page);
      const nonWinred = donates.filter((d) => d.href && d.href !== WINRED);
      const missingTarget = donates.filter((d) => d.href === WINRED && d.target !== '_blank');
      const okCount = donates.filter((d) => d.href === WINRED && d.target === '_blank').length;
      const detail = `${path} @ ${vp.name}: donateAnchors=${donates.length} ok=${okCount} wrongHref=${nonWinred.length} noTarget=${missingTarget.length}` +
        (nonWinred.length ? ` -> nonWinred=${JSON.stringify(nonWinred)}` : '');
      record(`donate-${path}-${vp.name}`, nonWinred.length === 0 && missingTarget.length === 0 && okCount > 0, detail);
      await page.close();
    }
  }

  // ---- navbar/footer Donate click on desktop actually navigates ----
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${TARGET}/`, { waitUntil: 'networkidle' });
    // Nav Donate should be a link with correct href
    const navHref = await page.locator('header a:has-text("Donate")').first().getAttribute('href');
    record('navbar-href', navHref === WINRED, `Navbar Donate href = ${navHref}`);
    // Footer Donate
    const footerHref = await page.locator('footer a:has-text("Donate")').first().getAttribute('href');
    record('footer-href', footerHref === WINRED, `Footer Donate href = ${footerHref}`);
    await page.close();
  }

  // ---- no internal href="/donate" anywhere on the crawled pages ----
  {
    const page = await context.newPage();
    let anyOldRef = false;
    const badRefs = [];
    for (const path of PAGES) {
      await page.goto(`${TARGET}${path}`, { waitUntil: 'networkidle' });
      const refs = await page.$$eval('a[href="/donate"]', (els) => els.length);
      if (refs > 0) {
        anyOldRef = true;
        badRefs.push({ path, count: refs });
      }
    }
    record('no-old-refs', !anyOldRef, badRefs.length ? `Old /donate anchors: ${JSON.stringify(badRefs)}` : 'No anchors point to /donate');
    await page.close();
  }

  await browser.close();

  const passed = results.filter((r) => r.pass).length;
  console.log(`\n=== SUMMARY: ${passed}/${results.length} checks passed ===`);
  for (const r of results) console.log(`${r.pass ? 'PASS' : 'FAIL'} - ${r.id}: ${r.detail}`);
  if (passed !== results.length) process.exit(2);
})();
