const { chromium } = require('playwright');
const http = require('http');

const BASE = 'http://localhost:3000';
const SECRET = 'nwop-blogs-revalidate-2026-a17f4c';

function request(method, url, { body, headers } = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const buf = body ? Buffer.from(JSON.stringify(body)) : null;
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port || 80,
        path: u.pathname + u.search,
        method,
        headers: {
          Accept: 'application/json',
          ...(buf ? { 'Content-Type': 'application/json', 'Content-Length': buf.length } : {}),
          ...(headers || {}),
        },
      },
      (res) => {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString('utf8') }),
        );
      },
    );
    req.on('error', reject);
    if (buf) req.write(buf);
    req.end();
  });
}

function head(url) {
  return new Promise((resolve) => {
    const u = new URL(url);
    const req = http.request(
      { hostname: u.hostname, port: u.port || 80, path: u.pathname + u.search, method: 'HEAD' },
      (res) => resolve({ status: res.statusCode }),
    );
    req.on('error', () => resolve({ status: 0 }));
    req.end();
  });
}

const pass = (msg) => console.log('  ✓', msg);
const fail = (msg) => { console.log('  ✗', msg); process.exitCode = 1; };

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleMsgs = [];
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning' || t === 'warn') consoleMsgs.push(`[${t}] ${m.text()}`);
  });
  page.on('pageerror', (e) => consoleMsgs.push(`[pageerror] ${e.message}`));
  const failedReqs = [];
  page.on('requestfailed', (r) => failedReqs.push(`${r.method()} ${r.url()} — ${r.failure()?.errorText}`));
  const badResponses = [];
  page.on('response', (r) => {
    const s = r.status();
    if (s >= 400 && new URL(r.url()).origin === BASE) {
      badResponses.push(`${s} ${r.url()}`);
    }
  });

  // ---------- 1. Listing renders with live GHL data ----------
  console.log('\n[1] /blogs listing');
  await page.goto(BASE + '/blogs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const listing = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a[href^="/blogs/"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => /^\/blogs\/[^/?#]+$/.test(h));
    const uniqueSlugs = [...new Set(links.map((h) => h.replace('/blogs/', '')))];
    const cardTitles = [...document.querySelectorAll('article h3')].map((h) =>
      h.textContent.trim(),
    );
    const heroImages = [...document.querySelectorAll('article img')].map((i) => i.getAttribute('src'));
    const emptyStateVisible = !!document.querySelector('[class*="border-primary/25"] h2, [class*="border-primary\\/25"] h2');
    return { uniqueSlugs, cardTitles, heroImages, emptyStateVisible, linkCount: links.length };
  });
  console.log('   slugs:', listing.uniqueSlugs);
  console.log('   titles:', listing.cardTitles);
  console.log('   heroes:', listing.heroImages);
  if (listing.uniqueSlugs.length >= 1) pass('at least one live GHL post rendered'); else fail('no posts on listing');
  if (listing.heroImages.every((s) => !s || s.startsWith('http'))) pass('all hero images have absolute URLs (or gated placeholder)');
  else fail('found empty img src on listing');
  if (listing.cardTitles.every((t) => t && t.length > 0)) pass('every card has a title');
  else fail('empty card title present');

  const firstSlug = listing.uniqueSlugs[0];

  // ---------- 2. Detail page renders all fields ----------
  console.log('\n[2] /blogs/' + firstSlug);
  await page.goto(BASE + '/blogs/' + firstSlug, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const detail = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const title = document.title;
    const desc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const og = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogImg = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
    const paragraphs = [...document.querySelectorAll('#article-body p')].length;
    const h2s = [...document.querySelectorAll('#article-body h2')].map((h) => h.textContent.trim());
    const tocLinks = [...document.querySelectorAll('nav a[href^="#"], aside a[href^="#"]')].length;
    const authorLine = document.querySelector('.text-foreground\\/85')?.textContent?.trim() || '';
    const emptyImgs = [...document.querySelectorAll('img')].filter((i) => i.getAttribute('src') === '').length;
    return {
      h1: h1?.textContent?.trim() || '',
      title,
      desc,
      og,
      ogImg,
      paragraphs,
      h2s,
      tocLinks,
      authorLine,
      emptyImgs,
    };
  });
  console.log('   h1:', detail.h1);
  console.log('   <title>:', detail.title);
  console.log('   og:title:', detail.og);
  console.log('   og:image:', detail.ogImg);
  console.log('   body paragraphs:', detail.paragraphs, '  h2 headings:', detail.h2s.length);
  console.log('   TOC links:', detail.tocLinks);
  console.log('   empty img srcs:', detail.emptyImgs);

  if (detail.h1) pass('H1 rendered'); else fail('no H1');
  if (detail.title.includes('Northwest Oregon PAC')) pass('SEO title present');
  else fail('SEO title missing brand suffix');
  if (detail.desc && detail.desc.length > 20) pass('meta description present');
  else fail('meta description missing');
  if (detail.og) pass('og:title present'); else fail('og:title missing');
  if (detail.ogImg) pass('og:image present'); else console.log('    (no OG image — expected when post has no hero)');
  if (detail.paragraphs >= 3) pass('article body has multiple paragraphs');
  else fail('article body suspiciously short');
  if (detail.h2s.length >= 1) pass('article has H2 headings → TOC populated');
  if (detail.tocLinks >= 1) pass('TOC has anchor links');
  if (detail.emptyImgs === 0) pass('no empty img srcs'); else fail(`${detail.emptyImgs} empty img src(s)`);

  // ---------- 3. Unknown slug → not-found UI + noindex ----------
  // Per Next.js 15 docs, streamed not-found responses return HTTP 200 with the
  // not-found UI rendered and `<meta name="robots" content="noindex">` injected
  // for SEO. Non-streamed responses would return 404.
  console.log('\n[3] Unknown slug → not-found UI + noindex meta');
  const notFoundRes = await request('GET', BASE + '/blogs/definitely-does-not-exist-xyz');
  const hasNotFoundUi = /Page not found/i.test(notFoundRes.body);
  const hasNoindex = /name="robots"\s+content="noindex/i.test(notFoundRes.body);
  if (hasNotFoundUi) pass('not-found UI rendered');
  else fail('not-found UI missing');
  if (hasNoindex) pass('robots noindex meta injected');
  else fail('noindex meta missing');

  // ---------- 4. Revalidate endpoint (auth + happy path + invalid) ----------
  console.log('\n[4] /api/revalidate/blogs');
  const noAuth = await request('POST', BASE + '/api/revalidate/blogs', { body: {} });
  if (noAuth.status === 401) pass('POST without secret → 401');
  else fail(`expected 401 no-secret, got ${noAuth.status}`);

  const badAuth = await request('POST', BASE + '/api/revalidate/blogs', {
    body: {},
    headers: { 'x-revalidate-secret': 'wrong-secret' },
  });
  if (badAuth.status === 401) pass('POST with wrong secret → 401');
  else fail(`expected 401 wrong-secret, got ${badAuth.status}`);

  const ok = await request('POST', BASE + '/api/revalidate/blogs', {
    body: { slug: firstSlug },
    headers: { 'x-revalidate-secret': SECRET },
  });
  console.log('   200 body:', ok.body);
  if (ok.status === 200) {
    const j = JSON.parse(ok.body);
    if (j.ok && Array.isArray(j.revalidated) && j.revalidated.includes('/blogs')
        && j.revalidated.includes(`/blogs/${firstSlug}`)
        && j.revalidated.includes('tag:ghl-blogs')) {
      pass('POST with secret revalidates listing, slug, and tag');
    } else fail('response shape wrong');
  } else fail(`expected 200 with secret, got ${ok.status}`);

  const okGet = await request('GET', BASE + '/api/revalidate/blogs?secret=' + SECRET);
  if (okGet.status === 200) pass('GET with ?secret= works (browser-bookmark ping)');
  else fail(`GET with secret failed: ${okGet.status}`);

  // ---------- 5. After revalidation, listing + detail still render ----------
  console.log('\n[5] After revalidate — pages still healthy');
  await page.goto(BASE + '/blogs', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const afterCount = await page.evaluate(() =>
    new Set(
      [...document.querySelectorAll('a[href^="/blogs/"]')]
        .map((a) => a.getAttribute('href'))
        .filter((h) => /^\/blogs\/[^/?#]+$/.test(h))
        .map((h) => h.replace('/blogs/', '')),
    ).size,
  );
  if (afterCount >= 1) pass(`listing still shows ${afterCount} post(s) after revalidate`);
  else fail('listing broke after revalidate');

  await page.goto(BASE + '/blogs/' + firstSlug, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const afterDetailH1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim());
  if (afterDetailH1) pass('detail still renders after revalidate');
  else fail('detail broke after revalidate');

  // ---------- 6. All in-site links resolve ----------
  console.log('\n[6] Link crawl (in-site links from /blogs and detail)');
  const links = await page.evaluate(() =>
    [...document.querySelectorAll('a[href]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h && h.startsWith('/') && !h.startsWith('/api/'))
      .filter((h, i, arr) => arr.indexOf(h) === i),
  );
  const brokenLinks = [];
  for (const href of links) {
    const r = await head(BASE + href);
    if (r.status >= 400) brokenLinks.push(`${r.status} ${href}`);
  }
  if (brokenLinks.length === 0) pass(`all ${links.length} in-site links resolved (HEAD status < 400)`);
  else { console.log('   broken:', brokenLinks); fail('broken in-site links'); }

  // ---------- 7. Console / network hygiene ----------
  console.log('\n[7] Console + network');
  if (consoleMsgs.length === 0) pass('zero console errors/warnings');
  else { consoleMsgs.forEach((m) => console.log('   ', m)); fail('console noise'); }
  if (failedReqs.length === 0) pass('zero failed requests');
  else { failedReqs.forEach((m) => console.log('   ', m)); fail('failed requests'); }
  if (badResponses.length === 0) pass('zero same-origin 4xx/5xx responses');
  else { badResponses.forEach((m) => console.log('   ', m)); fail('bad responses'); }

  await browser.close();

  console.log(
    process.exitCode === 1
      ? '\n=== BLOG INTEGRATION AUDIT: FAILED ✗ ==='
      : '\n=== BLOG INTEGRATION AUDIT: PASSED ✓ ===',
  );
})();
