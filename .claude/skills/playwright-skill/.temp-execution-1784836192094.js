const { chromium } = require('playwright')

const BASE = 'http://localhost:3000'

const PAGES = ['/', '/about', '/volunteer', '/contact', '/blogs', '/events', '/faq', '/donate']

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const errs = []
  page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })

  let anyJetBrains = false

  for (const p of PAGES) {
    await page.goto(BASE + p, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(500)

    // Find any element using font-mono class and read its computed font-family
    const monoInfo = await page.evaluate(() => {
      // Prefer sample from a section marker or eyebrow
      const el =
        document.querySelector('.font-mono') ||
        document.querySelector('[class*="font-mono"]')
      if (!el) return null
      return {
        selector: el.tagName + '.' + (el.className.split(' ').slice(0, 3).join('.') || ''),
        fontFamily: getComputedStyle(el).fontFamily,
        text: (el.innerText || '').slice(0, 40),
      }
    })

    // Search page.content() for the literal string 'JetBrains'
    const html = await page.content()
    const inMarkup = /JetBrains/i.test(html)
    if (inMarkup) anyJetBrains = true

    console.log(`\n[${p}]`)
    console.log('  font-mono sample:', monoInfo)
    console.log('  "JetBrains" in DOM markup:', inMarkup)
  }

  console.log('\nConsole errors:', errs.length)
  console.log(anyJetBrains ? 'FAIL — JetBrains still present in DOM' : 'PASS — no JetBrains references anywhere')

  await browser.close()
})()
