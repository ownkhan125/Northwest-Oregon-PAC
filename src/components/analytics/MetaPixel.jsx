'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

const ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true'

// Base fbq init + initial PageView + noscript fallback live in
// <head>/<body> via the root layout (server-rendered). This client
// component only fires PageView on SPA route changes; the initial
// PageView is already dispatched by the inline <head> script, so we
// skip the first effect to avoid double-counting.
export function MetaPixel() {
  const pathname = usePathname()
  const search = useSearchParams()
  const skipInitialRef = useRef(true)

  useEffect(() => {
    if (skipInitialRef.current) {
      skipInitialRef.current = false
      return
    }
    if (!ID || !ENABLED) return
    if (typeof window === 'undefined' || !window.fbq) return
    window.fbq('track', 'PageView')
  }, [pathname, search])

  return null
}
