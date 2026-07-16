// Fire the shared A2P-compliant SMS Opt-in webhook. Runs alongside the
// per-form workflow webhook so both integrations receive the submission.
// Silent on failure — the caller's response is never delayed or errored by
// this side-effect.

const asString = (v) => (typeof v === 'string' ? v : '')
const asYesNo = (v) => (v === true || v === 'Yes' || v === 'true' || v === 'on' ? 'Yes' : 'No')

/**
 * @param {Object} args
 * @param {string} args.firstName
 * @param {string} args.lastName
 * @param {string} args.email
 * @param {string} args.phone
 * @param {'Yes'|'No'} args.sms_updates
 * @param {'Yes'|'No'} args.sms_promo
 * @param {string} args.source     - e.g. 'src_contact'
 * @param {string} args.form_type  - e.g. 'Contact_Form'
 */
export async function fireSmsOptin(args = {}) {
  const webhook = process.env.GHL_SMS_OPTIN_WEBHOOK
  if (!webhook) return { ok: false, skipped: true }

  const payload = {
    type: 'SMS_Optin',
    firstName: asString(args.firstName),
    lastName: asString(args.lastName),
    email: asString(args.email),
    phone: asString(args.phone),
    sms_updates: asYesNo(args.sms_updates),
    sms_promo: asYesNo(args.sms_promo),
    form_type: asString(args.form_type),
    source: asString(args.source),
    submitted_at: new Date().toISOString(),
    location_id: process.env.GHL_LOCATION_ID || '',
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8_000)
    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    return { ok: res.ok, status: res.status }
  } catch {
    // Never let the SMS opt-in webhook interfere with the primary submission.
    return { ok: false, error: 'network' }
  }
}
