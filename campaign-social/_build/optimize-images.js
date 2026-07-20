// Optimize brand photos for the social creative library.
// Renders each source image in Chromium, downscales it on a canvas, and
// re-encodes as JPEG so creatives never ship multi-megabyte assets.
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const ROOT = 'd:/Github/Northwest-Oregon-PAC'
const OUT = path.join(ROOT, 'campaign-social/assets/img')

const JOBS = [
  { src: 'src/assets/images/hero.jpg', out: 'hero.jpg', width: 1920, quality: 0.8 },
  { src: 'src/assets/images/banner.jpg', out: 'banner.jpg', width: 1920, quality: 0.8 },
  { src: 'src/assets/images/Who we are.jpg', out: 'who-we-are.jpg', width: 1920, quality: 0.8 },
  { src: 'src/assets/images/Mark Norman.png', out: 'mark-norman.jpg', width: 900, quality: 0.85 },
  { src: 'src/assets/images/Brian Schimmel.jpg', out: 'brian-schimmel.jpg', width: 900, quality: 0.85 },
  { src: 'src/assets/images/Barbara Kahl.png', out: 'barbara-kahl.jpg', width: 900, quality: 0.85 },
  { src: 'src/assets/images/Ciatta Thompson.jpg', out: 'ciatta-thompson.jpg', width: 900, quality: 0.85 },
  { src: 'src/assets/images/Randall Fryer.jpg', out: 'randall-fryer.jpg', width: 900, quality: 0.85 },
]

const mime = (f) => (f.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  for (const job of JOBS) {
    const abs = path.join(ROOT, job.src)
    const dataUrl = `data:${mime(abs)};base64,${fs.readFileSync(abs).toString('base64')}`
    const result = await page.evaluate(
      async ({ dataUrl, width, quality }) => {
        const img = new Image()
        await new Promise((res, rej) => {
          img.onload = res
          img.onerror = rej
          img.src = dataUrl
        })
        const scale = Math.min(1, width / img.naturalWidth)
        const w = Math.round(img.naturalWidth * scale)
        const h = Math.round(img.naturalHeight * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        // White base flattens PNG transparency before JPEG encode
        ctx.fillStyle = '#f6f2e8'
        ctx.fillRect(0, 0, w, h)
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, w, h)
        return { data: canvas.toDataURL('image/jpeg', quality), w, h }
      },
      { dataUrl, width: job.width, quality: job.quality },
    )
    const buf = Buffer.from(result.data.split(',')[1], 'base64')
    fs.writeFileSync(path.join(OUT, job.out), buf)
    console.log(`${job.out}: ${result.w}x${result.h} — ${(buf.length / 1024).toFixed(0)} KB`)
  }
  await browser.close()
  console.log('DONE')
})()
