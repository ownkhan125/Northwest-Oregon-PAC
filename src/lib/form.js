export const BASE_FIELD =
  'h-12 w-full rounded-xl border border-border bg-surface-alt/30 px-4 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/45 focus:border-primary focus:bg-surface'

// US phone: 10 digits, or 11 digits starting with 1 (country code).
// Allowed formatting characters between digits: spaces, dashes, dots, parentheses, leading +.
// Examples accepted:
//   1234567890
//   (123) 456-7890
//   123-456-7890
//   123 456 7890
//   +1 123-456-7890
// Reject: letters, other special chars, wrong lengths, leading + without country code 1.
const US_PHONE_ALLOWED_CHARS = /^[\d\s+().\-]+$/

export function isValidUSPhone(value) {
  if (typeof value !== 'string') return false
  const v = value.trim()
  if (v.length === 0) return false
  if (!US_PHONE_ALLOWED_CHARS.test(v)) return false
  // A leading + is only valid before a country code
  if (v.indexOf('+') > 0) return false
  const digits = v.replace(/\D/g, '')
  if (digits.length === 10) return true
  if (digits.length === 11 && digits.startsWith('1')) return true
  return false
}

export const US_PHONE_ERROR = 'Enter a valid US phone number, e.g. (503) 555-0123.'

// Normalize a US phone to E.164 (+1XXXXXXXXXX) for outgoing webhook +
// SMS opt-in payloads. The user's raw input in the UI is NOT modified —
// this only touches the value transmitted upstream. Empty strings pass
// through so an unfilled optional field stays optional.
//   "5035551234"        → "+15035551234"
//   "(503) 555-0123"    → "+15035550123"
//   "1-503-555-0123"    → "+15035550123"
//   "+15035550123"      → "+15035550123"  (idempotent)
//   ""                  → ""
export function toE164US(raw) {
  if (!raw) return ''
  const digits = String(raw).replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return raw
}

// US ZIP: exactly 5 digits.
export function isValidUSZip(value) {
  if (typeof value !== 'string') return false
  return /^\d{5}$/.test(value.trim())
}

export const US_ZIP_ERROR = 'Enter a valid 5-digit US ZIP code.'

// Central helper used by every form. Given the built payload and which fields
// are required/optional, returns { fieldKey: 'message' } for anything invalid.
// Empty optional values are treated as valid.
//
// Pass `phoneKey: null` (or any falsy value) to skip phone validation entirely
// — the input is accepted as typed and normalized server-side before the
// webhook fires.
export function validateContactFields(payload, opts = {}) {
  const {
    phoneKey = 'phone',
    phoneRequired = false,
    zipKey = null, // e.g. 'zip_code' or 'zipCode'; null skips ZIP validation
    zipRequired = false,
  } = opts
  const errors = {}

  if (phoneKey) {
    const phone = String(payload[phoneKey] ?? '').trim()
    if (phone === '') {
      if (phoneRequired) errors[phoneKey] = 'Phone number is required.'
    } else if (!isValidUSPhone(phone)) {
      errors[phoneKey] = US_PHONE_ERROR
    }
  }

  if (zipKey) {
    const zip = String(payload[zipKey] ?? '').trim()
    if (zip === '') {
      if (zipRequired) errors[zipKey] = 'ZIP code is required.'
    } else if (!isValidUSZip(zip)) {
      errors[zipKey] = US_ZIP_ERROR
    }
  }

  return errors
}
