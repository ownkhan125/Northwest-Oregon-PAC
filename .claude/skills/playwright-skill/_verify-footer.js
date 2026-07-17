const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const EXPECTED = [
  'Northwest Oregon PAC',
  'Championing prosperity, accountability, and opportunity for Northwest Oregon.',
  'GENERAL INQUIRIES',
  'info@northwestoregon.com',
  'PROGRAM DIRECTOR',
  'Cynthia Sawyer',
  '503-490-4139',
  'MAILING ADDRESS',
  '10700 SW Beaverton-Hillsdale Highway',
  'Suite 212',
  'Beaverton, Oregon 97005',
  'THE PAC',
  'About Us',
  'Events',
  'Ask',
  'GET INVOLVED',
  'Donate',
  'Volunteer',
  'Host an Event',
  'Contact',
  'FAQs',
  'LEGAL',
  'Privacy Policy',
  'Terms of Service',
  'Oregon Secretary of State',
  '© 2026 Northwest Oregon PAC',
  'Oregon State PAC · Committee #25045',
  'EIN 42-2643251',
  'Paid for by Northwest Oregon PAC #25045.',
  'Some images, audio, video, or written content may be created or enhanced using artificial intelligence tools.',
  'Not authorized by any candidate committee.',
];

const REMOVED = [
  'csawyer007@gmail.com',
  '1-503-490-4139',
  '10700 SW Beaverton-Hillsdale Hwy',
  'Beaverton, OR 97005',
  'State PAC · PAC #25045',
  'Regulated by Oregon Secretary of State',
  'artificial intelligence (AI) tools',
  'Endorsed candidates',
  'Run for office',
];

const EXPECTED_LINKS = [
  { text: 'About Us', href: '/about' },
  { text: 'Events', href: '/events' },
  { text: 'Ask', href: '/ask' },
  { text: 'Donate', href: '/donate' },
  { text: 'Volunteer', href: '/volunteer' },
  { text: 'Host an Event', href: '/contact' },
  { text: 'Contact', href: '/contact' },
  { text: 'FAQs', href: '/faq' },
  { text: 'Privacy Policy', href: '/privacy-policy' },
  { text: 'Terms of Service', href: '/terms-of-service' },
  { text: 'Oregon Secretary of State', href: 'https://sos.oregon.gov/elections/' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));
  const failed = [];
  page.on('requestfailed', (r) => failed.push(r.url()));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Isolate footer text
  const footerText = await page.evaluate(() => {
    const f = document.querySelector('footer');
    return f ? f.textContent || '' : '';
  });
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const normFooter = norm(footerText);

  console.log('=== Expected footer content present ===');
  const missing = [];
  const lowerFooter = normFooter.toLowerCase();
  for (const snippet of EXPECTED) {
    // CSS `text-transform: uppercase` renders uppercase visually while DOM keeps
    // lowercase — compare case-insensitively.
    const found = lowerFooter.includes(norm(snippet).toLowerCase());
    console.log(`  ${found ? '✓' : '✗'} "${snippet.slice(0, 70)}${snippet.length > 70 ? '…' : ''}"`);
    if (!found) missing.push(snippet);
  }

  console.log('\n=== Legacy content removed ===');
  const leftover = [];
  for (const snippet of REMOVED) {
    const found = normFooter.includes(norm(snippet));
    console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${snippet}"`);
    if (found) leftover.push(snippet);
  }

  console.log('\n=== Links present with correct href ===');
  const linkTrouble = [];
  for (const { text, href } of EXPECTED_LINKS) {
    const actualHref = await page.evaluate((t) => {
      const links = Array.from(document.querySelectorAll('footer a'));
      const match = links.find((a) => (a.textContent || '').trim().toLowerCase() === t.toLowerCase());
      return match ? match.getAttribute('href') : null;
    }, text);
    const ok = actualHref === href;
    console.log(`  ${ok ? '✓' : '✗'} "${text}" → ${actualHref} (expect ${href})`);
    if (!ok) linkTrouble.push(text);
  }

  // Layout-stability probe
  const h1 = await page.evaluate(() => document.body.scrollHeight);
  await page.waitForTimeout(500);
  const h2 = await page.evaluate(() => document.body.scrollHeight);
  console.log('\nscrollHeight before/after:', h1, h2, h1 === h2 ? '✓ stable' : '✗ shift');

  await page.evaluate(() => {
    const f = document.querySelector('footer');
    if (f) f.scrollIntoView();
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, 'footer_scrolled.png'), fullPage: false });

  console.log('\n=== Failed requests ===');
  if (failed.length) failed.forEach((u) => console.log(' ', u));
  else console.log('  (none) ✓');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  if (missing.length) {
    console.error('\n❌ Missing:', missing.join(' | '));
    process.exit(1);
  }
  if (leftover.length) {
    console.error('\n❌ Leftover:', leftover.join(' | '));
    process.exit(1);
  }
  if (linkTrouble.length) {
    console.error('\n❌ Link problems:', linkTrouble.join(' | '));
    process.exit(1);
  }
  if (consoleErrs.length) process.exit(1);

  await browser.close();
  console.log('\n=== FOOTER CONTENT MATCHES DOC ✓ ===');
})();
