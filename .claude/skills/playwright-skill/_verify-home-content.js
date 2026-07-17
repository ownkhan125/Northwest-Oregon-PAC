const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

// Exact copy expected to appear on the Home page per the content doc.
const EXPECTED = [
  // Hero
  'OREGON STATE PAC · COMMITTEE #25045 · 2026',
  'A stronger voice for Northwest Oregon.',
  'Northwest Oregon PAC brings together Republicans, moderates, independents, and common-sense voters',
  'We invest in the people, organization, and messaging needed to advance prosperity, accountability, public safety, workforce readiness, and reliable energy across Northwest Oregon.',
  'Meet the PAC',
  'For communities too often written off.',
  'For candidates ready to lead.',
  'For voters who deserve a voice.',
  // About
  'Northwest Oregon should never be an afterthought.',
  'Northwest Oregon PAC was created to support the residents, candidates, and values',
  'We are building the local infrastructure our communities need',
  'Our purpose is not simply to participate in one election.',
  'REGION FIRST',
  'We concentrate our work on the communities, districts, and issues that shape Northwest Oregon.',
  'PRACTICAL LEADERSHIP',
  'We support candidates who listen, communicate clearly, show up for their communities, and work effectively with grassroots volunteers.',
  'LONG-TERM INFRASTRUCTURE',
  'We pool resources to strengthen candidate recruitment, fundraising, volunteer organization, voter outreach, and public messaging throughout the region.',
  'Read Our Story',
  'Explore Our Priorities',
  // Priorities
  'Five priorities. One stronger region.',
  'Our agenda focuses on the issues that directly affect the ability of Northwest Oregon families, workers, entrepreneurs, and communities to succeed.',
  'ECONOMIC PROSPERITY AND SMALL BUSINESS',
  'Prosperity is created when people are free to start businesses, hire employees, invest locally, and build something of their own.',
  'GOVERNMENT ACCOUNTABILITY AND FISCAL RESPONSIBILITY',
  'Taxpayers deserve to know where their money goes',
  'PUBLIC SAFETY AND QUALITY OF LIFE',
  'People should feel secure in their homes',
  'EDUCATION AND WORKFORCE DEVELOPMENT',
  'Oregon’s schools should equip students with strong academic foundations',
  'AFFORDABLE, RELIABLE ENERGY',
  'Northwest Oregon families and employers need an energy system',
  // Vision (SECTION 4)
  'Build a Northwest Oregon',
  'where people can thrive.',
  'Northwest Oregon PAC exists to advance policies that grow private-sector prosperity',
  'We support candidates who understand that government should be focused, transparent, effective, and accountable to the people it serves.',
  'OUR PROMISE TO THE REGION',
  'We are here to help, and we are not from the government.',
  'HOPE · SUPPORT · HEARD',
  // Endorsements
  'CANDIDATES WE SUPPORT',
  'Candidates standing up for Northwest Oregon in 2026.',
  'We support candidates who are ready to compete',
  'Mark Norman',
  'Oregon House District 27',
  'Navy veteran, veterinarian, small-business owner',
  'Brian Schimmel',
  'Oregon House District 29',
  'Independent candidate focused on practical representation',
  'Dr. Barbara Kahl',
  'U.S. House · Oregon’s 1st Congressional District',
  'Veterinarian, community leader, and candidate for Congress',
  'Ciatta Thompson',
  'Oregon House District 33',
  'Community advocate and candidate working to bring common sense',
  'Randall Fryer',
  'Oregon House District 28',
  'Physician and candidate for the Oregon House of Representatives.',
  'Want to serve your community?',
  'Run for office.',
  'We interview prospective candidates to understand their values',
  'Start the Conversation',
  // Freedom (SECTION 6 → News section)
  'Opportunity grows when people are free to build.',
  'We believe broad and lasting prosperity comes from people starting businesses',
  'Government has an important role',
  'We support economic freedom because it connects effort with opportunity',
  'Government should create fair conditions for people to succeed',
  // Volunteer CTA (SECTION 7 in Events section)
  'Show up. Speak up. Strengthen the region.',
  'A lasting political organization is built by people willing to contribute their time',
  'Whether you can volunteer for a few hours, host a neighborhood event',
  'Become a Volunteer',
  'Explore Ways to Help',
  // Donate (SECTION 9)
  'CONTRIBUTE',
  'Fund the fight for our region.',
  'Every contribution helps strengthen candidate support',
  'The contribution form will collect the contributor information required for campaign-finance reporting.',
];

