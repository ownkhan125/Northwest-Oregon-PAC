'use client'

import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import { EASE } from '@/animations/variants'
import { pac } from '@/data/pac'

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

export default function SurveyThankYouPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] w-full items-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
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
            Response received
          </m.div>

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

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-foreground/80 mt-8 max-w-2xl space-y-5 text-base leading-relaxed sm:text-lg"
          >
            <p>
              Your feedback helps us better understand what matters most to Northwest Oregon
              families.
            </p>
            <p>
              We&rsquo;ll use your responses to share updates and resources that are most relevant to
              you.
            </p>
            <p>Together, informed communities create stronger communities.</p>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
            className="from-primary/60 via-primary/30 mt-10 h-px w-32 origin-center bg-gradient-to-r to-transparent"
          />

          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="text-primary font-display mt-8 text-xl leading-snug font-medium tracking-tight sm:text-2xl md:text-3xl"
          >
            Hope <span className="text-highlight">&middot;</span> Support{' '}
            <span className="text-highlight">&middot;</span> Heard.
          </m.p>
        </div>
      </section>

      <LegalStrip />
    </>
  )
}
