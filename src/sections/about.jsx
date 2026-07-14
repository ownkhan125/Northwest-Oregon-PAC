'use client'

import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, fadeRight, stagger, lineBuild } from '@/animations/variants'
import { foundingStory, differentiator, focusAreas } from '@/data/pac'

const highlights = [
  {
    label: 'Nonpartisan focus',
    detail:
      'Built by moderates and Republicans, working to give center-right voters and common-sense candidates real infrastructure across Northwest Oregon.',
  },
  {
    label: 'Regional first',
    detail:
      'No other PAC represents Northwest Oregon or works in a nonpartisan, bridge-building frame of mind. We pool local resources for local impact.',
  },
  {
    label: 'A voice for the overlooked',
    detail:
      'Our communities have been conceded by both state and national party leadership. We exist to change that — with support, candidates, and results.',
  },
]

export default function About() {
  return (
    <SectionFrame id="about" eyebrow="Who we are" number="01">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.06}
            text="A voice for the region that keeps getting written off."
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="text-foreground/80 mt-8 max-w-2xl space-y-5"
          >
            <m.p variants={fadeUp} className="text-base sm:text-lg">
              {foundingStory.short}
            </m.p>
          </m.div>

          <m.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="mt-10 space-y-4"
          >
            {highlights.map((h, i) => (
              <m.li
                key={h.label}
                variants={fadeUp}
                className="group border-primary/15 flex items-start gap-5 border-t py-4"
              >
                <span className="text-highlight mt-1 font-mono text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="font-display text-foreground text-xl font-medium sm:text-2xl">
                    {h.label}
                  </div>
                  <div className="text-foreground/70 mt-1 text-sm sm:text-base">{h.detail}</div>
                </div>
              </m.li>
            ))}
          </m.ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/about" variant="primary" size="lg">
              Read the full story
            </Button>
            <Button href="/ask" variant="ghost" size="lg">
              See our issues
            </Button>
          </div>
        </div>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          variants={fadeRight}
          className="lg:col-span-5"
        >
          <div className="relative">
            <m.div
              variants={lineBuild}
              className="bg-primary absolute top-4 -left-3 h-px w-12 origin-left"
            />
            <div className="border-primary/20 bg-surface-alt/60 relative w-full overflow-hidden rounded-3xl border p-8 sm:p-10">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                What makes us different
              </div>
              <p className="font-display text-primary mt-4 text-xl leading-snug sm:text-2xl">
                “{differentiator}”
              </p>
            </div>
          </div>

          <div className="border-primary/15 mt-8 grid grid-cols-3 gap-6 border-t pt-6 lg:mt-12">
            {focusAreas.map((area) => (
              <div key={area}>
                <div className="font-display text-primary text-lg font-medium sm:text-xl">
                  {area}
                </div>
                <div className="text-foreground/55 mt-1 text-[10px] tracking-widest uppercase">
                  What we do
                </div>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </SectionFrame>
  )
}
