// GoHighLevel Blog CMS reader — the site's blog listing and detail pages
// consume this. Every blog post that appears on the live site is fetched
// directly from GHL using the location's Private Integration Token.
//
// Endpoints (v2, dated 2021-07-28):
//   GET /blogs/site/all?locationId=&limit=25&skip=0
//     → { data: [{ _id, name }] }
//   GET /blogs/posts/all?locationId=&blogId=&limit=50&offset=0&status=PUBLISHED
//     → { blogs: [{ _id, title, description, urlSlug,
//                   categories:[{_id,label}], imageUrl, imageAltText,
//                   publishedAt, updatedAt, updatedBy, status }], count }
//   GET /blogs/posts/:postId?locationId=
//     → { blogPost: { rawHTML, author, categories:[categoryId],
//                     readTimeInMinutes, canonicalLink, ... } }
//   GET /blogs/authors?locationId=      → { authors:    [{ _id, name, description }] }
//   GET /blogs/categories?locationId=   → { categories: [{ _id, label, urlSlug }] }

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_VERSION = '2021-07-28'
const REVALIDATE_SECONDS = 60
const BLOG_CACHE_TAG = 'ghl-blogs'

const token = () => process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY || ''
const locationId = () => process.env.GHL_LOCATION_ID || ''

