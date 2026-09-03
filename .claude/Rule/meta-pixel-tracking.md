---
description: Meta (Facebook) Pixel — bootstrap, route tracking, event vocabulary, and the tracking wrappers
globs: 'src/lib/analytics/*.js,src/components/analytics/*.jsx'
---

# Meta Pixel & Analytics Rules

How the Meta Pixel is wired into this site: how it boots, how it tracks
route changes, the event vocabulary, and the two ways a click or view
becomes an event. Reuse these patterns when adding tracking to a new
page, CTA, or form.

Adapted from the `friendsofmarknorman` rule of the same name. The one
deviation is called out in §11 — this project's `Button` is not a shadcn
`asChild` component, so CTA tracking is attribute-driven rather than
wrapper-driven.

---

## Architecture Overview

```
.env.local
  NEXT_PUBLIC_META_PIXEL_ID / NEXT_PUBLIC_META_PIXEL_ENABLED
        |
src/app/layout.js
  <head>  <MetaPixelHead />     <- injects fbq() bootstrap + fbq('init', ID)
  <body>  <MetaPixel />         <- <noscript> beacon + route-change PageView
          <SiteAnalytics />     <- passive scroll / dwell / link / CTA tracking
        |
src/lib/analytics/meta.js       <- every event goes through a named helper
        |
Consumers:
  <TrackOnMount />        page/section view events
  data-cta-* attributes   CTA + donate clicks
  forms                   trackFormStart / trackLead / trackXComplete
```

### Files

| Purpose | Path |
|---------|------|
| Pixel bootstrap (head) | `src/components/analytics/meta-pixel-head.jsx` |
| Noscript + route tracker | `src/components/analytics/meta-pixel.jsx` |
| Passive site-wide tracking | `src/components/analytics/site-analytics.jsx` |
| Event helper library | `src/lib/analytics/meta.js` |
| Mount-time event emitter | `src/components/analytics/track-on-mount.jsx` |
| Mount point | `src/app/layout.js` |

---

## CRITICAL RULES

### 1. Never call `window.fbq` directly outside `meta.js`

Every event fires through a named helper exported from
`src/lib/analytics/meta.js`. The helpers are the only place that touches
`window.fbq`, so the enabled-check, the `site_name` tag, and the
standard-vs-custom distinction stay in one place.

The one exception is `meta-pixel-head.jsx`, which *creates* `fbq`. Do
not add a second.

### 2. Two env vars, and both are required

```
NEXT_PUBLIC_META_PIXEL_ID=<numeric pixel id>
NEXT_PUBLIC_META_PIXEL_ENABLED=true
```

- The `NEXT_PUBLIC_` prefix is mandatory — the pixel is a client-side
  script, so the values must be inlined at build time.
- `ENABLED` is compared to the **string** `'true'`. Any other value
  (including `1`, `TRUE`, or unset) disables the pixel.
- Both must be set. `metaEnabled()` requires `ENABLED === 'true'` **and**
  a non-empty `ID`.
- With either missing, `MetaPixelHead` and `MetaPixel` render `null`, and
  every helper is a no-op. Nothing errors; tracking simply does not fire.
  **This was the original bug** — neither var existed anywhere, so the
  whole layer was inert.
- These values are public by design (a pixel ID is visible in page
  source). They are not secrets — but they still belong in env, not
  hardcoded, so staging and production can differ. `.env.example` is
  committed as the template; `.env.local` is not.
- The host (Vercel) needs both vars set too. A working `.env.local` only
  fixes dev.

### 3. The bootstrap script lives in `<head>`, the rest in `<body>`

`MetaPixelHead` is a **Server Component** (no `'use client'`). It renders
a raw `<script dangerouslySetInnerHTML>` inside `<head>` so `fbq` exists
before any client component tries to call it. Do not convert it to
`next/script` and do not move it into the body.

It calls `fbq('init', ID)` **only**. It does **not** fire the initial
`PageView` — that is the route tracker's job (§8), so the first page load
and every subsequent client navigation take the same code path. An
earlier version fired `PageView` in the head snippet and used a
skip-the-first-effect ref in the client component to compensate; that ref
double-counts under React Strict Mode and is gone.

`dangerouslySetInnerHTML` is correct here and is the one sanctioned use
of it in this codebase.

### 4. Guard every helper — SSR-safe by construction

`metaEnabled()` checks `typeof window !== 'undefined'` first. Every
helper calls it and bails before touching `window.fbq`. Any new helper
must do the same.

### 5. Standard events vs custom events

