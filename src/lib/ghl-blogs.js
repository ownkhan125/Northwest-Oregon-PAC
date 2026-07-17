// GoHighLevel Blog CMS reader — the site's blog listing and detail pages
// consume this. Every blog post that appears on the live site is fetched
// directly from GHL using the location's Private Integration Token.
//
// Endpoints in use (v2, dated 2021-07-28):
//   GET /blogs/site/all?locationId=&limit=25&skip=0
//     → { data: [{ _id, name }] }
//   GET /blogs/posts/all?locationId=&blogId=&limit=50&offset=0&status=PUBLISHED
//     → { blogs: [{ _id, title, description, urlSlug, categories:[{_id,label}],
//                   imageUrl, imageAltText, publishedAt, updatedAt, updatedBy,
//                   status, ... }], count }
//   GET /blogs/posts/:postId?locationId=
//     → { blogPost: { rawHTML, author, categories:[categoryId], wordCount,
//                     readTimeInMinutes, ... } }
//   GET /blogs/authors?locationId=      → { authors: [{ _id, name, description }] }
//   GET /blogs/categories?locationId=   → { categories: [{ _id, label, urlSlug }] }

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_VERSION = '2021-07-28'

const token = () => process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY || ''
const locationId = () => process.env.GHL_LOCATION_ID || ''

const authHeaders = () => ({
  Authorization: `Bearer ${token()}`,
  Version: GHL_VERSION,
  Accept: 'application/json',
})

const REVALIDATE_SECONDS = 60
const BLOG_CACHE_TAG = 'ghl-blogs'
const BLOG_CACHE_TAG_ONE = (slug) => `ghl-blog:${slug}`

