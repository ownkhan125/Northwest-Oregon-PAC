const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const SECTIONS = ['#vision', '#candidates', '#donate', 'footer'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  for (const sel of SECTIONS) {
    const el = await page.$(sel);
    if (!el) {
      console.log('MISS', sel);
      continue;
    }
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000); // let motion animations play out
    const clean = sel.replace(/[^\w]/g, '');
    const shot = path.join(OUT, `home_section_${clean || 'footer'}.png`);
    await page.screenshot({ path: shot, fullPage: false });
    console.log('📸', shot);
  }

  // Also grab full-page shot
  await page.screenshot({
    path: path.join(OUT, 'home_full.png'),
    fullPage: true,
  });
  console.log('📸 home_full.png');

  await browser.close();
})();
