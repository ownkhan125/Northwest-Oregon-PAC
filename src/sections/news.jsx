'use client'

import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import { fadeUp, stagger } from '@/animations/variants'
import { antiSocialismStatement } from '@/data/pac'

export default function News() {
  return (
    <SectionFrame id="statement" eyebrow="Where we stand" number="05">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Economic freedom is the engine."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12"
      >
        <m.p
          variants={fadeUp}
          className="text-foreground/85 lg:col-span-8 text-base leading-relaxed sm:text-lg"
        >
          {antiSocialismStatement}
        </m.p>

        <m.aside
          variants={fadeUp}
          className="border-primary/25 bg-surface-alt/50 rounded-2xl border p-6 lg:col-span-4"
        >
          <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            The takeaway
          </div>
          <p className="font-display text-primary mt-3 text-xl leading-snug sm:text-2xl">
            We reject the false promise of socialism and stand for the proven engine of human
            flourishing: economic freedom.
          </p>
        </m.aside>
      </m.div>
    </SectionFrame>
  )
}
