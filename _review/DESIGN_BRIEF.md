# Northwest Oregon PAC — Social Post Redesign Brief

You are the senior graphic designer / art director for Northwest Oregon PAC's Instagram-format social post gallery. Redesign each assigned HTML file as a bespoke premium composition.

Reference quality bar: Apple keynote, Nike campaign posters, Porsche brand advertising, A24 movie key art, high-end editorial magazines, museum exhibition posters, premium annual reports.

## Hard rules (non-negotiable)

1. **Text = only the PDF Image Text**. The spec file at `C:/Users/General/Documents/GitHub/Northwest Oregon PAC/_review/image-text-spec.json` under the `feed` / `story` / `carousel` key is the ONLY source of text. Never add words. Never rewrite. Preserve punctuation, capitalization, ampersands, dashes verbatim.
2. **No button/pill CTAs** (like the "DONATE TODAY" pill in feed-41). That treatment is reserved for the donation ladder only. Do not use it elsewhere.
3. **No ghost feed numerals** ("01", "02" etc. as background decoration are forbidden).
4. **No overlap** — text must never sit on top of, behind, or through images, tiles, badges, decorative shapes. Every text block gets its own clean reading area with proper spacing.
5. **No clipping** — every element must fully fit inside the canvas (1080×1080 feed/carousel, 1080×1920 story).
6. **Each post has a unique composition** — no two posts should feel the same. Vary layouts aggressively.
7. **Use images generously** — prefer image-driven layouts over empty backgrounds. Rotate through the available photos so no single image is overused.

## Design system

Brand palette:
- sand `#E0D6BC` · cream `#F6F2E8` · sage `#5A7060` · forest `#2E4538` · brown `#6B5A42` · ink `#2A2A26`

Typography:
- Lora (display serif) — headlines, italic accents
- Source Sans 3 (sans) — meta, labels, mono-style tags

## Available assets (relative from HTML: `../assets/`)

Images at `../assets/img/`:
- banner.jpg, hero.jpg, bridge.png, community.jpg, campaign.jpg, event.jpg, who-we-are.jpg, us-elections.jpg, oregon-roads.png, roads.png, image-10.png, image-14.png, image-15.png
- Candidates: mark-norman.jpg, brian-schimmel.jpg, barbara-kahl.jpg, ciatta-thompson.jpg, randall-fryer.jpg

Logos:
- `../assets/nwop-logo-light.png` (use on dark backgrounds)
- `../assets/nwop-logo-dark.png` (use on light backgrounds)

Icons at `../assets/icons/`:
- balance, ballot-box, billboard, capitol, certificate, document, energy, envelope, gavel, laptop-lock, money-bag, podium, shield, skyline, target, tax-sign
- Or write inline SVGs for civic icons (star, building, torch, book, checkmark, etc.)

## Reference compositions (read first for style)

Read these 18 approved prototypes to understand the visual language and quality bar before redesigning:

Feed:
- feed-01-hero (cinematic hero + polaroid tiles + tag columns)
- feed-02-region-voice (diptych split poster w/ mirrored typography)
- feed-07-small-actions (editorial cover w/ polaroid stack top-right)
- feed-08-building-tomorrow (architectural blueprint poster w/ split typography)
- feed-09-what-matters (modern infographic grid w/ 5 icon cards)
- feed-12-future-belongs (cinematic manifesto CTA list w/ diagonal seam)
- feed-15-something-bigger (Nike-style bold poster w/ stacked typography)
- feed-17-education-workforce (editorial split w/ tall portrait photo panel)
- feed-19-every-dollar-here (3-column narrative rhythm w/ dot grid)
- feed-20-more-than-promises (cinematic quote poster w/ giant italic glyph)
- feed-23-priorities-nw (annual report split w/ Roman-numeral list)
- feed-26-mark-norman (full-bleed campaign portrait)
- feed-27-brian-schimmel (editorial candidate split - different from 26)
- feed-38-contact (museum exhibition poster w/ registration marks + seal)
- feed-41-donate-ladder (fundraising w/ chip amounts — button OK HERE ONLY)
- feed-42-support-makes-possible (museum poster w/ asymmetric capability grid)
- feed-44-not-headlines (editorial feature spread w/ italic quote glyph)

