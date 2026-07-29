// Text-content verification: for each PDF-flagged post, assert the expected
// exact strings appear in the rendered .canvas of the corresponding public/social HTML.
const { chromium } = require('playwright')
const path = require('path')
const REPO = path.resolve(__dirname, '..')
const PUB = path.join(REPO, 'public', 'social')

const CHECKS = [
  { id: 'feed-08-building-tomorrow', must: ['Building', 'Starting', 'Today', 'Tomorrow'] },
  { id: 'feed-13-prosperity-policy', must: ['Economic Prosperity', '& Small Business', 'We support policies that encourage entrepreneurship'] },
  { id: 'feed-14-safe-neighborhoods', must: ['Safe neighborhoods give children room to', 'dream', 'families peace of mind'] },
  { id: 'feed-19-every-dollar-here', must: ['Every dollar raised here', 'stays here', 'Every candidate supported here', 'helps strengthen communities here'], mustNot: ['Kept here', 'Every volunteer recruited here'] },
  { id: 'feed-20-more-than-promises', must: ['Northwest Oregon deserves', 'more than campaign promises', 'STRONGER ORGS', 'MORE CANDIDATES', 'ENGAGED CITIZENS', 'A VOICE, RESTORED'] },
  { id: 'feed-22-powered-by-innovation', must: ['powered by innovation', 'Hydropower', 'Forestry', 'Agriculture', 'Manufacturing', 'Emerging tech'] },
  { id: 'feed-24-foundation', must: ['building the foundation for', "Northwest Oregon's future", 'Recruit', 'Strengthen', 'Provide', 'Support', 'Leaders', 'Campaigns', 'Messaging', 'Success'], mustNot: ['Organize', 'Volunteers'] },
  { id: 'feed-26-mark-norman', must: ['Mark', 'Norman', 'Oregon House', 'District 27', 'marknormanfororegon.com'], mustNot: ['MarkNormanForOregon.com'] },
  { id: 'feed-31-run-for-office', must: ['Northwest Oregon needs good leaders', 'Run for office', 'Teacher', 'Veteran', 'Business owner', 'Healthcare', 'Farmer', 'Volunteer', "Let's talk"] },
  { id: 'feed-32-volunteer', must: ['Support Northwest', "Oregon's Future", 'Join us and be part of the movement and donate for', "Oregon's future"], mustNot: ['Volunteer with', 'Volunteer Roster'] },
  { id: 'feed-36-not-one-candidate', must: ['Strong Communities Begin with', 'Strong Leadership'], mostNot: ['isn\'t changing because of', 'one candidate'] },
  { id: 'feed-38-contact', must: ['Have a question', 'Reach the PAC directly', 'info@northwestoregon.com', 'Cynthia Sawyer', '503-490-4139', 'Beaverton-Hillsdale Highway'] },
  { id: 'feed-39-why-we-are-here', must: ['Why We', 'Are Here', 'Northwest Oregon should never', 'lose its voice', 'others decided the region was too difficult to compete for'] },
  { id: 'feed-42-support-makes-possible', must: ['What does your support make', 'possible', 'Candidate', 'recruitment', 'Campaign', 'support', 'Fundraising', 'Strategic', 'messaging', 'Leadership', 'development'], mustNot: ['1 part', 'Volunteer organization', 'Community outreach', 'Voter engagement'] },
  { id: 'feed-43-not-boardrooms', must: ['Strong Campaigns Are Built With', 'Strong Support', 'Resources', 'Strategy', 'Communications', 'community support', 'Northwest Oregon PAC helps qualified candidates', 'build campaigns that can compete'], mustNot: ['boardrooms', 'On doorsteps', 'At community events', 'conversations between neighbors', 'Volunteers are the heart'] },
  { id: 'feed-57-support-list', must: ["Here's what your support makes", 'possible', 'Ship to Northwest Oregon', 'Handle with care', 'Sealed', 'Campaign literature', 'Community events', 'Volunteer training', 'Voter outreach', 'Candidate support'] },
]

;(async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  const results = []
  for (const c of CHECKS) {
    const file = `feed/${c.id}.html`
    await page.goto('file:///' + path.posix.join(PUB.replace(/\\/g, '/'), file), { waitUntil: 'load' })
    await page.waitForTimeout(50)
    const text = await page.locator('.canvas').textContent()
    const missing = (c.must || []).filter(s => !text.includes(s))
    const present = (c.mustNot || c.mostNot || []).filter(s => text.includes(s))
    results.push({ id: c.id, ok: missing.length === 0 && present.length === 0, missing, unexpected: present })
  }
  await browser.close()
  const fail = results.filter(r => !r.ok)
  console.log(`OK: ${results.length - fail.length}/${results.length}`)
  if (fail.length) console.log(JSON.stringify(fail, null, 2))
  else console.log('All PDF text checks passed on public/social HTML.')
})()
