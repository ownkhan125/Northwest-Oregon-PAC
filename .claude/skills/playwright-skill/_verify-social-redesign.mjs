import { chromium } from 'playwright'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const REPO = process.cwd()
const OUT = '.claude/skills/playwright-skill/_shots/social'

const samples = [
  // feed 1080x1080
  { path: 'campaign-social/feed/feed-01-hero.html',            key: 'feed-cover',     size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-02-mission.html',         key: 'feed-manifesto', size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-03-values.html',          key: 'feed-values3',   size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-04-promise.html',         key: 'feed-promise',   size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-05-brand.html',           key: 'feed-masthead',  size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-07-ticker.html',          key: 'feed-ticker',    size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-08-priority-01.html',     key: 'feed-pillar',    size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-09-priority-01-quote.html', key: 'feed-quote',   size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-10-priority-01-detail.html', key: 'feed-detail', size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-23-priorities-index.html', key: 'feed-list5',    size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-26-mark-norman.html',     key: 'feed-candidate', size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-31-run-for-office.html',  key: 'feed-cta',       size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-33-volunteer-ways.html',  key: 'feed-chips',     size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-38-contact.html',         key: 'feed-facts',     size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-41-donate-ladder.html',   key: 'feed-money',     size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-49-who-we-serve.html',    key: 'feed-block',     size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-53-value-prosperity.html', key: 'feed-value',    size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-56-team.html',            key: 'feed-team',      size: [1080, 1080] },
  { path: 'campaign-social/feed/feed-57-facts.html',           key: 'feed-stats',     size: [1080, 1080] },
  // story 1080x1920
  { path: 'campaign-social/stories/story-01-hero.html',        key: 'story-cover',    size: [1080, 1920] },
  { path: 'campaign-social/stories/story-04-promise.html',     key: 'story-promise',  size: [1080, 1920] },
  { path: 'campaign-social/stories/story-11-mark-norman.html', key: 'story-candidate',size: [1080, 1920] },
  { path: 'campaign-social/stories/story-16-run-for-office.html', key: 'story-cta',   size: [1080, 1920] },
  // carousels
  { path: 'campaign-social/carousels/carousel-01-meet-the-pac/slide-1.html', key: 'carousel-01-s1', size: [1080, 1080] },
  { path: 'campaign-social/carousels/carousel-02-five-priorities/slide-1.html', key: 'carousel-02-s1', size: [1080, 1080] },
  { path: 'campaign-social/carousels/carousel-02-five-priorities/slide-4.html', key: 'carousel-02-s4', size: [1080, 1080] },
  { path: 'campaign-social/carousels/carousel-08-candidates/slide-3.html', key: 'carousel-08-s3', size: [1080, 1080] },
  { path: 'campaign-social/carousels/carousel-10-our-story/slide-1.html', key: 'carousel-10-s1', size: [1080, 1080] },
]

const results = []

const browser = await chromium.launch()
try {
  for (const s of samples) {
    const context = await browser.newContext({
      viewport: { width: s.size[0], height: s.size[1] },
      deviceScaleFactor: 1,
    })
    const page = await context.newPage()
    const errors = []
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))

    const url = pathToFileURL(path.join(REPO, s.path)).href
    await page.goto(url, { waitUntil: 'networkidle' })

    // Wait a moment for fonts
    await page.waitForTimeout(500)

    // Check for overflowing text
    const overflow = await page.evaluate(() => {
      const el = document.querySelector('.canvas')
      if (!el) return { hasCanvas: false }
      const sw = el.scrollWidth
      const sh = el.scrollHeight
      const cw = el.clientWidth
      const ch = el.clientHeight
      return { hasCanvas: true, sw, sh, cw, ch, overflowX: sw > cw + 1, overflowY: sh > ch + 1 }
    })

    await page.screenshot({
      path: `${OUT}/${s.key}.png`,
      fullPage: false,
      clip: { x: 0, y: 0, width: s.size[0], height: s.size[1] },
    })

    results.push({ key: s.key, overflow, errors })
    await context.close()
  }
} finally {
  await browser.close()
}

const bad = results.filter((r) => r.errors.length || r.overflow.overflowX || r.overflow.overflowY)
console.log(JSON.stringify({ total: results.length, bad, ok: results.length - bad.length }, null, 2))
