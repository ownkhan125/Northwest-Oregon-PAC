'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

const Logo = ({ className }) => (
  <Link
    href="/"
    aria-label="Northwest Oregon PAC — Home"
    className={cn('group inline-flex cursor-pointer items-center gap-3', className)}
  >
    <span className="border-primary/40 bg-surface relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border shadow-sm">
      <svg viewBox="0 0 32 32" fill="none" className="text-primary h-5 w-5">
        {/* NW mountain mark */}
        <path
          d="M4 24 L11 12 L16 20 L21 10 L28 24 Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="24" cy="9" r="1.6" fill="currentColor" />
      </svg>
    </span>
    <span className="font-display text-foreground flex flex-col leading-tight">
      <span className="text-[13px] font-semibold tracking-tight sm:text-sm">Northwest Oregon</span>
      <span className="text-highlight text-[10px] font-medium tracking-[0.35em] uppercase">
        PAC · #25045
      </span>
    </span>
  </Link>
)

Logo.propTypes = {
  className: PropTypes.string,
}

export default Logo
