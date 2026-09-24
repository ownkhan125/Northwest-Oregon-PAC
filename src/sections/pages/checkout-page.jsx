'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { useCart, SHIPPING_COST } from '@/components/shop/cart-provider'
import { EASE } from '@/animations/variants'
import { formatPrice } from '@/data/products'

const STEPS = [
  {
    title: 'Review your order',
    body: 'Check the items, sizes, and quantities below. You can still edit your cart.',
  },
  {
    title: 'Pay securely with Stripe',
    body: 'You’ll enter your email, shipping address, and card on Stripe’s hosted checkout. We never see your card number.',
  },
  {
    title: 'Get your receipt',
    body: 'Stripe emails a receipt right away. Orders ship from Northwest Oregon within 3–5 business days.',
  },
]

const LockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </svg>
)

export default function CheckoutPage() {
  const { hydrated, lines, subtotal } = useCart()
  const [status, setStatus] = useState('idle') // idle | redirecting | error
  const [errorMessage, setErrorMessage] = useState('')

  const shipping = SHIPPING_COST
  const total = subtotal + shipping
  const redirecting = status === 'redirecting'

  async function startCheckout() {
    if (redirecting || lines.length === 0) return
    setStatus('redirecting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map(({ id, option, qty }) => ({ id, option, qty })),
        }),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.ok || !result.url) {
        setErrorMessage(result.error || 'Something went wrong. Please try again in a moment.')
        setStatus('error')
        return
      }
      window.location.assign(result.url)
    } catch (err) {
      console.error('[CheckoutPage]:', err)
      setErrorMessage('Network error. Please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        number="02"
        title="Almost there."
        description="Review your order, then continue to Stripe to enter your shipping details and pay."
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {hydrated && lines.length === 0 && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="border-primary/25 bg-surface-alt/60 mx-auto max-w-3xl rounded-3xl border p-10 text-center sm:p-14"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Nothing to check out
              </div>
              <h2 className="font-display text-primary mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Your cart is empty.
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="/shop" size="lg">
                  Browse the shop
                </Button>
              </div>
            </m.div>
          )}

          {lines.length > 0 && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between">
                  <div className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                    <span className="text-primary">01</span>
                    <span className="bg-highlight/40 h-px w-8" />
                    <span>Your order</span>
                  </div>
                  <Link
                    href="/cart"
                    className="text-primary hover:text-highlight text-xs underline underline-offset-4 transition-colors"
                  >
                    Edit cart
                  </Link>
                </div>

                <ul className="border-border mt-6 border-t">
                  {lines.map(({ key, product, option, qty, lineTotal }) => (
                    <li
                      key={key}
                      className="border-border flex items-center gap-5 border-b py-5 sm:gap-6"
                    >
                      <span className="border-primary/20 bg-surface-alt/60 relative block h-20 w-20 shrink-0 overflow-hidden rounded-2xl border sm:h-24 sm:w-24">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          quality={70}
                          sizes="96px"
                          className="object-cover"
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-foreground/60 font-mono text-[10px] tracking-[0.25em] uppercase">
                          {product.category}
                        </div>
                        <div className="font-display text-foreground mt-1 text-lg leading-tight font-medium tracking-tight sm:text-xl">
                          {product.name}
                        </div>
                        <div className="text-foreground/70 mt-1 text-sm">
                          {option ? `${product.options?.label}: ${option} · ` : ''}Qty {qty} ·{' '}
                          {formatPrice(product.price)} each
                        </div>
                      </div>
                      <span className="font-display text-foreground text-xl font-medium tracking-tight">
                        {formatPrice(lineTotal)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-12">
                  <div className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                    <span className="text-primary">02</span>
                    <span className="bg-highlight/40 h-px w-8" />
                    <span>How it works</span>
                  </div>
                  <ol className="border-primary/15 bg-primary/[0.02] mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-3">
                    {STEPS.map((step, i) => (
                      <li key={step.title} className="bg-surface/80 p-5">
                        <div className="text-primary font-display text-2xl font-medium">
                          0{i + 1}
                        </div>
                        <div className="text-foreground mt-2 text-sm font-medium">{step.title}</div>
                        <p className="text-foreground/70 mt-1 text-xs leading-relaxed">
                          {step.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="lg:col-span-5">
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                  className="border-primary/25 bg-surface sticky top-28 rounded-3xl border p-7 sm:p-8"
                >
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Order summary
                  </div>

                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="text-foreground/70">Subtotal</dt>
                      <dd className="text-foreground font-medium">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-foreground/70">Shipping</dt>
                      <dd className="text-foreground font-medium">
                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                      </dd>
                    </div>
                  </dl>
                  <div className="border-border mt-6 flex items-baseline justify-between border-t pt-6">
                    <span className="text-foreground/70 text-sm">Total</span>
                    <span className="font-display text-foreground text-3xl font-medium tracking-tight">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="border-primary/30 bg-surface-alt/60 text-foreground mt-6 rounded-2xl border px-4 py-3 text-sm"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      type="button"
                      size="lg"
                      onClick={startCheckout}
                      disabled={redirecting}
                      className="w-full"
                      icon={<LockIcon />}
                    >
                      {redirecting ? 'Taking you to Stripe…' : 'Continue to secure payment'}
                    </Button>
                  </div>

                  <p className="text-foreground/70 mt-5 text-[13px] leading-relaxed">
                    Payments are processed by Stripe. By continuing you agree to our{' '}
                    <Link href="/privacy-policy" className="text-primary hover:text-highlight">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/terms-of-service" className="text-primary hover:text-highlight">
                      Terms of Service
                    </Link>
                    .
                  </p>

                  <ul className="text-foreground/65 mt-6 space-y-2 text-xs">
                    <li>Ships from Northwest Oregon within 3–5 business days.</li>
                    <li>Proceeds support candidate recruitment and campaign support.</li>
                  </ul>
                </m.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
