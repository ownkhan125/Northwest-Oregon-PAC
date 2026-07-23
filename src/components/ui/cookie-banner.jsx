'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, m } from 'motion/react'
import { EASE } from '@/animations/variants'

const STORAGE_KEY = 'nwop_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie notice"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            position: 'fixed',
            left: 12,
            right: 12,
            bottom: 12,
            zIndex: 80,
          }}
        >
          <div className="border-primary/25 bg-surface/95 supports-[backdrop-filter]:bg-surface/80 mx-auto flex max-w-5xl flex-col gap-4 rounded-2xl border p-5 shadow-[0_24px_60px_-24px_rgba(46,69,56,0.45)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:p-6">
            <div className="flex-1">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Cookie notice
              </div>
              <p className="text-foreground/85 mt-2 max-w-3xl text-sm leading-relaxed sm:text-[15px]">
                This website uses cookies and similar technologies to improve your browsing
                experience, analyze website traffic, and measure the effectiveness of our outreach.
                By continuing to use this site, you consent to our use of cookies as described in
                our Privacy Policy.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/privacy-policy"
                className="border-primary/40 text-primary hover:border-primary hover:bg-primary/10 inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-medium tracking-tight transition-colors"
              >
                Privacy Policy
              </Link>
              <button
                type="button"
                onClick={accept}
                className="bg-primary text-primary-fg border-primary inline-flex h-11 cursor-pointer items-center justify-center rounded-full border px-5 text-sm font-medium tracking-tight shadow-[0_18px_40px_-18px_rgba(46,69,56,0.55)] transition-opacity hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
