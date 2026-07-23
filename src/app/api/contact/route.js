import { fireSmsOptin } from '@/lib/ghl-sms-optin'
import { toE164US } from '@/lib/form'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asString = (v, max = 4000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const asYesNo = (v) => (v === true || v === 'true' || v === 'Yes' || v === 'on' ? 'Yes' : 'No')

export async function POST(request) {
  const webhook = process.env.GHL_CONTACT_WEBHOOK
  if (!webhook) {
    return Response.json(
      { ok: false, error: 'Contact endpoint is not configured.' },
      { status: 500 },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const firstName = asString(body.firstName, 80)
  const lastName = asString(body.lastName, 80)
  const email = asString(body.email, 160).toLowerCase()
  const rawPhone = asString(body.phone, 40)
  const phone = toE164US(rawPhone)
  const organization = asString(body.organization, 200)
  const city = asString(body.city, 120)
  const zip_code = asString(body.zip_code, 20)
  const help_topic = asString(body.help_topic, 120)
  const message = asString(body.message, 8000)
  const sms_updates = asYesNo(body.sms_updates)
  const sms_promo = asYesNo(body.sms_promo)

  if (!firstName || !lastName || !EMAIL_RE.test(email) || !message || !city || !zip_code || !help_topic) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const payload = {
    type: 'Contact_Form',
    firstName,
    lastName,
    email,
    phone,
    organization,
    city,
    zip_code,
    help_topic,
    message,
    sms_updates,
    sms_promo,
    source: 'src_contact',
    submitted_at: new Date().toISOString(),
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY
  if (token) headers.Authorization = `Bearer ${token}`

  let primaryStatus = 0
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12_000)
    const res = await fetch(webhook, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    primaryStatus = res.status

    if (!res.ok) {
      return Response.json({ ok: false, error: 'Upstream webhook failed', webhooks: [primaryStatus] }, { status: 502 })
    }
  } catch (err) {
    const aborted = err?.name === 'AbortError'
    return Response.json(
      { ok: false, error: aborted ? 'Request timed out' : 'Network error' },
      { status: 502 },
    )
  }

  // Fire the shared SMS Opt-in webhook alongside the primary workflow.
  const sms_optin = await fireSmsOptin({
    firstName,
    lastName,
    email,
    phone,
    sms_updates,
    sms_promo,
    form_type: 'Contact_Form',
    source: 'src_contact',
  })

  return Response.json({
    ok: true,
    workflow: 'Contact_Form',
    webhooks: [primaryStatus],
    sms_optin,
  })
}
