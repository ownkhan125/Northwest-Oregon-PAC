'use client'

import { Suspense, useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pac } from '@/data/pac'
import {
  trackCTA,
  trackDonateClick,
  trackDownload,
  trackEmail,
  trackEngagedVisit,
  trackOutbound,
  trackPhone,
  trackScrollDepth,
  trackSocial,
} from '@/lib/analytics/meta'

// Mounted once in the root layout. Adds scroll-depth, dwell-time, and
// link-click tracking with zero markup changes anywhere else in the app.

const SCROLL_THRESHOLDS = [25, 50, 75, 90]
const DWELL_THRESHOLDS = [30, 60, 120]

const DOC_EXTENSIONS = /\.(pdf|zip|doc|docx|xls|xlsx|ppt|pptx|csv)$/i

// Derived from the single source of truth so adding a platform to
// pac.socials is all that is needed — never hardcode hostnames here.
const SOCIAL_HOSTS = Object.values(pac.socials ?? {})
  .map((url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return null
    }
  })
  .filter(Boolean)

const hostOf = (url) => {
  try {
    return new URL(url, window.location.href).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const isDownload = (anchor, href) =>
  anchor.hasAttribute('download') ||
  DOC_EXTENSIONS.test(href.split(/[?#]/)[0]) ||
  href.includes('/downloads/')

const SiteAnalyticsInner = () => {
  const pathname = usePathname()
  const search = useSearchParams()

  const firedScrolls = useRef(new Set())
  const engagedSeconds = useRef(0)
  const firedEngagement = useRef(new Set())

  // Milestones are per-page, not per-session.
  useEffect(() => {
    firedScrolls.current = new Set()
    engagedSeconds.current = 0
    firedEngagement.current = new Set()
  }, [pathname, search])

  // --- scroll depth --------------------------------------------------
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (percent < threshold || firedScrolls.current.has(threshold)) return
        firedScrolls.current.add(threshold)
        trackScrollDepth(threshold)
      })
    }

    // Throttled through rAF — never add an unthrottled scroll listener.
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pathname, search])

  // --- dwell time ----------------------------------------------------
  useEffect(() => {
    const tick = window.setInterval(() => {
      // Skip ticks while backgrounded so a parked tab does not inflate
      // engagement.
      if (document.visibilityState !== 'visible') return
      engagedSeconds.current += 1

      DWELL_THRESHOLDS.forEach((threshold) => {
        if (engagedSeconds.current < threshold || firedEngagement.current.has(threshold)) return
        firedEngagement.current.add(threshold)
        trackEngagedVisit(threshold)
      })
    }, 1000)

    return () => window.clearInterval(tick)
  }, [pathname, search])

  // --- delegated link clicks -----------------------------------------
  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target?.closest?.('a[href]')
      if (!anchor) return

      const href = anchor.getAttribute('href') ?? ''
      if (!href) return

      // A CTA fires its own event first, then still falls through to the
      // link classification below.
      const ctaName = anchor.dataset.ctaName
      if (ctaName) {
        const ctaParams = {
          cta_name: ctaName,
          cta_location: anchor.dataset.ctaLocation ?? 'unknown',
          destination_url: href,
        }
        trackCTA(ctaParams)
        if (anchor.dataset.ctaKind === 'donate') trackDonateClick(ctaParams)
      }

      // Classification order is fixed. First match wins.
      if (href.startsWith('mailto:')) {
        trackEmail({ destination_url: href })
        return
      }
      if (href.startsWith('tel:')) {
        trackPhone({ destination_url: href })
        return
      }
      if (isDownload(anchor, href)) {
        trackDownload({
          destination_url: href,
          destination_domain: hostOf(href),
          file_name: href.split(/[?#]/)[0].split('/').pop() ?? '',
        })
        return
      }

      const host = hostOf(href)
      if (!host || host === window.location.hostname.replace(/^www\./, '')) return

      if (SOCIAL_HOSTS.includes(host)) {
        trackSocial({ destination_url: href, destination_domain: host })
        return
      }
      trackOutbound({ destination_url: href, destination_domain: host })
    }

    // Capture phase so it still sees clicks on handlers that stop
    // propagation, and covers every anchor on the site automatically.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

const SiteAnalytics = () => (
  <Suspense fallback={null}>
    <SiteAnalyticsInner />
  </Suspense>
)

export default SiteAnalytics
