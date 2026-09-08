'use client'

import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import SectionMarker from '@/components/ui/section-marker'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac, home } from '@/data/pac'

export default function Donate() {
  return (
    <section id="donate" className="bg-surface-alt/30 relative overflow-x-clip py-14 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <SectionMarker number="07" eyebrow={home.donate.eyebrow} />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20% 0px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text={home.donate.heading}
            className="font-display text-foreground text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
          />
          <m.p variants={fadeUp} className="text-foreground/80 mx-auto mt-6 max-w-xl text-base sm:text-lg">
            {home.donate.body}
          </m.p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto mt-10 max-w-3xl text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              href={pac.donateUrl}
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-name="See ways to give"
              data-cta-location="donate_section"
              data-cta-kind="donate"
            >
              See ways to give
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
            <Button
              href="/contact"
              variant="secondary"
              size="lg"
              data-cta-name="Contact the PAC"
              data-cta-location="donate_section"
            >
              Contact the PAC
            </Button>
          </div>

          <div className="via-primary/40 mx-auto mt-12 h-px w-32 bg-gradient-to-r from-transparent to-transparent" />

          <div className="mx-auto mt-6 max-w-2xl space-y-3">
            {home.donate.notice.split('\n').map((line, i) => (
              <p key={i} className="text-foreground/65 text-center text-xs leading-relaxed">
                {line}
              </p>
            ))}
            <p className="text-foreground/50 mt-3 text-center text-[10px] tracking-widest uppercase">
              {pac.disclaimers.paidFor}
            </p>
          </div>
        </m.div>
      </div>
    </section>
  )
}
