'use client'

import { useCallback, useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac } from '@/data/pac'
import TrackOnMount from '@/components/analytics/track-on-mount'
import { trackDownload } from '@/lib/analytics/meta'

const GUIDE_URL = '/downloads/hd33-voters-guide.pdf'
const GUIDE_FILENAME = 'HD33-Voters-Guide-Ciatta-Thompson-vs-Shannon-Jones-Isadore.pdf'
const FUNNEL = 'hd33_voter_guide'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'hd33_thank_you',
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

const Hero = ({ onDownload, downloading, downloadError }) => (
  <section className="text-foreground relative isolate overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
    <div
      aria-hidden
      className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
    />
    <div
      aria-hidden
      className="bg-primary/12 pointer-events-none absolute -right-24 bottom-0 -z-10 h-[45vmin] w-[45vmin] rounded-full blur-3xl"
    />
    <div
      aria-hidden
      className="border-primary/15 spin-slow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
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
        Oregon House District 33 • 2026
      </m.div>

      <SplitText
        as="h1"
        by="word"
        text="Your Guide Is Ready."
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
        Thanks for requesting the Oregon House District 33 Voters Guide.
      </m.p>
      <m.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-foreground/75 mt-2 max-w-xl text-base leading-relaxed sm:text-lg"
      >
        Your copy is ready below. We&rsquo;ve also sent it to your email so you can read it anytime.
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        className="mt-10"
      >
        <Button
          onClick={onDownload}
          size="xl"
          variant="primary"
          data-testid="download-hd33-guide"
          className="tracking-[0.14em] uppercase"
        >
          {downloading ? 'Preparing…' : 'Download The Guide'}
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
            className="hover:text-red-700 underline decoration-red-500/60 underline-offset-2 dark:hover:text-red-200 dark:decoration-red-300/60"
          >
            Click here to try again.
          </a>
        </m.p>
      ) : null}

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-foreground/55 mt-6 text-xs tracking-[0.22em] uppercase"
      >
        Free download • Public records • Published reporting
      </m.p>
    </div>
  </section>
)

const OneQuestion = () => (
  <section className="text-foreground relative isolate pb-16 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="bg-primary text-primary-fg border-primary relative overflow-hidden rounded-3xl border p-8 text-center shadow-[0_28px_80px_-30px_rgba(0,0,0,0.3)] sm:p-10 md:p-12 dark:shadow-[0_28px_80px_-30px_rgba(0,0,0,0.55)]"
      >
        <m.p
          variants={fadeUp}
          className="text-primary-fg/85 text-[11px] font-semibold tracking-[0.28em] uppercase"
        >
          One question to keep in mind as you read
        </m.p>

        <m.h2
          variants={fadeUp}
          className="font-display text-primary-fg mx-auto mt-6 max-w-2xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-[44px]"
        >
          Are you satisfied with the results in HD33?
        </m.h2>

        <m.ul
          variants={stagger}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {[
            'Needles near schools.',
            'Addiction.',
            'Shelter fights.',
            'Empty storefronts.',
            'Rising costs.',
            'Government spending.',
          ].map((label) => (
            <m.li
              key={label}
              variants={fadeUp}
              className="border-primary-fg/25 bg-primary-fg/10 text-primary-fg/90 rounded-full border px-4 py-1.5 text-sm"
            >
              {label}
            </m.li>
          ))}
        </m.ul>

        <m.p
          variants={fadeUp}
          className="text-primary-fg/80 mx-auto mt-8 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Look at the record. Look at the results. Then decide.
        </m.p>
      </m.div>
    </div>
  </section>
)

const WhatsNext = ({ onDownload }) => (
  <section className="text-foreground relative isolate pb-16 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="border-primary/20 bg-surface rounded-3xl border p-8 sm:p-10"
      >
        <m.h3
          variants={fadeUp}
          className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl"
        >
          What Happens Next?
        </m.h3>

        <m.p
          variants={fadeUp}
          className="text-foreground/80 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          Over the next several days we&rsquo;ll follow up with short, no-fluff notes on the issues
          District 33 lives with every day — from public safety and addiction to homelessness,
          affordability, and government accountability.
        </m.p>

        <m.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-display text-primary text-xl leading-snug sm:max-w-md">
            See what happened. See where they stand. Decide for yourself.
          </p>
          <Button
            onClick={onDownload}
            variant="secondary"
          >
            Download the guide again
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </m.div>
      </m.div>
    </div>
  </section>
)

const LegalStrip = () => (
  <div className="border-border text-foreground border-t py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/60 text-[11px] leading-relaxed">{pac.disclaimers.paidFor}</p>
      <p className="text-foreground/45 text-[10px] tracking-widest uppercase">
        {pac.disclaimers.notAuthorized}
      </p>
    </div>
  </div>
)

export default function HD33ThankYouPage() {
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
      trackDownload({ form_name: FUNNEL, file: 'hd33-voters-guide.pdf' })
    } catch {
      setDownloadError(true)
    } finally {
      setTimeout(() => setDownloading(false), 800)
    }
  }, [])

  return (
    <>
      <TrackOnMount event="LeadDelivered" params={VIEW_PARAMS} />
      <Hero
        onDownload={triggerDownload}
        downloading={downloading}
        downloadError={downloadError}
      />
      <OneQuestion />
      <WhatsNext onDownload={triggerDownload} />
      <LegalStrip />
    </>
  )
}
