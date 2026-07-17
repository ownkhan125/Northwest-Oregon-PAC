const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000/social-posts';
const OUT_DIR = 'C:/Users/ibad5/AppData/Local/Temp/claude/d--Github-Northwest-Oregon-PAC/bde09b00-787f-4dc0-8c86-42999d62aa93/scratchpad';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
    // Scroll through the page so whileInView animations fire before capture
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `${OUT_DIR}/social-desktop.png`, fullPage: true });
    console.log('desktop done');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(async () => {
      for (let y = 0; y <= document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${OUT_DIR}/social-mobile.png`, fullPage: true });
    console.log('mobile done');
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await browser.close();
  }
})();
