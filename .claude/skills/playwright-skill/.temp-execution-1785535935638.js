const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT = 'C:\\Users\\General\\AppData\\Local\\Temp\\phone-final';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  await page.fill('input[name="firstName"]', 'Test');
  await page.fill('input[name="lastName"]', 'User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="city"]', 'Portland');
  await page.fill('input[name="zip_code"]', '97205');
  await page.locator('button:has-text("Choose one")').first().click();
  await page.locator('li[role="option"]:has-text("General inquiry")').first().click();
  await page.fill('textarea[name="message"]', 'Testing phone validation.');
  await page.type('input[name="phone"]', '503555');
  await page.locator('label[for="sms_updates"]').click();
  await page.locator('label[for="sms_promo"]').click();
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(800);

  await page.locator('input[name="phone"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const shot = path.join(OUT, 'contact-incomplete-phone.png');
  await page.screenshot({ path: shot, fullPage: false });
  console.log('screenshot:', shot);

  await browser.close();
})();
