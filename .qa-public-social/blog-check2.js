// Verify BlogCard is fully clickable across viewports — fresh box each click.
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

async function testClickArea(page, xFrac, yFrac) {
  // Fresh: land on /blogs, scroll first article into view, click
  await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const card = page.locator('article').first()
  await card.scrollIntoViewIfNeeded()
  await page.waitForTimeout(200)
  const box = await card.boundingBox()
  const x = box.x + box.width * xFrac
  const y = box.y + box.height * yFrac
  const startUrl = page.url()
  await page.mouse.click(x, y)
  await page.waitForTimeout(600)
  return { start: startUrl, end: page.url(), clickedAt: [Math.round(x), Math.round(y)] }
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = {}
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 })
    const page = await context.newPage()

    const areas = [
      { label: 'image', xF: 0.5, yF: 0.15 },
      { label: 'title', xF: 0.3, yF: 0.55 },
      { label: 'excerpt', xF: 0.5, yF: 0.75 },
      { label: 'byline', xF: 0.15, yF: 0.92 },
      { label: 'read_button', xF: 0.85, yF: 0.92 },
    ]
    const clicks = []
    for (const a of areas) {
      const r = await testClickArea(page, a.xF, a.yF)
      clicks.push({
        area: a.label,
        clickedAt: r.clickedAt,
        navigated: r.end !== r.start && /\/blogs\/[^/]+/.test(new URL(r.end).pathname),
        url: new URL(r.end).pathname,
      })
    }

    // Full-card screenshot
    await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    const card = page.locator('article').first()
    await card.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    await card.screenshot({ path: path.join(OUT, `blog-card-${vp.name}.png`) })

    // Link + spacing check
    const meta = await page.evaluate(() => {
      const article = document.querySelector('article')
      const links = article.querySelectorAll('a')
      const byline = [...article.querySelectorAll('span')].find((s) => s.textContent.startsWith('By '))
      const readSpan = [...article.querySelectorAll('span')].find((s) => s.textContent.trim().startsWith('Read article'))
      const spacing = byline && readSpan ? {
        byline_right: Math.round(byline.getBoundingClientRect().right),
        read_left: Math.round(readSpan.getBoundingClientRect().left),
        gap: Math.round(readSpan.getBoundingClientRect().left - byline.getBoundingClientRect().right),
        same_row: Math.abs(byline.getBoundingClientRect().top - readSpan.getBoundingClientRect().top) < 8,
      } : null
      return {
        link_count: links.length,
        hrefs: [...links].map((a) => a.getAttribute('href')),
        spacing,
        read_has_svg: !!readSpan?.querySelector('svg'),
      }
    })

    results[vp.name] = {
      link_count: meta.link_count,
      no_nested_links: meta.link_count === 1,
      spacing: meta.spacing,
      read_has_svg: meta.read_has_svg,
      all_clickable: clicks.every((c) => c.navigated),
      clicks,
    }
    await context.close()
  }
  await browser.close()
  console.log(JSON.stringify(results, null, 2))
})()
