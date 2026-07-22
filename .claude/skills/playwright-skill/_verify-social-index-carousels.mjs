import { chromium } from 'playwright'

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
]

const results = []
const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
    const page = await ctx.newPage()
    const consoleErrs = []
    const failed = []
    page.on('console', (m) => { if (m.type() === 'error') consoleErrs.push(m.text()) })
    page.on('pageerror', (e) => consoleErrs.push('pageerror: ' + e.message))
    page.on('response', (r) => {
      const url = r.url()
      if (url.includes('/social/previews/') && !r.ok()) failed.push(`${r.status()} ${url.split('/').pop()}`)
    })

    await page.goto('http://localhost:3000/social-posts?fresh=1', { waitUntil: 'networkidle' })

    // Click "Carousels" filter so the carousel section is definitely visible
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 90))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1200)

    // Count carousel preview images
    const stats = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="/social/previews/carousel-"]'))
      const broken = imgs.filter((i) => i.naturalWidth === 0 || i.naturalHeight === 0)
      return {
        carouselPreviews: imgs.length,
        brokenCarousels: broken.length,
        brokenSrcs: broken.map((i) => i.src),
        sampleSrcs: imgs.slice(0, 3).map((i) => i.src.split('/').pop()),
      }
    })

    const allStats = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img[src*="/social/previews/"]'))
      const broken = imgs.filter((i) => i.naturalWidth === 0 || i.naturalHeight === 0)
      return { total: imgs.length, broken: broken.length }
    })

    const overflow = await page.evaluate(() => {
      const dw = document.documentElement.clientWidth
      const sw = document.documentElement.scrollWidth
      return { dw, sw, overflowX: sw > dw + 1 }
    })

    await page.screenshot({
      path: `.claude/skills/playwright-skill/_shots/social-carousels-${vp.name}.png`,
      fullPage: false,
    })

    results.push({ viewport: vp.name, stats, allStats, overflow, failed, consoleErrs })
    await ctx.close()
  }
} finally {
  await browser.close()
}

console.log(JSON.stringify(results, null, 2))
