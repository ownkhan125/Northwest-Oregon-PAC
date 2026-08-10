'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { cn } from '@/lib/cn'
import { getResolvedTheme } from '@/lib/resolved-theme'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
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

const Logo = ({ className, size = 'md', priority = false }) => {
  const imgCls = SIZE_CLASSES[size] ?? SIZE_CLASSES.md
  const sizeHint = SIZE_HINTS[size] ?? SIZE_HINTS.md

  // Sync artwork visibility to the RESOLVED theme (see resolved-theme.js).
  // Checking only `.dark`/`.light` misses the case where the CSS falls back
  // to `@media (prefers-color-scheme: dark)` because no class is set —
  // which happens if ThemeInit is blocked, an extension strips inline
  // scripts, or a bad localStorage value is skipped. In that case the
  // page paints dark but the logo would otherwise stay on the dark
  // (green-on-cream) artwork and desync until the second toggle click.
  //
  // The MutationObserver + matchMedia listener keep the state in lockstep
  // with any subsequent change (toggle click, OS-level theme flip, dev-
  // tools edit). `theme=null` on server + first render matches the SSR
  // output — no hydration warning.
  const [theme, setTheme] = useState(null)
  useIsomorphicLayoutEffect(() => {
    const html = document.documentElement
    const read = () => setTheme(getResolvedTheme(html))
    read()
    const observer = new MutationObserver(read)
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', read)
    return () => {
      observer.disconnect()
      mql.removeEventListener('change', read)
    }
  }, [])

  const styleFor = (variant) => {
    if (theme === null) return undefined
    return { display: theme === variant ? 'block' : 'none' }
  }

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
        priority={priority}
        quality={90}
        sizes={sizeHint}
        className={cn('block dark:hidden', imgCls)}
        style={styleFor('light')}
      />
      {/* Light artwork (cream mark + cream text) — for dark backgrounds */}
      <Image
        src={logoLight}
        alt=""
        aria-hidden
        priority={priority}
        quality={90}
        sizes={sizeHint}
        className={cn('hidden dark:block', imgCls)}
        style={styleFor('dark')}
      />
    </Link>
  )
}

Logo.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  // `priority` should only be true where the logo is above the fold on
  // first paint — the Navbar. The Footer logo is far below the fold and
  // preloading it wastes ~15KB of critical-path bandwidth.
  priority: PropTypes.bool,
}

export default Logo