| Helper | fbq call | Use for |
|--------|----------|---------|
| `trackStandard(event, params, eventId)` | `fbq('track', ...)` | Meta's **standard** event names only — `PageView`, `ViewContent`, `Lead`, `CompleteRegistration` |
| `trackMeta(event, params, eventId)` | `fbq('trackCustom', ...)` | Everything site-specific — `CTA_Click`, `DonateClick`, `ScrollDepth`, ... |

Never pass a non-standard name to `trackStandard` — Meta silently drops
unrecognized standard events and they will not appear in Events Manager.

### 6. Every custom event carries `standardParams()`

```js
export const standardParams = (extra = {}) => ({
  site_name: SITE_NAME,          // 'northwest_oregon_pac'
  page_path: window.location.pathname,
  page_title: document.title,
  ...extra,
})
```

`SITE_NAME` is the shared tag that lets one Meta ad account segment this
site from the other properties in the account. Every helper except the
bare `trackPageView()` wraps its params in `standardParams`. Keep that
consistent when adding helpers.

### 7. Conversion events get an `eventId` for deduplication

Any event representing a conversion (`Lead`, and its paired custom
completion event) is fired with a freshly generated UUID from
`newEventId()`, passed as Meta's `eventID`:

```js
const eventId = newEventId()
trackLead({ form_name: 'contact' }, eventId)
trackContactComplete({ form_name: 'contact' }, eventId)
```

**Both calls share the same `eventId` on purpose.** It is how Meta
deduplicates a browser-side pixel event against a future server-side
Conversions API event for the same submission. `newEventId()` guards
`crypto.randomUUID` because it is undefined on non-secure origins.

---

## 8. Route Tracking — `meta-pixel.jsx`

- `RouteTracker` **must** stay wrapped in `<Suspense fallback={null}>`.
  `useSearchParams()` opts the subtree into client rendering, and without
  a Suspense boundary it de-opts the whole route to client-side rendering
  at build time. `MetaPixel` renders its own boundary so the layout
  cannot forget it. `SiteAnalytics` does the same.
- The effect depends on `[pathname, search]` — a query-string-only change
  counts as a new page view. That is intentional for UTM-tagged ad
  traffic landing on the same path.
- `PageView` and `ViewContent` both fire here, because App Router client
  navigations never re-run the head script.
- The `<noscript>` beacon covers script-blocked visitors on first load.

## 9. Passive Tracking — `site-analytics.jsx`

Mounted once in the layout. Adds four behaviors with **zero markup
changes** anywhere else in the app:

| Behavior | Event | Detail |
|----------|-------|--------|
| Scroll depth | `ScrollDepth` | Fires once each at 25 / 50 / 75 / 90 % |
| Dwell time | `EngagedVisit` | Fires at 30 / 60 / 120 s of *visible* time |
| Link clicks | `EmailClick` / `PhoneClick` / `Download` / `SocialLinkClick` / `OutboundLinkClick` | One delegated document click listener |
| CTA clicks | `CTA_Click` / `DonateClick` | Same listener, driven by `data-cta-*` |

**Rules:**

- Scroll handling is throttled through `requestAnimationFrame` — never
  add an unthrottled scroll listener.
- The dwell timer ticks once a second and **skips ticks while
  `document.visibilityState !== 'visible'`**, so a backgrounded tab does
  not inflate engagement.
- All three per-page refs (`firedScrolls`, `engagedSeconds`,
  `firedEngagement`) reset on `[pathname, search]`. Milestones are
  per-page, not per-session.
- The click listener is registered in the **capture** phase on
  `document` so it still sees clicks on handlers that stop propagation.
  It uses `event.target.closest('a[href]')` and therefore covers every
  anchor on the site automatically.
- Link classification order is fixed: `mailto:` -> `tel:` -> download ->
  internal (ignored) -> social -> outbound. First match wins. A CTA fires
  its own event *before* this chain and then still falls through it, so a
  donate button produces `CTA_Click` + `DonateClick` + `OutboundLinkClick`.
- A link counts as a "download" if it has the `download` attribute, ends
  in a document extension (`pdf|zip|doc|docx|xls|xlsx|ppt|pptx|csv`), or
  lives under `/downloads/`. Keep new lead-magnet PDFs under
  `public/downloads/` and they are tracked with no code change.
- Social hosts are derived from `pac.socials` in `src/data/pac.js` at
  module load, with `www.` stripped. Adding a platform to that constant
  is all that is needed — do not hardcode hostnames here.

---

## 10. Event Vocabulary (`src/lib/analytics/meta.js`)

### Standard events

| Helper | Event | Fired from |
|--------|-------|-----------|
| `trackPageView()` | `PageView` | route tracker |
| `trackViewContent(params, id)` | `ViewContent` | route tracker |
| `trackLead(params, id)` | `Lead` | every form on success |
| `trackCompleteRegistration(params, id)` | `CompleteRegistration` | available; not currently wired |

