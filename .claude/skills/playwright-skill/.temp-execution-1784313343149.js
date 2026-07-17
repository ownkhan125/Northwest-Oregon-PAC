const { chromium } = require('playwright')

const EXPECTED_ALTS = [
  'Mark Norman',
  'Brian Schimmel',
  'Dr. Barbara Kahl',
  'Ciatta Thompson',
  'Randall Fryer',
]

const results = { pass: [], fail: [] }
const ok = (m) => (results.pass.push(m), console.log(`  ✅ ${m}`))
const no = (m) => (results.fail.push(m), console.log(`  ❌ ${m}`))

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const consoleErrors = []
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text())
  })
  page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message))
  const failedRequests = []
  page.on('response', (r) => {
    if (r.request().resourceType() === 'image' && !r.ok() && r.status() !== 304) {
      failedRequests.push(`${r.status()}: ${r.url()}`)
    }
  })

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' })
  const el = page.locator('#candidates')
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1500)

  // Ensure lazy images have loaded
  await page.evaluate(() => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager'
    })
  })
  await page.waitForTimeout(1500)

  const portraits = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#candidates [class*="grid-cols-1"] > div'))
    const items = []
    for (const card of cards) {
      const img = card.querySelector('img')
      const name = card.querySelector('h3')?.innerText
      if (!img && !name) continue
      items.push({
        name: name || null,
        src: img ? img.currentSrc || img.src : null,
        alt: img ? img.alt : null,
        nw: img ? img.naturalWidth : 0,
        nh: img ? img.naturalHeight : 0,
        complete: img ? img.complete : false,
      })
    }
    return items
  })

  console.log('\n===== CANDIDATE PORTRAITS =====')
  console.log(JSON.stringify(portraits, null, 2))

  for (const alt of EXPECTED_ALTS) {
    const p = portraits.find((x) => x.alt === alt || x.name === alt)
    if (!p) {
      no(`No card found for: ${alt}`)
      continue
    }
    if (p.nw > 0 && p.complete) ok(`${alt}: image loaded (${p.nw}x${p.nh})`)
    else no(`${alt}: image NOT loaded — src=${p.src}`)
  }

  // Screenshot for visual check
  await page.screenshot({ path: '/tmp/portraits-desktop.png', fullPage: false })
  await page.setViewportSize({ width: 375, height: 812 })
  await page.waitForTimeout(400)
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)
  await page.screenshot({ path: '/tmp/portraits-mobile.png', fullPage: false })

  if (failedRequests.length === 0) ok('No failed image requests')
  else failedRequests.forEach((r) => no('req fail: ' + r))
  if (consoleErrors.length === 0) ok('No console errors')
  else consoleErrors.forEach((e) => no('console: ' + e.slice(0, 120)))

  console.log('\n===== SUMMARY =====')
  console.log(`Passed: ${results.pass.length}`)
  console.log(`Failed: ${results.fail.length}`)
  await browser.close()
  process.exit(results.fail.length > 0 ? 1 : 0)
})()