// Content that should NOT appear in Home page sections (previously on home,
// replaced by doc). Footer is out of scope for the "Home Page content only"
// rule, so pac.tagline / brand summary line is preserved there.
const REMOVED = [
  'A voice for the region that keeps getting written off.',
  'Five priorities. One region.',
  'Economic freedom is the engine.',
  'Show up. Speak up. Be part of it.',
  'A focused, common-sense agenda for Northwest Oregon',
  'We reject the false promise of socialism',
];

// Verify the empty-state text is present in the Events section source (only
// rendered when events.length === 0 — runtime has a live event, so the DOM
// check would be a false negative).
const EMPTY_STATE_SOURCE_STRINGS = [
  'Our calendar is taking shape.',
  'Northwest Oregon PAC is new, and we are building our first schedule of candidate events',
  'Sign up to receive the first announcement when an event is scheduled near you.',
  'Get Event Alerts',
  'Host an Event',
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrs = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text()); });
  page.on('pageerror', (err) => consoleErrs.push('[pageerror] ' + err.message));

  const failedRequests = [];
  page.on('requestfailed', (req) => failedRequests.push(req.url()));

  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Scroll through the page to trigger any lazy-loaded content
  await page.evaluate(async () => {
    const step = 400;
    const total = document.body.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);

  const bodyText = await page.evaluate(() => document.body.textContent || '');
  const norm = (s) => s.replace(/\s+/g, ' ').trim();
  const normBody = norm(bodyText);

  console.log('=== Expected doc content present ===');
  const missing = [];
  for (const snippet of EXPECTED) {
    const found = normBody.includes(norm(snippet));
    console.log(`  ${found ? '✓' : '✗'} "${snippet.slice(0, 70)}${snippet.length > 70 ? '…' : ''}"`);
    if (!found) missing.push(snippet);
  }

  console.log('\n=== Previous copy removed ===');
  const leftover = [];
  for (const snippet of REMOVED) {
    const found = normBody.includes(norm(snippet));
    console.log(`  ${found ? '✗ STILL PRESENT' : '✓ removed'} "${snippet.slice(0, 70)}${snippet.length > 70 ? '…' : ''}"`);
    if (found) leftover.push(snippet);
  }

  console.log('\n=== Empty-state text present in data source (rendered when events.length===0) ===');
  const pacDataSrc = fs.readFileSync(
    'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/src/data/pac.js',
    'utf8',
  );
  const eventsSrc = fs.readFileSync(
    'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/src/sections/events.jsx',
    'utf8',
  );
  const combinedSrc = pacDataSrc + '\n' + eventsSrc;
  let missingEmpty = [];
  for (const snippet of EMPTY_STATE_SOURCE_STRINGS) {
    const found = combinedSrc.includes(snippet);
    console.log(`  ${found ? '✓' : '✗'} "${snippet}"`);
    if (!found) missingEmpty.push(snippet);
  }

  console.log('\n=== Full-page screenshots ===');
  await page.screenshot({ path: path.join(OUT, 'home_content_full.png'), fullPage: true });
  console.log('  desktop full-page shot saved');

  // Layout-stability probe
  const h1 = await page.evaluate(() => document.body.scrollHeight);
  await page.waitForTimeout(500);
  const h2 = await page.evaluate(() => document.body.scrollHeight);
  console.log('  scrollHeight before/after:', h1, h2, h1 === h2 ? '✓ stable' : '✗ shift');

  console.log('\n=== Failed requests ===');
  if (failedRequests.length) failedRequests.forEach((u) => console.log(' ', u));
  else console.log('  (none) ✓');

  console.log('\n=== Console errors ===');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log(' ', e));
  else console.log('  (none) ✓');

  if (missing.length) {
    console.error('\n❌ Missing expected content:', missing.length);
    for (const m of missing) console.error('  -', m);
    process.exit(1);
  }
  if (missingEmpty.length) {
    console.error('\n❌ Empty-state text missing from source:', missingEmpty.length);
    for (const m of missingEmpty) console.error('  -', m);
    process.exit(1);
  }
  if (leftover.length) {
    console.error('\n❌ Leftover previous copy:', leftover.length);
    for (const m of leftover) console.error('  -', m);
    process.exit(1);
  }
  if (consoleErrs.length) {
    console.error('\n❌ Console errors detected');
    process.exit(1);
  }

  await browser.close();
  console.log('\n=== HOME PAGE CONTENT MATCHES DOC ✓ ===');
})();
