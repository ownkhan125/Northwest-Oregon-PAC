'use client'

import { m } from 'motion/react'
import Button from '@/components/ui/button'
import { EASE } from '@/animations/variants'

export default function VoterGuidePage() {
  return (
    <section className="relative isolate flex min-h-screen w-full items-center overflow-x-clip py-24 sm:py-32">
      <div
        aria-hidden
        className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-primary/10 pointer-events-none absolute bottom-0 -right-24 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 text-center sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
        >
          Coming soon
        </m.div>

        <m.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
          className="font-display text-foreground text-4xl leading-tight font-medium tracking-tight sm:text-5xl md:text-6xl"
        >
          The 5-Minute Voter Guide
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
          className="text-foreground/75 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          A quick, nonpartisan walkthrough of the issues shaping Northwest Oregon families is on
          the way. In the meantime, download our free 5-minute guide to the issues affecting
          Northwest Oregon.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
          className="mt-10"
        >
          <Button href="/funnel" size="lg">
            Get the Free Guide
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Button>
        </m.div>
      </div>
    </section>
  )
}
