const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', (err) => errors.push(`PAGEERROR: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`CONSOLE: ${msg.text()}`);
  });

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 900, height: 1200 },
    { name: 'tablet-md', width: 820, height: 1180 },
    { name: 'mobile', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Scroll the page to trigger whileInView animations
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        const step = window.innerHeight * 0.6;
        const totalHeight = document.body.scrollHeight;
        let scrolled = 0;
        const id = setInterval(() => {
          window.scrollBy(0, step);
          scrolled += step;
          if (scrolled >= totalHeight) {
            clearInterval(id);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 120);
      });
    });

    await page.waitForTimeout(1200);
    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(800);

    await page.screenshot({
      path: `C:/Users/General/AppData/Local/Temp/politco-${vp.name}.png`,
      fullPage: true,
    });
    console.log(`screenshot saved: politco-${vp.name}.png`);
  }

  console.log('\n=== ERRORS ===');
  if (errors.length === 0) console.log('no errors');
  else errors.forEach((e) => console.log(e));

  await browser.close();
})();
