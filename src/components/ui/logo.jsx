'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'

const Logo = ({ className }) => (
  <Link href="/" className={cn('group inline-flex cursor-pointer items-center gap-2', className)}>
    <span className="from-cyan to-mint relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br">
      <span className="bg-navy-deep absolute inset-[2px] rounded-full" />
      <svg viewBox="0 0 24 24" fill="none" className="text-mint relative h-4 w-4">
        <path
          d="M4 18L12 4l8 14M8 18h8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
    <span className="font-display text-foreground text-lg leading-none font-semibold tracking-tight">
      Morgan<span className="text-mint">.</span>Hale
    </span>
  </Link>
)

Logo.propTypes = {
  className: PropTypes.string,
}

export default Logo
