const { chromium } = require('playwright')

const TARGET_URL = 'http://localhost:3000'

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const page = await browser.newPage()

  const errors = []
  page.on('pageerror', (e) => errors.push(`PAGEERROR: ${e.message}`))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`CONSOLE: ${m.text()}`)
  })

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto(`${TARGET_URL}/volunteer`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)

  // Scroll to the form
  await page.evaluate(() => {
    const el = document.querySelector('form')
    el?.scrollIntoView({ block: 'start' })
  })
  await page.waitForTimeout(800)

  // Closed state: screenshot the form section
  await page.screenshot({
    path: 'C:/Users/General/AppData/Local/Temp/select-closed.png',
    fullPage: false,
  })
  console.log('saved select-closed.png')

  // Find the Region select trigger and click it
  const trigger = await page.$('button[id="region"]')
  if (!trigger) {
    console.log('could not find #region trigger; falling back')
  }
  if (trigger) {
    await trigger.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    await trigger.click()
    await page.waitForTimeout(500)
    await page.screenshot({
      path: 'C:/Users/General/AppData/Local/Temp/select-open.png',
      fullPage: false,
    })
    console.log('saved select-open.png')

    // hover an option
    const options = await page.$$('[role="option"]')
    if (options[1]) {
      await options[1].hover()
      await page.waitForTimeout(300)
      await page.screenshot({
        path: 'C:/Users/General/AppData/Local/Temp/select-hover.png',
        fullPage: false,
      })
      console.log('saved select-hover.png')

      await options[1].click()
      await page.waitForTimeout(500)
      await page.screenshot({
        path: 'C:/Users/General/AppData/Local/Temp/select-selected.png',
        fullPage: false,
      })
      console.log('saved select-selected.png')
    }
  }

  // Mobile view
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${TARGET_URL}/volunteer`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  await page.evaluate(() => {
    const el = document.querySelector('button[id="region"]')
    el?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(500)
  const trigger2 = await page.$('button[id="region"]')
  if (trigger2) {
    await trigger2.click()
    await page.waitForTimeout(500)
    await page.screenshot({
      path: 'C:/Users/General/AppData/Local/Temp/select-mobile-open.png',
      fullPage: false,
    })
    console.log('saved select-mobile-open.png')
  }

  console.log('\nERRORS:')
  if (errors.length === 0) console.log('  none')
  else errors.forEach((e) => console.log(`  ${e}`))

  await browser.close()
})()
