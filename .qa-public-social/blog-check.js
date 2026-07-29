// Verify BlogCard is fully clickable, has no nested links, and spacing is correct.
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, 'shots')
fs.mkdirSync(OUT, { recursive: true })

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 900, height: 1200 },
  { name: 'mobile', width: 390, height: 844 },
]

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = {}
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 })
    const page = await context.newPage()
    await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForTimeout(600)

    // Locate a blog card (article)
    const card = page.locator('article').first()
    await card.waitFor({ timeout: 10000 })
    const box = await card.boundingBox()
    await card.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await card.screenshot({ path: path.join(OUT, `blog-card-${vp.name}.png`) })

    // 1. Count links inside the article
    const linkCount = await card.locator('a').count()
    const linkHrefs = await card.locator('a').evaluateAll((els) => els.map((a) => a.getAttribute('href')))

    // 2. Confirm the whole card acts as a link: click at 10 different points inside the card,
    //    each should navigate to /blogs/<slug>.
    const expectedHref = linkHrefs[0]
    const clickTargets = [
      { xFrac: 0.5, yFrac: 0.15, label: 'image_area' },
      { xFrac: 0.5, yFrac: 0.55, label: 'title_area' },
      { xFrac: 0.5, yFrac: 0.75, label: 'excerpt_area' },
      { xFrac: 0.15, yFrac: 0.92, label: 'byline_area' },
      { xFrac: 0.85, yFrac: 0.92, label: 'read_article_area' },
    ]
    const clickResults = []
    for (const t of clickTargets) {
      const startUrl = page.url()
      await page.mouse.click(box.x + box.width * t.xFrac, box.y + box.height * t.yFrac)
      await page.waitForLoadState('load', { timeout: 5000 }).catch(() => {})
      await page.waitForTimeout(200)
      const nowUrl = page.url()
      const navigated = nowUrl !== startUrl && nowUrl.includes(expectedHref)
      clickResults.push({ area: t.label, navigated, url: nowUrl.replace('http://localhost:3001', '') })
      await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
      await page.waitForTimeout(400)
    }

    // 3. Measure Read Article spacing (gap between byline and Read article)
    const spacing = await page.evaluate(() => {
      const article = document.querySelector('article')
      const byline = [...article.querySelectorAll('span')].find((s) => s.textContent.startsWith('By '))
      const readArticle = [...article.querySelectorAll('span')].find((s) => s.textContent.includes('Read article'))
      if (!byline || !readArticle) return null
      const br = byline.getBoundingClientRect()
      const rr = readArticle.getBoundingClientRect()
      return {
        byline_right: Math.round(br.right),
        read_article_left: Math.round(rr.left),
        gap_between: Math.round(rr.left - br.right),
        same_row: Math.abs(br.top - rr.top) < 8,
        byline_text: byline.textContent,
        read_article_text: readArticle.textContent.trim(),
        read_article_has_svg: !!readArticle.querySelector('svg'),
      }
    })

    results[vp.name] = {
      link_count: linkCount,
      link_hrefs: linkHrefs,
      no_nested_links: linkCount === 1,
      click_results: clickResults,
      all_areas_clickable: clickResults.every((c) => c.navigated),
      button_spacing: spacing,
    }
    await context.close()
  }
  await browser.close()
  console.log(JSON.stringify(results, null, 2))
})()
