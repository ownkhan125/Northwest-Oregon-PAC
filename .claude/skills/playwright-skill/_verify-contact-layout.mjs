import { chromium } from 'playwright'

const BASE = 'http://localhost:3000/contact'
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
]

const results = []

const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()
    const consoleErrors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message))

    await page.goto(BASE, { waitUntil: 'networkidle' })

    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth
      const scrollW = document.documentElement.scrollWidth
      const bodyScrollW = document.body.scrollWidth
      return { docW, scrollW, bodyScrollW, overflowX: scrollW > docW || bodyScrollW > docW }
    })

    const layout = await page.evaluate(() => {
      const section = document.querySelector('section[aria-label="Contact information and form"]')
      if (!section) return { hasSection: false }
      const grid = section.querySelector('.grid')
      if (!grid || grid.children.length < 2) return { hasSection: true, hasGrid: false }
      const [left, right] = grid.children
      const leftBox = left.getBoundingClientRect()
      const rightBox = right.getBoundingClientRect()
      return {
        hasSection: true,
        hasGrid: true,
        gridColumns: getComputedStyle(grid).gridTemplateColumns,
        leftLeft: Math.round(leftBox.left),
        leftWidth: Math.round(leftBox.width),
        rightLeft: Math.round(rightBox.left),
        rightWidth: Math.round(rightBox.width),
        leftIsLeftmost: leftBox.left <= rightBox.left,
        stacked: leftBox.bottom <= rightBox.top + 1,
      }
    })

    let stickyCheck = null
    if (vp.name === 'desktop') {
      const before = await page.evaluate(() => {
        const grid = document
          .querySelector('section[aria-label="Contact information and form"]')
          .querySelector('.grid')
        return grid.children[0].getBoundingClientRect().top
      })
      await page.evaluate(() => window.scrollBy(0, 800))
      await page.waitForTimeout(400)
      const after = await page.evaluate(() => {
        const grid = document
          .querySelector('section[aria-label="Contact information and form"]')
          .querySelector('.grid')
        return grid.children[0].getBoundingClientRect().top
      })
      stickyCheck = { before: Math.round(before), after: Math.round(after), stuck: Math.abs(after - before) < 20 }
      await page.evaluate(() => window.scrollTo(0, 0))
    }

    await page.screenshot({
      path: `.claude/skills/playwright-skill/_shots/contact_${vp.name}.png`,
      fullPage: false,
    })

    results.push({ viewport: vp.name, overflow, layout, stickyCheck, consoleErrors })
    await context.close()
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(results, null, 2))
