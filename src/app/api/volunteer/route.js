import { fireSmsOptin } from '@/lib/ghl-sms-optin'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const asString = (v, max = 4000) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

const asYesNo = (v) => (v === true || v === 'true' || v === 'Yes' || v === 'on' ? 'Yes' : 'No')

// Multiple webhook URLs may be configured for parallel fan-out. A single form
// submission triggers every configured workflow. Sources merged in this order:
//   1. GHL_VOLUNTEER_WEBHOOKS       (comma-separated list — takes precedence)
//   2. GHL_VOLUNTEER_WEBHOOK        (primary volunteer workflow)
//   3. GHL_VOLUNTEER_SUPP_WEBHOOK   (Supplementary Tags 1 workflow)
//   4. GHL_VOLUNTEER_SUPP2_WEBHOOK  (Supplementary Tags 2 workflow)
// Duplicates are de-duped.
const resolveWebhooks = () => {
  const list = process.env.GHL_VOLUNTEER_WEBHOOKS
  const collected = []
  if (list) {
    collected.push(...list.split(',').map((s) => s.trim()).filter(Boolean))
  } else {
    const single = process.env.GHL_VOLUNTEER_WEBHOOK
    if (single) collected.push(single.trim())
    const supp = process.env.GHL_VOLUNTEER_SUPP_WEBHOOK
    if (supp) collected.push(supp.trim())
    const supp2 = process.env.GHL_VOLUNTEER_SUPP2_WEBHOOK
    if (supp2) collected.push(supp2.trim())
  }
  return Array.from(new Set(collected))
}

export async function POST(request) {
  const webhooks = resolveWebhooks()
  if (webhooks.length === 0) {
    return Response.json(
      { ok: false, error: 'Volunteer endpoint is not configured.' },
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
  const zipCode = asString(body.zipCode, 20)
  const city = asString(body.city, 120)
  const county = asString(body.county, 80)
  const region = asString(body.region, 80)
  const registeredVoter = asString(body.registeredVoter, 20)
  const campaignExperience = asString(body.campaignExperience, 80)
  const availability = asString(body.availability, 80)
  const frequency = asString(body.frequency, 80)
  const anythingElse = asString(body.anythingElse, 4000)
  const sms_updates = asYesNo(body.sms_updates)
  const sms_promo = asYesNo(body.sms_promo)

  if (!firstName || !lastName || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const payload = {
    type: 'Volunteer_Form',
    firstName,
    lastName,
    email,
    phone,
    zipCode,
    city,
    county,
    region,
    registeredVoter,
    campaignExperience,
    availability,
    // "How often would you like to help?" — emitted under multiple key names so
    // whichever key the receiving GHL workflow is mapped to will find the value.
    // The client field name is `frequency` (preserved); aliases are additive.
    frequency,
    helpFrequency: frequency,
    howOften: frequency,
    anythingElse,
    sms_updates,
    sms_promo,
    source: 'src_volunteer',
    submitted_at: new Date().toISOString(),
  }

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  const token = process.env.GHL_PRIVATE_KEY || process.env.GHL_API_KEY
  if (token) headers.Authorization = `Bearer ${token}`

  let webhookStatuses = []
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15_000)
    const results = await Promise.all(
      webhooks.map((url) =>
        fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
          signal: controller.signal,
        }).catch(() => null),
      ),
    )
    clearTimeout(timeout)

    webhookStatuses = results.map((r) => (r && typeof r.status === 'number' ? r.status : 0))
    const anySuccess = results.some((r) => r && r.ok)
    if (!anySuccess) {
      return Response.json({ ok: false, error: 'Upstream webhook failed', webhooks: webhookStatuses }, { status: 502 })
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
    form_type: 'Volunteer_Form',
    source: 'src_volunteer',
  })

  return Response.json({
    ok: true,
    workflow: 'Volunteer_Form',
    webhooks: webhookStatuses,
    outgoingPayloadKeys: Object.keys(payload),
    sms_optin,
  })
}
