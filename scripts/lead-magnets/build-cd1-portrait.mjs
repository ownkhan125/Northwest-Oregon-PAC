// Downsizes the cover portrait for the CD-1 lead magnet PDF so the final
// download stays lean. Reads the source portrait, decodes/renders it via
// a headless Chromium canvas at ~800px on the long edge, and writes the
// smaller JPEG next to the HTML template.
//
// Usage: node scripts/lead-magnets/build-cd1-portrait.mjs

import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const REPO_ROOT = resolve(__dirname, '..', '..')
const SRC = resolve(
  REPO_ROOT,
  'public',
  'images',
  'funnels',
  'barbara-kahl-vs-suzanne-bonamici',
  'Barbara.jpg',
)
const OUT = resolve(__dirname, 'cover-portrait.jpg')

const SKILL_DIR = resolve(REPO_ROOT, '.claude', 'skills', 'playwright-skill')
const require = createRequire(resolve(SKILL_DIR, 'package.json'))
const { chromium } = require('playwright')

const srcBuf = readFileSync(SRC)
const dataUrl = 'data:image/jpeg;base64,' + srcBuf.toString('base64')

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()

const outB64 = await page.evaluate(
  ({ url, maxEdge, quality }) =>
    new Promise((resolvePromise, reject) => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height))
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, w, h)
        resolvePromise(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = url
    }),
  { url: dataUrl, maxEdge: 900, quality: 0.82 },
)

const b64 = outB64.replace(/^data:image\/jpeg;base64,/, '')
writeFileSync(OUT, Buffer.from(b64, 'base64'))

await browser.close()
console.log('Wrote', OUT, `(${(Buffer.from(b64, 'base64').length / 1024).toFixed(1)} KB)`)
