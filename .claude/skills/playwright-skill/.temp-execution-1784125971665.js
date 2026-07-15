const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000/funnel';

const errors = [];
const warnings = [];
const linkResults = { ok: [], broken: [] };

function attachConsole(page) {
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') errors.push(`[error] ${text}`);
    else if (type === 'warning') warnings.push(`[warn] ${text}`);
  });
  page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));
}

async function checkForNavAndFooter(page) {
  const navLinks = ['Home', 'About', 'Ask', 'Blogs', 'Events', 'Volunteer', 'FAQ', 'Contact'];
  const found = [];
  for (const label of navLinks) {
    // check for a header/nav anchor that matches exactly
    const count = await page
      .locator('header a', { hasText: new RegExp(`^\\s*${label}\\s*$`) })
      .count()
      .catch(() => 0);
    if (count > 0) found.push(label);
  }
  const footerCols = ['The PAC', 'Get involved'];
  const footerFound = [];
  for (const label of footerCols) {
    const c = await page.locator(`text=${label}`).count().catch(() => 0);
    if (c > 0) footerFound.push(label);
  }
  return { headerNavLinksFound: found, footerColsFound: footerFound };
}

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 40 });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  attachConsole(page);

  console.log('=== 1. NAVIGATE ===');
  const resp = await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  console.log(`HTTP: ${resp.status()}  title: ${await page.title()}`);

  await page.waitForTimeout(600);

  console.log('\n=== 2. NAV/FOOTER GUARD ===');
  const guard = await checkForNavAndFooter(page);
  console.log('header nav links found:', guard.headerNavLinksFound);
  console.log('footer columns found:', guard.footerColsFound);

  console.log('\n=== 3. HERO CONTENT ===');
  const heroHeadingVisible = await page
    .getByText(/a voice\./i)
    .first()
    .isVisible()
    .catch(() => false);
  console.log('hero headline visible:', heroHeadingVisible);
  const formVisible = await page.locator('form').first().isVisible();
  console.log('form visible:', formVisible);
  await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/funnel-desktop-light.png', fullPage: false });
  console.log('screenshot: funnel-desktop-light.png');

  console.log('\n=== 4. FORM: submit empty ===');
  const submitBtn = page.locator('[data-testid="funnel-submit"]').first();
  await submitBtn.scrollIntoViewIfNeeded();
  await submitBtn.click();
  await page.waitForTimeout(300);
  const nameErr = await page.getByText('Please enter your name.').isVisible().catch(() => false);
  const emailErr = await page.getByText('Email is required.').isVisible().catch(() => false);
  const phoneErr = await page.getByText('Phone is required.').isVisible().catch(() => false);
  const zipErr = await page.getByText('ZIP is required.').isVisible().catch(() => false);
  console.log({ nameErr, emailErr, phoneErr, zipErr });

  console.log('\n=== 5. FORM: invalid email ===');
  const form = page.locator('form').first();
  await form.locator('input[name="name"]').fill('Jane Doe');
  await form.locator('input[name="email"]').fill('notanemail');
  await form.locator('input[name="phone"]').fill('503-555-0100');
  await form.locator('input[name="zip"]').fill('97005');
  await submitBtn.click();
  await page.waitForTimeout(300);
  const invalidEmailErr = await page.getByText('Enter a valid email address.').isVisible().catch(() => false);
  console.log('invalid email caught:', invalidEmailErr);

  console.log('\n=== 6. FORM: happy path ===');
  await form.locator('input[name="email"]').fill('jane@example.com');
  await form.locator('textarea[name="message"]').fill('hello');
  await submitBtn.click();
  // loading state
  const loading = await page.getByText(/sending…/i).isVisible().catch(() => false);
  console.log('loading spinner visible:', loading);
  // success
  await page.waitForSelector('[data-form-state="success"]', { timeout: 5000 });
  const successVisible = await page.getByText(/thank you/i).isVisible().catch(() => false);
  console.log('success visible:', successVisible);
  await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/funnel-success.png', fullPage: false });

  console.log('\n=== 7. LINKS ===');
  const anchors = await page.locator('a[href]').all();
  const seen = new Set();
  for (const a of anchors) {
    let href = await a.getAttribute('href').catch(() => null);
    if (!href) continue;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    const url = href.startsWith('http') ? href : `http://localhost:3000${href.startsWith('/') ? '' : '/'}${href}`;
    try {
      const r = await page.request.get(url, { failOnStatusCode: false });
      if (r.status() >= 400) linkResults.broken.push({ href, status: r.status() });
      else linkResults.ok.push({ href, status: r.status() });
    } catch (e) {
      linkResults.broken.push({ href, err: e.message });
    }
  }
  console.log('links OK:', linkResults.ok.length);
  console.log('links broken:', linkResults.broken);

  console.log('\n=== 8. RESPONSIVE ===');
  const viewports = [
    { name: 'mobile', width: 375, height: 800 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
  ];
  for (const v of viewports) {
    await page.setViewportSize({ width: v.width, height: v.height });
    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerW = await page.evaluate(() => window.innerWidth);
    const overflow = scrollW > innerW + 1;
    console.log(`${v.name} ${v.width}x${v.height}  scrollW=${scrollW}  innerW=${innerW}  h-overflow=${overflow}`);
    if (v.name === 'mobile') {
      await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/funnel-mobile-light.png', fullPage: false });
    }
  }

  console.log('\n=== 9. DARK MODE ===');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
  // toggle theme via localStorage + class since the toggle icon is small
  await page.evaluate(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
    try { localStorage.setItem('nwop-theme', 'dark'); } catch {}
  });
  await page.waitForTimeout(400);
  const bg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  console.log('dark mode bg color:', bg);
  await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/funnel-desktop-dark.png', fullPage: false });

  console.log('\n=== 10. CONSOLE ===');
  console.log('errors:', errors);
  console.log('warnings:', warnings);

  console.log('\n=== DONE ===');
  await browser.close();
})().catch((e) => {
  console.error('SCRIPT ERROR:', e);
  process.exit(1);
});
