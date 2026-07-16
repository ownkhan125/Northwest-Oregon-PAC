const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = 'C:/Users/General/Documents/GitHub/Northwest Oregon PAC/.claude/skills/playwright-skill/_shots';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Ask
  await page.goto('http://localhost:3000/ask', { waitUntil: 'networkidle' });
  await page.fill('[name="firstName"]', 'PW');
  await page.fill('[name="lastName"]', 'Success');
  await page.fill('[name="email"]', 'pw-success@example.com');
  await page.fill('[name="city"]', 'Beaverton');
  await page.fill('[name="zip_code"]', '97005');
  await page.locator('button[id="question_category"]').click();
  await page.locator('[role="option"]:has-text("Events")').first().click();
  await page.fill('[name="question"]', 'Success card capture.');
  await page.locator('button:has-text("Submit My Question")').click();
  await page.waitForSelector('[role="status"]', { timeout: 20000 });
  await page.waitForTimeout(500);
  await page.locator('[role="status"]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT, 'success_ask.png'), fullPage: false });
  console.log('✓ ask success shot');

  // Contact
  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.fill('[name="firstName"]', 'PW');
  await page.fill('[name="lastName"]', 'Success');
  await page.fill('[name="email"]', 'pw-success@example.com');
  await page.fill('[name="city"]', 'Portland');
  await page.fill('[name="zip_code"]', '97205');
  await page.locator('button[id="help_topic"]').click();
  await page.locator('[role="option"]:has-text("General inquiry")').first().click();
  await page.fill('[name="message"]', 'Success card capture.');
  await page.locator('button:has-text("Send My Message")').click();
  await page.waitForSelector('[role="status"]', { timeout: 20000 });
  await page.waitForTimeout(500);
  await page.locator('[role="status"]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT, 'success_contact.png'), fullPage: false });
  console.log('✓ contact success shot');

  // Volunteer
  await page.goto('http://localhost:3000/volunteer', { waitUntil: 'networkidle' });
  await page.fill('[name="firstName"]', 'PW');
  await page.fill('[name="lastName"]', 'Success');
  await page.fill('[name="email"]', 'pw-success@example.com');
  await page.fill('[name="phone"]', '(503) 555-0300');
  await page.fill('[name="city"]', 'Hillsboro');
  await page.fill('[name="zip_code"]', '97124');
  await page.check('[name="opportunity_Canvassing"]');
  await page.locator('button[id="availability"]').click();
  await page.locator('[role="option"]:has-text("Saturdays")').first().click();
  await page.locator('button[id="frequency"]').click();
  await page.locator('[role="option"]:has-text("Occasionally")').first().click();
  await page.check('[name="acknowledgment"]');
  await page.locator('button:has-text("Become a Volunteer")').click();
  await page.waitForSelector('[role="status"]', { timeout: 20000 });
  await page.waitForTimeout(500);
  await page.locator('[role="status"]').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT, 'success_volunteer.png'), fullPage: false });
  console.log('✓ volunteer success shot');

  await browser.close();
})();
