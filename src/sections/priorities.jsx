'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import { cardReveal, stagger, fadeUp } from '@/animations/variants'

const issues = [
  {
    id: '01',
    title: 'Lower the cost of living',
    desc: 'Cap prescription drug prices, expand affordable housing tax credits, and crack down on price-gouging by monopolies.',
    icon: (
      <path
        d="M3 12 L12 4 L21 12 M5 11 V20 H19 V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: '02',
    title: 'Defend democracy',
    desc: 'Pass the Freedom to Vote Act, get dark money out of politics, and restore real accountability to Congress.',
    icon: (
      <path
        d="M12 3 L20 7 V12 C20 17 16 20 12 21 C8 20 4 17 4 12 V7 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: '03',
    title: 'Climate that creates jobs',
    desc: 'Build a clean energy economy made in America — with union wages, lower utility bills, and resilient infrastructure.',
    icon: (
      <path
        d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22 M5 5 L7.5 7.5 M16.5 16.5 L19 19 M5 19 L7.5 16.5 M16.5 7.5 L19 5 M9 12 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: '04',
    title: 'Healthcare for every family',
    desc: 'Lower premiums, protect reproductive rights, fund community mental health, and end surprise billing.',
    icon: (
      <path
        d="M12 21 C 6 17, 3 13, 3 9 a4 4 0 0 1 9 -2 a4 4 0 0 1 9 2 c 0 4 -3 8 -9 12 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: '05',
    title: 'World-class public schools',
    desc: 'Raise teacher pay, expand pre-K, and make college and skilled trades affordable for the next generation.',
    icon: (
      <path
        d="M3 8 L12 4 L21 8 L12 12 Z M6 10 V16 C 6 18, 18 18, 18 16 V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: '06',
    title: 'Safer, stronger communities',
    desc: 'Fund community policing reform, invest in violence prevention, and pass common-sense gun safety laws.',
    icon: (
      <path
        d="M4 10 C 4 14, 8 20, 12 21 C 16 20, 20 14, 20 10 V6 L12 3 L4 6 Z M9 12 L11 14 L15 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
]

export default function Priorities() {
  return (
    <SectionFrame id="priorities" eyebrow="The Platform" number="02">
      <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Six fights worth winning."
            className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-foreground/70 max-w-md lg:col-span-5"
        >
          A focused agenda for the 14th — built from thousands of conversations at kitchen tables,
          factory floors, and front porches across the district.
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-12% 0px' }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {issues.map((issue) => (
          <m.div key={issue.id} variants={cardReveal}>
            <Card className="hover:border-mint/40 h-full p-7 transition-colors">
              <div className="flex items-start justify-between">
                <span className="border-cyan/25 bg-cyan/5 text-mint grid h-12 w-12 place-items-center rounded-xl border">
                  <svg viewBox="0 0 24 24" className="h-6 w-6">
                    {issue.icon}
                  </svg>
                </span>
                <span className="text-cyan/70 font-mono text-xs">{issue.id}</span>
              </div>
              <h3 className="font-display text-foreground mt-7 text-2xl leading-tight font-medium">
                {issue.title}
              </h3>
              <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{issue.desc}</p>
              <Link
                href="/about"
                className="text-cyan hover:text-mint mt-7 inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
              >
                Read the plan
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </Card>
          </m.div>
        ))}
      </m.div>
    </SectionFrame>
  )
}
