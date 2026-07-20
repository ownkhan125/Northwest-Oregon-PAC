'use client'

import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'
import logoDark from '@/assets/icons/nwop-logo-dark.png'
import logoLight from '@/assets/icons/nwop-logo-light.png'

// The trimmed source PNGs (3454x1024, ratio 3.373:1) have only a 3% safe-margin
// around the mark, so container height ≈ visible mark height. Sizes are
// selected to sit proportionally against the Donate button (h-11 = 44px) and
// leave a small breathing gap inside the navbar pill.
//   sm  — 32 → 36 → 40 px  (condensed strips, badges)
//   md  — 40 → 44 → 48 px  (navbar / funnel top strip — default)
//   lg  — 56 → 64 → 80 px  (footer brand statement)
const SIZE_CLASSES = {
  sm: 'h-8 w-auto sm:h-9 md:h-10',
  md: 'h-10 w-auto sm:h-11 md:h-12',
  lg: 'h-14 w-auto sm:h-16 md:h-20',
}

// Responsive width hints for next/image srcset selection. Widths match the
// mark's 3.373:1 aspect at each breakpoint height above so the browser fetches
// the smallest variant that still covers a 2x DPI display.
const SIZE_HINTS = {
  sm: '(min-width: 768px) 135px, (min-width: 640px) 121px, 108px',
  md: '(min-width: 768px) 162px, (min-width: 640px) 148px, 135px',
  lg: '(min-width: 768px) 270px, (min-width: 640px) 216px, 189px',
}

const Logo = ({ className, size = 'md' }) => {
  const imgCls = SIZE_CLASSES[size] ?? SIZE_CLASSES.md
  const sizeHint = SIZE_HINTS[size] ?? SIZE_HINTS.md
  return (
    <Link
      href="/"
      aria-label="Northwest Oregon PAC — Home"
      className={cn('group inline-flex shrink-0 cursor-pointer items-center', className)}
    >
      {/* Dark artwork (green mark + green text) — for light backgrounds */}
      <Image
        src={logoDark}
        alt="Northwest Oregon PAC"
        priority
        quality={90}
        sizes={sizeHint}
        className={cn('block dark:hidden', imgCls)}
      />
      {/* Light artwork (cream mark + cream text) — for dark backgrounds */}
      <Image
        src={logoLight}
        alt=""
        aria-hidden
        priority
        quality={90}
        sizes={sizeHint}
        className={cn('hidden dark:block', imgCls)}
      />
    </Link>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
}

export default Logo
