// Full verification: dismiss cookie banner, then confirm blog card is fully clickable
// across desktop/tablet/mobile, correct link count, correct button spacing.
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

async function dismissCookieBanner(page) {
  await page.evaluate(() => {
    try { localStorage.setItem('nwop-cookies', 'accepted') } catch {}
    try { localStorage.setItem('cookie-consent', 'accepted') } catch {}
  })
}

async function loadAndPrep(page) {
  await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle' })
  await dismissCookieBanner(page)
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  // Try to click the Accept button if still visible
  try {
    const accept = page.getByRole('button', { name: /accept/i }).first()
    if (await accept.isVisible({ timeout: 500 })) {
      await accept.click()
      await page.waitForTimeout(300)
    }
  } catch {}
  const card = page.locator('article').first()
  await card.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)
  return card
}

async function clickAt(page, xFrac, yFrac) {
  const card = await loadAndPrep(page)
  const box = await card.boundingBox()
  const x = box.x + box.width * xFrac
  const y = box.y + box.height * yFrac
  const startUrl = page.url()
  await page.mouse.click(x, y)
  await page.waitForTimeout(600)
  return { start: startUrl, end: page.url(), xy: [Math.round(x), Math.round(y)] }
}

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const results = {}
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await context.newPage()

    // Screenshots and static checks
    const card = await loadAndPrep(page)
    await card.screenshot({ path: path.join(OUT, `blog-card-${vp.name}.png`) })

    const meta = await page.evaluate(() => {
      const article = document.querySelector('article')
      const links = [...article.querySelectorAll('a')]
      const byline = [...article.querySelectorAll('span')].find((s) => s.textContent.startsWith('By '))
      const readSpan = [...article.querySelectorAll('span')].find((s) => s.textContent.trim().startsWith('Read article'))
      return {
        link_count: links.length,
        hrefs: links.map((a) => a.getAttribute('href')),
        aria_label: links[0]?.getAttribute('aria-label') || null,
        spacing: byline && readSpan ? {
          byline_right: Math.round(byline.getBoundingClientRect().right),
          read_left: Math.round(readSpan.getBoundingClientRect().left),
          gap_px: Math.round(readSpan.getBoundingClientRect().left - byline.getBoundingClientRect().right),
          same_row: Math.abs(byline.getBoundingClientRect().top - readSpan.getBoundingClientRect().top) < 8,
        } : null,
        read_has_svg: !!readSpan?.querySelector('svg'),
      }
    })

    // Click tests
    const areas = [
      { label: 'image_area', xF: 0.5, yF: 0.15 },
      { label: 'title_area', xF: 0.3, yF: 0.55 },
      { label: 'excerpt_area', xF: 0.5, yF: 0.7 },
      { label: 'byline_area', xF: 0.15, yF: 0.9 },
      { label: 'read_button_area', xF: 0.85, yF: 0.9 },
    ]
    const clicks = []
    for (const a of areas) {
      const r = await clickAt(page, a.xF, a.yF)
      const p = new URL(r.end).pathname
      clicks.push({
        area: a.label,
        clicked_at: r.xy,
        navigated: p !== '/blogs' && /^\/blogs\/[^/]+$/.test(p),
        landed_on: p,
      })
    }

    results[vp.name] = {
      viewport: `${vp.width}×${vp.height}`,
      link_count: meta.link_count,
      no_nested_links: meta.link_count === 1,
      aria_label: meta.aria_label,
      button_spacing: meta.spacing,
      read_has_arrow: meta.read_has_svg,
      all_areas_navigate: clicks.every((c) => c.navigated),
      clicks,
    }
    await context.close()
  }
  await browser.close()
  console.log(JSON.stringify(results, null, 2))
})()
