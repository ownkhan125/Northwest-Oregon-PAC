'use client'

import { useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { AnimatePresence, m } from 'motion/react'
import Button from '@/components/ui/button'
import Breadcrumb from '@/components/ui/breadcrumb'
import CivicIcon from '@/components/ui/civic-icon'
import SplitText from '@/components/ui/split-text'
import ProductCard, { productShape } from '@/components/shop/product-card'
import { useCart, MAX_LINE_QTY } from '@/components/shop/cart-provider'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/products'

export default function ShopDetailPage({ product, related = [] }) {
  const { name, category, price, description, details, features, options, icon, badge, inStock } =
    product
  const { addItem, qtyOf } = useCart()

  const [option, setOption] = useState(options?.values?.[0] ?? null)
  const [qty, setQty] = useState(1)
  // Only surfaces the "in your cart" confirmation after a click on this page,
  // not merely because the line already existed from a previous visit.
  const [added, setAdded] = useState(false)

  const canAdd = inStock && (!options || option)
  const subtotal = price * qty
  const inCartQty = qtyOf(product.id, option)

  const onAdd = () => {
    if (!canAdd) return
    addItem(product.id, option, qty)
    setAdded(true)
  }

  return (
    <>
      <section className="relative isolate overflow-x-clip pt-24 pb-10 sm:pt-28 lg:pt-32">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Breadcrumb
              items={[{ label: 'Shop', href: '/shop' }, { label: category }, { label: name }]}
            />
          </m.div>

          <div className="mt-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <SplitText
                as="h1"
                by="word"
                staggerChildren={0.05}
                inView={false}
                text={name}
                className="font-display text-foreground text-[clamp(2rem,6vw,5rem)] leading-[1.02] font-medium tracking-tight"
              />
              <m.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-foreground/75 mt-6 max-w-2xl text-base sm:text-lg"
              >
                {description}
              </m.p>
            </div>
          </div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="from-primary/60 via-primary/20 mt-10 h-px origin-left bg-gradient-to-r to-transparent"
          />
        </div>
      </section>

      <section className="relative isolate overflow-x-clip pb-16 sm:pb-20 lg:pb-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                className="border-primary/25 bg-surface-alt/60 text-primary relative aspect-[4/3] w-full overflow-hidden rounded-3xl border"
              >
                <div className="absolute inset-0 grid place-items-center">
                  <CivicIcon src={icon} className="h-40 w-40 sm:h-52 sm:w-52 lg:h-64 lg:w-64" />
                </div>
                {badge && (
                  <span className="border-primary/40 bg-surface/85 text-primary absolute top-5 left-5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
                    {badge}
                  </span>
                )}
                {!inStock && (
                  <span className="border-border bg-surface/85 text-muted absolute top-5 right-5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
                    Sold out
                  </span>
                )}
              </m.div>

              <m.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                variants={stagger}
                className="mt-12"
              >
                <m.div
                  variants={fadeUp}
                  className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase"
                >
                  About this item
                </m.div>
                <m.p
                  variants={fadeUp}
                  className="text-foreground/80 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
                >
                  {details ?? description}
                </m.p>
              </m.div>

              {features?.length > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.8, ease: EASE }}
                  className="border-primary/15 bg-primary/[0.02] mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2"
                >
                  {features.map((f) => (
                    <div key={f} className="bg-surface/80 flex items-start gap-3 p-5">
                      <span
                        aria-hidden
                        className="bg-primary mt-2 block h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span className="text-foreground/85 text-sm sm:text-base">{f}</span>
                    </div>
                  ))}
                </m.div>
              )}
            </div>

            <div className="lg:col-span-5">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                className="border-primary/25 bg-surface sticky top-28 rounded-3xl border p-7 sm:p-8"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  {category}
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-display text-foreground text-4xl font-medium tracking-tight sm:text-5xl">
                    {formatPrice(price)}
                  </span>
                  <span className="text-muted text-xs tracking-[0.2em] uppercase">USD</span>
                </div>

                {options && (
                  <fieldset className="mt-8">
                    <legend className="text-foreground/70 font-mono text-[10px] tracking-[0.25em] uppercase">
                      {options.label}
                      {option && <span className="text-primary ml-2 normal-case">· {option}</span>}
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {options.values.map((v) => {
                        const active = v === option
                        return (
                          <button
                            key={v}
                            type="button"
                            aria-pressed={active}
                            onClick={() => setOption(v)}
                            className={cn(
                              'min-w-11 cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                              active
                                ? 'border-primary bg-primary text-primary-fg'
                                : 'border-border text-foreground/75 hover:border-primary/50 hover:text-primary',
                            )}
                          >
                            {v}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>
                )}

                <div className="mt-8">
                  <div className="text-foreground/70 font-mono text-[10px] tracking-[0.25em] uppercase">
                    Quantity
                  </div>
                  <div className="border-border mt-3 inline-flex items-center rounded-full border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={qty <= 1}
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="text-foreground hover:text-primary grid h-11 w-11 cursor-pointer place-items-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      className="font-display text-foreground w-10 text-center text-lg font-medium"
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      disabled={qty >= MAX_LINE_QTY}
                      onClick={() => setQty((q) => Math.min(MAX_LINE_QTY, q + 1))}
                      className="text-foreground hover:text-primary grid h-11 w-11 cursor-pointer place-items-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="border-border mt-8 flex items-center justify-between border-t pt-6">
                  <span className="text-foreground/70 text-sm">Subtotal</span>
                  <span className="font-display text-foreground text-2xl font-medium tracking-tight">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    size="lg"
                    onClick={onAdd}
                    disabled={!canAdd}
                    aria-disabled={!canAdd}
                    className={cn('w-full', !canAdd && 'cursor-not-allowed opacity-50')}
                  >
                    {inStock ? 'Add to cart' : 'Sold out'}
                    {inStock && (
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
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    )}
                  </Button>

                  <AnimatePresence>
                    {added && inCartQty > 0 && (
                      <m.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        role="status"
                        className="text-foreground/80 mt-4 text-center text-sm"
                      >
                        {inCartQty} in your cart
                        {option ? ` · ${options.label}: ${option}` : ''}
                        {' · '}
                        <Link
                          href="/cart"
                          className="text-primary hover:text-highlight underline underline-offset-4"
                        >
                          View cart
                        </Link>
                      </m.p>
                    )}
                  </AnimatePresence>

                  {!inStock && (
                    <p className="text-foreground/70 mt-4 text-center text-sm">
                      Next print run is on order.{' '}
                      <Link href="/ask" className="text-primary underline underline-offset-4">
                        Ask us
                      </Link>{' '}
                      to be notified.
                    </p>
                  )}
                </div>

                <ul className="text-foreground/65 mt-8 space-y-2 text-xs">
                  <li>Ships from Northwest Oregon within 3–5 business days.</li>
                  <li>Proceeds support candidate recruitment and campaign support.</li>
                </ul>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                  <span className="text-primary">02</span>
                  <span className="bg-highlight/40 h-px w-8" />
                  <span>You might also like</span>
                </div>
                <h2 className="font-display text-foreground mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                  More from the shop
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-primary hover:text-highlight inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
              >
                All products
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
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </m.div>
          </div>
        </section>
      )}
    </>
  )
}

ShopDetailPage.propTypes = {
  product: productShape.isRequired,
  related: PropTypes.arrayOf(productShape),
}
