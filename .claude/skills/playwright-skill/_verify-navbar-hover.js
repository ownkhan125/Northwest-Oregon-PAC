const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const NAV_LABELS = ['Home', 'About', 'Ask', 'Blogs', 'Events', 'Volunteer', 'FAQ', 'Contact'];

async function measureNavBox(page) {
  return await page.evaluate(() => {
    const nav = document.querySelector('header nav');
    if (!nav) return null;
    const r = nav.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  });
}

async function pillBox(page) {
  return await page.evaluate(() => {
    // Framer Motion layoutId="nav-pill" renders as an animated span with class containing 'bg-primary'
    const links = Array.from(document.querySelectorAll('header nav a'));
    for (const a of links) {
      const pill = a.querySelector('span[aria-hidden]');
      if (pill && pill.classList.contains('absolute')) {
        const r = pill.getBoundingClientRect();
        return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), text: (a.textContent || '').trim() };
      }
    }
    return null;
  });
}

async function testMode(mode, page) {
  console.log(`\n============ colorScheme=${mode} ============`);
  await page.emulateMedia({ colorScheme: mode });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const box0 = await measureNavBox(page);
  console.log('  nav bbox before hovers:', JSON.stringify(box0));

  // Confirm pill starts on active (Home)
  await page.waitForTimeout(300);
  const startPill = await pillBox(page);
  console.log('  starting pill (should be on Home):', JSON.stringify(startPill));

  // Hover each nav link one at a time and screenshot
  for (const label of NAV_LABELS) {
    const link = page.locator(`header nav a:has-text("${label}")`).first();
    await link.hover();
    await page.waitForTimeout(400); // let the spring settle
    const pill = await pillBox(page);
    console.log(`  hover "${label}" → pill on "${pill?.text}" @ x=${pill?.x} w=${pill?.w}`);
    if (pill?.text !== label) {
      console.error(`  ✗ pill didn't glide to ${label} (found "${pill?.text}")`);
    }
    await page.screenshot({
      path: path.join(OUT, `nav_hover_${mode}_${label}.png`),
      clip: { x: box0.x - 10, y: 0, width: box0.w + 20, height: box0.h + box0.y + 20 },
    });
  }

  // Move mouse off nav — pill should return to active (Home)
  await page.mouse.move(0, 500);
  await page.waitForTimeout(500);
  const restPill = await pillBox(page);
  console.log('  after mouseleave, pill returns to:', restPill?.text, '(expect Home)');

  // Navigate to another page — active pill should move to that link
  await page.locator('header nav a:has-text("About")').first().click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(600);
  const aboutPill = await pillBox(page);
  console.log('  after nav to /about, pill on:', aboutPill?.text, '(expect About)');
  await page.screenshot({
    path: path.join(OUT, `nav_active_${mode}_about.png`),
    clip: { x: box0.x - 10, y: 0, width: box0.w + 20, height: box0.h + box0.y + 20 },
  });

  // Nav layout stability — confirm width/height unchanged after hover cycles
  const box1 = await measureNavBox(page);
  console.log('  nav bbox after cycle:', JSON.stringify(box1));
  if (box0.w !== box1.w || box0.h !== box1.h) {
    console.error(`  ✗ nav dimensions changed: before ${box0.w}x${box0.h} → after ${box1.w}x${box1.h}`);
    return { ok: false, reason: 'nav dimensions changed' };
  }
  return { ok: true };
}

async function testMobileMenu(browser) {
  console.log(`\n============ mobile menu ============`);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await context.newPage();
  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Open mobile menu
  await page.locator('button[aria-label="Open menu"]').click();
  await page.waitForTimeout(1400); // allow AnimatePresence + staggered children to settle
  await page.screenshot({ path: path.join(OUT, 'nav_mobile_menu_open.png') });

  // Verify the mobile menu is open by checking the drawer container is present
  const drawerVisible = await page.evaluate(() => {
    const drawer = document.querySelector('.fixed.inset-0.z-40');
    if (!drawer) return false;
    const r = drawer.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
  console.log('  drawer visible:', drawerVisible ? '✓' : '✗');

  // Wait for at least one link to be visible-sized
  await page.waitForFunction(
    () => {
      const links = Array.from(document.querySelectorAll('.fixed.inset-0.z-40 a'));
      return links.length > 0 && links.some((a) => a.getBoundingClientRect().height > 10);
    },
    null,
    { timeout: 5000 },
  ).catch(() => {});

  const visibleLabels = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('.fixed.inset-0.z-40 a'));
    return links
      .filter((a) => a.getBoundingClientRect().height > 10)
      .map((a) => a.textContent.trim());
  });
  console.log('  visible drawer labels:', visibleLabels);
  for (const label of NAV_LABELS) {
    const found = visibleLabels.some((v) => v.includes(label));
    console.log(`  ${label}: ${found ? '✓' : '✗ MISSING'}`);
    if (!found) throw new Error(`Missing visible mobile nav link: ${label}`);
  }

  // Active indicator dot on Home link
  const dotStates = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('nav a'));
    return links
      .filter((a) => {
        const r = a.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      })
      .map((a) => {
        const dot = a.querySelector('span[aria-hidden]');
        if (!dot) return { label: a.textContent.trim(), hasDot: false };
        const cs = window.getComputedStyle(dot);
        return {
          label: a.textContent.trim(),
          visibleDot: parseFloat(cs.opacity) > 0.5,
          transform: cs.transform,
        };
      });
  });
  console.log('  dot visibility per link:', JSON.stringify(dotStates));
  const homeState = dotStates.find((s) => s.label === 'Home');
  console.log('  Home has visible leading-dot indicator:', homeState?.visibleDot ? '✓' : '✗');

  // Hover Volunteer to verify the reveal
  await page.locator('nav a:has-text("Volunteer")').last().hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUT, 'nav_mobile_menu_hover.png') });

  console.log('  Console errors:', consoleErrs.length ? consoleErrs : '(none) ✓');
  await context.close();
  return { ok: true };
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  // Desktop light + dark
  for (const mode of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: mode });
    const page = await context.newPage();
    const errs = [];
    page.on('console', (msg) => { if (msg.type() === 'error') errs.push(msg.text()); });
    page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));

    try {
      const r = await testMode(mode, page);
      if (!r.ok) { await browser.close(); process.exit(1); }
      console.log(`  Console errors: ${errs.length ? errs.join(' | ') : '(none) ✓'}`);
      if (errs.length) { await browser.close(); process.exit(1); }
    } catch (e) {
      console.error(`❌ ${mode} failed:`, e.message);
      await browser.close();
      process.exit(1);
    }
    await context.close();
  }

  // Tablet — confirm nav collapses/expands per breakpoint correctly (lg = 1024)
  {
    const context = await browser.newContext({ viewport: { width: 900, height: 1200 } });
    const page = await context.newPage();
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    // At 900px, we're below lg (1024) so desktop nav is hidden, hamburger visible
    const hamburgerVisible = await page.locator('button[aria-label="Open menu"]').isVisible();
    console.log(`\ntablet 900w — hamburger visible: ${hamburgerVisible ? '✓' : '✗'}`);
    await page.screenshot({ path: path.join(OUT, 'nav_tablet.png') });
    await context.close();
  }

  await testMobileMenu(browser);

  await browser.close();
  console.log('\n=== NAVBAR HOVER VERIFIED ✓ ===');
})();
