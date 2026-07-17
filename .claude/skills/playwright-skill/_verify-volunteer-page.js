const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const EXPECTED = [
  // Hero
  'VOLUNTEER WITH NORTHWEST OREGON PAC',
  'Your time can strengthen the region.',
  'Volunteer with Northwest Oregon PAC by meeting voters, making calls, organizing events, supporting candidates, or beginning a conversation about running for office.',
  // Section 2
  'FIND YOUR WAY TO HELP',
  // Canvass
  'CANVASS',
  'Meet voters in their communities.',
  'Canvassing gives volunteers an opportunity to introduce candidates, discuss important races, distribute information, and listen to the concerns of local residents.',
  'Volunteer activities may include:',
  'Door-to-door voter outreach',
  'Literature distribution',
  'Neighborhood walks',
  'Voter-information conversations',
  'Candidate introductions',
  'Volunteer to Canvass',
  // Phone banking
  'PHONE BANKING',
  'Help candidates reach more people.',
  'Phone-bank volunteers help campaigns communicate with voters, recruit supporters, share event information, and identify people interested in becoming involved.',
  'Opportunities may be conducted individually, remotely, or as part of an organized volunteer session.',
  'Join a Phone Bank',
  // Event planning
  'EVENT PLANNING',
  'Help bring the community together.',
  'Event volunteers assist with candidate gatherings, community conversations, fundraising activities, volunteer meetings, and other regional events.',
  'Ways to help may include:',
  'Finding or preparing a venue',
  'Greeting and checking in guests',
  'Coordinating volunteers',
  'Sharing event information',
  'Assisting with setup and cleanup',
  'Helping hosts and speakers',
  'Help With Events',
  // Run for office
  'RUN FOR OFFICE',
  'Consider becoming the candidate.',
  'Northwest Oregon needs capable people who understand their communities and are prepared to listen, organize, communicate, and lead.',
  'A first conversation does not create a commitment to run.',
  'Start the Conversation',
  // Section 3
  'Show up for Northwest Oregon.',
  'Give an hour, make a few calls, help organize a room, or begin exploring a larger role.',
  'Every strong organization starts with people willing to take the first step.',
  'Sign Up Today',
  'Contact the PAC',
];

const REMOVED = [
  'Join the team',
  'Your energy fuels this region.',
  'Northwest Oregon PAC is built by grassroots volunteers.',
  'We are here to help — and we are not from the government.',
  'HOPE · SUPPORT · HEARD',
  'Not ready to volunteer?',
  'Donate instead.',
  'Chip in now',
];

const FORM_FIELDS = [
  'firstName', 'lastName', 'email', 'phone', 'city', 'zipCode',
  'county', 'region', 'registeredVoter', 'campaignExperience',
  'availability', 'frequency', 'anythingElse', 'sms_updates', 'sms_promo',
];

async function checkOverflow(page) {
  return await page.evaluate(() => {
    // Detect horizontal overflow anywhere within the volunteer page main sections
    const trouble = [];
    const els = document.querySelectorAll('section h1, section h2, section h3, section p, section li, section a, section button');
    els.forEach((el) => {
      if (el.scrollWidth > el.clientWidth + 2) {
        trouble.push({
          tag: el.tagName,
          text: (el.textContent || '').slice(0, 60),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
        });
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

    await page.goto(BASE + '/volunteer', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    // scroll through to fire lazy sections
    await page.evaluate(async () => {
      const step = 400;
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += step) {
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
      console.log('-- Expected content present --');
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

      console.log('\n-- Form fields unchanged --');
      const missingFields = [];
      for (const name of FORM_FIELDS) {
        const el = await page.$(`[name="${name}"]`);
        console.log(`  ${el ? '✓' : '✗'} [name="${name}"]`);
        if (!el) missingFields.push(name);
      }

      if (missing.length || leftover.length || missingFields.length) {
        console.error('\n❌ Content problems');
        if (missing.length) console.error('  missing:', missing);
        if (leftover.length) console.error('  leftover:', leftover);
        if (missingFields.length) console.error('  form fields missing:', missingFields);
        process.exit(1);
      }
    }

    // Overflow check
    const trouble = await checkOverflow(page);
    console.log('-- Text overflow --');
    if (trouble.length) {
      trouble.forEach((t) => console.log(`  ✗ ${t.tag} "${t.text}" scrollW=${t.scrollW} clientW=${t.clientW}`));
    } else console.log('  (none) ✓');

    // Layout stability
    const h1 = await page.evaluate(() => document.body.scrollHeight);
    await page.waitForTimeout(400);
    const h2 = await page.evaluate(() => document.body.scrollHeight);
    console.log('  scrollHeight before/after:', h1, h2, h1 === h2 ? '✓ stable' : '✗ shift');

    await page.screenshot({ path: path.join(OUT, `volunteer_${vp.name}.png`), fullPage: true });

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
  console.log('\n=== VOLUNTEER PAGE VERIFIED ✓ ===');
})();
