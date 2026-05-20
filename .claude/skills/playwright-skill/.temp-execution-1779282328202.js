const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

const routes = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/events', name: 'events' },
  { path: '/events/town-hall-cost-of-living-ca-14', name: 'event-detail' },
  { path: '/volunteer', name: 'volunteer' },
  { path: '/contact', name: 'contact' },
  { path: '/donate', name: 'donate' },
  { path: '/privacy-policy', name: 'privacy' },
  { path: '/terms-of-service', name: 'terms' },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', (e) => errors.push(`PAGEERROR [${page.url()}]: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`CONSOLE [${page.url()}]: ${m.text()}`);
  });

  await page.setViewportSize({ width: 1440, height: 900 });

  for (const r of routes) {
    const url = TARGET_URL + r.path;
    console.log(`\n=== ${r.path} ===`);
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log(`  status: ${resp?.status()}`);
    await page.waitForTimeout(2000);

    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const step = window.innerHeight * 0.7;
        const total = document.body.scrollHeight;
        let s = 0;
        const id = setInterval(() => {
          window.scrollBy(0, step);
          s += step;
          if (s >= total) {
            clearInterval(id);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 90);
      });
    });
    await page.waitForTimeout(800);

    const title = await page.title();
    console.log(`  title: ${title}`);

    await page.screenshot({
      path: `C:/Users/General/AppData/Local/Temp/route-${r.name}.png`,
      fullPage: true,
    });
    console.log(`  screenshot: route-${r.name}.png`);

    const hasHOverflow = await page.evaluate(() => {
      return (
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth
      );
    });
    if (hasHOverflow) console.log(`  ⚠ horizontal overflow`);
  }

  console.log('\n=== Mobile (390px) ===');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const r of routes) {
    await page.goto(TARGET_URL + r.path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: `C:/Users/General/AppData/Local/Temp/route-${r.name}-mobile.png`,
      fullPage: false,
    });
  }

  console.log('\n=== ERRORS ===');
  if (errors.length === 0) console.log('no errors');
  else errors.forEach((e) => console.log(e));

  await browser.close();
})();
