const { chromium } = require('playwright')
const path = require('path')
const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  await page.goto('file:///' + path.posix.join(PUB.replace(/\\/g, '/'), 'feed/feed-22-powered-by-innovation.html'), { waitUntil: 'load' })
  await page.waitForTimeout(120)
  const data = await page.evaluate(() => {
    const t = document.querySelector('.f22-timeline')
    const tr = t.getBoundingClientRect()
    const out = { timeline: { l: tr.left, w: tr.width, computed_style_display: getComputedStyle(t).display, padding: getComputedStyle(t).padding } }
    const kids = [...t.children]
    out.children = kids.map(k => {
      const r = k.getBoundingClientRect()
      const cs = getComputedStyle(k)
      return {
        tag: k.tagName, cls: k.className, l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width),
        display: cs.display, position: cs.position, marginLeft: cs.marginLeft, paddingLeft: cs.paddingLeft, boxSizing: cs.boxSizing,
        left: cs.left, right: cs.right, width: cs.width, maxWidth: cs.maxWidth
      }
    })
    return out
  })
  console.log(JSON.stringify(data, null, 2))
  await browser.close()
})()
