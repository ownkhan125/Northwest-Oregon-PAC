'use client'

import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import Logo from '@/components/ui/logo'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac } from '@/data/pac'

const GUIDE_URL = '/downloads/northwest-oregon-guide.pdf'
const GUIDE_FILENAME = 'northwest-oregon-guide.pdf'

const TopStrip = () => (
  <m.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6"
  >
    <div className="border-border/60 bg-surface/70 pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl sm:px-4">
      <Logo />
      <ThemeToggle />
    </div>
  </m.div>
)

const LegalStrip = () => (
  <div className="border-primary/10 border-t py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/55 text-[11px] leading-relaxed">
        {pac.disclaimers.paidFor}
      </p>
      <p className="text-foreground/40 text-[10px] tracking-widest uppercase">
        {pac.disclaimers.notAuthorized}
      </p>
    </div>
  </div>
)

const CheckMark = () => (
  <m.svg
    viewBox="0 0 48 48"
    className="h-12 w-12"
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
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
    />
  </m.svg>
)

const ConfirmationHero = () => (
  <section className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center overflow-x-clip pt-28 pb-20 sm:pt-32">
    <div
      aria-hidden
      className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
    />
    <div
      aria-hidden
      className="bg-primary/10 pointer-events-none absolute bottom-0 -right-24 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
    />
    <div
      aria-hidden
      className="border-primary/15 spin-slow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
    />

    <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="border-primary/25 bg-surface text-primary mb-8 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
      >
        <span className="relative grid h-2 w-2 place-items-center">
          <span className="bg-primary absolute inset-0 rounded-full" />
          <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
        </span>
        Submission received
      </m.div>

      <div className="text-primary mb-6">
        <CheckMark />
      </div>

      <SplitText
        as="h1"
        by="word"
        text="Thank you."
        className="font-display text-foreground text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
        delay={0.2}
        staggerChildren={0.06}
        duration={0.7}
        inView={false}
      />

      <m.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="text-foreground/80 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
      >
        Your details are in. Your free guide is ready to download &mdash; and a copy is on its way
        to your inbox.
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.6 }}
        className="mt-10"
      >
        <Button
          href={GUIDE_URL}
          size="xl"
          data-testid="download-guide"
          {...{ download: GUIDE_FILENAME }}
        >
          Download the guide
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3v14M5 12l7 7 7-7M4 21h16" />
          </svg>
        </Button>
      </m.div>

      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="text-foreground/55 mt-5 text-xs tracking-wider uppercase"
      >
        PDF &middot; ~500&thinsp;KB &middot; 12 pages
      </m.p>
    </div>
  </section>
)

const WhatsNextSection = () => (
  <section className="relative isolate overflow-x-clip pb-14 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="border-primary/20 bg-surface grid grid-cols-1 gap-8 rounded-3xl border p-8 sm:p-10 md:grid-cols-3"
      >
        <m.div variants={fadeUp} className="md:col-span-1">
          <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
            What&rsquo;s next
          </div>
          <h2 className="font-display text-foreground mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            A few things to know.
          </h2>
        </m.div>

        <div className="grid grid-cols-1 gap-6 md:col-span-2 sm:grid-cols-2">
          <m.div variants={fadeUp}>
            <div className="border-primary/30 text-primary grid h-9 w-9 place-items-center rounded-full border">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M4 6h16v12H4zM4 6l8 7 8-7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-foreground mt-4 text-base font-medium">
              Check your inbox
            </h3>
            <p className="text-foreground/70 mt-2 text-sm leading-relaxed">
              A confirmation email with the guide is on its way. Add us to your contacts so it
              doesn&rsquo;t land in spam.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <div className="border-primary/30 text-primary grid h-9 w-9 place-items-center rounded-full border">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M12 20l-7-4V8l7-4 7 4v8l-7 4z M12 12l7-4 M12 12v8 M12 12L5 8"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-foreground mt-4 text-base font-medium">
              Read at your pace
            </h3>
            <p className="text-foreground/70 mt-2 text-sm leading-relaxed">
              The guide is a quick 5-minute read covering the issues shaping Northwest Oregon
              families right now.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <div className="border-primary/30 text-primary grid h-9 w-9 place-items-center rounded-full border">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-foreground mt-4 text-base font-medium">
              Stay connected
            </h3>
            <p className="text-foreground/70 mt-2 text-sm leading-relaxed">
              We&rsquo;ll share occasional updates about the work happening across the region.
              You can unsubscribe anytime.
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <div className="border-primary/30 text-primary grid h-9 w-9 place-items-center rounded-full border">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-display text-foreground mt-4 text-base font-medium">
              Nonpartisan by design
            </h3>
            <p className="text-foreground/70 mt-2 text-sm leading-relaxed">
              Clear, practical information about the issues shaping Northwest Oregon &mdash;
              without political jargon or partisan talking points.
            </p>
          </m.div>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-foreground/60 mt-10 text-center text-sm"
      >
        Trouble downloading?{' '}
        <a
          href={GUIDE_URL}
          {...{ download: GUIDE_FILENAME }}
          className="text-primary hover:text-highlight underline underline-offset-4"
        >
          Try this direct link
        </a>
        .
      </m.div>
    </div>
  </section>
)

export default function ThankYouPage() {
  return (
    <>
      <TopStrip />
      <ConfirmationHero />
      <WhatsNextSection />
      <LegalStrip />
    </>
  )
}
