const { chromium } = require('playwright')

const TARGET = 'http://localhost:3000/social-posts'
const OUT = 'C:/Users/General/AppData/Local/Temp/nwop-review'
const fs = require('fs')
fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()

  const consoleErrs = []
  page.on('console', (m) => { if (m.type() === 'error') consoleErrs.push(m.text()) })
  page.on('pageerror', (e) => consoleErrs.push('PAGEERROR: ' + e.message))

  console.log('Loading', TARGET)
  await page.goto(TARGET, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1200)

  const bodyHtml = await page.content()
  const stampMatches = bodyHtml.match(/v=mrwkz6oo/g) || []
  console.log('Cache-buster mrwkz6oo occurrences in DOM:', stampMatches.length)
  const staleMatches = bodyHtml.match(/v=mrwjwh6c/g) || []
  console.log('Stale mrwjwh6c occurrences (should be 0):', staleMatches.length)

  await page.screenshot({ path: `${OUT}/social-index-full.png`, fullPage: true })
  console.log('Screenshot: social-index-full.png')

  try {
    const feedPill = page.getByRole('button', { name: /^Feed$/i }).first()
    if (await feedPill.count()) {
      await feedPill.click()
      await page.waitForTimeout(500)
    }
  } catch (e) { console.log('No feed pill:', e.message) }

  await page.screenshot({ path: `${OUT}/social-index-feed.png`, fullPage: true })

  const samples = [22, 27, 34, 41, 44, 53, 60]
  for (const n of samples) {
    const tile = page.locator(`img[src*="feed-${String(n).padStart(2, '0')}"]`).first()
    let opened = false
    if (await tile.count()) {
      try {
        await tile.scrollIntoViewIfNeeded()
        await tile.click({ timeout: 5000 })
        opened = true
      } catch (e) { console.log(`Feed ${n} click err:`, e.message.split('\n')[0]) }
    }
    if (!opened) { console.log(`Feed ${n}: could not open lightbox`); continue }

    await page.waitForTimeout(1400)
    const iframeSrc = await page.locator('iframe').first().getAttribute('src').catch(() => null)
    console.log(`Feed ${n}: iframe src =`, iframeSrc)
    await page.screenshot({ path: `${OUT}/social-lightbox-feed-${n}.png` })

    await page.keyboard.press('Escape')
    await page.waitForTimeout(400)
  }

  console.log('\nConsole errors:', consoleErrs.length)
  consoleErrs.slice(0, 10).forEach((e) => console.log('  •', e.slice(0, 200)))

  await browser.close()
  console.log('DONE')
})()
