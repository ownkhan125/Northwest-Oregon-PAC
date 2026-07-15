const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { path: '/', name: 'home', accent: '/icons/target.svg' },
  { path: '/about', name: 'about', accent: '/icons/certificate.svg' },
  { path: '/ask', name: 'ask', accent: '/icons/document.svg' },
  { path: '/contact', name: 'contact', accent: '/icons/envelope.svg' },
  { path: '/donate', name: 'donate', accent: '/icons/money-bag.svg' },
  { path: '/events', name: 'events', accent: '/icons/podium.svg' },
  { path: '/faq', name: 'faq', accent: '/icons/gavel.svg' },
  { path: '/volunteer', name: 'volunteer', accent: '/icons/ballot-box.svg' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 900, height: 1200 },
  { name: 'mobile', width: 390, height: 844 },
];

const messages = [];

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    const consoleMsgs = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMsgs.push(`[${msg.type()}] ${msg.text()}`);
      }
    });
    page.on('pageerror', (err) => consoleMsgs.push(`[pageerror] ${err.message}`));

    for (const p of PAGES) {
      const url = BASE + p.path;
      console.log(`\n=== ${vp.name} :: ${p.path} ===`);

      // Capture initial layout state to check for layout shift
      const errBefore = consoleMsgs.length;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      console.log('  status:', response?.status());

      await page.waitForTimeout(500);

      // Verify icon SVGs are being requested successfully
      const iconResp = await page.evaluate(async (src) => {
        try {
          const r = await fetch(src);
          return { ok: r.ok, status: r.status, size: (await r.text()).length };
        } catch (e) {
          return { ok: false, error: e.message };
        }
      }, p.accent);
      console.log(`  ${p.accent} ->`, iconResp);

      // Full-page screenshot
      const shot = path.join(OUT, `${p.name}_${vp.name}.png`);
      await page.screenshot({ path: shot, fullPage: false });
      console.log('  📸', shot);

      // Layout stability check: capture body scroll height twice
      const h1 = await page.evaluate(() => document.body.scrollHeight);
      await page.waitForTimeout(400);
      const h2 = await page.evaluate(() => document.body.scrollHeight);
      if (h1 !== h2) {
        messages.push(`⚠️  layout shift on ${p.name} (${vp.name}): ${h1} -> ${h2}`);
      }

      // Report console errors that happened on this page
      const newErrs = consoleMsgs.slice(errBefore);
      if (newErrs.length) {
        messages.push(`⚠️  console on ${p.name} (${vp.name}):`);
        newErrs.forEach((m) => messages.push('    ' + m));
      }
    }

    await context.close();
  }

  await browser.close();
  console.log('\n---SUMMARY---');
  if (messages.length) messages.forEach((m) => console.log(m));
  else console.log('OK — no layout shifts or console errors detected.');
})();