Story:
- story-15-issue-question (documentary poll poster w/ corner registration marks)

Paths: `public/social/feed/*.html`, `public/social/stories/*.html`

## HTML file structure

Each file follows this shell (keep the `<link>` block intact):

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=1080" />
<title>Feed NN · [title from PDF] — Northwest Oregon PAC</title>

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Source+Sans+3:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../assets/social.css" />
<link rel="stylesheet" href="../assets/templates.css" />
<link rel="stylesheet" href="../assets/carousels.css" />

<style>
  /* bespoke composition CSS using f##-* / s##-* / c##-* prefix classes */
</style>
</head>
<body>
  <div class="canvas [s-light|s-forest|s-sand|s-ink|on-photo]">
    <!-- optional backdrop w/ wash -->
    <!-- optional decoration (stars, corner marks, glyph, editorial rule) -->
    <!-- mast with logo image (top-left, usually) -->
    <!-- main composition zone -->
    <div class="grain"></div>
  </div>
</body>
</html>
```

For story format use `<div class="canvas story ...">` (1080×1920).

## Composition menu — pick a different one per post

- Cinematic full-bleed photo cover
- Editorial cover w/ polaroid stack
- Diptych split poster (two panels)
- Documentary poster w/ blueprint grid
- Infographic grid w/ icon cards
- Political manifesto w/ CTA list (no buttons)
- Editorial split (photo panel + column)
- 3-column narrative rhythm
- Cinematic quote w/ giant italic glyph
- Annual report split w/ Roman numerals
- Museum exhibition poster w/ registration marks + custom SVG seal
- Full-bleed candidate portrait
- Editorial candidate spread
- Bold single-word typography poster
- Layered polaroid film-strip
- Half-photo / half-text asymmetric split
- Torn-paper editorial
- Diagonal ribbon accent
- Ornamental serif quote-glyph background
- Documentary story w/ corner registration marks (for story format)
- Story w/ pull-quote centered
- Story w/ big stacked type over cinematic photo

Every post must feel visually distinct from its neighbors. Break the grid. Use asymmetry.

## Common decorative primitives you can inline

- **Star cluster** (American flag nod):
  `<svg width="12" height="12" viewBox="0 0 24 24" fill="[sand|forest]"><path d="M12 2l2.9 6.7L22 10l-5.5 4.6L18.2 22 12 18.3 5.8 22l1.7-7.4L2 10l7.1-1.3L12 2z"/></svg>`
- **Corner registration marks** (like exhibition posters): `+` shape via ::before/::after
- **Editorial hairline rule** or **diagonal accent line**
- **Corner brackets** (top-left / bottom-right L-shapes)
- **Ornamental hairline dividers** (linear-gradient fades)
- **Layered polaroid tiles** — small cards with `padding:12px 12px 40px; background:#faf3d8; box-shadow:0 30px 60px -22px rgba(46,42,20,.42); transform:rotate(±Xdeg);`
- **Cinematic wash overlays** — radial + linear gradients over photos
- **Blueprint grid overlay** — `background-image: linear-gradient(90deg, ...1px, transparent 1px), linear-gradient(180deg, ...1px, transparent 1px); background-size: 60px 60px; opacity:.14;`
- **Big italic quote glyph in background** — `font-size:800-1200px; line-height:.7; color:rgba(46,69,56,.12);`
- **Icon cards** in a grid
- **Custom SVG seal** (circular gov-style mark w/ stars & rings)

## Working style

For each file:
1. Read the file (Read tool — needed before Write, even if you'll overwrite everything)
2. Look up the post's `imageText` array in the spec
3. Choose an appropriate composition from the menu (differentiate from neighbors)
4. Write fresh HTML using the shell + bespoke `<style>` + your composition
5. After Write, do a quick Read to verify the file still parses
6. Move to next file

Prefer Write (full rewrite) over Edit — the old bespoke `f##-*` markup is not worth preserving.

Do not touch `../assets/social.css` / `templates.css` / `carousels.css` — they define shared brand tokens.

Do not commit anything.

## Report at the end (concise)

- Files count edited
- One-line composition summary per file
- Any files where the layout was hard to solve cleanly
- Any images you preferred / avoided and why
