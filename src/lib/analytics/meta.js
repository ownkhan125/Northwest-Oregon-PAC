// Meta (Facebook) Pixel event helpers. See .claude/Rule/meta-pixel-tracking.md
//
// This module is the ONLY place in the app allowed to touch `window.fbq`,
// aside from `meta-pixel-head.jsx` (which creates it) and the route
// tracker in `meta-pixel.jsx`. Keeping the enabled-check, the
// `site_name` tag, and the standard-vs-custom split in one file is what
// stops the event stream from drifting.

// Shared tag so one Meta ad account can segment this property from the
// others in the account. Do not change without updating saved audiences.
const SITE_NAME = 'northwest_oregon_pac'

export const metaEnabled = () =>
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)

// Every custom event carries these three params.
export const standardParams = (extra = {}) => ({
  site_name: SITE_NAME,
  page_path: typeof window === 'undefined' ? '' : window.location.pathname,
  page_title: typeof document === 'undefined' ? '' : document.title,
  ...extra,
})

// Conversion events pass a fresh UUID as Meta's `eventID` so a future
// server-side Conversions API event for the same submission dedupes
// against the browser-side one. `crypto.randomUUID` is undefined on
// non-secure origins, hence the existence check.
export const newEventId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : undefined

// --- low-level -------------------------------------------------------

// Campaign-specific events. Never pass a Meta standard event name here.
export const trackMeta = (event, params = {}, eventId) => {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('trackCustom', event, params, opts)
}

// Meta's standard event names ONLY — PageView, ViewContent, Lead,
// CompleteRegistration. Meta silently drops unrecognized standard
// events, so a typo here never shows up in Events Manager.
export const trackStandard = (event, params = {}, eventId) => {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('track', event, params, opts)
}

// --- standard events -------------------------------------------------

export const trackPageView = () => trackStandard('PageView')

export const trackViewContent = (params = {}, eventId) =>
  trackStandard('ViewContent', standardParams(params), eventId)

export const trackLead = (params = {}, eventId) =>
  trackStandard('Lead', standardParams(params), eventId)

export const trackCompleteRegistration = (params = {}, eventId) =>
  trackStandard('CompleteRegistration', standardParams(params), eventId)

// --- CTA / navigation ------------------------------------------------

export const trackCTA = (params = {}) => trackMeta('CTA_Click', standardParams(params))

export const trackDonateClick = (params = {}) =>
  trackMeta('DonateClick', standardParams({ donation_provider: 'winred', ...params }))

// --- forms -----------------------------------------------------------

export const trackFormStart = (params = {}) => trackMeta('FormStart', standardParams(params))

export const trackFormError = (params = {}) => trackMeta('FormError', standardParams(params))

export const trackContactComplete = (params = {}, eventId) =>
  trackMeta('ContactComplete', standardParams(params), eventId)

export const trackAskComplete = (params = {}, eventId) =>
  trackMeta('AskComplete', standardParams(params), eventId)

export const trackEventRSVPComplete = (params = {}, eventId) =>
  trackMeta('EventRSVPComplete', standardParams(params), eventId)

export const trackNewsletterSignup = (params = {}, eventId) =>
  trackMeta('NewsletterSignup', standardParams(params), eventId)

// --- passive link tracking -------------------------------------------

export const trackOutbound = (params = {}) => trackMeta('OutboundLinkClick', standardParams(params))

export const trackSocial = (params = {}) => trackMeta('SocialLinkClick', standardParams(params))

export const trackEmail = (params = {}) => trackMeta('EmailClick', standardParams(params))

export const trackPhone = (params = {}) => trackMeta('PhoneClick', standardParams(params))

export const trackDownload = (params = {}) => trackMeta('Download', standardParams(params))

// --- engagement ------------------------------------------------------

export const trackScrollDepth = (percent) => trackMeta('ScrollDepth', standardParams({ percent }))

export const trackEngagedVisit = (seconds) => trackMeta('EngagedVisit', standardParams({ seconds }))

// --- section / page view events --------------------------------------

export const trackPrioritiesView = (params = {}) =>
  trackMeta('PrioritiesView', standardParams(params))

export const trackVoterInfoView = (params = {}) =>
  trackMeta('VoterInfoView', standardParams(params))
