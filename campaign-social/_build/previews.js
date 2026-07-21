// Generate card preview images for the app's social-posts page.
// 540×540 / 540×960 JPEGs from the 1080-wide artboards.
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const PUB = 'd:/Github/Northwest-Oregon-PAC/public/social'
const OUT = path.join(PUB, 'previews')

;(async () => {
  fs.mkdirSync(OUT, { recursive: true })
  const jobs = []
  for (const f of fs.readdirSync(path.join(PUB, 'feed'))) {
    jobs.push({ file: `feed/${f}`, out: f.replace('.html', '.jpg'), h: 1080 })
  }
  for (const f of fs.readdirSync(path.join(PUB, 'stories'))) {
    jobs.push({ file: `stories/${f}`, out: f.replace('.html', '.jpg'), h: 1920 })
  }
  for (const dir of fs.readdirSync(path.join(PUB, 'carousels'))) {
    jobs.push({ file: `carousels/${dir}/slide-1.html`, out: `${dir}.jpg`, h: 1080 })
  }

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ deviceScaleFactor: 0.5, viewport: { width: 1080, height: 1920 } })
  let done = 0
  for (const job of jobs) {
    await page.goto('file:///' + path.posix.join(PUB, job.file), { waitUntil: 'networkidle' })
    await page.waitForTimeout(120)
    await page
      .locator('.canvas')
      .screenshot({ path: path.join(OUT, job.out), type: 'jpeg', quality: 80 })
    done++
    if (done % 20 === 0) console.log(`${done}/${jobs.length}`)
  }
  await browser.close()
  console.log(`PREVIEWS DONE: ${done} files`)
})()
