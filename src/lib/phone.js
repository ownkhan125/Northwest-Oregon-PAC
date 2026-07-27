// Phone helpers for forms that collect a US phone number.
// The canonical format is `+1 (xxx) xxx-xxxx`. The `+1` is our country
// code — we always pre-set it and strip any `+1`/leading `1` the user
// types or pastes.

// Turn a raw input string into just the 10-digit national number.
// A leading `1` (US country code) is treated as ours and stripped.
function toNationalDigits(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '')
  if (!digits) return ''
  const trimmed = digits.startsWith('1') ? digits.slice(1) : digits
  return trimmed.slice(0, 10)
}

// Live client-side formatter — bind to the phone input's onChange.
// Produces the canonical `+1 (xxx) xxx-xxxx` shape as the user types.
// Empty input (and inputs that reduce to nothing, e.g. `+1`) return `''`
// so the input clears cleanly and consent checkboxes can react.
export function formatPhoneInput(value) {
  const national = toNationalDigits(value)
  if (!national) return ''
  const area = national.slice(0, 3)
  const mid = national.slice(3, 6)
  const last = national.slice(6, 10)
  if (national.length <= 3) return `+1 (${area}`
  if (national.length <= 6) return `+1 (${area}) ${mid}`
  return `+1 (${area}) ${mid}-${last}`
}

// Server-side canonical producer. Same format as the client formatter
// for complete numbers; empty string for anything partial (fewer than
// 10 digits after the country code) so optional-empty stays optional.
export function normalizePhoneForSubmit(value) {
  const national = toNationalDigits(value)
  if (national.length !== 10) return ''
  return `+1 (${national.slice(0, 3)}) ${national.slice(3, 6)}-${national.slice(6, 10)}`
}
