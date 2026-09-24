'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import ProductCard from '@/components/shop/product-card'
import { useCart } from '@/components/shop/cart-provider'
import { useToast } from '@/components/ui/toast'
import { stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { products, formatPrice, PRODUCT_CATEGORIES } from '@/data/products'

// Grid cards add a product's first option (e.g. size XS); the detail page is
// where a specific option gets picked.
const defaultOption = (product) => product.options?.values?.[0] ?? null

export default function ShopPage() {
  const [category, setCategory] = useState('All')
  const { count: cartCount, subtotal: cartTotal, addItem, qtyOf } = useCart()
  const { toast } = useToast()

  const visible = useMemo(
    () => (category === 'All' ? products : products.filter((p) => p.category === category)),
    [category],
  )

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id)
    if (!product) return
    const option = defaultOption(product)
    addItem(id, option, 1)
    toast({
      eyebrow: 'Added to cart',
      title: product.name,
      description: option ? `${product.options.label}: ${option}` : undefined,
      action: { label: 'View cart', href: '/cart' },
    })
  }

  return (
    <>
      <PageHeader
        eyebrow="Shop"
        number="01"
        title="Wear the work. Fund the work."
        description="Every purchase supports candidate recruitment, campaign support, and strategic messaging across Northwest Oregon. Printed and shipped from the region."
        accent="/icons/money-bag.svg"
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div
              role="tablist"
              aria-label="Filter products by category"
              className="flex flex-wrap gap-2"
            >
              {PRODUCT_CATEGORIES.map((c) => {
                const active = c === category
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCategory(c)}
                    className={cn(
                      'cursor-pointer rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-300',
                      active
                        ? 'border-primary bg-primary text-primary-fg'
                        : 'border-border text-foreground/70 hover:border-primary/50 hover:text-primary',
                    )}
                  >
                    {c}
                  </button>
                )
              })}
            </div>

            <AnimatePresence>
              {cartCount > 0 && (
                <m.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="self-start sm:self-auto"
                >
                  <Link
                    href="/cart"
                    aria-live="polite"
                    className="border-primary/25 bg-surface-alt/60 text-foreground/80 hover:border-primary inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-colors"
                  >
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Cart</span>
                    <span aria-hidden className="bg-border h-3 w-px" />
                    <span>
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                    <span aria-hidden className="bg-border h-3 w-px" />
                    <span className="text-primary font-medium">{formatPrice(cartTotal)}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>

          <m.div
            key={category}
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                inCart={qtyOf(product.id, defaultOption(product)) > 0}
                onAdd={addToCart}
              />
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border-primary/25 bg-surface-alt/50 mt-20 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Bulk orders &amp; custom prints
              </div>
              <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Outfitting a whole campaign?
              </h2>
              <p className="text-foreground/75 mt-3 max-w-xl text-sm sm:text-base">
                We can produce tees, caps, and mugs at volume for candidates and community groups.
                Tell us what you need and we&rsquo;ll send a quote.
              </p>
            </div>
            <Link
              href="/ask"
              className="border-primary bg-primary text-primary-fg hover:bg-primary/90 inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm tracking-widest uppercase transition-colors"
            >
              Request a quote
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
          </m.div>
        </div>
      </section>
    </>
  )
}
