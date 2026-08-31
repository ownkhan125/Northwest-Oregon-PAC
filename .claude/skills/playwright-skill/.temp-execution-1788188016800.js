const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3100'

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page = await context.newPage()

  const fbRequests = []
  const consoleErrors = []
  const pageErrors = []

  page.on('request', (req) => {
    const u = req.url()
    if (u.includes('connect.facebook.net') || u.includes('facebook.com/tr')) {
      fbRequests.push({ phase: 'unset', method: req.method(), url: u })
    }
  })

  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => pageErrors.push(err.message))

  console.log('=== Loading homepage ===')
  await page.goto(TARGET_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2500)

  const initialCount = fbRequests.length
  for (let i = 0; i < initialCount; i++) fbRequests[i].phase = 'initial'

  const fbqTypeAfterLoad = await page.evaluate(() => typeof window.fbq)
  console.log(`typeof window.fbq after load: ${fbqTypeAfterLoad}`)
  console.log(`FB requests after initial load: ${initialCount}`)
  fbRequests.slice(0, initialCount).forEach((r, i) => {
    console.log(`  [${i}] ${r.method} ${r.url}`)
  })

  console.log('\n=== SPA navigating to /about via internal Link ===')
  const aboutLink = page.locator('a[href="/about"], a[href^="/about"]').first()
  const linkCount = await aboutLink.count()
  console.log(`Found ${linkCount} /about link(s)`)

  if (linkCount > 0) {
    await aboutLink.click()
    await page.waitForURL('**/about', { timeout: 10000 })
    await page.waitForTimeout(2500)
  } else {
    console.log('No /about Link found; calling router.push directly to simulate SPA nav')
    await page.evaluate(() => {
      window.history.pushState({}, '', '/about')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    await page.waitForTimeout(2500)
  }

  for (let i = initialCount; i < fbRequests.length; i++) fbRequests[i].phase = 'after-nav'
  const afterNavCount = fbRequests.length - initialCount
  console.log(`FB requests during /about nav: ${afterNavCount}`)
  fbRequests.slice(initialCount).forEach((r, i) => {
    console.log(`  [${i}] ${r.method} ${r.url}`)
  })

  console.log('\n=== Console errors ===')
  console.log(consoleErrors.length ? consoleErrors.join('\n') : '(none)')
  console.log('\n=== Page errors ===')
  console.log(pageErrors.length ? pageErrors.join('\n') : '(none)')

  const pixelIdMatches = fbRequests.filter((r) => r.url.includes('989250890820379')).length
  const pageViewMatches = fbRequests.filter((r) => r.url.includes('ev=PageView')).length
  console.log(`\n=== Summary ===`)
  console.log(`Total FB network requests: ${fbRequests.length}`)
  console.log(`Requests matching pixel ID 989250890820379: ${pixelIdMatches}`)
  console.log(`Requests with ev=PageView: ${pageViewMatches}`)
  console.log(`Initial-load beacons: ${initialCount}, Post-nav beacons: ${afterNavCount}`)

  await browser.close()
})().catch((e) => {
  console.error('Script failed:', e)
  process.exit(1)
})
