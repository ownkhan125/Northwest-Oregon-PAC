const { chromium } = require('playwright')

const TARGET = 'http://localhost:3000/'
const SECTION_ID = 'statement'

const results = { pass: [], fail: [] }
const ok = (m) => (results.pass.push(m), console.log(`  ✅ ${m}`))
const no = (m) => (results.fail.push(m), console.log(`  ❌ ${m}`))

;(async () => {
  const browser = await chromium.launch({ headless: true })

  for (const v of [
    { name: 'desktop', w: 1440, h: 900 },
    { name: 'tablet', w: 768, h: 1024 },
    { name: 'mobile', w: 375, h: 812 },
  ]) {
    console.log(`\n===== ${v.name} (${v.w}x${v.h}) =====`)
    const page = await browser.newPage({ viewport: { width: v.w, height: v.h } })
    const consoleErrors = []
    const failedRequests = []
    page.on('console', (m) => {
      if (m.type() === 'error') consoleErrors.push(m.text())
    })
    page.on('pageerror', (e) => consoleErrors.push('pageerror: ' + e.message))
    page.on('response', (res) => {
      if (res.request().resourceType() === 'image' && !res.ok() && res.status() !== 304) {
        failedRequests.push(`img ${res.status()}: ${res.url()}`)
      }
    })

    await page.goto(TARGET, { waitUntil: 'networkidle' })
    await page.waitForTimeout(800)

    // Scroll to the section
    const el = page.locator(`#${SECTION_ID}`)
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    // Grab computed style of the background layer (first absolute -z-20 div)
    const info = await page.evaluate((sid) => {
      const section = document.getElementById(sid)
      if (!section) return { error: 'section not found' }
      const bgLayer = section.querySelector('[aria-hidden][class*="bg-cover"]')
      const overlay = section.querySelector('[aria-hidden][class*="bg-background"]')
      const rect = section.getBoundingClientRect()
      const bgRect = bgLayer ? bgLayer.getBoundingClientRect() : null
      const cs = bgLayer ? window.getComputedStyle(bgLayer) : null
      const olCs = overlay ? window.getComputedStyle(overlay) : null
      return {
        sectionWidth: Math.round(rect.width),
        sectionHeight: Math.round(rect.height),
        bgWidth: bgRect ? Math.round(bgRect.width) : null,
        bgHeight: bgRect ? Math.round(bgRect.height) : null,
        bgImage: cs ? cs.backgroundImage : null,
        bgSize: cs ? cs.backgroundSize : null,
        bgAttachment: cs ? cs.backgroundAttachment : null,
        overlayBg: olCs ? olCs.backgroundColor : null,
      }
    }, SECTION_ID)
    console.log('  ' + JSON.stringify(info))

    if (info.bgImage && info.bgImage.startsWith('url(')) ok('Background image is set')
    else no('Background image not set')

    if (info.bgSize === 'cover') ok('background-size: cover')
    else no(`background-size expected cover, got ${info.bgSize}`)

    const expectedAttachment = v.w >= 768 ? 'fixed' : 'scroll'
    if (info.bgAttachment === expectedAttachment)
      ok(`background-attachment: ${expectedAttachment} (${v.name})`)
    else no(`bg-attachment expected ${expectedAttachment}, got ${info.bgAttachment}`)

    if (info.bgWidth >= info.sectionWidth - 2) ok(`Bg layer covers section width (${info.bgWidth}/${info.sectionWidth})`)
    else no(`Bg layer width ${info.bgWidth} smaller than section ${info.sectionWidth}`)

    if (info.bgHeight >= info.sectionHeight - 2) ok(`Bg layer covers section height (${info.bgHeight}/${info.sectionHeight})`)
    else no(`Bg layer height ${info.bgHeight} smaller than section ${info.sectionHeight}`)

    if (info.overlayBg && info.overlayBg !== 'rgba(0, 0, 0, 0)') ok(`Overlay present: ${info.overlayBg}`)
    else no(`Overlay missing`)

    // Parallax test on desktop: scroll a bit and see if the bg element stays in place while the section moves
    if (v.name === 'desktop') {
      const before = await page.evaluate((sid) => {
        const section = document.getElementById(sid)
        const bgLayer = section.querySelector('[aria-hidden][class*="bg-cover"]')
        return {
          sectionTop: Math.round(section.getBoundingClientRect().top),
          bgTop: Math.round(bgLayer.getBoundingClientRect().top),
        }
      }, SECTION_ID)
      await page.evaluate(() => window.scrollBy(0, 200))
      await page.waitForTimeout(500)
      const after = await page.evaluate((sid) => {
        const section = document.getElementById(sid)
        const bgLayer = section.querySelector('[aria-hidden][class*="bg-cover"]')
        return {
          sectionTop: Math.round(section.getBoundingClientRect().top),
          bgTop: Math.round(bgLayer.getBoundingClientRect().top),
        }
      }, SECTION_ID)
      const sectionDelta = after.sectionTop - before.sectionTop
      const bgDelta = after.bgTop - before.bgTop
      console.log(`  Scroll deltas — section: ${sectionDelta}, bg: ${bgDelta}`)
      // With bg-fixed, the bg element itself moves with the section container (it's positioned absolute inside it),
      // but the *background image* stays fixed relative to the viewport. We check the computed attachment already.
    }

    // Overflow check
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    )
    if (overflow) no(`${v.name}: horizontal overflow`)
    else ok(`${v.name}: no horizontal overflow`)

    // Text readability — check computed color of the heading vs overlay presence
    const readable = await page.evaluate((sid) => {
      const section = document.getElementById(sid)
      const h2 = section.querySelector('h2')
      if (!h2) return { ok: false, reason: 'no h2' }
      const cs = window.getComputedStyle(h2)
      const rect = h2.getBoundingClientRect()
      return {
        ok: rect.width > 0 && rect.height > 0 && cs.opacity !== '0',
        color: cs.color,
        opacity: cs.opacity,
      }
    }, SECTION_ID)
    if (readable.ok) ok(`Heading rendered: ${readable.color}`)
    else no(`Heading not visible`)

    if (failedRequests.length === 0) ok('No failed image requests')
    else failedRequests.forEach((r) => no(r))

    if (consoleErrors.length === 0) ok('No console errors')
    else consoleErrors.forEach((e) => no('console: ' + e.slice(0, 120)))

    await page.screenshot({ path: `/tmp/parallax-${v.name}.png`, fullPage: false })
    // scroll to section and shot again
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await page.screenshot({ path: `/tmp/parallax-${v.name}-focus.png`, fullPage: false })

    await page.close()
  }

  console.log('\n===== SUMMARY =====')
  console.log(`Passed: ${results.pass.length}`)
  console.log(`Failed: ${results.fail.length}`)
  if (results.fail.length) {
    console.log('\nFAILURES:')
    results.fail.forEach((f) => console.log('  ' + f))
  }
  await browser.close()
  process.exit(results.fail.length > 0 ? 1 : 0)
})()
