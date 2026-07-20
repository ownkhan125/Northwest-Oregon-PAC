import { fireSmsOptin } from '@/lib/ghl-sms-optin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}(-\d{4})?$/

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

export async function POST(request) {
  const webhook = process.env.GHL_ASK_WEBHOOK
  if (!webhook) {
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
  const phone = asString(body.phone, 40)
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

  const sms_optin = await fireSmsOptin({
    firstName,
    lastName,
    email,
    phone,
    sms_updates,
    sms_promo,
    form_type: 'Issue_Report',
    source: 'src_issue',
  })

  return Response.json({
    ok: true,
    workflow: 'Issue_Report',
    webhooks: [primaryStatus],
    sms_optin,
  })
}
