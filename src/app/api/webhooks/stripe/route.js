import { getStripe } from '@/lib/stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const WEBHOOK_TIMEOUT_MS = 12_000

// Flatten a completed Checkout Session into the shape downstream tools
// (GHL order workflow, email, etc.) want — no Stripe object graph leaks out.
function summarizeSession(session) {
  const shipping = session.collected_information?.shipping_details ?? session.shipping_details
  const customer = session.customer_details
  let items = []
  try {
    items = JSON.parse(session.metadata?.items ?? '[]')
  } catch {
    items = []
  }
  return {
    session_id: session.id,
    payment_intent: session.payment_intent,
    payment_status: session.payment_status,
    amount_subtotal: session.amount_subtotal,
    amount_shipping: session.total_details?.amount_shipping ?? 0,
    amount_total: session.amount_total,
    currency: session.currency,
    email: customer?.email ?? '',
    name: shipping?.name ?? customer?.name ?? '',
    shipping_address: shipping?.address ?? null,
    items,
    created: session.created,
  }
}

// Fulfillment hook. Today the only sink is an optional GHL order webhook —
// same fan-out pattern as the contact/RSVP forms. Add email/fulfillment
// integrations here, not in the route body.
async function handleCheckoutCompleted(session) {
  const url = process.env.GHL_ORDER_WEBHOOK
  if (!url) return

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source: 'nwop-shop', ...summarizeSession(session) }),
      signal: controller.signal,
    })
    if (!res.ok) {
      console.error('[Stripe webhook]: order webhook responded', res.status)
    }
  } catch (err) {
    console.error('[Stripe webhook]: order webhook error', err)
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret || !process.env.STRIPE_SECRET_KEY) {
    return Response.json({ ok: false, error: 'Webhook is not configured.' }, { status: 500 })
  }

  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return Response.json({ ok: false, error: 'Missing signature.' }, { status: 400 })
  }

  // Signature verification needs the exact raw bytes — never request.json().
  const payload = await request.text()

  let event
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret)
  } catch (err) {
    console.error('[Stripe webhook]: signature verification failed', err?.message)
    return Response.json({ ok: false, error: 'Invalid signature.' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object
      if (session.payment_status === 'paid') await handleCheckoutCompleted(session)
      break
    }
    case 'checkout.session.async_payment_failed':
      console.error('[Stripe webhook]: async payment failed for', event.data.object.id)
      break
    default:
      // Unhandled event types are acknowledged so Stripe stops retrying them.
      break
  }

  return Response.json({ received: true })
}
