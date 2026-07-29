const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  for (const vp of [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 },
  ]) {
    const ctx = await browser.newContext({ viewport: vp })
    const page = await ctx.newPage()
    await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const card = page.locator('article').first()
    await card.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    const data = await page.evaluate(() => {
      const article = document.querySelector('article')
      const anchor = article.querySelector('a[href^="/blogs/"]')
      const ar = article.getBoundingClientRect()
      const lr = anchor.getBoundingClientRect()
      const cs = getComputedStyle(anchor)
      return {
        article: { l: Math.round(ar.left), t: Math.round(ar.top), w: Math.round(ar.width), h: Math.round(ar.height) },
        link: {
          l: Math.round(lr.left),
          t: Math.round(lr.top),
          w: Math.round(lr.width),
          h: Math.round(lr.height),
          className: anchor.className,
          computed_pos: cs.position,
          computed_inset: cs.inset,
          computed_z: cs.zIndex,
        },
        link_covers_article:
          Math.round(lr.left) <= Math.round(ar.left) + 1 &&
          Math.round(lr.top) <= Math.round(ar.top) + 1 &&
          Math.round(lr.right) >= Math.round(ar.right) - 1 &&
          Math.round(lr.bottom) >= Math.round(ar.bottom) - 1,
      }
    })
    console.log(`\n=== ${vp.name} ===`)
    console.log(JSON.stringify(data, null, 2))
    await ctx.close()
  }
  await browser.close()
})()
