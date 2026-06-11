const { chromium } = require('playwright');
const path = require('path');

const CAMPAIGN_DIR = 'C:/Users/General/Documents/GitHub/politco/campaign-social';

const targets = [
  { f: 'feed-09-movement.html', w: 1080, h: 1080 },
  { f: 'feed-10-donate.html',    w: 1080, h: 1080 },
  { f: 'story-09-trail.html',    w: 1080, h: 1920 },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const t of targets) {
    const ctx = await browser.newContext({ viewport: { width: t.w, height: t.h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const url = 'file:///' + path.join(CAMPAIGN_DIR, t.f).replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.addStyleTag({ content: 'body{padding:0!important;background:#000!important;} .canvas{box-shadow:none!important;border-radius:0!important;}' });
    await page.waitForTimeout(700);
    const outPath = path.join(CAMPAIGN_DIR, '_previews', t.f.replace('.html', '.png'));
    await page.locator('.canvas').screenshot({ path: outPath });
    console.log('  ✓ ' + t.f);
    await ctx.close();
  }
  await browser.close();
  console.log('Done.');
})();
