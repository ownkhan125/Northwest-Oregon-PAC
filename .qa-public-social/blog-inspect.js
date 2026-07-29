const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.goto('http://localhost:3001/blogs', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(500)

  const data = await page.evaluate(() => {
    const article = document.querySelector('article')
    const ar = article.getBoundingClientRect()
    const anchor = article.querySelector('a')
    const anchorRect = anchor.getBoundingClientRect()
    // The ::before pseudo can't be measured directly — read computed position
    const beforeStyle = window.getComputedStyle(anchor, '::before')
    // Simulate: get element at points around the card
    const pts = []
    for (const [xF, yF, label] of [
      [0.2, 0.2, 'top-left'],
      [0.5, 0.2, 'top-center'],
      [0.8, 0.2, 'top-right'],
      [0.5, 0.5, 'center'],
      [0.85, 0.9, 'bottom-right'],
      [0.15, 0.9, 'bottom-left'],
    ]) {
      const x = ar.left + ar.width * xF
      const y = ar.top + ar.height * yF
      const el = document.elementFromPoint(x, y)
      pts.push({ label, xy: [Math.round(x), Math.round(y)], tag: el?.tagName, cls: (el?.className || '').toString().slice(0, 80) })
    }
    return {
      article: { l: Math.round(ar.left), t: Math.round(ar.top), w: Math.round(ar.width), h: Math.round(ar.height) },
      anchor: {
        tag: anchor.tagName,
        href: anchor.getAttribute('href'),
        rect: { l: Math.round(anchorRect.left), t: Math.round(anchorRect.top), w: Math.round(anchorRect.width), h: Math.round(anchorRect.height) },
      },
      before: {
        content: beforeStyle.content,
        position: beforeStyle.position,
        inset: beforeStyle.inset,
        zIndex: beforeStyle.zIndex,
      },
      elementFromPoint: pts,
    }
  })
  console.log(JSON.stringify(data, null, 2))
  await browser.close()
})()
