import { chromium } from 'playwright'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
]

const CHECKS = [
  {
    name: 'priorities',
    url: 'http://localhost:3000/#priorities',
    prep: async (page) => {
      await page.evaluate(() => document.querySelector('#priorities')?.scrollIntoView({ block: 'start' }))
      await page.waitForTimeout(700)
    },
    findCards: (page) => page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#priorities .grid > div'))
      return cards.map((card) => {
        const h3 = card.querySelector('h3')
        // Bottom wrapper: the div sibling AFTER the top wrapper (top wrapper contains h3)
        const topWrapper = h3?.parentElement
        const bottomWrapper = topWrapper?.nextElementSibling
        const firstPara = bottomWrapper?.querySelector('p')
        const lastPara = bottomWrapper?.querySelectorAll('p')
        const lastP = lastPara && lastPara[lastPara.length - 1]
        const cb = card.getBoundingClientRect()
        const tb = topWrapper?.getBoundingClientRect()
        const hb = h3?.getBoundingClientRect()
        const bb = bottomWrapper?.getBoundingClientRect()
        const fpb = firstPara?.getBoundingClientRect()
        const lpb = lastP?.getBoundingClientRect()
        return {
          cardTop: Math.round(cb.top),
          cardBottom: Math.round(cb.bottom),
          cardH: Math.round(cb.height),
          topWrapperH: Math.round(tb?.height ?? 0),
          h3Top: Math.round(hb?.top ?? 0),
          h3Bottom: Math.round(hb?.bottom ?? 0),
          h3H: Math.round(hb?.height ?? 0),
          bottomTop: Math.round(bb?.top ?? 0),
          firstParaTop: Math.round(fpb?.top ?? 0),
          lastParaBottom: Math.round(lpb?.bottom ?? 0),
        }
      })
    }),
  },
  {
    name: 'values',
    url: 'http://localhost:3000/about',
    prep: async (page) => {
      // Scroll to values section
      await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('section'))
        const target = sections.find((s) => s.textContent?.includes('What we stand for'))
        target?.scrollIntoView({ block: 'start' })
      })
      await page.waitForTimeout(700)
    },
    findCards: (page) => page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'))
      const target = sections.find((s) => s.textContent?.includes('What we stand for'))
      if (!target) return null
      const cards = Array.from(target.querySelectorAll('.grid > div'))
      return cards.map((card) => {
        const h3 = card.querySelector('h3')
        const topWrapper = h3?.parentElement
        const p = card.querySelector('p')
        const cb = card.getBoundingClientRect()
        const tb = topWrapper?.getBoundingClientRect()
        const hb = h3?.getBoundingClientRect()
        const pb = p?.getBoundingClientRect()
        return {
          cardTop: Math.round(cb.top),
          cardH: Math.round(cb.height),
          topWrapperH: Math.round(tb?.height ?? 0),
          h3Top: Math.round(hb?.top ?? 0),
          h3H: Math.round(hb?.height ?? 0),
          pTop: Math.round(pb?.top ?? 0),
          pBottom: Math.round(pb?.bottom ?? 0),
        }
      })
    }),
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
      await page.waitForTimeout(500)
      await check.prep(page)

      const cards = await check.findCards(page)
      const overflow = await page.evaluate(() => {
        const dw = document.documentElement.clientWidth
        const sw = document.documentElement.scrollWidth
        return { dw, sw, overflowX: sw > dw + 1 }
      })

      // Group by row and spread
      const rows = new Map()
      for (const c of (cards ?? [])) {
        const key = Math.round(c.cardTop / 10) * 10
        if (!rows.has(key)) rows.set(key, [])
        rows.get(key).push(c)
      }
      const spread = (arr) => Math.max(...arr) - Math.min(...arr)
      const analysis = Array.from(rows.entries()).map(([top, group]) => ({
        rowTop: top,
        n: group.length,
        cardH: spread(group.map((c) => c.cardH)),
        topWrapperH: spread(group.map((c) => c.topWrapperH)),
        h3H: spread(group.map((c) => c.h3H)),
        firstParaTop: spread(group.map((c) => c.firstParaTop ?? c.pTop ?? 0)),
        lastParaBottom: spread(group.map((c) => c.lastParaBottom ?? c.pBottom ?? 0)),
        // raw sample
        sample: group,
      }))

      results.push({ check: check.name, viewport: vp.name, overflow, errs, analysis })

      // Screenshot for visual inspection
      const shotName = `${check.name}_${vp.name}.png`
      await page.screenshot({ path: `.claude/skills/playwright-skill/_shots/cards/${shotName}`, fullPage: false })
      await ctx.close()
    }
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(results, null, 2))
