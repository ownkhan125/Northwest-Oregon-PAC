'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import { AnimatePresence, m } from 'motion/react'
import { useCart } from '@/components/shop/cart-provider'
import { cn } from '@/lib/cn'

/**
 * Navbar cart link. Styled to sit next to ThemeToggle; the count badge only
 * appears once something is in the cart.
 */
const CartButton = ({ className, onClick }) => {
  const { count } = useCart()

  return (
    <Link
      href="/cart"
      onClick={onClick}
      aria-label={count > 0 ? `Cart, ${count} ${count === 1 ? 'item' : 'items'}` : 'Cart'}
      className={cn(
        'text-foreground hover:border-primary/50 hover:text-primary border-border relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors',
        className,
      )}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 8h12l-1 12H7L6 8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <AnimatePresence>
        {count > 0 && (
          <m.span
            key={count}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            aria-hidden
            className="bg-primary text-primary-fg absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full px-1 font-mono text-[10px] leading-none font-medium"
          >
            {count > 9 ? '9+' : count}
          </m.span>
        )}
      </AnimatePresence>
    </Link>
  )
}

CartButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default CartButton
