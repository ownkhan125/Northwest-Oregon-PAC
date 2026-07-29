const { chromium } = require('playwright')
const path = require('path')
const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  const results = {}
  for (const t of ['feed-01-hero', 'feed-07-small-actions']) {
    await page.goto('file:///' + path.posix.join(PUB.replace(/\\/g, '/'), 'feed', t + '.html'), { waitUntil: 'load' })
    await page.waitForTimeout(200)
    const check = await page.evaluate(() => {
      const canvas = document.querySelector('.canvas')
      const cr = canvas.getBoundingClientRect()
      const bleeders = []
      document.querySelectorAll('.canvas *').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) return
        const text = (el.textContent || '').trim()
        if (!text) return
        const over = Math.max(cr.left - r.left, r.right - cr.right, cr.top - r.top, r.bottom - cr.bottom)
        if (over > 4) bleeders.push({ over: Math.round(over), text: text.slice(0, 40) })
      })
      const rects = {}
      const flag = document.querySelector('.f01-flag')
      const head = document.querySelector('.f01-head')
      if (flag && head) {
        const fr = flag.getBoundingClientRect()
        const hr = head.getBoundingClientRect()
        rects.flag_head_overlap =
          !(hr.right <= fr.left || hr.left >= fr.right || hr.bottom <= fr.top || hr.top >= fr.bottom)
        rects.head_right = Math.round(hr.right)
        rects.flag_left = Math.round(fr.left)
      }
      const beam = document.querySelector('.f07-scale .beam')
      const panL = document.querySelector('.f07-scale .pan.left')
      const panR = document.querySelector('.f07-scale .pan.right')
      if (beam && panL) {
        const br = beam.getBoundingClientRect()
        const pr = panL.getBoundingClientRect()
        rects.beam_leftpan_overlap =
          !(br.right <= pr.left || br.left >= pr.right || br.bottom <= pr.top || br.top >= pr.bottom)
        rects.beam_bottom = Math.round(br.bottom)
        rects.leftpan_top = Math.round(pr.top)
      }
      if (beam && panR) {
        const br = beam.getBoundingClientRect()
        const pr = panR.getBoundingClientRect()
        rects.beam_rightpan_overlap =
          !(br.right <= pr.left || br.left >= pr.right || br.bottom <= pr.top || br.top >= pr.bottom)
      }
      return { bleeders: bleeders.slice(0, 5), rects }
    })
    results[t] = check
  }
  console.log(JSON.stringify(results, null, 2))
  await browser.close()
})()
