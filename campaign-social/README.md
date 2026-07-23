# Northwest Oregon PAC — Social Creative Library

A complete, on-brand Instagram library generated from the website's own
content and design system. Open `index.html` for the visual gallery.

| Format    | Count | Size        | Location                          |
| --------- | ----- | ----------- | --------------------------------- |
| Feed      | 60    | 1080 × 1080 | `feed/`                           |
| Stories   | 30    | 1080 × 1920 | `stories/`                        |
| Carousels | 10    | 5–7 slides  | `carousels/<name>/slide-N.html`   |

Every artboard uses the site palette (cream `#F6F2E8`, sand `#E0D6BC`,
sage `#5A7060`, forest `#2E4538`, brown `#6B5A42`, ink `#2A2A26`), the
site type stack (Lora · Source Sans 3), and carries the
`Paid for by Northwest Oregon PAC #25045` rail. All copy is sourced
verbatim from `src/data/pac.js` — never edit creative text directly.

## Pipeline

```
_build/content.mjs     content plan (imports src/data/pac.js verbatim)
_build/templates.mjs   HTML renderers per layout template
_build/generate.mjs    writes creatives + gallery + public/social mirror
                       + regenerates src/data/social-posts.js
assets/social.css      design tokens & shared chrome (mast, rail, frame)
assets/templates.css   per-template layout rules
```

Regenerate everything after a content or design change:

```bash
node campaign-social/_build/generate.mjs
```

Then refresh the app's card previews (Playwright, via the playwright-skill
runner) and re-verify:

```bash
cd .claude/skills/playwright-skill
node run.js ../../../campaign-social/_build/previews.js
node run.js _verify-social-library.js        # 1,264 checks
```

`_build/optimize-images.js` re-derives the compressed photos in
`assets/img/` from `src/assets/images/` if the source photography changes.

The app page at `/social-posts` reads `src/data/social-posts.js` and
serves the mirrored library from `public/social/`.

## Exporting for Instagram

Open any artboard in Chrome, screenshot the `.canvas` element at full
size (1080-wide), or use the previews pipeline with `deviceScaleFactor: 1`
for production PNG/JPG exports.
