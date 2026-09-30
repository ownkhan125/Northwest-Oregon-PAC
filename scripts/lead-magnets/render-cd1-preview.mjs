import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = resolve(__dirname, '..', '..')
const HTML_PATH = resolve(__dirname, 'cd1-voters-guide.html')
const OUT_DIR = resolve(REPO_ROOT, '.qa-lead-magnet')
mkdirSync(OUT_DIR, { recursive: true })

const SKILL_DIR = resolve(REPO_ROOT, '.claude', 'skills', 'playwright-skill')
const require = createRequire(resolve(SKILL_DIR, 'package.json'))
const { chromium } = require('playwright')

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({ viewport: { width: 850, height: 1100 }, deviceScaleFactor: 1 })
const page = await context.newPage()
await page.goto(pathToFileURL(HTML_PATH).toString(), { waitUntil: 'networkidle' })

const sections = await page.$$('section.page')
console.log(`Found ${sections.length} pages`)
for (let i = 0; i < sections.length; i++) {
  const bb = await sections[i].boundingBox()
  console.log(`Page ${i + 1}: ${bb ? `${Math.round(bb.width)}x${Math.round(bb.height)}` : 'no bbox'}`)
  await sections[i].screenshot({ path: resolve(OUT_DIR, `page-${String(i + 1).padStart(2, '0')}.png`) })
}
await browser.close()
console.log('Wrote screenshots to', OUT_DIR)
