'use client'

/* CD-1 thank-you page. Reuses the funnel's "The Record" ledger identity —
   the giant "14" typographic mark reappears here as a subtle confirmation
   motif, and the disclaimer strip matches the funnel exactly. */

import { useCallback, useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { EASE } from '@/animations/variants'
import TrackOnMount from '@/components/analytics/track-on-mount'
import { trackDownload } from '@/lib/analytics/meta'
import { CD1_PAID_FOR } from '@/sections/pages/kahl-vs-bonamici-page'

const GUIDE_URL = '/downloads/cd1-voters-guide.pdf'
const GUIDE_FILENAME = 'CD1-Voter-Guide-Kahl-vs-Bonamici.pdf'
const FUNNEL = 'cd1_voter_guide'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'cd1_thank_you',
}

const DownloadIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12 3v14M5 12l7 7 7-7M4 21h16" />
  </svg>
)

// Roll-call-style bar that draws in on mount — a small callback to the
// funnel's ledger aesthetic, sitting under the download button.
const LedgerBar = () => (
  <div className="mx-auto mt-10 max-w-md">
    <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] uppercase">
      <span className="text-primary">Record Received</span>
      <span className="text-foreground/60">Verified</span>
    </div>
    <div className="border-border mt-2 h-1.5 overflow-hidden rounded-full border">
      <m.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
        className="bg-primary block h-full origin-left"
      />
    </div>
  </div>
)

export default function KahlVsBonamiciThankYouPage() {
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(false)

  const triggerDownload = useCallback(() => {
    if (typeof window === 'undefined') return
    setDownloading(true)
    setDownloadError(false)
    try {
      const link = document.createElement('a')
      link.href = GUIDE_URL
      link.download = GUIDE_FILENAME
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      trackDownload({ form_name: FUNNEL, file: 'cd1-voters-guide.pdf' })
    } catch {
      setDownloadError(true)
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }, [])

  return (
    <>
      <TrackOnMount event="LeadDelivered" params={VIEW_PARAMS} />
      <section className="text-foreground relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
        {/* Giant "14" ledger mark, faint, sits behind the message. */}
        <span
          aria-hidden
          className="font-display text-primary/[0.05] pointer-events-none absolute -top-4 right-0 -z-10 select-none text-[46vw] leading-none font-medium sm:text-[34vw] md:text-[26vw] lg:text-[22vw] dark:text-primary/[0.08]"
        >
          14
        </span>

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="border-primary/25 bg-surface text-primary mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            Oregon&rsquo;s 1st Congressional District • 2026
          </m.div>

          <SplitText
            as="h1"
            by="word"
            text="Your CD-1 Voter Guide is ready."
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
            delay={0.3}
            staggerChildren={0.06}
            duration={0.7}
            inView={false}
          />

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-foreground/85 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            Thanks for requesting the 2026 Oregon&rsquo;s 1st Congressional District Voter Guide:
            Barbara Kahl vs. Suzanne Bonamici.
          </m.p>
          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-foreground/75 mt-2 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            Your copy has also been sent to your email.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-10"
          >
            <Button
              onClick={triggerDownload}
              size="xl"
              variant="primary"
              data-testid="download-cd1-guide"
              className="tracking-[0.14em] uppercase"
            >
              {downloading ? 'Preparing…' : 'Download the Guide'}
              <DownloadIcon />
            </Button>
          </m.div>

          {downloadError ? (
            <m.p
              role="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-red-500 dark:text-red-300"
            >
              The download didn&rsquo;t start.{' '}
              <a
                href={GUIDE_URL}
                download={GUIDE_FILENAME}
                className="underline decoration-red-500/60 underline-offset-2 hover:text-red-700 dark:decoration-red-300/60 dark:hover:text-red-200"
              >
                Click here to try again.
              </a>
            </m.p>
          ) : null}

          <LedgerBar />

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-display text-primary mt-12 max-w-xl text-xl leading-snug sm:text-2xl"
          >
            Review the record. Compare the priorities. Decide for yourself.
          </m.p>
        </div>
      </section>

      <div className="border-border text-foreground border-t py-8">
        <p className="text-foreground/70 px-5 text-center text-[11px] font-semibold">
          {CD1_PAID_FOR}
        </p>
      </div>
    </>
  )
}
