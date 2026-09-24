'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { useCart, MAX_LINE_QTY, SHIPPING_COST } from '@/components/shop/cart-provider'
import { EASE } from '@/animations/variants'
import { formatPrice } from '@/data/products'

const ArrowIcon = () => (
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
)

export default function CartPage() {
  const { hydrated, lines, count, subtotal, updateQty, removeItem, clearCart } = useCart()

  const shipping = SHIPPING_COST
  const total = subtotal + shipping

  return (
    <>
      <PageHeader
        eyebrow="Cart"
        number="01"
        title="Your cart."
        description="Review what you've picked out. Shipping is free on every order."
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Cart is read from localStorage after mount — hold the empty state
              until then so it doesn't flash for returning visitors. */}
          {hydrated && lines.length === 0 && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="border-primary/25 bg-surface-alt/60 mx-auto max-w-3xl rounded-3xl border p-10 text-center sm:p-14"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Nothing here yet
              </div>
              <h2 className="font-display text-primary mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
                Your cart is empty.
              </h2>
              <p className="text-foreground/75 mx-auto mt-4 max-w-xl">
                Logo tees, caps, and mugs — every purchase funds the work across Northwest Oregon.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button href="/shop" size="lg" icon={<ArrowIcon />}>
                  Browse the shop
                </Button>
              </div>
            </m.div>
          )}

          {lines.length > 0 && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between">
                  <div className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                    <span className="text-primary">01</span>
                    <span className="bg-highlight/40 h-px w-8" />
                    <span>
                      {count} {count === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-foreground/60 hover:text-primary cursor-pointer font-mono text-[10px] tracking-[0.25em] uppercase transition-colors"
                  >
                    Clear cart
                  </button>
                </div>

                <ul className="border-border mt-6 border-t">
                  <AnimatePresence initial={false}>
                    {lines.map(({ key, product, option, qty, lineTotal }) => (
                      <m.li
                        key={key}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="border-border grid grid-cols-[auto_1fr] items-center gap-5 overflow-hidden border-b py-6 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-8"
                      >
                        <Link
                          href={`/shop/${product.id}`}
                          aria-label={`View ${product.name}`}
                          className="border-primary/20 bg-surface-alt/60 hover:border-primary/60 relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-colors sm:h-24 sm:w-24"
                        >
                          <Image
                            src={product.image}
                            alt={product.imageAlt}
                            fill
                            quality={70}
                            sizes="96px"
                            className="object-cover"
                          />
                        </Link>

                        <div className="min-w-0">
                          <div className="text-foreground/60 font-mono text-[10px] tracking-[0.25em] uppercase">
                            {product.category}
                          </div>
                          <Link
                            href={`/shop/${product.id}`}
                            className="font-display text-foreground hover:text-primary mt-1 block text-lg leading-tight font-medium tracking-tight transition-colors sm:text-xl"
                          >
                            {product.name}
                          </Link>
                          <div className="text-foreground/70 mt-1 text-sm">
                            {option && (
                              <span>
                                {product.options?.label}: {option}
                                <span aria-hidden> · </span>
                              </span>
                            )}
                            {formatPrice(product.price)} each
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(key)}
                            className="text-foreground/55 hover:text-primary mt-2 cursor-pointer text-xs underline underline-offset-4 transition-colors sm:hidden"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-start">
                          <div
                            className="border-border inline-flex items-center rounded-full border"
                            role="group"
                            aria-label={`Quantity for ${product.name}`}
                          >
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => updateQty(key, qty - 1)}
                              className="text-foreground hover:text-primary grid h-10 w-10 cursor-pointer place-items-center transition-colors"
                            >
                              −
                            </button>
                            <span className="font-display text-foreground w-8 text-center font-medium">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              disabled={qty >= MAX_LINE_QTY}
                              onClick={() => updateQty(key, qty + 1)}
                              className="text-foreground hover:text-primary grid h-10 w-10 cursor-pointer place-items-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-display text-foreground text-xl font-medium tracking-tight sm:hidden">
                            {formatPrice(lineTotal)}
                          </span>
                        </div>

                        <div className="hidden flex-col items-end gap-2 sm:flex">
                          <span className="font-display text-foreground text-xl font-medium tracking-tight">
                            {formatPrice(lineTotal)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(key)}
                            aria-label={`Remove ${product.name} from cart`}
                            className="text-foreground/55 hover:text-primary cursor-pointer text-xs underline underline-offset-4 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <Link
                  href="/shop"
                  className="text-primary hover:text-highlight mt-6 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
                >
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
                    <path d="M19 12H5M11 19l-7-7 7-7" />
                  </svg>
                  Continue shopping
                </Link>
              </div>

              <div className="lg:col-span-4">
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

                  <div className="mt-6">
                    <Button href="/checkout" size="lg" className="w-full" icon={<ArrowIcon />}>
                      Check out
                    </Button>
                  </div>

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
