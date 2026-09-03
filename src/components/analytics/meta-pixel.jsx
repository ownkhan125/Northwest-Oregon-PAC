'use client'

import { Suspense, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView, trackViewContent } from '@/lib/analytics/meta'

const ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ENABLED = process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === 'true'

// PageView fires here rather than in the <head> snippet because App
// Router client navigations never re-run the head script. Firing in one
// place means first load and every SPA navigation are identical.
//
// The effect depends on [pathname, search] so a query-string-only change
// counts as a fresh view — intentional for UTM-tagged ad traffic landing
// repeatedly on the same path.
const RouteTracker = () => {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    trackPageView()
    trackViewContent()
  }, [pathname, search])

  return null
}

const MetaPixel = () => {
  if (!ID || !ENABLED) return null

  return (
    <>
      <noscript>
        {/* Covers script-blocked visitors on first load only. A raw <img>
            is required — next/image cannot render inside <noscript>, and
            this is a 1x1 beacon, not content. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          alt=""
          className="hidden"
          src={`https://www.facebook.com/tr?id=${ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {/* useSearchParams() opts this subtree into client rendering; without
          the boundary the whole route de-opts to CSR at build time. */}
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  )
}

export default MetaPixel
