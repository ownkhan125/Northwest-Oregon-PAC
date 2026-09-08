// Render the HD33 voter-guide HTML and screenshot Page 2 to verify the
// compact layout fits (no overflow into the footer).
const { chromium } = require('playwright');

(async () => {
  // 8.5in x 11in at 96 CSS DPI = 816 x 1056 CSS px per page
  const PAGE_W = 816;
  const PAGE_H = 1056;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: PAGE_W, height: PAGE_H },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  const url = 'file:///C:/Users/General/Documents/GitHub/Northwest%20Oregon%20PAC/scripts/lead-magnets/hd33-voters-guide.html';
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // The HTML lays pages out sequentially (each `.page` is 11in tall).
  // Page 2 starts at y = 1 * PAGE_H.
  const pageEls = await page.locator('.page').all();
  console.log('page count:', pageEls.length);

  const page2 = pageEls[1];
  const box = await page2.boundingBox();
  console.log('page 2 box:', box);

  // Screenshot page 2 exactly
  const outPath = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/funnel_playwright/hd33-page2-preview.png';
  await page2.screenshot({ path: outPath });
  console.log('preview saved:', outPath);

  // Also check if any of page 2's card content bottom is below the footer's top
  const layout = await page.evaluate(() => {
    const p2 = document.querySelectorAll('.page')[1];
    const cards = p2.querySelectorAll('.card');
    const footer = p2.querySelector('.footer');
    const p2Rect = p2.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const cardRects = Array.from(cards).map((c, i) => ({
      idx: i,
      who: c.querySelector('.who')?.textContent?.trim() || '',
      bottom: c.getBoundingClientRect().bottom,
    }));
    return {
      pageTop: p2Rect.top,
      pageBottom: p2Rect.bottom,
      footerTop: footerRect.top,
      footerBottom: footerRect.bottom,
      cardRects,
    };
  });
  console.log('layout:', JSON.stringify(layout, null, 2));

  const overflow = layout.cardRects.some((c) => c.bottom > layout.footerTop);
  console.log(overflow ? 'FAIL: content overflows footer' : 'PASS: content fits above footer');

  await browser.close();
})();
