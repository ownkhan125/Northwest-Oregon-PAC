const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const routes = ['/', '/about', '/ask', '/events', '/contact', '/faq', '/blogs', '/social-media-posts', '/privacy-policy', '/terms-of-service'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const internalLinks = new Set();
  const failures = [];

  for (const r of routes) {
    const resp = await page.goto(BASE + r, { waitUntil: 'networkidle', timeout: 45000 });
    if (!resp || resp.status() >= 400) {
      failures.push(r + ' status ' + (resp && resp.status()));
      continue;
    }
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    hrefs.forEach((h) => {
      if (!h) return;
      if (h.startsWith('/') && !h.startsWith('//')) {
        // Strip fragment/query for uniqueness
        const clean = h.split('#')[0].split('?')[0];
        if (clean && clean !== '/') internalLinks.add(clean);
        else if (clean === '/') internalLinks.add('/');
      }
    });
  }

  console.log('Internal links found across all pages:', [...internalLinks].sort().join(', '));

  // Check each unique internal link resolves
  for (const link of internalLinks) {
    const resp = await page.goto(BASE + link, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const s = resp && resp.status();
    if (s >= 400) failures.push('Broken: ' + link + ' (' + s + ')');
  }

  console.log('\nBROKEN LINKS:', failures.length ? failures : 'none');
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
