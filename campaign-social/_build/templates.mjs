// Northwest Oregon PAC — social template renderers v3.
// Editorial, cinematic layouts that carry PDF-verbatim text without
// truncation. Layout classes live in assets/templates.css; brand tokens
// in assets/social.css.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PRIORITY_META, CANDIDATE_PHOTOS } from './content.mjs'

// Inline civic icon set (fill="currentColor"). Masks proved unreliable
// across file:// contexts, so icons are embedded directly.
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

// Wrap the last n words in <em> for the italic serif accent.
export const em = (text, n = 2) => {
  const words = esc(text).split(' ')
  if (words.length < 3) return `<em>${words.join(' ')}</em>`
  const take = Math.min(n, words.length - 1)
  const head = words.slice(0, words.length - take).join(' ')
  const tail = words.slice(words.length - take).join(' ')
  return `${head} <em>${tail}</em>`
}

// Scale display heading down as it grows so it never overflows.
const headingSize = (text = '', big = false) => {
  const len = text.length
  if (big) {
    if (len > 100) return 'md'
    if (len > 60) return 'lg'
    if (len > 32) return 'xl'
    return 'xxl'
  }
  if (len > 120) return 'sm'
  if (len > 80) return 'md'
  if (len > 46) return 'lg'
  if (len > 24) return 'xl'
  return 'xxl'
}

// Scale long-form serif body copy so it fits the frame.
const bodySize = (text = '') => {
  const len = text.length
  if (len >= 520) return 'fs-30'
  if (len >= 400) return 'fs-34'
  if (len >= 300) return 'fs-38'
  if (len >= 220) return 'fs-44'
  if (len >= 140) return 'fs-50'
  if (len >= 80) return 'fs-58'
  return 'fs-66'
}

// Multi-paragraph copy multiplies the effective length so each gets its
// own paragraph break, then adds inter-paragraph gaps into the sizing
// budget. This shrinks aggressively when we have 3+ paragraphs.
const paragraphSize = (paragraphs = []) => {
  const total = paragraphs.reduce((a, p) => a + p.length, 0)
  const gap = Math.max(0, paragraphs.length - 1) * 120
  return bodySize('x'.repeat(total + gap))
}

const icon = (name, size = 84, extraStyle = '') => {
  const svg = ICONS[name]
  if (!svg) throw new Error(`Unknown icon: ${name}`)
  return svg.replace(
    '<svg',
    `<svg class="icn" style="width:${size}px;height:${size}px;display:block;flex:none;${extraStyle}"`,
  )
}

const kicker = (text, mods = '') => {
  if (!text) return ''
  const isLong = text.length > 40
  return `<div class="kicker ${mods} ${isLong ? 'long' : ''}">${esc(text)}</div>`
}

