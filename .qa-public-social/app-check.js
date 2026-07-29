// Verify the /social-posts app page loads gallery cards from public/social.
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 2400 } })

  // Track every image request the page makes
  const imgHits = []
  page.on('request', (req) => {
    if (req.resourceType() === 'image') imgHits.push(req.url())
  })

  await page.goto('http://localhost:3001/social-posts', { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(1000)

  // Count preview images from /social/previews/
  const previewHits = imgHits.filter((u) => u.includes('/social/previews/'))
  const nonSocial = imgHits.filter((u) => u.includes('campaign-social'))

  // Take a screenshot of the gallery
  await page.screenshot({ path: path.join(__dirname, 'shots', 'app-social-posts-gallery.png'), fullPage: false })

  // Click first feed card to open lightbox
  await page.locator('button, [role="button"]').first().click().catch(() => {})
  await page.waitForTimeout(600)
  await page.screenshot({ path: path.join(__dirname, 'shots', 'app-social-posts-lightbox.png'), fullPage: false })

  await browser.close()

  console.log(JSON.stringify({
    preview_requests_to_public_social: previewHits.length,
    sample_preview_urls: previewHits.slice(0, 3),
    references_to_campaign_social: nonSocial.length,
    verdict: nonSocial.length === 0 ? 'CLEAN — no campaign-social hits' : 'FAIL — campaign-social referenced'
  }, null, 2))
})()
