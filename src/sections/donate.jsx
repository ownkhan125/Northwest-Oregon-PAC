'use client'

import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac, home } from '@/data/pac'

export default function Donate() {
  return (
    <section id="donate" className="bg-surface-alt/30 relative overflow-x-clip py-14 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="via-primary mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent to-transparent"
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20% 0px' }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <m.div
            variants={fadeUp}
            className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            07 · {home.donate.eyebrow}
          </m.div>
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text={home.donate.heading}
            className="font-display text-foreground mt-5 text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
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
          className="relative mx-auto mt-12 max-w-3xl"
        >
          <div className="border-primary/25 bg-surface relative rounded-3xl border p-8 shadow-[0_30px_80px_-40px_rgba(46,69,56,0.35)] sm:p-12">
            <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
              Contribute
            </div>
            <h3 className="font-display text-foreground mt-3 text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
              Online contributions are launching soon.
            </h3>
            <p className="text-foreground/80 mt-4 text-base leading-relaxed sm:text-lg">
              Our secure contribution portal is on the way. Until it&rsquo;s live, our team will
              gladly walk you through the ways to give and record the information required for
              campaign-finance reporting.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button href="/donate" size="lg">
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
              <Button href="/contact" variant="secondary" size="lg">
                Contact the PAC
              </Button>
            </div>

            <div className="border-primary/15 mt-8 space-y-3 border-t pt-6">
              {home.donate.notice.split('\n').map((line, i) => (
                <p key={i} className="text-foreground/65 text-center text-xs leading-relaxed">
                  {line}
                </p>
              ))}
              <p className="text-foreground/50 mt-3 text-center text-[10px] tracking-widest uppercase">
                {pac.disclaimers.paidFor}
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
