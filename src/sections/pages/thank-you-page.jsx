'use client'

import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac } from '@/data/pac'

const GUIDE_URL = '/downloads/northwest-oregon-guide.pdf'
const GUIDE_FILENAME = 'northwest-oregon-guide.pdf'

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
      <div className="text-primary mb-6">
        <CheckMark />
      </div>

      <SplitText
        as="h1"
        by="word"
        text="Thank You!"
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
        Your guide is on its way to your inbox.
      </m.p>
      <m.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="text-foreground/80 mt-2 max-w-xl text-base leading-relaxed sm:text-lg"
      >
        You can also download it immediately below.
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        className="mt-10"
      >
        <Button
          href={GUIDE_URL}
          size="xl"
          data-testid="download-guide"
          {...{ download: GUIDE_FILENAME }}
        >
          DOWNLOAD THE GUIDE
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
    </div>
  </section>
)

const WhatHappensNextSection = () => (
  <section className="relative isolate overflow-x-clip pb-14 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="border-primary/20 bg-surface relative overflow-hidden rounded-3xl border p-8 sm:p-10"
      >
        <m.div variants={fadeUp}>
          <h2 className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
            What Happens Next?
          </h2>
        </m.div>

        <m.p
          variants={fadeUp}
          className="text-foreground/80 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          Over the next week, we&rsquo;ll share additional insights into the issues affecting
          Northwest Oregon and explain why they matter to our communities.
        </m.p>

        <m.div
          variants={fadeUp}
          className="border-primary/25 bg-surface-alt/50 mt-8 rounded-2xl border-l-4 border-l-primary border p-6 sm:p-7"
        >
          <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
            Our goal is simple:
          </div>
          <p className="font-display text-primary mt-3 text-xl leading-snug sm:text-2xl">
            Provide practical information that helps residents stay informed and engaged.
          </p>
        </m.div>
      </m.div>
    </div>
  </section>
)

const SOCIALS = [
  {
    name: 'Facebook',
    href: pac.socials.facebook,
    icon: (
      <path
        d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.6 1.7-1.6H17V2.5c-.4 0-1.5-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V10H7v4h2.8v8H13Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'Instagram',
    href: pac.socials.instagram || '#',
    icon: (
      <path
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
        fill="currentColor"
      />
    ),
  },
]

const StayConnectedSection = () => (
  <section className="relative isolate overflow-x-clip pb-16 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="border-primary/20 bg-surface-alt/40 relative overflow-hidden rounded-3xl border p-8 text-center sm:p-10"
      >
        <m.div variants={fadeUp}>
          <h2 className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
            Stay Connected
          </h2>
        </m.div>

        <m.p
          variants={fadeUp}
          className="text-foreground/80 mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Follow Northwest Oregon PAC for updates, community conversations, and local news.
        </m.p>

        <m.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.name}
              className="group border-border bg-surface text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 focus-visible:ring-primary/40 grid h-12 w-12 cursor-pointer place-items-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110"
              >
                {s.icon}
              </svg>
            </a>
          ))}
        </m.div>

        <m.div variants={fadeUp} className="mt-6">
          <a
            href={`https://${pac.domain}`}
            className="text-primary hover:text-highlight inline-flex items-center gap-2 text-sm underline underline-offset-4 transition-colors"
          >
            {pac.domain}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </m.div>

        <m.div
          variants={fadeUp}
          className="border-primary/15 mx-auto mt-8 max-w-xs border-t pt-5"
        >
          <p className="text-primary font-display text-sm tracking-[0.28em] uppercase sm:text-base">
            Hope <span className="text-highlight">&bull;</span> Support{' '}
            <span className="text-highlight">&bull;</span> Heard.
          </p>
        </m.div>
      </m.div>
    </div>
  </section>
)

export default function ThankYouPage() {
  return (
    <>
      <ConfirmationHero />
      <WhatHappensNextSection />
      <StayConnectedSection />
      <LegalStrip />
    </>
  )
}
