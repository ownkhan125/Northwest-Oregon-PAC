const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const BASE = 'http://localhost:3000';

const ASK_SPEC = {
  path: '/ask',
  api: '/api/ask',
  fields: ['firstName', 'lastName', 'email', 'phone', 'city', 'zip_code', 'question_category', 'question', 'email_updates'],
  legacy: ['fullName', 'zip', 'topic', 'question_subject', 'issue_category', 'issue_location', 'issue_subject', 'issue_description', 'issue_image', 'sms_updates', 'sms_promo'],
  labels: [
    'First name', 'Last name', 'Email address', 'Phone number ( optional)', 'City', 'ZIP code',
    'What is your question about?', 'Your question',
    'Send me occasional updates from Northwest Oregon PAC.',
  ],
  dropdown: {
    button: 'button[id="question_category"]',
    expectedOptions: [
      'The PAC and its mission', 'Policy priorities', 'Supported candidates', 'Candidate support',
      'Running for office', 'Volunteering', 'Events', 'Contributions',
      'Media or interview request', 'Website assistance', 'Something else',
    ],
    pick: 'Volunteering',
  },
  buttonText: 'Submit My Question',
  fill: async (page) => {
    await page.fill('[name="firstName"]', 'PW');
    await page.fill('[name="lastName"]', 'AskFinal');
    await page.fill('[name="email"]', 'pw-ask-final@example.com');
    await page.fill('[name="phone"]', '+1 (503) 555-0100');
    await page.fill('[name="city"]', 'Beaverton');
    await page.fill('[name="zip_code"]', '97005');
    await page.locator('button[id="question_category"]').click();
    await page.locator('[role="option"]:has-text("Volunteering")').first().click();
    await page.fill('[name="question"]', 'Playwright verification: how do I sign up to volunteer? Auto-test payload.');
    await page.check('[name="email_updates"]');
  },
  expectPayloadKeys: ['firstName', 'lastName', 'email', 'phone', 'city', 'zip_code', 'question_category', 'question', 'email_updates'],
};

const CONTACT_SPEC = {
  path: '/contact',
  api: '/api/contact',
  fields: ['firstName', 'lastName', 'email', 'phone', 'organization', 'city', 'zip_code', 'help_topic', 'message', 'email_updates'],
  legacy: ['sms_updates', 'sms_promo', 'audience'],
  labels: [
    'First name', 'Last name', 'Email address', 'Phone number — optional', 'Organization — optional',
    'City', 'ZIP code', 'What can we help with?', 'Message',
    'I would also like to receive email updates from Northwest Oregon PAC.',
  ],
  dropdown: {
    button: 'button[id="help_topic"]',
    expectedOptions: [
      'General inquiry', 'Candidate support', 'Running for office', 'Volunteer opportunity',
      'Event information', 'Host an event', 'Contribution question',
      'Media or interview request', 'Website assistance', 'Other',
    ],
    pick: 'Media or interview request',
  },
  buttonText: 'Send My Message',
  fill: async (page) => {
    await page.fill('[name="firstName"]', 'PW');
    await page.fill('[name="lastName"]', 'ContactFinal');
    await page.fill('[name="email"]', 'pw-contact-final@example.com');
    await page.fill('[name="phone"]', '(503) 555-0200');
    await page.fill('[name="organization"]', 'Playwright QA');
    await page.fill('[name="city"]', 'Portland');
    await page.fill('[name="zip_code"]', '97205');
    await page.locator('button[id="help_topic"]').click();
    await page.locator('[role="option"]:has-text("Media or interview request")').first().click();
    await page.fill('[name="message"]', 'Playwright verification of the Contact_Message webhook wiring.');
    await page.check('[name="email_updates"]');
  },
  expectPayloadKeys: ['firstName', 'lastName', 'email', 'phone', 'organization', 'city', 'zip_code', 'help_topic', 'message', 'email_updates'],
};

