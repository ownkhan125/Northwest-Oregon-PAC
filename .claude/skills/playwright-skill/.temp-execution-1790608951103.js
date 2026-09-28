const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

const PDF_PATH = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/public/downloads/cd1-voters-guide.pdf';
const HTML_PATH = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/scripts/lead-magnets/cd1-voters-guide.html';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Render the HTML pages at print size to verify layout
  await page.setViewportSize({ width: 816, height: 1056 }); // 8.5in × 11in @ 96dpi
  await page.goto(pathToFileURL(HTML_PATH).toString(), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Screenshot each .page section separately
  const pageCount = await page.locator('section.page').count();
  console.log(`Found ${pageCount} pages`);

  for (let i = 0; i < pageCount; i++) {
    const section = page.locator('section.page').nth(i);
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const outPath = `C:/tmp/cd1-p${String(i + 1).padStart(2, '0')}.png`;
    await section.screenshot({ path: outPath });
    console.log(`Saved page ${i + 1} -> ${outPath}`);
  }

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
