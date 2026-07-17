const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage());

  const msgs = [];
  page.on('console', (m) => {
    const t = m.type();
    if (t === 'error' || t === 'warning' || t === 'warn') msgs.push(`[${t}] ${m.text()}`);
  });
  page.on('pageerror', (e) => msgs.push(`[pageerror] ${e.message}`));

  for (const url of ['http://localhost:3000/blogs', 'http://localhost:3000/blogs/economic-prosperity-northwest-oregon']) {
    console.log('--- visit', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    // Enumerate any <img> with empty src
    const empty = await page.evaluate(() =>
      [...document.querySelectorAll('img')]
        .filter((el) => el.getAttribute('src') === '' || el.currentSrc === '')
        .map((el) => ({ outer: el.outerHTML.slice(0, 200), rect: el.getBoundingClientRect() })),
    );
    console.log('  imgs with empty src:', empty.length);
    if (empty.length) console.log('   →', JSON.stringify(empty, null, 2));
  }

  console.log('\n--- console messages:');
  if (msgs.length === 0) console.log('  (none)');
  else msgs.forEach((m) => console.log(' ', m));

  await browser.close();
})();
