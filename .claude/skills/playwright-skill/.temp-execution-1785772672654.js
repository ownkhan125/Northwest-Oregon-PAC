const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000/';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // Simulate the same profile Lighthouse mobile uses (throttled) — but keep simple: fast desktop
  await page.goto(TARGET_URL, { waitUntil: 'load' });

  // Measure LCP using PerformanceObserver
  const lcp = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lastValue = 0;
      let lastEntry = null;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const last = entries[entries.length - 1];
        lastValue = last.renderTime || last.loadTime || last.startTime;
        lastEntry = {
          startTime: last.startTime,
          renderTime: last.renderTime,
          loadTime: last.loadTime,
          size: last.size,
          element: last.element?.tagName + (last.element?.className ? '.' + last.element.className.split(' ').slice(0, 3).join('.') : ''),
          text: last.element?.textContent?.slice(0, 80) || null,
        };
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });

      // Give it enough time — allow animations to run
      setTimeout(() => {
        observer.disconnect();
        resolve({ lcpMs: lastValue, entry: lastEntry });
      }, 5000);
    });
  });

  console.log('LCP result:', JSON.stringify(lcp, null, 2));
  await browser.close();
})();
