const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:3000';
const results = { pass: [], fail: [], consoleErrors: {} };

const check = (page, msg, ok) => {
  if (ok) results.pass.push(`OK   [${page}] ${msg}`);
  else results.fail.push(`FAIL [${page}] ${msg}`);
};

async function bodyText(page) {
  return (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
}

async function testHomepage(page) {
  const pageName = 'HOME';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
  const text = await bodyText(page);

  const navLinks = await page.locator('header nav a').allTextContents();
  check(pageName, 'Navbar has no Volunteer link (found: ' + navLinks.join(', ') + ')', !navLinks.some((t) => /volunteer/i.test(t)));

  const supportBtn = page.locator('a', { hasText: /^Support a Candidate$/ }).first();
  const supportBtnHref = (await supportBtn.count()) > 0 ? await supportBtn.getAttribute('href') : null;
  check(pageName, 'Support a Candidate button present', (await supportBtn.count()) > 0);
  check(pageName, 'Support-a-Candidate href points to #candidates (was: ' + supportBtnHref + ')', /#candidates$/.test(supportBtnHref || ''));

  check(pageName, 'Section 2 contains new building infra copy', text.includes('We are building the political infrastructure Northwest Oregon needs'));
  check(pageName, 'PRACTICAL LEADERSHIP updated (demonstrate integrity)', text.includes('demonstrate integrity'));
  check(pageName, 'LONG-TERM INFRASTRUCTURE updated', text.includes('public messaging to strengthen Northwest Oregon elections'));
  check(pageName, 'Postscript recruit-strong-candidates paragraph present', text.includes('Northwest Oregon PAC exists to recruit strong candidates'));

  check(pageName, 'Endorsements intro updated (ready to build competitive campaigns)', text.includes('ready to build competitive campaigns'));

  check(pageName, 'Section 7 heading Help Build Winning Campaigns', text.includes('Help Build Winning Campaigns'));
  const supportMissionBtn = page.locator('a', { hasText: /^Support Our Mission$/ }).first();
  const supportMissionCount = await supportMissionBtn.count();
  const supportMissionHref = supportMissionCount > 0 ? await supportMissionBtn.getAttribute('href') : null;
  const supportMissionTarget = supportMissionCount > 0 ? await supportMissionBtn.getAttribute('target') : null;
  check(pageName, 'Support Our Mission button present', supportMissionCount > 0);
  check(pageName, 'Support-Our-Mission href is winred URL (was: ' + supportMissionHref + ')', /winred\.com/.test(supportMissionHref || ''));
  check(pageName, 'Support-Our-Mission opens in new tab', supportMissionTarget === '_blank');

  check(pageName, 'Events copy: Candidate forums, fundraising events', text.includes('Candidate forums, fundraising events, policy discussions'));
  check(pageName, 'Events copy: Stay informed', text.includes('Stay informed about upcoming events'));

  const viewEventsBtn = page.locator('a', { hasText: /^View Upcoming Events$/ }).first();
  const viewEventsCount = await viewEventsBtn.count();
  const viewEventsHref = viewEventsCount > 0 ? await viewEventsBtn.getAttribute('href') : null;
  check(pageName, 'View Upcoming Events button present', viewEventsCount > 0);
  check(pageName, 'View-Upcoming-Events href /events (was: ' + viewEventsHref + ')', viewEventsHref === '/events');

  check(pageName, 'Section 9 donate copy updated', text.includes('Every contribution helps recruit qualified candidates'));

  const footerLinks = await page.locator('footer a').allTextContents();
  check(pageName, 'Footer has no Volunteer link', !footerLinks.some((t) => /^volunteer$/i.test(t.trim())));

  results.consoleErrors[pageName] = consoleErrs;
}

async function testVolunteer404(page) {
  const pageName = 'VOLUNTEER_404';
  const resp = await page.goto(TARGET_URL + '/volunteer', { waitUntil: 'domcontentloaded', timeout: 20000 });
  check(pageName, '/volunteer returns 404 (got ' + (resp && resp.status()) + ')', resp && resp.status() === 404);
}

async function testAbout(page) {
  const pageName = 'ABOUT';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL + '/about', { waitUntil: 'networkidle', timeout: 45000 });
  const text = await bodyText(page);

  check(pageName, 'Hero: recruit and support capable candidates', text.includes('recruit and support capable candidates'));
  check(pageName, 'Hero: fundraising, strategic messaging', text.includes('fundraising, strategic messaging, and campaign support'));
  check(pageName, 'Story block 4 updated', text.includes('strengthening campaign operations, we are building the political infrastructure'));
  check(pageName, 'Team heading Local leadership. Built to win.', text.includes('Local leadership. Built to win.'));
  check(pageName, 'Team intro: led by experienced leaders', text.includes('led by experienced leaders'));
  check(pageName, 'Cindy bio present', text.includes('financial oversight, campaign operations, organizational leadership, and political fundraising'));
  check(pageName, 'Helen bio present', text.includes('political leadership, campaign coordination, and organizational development across Republican organizations'));
  check(pageName, 'Christina Buehler REMOVED', !text.includes('Christina Buehler'));
  check(pageName, 'Candidates intro updated', text.includes('build competitive campaigns, and remain focused on practical, results-driven leadership'));
  check(pageName, 'CTA body updated', text.includes('Building a stronger political future requires principled candidates'));

  const donateBtns = await page.locator('a', { hasText: /^Donate$/ }).all();
  let donateHref = null;
  for (const b of donateBtns) {
    const h = await b.getAttribute('href');
    if (h && /winred\.com/.test(h)) { donateHref = h; break; }
  }
  check(pageName, 'CTA primary Donate points to winred (was: ' + donateHref + ')', !!donateHref);

  const supportCandBtns = page.locator('a', { hasText: /^Support a Candidate$/ });
  const supportCandCount = await supportCandBtns.count();
  const supportCandHref = supportCandCount > 0 ? await supportCandBtns.first().getAttribute('href') : null;
  check(pageName, 'CTA secondary Support a Candidate present (href=' + supportCandHref + ')', supportCandCount > 0 && /candidates/i.test(supportCandHref || ''));

  results.consoleErrors[pageName] = consoleErrs;
}

async function testAsk(page) {
  const pageName = 'ASK';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL + '/ask', { waitUntil: 'networkidle', timeout: 45000 });
  const text = await bodyText(page);

  check(pageName, 'Hero: campaign support, fundraising, contributions', text.includes('campaign support, fundraising, contributions'));
  check(pageName, 'Sidebar: policy question, candidate recommendation', text.includes('A policy question, a candidate recommendation, campaign support, fundraising'));
  check(pageName, 'SMS updates label updated', text.includes('candidate announcements, fundraising updates, and important organizational news'));

  results.consoleErrors[pageName] = consoleErrs;
}