async function ghlGet(path, { tag } = {}) {
  const url = `${GHL_BASE}${path}`
  try {
    const res = await fetch(url, {
      headers: authHeaders(),
      next: { revalidate: REVALIDATE_SECONDS, tags: tag ? [tag, BLOG_CACHE_TAG] : [BLOG_CACHE_TAG] },
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

const listSites = async () => {
  const loc = locationId()
  if (!loc) return []
  const data = await ghlGet(`/blogs/site/all?locationId=${loc}&limit=25&skip=0`)
  return Array.isArray(data?.data) ? data.data : []
}

const listPublishedPostSummaries = async (blogId) => {
  const loc = locationId()
  if (!loc || !blogId) return []
  const data = await ghlGet(
    `/blogs/posts/all?locationId=${loc}&blogId=${blogId}&limit=50&offset=0&status=PUBLISHED`,
  )
  return Array.isArray(data?.blogs) ? data.blogs : []
}

const fetchPostDetail = async (postId, slug) => {
  const loc = locationId()
  if (!loc || !postId) return null
  const data = await ghlGet(`/blogs/posts/${postId}?locationId=${loc}`, {
    tag: slug ? BLOG_CACHE_TAG_ONE(slug) : undefined,
  })
  return data?.blogPost || null
}

const listAuthors = async () => {
  const loc = locationId()
  if (!loc) return new Map()
  const data = await ghlGet(`/blogs/authors?locationId=${loc}&limit=50&offset=0`)
  const arr = Array.isArray(data?.authors) ? data.authors : []
  return new Map(arr.map((a) => [a._id, a]))
}

const listCategories = async () => {
  const loc = locationId()
  if (!loc) return new Map()
  const data = await ghlGet(`/blogs/categories?locationId=${loc}&limit=50&offset=0`)
  const arr = Array.isArray(data?.categories) ? data.categories : []
  return new Map(arr.map((c) => [c._id, c]))
}

// ---------- HTML → block converter ----------
// GHL's blog editor stores article body as an HTML string. Our page renderer
// wants an ordered list of block objects (heading | paragraph | image | quote)
// so headings can populate the sticky TOC and each block picks up its own
// motion variants. This parser handles the tags GHL emits: h2/h3/p/img/
// blockquote/ul/ol/figure. Anything unusual falls back to a paragraph so no
// content is silently lost.

const decodeEntities = (s = '') =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')

const stripTags = (s = '') => decodeEntities(s.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()

const slugify = (s = '') =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*"([^"]*)"`, 'i'))
  return m ? m[1] : ''
}

export function htmlToBlocks(html) {
  if (!html || typeof html !== 'string') return []
  const cleaned = html.replace(/\r\n/g, '\n').trim()
  const tagRe =
    /<(h2|h3|p|blockquote|figure|ul|ol)(\s[^>]*)?>([\s\S]*?)<\/\1>|<img(\s[^>]*)?\/?\s*>/gi
  const blocks = []
  let m
  while ((m = tagRe.exec(cleaned)) !== null) {
    const openTag = m[0]
    const tagName = (m[1] || 'img').toLowerCase()
    const inner = m[3] ?? ''
    if (tagName === 'h2' || tagName === 'h3') {
      const text = stripTags(inner)
      if (!text) continue
      const rawId = attr(openTag, 'data-toc-id') || attr(openTag, 'id') || slugify(text)
      blocks.push({ type: 'heading', level: tagName === 'h2' ? 2 : 3, id: rawId, text })
    } else if (tagName === 'p') {
      const text = stripTags(inner)
      if (!text) continue
      blocks.push({ type: 'paragraph', text })
    } else if (tagName === 'blockquote') {
      // Blockquotes in GHL wrap paragraph(s). The last <p> is often an
      // attribution line prefixed with an em dash — split it off if present.
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
      if (text || cite) blocks.push({ type: 'quote', text: text || cite || '', cite })
    } else if (tagName === 'img') {
      const src = attr(openTag, 'src')
      const alt = attr(openTag, 'alt')
      if (src) blocks.push({ type: 'image', src, alt })
    } else if (tagName === 'figure') {
      const imgMatch = inner.match(/<img\s[^>]*>/i)
      const capMatch = inner.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i)
      if (imgMatch) {
        const src = attr(imgMatch[0], 'src')
        const alt = attr(imgMatch[0], 'alt')
        const caption = capMatch ? stripTags(capMatch[1]) : undefined
        if (src) blocks.push({ type: 'image', src, alt, caption })
      }
    } else if (tagName === 'ul' || tagName === 'ol') {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      for (const li of items) {
        const text = stripTags(li[1])
        if (text) blocks.push({ type: 'paragraph', text: `• ${text}` })
      }
    }
  }
  // Also catch bare <img> tags that sit outside <figure>/<p>. The main regex
  // already handles them, but double-check nothing was lost.
  return blocks
}

// ---------- Post normalizer ----------

const normalizeDate = (v) => {
  if (!v) return null
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return null
  return d.toISOString().slice(0, 10)
}

const readingMinutesFrom = (raw, blocks) => {
  const declared = Number(raw?.readTimeInMinutes || raw?.readingMinutes)
  if (declared && Number.isFinite(declared)) return Math.max(1, Math.round(declared))
  const words = blocks
    .map((b) =>
      b.type === 'paragraph' || b.type === 'heading' || b.type === 'quote' ? b.text : '',
    )
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const resolveAuthor = (raw, authors) => {
  const authorId = typeof raw?.author === 'string' ? raw.author : raw?.author?._id
  const rec = authorId ? authors.get(authorId) : null
  if (rec?.name) {
    // Best effort at role: pull the first sentence up to a comma.
    const desc = (rec.description || '').split(/[,.]/)[0].trim()
    return { author: rec.name, authorRole: desc || 'Editorial team' }
  }
  const fallback = raw?.updatedBy || raw?.authorName || 'Northwest Oregon PAC'
  return { author: fallback, authorRole: 'Editorial team' }
}

const resolveCategory = (raw, categoriesMap) => {
  if (Array.isArray(raw?.categories) && raw.categories.length > 0) {
    const first = raw.categories[0]
    if (first && typeof first === 'object' && first.label) return first.label
    if (typeof first === 'string') {
      const rec = categoriesMap.get(first)
      if (rec?.label) return rec.label
    }
  }
  return raw?.category || 'Field notes'
}

function buildPost(summary, detail, { authors, categoriesMap }) {
  const raw = { ...(summary || {}), ...(detail || {}) }
  // `categories` on the detail response is a bare id array, but the list
  // response ships expanded objects with labels. Prefer the expanded shape.
  if (Array.isArray(summary?.categories) && summary.categories.some((c) => c && c.label)) {
    raw.categories = summary.categories
  }
  const rawHtml = raw.rawHTML || raw.html || raw.content || ''
  const body = htmlToBlocks(rawHtml)
  const title = raw.title || ''
  const slug = raw.urlSlug || raw.slug || slugify(title) || raw._id
  const excerpt = stripTags(raw.description || raw.excerpt || raw.metaDescription || '')
  const heroImage = raw.imageUrl || raw.image || raw.featuredImage || null
  const heroAlt = raw.imageAltText || raw.imageAlt || title
  const date =
    normalizeDate(raw.publishedAt) ||
    normalizeDate(raw.updatedAt) ||
    normalizeDate(raw.createdAt) ||
    normalizeDate(Date.now())
  const { author, authorRole } = resolveAuthor(raw, authors)
  const category = resolveCategory(raw, categoriesMap)

  return {
    slug,
    title,
    excerpt,
    category,
    author,
    authorRole,
    date,
    readingMinutes: readingMinutesFrom(raw, body),
    heroImage,
    heroAlt,
    body,
    seoTitle: raw.seoTitle || raw.metaTitle || title,
    seoDescription: raw.metaDescription || excerpt,
    canonical: raw.canonicalLink || null,
    source: 'ghl',
  }
}

// ---------- Public API ----------

async function fetchSummariesAcrossAllSites() {
  const sites = await listSites()
  if (sites.length === 0) return []
  const all = []
  for (const site of sites) {
    const blogId = site._id || site.id
    if (!blogId) continue
    const summaries = await listPublishedPostSummaries(blogId)
    for (const s of summaries) all.push(s)
  }
  return all
}

export async function fetchGHLBlogs() {
  const [summaries, authors, categoriesMap] = await Promise.all([
    fetchSummariesAcrossAllSites(),
    listAuthors(),
    listCategories(),
  ])
  if (summaries.length === 0) return []

  const details = await Promise.all(
    summaries.map((s) => fetchPostDetail(s._id, s.urlSlug)),
  )

  const posts = summaries
    .map((summary, i) => buildPost(summary, details[i], { authors, categoriesMap }))
    .filter(Boolean)

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
  return posts
}

export async function fetchGHLBlogBySlug(slug) {
  if (!slug) return null
  const posts = await fetchGHLBlogs()
  return posts.find((p) => p.slug === slug) || null
}

export { BLOG_CACHE_TAG, BLOG_CACHE_TAG_ONE }