const VOL_SPEC = {
  path: '/volunteer',
  api: '/api/volunteer',
  fields: ['firstName', 'lastName', 'email', 'phone', 'city', 'zip_code',
    'availability', 'frequency', 'experience', 'anything_else',
    'acknowledgment', 'email_consent',
    'opportunity_Canvassing', 'opportunity_Phone banking', 'opportunity_Event planning',
    'opportunity_Candidate support', 'opportunity_Hosting a gathering',
    'opportunity_Running for office', 'opportunity_General volunteer help',
  ],
  legacy: ['zipCode', 'county', 'registeredVoter', 'campaignExperience', 'issues', 'anythingElse',
    'sms_consent', 'activity_Canvass', 'activity_Phone banking', 'activity_Event planning', 'activity_Run for office'],
  labels: [
    'First name', 'Last name', 'Email address', 'Phone number', 'City', 'ZIP code',
    'Which opportunities interest you?',
    'General availability', 'How often would you like to help?',
    'Do you have relevant experience or skills? optional',
    'Anything else we should know? optional',
    'I understand that submitting this form expresses interest and does not guarantee a specific volunteer assignment.',
    'I agree to receive volunteer and organizational updates from Northwest Oregon PAC.',
  ],
  dropdowns: [
    {
      button: 'button[id="availability"]',
      expectedOptions: ['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Saturdays', 'Sundays', 'Availability varies'],
      pick: 'Saturdays',
    },
    {
      button: 'button[id="frequency"]',
      expectedOptions: ['One-time opportunity', 'Occasionally', 'A few hours each month', 'Regularly during election season', 'Not sure yet'],
      pick: 'A few hours each month',
    },
  ],
  buttonText: 'Become a Volunteer',
  fill: async (page) => {
    await page.fill('[name="firstName"]', 'PW');
    await page.fill('[name="lastName"]', 'VolFinal');
    await page.fill('[name="email"]', 'pw-vol-final@example.com');
    await page.fill('[name="phone"]', '(503) 555-0300');
    await page.fill('[name="city"]', 'Hillsboro');
    await page.fill('[name="zip_code"]', '97124');
    await page.check('[name="opportunity_Canvassing"]');
    await page.check('[name="opportunity_Phone banking"]');
    await page.locator('button[id="availability"]').click();
    await page.locator('[role="option"]:has-text("Saturdays")').first().click();
    await page.locator('button[id="frequency"]').click();
    await page.locator('[role="option"]:has-text("A few hours each month")').first().click();
    await page.fill('[name="experience"]', 'Prior canvassing experience with Playwright org.');
    await page.fill('[name="anything_else"]', 'Automated verification submission.');
    await page.check('[name="acknowledgment"]');
    await page.check('[name="email_consent"]');
  },
  expectPayloadKeys: ['firstName', 'lastName', 'email', 'phone', 'city', 'zip_code',
    'opportunities', 'availability', 'frequency', 'experience', 'anything_else',
    'acknowledgment', 'email_consent'],
};

