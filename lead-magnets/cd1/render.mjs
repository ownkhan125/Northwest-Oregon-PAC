// Renders guide.html → public/downloads/cd1-voters-guide.pdf.
// Usage: node lead-magnets/cd1/render.mjs [--shots <dir>]
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here, '../..')
const require = createRequire(path.join(root, '.claude/skills/playwright-skill/package.json'))
const { chromium } = require('playwright')

const out = path.join(root, 'public/downloads/cd1-voters-guide.pdf')
const shotsIdx = process.argv.indexOf('--shots')
const shotsDir = shotsIdx > -1 ? process.argv[shotsIdx + 1] : null

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 816, height: 1056 } })
await page.goto(pathToFileURL(path.join(here, 'guide.html')).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)

const overflow = await page.$$eval('.page', (pages) =>
  pages
    .map((p, i) => {
      const folio = p.querySelector('.folio')
      const limit = folio ? folio.getBoundingClientRect().top : p.getBoundingClientRect().bottom
      const last = [...p.children]
        .filter((c) => c !== folio && getComputedStyle(c).position !== 'absolute')
        .reduce((max, c) => Math.max(max, c.getBoundingClientRect().bottom), 0)
      return last > limit ? `page ${i + 1}: content ends ${Math.round(last - limit)}px past folio` : null
    })
    .filter(Boolean),
)
if (overflow.length) console.warn('OVERFLOW\n' + overflow.join('\n'))

if (shotsDir) {
  const frames = await page.$$('.page')
  for (const [i, el] of frames.entries()) {
    await el.screenshot({ path: path.join(shotsDir, `p${String(i + 1).padStart(2, '0')}.png`) })
  }
}

await page.emulateMedia({ media: 'print' })
await page.pdf({ path: out, width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true })
await browser.close()
console.log(`wrote ${path.relative(root, out)}`)
