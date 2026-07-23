'use client'

import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import { cardReveal, stagger } from '@/animations/variants'
import { home } from '@/data/pac'

const icons = {
  '01': (
    <path
      d="M3 20 V10 L8 6 L13 10 L21 4 V20 M3 20 H21"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  '02': (
    <path
      d="M12 3 L20 7 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V7 Z M9 12 l2 2 l4 -4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  '03': (
    <path
      d="M4 10 C 4 14, 8 20, 12 21 C 16 20, 20 14, 20 10 V6 L12 3 L4 6 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  '04': (
    <path
      d="M3 8 L12 4 L21 8 L12 12 Z M6 10 V16 C 6 18, 18 18, 18 16 V10"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  '05': (
    <path
      d="M13 2 L4 14 H11 L10 22 L20 10 H13 Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
}

export default function Priorities() {
  return (
    <SectionFrame id="priorities" eyebrow="Our issues" number="02">
      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text={home.priorities.heading}
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-foreground/75 max-w-md lg:col-span-5"
        >
          {home.priorities.intro}
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px' }}
        className="mt-14 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {home.priorities.list.map((issue) => (
          <m.div key={issue.id} variants={cardReveal} className="h-full">
            <Card className="h-full p-7">
              <div className="flex h-full flex-col">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="border-primary/25 bg-surface-alt/60 text-primary group-hover:border-accent/60 group-hover:bg-primary-fg/10 group-hover:text-accent grid h-12 w-12 place-items-center rounded-xl border transition-colors duration-500">
                      <svg viewBox="0 0 24 24" className="h-6 w-6">
                        {icons[issue.id]}
                      </svg>
                    </span>
                    <span className="text-highlight group-hover:text-accent font-mono text-xs transition-colors duration-500">
                      {issue.id}
                    </span>
                  </div>
                  <h3 className="font-display text-foreground group-hover:text-primary-fg mt-7 min-h-[5rem] text-xl leading-tight font-medium transition-colors duration-500 sm:min-h-[6rem] sm:text-2xl">
                    {issue.name}
                  </h3>
                </div>
                <div className="mt-6 space-y-3">
                  {issue.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-foreground/75 group-hover:text-primary-fg/85 text-sm leading-relaxed transition-colors duration-500"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Card>
          </m.div>
        ))}
      </m.div>
    </SectionFrame>
  )
}
