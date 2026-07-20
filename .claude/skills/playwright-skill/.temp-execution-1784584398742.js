// Full verification of the Northwest Oregon PAC social library + app page.
//  A. Every creative renders at exact Instagram dimensions with brand
//     fonts/colors, no console errors, no broken images.
//  B. Carousels contain 5–7 slides with correct chrome.
//  C. /social-posts page: grids, filters, lightbox, previews, no errors.
//  D. Footer contains the Social Posts link; navbar does not.
//  E. Responsive layout has no horizontal overflow.
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const LIB = 'd:/Github/Northwest-Oregon-PAC/campaign-social'
const APP = process.env.APP_URL || 'http://localhost:3000'

const BRAND_BGS = ['rgb(246, 242, 232)'] // cream (light canvases)
const results = { pass: 0, fail: 0, failures: [] }
const ok = (cond, label) => {
  if (cond) results.pass++
  else {
    results.fail++
    results.failures.push(label)
    console.log('  ❌ ' + label)
  }
}

;(async () => {
  const browser = await chromium.launch({ headless: true })

  /* ---------------- A + B: creative library ---------------- */
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } })
  let consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))

  async function checkCreative(rel, expectW, expectH, { carousel } = {}) {
    consoleErrors = []
    await page.goto('file:///' + path.posix.join(LIB, rel), { waitUntil: 'networkidle' })
    const info = await page.evaluate(() => {
      const c = document.querySelector('.canvas')
      const r = c.getBoundingClientRect()
      const disp = document.querySelector('.display, .serif-body, .vlabel, .word, .band, .mname, .n')
      const mono = document.querySelector('.rail, .mono-sm, .filing, .eyebrow, .pill')
      const imgs = [...document.images].map((i) => ({ src: i.src, ok: i.complete && i.naturalWidth > 0 }))
      const root = getComputedStyle(document.documentElement)
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        canvasBg: getComputedStyle(c).backgroundImage + '|' + getComputedStyle(c).backgroundColor,
        dispFont: disp ? getComputedStyle(disp).fontFamily : '',
        monoFont: mono ? getComputedStyle(mono).fontFamily : '',
        brokenImgs: imgs.filter((i) => !i.ok).map((i) => i.src),
        vars: {
          forest: root.getPropertyValue('--forest').trim(),
          cream: root.getPropertyValue('--cream').trim(),
          sand: root.getPropertyValue('--sand').trim(),
        },
        rail: (document.querySelector('.rail') || {}).textContent || '',
        dots: document.querySelectorAll('.dots i').length,
        activeDot: [...document.querySelectorAll('.dots i')].findIndex((d) => d.className === 'on'),
      }
    })
    ok(info.w === expectW && info.h === expectH, `${rel}: size ${info.w}x${info.h} != ${expectW}x${expectH}`)
    // Brand card carries its serif in the wordmark artwork; every other
    // creative must set display copy in Lora.
    if (info.dispFont) ok(/Lora/i.test(info.dispFont), `${rel}: display font missing Lora (${info.dispFont})`)
    ok(/JetBrains/i.test(info.monoFont), `${rel}: mono font missing JetBrains (${info.monoFont})`)
    ok(info.vars.forest === '#2e4538' && info.vars.cream === '#f6f2e8' && info.vars.sand === '#e0d6bc', `${rel}: brand palette vars wrong`)
    ok(info.brokenImgs.length === 0, `${rel}: broken images ${info.brokenImgs.join(',')}`)
    ok(/PAID FOR BY NORTHWEST OREGON PAC #25045/i.test(info.rail), `${rel}: paid-for rail missing`)
    ok(consoleErrors.length === 0, `${rel}: console errors ${consoleErrors.slice(0, 2).join(' | ')}`)
    if (carousel) {
      ok(info.dots === carousel.count, `${rel}: dots ${info.dots} != ${carousel.count}`)
      ok(info.activeDot === carousel.index, `${rel}: active dot ${info.activeDot} != ${carousel.index}`)
    }
  }

  const feedFiles = fs.readdirSync(path.join(LIB, 'feed')).filter((f) => f.endsWith('.html'))
  const storyFiles = fs.readdirSync(path.join(LIB, 'stories')).filter((f) => f.endsWith('.html'))
  const carouselDirs = fs.readdirSync(path.join(LIB, 'carousels'))

  console.log(`\n— Checking ${feedFiles.length} feed posts…`)
  ok(feedFiles.length === 60, `feed count ${feedFiles.length} != 60`)
  for (const f of feedFiles) await checkCreative(`feed/${f}`, 1080, 1080)

  console.log(`— Checking ${storyFiles.length} stories…`)
  ok(storyFiles.length === 30, `story count ${storyFiles.length} != 30`)
  for (const f of storyFiles) await checkCreative(`stories/${f}`, 1080, 1920)

  console.log(`— Checking ${carouselDirs.length} carousels…`)
  ok(carouselDirs.length === 10, `carousel count ${carouselDirs.length} != 10`)
  for (const dir of carouselDirs) {
    const slides = fs.readdirSync(path.join(LIB, 'carousels', dir)).filter((f) => f.endsWith('.html'))
    ok(slides.length >= 5 && slides.length <= 7, `${dir}: ${slides.length} slides outside 5–7`)
    for (let i = 1; i <= slides.length; i++) {
      await checkCreative(`carousels/${dir}/slide-${i}.html`, 1080, 1080, {
        carousel: { count: slides.length, index: i - 1 },
      })
    }
  }

  // public mirror integrity
  const PUB = 'd:/Github/Northwest-Oregon-PAC/public/social'
  const pubFeed = fs.readdirSync(path.join(PUB, 'feed')).length
  const pubStories = fs.readdirSync(path.join(PUB, 'stories')).length
  const pubPrev = fs.readdirSync(path.join(PUB, 'previews')).length
  ok(pubFeed === 60 && pubStories === 30, `public mirror wrong: feed ${pubFeed}, stories ${pubStories}`)
  ok(pubPrev === 100, `previews ${pubPrev} != 100`)

  /* ---------------- C: app page ---------------- */
  console.log('— Checking /social-posts app page…')
  const app = await browser.newPage({ viewport: { width: 1440, height: 960 } })
  let appErrors = []
  app.on('console', (m) => {
    if (m.type() === 'error') appErrors.push(m.text())
  })
  app.on('pageerror', (e) => appErrors.push(String(e)))

  await app.goto(`${APP}/social-posts`, { waitUntil: 'networkidle', timeout: 60000 })
  await app.waitForTimeout(800)

  ok((await app.locator('h1').first().textContent()).includes('Made to be shared'), 'page h1 missing')

  const cardCount = async () => ({
    feed: await app.locator('article button[aria-label^="Preview"] img[alt*="1080 × 1080"]').count(),
    all: await app.locator('article').count(),
  })
  const counts0 = await cardCount()
  ok(counts0.all === 100, `total cards ${counts0.all} != 100`)

  // previews all reachable
  const previewSrcs = await app.evaluate(() =>
    [...document.querySelectorAll('img')].map((i) => i.getAttribute('src')).filter((s) => s && s.includes('/social/previews/')),
  )
  ok(previewSrcs.length === 100, `preview imgs on page ${previewSrcs.length} != 100`)
  let broken = 0
  for (const src of previewSrcs) {
    const res = await app.request.get(`${APP}${src}`)
    if (!res.ok()) broken++
  }
  ok(broken === 0, `${broken} preview images 404`)

  // format filter
  await app.getByRole('button', { name: 'Stories', exact: true }).click()
  await app.waitForTimeout(600)
  const storyOnly = await app.locator('article').count()
  ok(storyOnly === 30, `Stories filter shows ${storyOnly} != 30`)

  // topic filter
  await app.getByRole('button', { name: /Candidates ·/ }).click()
  await app.waitForTimeout(600)
  const candStories = await app.locator('article').count()
  ok(candStories === 6, `Stories+Candidates shows ${candStories} != 6`)

  // reset via pills
  await app.getByRole('button', { name: 'All formats' }).click()
  await app.getByRole('button', { name: /^All ·/ }).click()
  await app.waitForTimeout(600)

  // lightbox on feed card
  await app.locator('article button[aria-label^="Preview"]').first().click()
  await app.waitForSelector('[role="dialog"] iframe', { timeout: 10000 })
  const feedSrc = await app.locator('[role="dialog"] iframe').getAttribute('src')
  ok(feedSrc.includes('/social/feed/'), `lightbox iframe src wrong: ${feedSrc}`)
  await app.keyboard.press('Escape')
  await app.waitForFunction(() => !document.querySelector('[role="dialog"]'), null, { timeout: 5000 }).catch(() => {})
  ok((await app.locator('[role="dialog"]').count()) === 0, 'lightbox did not close on Esc')

  // lightbox on carousel: navigate slides
  await app.getByRole('button', { name: 'Carousels' }).click()
  await app.waitForTimeout(500)
  await app.locator('article button[aria-label^="Preview"]').first().click()
  await app.waitForSelector('[role="dialog"] iframe')
  await app.getByRole('button', { name: 'Next slide' }).click()
  await app.waitForTimeout(400)
  const slide2 = await app.locator('[role="dialog"] iframe').getAttribute('src')
  ok(slide2.includes('slide-2.html'), `carousel next → ${slide2}`)
  ok((await app.locator('[role="dialog"] [role="tab"]').count()) >= 5, 'carousel dots missing')
  await app.keyboard.press('Escape')

  ok(appErrors.length === 0, `app console errors: ${appErrors.slice(0, 3).join(' | ')}`)

  /* ---------------- D: footer / navbar ---------------- */
  console.log('— Checking footer + navbar…')
  await app.goto(`${APP}/`, { waitUntil: 'networkidle' })
  const footerLink = app.locator('footer a[href="/social-posts"]')
  ok((await footerLink.count()) === 1, `footer social-posts links: ${await footerLink.count()} != 1`)
  const navLink = app.locator('nav a[href="/social-posts"], header a[href="/social-posts"]')
  ok((await navLink.count()) === 0, 'social-posts link leaked into navbar/header')
  await footerLink.scrollIntoViewIfNeeded()
  await footerLink.click()
  await app.waitForURL('**/social-posts', { timeout: 15000 })
  ok(app.url().includes('/social-posts'), 'footer link navigation failed')

  /* ---------------- E: responsive ---------------- */
  console.log('— Checking responsive layout…')
  for (const [w, h] of [[375, 812], [768, 1024], [1440, 960]]) {
    await app.setViewportSize({ width: w, height: h })
    await app.goto(`${APP}/social-posts`, { waitUntil: 'networkidle' })
    await app.waitForTimeout(600)
    const overflow = await app.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    ok(overflow <= 1, `horizontal overflow ${overflow}px at ${w}w`)
  }

  await browser.close()

  console.log(`\n================ RESULT ================`)
  console.log(`PASS: ${results.pass}   FAIL: ${results.fail}`)
  if (results.fail) {
    console.log('Failures:')
    results.failures.forEach((f) => console.log('  - ' + f))
    process.exit(1)
  }
  console.log('ALL CHECKS PASSED ✅')
})()