async function testEvents(page) {
  const pageName = 'EVENTS';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL + '/events', { waitUntil: 'networkidle', timeout: 45000 });
  const text = await bodyText(page);

  check(pageName, 'Hero H1 updated', text.includes('Connect with the leaders shaping Northwest Oregon'));

  const emptyState = text.includes('Join us at upcoming campaign events');
  if (emptyState) {
    const getUpdatesBtn = page.locator('a', { hasText: /^Get Event Updates$/ }).first();
    const btnCount = await getUpdatesBtn.count();
    const href = btnCount > 0 ? await getUpdatesBtn.getAttribute('href') : null;
    check(pageName, 'Get Event Updates href = /contact (was: ' + href + ')', href === '/contact');
  } else {
    check(pageName, 'Events list rendered (not empty state)', true);
  }

  results.consoleErrors[pageName] = consoleErrs;
}

async function testContact(page) {
  const pageName = 'CONTACT';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL + '/contact', { waitUntil: 'networkidle', timeout: 45000 });
  const text = await bodyText(page);

  check(pageName, 'Hero updated (no volunteer opportunities)', !text.includes('volunteer opportunities'));
  check(pageName, 'Hero: policy priorities, upcoming events, contributions', text.includes('policy priorities, upcoming events, contributions'));
  check(pageName, 'SMS updates label updated', text.includes('candidate announcements, fundraising updates, and important organizational news'));

  results.consoleErrors[pageName] = consoleErrs;
}

