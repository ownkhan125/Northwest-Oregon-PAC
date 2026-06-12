// Social media creative library — auto-curated from the campaign-social pack.
// Each post points to a self-contained HTML file in /public/social-media/posts/
// and a PNG preview in /public/social-media/previews/.

export const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'launch', label: 'Launch & Brand' },
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'stats', label: 'By the Numbers' },
  { id: 'quotes', label: 'Quotes' },
  { id: 'events', label: 'Events' },
  { id: 'issues', label: 'Issues' },
  { id: 'endorsements', label: 'Endorsements' },
  { id: 'movement', label: 'On the Trail' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'donate', label: 'Donate' },
]

export const FORMATS = [
  { id: 'all', label: 'All formats' },
  { id: 'feed', label: 'Instagram feed · 1:1' },
  { id: 'story', label: 'Instagram story · 9:16' },
]

export const socialPosts = [
  // ───────────────────── Feed (1080×1080)
  {
    slug: 'feed-editorial-cover',
    file: 'feed-01-editorial-cover.html',
    preview: 'feed-01-editorial-cover.png',
    index: '01',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Editorial Cover',
    subtitle: 'Launch announcement',
    description:
      'The launch hero — a magazine-style cover introducing Morgan Hale to the 14th District with a soft horizon, fine grid, and serif lockup.',
    category: 'launch',
    tags: ['launch', 'cover', 'brand'],
    keywords: ['editorial', 'cover', 'launch', 'announcement', 'brand', 'magazine'],
  },
  {
    slug: 'feed-manifesto',
    file: 'feed-02-manifesto.html',
    preview: 'feed-02-manifesto.png',
    index: '02',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Manifesto',
    subtitle: 'A new chapter',
    description:
      'A typography-led manifesto built on Fraunces italics — a single statement of intent that sets the tone for the campaign.',
    category: 'manifesto',
    tags: ['manifesto', 'message'],
    keywords: ['manifesto', 'message', 'values', 'statement'],
  },
  {
    slug: 'feed-stats',
    file: 'feed-03-stats.html',
    preview: 'feed-03-stats.png',
    index: '03',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'By the Numbers',
    subtitle: 'Campaign in figures',
    description:
      'Editorial dashboard of the campaign — counters, ledger lines, and a quiet hierarchy that makes the numbers do the work.',
    category: 'stats',
    tags: ['stats', 'data', 'numbers'],
    keywords: ['stats', 'numbers', 'data', 'figures', 'milestones'],
  },
  {
    slug: 'feed-pullquote',
    file: 'feed-04-pullquote.html',
    preview: 'feed-04-pullquote.png',
    index: '04',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Pull Quote',
    subtitle: 'Press lift',
    description:
      'A press pull-quote framed like a newspaper clipping — generous serif, attribution rule, and quiet metadata.',
    category: 'quotes',
    tags: ['quote', 'press'],
    keywords: ['quote', 'press', 'pullquote', 'media'],
  },
  {
    slug: 'feed-save-the-date',
    file: 'feed-05-save-the-date.html',
    preview: 'feed-05-save-the-date.png',
    index: '05',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Save the Date',
    subtitle: 'Town hall invite',
    description:
      'A ticket-style invitation built around a single date — typography forward, with venue and dial-tone details.',
    category: 'events',
    tags: ['event', 'invite'],
    keywords: ['event', 'invite', 'rsvp', 'town hall', 'save the date'],
  },
  {
    slug: 'feed-priorities-grid',
    file: 'feed-06-priorities-grid.html',
    preview: 'feed-06-priorities-grid.png',
    index: '06',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Priorities Grid',
    subtitle: 'The four pillars',
    description:
      'A four-up grid of campaign priorities — each cell a glass card with an icon, a verb, and a single supporting line.',
    category: 'issues',
    tags: ['priorities', 'issues', 'policy'],
    keywords: ['priorities', 'issues', 'policy', 'pillars'],
  },
  {
    slug: 'feed-endorsement',
    file: 'feed-07-endorsement.html',
    preview: 'feed-07-endorsement.png',
    index: '07',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Endorsement',
    subtitle: 'Voices behind Morgan',
    description:
      'An endorsement card with portrait, role chip, and a quote treated as the headline. Built for amplification.',
    category: 'endorsements',
    tags: ['endorsement', 'press'],
    keywords: ['endorsement', 'support', 'press', 'quote'],
  },
  {
    slug: 'feed-rosette',
    file: 'feed-08-rosette.html',
    preview: 'feed-08-rosette.png',
    index: '08',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Rosette',
    subtitle: 'Campaign mark',
    description:
      'A spinning rosette badge — the campaign mark rendered as a poster, with a single statement orbiting the seal.',
    category: 'launch',
    tags: ['brand', 'badge', 'mark'],
    keywords: ['rosette', 'badge', 'brand', 'seal', 'mark'],
  },
  {
    slug: 'feed-movement',
    file: 'feed-09-movement.html',
    preview: 'feed-09-movement.png',
    index: '09',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'A Movement',
    subtitle: 'Grassroots energy',
    description:
      'A wide-angle movement post — supporter counts, district lines, and a hand-drawn arc tying it all together.',
    category: 'movement',
    tags: ['movement', 'grassroots'],
    keywords: ['movement', 'grassroots', 'supporters', 'community'],
  },
  {
    slug: 'feed-donate',
    file: 'feed-10-donate.html',
    preview: 'feed-10-donate.png',
    index: '10',
    format: 'feed',
    width: 1080,
    height: 1080,
    aspectRatio: '1 / 1',
    title: 'Donate',
    subtitle: 'Fund the fight',
    description:
      'A direct-ask fundraising card with tiered amounts and a single, glowing call-to-action.',
    category: 'donate',
    tags: ['donate', 'fundraising'],
    keywords: ['donate', 'fundraise', 'contribute', 'give'],
  },

  // ───────────────────── Story (1080×1920)
  {
    slug: 'story-hero',
    file: 'story-01-hero.html',
    preview: 'story-01-hero.png',
    index: '01',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Hero',
    subtitle: 'Vertical launch panel',
    description:
      'The flagship vertical hero — full-bleed headline, soft horizon, and a CTA that floats above the fold.',
    category: 'launch',
    tags: ['launch', 'hero'],
    keywords: ['hero', 'launch', 'announcement', 'brand'],
  },
  {
    slug: 'story-quote',
    file: 'story-02-quote.html',
    preview: 'story-02-quote.png',
    index: '02',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Quote',
    subtitle: 'Standalone statement',
    description:
      'A vertical pull-quote panel — single line of Fraunces over a quiet ground, with a soft attribution rule.',
    category: 'quotes',
    tags: ['quote'],
    keywords: ['quote', 'statement', 'voice'],
  },
  {
    slug: 'story-stats',
    file: 'story-03-stats.html',
    preview: 'story-03-stats.png',
    index: '03',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Stats',
    subtitle: 'Numbers at a glance',
    description:
      'A vertical stats column — three counters, three captions, ledger rules between. Built for thumb-stopping clarity.',
    category: 'stats',
    tags: ['stats', 'data'],
    keywords: ['stats', 'numbers', 'data', 'figures'],
  },
  {
    slug: 'story-event',
    file: 'story-04-event.html',
    preview: 'story-04-event.png',
    index: '04',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Event',
    subtitle: 'Town hall details',
    description:
      'A full event card with date, venue, agenda, and an RSVP CTA. Designed to read at arm’s length.',
    category: 'events',
    tags: ['event'],
    keywords: ['event', 'town hall', 'rsvp', 'invite'],
  },
  {
    slug: 'story-manifesto',
    file: 'story-05-manifesto.html',
    preview: 'story-05-manifesto.png',
    index: '05',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Manifesto',
    subtitle: 'Vertical mission read',
    description:
      'The campaign’s mission rendered as a poem — set ragged, paced for swipe, ending on a single mint line.',
    category: 'manifesto',
    tags: ['manifesto', 'message'],
    keywords: ['manifesto', 'mission', 'message', 'values'],
  },
  {
    slug: 'story-volunteer',
    file: 'story-06-volunteer.html',
    preview: 'story-06-volunteer.png',
    index: '06',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Volunteer',
    subtitle: 'Sign up to organize',
    description:
      'A volunteer recruit panel — checklist of ways to plug in, signup CTA, and a friendly invitation to act today.',
    category: 'volunteer',
    tags: ['volunteer', 'organize'],
    keywords: ['volunteer', 'organize', 'signup', 'join'],
  },
  {
    slug: 'story-issue',
    file: 'story-07-issue.html',
    preview: 'story-07-issue.png',
    index: '07',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Issue Brief',
    subtitle: 'A single policy plank',
    description:
      'A deep-dive on one policy issue — context, position, and a clear next step. Designed for the swipe-up era.',
    category: 'issues',
    tags: ['issues', 'policy'],
    keywords: ['issue', 'policy', 'plank', 'position'],
  },
  {
    slug: 'story-endorsement',
    file: 'story-08-endorsement.html',
    preview: 'story-08-endorsement.png',
    index: '08',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Endorsement',
    subtitle: 'Featured supporter',
    description:
      'A vertical endorsement — portrait at the top, quote in the middle, role and seal at the foot.',
    category: 'endorsements',
    tags: ['endorsement'],
    keywords: ['endorsement', 'support', 'press', 'quote'],
  },
  {
    slug: 'story-trail',
    file: 'story-09-trail.html',
    preview: 'story-09-trail.png',
    index: '09',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'On the Trail',
    subtitle: 'Field dispatch',
    description:
      'A field-report style update from the trail — date stamp, location chip, and a candid moment from the road.',
    category: 'movement',
    tags: ['trail', 'dispatch'],
    keywords: ['trail', 'dispatch', 'field', 'road', 'movement'],
  },
  {
    slug: 'story-donate',
    file: 'story-10-donate.html',
    preview: 'story-10-donate.png',
    index: '10',
    format: 'story',
    width: 1080,
    height: 1920,
    aspectRatio: '9 / 16',
    title: 'Donate',
    subtitle: 'Vertical fundraising ask',
    description:
      'A vertical donation ask — tiered amounts, deadline ticker, and a single mint CTA pinned to the bottom.',
    category: 'donate',
    tags: ['donate', 'fundraising'],
    keywords: ['donate', 'fundraise', 'contribute', 'give'],
  },
]

export function getPostBySlug(slug) {
  return socialPosts.find((p) => p.slug === slug) || null
}

export function getPostNeighbors(slug) {
  const i = socialPosts.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  const prev = i > 0 ? socialPosts[i - 1] : socialPosts[socialPosts.length - 1]
  const next = i < socialPosts.length - 1 ? socialPosts[i + 1] : socialPosts[0]
  return { prev, next }
}

export function getRelatedPosts(slug, limit = 3) {
  const post = getPostBySlug(slug)
  if (!post) return []
  return socialPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, limit)
}

export function getCategoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label || id
}
