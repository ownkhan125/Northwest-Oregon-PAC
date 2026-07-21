import { chromium } from 'playwright'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
]

const CHECKS = [
  {
    name: 'priorities',
    url: 'http://localhost:3000/#priorities',
    cardSelector: '#priorities [class*="grid-cols-3"] > div, #priorities [class*="grid-cols-2"] > div',
    findCards: async (page) => {
      return page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('#priorities .grid > div'))
        return cards.map((card) => {
          const c = card.querySelector('h3')?.parentElement
          const box = c?.getBoundingClientRect()
          const h3 = card.querySelector('h3')
          const h3Box = h3?.getBoundingClientRect()
          const paras = card.querySelectorAll('h3 + div p, h3 ~ div p')
          const paraDiv = card.querySelector('h3 ~ div, h3 + div')
          const paraBox = paraDiv?.getBoundingClientRect()
          const lastPara = paras[paras.length - 1]
          const lastParaBox = lastPara?.getBoundingClientRect()
          const cardBox = card.getBoundingClientRect()
          return {
            cardTop: Math.round(cardBox.top),
            cardBottom: Math.round(cardBox.bottom),
            cardHeight: Math.round(cardBox.height),
            h3Top: Math.round(h3Box?.top ?? 0),
            paraTop: Math.round(paraBox?.top ?? 0),
            paraBottom: Math.round(lastParaBox?.bottom ?? 0),
          }
        })
      })
    },
  },
  {
    name: 'values',
    url: 'http://localhost:3000/about',
    cardSelector: 'h2:has-text("What we stand for"), section',
    findCards: async (page) => {
      // Find the "What we stand for" section — the values grid
      return page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section'))
        const target = sections.find((s) => s.textContent?.includes('What we stand for'))
        if (!target) return null
        const cards = Array.from(target.querySelectorAll('.grid > div'))
        if (cards.length === 0) return null
        return cards.map((card) => {
          const inner = card.querySelector('div > div, .flex')
          const h3 = card.querySelector('h3')
          const p = card.querySelector('p')
          const h3Box = h3?.getBoundingClientRect()
          const pBox = p?.getBoundingClientRect()
          const cardBox = card.getBoundingClientRect()
          return {
            cardTop: Math.round(cardBox.top),
            cardBottom: Math.round(cardBox.bottom),
            cardHeight: Math.round(cardBox.height),
            h3Top: Math.round(h3Box?.top ?? 0),
            paraTop: Math.round(pBox?.top ?? 0),
            paraBottom: Math.round(pBox?.bottom ?? 0),
          }
        })
      })
    },
  },
]

const results = []
const browser = await chromium.launch()
try {
  for (const check of CHECKS) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
      const page = await ctx.newPage()
      const errs = []
      page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
      page.on('pageerror', (e) => errs.push('pageerror: ' + e.message))

      await page.goto(check.url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(600)

      // Scroll to section and let animations settle
      if (check.name === 'priorities') {
        await page.evaluate(() => document.querySelector('#priorities')?.scrollIntoView({ block: 'start' }))
      }
      await page.waitForTimeout(800)

      const cards = await check.findCards(page)
      const overflow = await page.evaluate(() => {
        const dw = document.documentElement.clientWidth
        const sw = document.documentElement.scrollWidth
        return { dw, sw, overflowX: sw > dw + 1 }
      })

      // Analyze alignment on same-row cards only
      let analysis = null
      if (cards && cards.length > 0) {
        // Group by row (cards with same cardTop within tolerance)
        const rows = new Map()
        for (const c of cards) {
          const key = Math.round(c.cardTop / 10) * 10
          if (!rows.has(key)) rows.set(key, [])
          rows.get(key).push(c)
        }
        analysis = Array.from(rows.entries()).map(([top, group]) => {
          const paraTops = group.map((c) => c.paraTop)
          const paraBottoms = group.map((c) => c.paraBottom)
          const h3Tops = group.map((c) => c.h3Top)
          const cardHeights = group.map((c) => c.cardHeight)
          const spread = (arr) => Math.max(...arr) - Math.min(...arr)
          return {
            rowTop: top,
            cardCount: group.length,
            headingAlignSpread: spread(h3Tops),
            paraStartSpread: spread(paraTops),
            paraEndSpread: spread(paraBottoms),
            cardHeightSpread: spread(cardHeights),
          }
        })
      }

      results.push({ check: check.name, viewport: vp.name, cardCount: cards?.length ?? 0, analysis, overflow, errs })
      await ctx.close()
    }
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(results, null, 2))
