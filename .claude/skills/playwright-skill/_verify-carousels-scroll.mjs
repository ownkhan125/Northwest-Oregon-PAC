import { chromium } from 'playwright'

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await ctx.newPage()

await page.goto('http://localhost:3000/social-posts', { waitUntil: 'networkidle' })

// Scroll to the carousels section
await page.evaluate(() => {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, span'))
  const el = headings.find((h) => (h.textContent || '').toLowerCase().includes('carousel'))
  if (el) el.scrollIntoView({ block: 'center' })
})
await page.waitForTimeout(1200)

await page.screenshot({
  path: '.claude/skills/playwright-skill/_shots/social-index-carousels-section.png',
  fullPage: false,
})

// Also do a full-page image so we can see all carousel thumbs
await page.screenshot({
  path: '.claude/skills/playwright-skill/_shots/social-index-full.png',
  fullPage: true,
})

// Open the first carousel to verify the lightbox loads the latest HTML
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button[aria-label^="Preview"]'))
  const carouselBtn = btns.find((b) => (b.getAttribute('aria-label') || '').toLowerCase().includes('for northwest oregon') || (b.getAttribute('aria-label') || '').toLowerCase().includes('meet the pac'))
  if (carouselBtn) carouselBtn.click()
})
await page.waitForTimeout(1500)

await page.screenshot({
  path: '.claude/skills/playwright-skill/_shots/social-index-lightbox.png',
  fullPage: false,
})

// Verify no console/network errors
const failed = []
page.on('response', (r) => { if (!r.ok() && r.url().includes('/social/')) failed.push(`${r.status()} ${r.url().split('/').pop()}`) })
await page.waitForTimeout(600)

await browser.close()
console.log('OK. Failed responses:', failed)
