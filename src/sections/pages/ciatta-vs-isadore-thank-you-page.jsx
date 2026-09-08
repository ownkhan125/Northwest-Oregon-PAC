'use client'

import { useCallback, useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
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
    className="h-14 w-14 text-sand"
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
      className="text-sand/50"
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
  <section className="relative isolate overflow-x-clip bg-ink pt-28 pb-16 text-cream sm:pt-32 sm:pb-20">
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-sage/20 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 -right-24 -z-10 h-[45vmin] w-[45vmin] rounded-full bg-forest/40 blur-3xl"
    />

    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
      <div className="mb-6">
        <AnimatedCheck />
      </div>

      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.6 }}
        className="mb-6 inline-flex items-center gap-3 rounded-full border border-sand/30 bg-forest/60 px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase text-sand"
      >
        Oregon House District 33 • 2026
      </m.div>

      <SplitText
        as="h1"
        by="word"
        text="Your Guide Is Ready."
        className="font-display text-cream text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
        delay={0.3}
        staggerChildren={0.06}
        duration={0.7}
        inView={false}
      />

      <m.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
      >
        Thanks for requesting the Oregon House District 33 Voters Guide.
      </m.p>
      <m.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-2 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
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
          data-testid="download-hd33-guide"
          className="!bg-sand !text-ink !border-sand hover:!opacity-90 tracking-[0.14em] uppercase"
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
          className="mt-4 text-sm text-red-300"
        >
          The download didn&rsquo;t start.{' '}
          <a
            href={GUIDE_URL}
            download={GUIDE_FILENAME}
            className="underline decoration-red-300/60 underline-offset-2 hover:text-red-200"
          >
            Click here to try again.
          </a>
        </m.p>
      ) : null}

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-6 text-xs tracking-[0.22em] uppercase text-cream/55"
      >
        Free download • Public records • Published reporting
      </m.p>
    </div>
  </section>
)

const OneQuestion = () => (
  <section className="relative isolate bg-ink pb-16 text-cream sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="relative overflow-hidden rounded-3xl border border-sand/25 bg-forest/70 p-8 text-center sm:p-10 md:p-12"
      >
        <m.p
          variants={fadeUp}
          className="text-[11px] font-semibold tracking-[0.28em] uppercase text-sand/85"
        >
          One question to keep in mind as you read
        </m.p>

        <m.h2
          variants={fadeUp}
          className="font-display mx-auto mt-6 max-w-2xl text-3xl leading-tight font-medium tracking-tight text-cream sm:text-4xl md:text-[44px]"
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
              className="rounded-full border border-sand/25 bg-ink/40 px-4 py-1.5 text-sm text-cream/85"
            >
              {label}
            </m.li>
          ))}
        </m.ul>

        <m.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          Look at the record. Look at the results. Then decide.
        </m.p>
      </m.div>
    </div>
  </section>
)

const WhatsNext = ({ onDownload }) => (
  <section className="relative isolate bg-ink pb-16 text-cream sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="rounded-3xl border border-sand/20 bg-forest/40 p-8 sm:p-10"
      >
        <m.h3
          variants={fadeUp}
          className="font-display text-3xl leading-tight font-medium tracking-tight text-cream sm:text-4xl"
        >
          What Happens Next?
        </m.h3>

        <m.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          Over the next several days we&rsquo;ll follow up with short, no-fluff notes on the issues
          District 33 lives with every day — from public safety and addiction to homelessness,
          affordability, and government accountability.
        </m.p>

        <m.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-display text-xl leading-snug text-sand sm:max-w-md">
            See what happened. See where they stand. Decide for yourself.
          </p>
          <Button
            onClick={onDownload}
            variant="secondary"
            className="!border-sand/40 !text-cream hover:!bg-sand/10 hover:!border-sand"
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
  <div className="border-t border-sand/15 bg-ink py-8 text-cream">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-[11px] leading-relaxed text-cream/60">{pac.disclaimers.paidFor}</p>
      <p className="text-[10px] tracking-widest uppercase text-cream/45">
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