### Custom events

| Helper | Event | Typical params |
|--------|-------|----------------|
| `trackCTA` | `CTA_Click` | `cta_name`, `cta_location`, `destination_url` |
| `trackDonateClick` | `DonateClick` | `cta_location`, `donation_provider`, `destination_url` |
| `trackFormStart` | `FormStart` | `form_name` |
| `trackFormError` | `FormError` | `form_name` |
| `trackOutbound` | `OutboundLinkClick` | `destination_url`, `destination_domain` |
| `trackSocial` | `SocialLinkClick` | `destination_url`, `destination_domain` |
| `trackEmail` | `EmailClick` | `destination_url` |
| `trackPhone` | `PhoneClick` | `destination_url` |
| `trackDownload` | `Download` | `destination_url`, `destination_domain`, `file_name` |
| `trackScrollDepth` | `ScrollDepth` | `percent` |
| `trackEngagedVisit` | `EngagedVisit` | `seconds` |
| `trackPrioritiesView` | `PrioritiesView` | `content_category`, `content_name` |
| `trackVoterInfoView` | `VoterInfoView` | `content_category`, `content_name` |
| `trackContactComplete` | `ContactComplete` | `form_name` + `eventId` |
| `trackAskComplete` | `AskComplete` | `form_name` + `eventId` |
| `trackEventRSVPComplete` | `EventRSVPComplete` | `form_name`, `event_name` + `eventId` |
| `trackNewsletterSignup` | `NewsletterSignup` | `form_name` + `eventId` |

**Naming rules:**

- Event names are `PascalCase` (`DonateClick`), except the legacy
  `CTA_Click`. Do not add new underscored names.
- Param keys are `snake_case` (`cta_location`, `form_name`).
- `form_name` values are snake_case: `contact`, `ask_pac`, `event_rsvp`,
  `guide_to_action`.

---

## 11. CTA Tracking — `data-cta-*` attributes

**This is the deviation from the source rule.** That project wraps CTAs
in `<TrackedCTALink>` / `<TrackedInternalLink>` because its `Button` is a
shadcn `asChild` slot. This project's `src/components/ui/button.jsx`
renders its own `<a>` / `<Link>` and has no `asChild`, so a wrapper
cannot compose with it. Instead `Button` spreads unknown props onto the
rendered element, and `site-analytics.jsx` reads them off the clicked
anchor:

```jsx
<Button
  href={pac.donateUrl}
  target="_blank"
  rel="noopener noreferrer"
  data-cta-name="Donate"
  data-cta-location="header"
  data-cta-kind="donate"
>
  Donate
</Button>
```

- `data-cta-name` is the visible button label. Its presence is what makes
  a link a tracked CTA — omit it and the link is just a link.
- `data-cta-location` is an existing value from the vocabulary below, or
  a new `{section}_{purpose}` snake_case one.
- `data-cta-kind="donate"` additionally fires `DonateClick`.
- Works on any anchor, not just `Button` — the listener is delegated.
- Only annotate links that are genuinely **calls to action**. Plain nav
  links, footer links, and body-copy links stay unannotated; the event
  stream would drown in `CTA_Click` otherwise. The footer donate link is
  deliberately left as a plain outbound link.

### `cta_location` vocabulary

Existing values — reuse before inventing:

```
header · mobile_menu · hero
donate_section · campaigns_cta
```

Pattern: `{page_or_section}_{purpose}`, snake_case. Global chrome uses
the bare surface name (`header`, `hero`).

## 12. `<TrackOnMount />` — view events for a page or section

Fires one event in a `useEffect` on mount. Renders nothing.

```jsx
<TrackOnMount
  event="VoterInfoView"
  params={VOTER_INFO_PARAMS}
/>
```

- The `kind` prop selects the fbq method: `'custom'` (default) or
  `'standard'`. Params are wrapped in `standardParams()` either way.
- Place it as the **first child** of the page fragment or section it
  describes.
- Current usages: `PrioritiesView` in `sections/priorities.jsx`,
  `VoterInfoView` in `sections/pages/voter-guide-page.jsx`.
- `params` sits in the effect's dependency array, so a new object
  identity re-fires it. Pass a **module-level constant** or a memoized
  object — never an inline literal rebuilt on each render.

---

## 13. Form Tracking Pattern

Every form follows the same three-beat pattern. The contact form
(`src/sections/pages/contact-page.jsx`) is the reference implementation.

**1. `FormStart` — once per form fill, on first interaction**

