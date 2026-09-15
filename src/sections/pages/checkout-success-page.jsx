'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { m } from 'motion/react'
import Button from '@/components/ui/button'
import SplitText from '@/components/ui/split-text'
import { useCart } from '@/components/shop/cart-provider'
import { EASE } from '@/animations/variants'
import { formatPrice, getProductById } from '@/data/products'

const cents = (n) => formatPrice(n / 100)

const CheckMark = () => (
  <m.svg
    viewBox="0 0 48 48"
    className="h-12 w-12"
    fill="none"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
  >
    <m.circle
      cx="24"
      cy="24"
      r="22"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-primary/40"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
    />
    <m.path
      d="M15 24.5l6 6 12-13"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
    />
  </m.svg>
)

const Missing = () => (
  <section className="relative isolate overflow-x-clip pt-24 pb-24 sm:pt-28 sm:pb-32 lg:pt-32">
    <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
      <div className="border-primary/25 bg-surface-alt/60 mx-auto max-w-3xl rounded-3xl border p-10 text-center sm:p-14">
        <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
          Order lookup
        </div>
        <h1 className="font-display text-primary mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
          We couldn&rsquo;t find that order.
        </h1>
        <p className="text-foreground/75 mx-auto mt-4 max-w-xl">
          If you completed payment, your receipt from Stripe is on its way to your inbox. Otherwise
          your cart is still saved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/cart" size="lg">
            Back to cart
          </Button>
          <Button href="/ask" size="lg" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </div>
  </section>
)

export default function CheckoutSuccessPage({ order }) {
  const { clearCart } = useCart()
  const paid = order?.paid ?? false

  // Stripe has the money; the local cart is done. Only clear on a confirmed
  // payment so a cancelled or pending session keeps the cart intact.
  useEffect(() => {
    if (paid) clearCart()
  }, [paid, clearCart])

  if (!order) return <Missing />

  const { number, email, name, address, lines, subtotal, shipping, total } = order

  return (
    <section className="relative isolate overflow-x-clip pt-24 pb-24 sm:pt-28 sm:pb-32 lg:pt-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-primary mb-6 flex justify-center">
            <CheckMark />
          </div>
          <SplitText
            as="h1"
            by="word"
            inView={false}
            text={paid ? 'Order placed.' : 'Payment pending.'}
            className="font-display text-foreground text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl"
          />
          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-foreground/80 mt-6 text-base leading-relaxed sm:text-lg"
          >
            {paid ? (
              <>
                Thanks{name ? `, ${name.split(' ')[0]}` : ''}. Your order number is{' '}
                <span className="text-primary font-medium">{number}</span>.
                {email && <> A receipt has been sent to {email}.</>}
              </>
            ) : (
              <>
                Your payment is still processing. We&rsquo;ll email {email || 'you'} as soon as it
                clears — no need to order again.
              </>
            )}
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: EASE }}
          className="border-primary/25 bg-surface mx-auto mt-12 max-w-2xl rounded-3xl border p-7 sm:p-8"
        >
          <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            Order summary
          </div>

          <ul className="divide-border mt-4 divide-y">
            {lines.map((line) => {
              const product = getProductById(line.id)
              return (
                <li key={line.key} className="flex items-center gap-4 py-4">
                  <span className="border-primary/20 bg-surface-alt/60 relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl border">
                    {product && (
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        fill
                        quality={70}
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground truncate text-sm font-medium">{line.name}</div>
                    <div className="text-foreground/65 text-xs">
                      {line.option ? `${line.optionLabel}: ${line.option} · ` : ''}Qty {line.qty}
                    </div>
                  </div>
                  <span className="text-foreground text-sm font-medium">{cents(line.amount)}</span>
                </li>
              )
            })}
          </ul>

          <dl className="border-border mt-2 space-y-3 border-t pt-5 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-foreground/70">Subtotal</dt>
              <dd className="text-foreground font-medium">{cents(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-foreground/70">Shipping</dt>
              <dd className="text-foreground font-medium">
                {shipping === 0 ? 'Free' : cents(shipping)}
              </dd>
            </div>
          </dl>
          <div className="border-border mt-5 flex items-baseline justify-between border-t pt-5">
            <span className="text-foreground/70 text-sm">Total</span>
            <span className="font-display text-foreground text-3xl font-medium tracking-tight">
              {cents(total)}
            </span>
          </div>

          {address && (
            <div className="border-border mt-6 border-t pt-6 text-sm">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Shipping to
              </div>
              <address className="text-foreground/80 mt-3 not-italic">
                {name && (
                  <>
                    {name}
                    <br />
                  </>
                )}
                {address.line1}
                {address.line2 && (
                  <>
                    <br />
                    {address.line2}
                  </>
                )}
                <br />
                {address.city}, {address.state} {address.postal_code}
              </address>
            </div>
          )}
        </m.div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/shop" size="lg">
            Continue shopping
          </Button>
          <Button href="/" size="lg" variant="secondary">
            Back to home
          </Button>
        </div>
      </div>
    </section>
  )
}

CheckoutSuccessPage.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.string.isRequired,
    paid: PropTypes.bool.isRequired,
    email: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal_code: PropTypes.string,
    }),
    lines: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        optionLabel: PropTypes.string,
        option: PropTypes.string,
        qty: PropTypes.number.isRequired,
        amount: PropTypes.number.isRequired,
      }),
    ).isRequired,
    subtotal: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }),
}
