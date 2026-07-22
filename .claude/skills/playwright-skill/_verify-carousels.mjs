import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const REPO = process.cwd()
const CAROUSEL_DIR = path.join(REPO, 'campaign-social', 'carousels')
const OUT = '.claude/skills/playwright-skill/_shots/carousels'
fs.mkdirSync(OUT, { recursive: true })

const carousels = fs.readdirSync(CAROUSEL_DIR).filter((n) => n.startsWith('carousel-')).sort()
const jobs = []
for (const c of carousels) {
  const slides = fs.readdirSync(path.join(CAROUSEL_DIR, c)).filter((n) => n.startsWith('slide-')).sort()
  for (const s of slides) jobs.push({ carousel: c, slide: s, filePath: path.join(CAROUSEL_DIR, c, s) })
}

const browser = await chromium.launch()
const results = []
try {
  const context = await browser.newContext({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  const errsByJob = new Map()
  page.on('console', (m) => {
    if (m.type() === 'error') {
      const j = errsByJob.get('__current') || []
      j.push(m.text())
      errsByJob.set('__current', j)
    }
  })

  for (const job of jobs) {
    errsByJob.set('__current', [])
    const url = pathToFileURL(job.filePath).href
    await page.goto(url, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)

    const stats = await page.evaluate(() => {
      const canvas = document.querySelector('.canvas')
      if (!canvas) return { canvas: false }
      const cs = canvas.getBoundingClientRect()
      const contentBoxes = []
      // Only flag actual content, not background layers.
      const contentSel =
        'h1, h2, h3, .display, .lede, .body p, .c-mani-p, .c-num-figure, .c-num-p, ' +
        '.c-cover-sub, .c-close-sub, .c-belief-p, .c-checkimg-txt, .c-checkimg-num, ' +
        '.c-checkimg-mark, .c-checksolid-items .c-txt, .c-checksolid-items .c-num, ' +
        '.c-checksolid-items .c-check, .c-duo-body p, .c-mani-brand, .c-belief-index, ' +
        '.c-close-item .lbl, .c-close-item .n, .c-num-tag, .c-num-kicker, ' +
        '.c-checksolid-sub, .c-checkimg-sub'
      canvas.querySelectorAll(contentSel).forEach((el) => {
        // Skip elements inside pointer-events:none backgrounds
        if (el.closest('.c-cover-bg, .c-mani-bg, .c-checkimg-bg, .c-close-bg, .c-belief-photo, .glow, .c-cover-vignette, .c-cover-wash, .c-checkimg-wash, .c-close-wash, .c-mani-wash, .c-belief-photo-wash')) return
        const b = el.getBoundingClientRect()
        if (b.width < 4 || b.height < 4) return
        if (b.left < -1 || b.top < -1 || b.right > cs.right + 1 || b.bottom > cs.bottom + 1) {
          contentBoxes.push({
            tag: el.tagName + (el.className ? '.' + String(el.className).slice(0, 40) : ''),
            text: (el.textContent || '').slice(0, 60),
            box: [Math.round(b.left), Math.round(b.top), Math.round(b.right), Math.round(b.bottom)],
          })
        }
      })
      return {
        canvas: true,
        cs: [Math.round(cs.width), Math.round(cs.height)],
        outOfBounds: contentBoxes,
      }
    })

    const outPath = path.join(OUT, `${job.carousel}_${job.slide.replace('.html', '.png')}`)
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: 1080, height: 1080 },
    })

    results.push({
      carousel: job.carousel,
      slide: job.slide,
      stats,
      errors: errsByJob.get('__current') || [],
    })
  }
  await context.close()
} finally {
  await browser.close()
}

const bad = results.filter((r) => {
  const s = r.stats
  return !s.canvas || s.overflowX || s.overflowY || (s.outOfBounds && s.outOfBounds.length) || r.errors.length
})

console.log(`Total: ${results.length}`)
console.log(`OK: ${results.length - bad.length}`)
console.log(`FLAGGED: ${bad.length}`)
if (bad.length) {
  console.log('\n--- FLAGGED SLIDES ---')
  for (const b of bad) {
    console.log(`\n${b.carousel}/${b.slide}`)
    if (b.stats.overflowX) console.log('  ! canvas scrollWidth exceeds canvas width')
    if (b.stats.overflowY) console.log('  ! canvas scrollHeight exceeds canvas height')
    if (b.stats.outOfBounds && b.stats.outOfBounds.length) {
      console.log(`  ! ${b.stats.outOfBounds.length} element(s) outside canvas:`)
      for (const el of b.stats.outOfBounds.slice(0, 5)) {
        console.log(`    - ${el.tag} [${el.box.join(',')}] "${el.text}"`)
      }
    }
    if (b.errors.length) console.log(`  ! console errors: ${b.errors.length}`)
  }
}