```jsx
const formStarted = useRef(false)

const handleFirstInteraction = () => {
  if (formStarted.current) return
  formStarted.current = true
  trackFormStart({ form_name: FORM_NAME })
}
```

The `useRef` latch is mandatory — without it every keystroke fires an
event. Wire it at the **form** level, where focus and change both bubble:

```jsx
<form onSubmit={...} onFocus={handleFirstInteraction} onChange={handleFirstInteraction}>
```

**2. `Lead` (plus a form-specific completion event) — after a 2xx**

```js
const eventId = newEventId()
trackLead({ form_name: FORM_NAME }, eventId)
trackContactComplete({ form_name: FORM_NAME }, eventId)
```

Fire **after** the fetch resolves successfully, never on submit. A failed
submission is not a lead — it gets `trackFormError` instead. Note these
routes return 200 with `{ ok: false }` on a soft failure, so the check is
`!res.ok || !data.ok`.

**3. Reset the latch in the success branch**

```js
formStarted.current = false
```

So a second submission from the same mounted form starts a fresh funnel.

### Per-form event map

| Form | Component | `form_name` | Events on success |
|------|-----------|-------------|-------------------|
| Contact | `pages/contact-page.jsx` | `contact` | `Lead` + `ContactComplete` |
| Ask the PAC | `pages/ask-page.jsx` | `ask_pac` | `Lead` + `AskComplete` |
| Event RSVP | `pages/event-detail-page.jsx` | `event_rsvp` | `Lead` + `EventRSVPComplete` (with `event_name`) |
| Guide to Action | `pages/voter-guide-page.jsx` | `guide_to_action` | `Lead` + `NewsletterSignup` |

The Guide to Action form redirects to `/thank-you` on success — the
tracking calls fire **before** `router.push` so the events leave with the
page.

### Compliance note

Tracking layers on top of `forms-compliance-pattern.md` and
`ghl-forms-webhooks.md` — it never alters them. In particular:

- **Never put PII in pixel params.** No email, phone, name, city, or ZIP.
  The helpers send `form_name` and page context only. Meta's Advanced
  Matching is **not** enabled and must not be added without legal review.
- Tracking calls never gate submission and never touch consent state.
- Do not fire a pixel event off the SMS consent checkbox.

---

## 14. Adding Tracking to Something New (Checklist)

**A new CTA link:**

1. [ ] Add `data-cta-name` (the visible label) to the `<Button>` or `<a>`
2. [ ] Add `data-cta-location` — existing value from §11, or a new `{section}_{purpose}`
3. [ ] Donation destination -> add `data-cta-kind="donate"`
4. [ ] Confirm it is a real CTA, not a nav or body link

**A new page/section view event:**

1. [ ] Add a `trackX` helper to `meta.js` wrapping `trackMeta` + `standardParams`
2. [ ] Drop `<TrackOnMount event="..." params={PARAMS} />` in as the first child
3. [ ] `PARAMS` is a module-level constant, not an inline literal

**A new form:**

1. [ ] `formStarted` ref + `trackFormStart({ form_name })` via form-level `onFocus`/`onChange`
2. [ ] `trackLead({ form_name }, eventId)` after a 2xx, with `newEventId()`
3. [ ] Add a form-specific completion helper to `meta.js`, fired with the **same** `eventId`
4. [ ] `trackFormError` on both the soft-fail and network-catch branches
5. [ ] Reset `formStarted.current = false` in the success branch
6. [ ] No PII in any param
7. [ ] `form_name` is snake_case and matches the API route slug

**A new download or social platform:** nothing to do. Put the file under
`public/downloads/` or add the URL to `pac.socials` — `site-analytics.jsx`
picks up both automatically.

---

## 15. Verifying

1. Set both env vars in `.env.local` and restart the dev server —
   `NEXT_PUBLIC_*` values are inlined at build time, so a hot reload is
   not enough.
2. Install the **Meta Pixel Helper** browser extension; it should show
   the pixel ID and a `PageView` on load.
3. Navigate client-side between routes — a second `PageView` +
   `ViewContent` must fire per navigation. If not, `RouteTracker` is not
   mounted or its Suspense boundary is missing.
4. Scroll to the bottom of a long page — expect four `ScrollDepth`
   events, one per threshold, no repeats.
5. Submit a form against the real API route — expect one `FormStart` and
   exactly one `Lead` carrying an `eventID`.
6. In Meta Events Manager, use **Test Events** with the browser's test
   code to confirm arrival, then check that custom events show the
   `site_name: northwest_oregon_pac` param.
7. `npm run build` must keep every route `○ (Static)`. A route flipping
   to dynamic means a `useSearchParams()` lost its Suspense boundary.

With the env vars unset, none of the above fires — that is the correct
disabled state, not a bug.
