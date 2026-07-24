import { NextResponse } from 'next/server'

const WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/lNVEVQTfMOSmFULpiivA/webhook-trigger/PuS17zDj5gK7M9YrTqTT'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ZIP_RE = /^\d{5}(-\d{4})?$/

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const firstName = String(body.firstName || '').trim()
  const lastName = String(body.lastName || '').trim()
  const email = String(body.email || '').trim()
  const zip = String(body.zip || '').trim()
  const source = String(body.source || 'guide-to-action').trim()

  if (!firstName || !lastName || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'invalid_fields' }, { status: 400 })
  }
  if (zip && !ZIP_RE.test(zip)) {
    return NextResponse.json({ ok: false, error: 'invalid_zip' }, { status: 400 })
  }

  const payload = {
    firstName,
    lastName,
    name: `${firstName} ${lastName}`.trim(),
    email,
    zip,
    postal_code: zip,
    source,
    page: source,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get('user-agent') || '',
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const upstream = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, error: 'upstream_status', status: upstream.status },
        { status: 502 },
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    clearTimeout(timeout)
    const reason = e?.name === 'AbortError' ? 'upstream_timeout' : 'upstream_unreachable'
    return NextResponse.json({ ok: false, error: reason }, { status: 502 })
  }
}
