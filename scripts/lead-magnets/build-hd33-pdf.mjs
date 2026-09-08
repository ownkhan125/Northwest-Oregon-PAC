// Generates public/downloads/hd33-voters-guide.pdf from the sibling HTML
// template using headless Chromium via the shared playwright-skill install.
//
// Usage: node scripts/lead-magnets/build-hd33-pdf.mjs

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { mkdirSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = resolve(__dirname, '..', '..')
const HTML_PATH = resolve(__dirname, 'hd33-voters-guide.html')
const OUT_PATH = resolve(REPO_ROOT, 'public', 'downloads', 'hd33-voters-guide.pdf')

// Load playwright from the skill's node_modules to avoid adding it to
// package.json — this build script is dev-only.
const SKILL_DIR = resolve(REPO_ROOT, '.claude', 'skills', 'playwright-skill')
const require = createRequire(resolve(SKILL_DIR, 'package.json'))
const { chromium } = require('playwright')

if (!existsSync(HTML_PATH)) {
  console.error('Template not found:', HTML_PATH)
  process.exit(1)
}

mkdirSync(dirname(OUT_PATH), { recursive: true })

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext()
const page = await context.newPage()

await page.goto(pathToFileURL(HTML_PATH).toString(), { waitUntil: 'networkidle' })

await page.pdf({
  path: OUT_PATH,
  format: 'Letter',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()

console.log('Wrote', OUT_PATH)
