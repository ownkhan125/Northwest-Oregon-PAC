// Inspect specific overflow: measure rail geometry
const { chromium } = require('playwright')
const path = require('path')
const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')

const target = process.argv[2] || 'feed/feed-22-powered-by-innovation.html'

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  await page.goto('file:///' + path.posix.join(PUB.replace(/\\/g, '/'), target), { waitUntil: 'load' })
  await page.waitForTimeout(120)
  const data = await page.evaluate(() => {
    const canvas = document.querySelector('.canvas')
    const cr = canvas.getBoundingClientRect()
    const out = { canvas: { l: cr.left, r: cr.right, w: cr.width } }
    for (const sel of ['.f22-timeline', '.f22-timeline .rail', '.f22-timeline .node.n5', '.f22-timeline .node.n5 .name', '.f45-strip .rail', '.f45-cycle.c4']) {
      const el = document.querySelector(sel)
      if (!el) continue
      const r = el.getBoundingClientRect()
      out[sel] = { l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width), rOverCanvas: Math.round(r.right - cr.right) }
    }
    return out
  })
  console.log(JSON.stringify(data, null, 2))
  await browser.close()
})()
