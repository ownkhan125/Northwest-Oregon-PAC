import { normalizePhoneForSubmit } from '@/lib/phone'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}(-\d{4})?$/
const WEBHOOK_TIMEOUT_MS = 12_000

const asString = (v, max = 4000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const asYesNo = (v) => (v === true || v === 'true' || v === 'Yes' || v === 'on' ? 'Yes' : 'No')

const splitName = (full) => {
  const trimmed = full.trim().replace(/\s+/g, ' ')
  if (!trimmed) return { firstName: '', lastName: '' }
  const parts = trimmed.split(' ')
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' ') || '',
  }
}

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
    console.error('[Ask API] webhook error:', err)
    return { ok: false, status: 0 }
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request) {
  const WEBHOOK_URLS = [
    process.env.GHL_ASK_WEBHOOK,
    process.env.GHL_SMS_OPTIN_WEBHOOK,
  ].filter(Boolean)

  if (WEBHOOK_URLS.length === 0) {
    return Response.json(
      { ok: false, error: 'Ask endpoint is not configured.' },
      { status: 500 },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const fullName = asString(body.name || body.fullName || '', 200)
  const email = asString(body.email, 160).toLowerCase()
  const phone = normalizePhoneForSubmit(body.phone)
  const city = asString(body.city, 120)
  const zip_code = asString(body.zip_code, 20)
  const issue_category = asString(body.issue_category, 120)
  const issue_location = asString(body.issue_location, 200)
  const issue_subject = asString(body.issue_subject, 200)
  const issue_description = asString(body.issue_description, 8000)
  const sms_updates = asYesNo(body.sms_updates)
  const sms_promo = asYesNo(body.sms_promo)

  if (
    !fullName ||
    !EMAIL_RE.test(email) ||
    !city ||
    !zip_code ||
    !ZIP_RE.test(zip_code) ||
    !issue_subject ||
    !issue_description
  ) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const { firstName, lastName } = splitName(fullName)

  const payload = {
    type: 'Issue_Report',
    firstName,
    lastName,
    email,
    phone,
    city,
    zip_code,
    issue_category,
    issue_location,
    issue_subject,
    issue_description,
    issue_image: '',
    sms_updates,
    sms_promo,
    source: 'src_issue',
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
    workflow: 'Issue_Report',
    webhooks: results.map((r) => r.status),
  })
}
