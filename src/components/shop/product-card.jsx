'use client'

import Link from 'next/link'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { m } from 'motion/react'
import Card from '@/components/ui/card'
import { cardReveal } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { formatPrice } from '@/data/products'

/**
 * Catalog card. The whole card links to the product page; when `onAdd` is
 * provided an add-to-cart button is layered above that link.
 */
const ProductCard = ({ product, inCart = false, onAdd }) => {
  const { id, name, category, price, description, image, imageAlt, badge, inStock } = product
  const href = `/shop/${id}`

  return (
    <m.div variants={cardReveal} className="h-full">
      <Card tilt={false} className="h-full rounded-3xl">
        <div className="bg-surface-alt/60 relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            quality={75}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
          {badge && (
            <span className="border-primary/40 bg-surface/85 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
              {badge}
            </span>
          )}
          {!inStock && (
            <span className="border-border bg-surface/85 text-muted absolute top-4 right-4 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
              Sold out
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
          <div className="text-foreground/60 group-hover:text-primary-fg/70 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-500">
            {category}
          </div>
          <h3 className="font-display text-foreground group-hover:text-primary-fg text-xl leading-tight font-medium tracking-tight transition-colors duration-500 sm:text-2xl">
            {name}
          </h3>
          <p className="text-foreground/75 group-hover:text-primary-fg/85 text-sm transition-colors duration-500 sm:text-base">
            {description}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-3">
            <span className="font-display text-foreground group-hover:text-primary-fg text-2xl font-medium tracking-tight transition-colors duration-500">
              {formatPrice(price)}
            </span>
            {onAdd ? (
              <button
                type="button"
                disabled={!inStock}
                onClick={() => onAdd(id)}
                aria-label={inCart ? `${name} added to cart` : `Add ${name} to cart`}
                className={cn(
                  'relative z-30 inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-[0.2em] uppercase transition-colors duration-300',
                  'disabled:cursor-not-allowed disabled:opacity-50',
                  inCart
                    ? 'border-accent bg-accent text-foreground'
                    : 'border-primary/40 text-primary hover:border-primary hover:bg-primary hover:text-primary-fg group-hover:border-primary-fg/40 group-hover:text-primary-fg group-hover:hover:bg-primary-fg/10',
                )}
              >
                {inCart ? 'Added' : 'Add to cart'}
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
                  {inCart ? <path d="M5 12l5 5L20 7" /> : <path d="M12 5v14M5 12h14" />}
                </svg>
              </button>
            ) : (
              <span
                aria-hidden
                className="text-primary group-hover:text-accent inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors duration-500"
              >
                View
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </div>
        </div>

        <Link
          href={href}
          aria-label={`View product: ${name}`}
          className="focus-visible:ring-primary/40 absolute inset-0 z-20 rounded-3xl focus-visible:ring-2 focus-visible:outline-none"
        >
          <span className="sr-only">{name}</span>
        </Link>
      </Card>
    </m.div>
  )
}

export const productShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  details: PropTypes.string,
  features: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    label: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  // Static image import ({ src, width, height, blurDataURL }) or a plain URL.
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  imageAlt: PropTypes.string.isRequired,
  badge: PropTypes.string,
  inStock: PropTypes.bool.isRequired,
})

ProductCard.propTypes = {
  product: productShape.isRequired,
  inCart: PropTypes.bool,
  onAdd: PropTypes.func,
}

export default ProductCard
