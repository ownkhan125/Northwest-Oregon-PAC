// Definitive test: use elementFromPoint to verify the Link overlay covers the card.
const { chromium } = require('playwright')

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 900, height: 1200 },
  { name: 'mobile', width: 390, height: 844 },
]

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = {}
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    const card = page.locator('article').first()
    await card.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)

    const hits = await page.evaluate(() => {
      const article = document.querySelector('article')
      const ar = article.getBoundingClientRect()
      const anchor = article.querySelector('a[href^="/blogs/"]')
      const href = anchor.getAttribute('href')
      // Sample a grid of points inside the article
      const results = []
      for (const [xF, yF, label] of [
        [0.1, 0.1, 'top-left'],
        [0.5, 0.1, 'top-center'],
        [0.9, 0.1, 'top-right'],
        [0.1, 0.5, 'middle-left'],
        [0.5, 0.5, 'center'],
        [0.9, 0.5, 'middle-right'],
        [0.1, 0.85, 'bottom-left'],
        [0.5, 0.85, 'bottom-center'],
        [0.9, 0.85, 'bottom-right'],
      ]) {
        const x = ar.left + ar.width * xF
        const y = ar.top + ar.height * yF
        const el = document.elementFromPoint(x, y)
        // Walk up until we find A or reach body
        let cur = el
        let hitLink = null
        while (cur && cur !== document.body) {
          if (cur.tagName === 'A') {
            hitLink = cur.getAttribute('href')
            break
          }
          cur = cur.parentElement
        }
        results.push({
          label,
          hit_link_href: hitLink,
          hits_expected_link: hitLink === href,
          top_element: el ? `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ').slice(0, 2).join('.') : ''}` : null,
        })
      }
      return { expected_href: href, article: { w: Math.round(ar.width), h: Math.round(ar.height) }, results }
    })
    results[vp.name] = {
      article: hits.article,
      expected: hits.expected_href,
      all_hit_link: hits.results.every((r) => r.hits_expected_link),
      probes: hits.results,
    }
    await ctx.close()
  }
  await browser.close()
  console.log(JSON.stringify(results, null, 2))
})()
