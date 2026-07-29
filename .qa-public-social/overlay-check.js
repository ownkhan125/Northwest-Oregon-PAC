// Verify the "Where we stand" section (news.jsx) in both light and dark modes.
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, 'shots')
fs.mkdirSync(OUT, { recursive: true })

async function shoot(themeKey, outName) {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1400 },
    deviceScaleFactor: 2,
    colorScheme: themeKey === 'dark' ? 'dark' : 'light',
  })
  const page = await context.newPage()
  await page.addInitScript((t) => {
    try { localStorage.setItem('nwop-theme', t) } catch {}
  }, themeKey)
  await page.goto('http://localhost:3001/#statement', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(700)
  await page.evaluate(() => document.getElementById('statement')?.scrollIntoView({ behavior: 'instant', block: 'start' }))
  await page.waitForTimeout(500)
  await page.locator('#statement').screenshot({ path: path.join(OUT, outName) })
  const measure = await page.evaluate(() => {
    const sec = document.getElementById('statement')
    const overlay = sec.querySelector('div[aria-hidden].pointer-events-none.absolute.inset-0.-z-10')
    const body = sec.querySelector('p')
    const html = document.documentElement
    return {
      html_class: html.className,
      overlay_bg: overlay ? getComputedStyle(overlay).backgroundColor : null,
      body_color: body ? getComputedStyle(body).color : null,
      bg_color_var: getComputedStyle(html).getPropertyValue('--background').trim(),
    }
  })
  await browser.close()
  return measure
}

;(async () => {
  const light = await shoot('light', 'news-light.png')
  const dark = await shoot('dark', 'news-dark.png')
  console.log(JSON.stringify({ light, dark }, null, 2))
})()
