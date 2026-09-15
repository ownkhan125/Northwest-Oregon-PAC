'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Radio from '@/components/ui/radio'
import SplitText from '@/components/ui/split-text'
import { useCart, shippingFor, SHIPPING_RATES } from '@/components/shop/cart-provider'
import { EASE } from '@/animations/variants'
import { isValidUSZip, US_ZIP_ERROR } from '@/lib/form'
import { formatPrice } from '@/data/products'
import { US_STATES } from '@/data/us-states'

const REQUIRED_FIELDS = {
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  email: 'Email address is required.',
  address1: 'Street address is required.',
  city: 'City is required.',
  state: 'Select a state.',
  zip: 'ZIP code is required.',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Client-side only — there is no order backend yet. Same shape as the
// validators in lib/form so a real submit can reuse it.
function validateCheckout(payload) {
  const errors = {}
  for (const [key, message] of Object.entries(REQUIRED_FIELDS)) {
    if (!payload[key]) errors[key] = message
  }
  if (payload.email && !EMAIL_RE.test(payload.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (payload.zip && !isValidUSZip(payload.zip)) {
    errors.zip = US_ZIP_ERROR
  }
  return errors
}

const newOrderNumber = () => `NWOP-${Date.now().toString(36).toUpperCase().slice(-6)}`

const SectionLabel = ({ number, children }) => (
  <div className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
    <span className="text-primary">{number}</span>
    <span className="bg-highlight/40 h-px w-8" />
    <span>{children}</span>
  </div>
)

const SummaryLines = ({ lines }) => (
  <ul className="divide-border divide-y">
    {lines.map(({ key, product, option, qty, lineTotal }) => (
      <li key={key} className="flex items-center gap-4 py-4">
        <span className="border-primary/20 bg-surface-alt/60 relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl border">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            quality={70}
            sizes="56px"
            className="object-cover"
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm font-medium">{product.name}</div>
          <div className="text-foreground/65 text-xs">
            {option ? `${product.options?.label}: ${option} · ` : ''}Qty {qty}
          </div>
        </div>
        <span className="text-foreground text-sm font-medium">{formatPrice(lineTotal)}</span>
      </li>
    ))}
  </ul>
)

const Totals = ({ subtotal, shipping, total, rateLabel }) => (
  <>
    <dl className="border-border mt-2 space-y-3 border-t pt-5 text-sm">
      <div className="flex items-center justify-between">
        <dt className="text-foreground/70">Subtotal</dt>
        <dd className="text-foreground font-medium">{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-foreground/70">{rateLabel} shipping</dt>
        <dd className="text-foreground font-medium">
          {shipping === 0 ? 'Free' : formatPrice(shipping)}
        </dd>
      </div>
    </dl>
    <div className="border-border mt-5 flex items-baseline justify-between border-t pt-5">
      <span className="text-foreground/70 text-sm">Total</span>
      <span className="font-display text-foreground text-3xl font-medium tracking-tight">
        {formatPrice(total)}
      </span>
    </div>
  </>
)

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

const Confirmation = ({ order }) => (
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
          text="Order placed."
          className="font-display text-foreground text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl"
        />
        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-foreground/80 mt-6 text-base leading-relaxed sm:text-lg"
        >
          Thanks, {order.firstName}. Your order number is{' '}
          <span className="text-primary font-medium">{order.number}</span>. We&rsquo;ll send a
          confirmation to {order.email} once the order ships.
        </m.p>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="border-primary/25 bg-surface-alt/60 text-foreground/75 mx-auto mt-6 inline-block rounded-full border px-4 py-2 text-xs"
        >
          Preview checkout — no payment was collected and nothing will ship.
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
        className="border-primary/25 bg-surface mx-auto mt-12 max-w-2xl rounded-3xl border p-7 sm:p-8"
      >
        <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
          Order summary
        </div>
        <div className="mt-4">
          <SummaryLines lines={order.lines} />
        </div>
        <Totals
          subtotal={order.subtotal}
          shipping={order.shipping}
          total={order.total}
          rateLabel={order.rateLabel}
        />
        <div className="border-border mt-6 border-t pt-6 text-sm">
          <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            Shipping to
          </div>
          <address className="text-foreground/80 mt-3 not-italic">
            {order.firstName} {order.lastName}
            <br />
            {order.address1}
            {order.address2 && (
              <>
                <br />
                {order.address2}
              </>
            )}
            <br />
            {order.city}, {order.state} {order.zip}
          </address>
        </div>
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

export default function CheckoutPage() {
  const { hydrated, lines, subtotal, clearCart } = useCart()
  const [rateId, setRateId] = useState('standard')
  const [fieldErrors, setFieldErrors] = useState({})
  const [order, setOrder] = useState(null)

  const shipping = shippingFor(subtotal, rateId)
  const total = subtotal + shipping
  const rateLabel = SHIPPING_RATES[rateId].label

  const clearFieldError = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = Object.fromEntries(
      ['firstName', 'lastName', 'email', 'address1', 'address2', 'city', 'state', 'zip'].map(
        (k) => [k, String(data.get(k) ?? '').trim()],
      ),
    )

    const errs = validateCheckout(payload)
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      const firstBad = Object.keys(errs)[0]
      form.querySelector(`[name="${firstBad}"], #${firstBad}`)?.focus()
      return
    }
    setFieldErrors({})

    // Snapshot before clearing — the confirmation renders from this, not the
    // (now empty) cart.
    setOrder({
      ...payload,
      number: newOrderNumber(),
      lines,
      subtotal,
      shipping,
      total,
      rateLabel,
    })
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (order) return <Confirmation order={order} />

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        number="02"
        title="Almost there."
        description="Tell us where to send it. Payment isn't live yet — this is a preview of the checkout flow, so nothing is charged."
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
                <form onSubmit={onSubmit} noValidate className="space-y-12">
                  <div>
                    <SectionLabel number="01">Contact</SectionLabel>
                    <div className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input
                          label="First name"
                          name="firstName"
                          required
                          autoComplete="given-name"
                          error={fieldErrors.firstName}
                          onChange={() => clearFieldError('firstName')}
                        />
                        <Input
                          label="Last name"
                          name="lastName"
                          required
                          autoComplete="family-name"
                          error={fieldErrors.lastName}
                          onChange={() => clearFieldError('lastName')}
                        />
                      </div>
                      <Input
                        label="Email address"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        error={fieldErrors.email}
                        onChange={() => clearFieldError('email')}
                      />
                    </div>
                  </div>

                  <div>
                    <SectionLabel number="02">Shipping address</SectionLabel>
                    <div className="mt-6 space-y-5">
                      <Input
                        label="Street address"
                        name="address1"
                        required
                        autoComplete="address-line1"
                        error={fieldErrors.address1}
                        onChange={() => clearFieldError('address1')}
                      />
                      <Input
                        label="Apt, suite, etc. — optional"
                        name="address2"
                        autoComplete="address-line2"
                      />
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <Input
                            label="City"
                            name="city"
                            required
                            autoComplete="address-level2"
                            error={fieldErrors.city}
                            onChange={() => clearFieldError('city')}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Select
                            label="State"
                            name="state"
                            required
                            defaultValue="OR"
                            placeholder="State"
                            onChange={() => clearFieldError('state')}
                          >
                            {US_STATES.map((s) => (
                              <option key={s.code} value={s.code}>
                                {s.name}
                              </option>
                            ))}
                          </Select>
                          {fieldErrors.state && (
                            <p role="alert" className="mt-1.5 text-xs text-red-600">
                              {fieldErrors.state}
                            </p>
                          )}
                        </div>
                        <div className="sm:col-span-1">
                          <Input
                            label="ZIP"
                            name="zip"
                            required
                            inputMode="numeric"
                            maxLength={5}
                            autoComplete="postal-code"
                            placeholder="97005"
                            error={fieldErrors.zip}
                            onChange={() => clearFieldError('zip')}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <SectionLabel number="03">Shipping method</SectionLabel>
                    <div className="border-primary/15 bg-primary/[0.02] mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border">
                      {Object.values(SHIPPING_RATES).map((rate) => {
                        const cost = shippingFor(subtotal, rate.id)
                        return (
                          <div
                            key={rate.id}
                            className="bg-surface/80 flex items-center justify-between gap-4 p-5"
                          >
                            <Radio
                              name="shippingMethod"
                              value={rate.id}
                              checked={rateId === rate.id}
                              onChange={() => setRateId(rate.id)}
                              label={
                                <span>
                                  <span className="text-foreground font-medium">{rate.label}</span>
                                  <span className="text-foreground/60 block text-xs">
                                    {rate.detail}
                                  </span>
                                </span>
                              }
                            />
                            <span className="text-foreground text-sm font-medium">
                              {cost === 0 ? 'Free' : formatPrice(cost)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <SectionLabel number="04">Payment</SectionLabel>
                    <div className="border-primary/25 bg-surface-alt/50 mt-6 rounded-2xl border p-6">
                      <div className="text-foreground font-medium">
                        Payment isn&rsquo;t live yet.
                      </div>
                      <p className="text-foreground/75 mt-2 text-sm leading-relaxed">
                        This is a preview of the checkout flow. No card details are collected and no
                        charge is made when you place the order. Card and PayPal payment will appear
                        here once the store goes live.
                      </p>
                    </div>
                  </div>

                  <div className="border-primary/15 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
                    <p className="text-foreground/70 max-w-md text-[13px] leading-relaxed">
                      By placing your order, you agree to our{' '}
                      <Link href="/privacy-policy" className="text-primary hover:text-highlight">
                        Privacy Policy
                      </Link>{' '}
                      and{' '}
                      <Link href="/terms-of-service" className="text-primary hover:text-highlight">
                        Terms of Service
                      </Link>
                      .
                    </p>
                    <Button type="submit" size="lg">
                      Place order · {formatPrice(total)}
                    </Button>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-5">
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                  className="border-primary/25 bg-surface sticky top-28 rounded-3xl border p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                      Order summary
                    </div>
                    <Link
                      href="/cart"
                      className="text-primary hover:text-highlight text-xs underline underline-offset-4 transition-colors"
                    >
                      Edit cart
                    </Link>
                  </div>
                  <div className="mt-2">
                    <SummaryLines lines={lines} />
                  </div>
                  <Totals
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                    rateLabel={rateLabel}
                  />
                </m.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
