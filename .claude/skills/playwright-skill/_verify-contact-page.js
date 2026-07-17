const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const EXPECTED = [
  'CONTACT THE PAC',
  'Let’s start a conversation.',
  'Contact Northwest Oregon PAC about our work, candidates, policy priorities, volunteer opportunities, upcoming events, contributions, or running for office.',
  'Choose the contact method that best fits your inquiry.',
];

const REMOVED = [
  'Get in Touch',
  'We want to hear from you.',
  'Donors, volunteers, candidates, or press',
  'Send a message',
  'How can we help?',
  'General inquiries',
  'After-hours',
  'Follow along',
  'Northwest Oregon PAC on Facebook',
  'Have a common question?',
  'Visit FAQ',
];

const FORM_FIELDS = [
  'firstName', 'lastName', 'email', 'phone', 'organization',
  'city', 'zip_code', 'help_topic', 'message',
  'sms_updates', 'sms_promo',
];

async function checkOverflow(page) {
  return await page.evaluate(() => {
    const trouble = [];
    document.querySelectorAll('section h1, section h2, section h3, section p, section a, section button, section label').forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2) {
        trouble.push({ tag: el.tagName, text: (el.textContent || '').slice(0, 60), sW: el.scrollWidth, cW: el.clientWidth });
      }
    });
    return trouble;
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const vp of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 900, height: 1200 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    console.log(`\n============ viewport ${vp.name} ${vp.width}x${vp.height} ============`);
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    const consoleErrs = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
    page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));
    const failed = [];
    page.on('requestfailed', (r) => failed.push(r.url()));

    await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    const bodyText = await page.evaluate(() => document.body.textContent || '');
    const norm = (s) => s.replace(/\s+/g, ' ').trim();
    const lowerBody = norm(bodyText).toLowerCase();

    if (vp.name === 'desktop') {
      console.log('-- Doc content present --');
      const missing = [];
      for (const s of EXPECTED) {
        const found = lowerBody.includes(norm(s).toLowerCase());
        console.log(`  ${found ? '✓' : '✗'} "${s.slice(0, 70)}${s.length > 70 ? '…' : ''}"`);
        if (!found) missing.push(s);
      }

      console.log('\n-- Old copy removed --');
      const leftover = [];
      for (const s of REMOVED) {
        const found = lowerBody.includes(norm(s).toLowerCase());
        console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${s}"`);
        if (found) leftover.push(s);
      }

      // Footer-scope safety: don't count footer content as leftover
      // (footer contains "General inquiries" too, which is doc-legit there)
      console.log('\n-- Recheck removed strings SCOPED to <main> only --');
      const mainText = await page.evaluate(() => {
        const main = document.querySelector('main') || document.body;
        // Exclude footer nodes
        const clone = main.cloneNode(true);
        clone.querySelectorAll('footer').forEach((n) => n.remove());
        return clone.textContent || '';
      });
      const lowerMain = norm(mainText).toLowerCase();
      const scopedLeftover = [];
      for (const s of REMOVED) {
        const found = lowerMain.includes(norm(s).toLowerCase());
        if (found) scopedLeftover.push(s);
      }
      console.log('  main-scoped leftover:', scopedLeftover.length ? scopedLeftover.join(', ') : '(none) ✓');

      console.log('\n-- Form fields intact --');
      const missingFields = [];
      for (const name of FORM_FIELDS) {
        const el = await page.$(`[name="${name}"]`);
        console.log(`  ${el ? '✓' : '✗'} [name="${name}"]`);
        if (!el) missingFields.push(name);
      }

      if (missing.length || scopedLeftover.length || missingFields.length) {
        console.error('❌ Content problems');
        if (missing.length) console.error('  missing:', missing);
        if (scopedLeftover.length) console.error('  leftover (main scope):', scopedLeftover);
        if (missingFields.length) console.error('  form fields missing:', missingFields);
        process.exit(1);
      }
    }

    const trouble = await checkOverflow(page);
    console.log('-- Text overflow --');
    if (trouble.length) trouble.forEach((t) => console.log(`  ✗ ${t.tag} "${t.text}" sW=${t.sW} cW=${t.cW}`));
    else console.log('  (none) ✓');

    const h1 = await page.evaluate(() => document.body.scrollHeight);
    await page.waitForTimeout(400);
    const h2 = await page.evaluate(() => document.body.scrollHeight);
    console.log('  scrollHeight before/after:', h1, h2, h1 === h2 ? '✓ stable' : '✗ shift');

    await page.screenshot({ path: path.join(OUT, `contact_${vp.name}.png`), fullPage: true });

    console.log('-- Failed requests --');
    if (failed.length) failed.forEach((u) => console.log(' ', u));
    else console.log('  (none) ✓');

    console.log('-- Console errors --');
    if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
    else console.log('  (none) ✓');

    if (trouble.length || consoleErrs.length) {
      console.error(`❌ Problems at ${vp.name}`);
      process.exit(1);
    }
    await context.close();
  }

  await browser.close();
  console.log('\n=== CONTACT PAGE VERIFIED ✓ ===');
})();