/* ==================================================================
   COVER — full-bleed photo with editorial title lockup.
================================================================== */
const cover = (d, ctx) => {
  ctx.onPhoto = true
  const size = headingSize(d.heading, true)
  return `
  <div class="backdrop ${d.blur ? 'blurred' : ''}">
    <img src="${ctx.prefix}img/${d.photo}" alt="" />
    <div class="wash ${d.blur ? 'deep' : ''}"></div>
    <div class="ribbon-hairline"></div>
  </div>
  <div class="t-cover">
    ${kicker(d.eyebrow)}
    <h1 class="display ${size}">${em(d.heading)}</h1>
    ${d.sub ? `<p class="lede">${esc(d.sub)}</p>` : ''}
    ${d.lines ? `<div class="cover-lines">${d.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</div>` : ''}
  </div>`
}

/* ==================================================================
   HEADLINE — the scroll-stopping poster. Bold serif over cinematic
   layered gradients, an accent stripe, and a bottom ribbon.
================================================================== */
const headline = (d, ctx) => {
  const primary = d.headingLine2 ? `${d.heading} ${d.headingLine2}` : d.heading || ''
  const size = headingSize(primary, true)
  return `
  <div class="glow sage" style="width:820px;height:820px;top:-260px;left:-140px;opacity:.55"></div>
  <div class="glow forest" style="width:720px;height:720px;bottom:-260px;right:-160px"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-headline">
    <div class="head-top">${kicker(d.eyebrow)}</div>
    <div class="head-mid">
      <h1 class="display ${size} lead">${em(d.heading, 1)}</h1>
      ${d.headingLine2 ? `<h1 class="display ${size} follow"><em>${esc(d.headingLine2)}</em></h1>` : ''}
    </div>
    ${d.sub ? `<p class="lede">${esc(d.sub)}</p>` : ''}
    ${d.lines ? `<div class="lines">${d.lines.map((l) => `<span>${esc(l)}</span>`).join('')}</div>` : ''}
  </div>`
}

/* ==================================================================
   LONGFORM — editorial column of paragraph text. Handles the PDF's
   multi-paragraph "Image text" without cutoff.
================================================================== */
const longform = (d, ctx) => {
  const paragraphs = d.paragraphs || (d.text ? [d.text] : [])
  // When there's also a heading + subhead, the vertical budget shrinks —
  // pretend the body copy is longer than it is so bodySize downgrades.
  const budgetPenalty = (d.heading ? 200 : 0) + (d.subhead ? 100 : 0)
  const total = paragraphs.reduce((a, p) => a + p.length, 0)
  const gap = Math.max(0, paragraphs.length - 1) * 120
  const bs = bodySize('x'.repeat(total + gap + budgetPenalty))
  return `
  <div class="glow sand" style="width:640px;height:640px;top:-160px;right:-140px;opacity:.45"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-longform">
    ${kicker(d.eyebrow)}
    ${d.heading ? `<h1 class="display ${headingSize(d.heading)}">${em(d.heading, 2)}</h1>` : ''}
    ${d.subhead ? `<p class="subhead">${esc(d.subhead)}</p>` : ''}
    <div class="body ${bs}">
      ${paragraphs.map((p, i) => `<p class="${i === 0 && !d.heading ? 'lead-p' : ''}">${esc(p)}</p>`).join('')}
    </div>
  </div>`
}

/* ==================================================================
   CHECKLIST — editorial list of check items or bullets.
================================================================== */
const checklist = (d) => {
  const bullet = d.bullet || '✓'
  const heading = d.heading || ''
  return `
  <div class="glow sage" style="width:660px;height:660px;top:-160px;left:-160px;opacity:.4"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-checklist">
    ${kicker(d.eyebrow)}
    ${heading ? `<h1 class="display ${headingSize(heading)}">${em(heading, 2)}</h1>` : ''}
    ${d.subhead ? `<p class="subhead">${esc(d.subhead)}</p>` : ''}
    <ul class="items">
      ${d.items.map((it) => `<li><span class="mark">${esc(bullet)}</span><span class="txt">${esc(it)}</span></li>`).join('')}
    </ul>
    ${d.footer ? `<div class="footer">${esc(d.footer)}</div>` : ''}
  </div>`
}

/* ==================================================================
   STACK — key/value editorial stack. Used for the "Every dollar
   raised here → helps build campaigns here" pattern.
================================================================== */
const stack = (d) => `
  <div class="glow forest" style="width:720px;height:720px;bottom:-200px;right:-160px"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-stack">
    ${kicker(d.eyebrow)}
    ${d.heading ? `<h1 class="display ${headingSize(d.heading)}">${em(d.heading, 2)}</h1>` : ''}
    <div class="rows">
      ${d.rows
        .map(
          (r) => `
      <div class="row">
        <span class="k">${esc(r.k)}</span>
        <span class="v">${esc(r.v)}</span>
      </div>`,
        )
        .join('')}
    </div>
    ${d.footer ? `<div class="footer">${esc(d.footer)}</div>` : ''}
  </div>`

/* ==================================================================
   CONTACT — editorial contact spec sheet.
================================================================== */
const contact = (d) => `
  <div class="glow sage" style="width:720px;height:720px;top:-180px;right:-160px;opacity:.4"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-contact">
    <div class="head">
      ${kicker(d.eyebrow)}
      <h1 class="display ${headingSize(d.heading)}">${em(d.heading, 1)}</h1>
      ${d.subhead ? `<p class="subhead">${esc(d.subhead)}</p>` : ''}
    </div>
    <div class="kv">
      ${d.rows
        .map(
          (r) => `
      <div class="krow">
        <span class="k">${esc(r.k)}</span>
        <span class="v">${esc(r.v)}</span>
      </div>`,
        )
        .join('')}
    </div>
  </div>`

/* ==================================================================
   LADDER — donation amounts as an editorial ladder + call to action.
================================================================== */
const ladder = (d) => `
  <div class="glow sand" style="width:620px;height:620px;top:-160px;left:-140px;opacity:.5"></div>
  <div class="glow forest" style="width:720px;height:720px;bottom:-220px;right:-160px"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-ladder">
    ${kicker(d.eyebrow)}
    <h1 class="display ${headingSize(d.heading)}">${em(d.heading, 2)}</h1>
    <div class="amounts">
      ${d.amounts.map((a) => `<span class="chip">${esc(a)}</span>`).join('')}
    </div>
    <div class="donate-cta">${esc(d.footer || 'DONATE TODAY')}</div>
  </div>`

/* ==================================================================
   CANDIDATE — portrait-first cinematic candidate card.
================================================================== */
const candidate = (d, ctx) => {
  const photo = CANDIDATE_PHOTOS[d.slug]
  const nameSize = d.name.length > 14 ? 'md' : 'lg'
  if (ctx.format === 'story') ctx.onPhoto = true
  return `
  <div class="t-candidate ${ctx.format === 'story' ? 'story-mode' : ''}">
    <div class="portrait">
      <img src="${ctx.prefix}img/${photo}" alt="${esc(d.name)}" />
      <div class="grade"></div>
    </div>
    <div class="info">
      <div class="info-top">
        ${kicker(d.kicker || 'Candidate · 2026')}
        <h1 class="display ${nameSize}">${em(d.name, 1)}</h1>
        <div class="office">${esc(d.office)}</div>
      </div>
      <p class="bio">${esc(d.bio)}</p>
      <div class="info-bottom">
        <span class="cyc"><em>2026</em></span>
        <span class="site">${esc(d.cta || '')}</span>
      </div>
    </div>
  </div>`
}

/* ==================================================================
   PRIORITY BADGE — a section-labeled card: LEADERSHIP / LOCAL ECONOMY /
   NORTHWEST OREGON / OUR PRIORITIES. Big vertical rail with section
   label at top and italic pull-quote center-anchored.
================================================================== */
const priorityBadge = (d) => `
  <div class="glow sage" style="width:820px;height:820px;top:-220px;left:-160px;opacity:.55"></div>
  <div class="glow forest" style="width:720px;height:720px;bottom:-240px;right:-160px"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-badge">
    <div class="badge-section">${esc(d.section)}</div>
    <div class="badge-rule"></div>
    ${d.heading ? `<h1 class="display ${headingSize(d.heading)}">${em(d.heading, 2)}</h1>` : ''}
    ${d.quote ? `<p class="quote">${esc(d.quote)}</p>` : ''}
    ${d.body ? `<p class="body">${esc(d.body)}</p>` : ''}
  </div>`

/* ==================================================================
   CTA — editorial invitation without buttons.
================================================================== */
const cta = (d) => `
  <div class="glow sage" style="width:820px;height:820px;top:-260px;left:-140px;opacity:.55"></div>
  <div class="editorial-rule"></div>
  <div class="zone t-cta">
    ${kicker(d.eyebrow)}
    ${d.heading ? `<h1 class="display ${headingSize(d.heading)}">${em(d.heading, 2)}</h1>` : ''}
    ${d.sub ? `<p class="lede">${esc(d.sub)}</p>` : ''}
    ${
      d.items && d.items.length
        ? `<div class="invitations">
      ${d.items
        .map(
          (b, i) => `
      <div class="link">
        <span class="n">${String(i + 1).padStart(2, '0')}</span>
        <span class="lbl">${esc(b)}</span>
        <span class="arrow">→</span>
      </div>`,
        )
        .join('')}
    </div>`
        : ''
    }
  </div>`

/* ==================================================================
   STORY CARD — vertical editorial poster for 1080×1920 stories.
================================================================== */
const storyCard = (d) => {
  const primary = d.lines[0] || ''
  const others = d.lines.slice(1)
  const size = primary.length > 60 ? 'md' : primary.length > 36 ? 'lg' : 'xl'
  const cta = d.cta ? (d.cta.includes('→') ? d.cta : `${d.cta} →`) : ''
  return `
  <div class="glow sage" style="width:720px;height:720px;top:-220px;left:-140px;opacity:.5"></div>
  <div class="glow forest" style="width:820px;height:820px;bottom:-260px;right:-160px"></div>
  <div class="editorial-rule vertical"></div>
  <div class="zone t-story">
    <div class="story-top">
      ${d.pill ? kicker(d.pill) : ''}
    </div>
    <div class="story-mid">
      <h1 class="display ${size}">${em(primary, 2)}</h1>
      ${others.length ? `<div class="lines">${others.map((l) => `<p>${esc(l)}</p>`).join('')}</div>` : ''}
    </div>
    ${d.pill || cta ? `<div class="story-bottom">
      ${d.pill ? `<span class="pill">${esc(d.pill)}</span>` : '<span></span>'}
      ${cta ? `<span class="cta">${esc(cta)}</span>` : ''}
    </div>` : ''}
  </div>`
}

/* ==================================================================
   STORY POLL — vertical layout for a question + poll options.
================================================================== */
const storyPoll = (d) => {
  const q = d.question
  const size = q.length > 40 ? 'md' : q.length > 24 ? 'lg' : 'xl'
  return `
  <div class="glow sage" style="width:720px;height:720px;top:-200px;right:-160px;opacity:.5"></div>
  <div class="editorial-rule vertical"></div>
  <div class="zone t-poll">
    <div class="poll-top">
      ${kicker('Poll')}
    </div>
    <div class="poll-mid">
      <h1 class="display ${size}">${em(q, 2)}</h1>
      ${d.subquestion ? `<h2 class="display md">${em(d.subquestion, 1)}</h2>` : ''}
    </div>
    <div class="poll-options">
      ${d.options.map((o) => `<div class="option">${esc(o)}</div>`).join('')}
    </div>
    ${d.note ? `<div class="poll-note">${esc(d.note)}</div>` : ''}
  </div>`
}

/* ==================================================================
   STORY CANDIDATE — full-height portrait with candidate meta.
================================================================== */
const storyCandidate = (d, ctx) => {
  const photo = CANDIDATE_PHOTOS[d.slug]
  ctx.onPhoto = true
  return `
  <div class="backdrop">
    <img src="${ctx.prefix}img/${photo}" alt="${esc(d.heading)}" />
    <div class="wash deep"></div>
  </div>
  <div class="zone t-story-candidate">
    <div class="sc-top">
      ${d.subhead ? `<div class="pretitle">${esc(d.subhead)}</div>` : ''}
      ${d.brand ? `<div class="brand-line">${esc(d.brand)}</div>` : ''}
      <h1 class="display ${headingSize(d.heading, true)}">${em(d.heading, 1)}</h1>
    </div>
    <div class="sc-bottom">
      ${(d.lines || []).map((l) => `<p>${esc(l)}</p>`).join('')}
    </div>
  </div>`
}

/* ==================================================================
   CUSTOM — bespoke per-post composition. `data.body` is raw HTML,
   `data.css` is inline scoped CSS. Used when a post gets its own
   creative direction rather than sharing a template.
================================================================== */
const custom = (d, ctx) => {
  if (d.onPhoto) ctx.onPhoto = true
  const styles = d.css ? `<style>${d.css}</style>` : ''
  const body = typeof d.body === 'function' ? d.body(ctx) : d.body
  return `${styles}${body}`
}

/* ------------------------------------------------------------------ */

const RENDERERS = {
  cover,
  headline,
  longform,
  checklist,
  stack,
  contact,
  ladder,
  candidate,
  priorityBadge,
  cta,
  storyCard,
  storyPoll,
  storyCandidate,
  custom,
}

// Per-template chrome hints (matches previous implementation contract).
export const TEMPLATE_META = {
  cover: { forceSurface: 's-ink', onPhoto: true, hideFiling: true },
  candidate: { padCanvas: true },
  storyCandidate: { forceSurface: 's-ink', onPhoto: true, hideFiling: true },
  // custom posts declare their own chrome via `meta` in content.mjs data.
}

// For custom posts, per-post chrome hints are read directly off the
// content post's `meta` field by the generator (see generate.mjs).

export function render(template, data, ctx) {
  const fn = RENDERERS[template]
  if (!fn) throw new Error(`Unknown template: ${template}`)
  return fn(data, ctx)
}
