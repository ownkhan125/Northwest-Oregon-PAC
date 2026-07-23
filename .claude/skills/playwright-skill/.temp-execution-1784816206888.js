const { chromium } = require('playwright')

const BASE = 'http://localhost:3000/5-minutes-voter-guide'
const OUT = 'C:/Users/General/AppData/Local/Temp/nwop-review'
const fs = require('fs')
fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  const browser = await chromium.launch({ headless: false })

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'laptop-1280', width: 1280, height: 800 },
    { name: 'tablet-820', width: 820, height: 1180 },
    { name: 'mobile-390', width: 390, height: 844 },
  ]

  for (const v of viewports) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } })
    const page = await ctx.newPage()
    await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(700)

    const btn = page.locator('[data-testid="funnel-submit"]')
    const btnBox = await btn.boundingBox()
    // Count text lines by scanning the button's span
    const info = await btn.evaluate((el) => {
      // Find the visible label text node
      const text = el.innerText.trim()
      const cs = getComputedStyle(el)
      const lineH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2
      const inner = el.querySelector('span.relative') || el
      const innerRect = inner.getBoundingClientRect()
      return {
        text,
        buttonHeight: el.getBoundingClientRect().height,
        innerHeight: innerRect.height,
        lineHeight: lineH,
        approxLines: Math.round(innerRect.height / lineH),
      }
    })
    console.log(`[${v.name}] button box:`, btnBox && { w: Math.round(btnBox.width), h: Math.round(btnBox.height) })
    console.log(`  label:`, JSON.stringify(info.text))
    console.log(`  buttonH: ${info.buttonHeight}, innerH: ${info.innerHeight}, lineH: ${info.lineHeight}, approx lines: ${info.approxLines}`)
    console.log(`  wrap detected:`, info.approxLines > 1 ? 'YES ✗' : 'NO ✓')

    await page.locator('form').first().screenshot({ path: `${OUT}/form-${v.name}.png` })
    await ctx.close()
  }

  await browser.close()
  console.log('DONE')
})()