async function verifyForm(page, spec) {
  console.log(`\n============ ${spec.path} ============`);

  const consoleErrs = [];
  const errListener = (msg) => {
    if (msg.type() === 'error') consoleErrs.push('[console] ' + msg.text());
  };
  const errListener2 = (err) => consoleErrs.push('[pageerror] ' + err.message);
  page.on('console', errListener);
  page.on('pageerror', errListener2);

  const apiCalls = [];
  const reqListener = (req) => {
    if (req.url().includes(spec.api)) {
      apiCalls.push({ dir: 'request', method: req.method(), body: req.postData() });
    }
  };
  const resListener = async (res) => {
    if (res.url().includes(spec.api)) {
      apiCalls.push({ dir: 'response', status: res.status(), body: await res.text().catch(() => null) });
    }
  };
  page.on('request', reqListener);
  page.on('response', resListener);

  await page.goto(BASE + spec.path, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Field presence
  console.log('-- Fields present --');
  for (const name of spec.fields) {
    const el = await page.$(`[name="${name}"]`);
    console.log(`  ${name}: ${el ? '✓' : '✗ MISSING'}`);
    if (!el) throw new Error(`Missing field on ${spec.path}: ${name}`);
  }

  // Legacy removed
  console.log('-- Legacy removed --');
  for (const legacy of spec.legacy) {
    const el = await page.$(`[name="${legacy}"]`);
    console.log(`  ${legacy}: ${el ? '✗ STILL PRESENT' : '✓'}`);
  }

  // Labels present in the page text
  console.log('-- Copy present --');
  const bodyText = await page.evaluate(() => document.body.textContent || '');
  const normalize = (s) => s.replace(/\s+/g, ' ').trim();
  const normBody = normalize(bodyText);
  for (const label of spec.labels) {
    const target = normalize(label);
    const found = normBody.includes(target);
    console.log(`  "${label.slice(0, 60)}${label.length > 60 ? '…' : ''}": ${found ? '✓' : '✗'}`);
    if (!found) throw new Error(`Missing label on ${spec.path}: ${label}`);
  }

  // Dropdown options
  const dropdowns = spec.dropdowns || (spec.dropdown ? [spec.dropdown] : []);
  for (const dd of dropdowns) {
    console.log(`-- Dropdown ${dd.button} options --`);
    await page.locator(dd.button).click();
    await page.waitForTimeout(200);
    for (const opt of dd.expectedOptions) {
      const found = await page.$(`[role="option"]:has-text("${opt}")`);
      console.log(`  "${opt}": ${found ? '✓' : '✗'}`);
      if (!found) throw new Error(`Missing option on ${spec.path}: ${opt}`);
    }
    // Close dropdown
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
  }

  // Empty-submit blocks
  console.log('-- Empty submit blocked --');
  const before = apiCalls.length;
  await page.locator(`button[type="submit"]:has-text("${spec.buttonText}")`).first().click();
  await page.waitForTimeout(400);
  const after = apiCalls.length;
  console.log(`  API calls: ${after - before} (expect 0)`);

  // Fill & submit
  console.log('-- Fill & submit --');
  await spec.fill(page);
  await page.locator(`button[type="submit"]:has-text("${spec.buttonText}")`).first().click();

  // Wait for success message or error alert
  await page
    .waitForFunction(
      () => !!document.querySelector('[role="status"]'),
      null,
      { timeout: 20000 },
    )
    .catch(() => {});
  await page.waitForTimeout(400);

  const successVisible = await page.evaluate(() => !!document.querySelector('[role="status"]'));
  const errText = await page.evaluate(() => {
    const el = document.querySelector('[role="alert"]');
    return el ? el.textContent.trim() : null;
  });
  console.log(`  success visible: ${successVisible}`);
  console.log(`  error text: ${errText || '(none)'}`);

  // Payload check
  const reqRow = apiCalls.find((c) => c.dir === 'request' && c.body);
  if (reqRow) {
    let parsed = {};
    try { parsed = JSON.parse(reqRow.body); } catch {}
    const missing = spec.expectPayloadKeys.filter((k) => !(k in parsed));
    console.log('-- Payload check --');
    console.log('  keys:', Object.keys(parsed).join(', '));
    console.log('  missing:', missing.length ? missing.join(', ') : '(none) ✓');
    const resRow = apiCalls.find((c) => c.dir === 'response');
    console.log('  response status:', resRow?.status);
    console.log('  response body:', resRow?.body);
    if (missing.length) throw new Error(`Missing payload keys: ${missing.join(', ')}`);
    if (resRow?.status !== 200) throw new Error(`Non-200 response on ${spec.path}`);
  }

  console.log('-- Console errors --');
  if (consoleErrs.length) consoleErrs.forEach((e) => console.log('  ' + e));
  else console.log('  (none) ✓');

  page.off('console', errListener);
  page.off('pageerror', errListener2);
  page.off('request', reqListener);
  page.off('response', resListener);

  return { success: successVisible, consoleErrs };
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  for (const spec of [ASK_SPEC, CONTACT_SPEC, VOL_SPEC]) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    try {
      await verifyForm(page, spec);
      const shot = path.join(OUT, `final_${spec.path.replace(/\W/g, '') || 'root'}.png`);
      await page.screenshot({ path: shot, fullPage: false });
      console.log(`📸 ${shot}`);
    } catch (e) {
      console.error(`❌ FAILURE on ${spec.path}:`, e.message);
      await page.screenshot({ path: path.join(OUT, `fail_${spec.path.replace(/\W/g, '')}.png`), fullPage: false });
      await context.close();
      await browser.close();
      process.exit(1);
    }
    await context.close();
  }

  await browser.close();
  console.log('\n=== ALL FORMS VERIFIED ✓ ===');
})();
