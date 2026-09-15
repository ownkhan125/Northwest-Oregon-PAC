import { getStripe, getSiteOrigin } from '@/lib/stripe'
import { getProductById, MAX_LINE_QTY } from '@/data/products'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_LINES = 50

// The client only sends { id, option, qty }; names and prices come from the
// catalog on this side so a tampered request can't change what gets charged.
function buildLineItems(items, origin) {
  const lines = []
  for (const raw of items.slice(0, MAX_LINES)) {
    const product = getProductById(raw?.id)
    if (!product || !product.inStock) continue

    const qty = Math.min(MAX_LINE_QTY, Math.max(1, Math.floor(Number(raw.qty) || 0)))
    if (qty < 1) continue

    const option =
      product.options && product.options.values.includes(raw.option) ? raw.option : null
    if (product.options && !option) continue

    lines.push({
      quantity: qty,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: option ? `${product.name} — ${product.options.label}: ${option}` : product.name,
          description: product.description,
          images: [new URL(product.image.src, origin).toString()],
          metadata: { product_id: product.id, option: option ?? '' },
        },
      },
    })
  }
  return lines
}

export async function POST(request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return Response.json({ ok: false, error: 'Checkout is not configured.' }, { status: 500 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 })
  }

  const items = Array.isArray(body?.items) ? body.items : []
  const origin = getSiteOrigin(request)
  const lineItems = buildLineItems(items, origin)

  if (lineItems.length === 0) {
    return Response.json({ ok: false, error: 'Your cart is empty.' }, { status: 400 })
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      // US-only shop: charge in USD, don't let Stripe offer a localized
      // currency based on the shopper's location.
      adaptive_pricing: { enabled: false },
      shipping_address_collection: { allowed_countries: ['US'] },
      // Shipping is free, but declaring a $0 rate makes Stripe show it on the
      // receipt and lets us switch to a paid rate later without code changes.
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Free shipping',
            fixed_amount: { amount: 0, currency: 'usd' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        source: 'nwop-shop',
        // Compact echo of the cart so the success page can map lines back to
        // catalog products (images, options) without another Stripe expand.
        items: JSON.stringify(
          items
            .filter((i) => getProductById(i?.id))
            .map((i) => ({ id: i.id, option: i.option ?? null, qty: Number(i.qty) || 1 })),
        ).slice(0, 500),
      },
    })

    return Response.json({ ok: true, url: session.url })
  } catch (err) {
    console.error('[Checkout API]: failed to create session', err)
    return Response.json(
      { ok: false, error: 'Could not start checkout. Please try again in a moment.' },
      { status: 502 },
    )
  }
}
