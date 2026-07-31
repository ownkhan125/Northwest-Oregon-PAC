const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
  const page = await context.newPage();

  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);

  const offenders = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    const footerRect = footer.getBoundingClientRect();
    const rightEdge = footerRect.right;
    const out = [];
    footer.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > rightEdge + 1 && r.width > 0) {
        out.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className || '').toString().slice(0, 120),
          text: (el.textContent || '').trim().slice(0, 60),
          right: Math.round(r.right),
          overhang: Math.round(r.right - rightEdge),
        });
      }
    });
    return { rightEdge: Math.round(rightEdge), offenders: out.slice(0, 15) };
  });

  console.log(JSON.stringify(offenders, null, 2));
  await browser.close();
})();
