const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3010';
const OUT = 'C:\\Users\\General\\AppData\\Local\\Temp\\socialpwfinal';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const shot = (page, name, full = true) =>
  page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: full });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errs.push('console.error: ' + m.text());
  });

  // 1. Title sanity
  console.log('[sanity] gallery title');
  await page.goto(`${BASE}/social-media-posts`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(1000);
  console.log('  title:', await page.title());

  // 2. Card count + navbar link presence
  const cards = await page.locator('a[href^="/social-media-posts/"]').count();
  console.log('  cards in gallery:', cards);
  const navSocial = await page.locator('nav a[href="/social-media-posts"]').count();
  console.log('  navbar link present:', navSocial > 0);
  const footerSocial = await page.locator('footer a[href="/social-media-posts"]').count();
  console.log('  footer link present:', footerSocial > 0);

  // 3. Search interaction
  console.log('[interaction] search "stats"');
  await page.fill('input[placeholder*="Search"]', 'stats');
  await page.waitForTimeout(600);
  console.log('  filtered:', await page.locator('a[href^="/social-media-posts/"]').count());

  // 4. Category click
  console.log('[interaction] click Endorsements');
  await page.fill('input[placeholder*="Search"]', '');
  await page.waitForTimeout(300);
  await page.locator('button').filter({ hasText: /^Endorsements$/ }).first().click({ timeout: 5000 }).catch((e) => console.log('  click skip:', e.message));
  await page.waitForTimeout(500);
  console.log('  endorsement filtered:', await page.locator('a[href^="/social-media-posts/"]').count());

  // 5. Navigate to detail + verify content sections
  console.log('[detail] feed-stats — content checks');
  await page.goto(`${BASE}/social-media-posts/feed-stats`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2000);
  console.log('  detail title:', await page.title());
  console.log('  has live preview iframe:', await page.locator('iframe[title]').count() > 0);
  console.log('  has Full view button:', await page.locator('button:has-text("Full view")').count() > 0);
  console.log('  has About this design:', await page.locator('text=About this design').count() > 0);

  // 6. Prev/next
  console.log('[detail] prev/next navigation');
  const prevText = await page.locator('text=Previous').count();
  const nextText = await page.locator('text=Next').count();
  console.log('  prev nav present:', prevText > 0);
  console.log('  next nav present:', nextText > 0);

  // 7. Related posts
  console.log('  related section present:', await page.locator('text=Related designs').count() > 0);

  // 8. Open full view modal + verify
  console.log('[modal] open full view');
  await page.locator('button:has-text("Full view")').first().click({ timeout: 10000 });
  await page.waitForTimeout(1500);
  console.log('  modal iframe present:', await page.locator('iframe[title*="full view"]').count() > 0);
  await shot(page, 'modal-open', false);

  // 9. Esc to close
  console.log('[modal] esc to close');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);
  console.log('  modal iframe present after esc:', await page.locator('iframe[title*="full view"]').count());

  // 10. Final desktop snapshot
  await shot(page, 'final-detail-desktop');

  // 11. Direct nav check — feed-donate
  console.log('[direct] /social-media-posts/feed-donate');
  await page.goto(`${BASE}/social-media-posts/feed-donate`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  console.log('  title:', await page.title());
  await shot(page, 'final-donate-detail');

  // 12. Non-existent slug → notFound
  console.log('[404] non-existent slug');
  const resp = await page.goto(`${BASE}/social-media-posts/no-such-slug`, { waitUntil: 'domcontentloaded' });
  console.log('  status:', resp ? resp.status() : 'n/a');

  await browser.close();

  if (errs.length) {
    console.log('\nERRORS:');
    errs.forEach((e) => console.log(' ', e));
  } else {
    console.log('\nNo console/page errors');
  }
  console.log('\nDone. Screenshots:', OUT);
})().catch((e) => {
  console.error('FATAL:', e);
  process.exit(1);
});
