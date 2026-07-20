const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const CHECKS = [];
const rec = (n, p, d) => CHECKS.push({ n, p, d: d || '' });

// Internal / review-status phrasing that must never appear on the live site.
// "Coming Soon" is intentionally *not* in this list — it's a legitimate
// user-facing note on the endorsement card about a candidate's external
// campaign site, not internal review language.
const FORBIDDEN_TERMS = [
  /\bplaceholder\b/i,
  /\binternal review\b/i,
  /\bpending approval\b/i,
  /\bin review\b/i,
  /\bnot yet approved\b/i,
  /\bawaiting approval\b/i,
  /\bdraft status\b/i,
  /\bfor review\b/i,
  /\bTODO\b/,
  /\bWIP\b/,
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('PAGE_ERROR: ' + e.message));

  const pagesToScan = [
    '/', '/about', '/donate', '/volunteer', '/contact', '/ask', '/events', '/faq',
    '/social-posts', '/privacy-policy', '/terms-of-service',
  ];

  for (const url of pagesToScan) {
    const resp = await page.goto(BASE + url, { waitUntil: 'networkidle' });
    rec(`${url} loads (200)`, resp && resp.status() === 200, `status=${resp?.status()}`);
    const text = await page.locator('body').innerText();
    let hit = null;
    for (const re of FORBIDDEN_TERMS) {
      if (re.test(text)) { hit = re.source; break; }
    }
    rec(`${url} — no internal/placeholder text`, !hit, hit ? `matched=${hit}` : '');
  }

  // /donate specific checks
  await page.goto(BASE + '/donate', { waitUntil: 'networkidle' });
  const donateText = (await page.locator('main').innerText()).replace(/\s+/g,' ');
  rec('/donate: has holding heading', /Online contributions are launching soon/i.test(donateText));
  rec('/donate: has contact email', /info@northwestoregon\.com/i.test(donateText));
  rec('/donate: has phone', /503-490-4139/.test(donateText));
  rec('/donate: has mailing address', /10700 SW Beaverton-Hillsdale Highway/.test(donateText));
  rec('/donate: shows Paid For disclaimer', /Paid for by Northwest Oregon PAC/i.test(donateText));
  rec('/donate: no fake donation form (no "Pick an amount")', !/Pick an amount/i.test(donateText));
  rec('/donate: no fake donation form (no "Donor information")', !/Donor information/i.test(donateText));
  rec('/donate: no citizenship checkbox', !/I am a U\.S\. citizen/i.test(donateText));

  // Homepage donate section
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const homeText = (await page.locator('body').innerText()).replace(/\s+/g,' ');
  rec('home: shows donate section holding message', /Online contributions are launching soon/i.test(homeText));
  rec('home: no amount buttons ($25/$100/$500/$1000 no longer present as donate CTA)', !/\$25.*\$100.*\$500.*\$1000/i.test(homeText));

  // Link resolvability — collect every /donate link and every internal link on visited pages
  const linksToCheck = new Set();
  for (const url of pagesToScan) {
    await page.goto(BASE + url, { waitUntil: 'networkidle' });
    const hrefs = await page.evaluate(() => Array.from(document.querySelectorAll('a[href]')).map(a => a.getAttribute('href')));
    hrefs.forEach(h => {
      if (h && h.startsWith('/')) {
        const path = h.split('#')[0] || '/';
        linksToCheck.add(path);
      }
    });
  }
  console.log('Discovered internal paths:', [...linksToCheck].sort());

  const donateNavLinks = await (async () => {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    return await page.locator('a[href="/donate"]').count();
  })();
  rec('home page has at least one link to /donate', donateNavLinks > 0, `count=${donateNavLinks}`);
  // Follow /donate from home
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const firstDonate = page.locator('a[href="/donate"]').first();
  await firstDonate.scrollIntoViewIfNeeded();
  await Promise.all([
    page.waitForURL('**/donate', { timeout: 10000 }),
    firstDonate.click(),
  ]);
  await page.waitForLoadState('networkidle');
  rec('following home→/donate lands on donate page', /\/donate$/.test(new URL(page.url()).pathname));
  rec('follow-through page has holding message',
      /Online contributions are launching soon/i.test(await page.locator('main').innerText()));

  // Responsive layout: no horizontal overflow on donate at 320/768/1440
  for (const vp of [{n:'320',w:320,h:900},{n:'768',w:768,h:1024},{n:'1440',w:1440,h:900}]) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(BASE + '/donate', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    rec(`/donate @ ${vp.n}: no horizontal overflow`, !overflow);
  }

  const passed = CHECKS.filter(c => c.p).length;
  console.log(`\n===== ${passed}/${CHECKS.length} pass =====`);
  for (const c of CHECKS) console.log(`${c.p ? 'PASS' : 'FAIL'}  ${c.n}${c.d ? ' ('+c.d+')' : ''}`);
  console.log(`\nFailures: ${CHECKS.length - passed}`);
  console.log(`Console errors: ${consoleErrors.length}`);
  if (consoleErrors.length) consoleErrors.slice(0, 8).forEach(e => console.log(' - ', e));

  await browser.close();
})();
