export const metaEnabled = () =>
  typeof window !== 'undefined' &&
  process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true' &&
  Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID)

export function trackMeta(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('trackCustom', event, params, opts)
}

export function trackStandard(event, params = {}, eventId) {
  if (!metaEnabled() || !window.fbq) return
  const opts = eventId ? { eventID: eventId } : undefined
  window.fbq('track', event, params, opts)
}