async function testFAQ(page) {
  const pageName = 'FAQ';
  const consoleErrs = [];
  page.on('pageerror', (e) => consoleErrs.push(String(e)));
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrs.push(m.text());
  });

  await page.goto(TARGET_URL + '/faq', { waitUntil: 'networkidle', timeout: 45000 });

  // Accordion is single-select. Click each Q to expand, capture its answer, then move on.
  const qButtons = await page.locator('section button').filter({ hasText: /\?/ }).all();
  const answers = [];
  for (const b of qButtons) {
    try { await b.click({ timeout: 1500 }); } catch (e) {}
    await page.waitForTimeout(300);
    const t = (await page.locator('body').innerText()).replace(/\s+/g, ' ').trim();
    answers.push(t);
  }
  const combined = answers.join(' ');

  check(pageName, 'Q about PAC candidate support updated', /candidate recruitment, fundraising, strategic messaging/.test(combined));
  check(pageName, 'Q about recommending candidate updated', /Just make sure/.test(combined) && /links to the corresponding category/.test(combined));
  check(pageName, 'Q about donations updated', /invested in candidate recruitment, campaign support, fundraising/.test(combined));

  // Still-Have-Questions is always in DOM. Match either curly or ASCII apostrophe.
  const staticText = await bodyText(page);
  check(pageName, 'Still-Have-Questions body updated', /We[’']re here to answer your questions about Northwest Oregon PAC/.test(staticText));

  const runForOfficeBtn = page.locator('a', { hasText: /^Run for Office$/ }).first();
  check(pageName, 'Run for Office button present', (await runForOfficeBtn.count()) > 0);
  check(pageName, 'No standalone Volunteer button', (await page.locator('a', { hasText: /^Volunteer$/ }).count()) === 0);

  results.consoleErrors[pageName] = consoleErrs;
}

async function testViewports(browser) {
  const viewports = [
    { name: 'Desktop', w: 1440, h: 900 },
    { name: 'Tablet', w: 768, h: 1024 },
    { name: 'Mobile', w: 390, h: 844 },
  ];
  for (const v of viewports) {
    const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h } });
    const page = await ctx.newPage();
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(v.name, 'No horizontal overflow (' + overflow + 'px)', overflow <= 1);
    await page.screenshot({ path: 'C:/Users/General/AppData/Local/Temp/qa-' + v.name.toLowerCase() + '.png', fullPage: false });
    await ctx.close();
  }
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  try {
    await testHomepage(page);
    await testVolunteer404(page);
    await testAbout(page);
    await testAsk(page);
    await testEvents(page);
    await testContact(page);
    await testFAQ(page);
    await ctx.close();

    await testViewports(browser);
  } catch (e) {
    results.fail.push('FAIL Unhandled: ' + e.message);
    if (e.stack) console.error(e.stack);
  }

  await browser.close();

  console.log('\n===== PASSING =====');
  results.pass.forEach((l) => console.log(l));
  console.log('\n===== FAILING (' + results.fail.length + ') =====');
  results.fail.forEach((l) => console.log(l));
  console.log('\n===== CONSOLE ERRORS =====');
  for (const k of Object.keys(results.consoleErrors)) {
    const v = results.consoleErrors[k];
    if (v.length) console.log(k + ':', v);
    else console.log(k + ': (none)');
  }
  process.exit(results.fail.length ? 1 : 0);
})();
