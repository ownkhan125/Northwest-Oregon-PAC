const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const ROUTES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/ask', label: 'Ask' },
  { path: '/blogs', label: 'Blogs' },
  { path: '/events', label: 'Events' },
  { path: '/volunteer', label: 'Volunteer' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'Contact' },
];

async function activeAria(page) {
  return await page.evaluate(() => {
    const link = document.querySelector('header nav a[aria-current="page"]');
    return link ? (link.textContent || '').trim() : null;
  });
}

async function activePillBox(page) {
  return await page.evaluate(() => {
    const link = document.querySelector('header nav a[aria-current="page"]');
    if (!link) return null;
    const r = link.getBoundingClientRect();
    const pill = link.querySelector('span[aria-hidden]');
    const pillBox = pill ? pill.getBoundingClientRect() : null;
    return {
      label: (link.textContent || '').trim(),
      link: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
      pillPresent: !!pill,
      pillW: pillBox ? Math.round(pillBox.width) : 0,
    };
  });
}

async function testRoute(page, route, mode) {
  console.log(`\n---- [${mode}] route=${route.path} expect active=${route.label} ----`);
  await page.emulateMedia({ colorScheme: mode });
  await page.goto(BASE + route.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);

  // 1. Correct link has aria-current="page"
  const aria = await activeAria(page);
  console.log(`  aria-current label: ${aria} (expect ${route.label})`);
  if (aria !== route.label) throw new Error(`Wrong active: ${aria} vs ${route.label}`);

  // 2. Persistent active pill is present
  const initial = await activePillBox(page);
  console.log(`  active pill present: ${initial.pillPresent} (w=${initial.pillW})`);
  if (!initial.pillPresent) throw new Error('Active pill missing');

  // 3. Hover another link — active pill must remain on the current-page link
  const otherLink = route.label === 'Home' ? 'About' : 'Home';
  await page.locator(`header nav a:has-text("${otherLink}")`).first().hover();
  await page.waitForTimeout(500);

  const afterHover = await activePillBox(page);
  console.log(`  after hovering "${otherLink}", active label still: ${afterHover.label} (expect ${route.label})`);
  if (afterHover.label !== route.label) throw new Error(`Active drifted during hover`);
  if (!afterHover.pillPresent) throw new Error('Active pill disappeared during hover on other link');

  // Snap when hovering non-active
  await page.screenshot({
    path: path.join(OUT, `nav_persist_${mode}_${route.label}_hoveringOther.png`),
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 100 },
  });

  // 4. Move mouse off nav — active pill remains, hover pill fades
  await page.mouse.move(20, 500);
  await page.waitForTimeout(600);
  const idle = await activePillBox(page);
  console.log(`  after mouseleave, active label: ${idle.label}`);
  if (idle.label !== route.label) throw new Error('Active lost after mouseleave');

  // 5. Flicker check — sample the active link's textColor twice in quick succession
  const color1 = await page.evaluate(() => {
    const l = document.querySelector('header nav a[aria-current="page"]');
    return l ? window.getComputedStyle(l).color : null;
  });
  await page.waitForTimeout(120);
  const color2 = await page.evaluate(() => {
    const l = document.querySelector('header nav a[aria-current="page"]');
    return l ? window.getComputedStyle(l).color : null;
  });
  console.log(`  color stability: ${color1 === color2 ? '✓' : '✗ flicker'}`);
  if (color1 !== color2) throw new Error(`Color flicker: ${color1} → ${color2}`);
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const mode of ['light', 'dark']) {
    console.log(`\n============ colorScheme=${mode} ============`);
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: mode });
    const page = await context.newPage();
    const errs = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errs.push('[console] ' + msg.text()); });
    page.on('pageerror', (e) => errs.push('[pageerror] ' + e.message));

    for (const route of ROUTES) {
      try {
        await testRoute(page, route, mode);
      } catch (e) {
        console.error(`❌ ${route.path} failed:`, e.message);
        await page.screenshot({ path: path.join(OUT, `nav_persist_fail_${mode}_${route.label}.png`) });
        await browser.close();
        process.exit(1);
      }
    }

    // Nav layout stability across a hover cycle: measure before/after cycling every link
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const box0 = await page.evaluate(() => {
      const n = document.querySelector('header nav');
      const r = n.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    for (const r of ROUTES) {
      await page.locator(`header nav a:has-text("${r.label}")`).first().hover();
      await page.waitForTimeout(180);
    }
    await page.mouse.move(20, 500);
    await page.waitForTimeout(400);
    const box1 = await page.evaluate(() => {
      const n = document.querySelector('header nav');
      const r = n.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height) };
    });
    console.log(`\n  nav bbox before/after hover cycle: ${JSON.stringify(box0)} / ${JSON.stringify(box1)}`);
    if (box0.w !== box1.w || box0.h !== box1.h) throw new Error('Nav dimensions shifted');

    console.log(`  Console errors: ${errs.length ? errs.join(' | ') : '(none) ✓'}`);
    if (errs.length) { await browser.close(); process.exit(1); }
    await context.close();
  }

  await browser.close();
  console.log('\n=== NAVBAR ACTIVE PERSISTENCE VERIFIED ✓ ===');
})();
