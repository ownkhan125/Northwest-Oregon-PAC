export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asString = (v, max = 2000) =>
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
  const phone = asString(body.phone, 40)
  const message = asString(body.message, 4000)
  const sms_updates = asYesNo(body.sms_updates)
  const sms_promo = asYesNo(body.sms_promo)

  const errors = []
  if (!firstName) errors.push('First name is required.')
  if (!lastName) errors.push('Last name is required.')
  if (!email || !EMAIL_RE.test(email)) errors.push('A valid email is required.')
  if (!message) errors.push('Message is required.')

  if (errors.length) {
    return Response.json({ ok: false, error: errors.join(' ') }, { status: 400 })
  }

  const payload = {
    type: 'Contact_Form',
    firstName,
    lastName,
    email,
    phone,
    message,
    sms_updates,
    sms_promo,
    source: 'src_contact',
    submitted_at: new Date().toISOString(),
    location_id: process.env.GHL_LOCATION_ID,
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (process.env.GHL_PRIVATE_KEY) {
    headers.Authorization = `Bearer ${process.env.GHL_PRIVATE_KEY}`
  }

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

    if (!res.ok) {
      return Response.json(
        { ok: false, error: 'Upstream webhook rejected the submission.' },
        { status: 502 },
      )
    }

    return Response.json({ ok: true })
  } catch (err) {
    const aborted = err?.name === 'AbortError'
    return Response.json(
      { ok: false, error: aborted ? 'Request timed out.' : 'Network error contacting the webhook.' },
      { status: 502 },
    )
  }
}
