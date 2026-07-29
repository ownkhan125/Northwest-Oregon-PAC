// Playwright sweep — reads ONLY from public/social/. campaign-social/ is untouched.
// Usage: NODE_PATH=".claude/skills/playwright-skill/node_modules" node .qa-public-social/sweep.js
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')
const OUT = __dirname
fs.mkdirSync(path.join(OUT, 'shots'), { recursive: true })

;(async () => {
  const jobs = []
  for (const f of fs.readdirSync(path.join(PUB, 'feed')).sort()) {
    if (f.endsWith('.html')) jobs.push({ kind: 'feed', file: `feed/${f}`, id: f.replace('.html', '') })
  }
  for (const f of fs.readdirSync(path.join(PUB, 'stories')).sort()) {
    if (f.endsWith('.html')) jobs.push({ kind: 'story', file: `stories/${f}`, id: f.replace('.html', '') })
  }
  for (const dir of fs.readdirSync(path.join(PUB, 'carousels')).sort()) {
    const dp = path.join(PUB, 'carousels', dir)
    if (!fs.statSync(dp).isDirectory()) continue
    for (const s of fs.readdirSync(dp).sort()) {
      if (s.endsWith('.html'))
        jobs.push({ kind: 'carousel', file: `carousels/${dir}/${s}`, id: `${dir}__${s.replace('.html', '')}` })
    }
  }

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    deviceScaleFactor: 1,
    viewport: { width: 1080, height: 1920 },
  })

  const problems = []
  let done = 0
  for (const job of jobs) {
    const url = 'file:///' + path.posix.join(PUB.replace(/\\/g, '/'), job.file)
    await page.goto(url, { waitUntil: 'load' })
    await page.waitForTimeout(80)

    const check = await page.evaluate(() => {
      const canvas = document.querySelector('.canvas')
      if (!canvas) return { canvasFound: false }
      const cr = canvas.getBoundingClientRect()
      const bleeders = []
      document.querySelectorAll('.canvas *').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) return
        const text = (el.textContent || '').trim()
        if (!text) return
        const over = Math.max(
          cr.left - r.left,
          r.right - cr.right,
          cr.top - r.top,
          r.bottom - cr.bottom,
        )
        if (over > 4) {
          bleeders.push({
            cls: typeof el.className === 'string' ? el.className.slice(0, 50) : '',
            over: Math.round(over),
            text: text.slice(0, 50),
          })
        }
      })
      return { canvasFound: true, bleeders: bleeders.slice(0, 8) }
    })

    // Screenshot the canvas
    try {
      await page
        .locator('.canvas')
        .screenshot({ path: path.join(OUT, 'shots', `${job.id}.jpg`), type: 'jpeg', quality: 82 })
    } catch (e) {
      problems.push({ id: job.id, screenshotError: e.message })
    }

    if (!check.canvasFound || (check.bleeders && check.bleeders.length))
      problems.push({ id: job.id, kind: job.kind, ...check })

    done++
    if (done % 25 === 0) console.log(`  ${done}/${jobs.length}`)
  }
  await browser.close()

  fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(problems, null, 2))
  console.log(`\nSwept ${done} artboards from public/social`)
  console.log(`Real text overflow issues: ${problems.length}`)
  if (problems.length) console.log(JSON.stringify(problems, null, 2))
})()
