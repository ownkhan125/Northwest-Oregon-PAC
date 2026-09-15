import { redirect } from 'next/navigation'
import CheckoutSuccessPage from '@/sections/pages/checkout-success-page'
import { getStripe } from '@/lib/stripe'
import { getProductById } from '@/data/products'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Order confirmed | Northwest Oregon PAC',
  robots: { index: false, follow: false },
}

// Reduce the Stripe session to plain, serializable props for the client.
function toOrder(session) {
  const shipping = session.collected_information?.shipping_details ?? session.shipping_details
  const customer = session.customer_details

  let items = []
  try {
    items = JSON.parse(session.metadata?.items ?? '[]')
  } catch {
    items = []
  }
  const lines = items
    .map((i) => {
      const product = getProductById(i.id)
      if (!product) return null
      return {
        key: `${i.id}::${i.option ?? ''}`,
        id: product.id,
        name: product.name,
        optionLabel: product.options?.label ?? null,
        option: i.option ?? null,
        qty: i.qty,
        amount: product.price * i.qty * 100,
      }
    })
    .filter(Boolean)

  return {
    number: session.id.slice(-8).toUpperCase(),
    paid: session.payment_status === 'paid',
    email: customer?.email ?? '',
    name: shipping?.name ?? customer?.name ?? '',
    address: shipping?.address ?? null,
    lines,
    subtotal: session.amount_subtotal ?? 0,
    shipping: session.total_details?.amount_shipping ?? 0,
    total: session.amount_total ?? 0,
  }
}

export default async function Page({ searchParams }) {
  const { session_id: sessionId } = await searchParams
  if (typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) redirect('/cart')

  let session = null
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId)
  } catch (err) {
    console.error('[Checkout success]: could not retrieve session', err?.message)
  }

  return <CheckoutSuccessPage order={session ? toOrder(session) : null} />
}