async function ghlGet(path) {
  try {
    const res = await fetch(`${GHL_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
        Version: GHL_VERSION,
        Accept: 'application/json',
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: [BLOG_CACHE_TAG] },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function listSites() {
  const loc = locationId()
  if (!loc) return []
  const data = await ghlGet(`/blogs/site/all?locationId=${loc}&limit=25&skip=0`)
  return Array.isArray(data?.data) ? data.data : []
}

async function listPublishedPostSummaries(blogId) {
  const loc = locationId()
  const data = await ghlGet(
    `/blogs/posts/all?locationId=${loc}&blogId=${blogId}&limit=50&offset=0&status=PUBLISHED`,
  )
  return Array.isArray(data?.blogs) ? data.blogs : []
}

async function fetchPostDetail(postId) {
  const loc = locationId()
  const data = await ghlGet(`/blogs/posts/${postId}?locationId=${loc}`)
  return data?.blogPost || null
}

async function listAuthors() {
  const loc = locationId()
  if (!loc) return new Map()
  const data = await ghlGet(`/blogs/authors?locationId=${loc}&limit=50&offset=0`)
  const arr = Array.isArray(data?.authors) ? data.authors : []
  return new Map(arr.map((a) => [a._id, a]))
}

async function listCategories() {
  const loc = locationId()
  if (!loc) return new Map()
  const data = await ghlGet(`/blogs/categories?locationId=${loc}&limit=50&offset=0`)
  const arr = Array.isArray(data?.categories) ? data.categories : []
  return new Map(arr.map((c) => [c._id, c]))
}

// ---------- HTML → block converter ----------
// GHL stores article body as an HTML string. Our renderer wants an ordered
// list of block objects (heading | paragraph | image | quote) so headings
// can drive the sticky TOC and each block gets its own motion variant.

const ENTITIES = {
  '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
  '&#39;': "'", '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”',
  '&mdash;': '—', '&ndash;': '–', '&hellip;': '…',
}
const decodeEntities = (s) => s.replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e)
const stripTags = (s) =>
  decodeEntities(String(s || '').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? m[1] : ''
}

function htmlToBlocks(html) {
  if (!html || typeof html !== 'string') return []
  const tagRe =
    /<(h2|h3|p|blockquote|figure|ul|ol)(\s[^>]*)?>([\s\S]*?)<\/\1>|<img(\s[^>]*)?\/?\s*>/gi
  const blocks = []
  let m
  while ((m = tagRe.exec(html)) !== null) {
    const openTag = m[0]
    const tagName = (m[1] || 'img').toLowerCase()
    const inner = m[3] ?? ''

    if (tagName === 'h2' || tagName === 'h3') {
      const text = stripTags(inner)
      if (!text) continue
      const id = attr(openTag, 'data-toc-id') || attr(openTag, 'id') || slugify(text)
      blocks.push({ type: 'heading', level: tagName === 'h2' ? 2 : 3, id, text })
    } else if (tagName === 'p') {
      const text = stripTags(inner)
      if (text) blocks.push({ type: 'paragraph', text })
    } else if (tagName === 'blockquote') {
      // GHL wraps quote body in <p> and often ends with an attribution line
      // prefixed by an em dash. Split that off as the citation.
      const paragraphs = [...inner.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((x) =>
        stripTags(x[1]),
      )
      if (paragraphs.length === 0) {
        const text = stripTags(inner)
        if (text) blocks.push({ type: 'quote', text })
        continue
      }
      let cite
      let text = paragraphs.join(' ')
      const last = paragraphs[paragraphs.length - 1]
      if (last && /^[—–-]/.test(last)) {
        cite = last.replace(/^[—–-]\s*/, '').trim()
        text = paragraphs.slice(0, -1).join(' ')
      }
      if (text || cite) blocks.push({ type: 'quote', text: text || cite, cite })
    } else if (tagName === 'img') {
      const src = attr(openTag, 'src')
      if (src) blocks.push({ type: 'image', src, alt: attr(openTag, 'alt') })
    } else if (tagName === 'figure') {
      const imgMatch = inner.match(/<img\s[^>]*>/i)
      const capMatch = inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)
      if (imgMatch) {
        const src = attr(imgMatch[0], 'src')
        if (src) {
          blocks.push({
            type: 'image',
            src,
            alt: attr(imgMatch[0], 'alt'),
            caption: capMatch ? stripTags(capMatch[1]) : undefined,
          })
        }
      }
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      for (const li of items) {
        const text = stripTags(li[1])
        if (text) blocks.push({ type: 'paragraph', text: `• ${text}` })
      }
    }
  }
  return blocks
}

// ---------- Post normalizer ----------

const isoDate = (v) => {
  if (!v) return null
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10)
}

const readingMinutesFrom = (raw, blocks) => {
  const declared = Number(raw.readTimeInMinutes)
  if (declared > 0) return Math.max(1, Math.round(declared))
  const words = blocks
    .filter((b) => b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote')
    .map((b) => b.text)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const resolveAuthor = (raw, authors) => {
  const rec = raw.author ? authors.get(raw.author) : null
  if (rec?.name) {
    const role = (rec.description || '').split(/[,.]/)[0].trim()
    return { author: rec.name, authorRole: role || 'Editorial team' }
  }
  return { author: raw.updatedBy || 'Northwest Oregon PAC', authorRole: 'Editorial team' }
}

const resolveCategory = (raw, categoriesMap) => {
  const first = raw.categories?.[0]
  if (first && typeof first === 'object' && first.label) return first.label
  if (typeof first === 'string') return categoriesMap.get(first)?.label || 'Field notes'
  return 'Field notes'
}

function buildPost(summary, detail, { authors, categoriesMap }) {
  // Base on detail (for rawHTML, author, readTimeInMinutes), then let summary
  // override with its expanded category objects and name-only updatedBy.
  const raw = { ...(detail || {}), ...(summary || {}) }

  const body = htmlToBlocks(raw.rawHTML || '')
  const title = raw.title || ''
  const excerpt = stripTags(raw.description || '')
  const { author, authorRole } = resolveAuthor(raw, authors)

  return {
    slug: raw.urlSlug || raw._id,
    title,
    excerpt,
    category: resolveCategory(raw, categoriesMap),
    author,
    authorRole,
    date: isoDate(raw.publishedAt) || isoDate(raw.updatedAt) || isoDate(raw.createdAt),
    readingMinutes: readingMinutesFrom(raw, body),
    heroImage: raw.imageUrl || null,
    heroAlt: raw.imageAltText || title,
    body,
    seoTitle: title,
    seoDescription: excerpt,
  }
}

// ---------- Public API ----------

export async function fetchGHLBlogs() {
  const [sites, authors, categoriesMap] = await Promise.all([
    listSites(),
    listAuthors(),
    listCategories(),
  ])
  if (sites.length === 0) return []

  const summaryLists = await Promise.all(
    sites.map((s) => listPublishedPostSummaries(s._id)).filter(Boolean),
  )
  const summaries = summaryLists.flat()
  if (summaries.length === 0) return []

  const details = await Promise.all(summaries.map((s) => fetchPostDetail(s._id)))

  return summaries
    .map((s, i) => buildPost(s, details[i], { authors, categoriesMap }))
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
}
