export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const asString = (v, max = 200) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// Optional survey webhook — set GHL_SURVEY_WEBHOOK in env to fan out to
// GoHighLevel or any other collector. When unset, the endpoint still
// returns ok so the client-side flow always works in local/dev.
const WEBHOOK_URL = process.env.GHL_SURVEY_WEBHOOK

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const topIssue = asString(body.topIssue, 80)
  const county = asString(body.county, 80)
  const involvement = asString(body.involvement, 120)

  if (!topIssue || !county || !involvement) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 })
  }

  const payload = {
    type: 'Survey_What_Matters_Most',
    topIssue,
    county,
    involvement,
    source: 'survey',
    submitted_at: new Date().toISOString(),
  }

  if (!WEBHOOK_URL) {
    // Accept the submission even without a configured webhook so the UX
    // stays fully working in local + preview. Real deployments wire the
    // webhook via env.
    return Response.json({ ok: true, forwarded: false })
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    if (!res.ok) {
      return Response.json({ ok: false, error: 'upstream_status', status: res.status }, { status: 502 })
    }
    return Response.json({ ok: true, forwarded: true })
  } catch (e) {
    const reason = e?.name === 'AbortError' ? 'upstream_timeout' : 'upstream_unreachable'
    return Response.json({ ok: false, error: reason }, { status: 502 })
  }
}
