import { normalizePhoneForSubmit } from '@/lib/phone'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEBHOOK_TIMEOUT_MS = 12_000

const asString = (v, max = 4000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const asYesNo = (v) => (v === true || v === 'true' || v === 'Yes' || v === 'on' ? 'Yes' : 'No')

async function fireWebhook(url, payload, headers) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    console.error('[Contact API] webhook error:', err)
    return { ok: false, status: 0 }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request) {
  const WEBHOOK_URLS = [
    process.env.GHL_CONTACT_WEBHOOK,
    process.env.GHL_SMS_OPTIN_WEBHOOK,
  ].filter(Boolean)

  if (WEBHOOK_URLS.length === 0) {
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
  const phone = normalizePhoneForSubmit(body.phone)
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

  const results = await Promise.all(WEBHOOK_URLS.map((url) => fireWebhook(url, payload, headers)))

  if (!results.some((r) => r.ok)) {
    return Response.json(
      { ok: false, error: 'Webhook delivery failed', webhooks: results.map((r) => r.status) },
      { status: 502 },
    )
  }

  return Response.json({
    ok: true,
    workflow: 'Contact_Form',
    webhooks: results.map((r) => r.status),
  })
}
