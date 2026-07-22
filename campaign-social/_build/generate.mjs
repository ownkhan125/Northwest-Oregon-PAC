// Northwest Oregon PAC — social library generator.
// Renders every creative (60 feed · 30 stories · 10 carousels) from the
// content plan, rebuilds the local gallery, mirrors the library into
// public/social for the app, and emits src/data/social-posts.js.
//
//   node campaign-social/_build/generate.mjs

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { feed, stories, carousels, DOMAIN, FILING, PAID_FOR, feedCaptions } from './content.mjs'
import { render, TEMPLATE_META, esc } from './templates.mjs'
import { pac } from '../../src/data/pac.js'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..') // campaign-social/
const REPO = path.resolve(ROOT, '..')

const FONTS = `
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Source+Sans+3:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />`

function buildDoc(post, { format, prefix, docTitle }) {
  // Per-post `meta` (set inline in content.mjs) overrides template-level meta.
  const meta = { ...(TEMPLATE_META[post.template] || {}), ...(post.meta || {}) }
  const surface = meta.forceSurface || post.surface || 's-light'
  const dark = surface === 's-forest' || surface === 's-ink' || meta.onPhoto
  const ctx = { format, prefix, dark }
  const body = render(post.template, post.data, ctx)
  const onPhoto = meta.onPhoto || ctx.onPhoto
  const logo = `${prefix}nwop-logo-${dark ? 'light' : 'dark'}.png`

  const chrome = meta.hideChrome
    ? ''
    : `
  <header class="mast">
    ${meta.hideBrand ? '<span></span>' : `<div class="brand"><img src="${logo}" alt="${esc(pac.name)}" /></div>`}
    ${meta.hideFiling ? '' : `<div class="filing">${esc(FILING)}</div>`}
  </header>
  <footer class="rail">
    <span>${esc(PAID_FOR)}</span>
    <span class="rule"></span>
    <span class="domain">${DOMAIN}</span>
  </footer>`

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1080" />
<title>${esc(docTitle)}</title>
${FONTS}
<link rel="stylesheet" href="${prefix}social.css" />
<link rel="stylesheet" href="${prefix}templates.css" />
<link rel="stylesheet" href="${prefix}carousels.css" />
</head>
<body>
  <div class="canvas ${format === 'story' ? 'story' : ''} ${surface}${onPhoto ? ' on-photo' : ''}">
    ${body}
    ${chrome}
    <div class="grain"></div>
  </div>
</body>
</html>
`
}

const captionFor = (post) => {
  const d = post.data
  const raw =
    feedCaptions[post.id] ||
    d.sub ||
    d.text ||
    (d.block && d.block.body) ||
    (d.p && d.p.position) ||
    (d.v && d.v.body) ||
    (d.c && d.c.bio) ||
    d.heading ||
    ''
  return raw.length > 150 ? `${raw.slice(0, 147).trimEnd()}…` : raw
}

/* ------------------------------------------------------------ write */

const write = (rel, content) => {
  const abs = path.join(ROOT, rel)
  fs.mkdirSync(path.dirname(abs), { recursive: true })
  fs.writeFileSync(abs, content)
}

let count = 0

// Feed
for (const post of feed) {
  const n = feed.indexOf(post) + 1
  write(
    `feed/${post.id}.html`,
    buildDoc(post, {
      format: 'feed',
      prefix: '../assets/',
      docTitle: `Feed ${String(n).padStart(2, '0')} · ${post.title} — ${pac.name}`,
    }),
  )
  count++
}

// Stories
for (const post of stories) {
  const n = stories.indexOf(post) + 1
  write(
    `stories/${post.id}.html`,
    buildDoc(post, {
      format: 'story',
      prefix: '../assets/',
      docTitle: `Story ${String(n).padStart(2, '0')} · ${post.title} — ${pac.name}`,
    }),
  )
  count++
}

// Carousels
for (const set of carousels) {
  set.slides.forEach((slidePost, i) => {
    write(
      `carousels/${set.id}/slide-${i + 1}.html`,
      buildDoc(slidePost, {
        format: 'feed',
        prefix: '../../assets/',
        slide: i + 1,
        slideCount: set.slides.length,
        docTitle: `${set.title} · ${i + 1}/${set.slides.length} — ${pac.name}`,
      }),
    )
    count++
  })
}

/* ------------------------------------------------------- gallery */

const galleryData = {
  feed: feed.map((p, i) => ({ n: i + 1, id: p.id, tag: p.tag, title: p.title, href: `feed/${p.id}.html` })),
  stories: stories.map((p, i) => ({ n: i + 1, id: p.id, tag: p.tag, title: p.title, href: `stories/${p.id}.html` })),
  carousels: carousels.map((c, i) => ({
    n: i + 1,
    id: c.id,
    tag: c.tag,
    title: c.title,
    count: c.slides.length,
    slides: c.slides.map((_, s) => `carousels/${c.id}/slide-${s + 1}.html`),
  })),
}

const gallery = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(pac.name)} — Social Library</title>
${FONTS}
<style>
  :root {
    --sand:#e0d6bc; --cream:#f6f2e8; --sage:#5a7060; --forest:#2e4538; --brown:#6b5a42; --ink:#2a2a26;
    --line: rgba(107,90,66,.22);
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  body {
    background:
      radial-gradient(1100px 700px at 85% -10%, rgba(90,112,96,.14), transparent 60%),
      radial-gradient(900px 700px at -10% 110%, rgba(107,90,66,.12), transparent 60%),
      var(--cream);
    color: var(--ink);
    font-family:'Source Sans 3', system-ui, sans-serif;
    min-height:100vh;
    padding: 72px clamp(20px, 5vw, 72px) 120px;
    -webkit-font-smoothing: antialiased;
  }
  .grain-bg { position:fixed; inset:0; pointer-events:none; opacity:.05; mix-blend-mode:multiply; z-index:0;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.16  0 0 0 0 0.15  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>"); }
  .wrap { position:relative; z-index:1; max-width:1480px; margin:0 auto; }
  header.page { display:flex; flex-wrap:wrap; align-items:flex-end; justify-content:space-between; gap:28px; margin-bottom:22px; }
  .eyebrow { display:inline-flex; align-items:center; gap:12px; font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.3em; text-transform:uppercase; color:#465d4e; margin-bottom:18px; }
  .eyebrow::before { content:''; width:36px; height:1px; background:#465d4e; opacity:.6; }
  h1 { font-family:'Lora', serif; font-weight:500; letter-spacing:-.02em; font-size: clamp(38px, 5vw, 64px); line-height:1.04; color:var(--forest); }
  h1 em { font-style:italic; font-weight:400; color:var(--sage); }
  .meta { font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.28em; text-transform:uppercase; color:rgba(42,42,38,.6); line-height:2.1; text-align:right; }
  nav.tabs { position:sticky; top:0; z-index:5; display:flex; flex-wrap:wrap; gap:10px; padding:18px 0; margin:26px 0 40px;
    background:linear-gradient(180deg, var(--cream) 78%, transparent); }
  nav.tabs a { font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.24em; text-transform:uppercase; text-decoration:none;
    color:var(--forest); border:1.5px solid rgba(46,69,56,.35); border-radius:999px; padding:11px 22px; transition:.25s; background:rgba(246,242,232,.7); }
  nav.tabs a:hover { background:var(--forest); color:var(--cream); }
  h2.sect { font-family:'Lora', serif; font-weight:500; font-size:30px; letter-spacing:-.01em; color:var(--forest); margin:64px 0 8px; scroll-margin-top:96px; }
  h2.sect em { font-style:italic; color:var(--sage); }
  .sect-line { display:flex; align-items:center; gap:18px; margin-bottom:28px; font-family:'JetBrains Mono', monospace; font-size:11px; letter-spacing:.26em; text-transform:uppercase; color:rgba(42,42,38,.55); }
  .sect-line::after { content:''; flex:1; height:1px; background:linear-gradient(90deg, rgba(46,69,56,.4), transparent); }
  .grid { display:grid; gap:26px; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); }
  .grid.story-grid { grid-template-columns:repeat(auto-fill, minmax(230px, 1fr)); }
  .card { position:relative; display:block; text-decoration:none; color:inherit; border-radius:22px; overflow:hidden;
    border:1.5px solid var(--line); background:#fffdf8; box-shadow:0 26px 60px -34px rgba(46,69,56,.4);
    transition: transform .45s cubic-bezier(.22,1,.36,1), box-shadow .45s, border-color .45s; }
  .card:hover { transform: translateY(-7px); border-color: rgba(46,69,56,.5); box-shadow:0 42px 80px -36px rgba(46,69,56,.5); }
  .thumb { position:relative; overflow:hidden; background:var(--sand); }
  .card.feed .thumb, .card.carousel .thumb { aspect-ratio:1/1; }
  .card.story .thumb { aspect-ratio:9/16; }
  .thumb iframe { position:absolute; top:0; left:0; width:1080px; height:1080px; border:0; transform-origin:top left; pointer-events:none; }
  .card.story .thumb iframe { height:1920px; }
  .meta-row { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:16px 20px; }
  .meta-row .t { font-family:'Lora', serif; font-style:italic; font-weight:500; font-size:17px; color:var(--forest); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .meta-row .n { font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:.26em; text-transform:uppercase; color:rgba(42,42,38,.55); flex:none; }
  .badge { position:absolute; top:14px; right:14px; z-index:2; font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:.2em;
    background:rgba(36,54,44,.82); color:var(--sand); border:1px solid rgba(224,214,188,.35); padding:7px 13px; border-radius:999px; backdrop-filter: blur(6px); }
  footer.legal { margin-top:110px; border-top:1.5px solid var(--line); padding-top:30px; text-align:center;
    font-size:13px; letter-spacing:.08em; color:rgba(42,42,38,.65); line-height:2; }
  footer.legal .mono { font-family:'JetBrains Mono', monospace; font-size:10px; letter-spacing:.28em; text-transform:uppercase; color:#465d4e; }
</style>
</head>
<body>
<div class="grain-bg"></div>
<div class="wrap">
  <header class="page">
    <div>
      <div class="eyebrow">${esc(pac.type)} · Committee #${esc(pac.pacId)} · ${esc(pac.foundedYear)}</div>
      <h1>The ${esc(pac.name)}<br /><em>social library.</em></h1>
    </div>
    <div class="meta">
      ${feed.length} feed posts · 1080 × 1080<br />
      ${stories.length} stories · 1080 × 1920<br />
      ${carousels.length} carousels · ${carousels.reduce((a, c) => a + c.slides.length, 0)} slides
    </div>
  </header>

  <nav class="tabs">
    <a href="#feed">Feed — ${feed.length}</a>
    <a href="#stories">Stories — ${stories.length}</a>
    <a href="#carousels">Carousels — ${carousels.length}</a>
  </nav>

  <h2 class="sect" id="feed">Instagram <em>feed</em></h2>
  <div class="sect-line">1080 × 1080 · tap any tile to open the artboard</div>
  <div class="grid" id="grid-feed"></div>

  <h2 class="sect" id="stories">Instagram <em>stories</em></h2>
  <div class="sect-line">1080 × 1920</div>
  <div class="grid story-grid" id="grid-stories"></div>

  <h2 class="sect" id="carousels">Instagram <em>carousels</em></h2>
  <div class="sect-line">1080 × 1080 · 5–7 slides each · open a cover, then use slide links</div>
  <div class="grid" id="grid-carousels"></div>

  <footer class="legal">
    <div class="mono">${esc(pac.tagline)}</div>
    <div style="margin-top:10px">${esc(pac.disclaimers.paidFor)} ${esc(pac.disclaimers.notAuthorized)}</div>
  </footer>
</div>

<script>
  const DATA = ${JSON.stringify(galleryData)};

  const card = (kind, href, title, n, badge) => \`
    <a class="card \${kind}" href="\${href}">
      \${badge ? \`<span class="badge">\${badge}</span>\` : ''}
      <div class="thumb"><iframe src="\${href}" scrolling="no" loading="lazy" tabindex="-1" aria-hidden="true"></iframe></div>
      <div class="meta-row"><span class="t">\${title}</span><span class="n">\${String(n).padStart(2, '0')}</span></div>
    </a>\`;

  document.getElementById('grid-feed').innerHTML =
    DATA.feed.map((p) => card('feed', p.href, p.title, p.n)).join('');
  document.getElementById('grid-stories').innerHTML =
    DATA.stories.map((p) => card('story', p.href, p.title, p.n)).join('');
  document.getElementById('grid-carousels').innerHTML =
    DATA.carousels.map((c) => card('carousel', c.slides[0], c.title, c.n, c.count + ' slides')).join('');

  function fit() {
    document.querySelectorAll('.thumb').forEach((frame) => {
      const iframe = frame.querySelector('iframe');
      if (!iframe) return;
      iframe.style.transform = 'scale(' + frame.clientWidth / 1080 + ')';
    });
  }
  requestAnimationFrame(fit);
  addEventListener('resize', fit);
</script>
</body>
</html>
`
write('index.html', gallery)

/* -------------------------------------------- app data + public copy */

// Cache-buster: every regeneration bumps this stamp, so the app cards
// re-fetch previews and HTML instead of showing browser-cached versions
// from an earlier build.
const V = Date.now().toString(36)

const appData = {
  feedPosts: feed.map((p, i) => ({
    id: p.id,
    n: i + 1,
    tag: p.tag,
    title: p.title,
    caption: captionFor(p),
    format: 'feed',
    size: '1080 × 1080',
    html: `/social/feed/${p.id}.html?v=${V}`,
    preview: `/social/previews/${p.id}.jpg?v=${V}`,
  })),
  storyPosts: stories.map((p, i) => ({
    id: p.id,
    n: i + 1,
    tag: p.tag,
    title: p.title,
    caption: captionFor(p),
    format: 'story',
    size: '1080 × 1920',
    html: `/social/stories/${p.id}.html?v=${V}`,
    preview: `/social/previews/${p.id}.jpg?v=${V}`,
  })),
  carouselPosts: carousels.map((c, i) => ({
    id: c.id,
    n: i + 1,
    tag: c.tag,
    title: c.title,
    caption: c.caption,
    format: 'carousel',
    size: '1080 × 1080',
    slideCount: c.slides.length,
    slides: c.slides.map((_, s) => `/social/carousels/${c.id}/slide-${s + 1}.html?v=${V}`),
    preview: `/social/previews/${c.id}.jpg?v=${V}`,
  })),
}

const dataFile = `// Northwest Oregon PAC — social post gallery content.
// GENERATED by campaign-social/_build/generate.mjs — do not edit by hand.
// Regenerate with: node campaign-social/_build/generate.mjs

export const feedPosts = ${JSON.stringify(appData.feedPosts, null, 2)}

export const storyPosts = ${JSON.stringify(appData.storyPosts, null, 2)}

export const carouselPosts = ${JSON.stringify(appData.carouselPosts, null, 2)}

export const socialTags = [
  'Introduction',
  'Values',
  'Issues',
  'Candidates',
  'Get involved',
  'Support',
  'Beliefs',
  'About',
]
`
fs.writeFileSync(path.join(REPO, 'src/data/social-posts.js'), dataFile)

// Mirror the library into public/social so the app can serve it.
// Preserve previews across regeneration, but prune any that no longer
// correspond to a current post id — otherwise the app gallery ends up
// serving stale artwork whenever a post is renamed.
const PUB = path.join(REPO, 'public/social')
const existingPreviews = path.join(PUB, 'previews')
const keepPreviews = fs.existsSync(existingPreviews)
if (keepPreviews) fs.cpSync(existingPreviews, path.join(REPO, '.social-previews-tmp'), { recursive: true })
fs.rmSync(PUB, { recursive: true, force: true })
for (const dir of ['assets', 'feed', 'stories', 'carousels']) {
  fs.cpSync(path.join(ROOT, dir), path.join(PUB, dir), { recursive: true })
}
if (keepPreviews) {
  fs.cpSync(path.join(REPO, '.social-previews-tmp'), existingPreviews, { recursive: true })
  fs.rmSync(path.join(REPO, '.social-previews-tmp'), { recursive: true, force: true })
}

// Prune orphaned preview jpgs (posts that were renamed or removed).
if (fs.existsSync(existingPreviews)) {
  const expected = new Set([
    ...feed.map((p) => `${p.id}.jpg`),
    ...stories.map((p) => `${p.id}.jpg`),
    ...carousels.map((c) => `${c.id}.jpg`),
  ])
  let pruned = 0
  for (const f of fs.readdirSync(existingPreviews)) {
    if (!f.endsWith('.jpg')) continue
    if (!expected.has(f)) {
      fs.rmSync(path.join(existingPreviews, f))
      pruned++
    }
  }
  if (pruned > 0) console.log(`  · pruned ${pruned} orphaned previews`)
}

console.log(`Generated ${count} creatives`)
console.log(`  feed:      ${feed.length}`)
console.log(`  stories:   ${stories.length}`)
console.log(`  carousels: ${carousels.length} (${carousels.reduce((a, c) => a + c.slides.length, 0)} slides)`)
console.log('  + campaign-social/index.html gallery')
console.log('  + src/data/social-posts.js')
console.log('  + public/social mirror')
console.log('')
console.log('Regenerate previews so the app gallery reflects the new artwork:')
console.log('  node campaign-social/_build/previews.js')
