// Template renderers for the Northwest Oregon PAC social library.
// Each renderer returns the canvas-inner HTML for one creative.
// Layout classes live in assets/templates.css; tokens in assets/social.css.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRIORITY_META, CANDIDATE_PHOTOS } from './content.mjs'

// Inline the civic icon set (fill="currentColor" SVGs). Masks proved
// unreliable across file:// contexts, so icons are embedded directly.
// Per-icon ids keep multi-icon pages collision-free.
const ICON_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../assets/icons')
const ICONS = {}
for (const file of fs.readdirSync(ICON_DIR)) {
  if (!file.endsWith('.svg')) continue
  const name = file.replace('.svg', '')
  ICONS[name] = fs
    .readFileSync(path.join(ICON_DIR, file), 'utf8')
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style>[\s\S]*?<\/style>/g, '')
    .replace(/\s*id="Layer_1"/g, '')
    .replace(/class="st0"/g, 'fill="none"')
    .replace(/class="st1"/g, `clip-path="url(#clip-${name})"`)
    .replace(/id="clippath"/g, `id="clip-${name}"`)
    .replace(/url\(#clippath\)/g, `url(#clip-${name})`)
    .trim()
}

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Wrap the last n words of a heading in <em> for the serif italic accent.
export const em = (text, n = 2) => {
  const words = esc(text).split(' ')
  if (words.length < 3) return `<em>${words.join(' ')}</em>`
  const take = Math.min(n, words.length - 1)
  const head = words.slice(0, words.length - take).join(' ')
  const tail = words.slice(words.length - take).join(' ')
  return `${head} <em>${tail}</em>`
}

// Scale long-form serif copy down as it grows.
const fsClass = (t = '') => {
  const len = t.length
  if (len >= 430) return 'fs-36'
  if (len >= 330) return 'fs-40'
  if (len >= 230) return 'fs-44'
  if (len >= 150) return 'fs-50'
  if (len >= 80) return 'fs-58'
  return 'fs-66'
}

const icon = (name, _ctx, size = 84) => {
  const svg = ICONS[name]
  if (!svg) throw new Error(`Unknown icon: ${name}`)
  return svg.replace('<svg', `<svg class="icn" style="width:${size}px;height:${size}px;display:block;flex:none"`)
}

const chipIcon = (name, ctx) => `<div class="chip-icon">${icon(name, ctx, 96)}</div>`

export const arrowSvg = `<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`

const pill = (text) => `<div class="pill"><span class="dot"></span>${esc(text)}</div>`
const eyebrow = (text) => `<div class="eyebrow"><span class="dash"></span>${esc(text)}</div>`

const siteLabel = (link) =>
  link
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')

/* ------------------------------------------------------------------ */

const cover = (d, ctx) => `
  <div class="backdrop ${d.blur ? 'blurred' : ''}"><img src="${ctx.prefix}img/${d.photo}" alt="" /><div class="wash deep"></div></div>
  <div class="zone t-cover">
    ${pill(d.eyebrow)}
    <h1 class="display ${d.heading.length > 42 ? 'md' : 'lg'}">${em(d.heading)}</h1>
    ${d.sub ? `<p class="lede">${esc(d.sub)}</p>` : ''}
  </div>`

const manifesto = (d, ctx) => `
  <div class="zone t-manifesto">
    ${eyebrow(d.eyebrow)}
    ${d.heading ? `<h1 class="display md">${em(d.heading)}</h1>` : ''}
    ${
      d.text
        ? d.heading
          ? `<p class="lede" style="font-size:36px;max-width:870px">${esc(d.text)}</p>`
          : `<p class="serif-body ${fsClass(d.text)}">${em(d.text, 3)}</p>`
        : ''
    }
  </div>`

const values3 = (d, ctx) => `
  <div class="zone t-values">
    <div class="head">
      ${eyebrow(d.eyebrow)}
      <h1 class="display ${ctx.format === 'story' ? 'md' : 'sm'}">${em(d.heading, 1)}</h1>
    </div>
    <div>
      ${d.values
        .map(
          (v) => `
      <div class="vrow ${v.label.length > 12 ? 'small' : ''}">
        <div class="vlabel">${esc(v.label)}</div>
        <div class="vdesc">${esc(v.description)}</div>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

const promise = (d) => `
  <div class="zone t-promise center">
    ${pill(d.eyebrow)}
    <p class="serif-body fs-66" style="max-width:850px">${em(d.text, 4)}</p>
    <div class="sig">
      <span class="line"></span>
      <span class="mono-sm">${esc(d.sign)}</span>
    </div>
  </div>`

const masthead = (d, ctx) => `
  <div class="ring" style="width:760px;height:760px;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
  <div class="ring" style="width:980px;height:980px;top:50%;left:50%;transform:translate(-50%,-50%);opacity:.5"></div>
  <div class="zone t-brand center">
    <div class="logo-lg"><img src="${ctx.prefix}nwop-logo-${ctx.dark ? 'light' : 'dark'}.png" alt="Northwest Oregon PAC" /></div>
    <p class="lede">${esc(d.tagline)}</p>
    <div class="sig" style="display:flex;flex-direction:column;align-items:center;gap:26px">
      <span style="width:120px;height:1.5px;background:rgba(107,90,66,.5)"></span>
      <span class="mono-sm">${esc(d.values)}</span>
    </div>
  </div>`

const ticker = (d) => {
  const words = d.words
  const line = (ws) => ws.map(esc).join('<span class="sep">·</span>')
  const all = line([...words, ...words])
  return `
  <div class="zone t-ticker" style="padding:0">
    <div class="eyebrow" style="justify-content:center">${esc(d.eyebrow)}<span class="dash"></span></div>
    <div style="margin-top:52px">
      <div class="band" style="margin-left:-60px">${all}</div>
      <div class="band"><em>${line(words.slice(5))}</em></div>
      <div class="band solid" style="padding-left:24px"><em>${line(words.slice(0, 5))}</em></div>
      <div class="band" style="margin-left:-320px">${all}</div>
      <div class="band" style="margin-left:-150px"><em>${all}</em></div>
    </div>
  </div>`
}

const pillar = (d, ctx) => {
  const p = d.p
  const meta = PRIORITY_META[p.id]
  return `
  <div class="ghost-num" style="right:36px;bottom:20px">${p.id}</div>
  <div class="zone t-pillar">
    <div class="top">
      ${chipIcon(meta.icon, ctx)}
      <div class="kicker">
        <span class="mono-sm">Priority</span>
        <span class="of">${p.id} <span style="opacity:.55">/ 05</span></span>
      </div>
    </div>
    <h1 class="display ${ctx.format === 'story' ? 'md' : 'sm'} name">${em(meta.short)}</h1>
    <p class="serif-body ${fsClass(p.position)} position"><em>${esc(p.position)}</em></p>
  </div>`
}

const quote = (d) => `
  <div class="zone t-quote">
    <div class="quote-glyph">“</div>
    <p class="serif-body ${fsClass(d.text)}">${esc(d.text)}</p>
    <div class="attr">
      <span class="line"></span>
      <span class="mono-sm">${esc(d.attr)}</span>
    </div>
    ${d.eyebrow ? `<div class="mono-sm" style="position:absolute;top:0;right:0;max-width:420px;text-align:right;line-height:1.9">${esc(d.eyebrow)}</div>` : ''}
  </div>`

const detail = (d, ctx) => `
  <div class="zone t-detail">
    <div class="panel">
      <div class="phead">
        ${chipIcon(d.icon, ctx)}
        <span class="mono-sm" style="text-align:right;max-width:520px;line-height:1.9">${esc(d.kicker)}</span>
      </div>
      <p class="serif-body ${fsClass(d.text)}">${esc(d.text)}</p>
      <div class="pfoot">
        <span class="mono-sm" style="color:var(--forest);font-weight:500">${esc(d.name)}</span>
        <span class="hairline"></span>
      </div>
    </div>
  </div>`

const list5 = (d, ctx) => `
  <div class="zone t-list">
    <div class="head">
      ${eyebrow(d.eyebrow)}
      <h1 class="display ${ctx.format === 'story' ? 'md' : 'sm'}">${em(d.heading)}</h1>
      ${ctx.format === 'story' && d.intro ? `<p class="lede intro">${esc(d.intro)}</p>` : ''}
    </div>
    <div>
      ${d.items
        .map(
          (item) => `
      <div class="row">
        <span class="num">${esc(item.id)}</span>
        <span class="label">${esc(PRIORITY_META[item.id].short)}</span>
        <span class="ricon">${icon(PRIORITY_META[item.id].icon, ctx, ctx.format === 'story' ? 64 : 54)}</span>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

const candidate = (d, ctx) => {
  const c = d.c
  const photo = CANDIDATE_PHOTOS[c.slug]
  return `
  <div class="zone t-candidate">
    <div class="info">
      ${pill('Candidates we support')}
      <h1 class="display ${c.name.length > 14 ? 'md' : 'lg'}">${em(c.name, 1)}</h1>
      <div class="office">${esc(c.office)}</div>
      <div class="hairline" style="width:180px"></div>
      <p class="bio">${esc(c.bio)}</p>
      <span class="site">${esc(c.link ? siteLabel(c.link) : c.cta)}</span>
    </div>
    <div class="stage">
      <div class="ring"></div>
      <div class="photo"><img src="${ctx.prefix}img/${photo}" alt="${esc(c.name)}" style="object-position:center top" /><div class="wash"></div></div>
      <div class="year">2026</div>
    </div>
  </div>`
}

const cta = (d) => `
  <div class="zone t-cta">
    ${eyebrow(d.eyebrow)}
    <h1 class="display ${d.heading.length > 46 ? 'md' : 'lg'}">${em(d.heading)}</h1>
    ${d.text ? `<p class="lede">${esc(d.text)}</p>` : ''}
    <div class="buttons">
      ${d.buttons
        .map((b, i) => `<span class="btn ${i > 0 ? 'ghost' : ''}">${esc(b)}${i === 0 ? arrowSvg : ''}</span>`)
        .join('')}
    </div>
  </div>`

const chips = (d) => {
  const big = d.chips.every((c) => String(c).startsWith('$'))
  return `
  <div class="zone t-chips">
    ${eyebrow(d.eyebrow)}
    <h1 class="serif-body ${fsClass(d.heading)}" style="max-width:860px">${em(d.heading)}</h1>
    <div class="chipset">
      ${d.chips.map((c) => `<span class="chip ${big ? 'big' : ''}">${esc(c)}</span>`).join('')}
    </div>
    <p class="note">${esc(d.note)}</p>
  </div>`
}

const facts = (d) => `
  <div class="zone t-facts">
    ${eyebrow(d.eyebrow)}
    <h1 class="display md">${em(d.heading)}</h1>
    <div class="kv">
      ${d.rows
        .map(
          (r) => `
      <div class="krow">
        <span class="k mono-sm">${esc(r.k)}</span>
        <span class="v">${esc(r.v)}</span>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

const team = (d) => `
  <div class="zone t-team">
    ${eyebrow(d.eyebrow)}
    <h1 class="display xs" style="margin-bottom:14px">${em(d.heading)}</h1>
    <div style="width:100%">
      ${d.members
        .map(
          (m) => `
      <div class="member">
        <span class="mname">${esc(m.name)}</span>
        <span class="mroles">${m.roles.map(esc).join('<br />')}</span>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

const stats = (d) => `
  <div class="zone t-stats">
    ${eyebrow(d.eyebrow)}
    <h1 class="display md">${em(d.heading)}</h1>
    <div class="statgrid">
      ${d.stats
        .map(
          (s) => `
      <div class="cell">
        <span class="n">${esc(s.n)}</span>
        <span class="mono-sm">${esc(s.l)}</span>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

const block = (d) => `
  <div class="ghost-num" style="right:44px;top:80px">${esc(d.n)}</div>
  <div class="zone t-block">
    ${eyebrow(`Our story · ${d.n} / 04`)}
    <h1 class="display lg">${em(d.block.title, 2)}</h1>
    <div class="hairline" style="width:200px"></div>
    <p class="body">${esc(d.block.body)}</p>
  </div>`

const value = (d) => `
  <div class="zone t-value">
    ${eyebrow(`Value ${d.n} / ${d.of}`)}
    <h1 class="word">${em(d.v.title, 1)}</h1>
    <div class="hairline" style="width:200px"></div>
    <p class="body">${esc(d.v.body)}</p>
  </div>`

/* ------------------------------------------------------------------ */

const RENDERERS = {
  cover,
  manifesto,
  values3,
  promise,
  masthead,
  ticker,
  pillar,
  quote,
  detail,
  list5,
  candidate,
  cta,
  chips,
  facts,
  team,
  stats,
  block,
  value,
}

// Templates that supply their own backdrop skip the line field + glows;
// covers drop the mast filing (the eyebrow pill carries it), and the
// brand card hides the mast logo to avoid doubling the wordmark.
export const TEMPLATE_META = {
  cover: { forceSurface: 's-ink', noLines: true, hideFiling: true },
  masthead: { hideBrand: true },
  ticker: { noGlow: true },
}

export function render(template, data, ctx) {
  const fn = RENDERERS[template]
  if (!fn) throw new Error(`Unknown template: ${template}`)
  return fn(data, ctx)
}
