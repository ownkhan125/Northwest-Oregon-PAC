const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')
const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')

const target = process.argv[2] // e.g. "feed/feed-01-hero.html"
const outName = process.argv[3] || target.split('/').pop().replace('.html', '') + '.jpg'
;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  await page.goto('file:///' + path.posix.join(PUB.replace(/\\/g, '/'), target), { waitUntil: 'load' })
  await page.waitForTimeout(200)
  await page
    .locator('.canvas')
    .screenshot({ path: path.join(__dirname, 'shots', outName), type: 'jpeg', quality: 90 })
  await browser.close()
  console.log(`Saved shots/${outName}`)
})()
