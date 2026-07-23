const { chromium } = require('playwright')

const BASE = 'http://localhost:3000'
const OUT = 'C:/Users/General/AppData/Local/Temp/nwop-review'
const fs = require('fs')
fs.mkdirSync(OUT, { recursive: true })

const expectStrings = [
  // Privacy Section 1 additions
  'device identifiers, and information collected through cookies',
  'We use cookies, pixels, and similar tracking technologies',
  'Meta Pixel (Facebook Pixel)',
  'Analytics tools (such as Google Analytics, if applicable)',
  'These tools help us understand how visitors interact with our website',
  'You can control or disable cookies through your browser settings',
  // Privacy Section 3 additions
  'trusted service providers (such as email service providers, donation processors, website analytics providers, and advertising platforms like Meta)',
  'We do not sell your personal information.',
  // Privacy SMS
  'If you expressly opt in to receive text messages from Northwest Oregon PAC',
  'Consent to receive informational SMS messages does not automatically include consent to receive promotional or fundraising messages',
]

const notExpectStrings = [
  'How phone numbers are used. Phone numbers are used only to send you the categories of SMS messages',
  'basic device and analytics information when you visit our website, such as IP address, browser type, and pages viewed, to help us improve the site',
  'We share information with service providers (such as email and donation processors) only as needed',
]

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const consoleErrs = []
  page.on('console', (m) => { if (m.type() === 'error') consoleErrs.push(m.text()) })
  page.on('pageerror', (e) => consoleErrs.push('PAGEERROR: ' + e.message))

  // 1) Privacy policy content
  console.log('\n=== /privacy-policy ===')
  await page.goto(`${BASE}/privacy-policy`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(500)
  const privacyText = await page.locator('main').innerText()

  for (const s of expectStrings) {
    const found = privacyText.includes(s)
    console.log(found ? `  OK   present: ${s.slice(0, 70)}...` : `  MISS         : ${s.slice(0, 70)}...`)
  }
  for (const s of notExpectStrings) {
    const found = privacyText.includes(s)
    console.log(!found ? `  OK   removed: ${s.slice(0, 70)}...` : `  STILL PRESENT: ${s.slice(0, 70)}...`)
  }

  // Confirm bullet list is rendered as <ul><li>
  const liTexts = await page.locator('main ul li').allInnerTexts()
  console.log('  Bullet items on page:', liTexts.length)
  console.log('  Sample bullets:', liTexts.slice(0, 6))

  await page.screenshot({ path: `${OUT}/privacy-policy-full.png`, fullPage: true })

  // 2) Terms Privacy bullet
  console.log('\n=== /terms-of-service ===')
  await page.goto(`${BASE}/terms-of-service`, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(500)
  const termsText = await page.locator('main').innerText()
  const termsExpect = 'Privacy. For privacy-related inquiries, including how we collect, use, retain, and share phone numbers and SMS opt-in data, please refer to our Privacy Policy available at /privacy-policy.'
  const termsShouldNot = 'Privacy. For privacy-related inquiries — including how we collect'
  console.log(termsText.includes(termsExpect) ? '  OK   new privacy bullet present' : '  MISS new privacy bullet')
  console.log(!termsText.includes(termsShouldNot) ? '  OK   old em-dash version removed' : '  STILL PRESENT em-dash')
  await page.screenshot({ path: `${OUT}/terms-full.png`, fullPage: true })

  // 3) Cookie banner behavior — fresh context ensures no localStorage
  console.log('\n=== Cookie banner ===')
  await ctx.clearCookies()
  const freshCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const freshPage = await freshCtx.newPage()
  await freshPage.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
  await freshPage.waitForTimeout(1200)

  const bannerVisible = await freshPage.locator('[role="dialog"][aria-label="Cookie notice"]').isVisible().catch(() => false)
  console.log('  Banner visible on fresh visit:', bannerVisible)
  if (bannerVisible) {
    const bannerText = await freshPage.locator('[role="dialog"][aria-label="Cookie notice"]').innerText()
    const expectBanner = 'This website uses cookies and similar technologies to improve your browsing experience, analyze website traffic, and measure the effectiveness of our outreach. By continuing to use this site, you consent to our use of cookies as described in our Privacy Policy.'
    console.log(bannerText.includes(expectBanner) ? '  OK   banner copy exact' : '  MISS banner copy')
    console.log('  Banner text:\n    ', bannerText.replace(/\n/g, ' | '))
  }
  await freshPage.screenshot({ path: `${OUT}/cookie-banner-visible.png` })

  // Click Accept and confirm banner disappears + localStorage set
  await freshPage.getByRole('button', { name: 'Accept' }).click()
  await freshPage.waitForTimeout(700)
  const stillVisible = await freshPage.locator('[role="dialog"][aria-label="Cookie notice"]').isVisible().catch(() => false)
  console.log('  Banner visible after Accept:', stillVisible)
  const stored = await freshPage.evaluate(() => localStorage.getItem('nwop_cookie_consent'))
  console.log('  localStorage nwop_cookie_consent =', stored)

  await freshPage.screenshot({ path: `${OUT}/cookie-banner-accepted.png` })

  // Reload — banner should NOT reappear
  await freshPage.reload({ waitUntil: 'networkidle' })
  await freshPage.waitForTimeout(800)
  const reloadVisible = await freshPage.locator('[role="dialog"][aria-label="Cookie notice"]').isVisible().catch(() => false)
  console.log('  Banner visible after reload:', reloadVisible)

  console.log('\nConsole errors:', consoleErrs.length)
  consoleErrs.slice(0, 5).forEach((e) => console.log('  •', e.slice(0, 200)))

  await browser.close()
  console.log('DONE')
})()
