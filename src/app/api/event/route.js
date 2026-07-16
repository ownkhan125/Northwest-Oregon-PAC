import { fireSmsOptin } from '@/lib/ghl-sms-optin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_VERSION = '2021-07-28'
const CALENDAR_ID = process.env.GHL_EVENTS_CALENDAR_ID || 'UTM5EkrGwiZjQyc19WGN'
const EVENT_TIMEZONE = 'America/Los_Angeles'

const asString = (v, max = 4000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Parse "Jun 14, 2026" + "2:00 PM" into a local ISO 8601 datetime.
const parseEventStart = (dateStr, timeStr) => {
  if (!dateStr) return null
  const startTime = (timeStr || '').split('–')[0].split('-')[0].trim() || '9:00 AM'
  const parsed = Date.parse(`${dateStr} ${startTime}`)
  if (Number.isNaN(parsed)) return null
  return new Date(parsed).toISOString()
}

async function ghlFetch(path, init = {}) {
  const token = process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY
  if (!token) throw new Error('No GHL token configured')
  const res = await fetch(`${GHL_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
  return res
}

async function findContactId(email) {
  const locationId = process.env.GHL_LOCATION_ID
  if (!locationId) return null
  try {
    const res = await ghlFetch(
      `/contacts/search/duplicate?locationId=${encodeURIComponent(locationId)}&email=${encodeURIComponent(email)}`,
    )
    if (!res.ok) return null
    const data = await res.json().catch(() => ({}))
    return data?.contact?.id || data?.contactId || data?.id || null
  } catch {
    return null
  }
}

async function createAppointment({ contactId, eventName, eventDate, eventTime }) {
  const startTimeIso = parseEventStart(eventDate, eventTime)
  if (!startTimeIso) return null
  const startDate = new Date(startTimeIso)
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
  try {
    const res = await ghlFetch('/calendars/events/appointments', {
      method: 'POST',
      body: JSON.stringify({
        calendarId: CALENDAR_ID,
        locationId: process.env.GHL_LOCATION_ID,
        contactId,
        title: `RSVP: ${eventName}`,
        appointmentStatus: 'confirmed',
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        timezone: EVENT_TIMEZONE,
        notes: 'RSVP submitted via campaign website',
      }),
    })
    if (!res.ok) return null
    return await res.json().catch(() => null)
  } catch {
    return null
  }
}

export async function POST(request) {
  const webhook = process.env.GHL_EVENT_WEBHOOK
  if (!webhook) {
    return Response.json(
      { ok: false, error: 'Event RSVP endpoint is not configured.' },
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
  const eventName = asString(body.eventName, 300)
  const eventDate = asString(body.eventDate, 80)
  const eventTime = asString(body.eventTime, 80)
  const eventCategory = asString(body.eventCategory, 120)

  if (!firstName || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const payload = {
    type: 'Event_RSVP',
    firstName,
    lastName,
    email,
    phone,
    eventName,
    eventDate,
    eventTime,
    eventCategory,
    source: 'src_event',
    submitted_at: new Date().toISOString(),
  }

  // 1. Fire the webhook so the GHL workflow creates/upserts the contact.
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

  // Fire the shared SMS Opt-in webhook alongside the primary workflow. The
  // Event RSVP form doesn't collect SMS consent, so opt-in flags default to No.
  const sms_optin = await fireSmsOptin({
    firstName,
    lastName,
    email,
    phone,
    sms_updates: 'No',
    sms_promo: 'No',
    form_type: 'Event_RSVP',
    source: 'src_event',
  })

  // 2. Give the GHL workflow a moment to upsert the contact.
  await sleep(2000)

  // 3. Look up the contact so we can pin an appointment to it.
  let contactId = null
  let appointmentId = null
  try {
    contactId = await findContactId(email)
    if (contactId && eventName) {
      const appt = await createAppointment({ contactId, eventName, eventDate, eventTime })
      appointmentId = appt?.id || appt?.appointment?.id || null
    }
  } catch {
    // Non-fatal: the RSVP is still recorded via webhook.
  }

  return Response.json({
    ok: true,
    workflow: 'Event_RSVP',
    webhooks: [primaryStatus],
    contactId,
    appointmentId,
    sms_optin,
  })
}
