'use client'

import { useCallback, useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { EASE } from '@/animations/variants'
import TrackOnMount from '@/components/analytics/track-on-mount'
import { trackDownload } from '@/lib/analytics/meta'
import { HD27_PAID_FOR } from '@/sections/pages/norman-vs-carpenter-page'

const GUIDE_URL = '/downloads/hd27-voters-guide.pdf'
const GUIDE_FILENAME = 'HD27-Voter-Guide-Mark-Norman-vs-Tammy-Carpenter.pdf'
const FUNNEL = 'hd27_voter_guide'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'hd27_thank_you',
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

const AnimatedCheck = () => (
  <m.svg
    viewBox="0 0 48 48"
    className="text-primary h-14 w-14"
    fill="none"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
  >
    <m.circle
      cx="24"
      cy="24"
      r="22"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-primary/40"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
    />
    <m.path
      d="M14 24l7 7 13-14"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
    />
  </m.svg>
)

export default function HD27ThankYouPage() {
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
      trackDownload({ form_name: FUNNEL, file: 'hd27-voters-guide.pdf' })
    } catch {
      setDownloadError(true)
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }, [])

  return (
    <>
      <TrackOnMount event="LeadDelivered" params={VIEW_PARAMS} />
      <section className="text-foreground relative isolate overflow-x-clip pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div
          aria-hidden
          className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-primary/12 pointer-events-none absolute -right-24 bottom-0 -z-10 h-[45vmin] w-[45vmin] rounded-full blur-3xl"
        />

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
          <div className="mb-6">
            <AnimatedCheck />
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="border-primary/25 bg-surface text-primary mb-6 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            Oregon House District 27 • 2026
          </m.div>

          <SplitText
            as="h1"
            by="word"
            text="Your HD27 Voter Guide Is Ready."
            className="font-display text-foreground text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
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
            Thanks for requesting the 2026 Oregon House District 27 Voter Guide: Mark Norman vs.
            Tammy Carpenter.
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
              data-testid="download-hd27-guide"
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

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="font-display text-primary mt-10 max-w-xl text-xl leading-snug sm:text-2xl"
          >
            Compare the candidates. Review the sources. Make an informed choice.
          </m.p>
        </div>
      </section>

      <div className="border-border text-foreground border-t py-8">
        <p className="text-foreground/70 px-5 text-center text-[11px] font-semibold">
          {HD27_PAID_FOR}
        </p>
      </div>
    </>
  )
}
