'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import { cardReveal, stagger, fadeUp } from '@/animations/variants'

const quotes = [
  {
    quote:
      "Morgan listens — really listens — and then she delivers. She's exactly the leader the 14th has been waiting for.",
    name: 'Senator Aiden Park',
    role: 'U.S. Senate · California',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    quote:
      "She passed our city's biggest housing reform in a generation. Imagine what she'll do in Washington.",
    name: 'Mayor Renee Calderon',
    role: 'Mayor of Oakwood',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    quote:
      "A workers' champion. Morgan has stood with our members on picket lines, and she'll stand with us in Congress.",
    name: 'Daniel Brooks',
    role: 'President, Local 218',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
  },
]

const orgs = [
  'Sierra Club',
  'Planned Parenthood Action',
  'AFL-CIO',
  'Working Families Party',
  'Sunrise Movement',
  'End Citizens United',
  'Brady United',
  'League of Conservation Voters',
]

export default function Endorsements() {
  return (
    <SectionFrame id="endorsements" eyebrow="Endorsements" number="04">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="A coalition as broad as the district."
            className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-foreground/70 max-w-md lg:col-span-5"
        >
          From elected leaders to union locals to grassroots organizers — over 120 endorsements and
          counting.
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {quotes.map((q, i) => (
          <m.div key={q.name} variants={cardReveal}>
            <Card className="flex h-full flex-col p-7" tilt={i % 2 === 0}>
              <svg
                viewBox="0 0 24 24"
                className="text-mint h-7 w-7"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 7h4v4H8c0 2 1 4 3 5l-1 2c-3-1-5-4-5-7V7zm9 0h4v4h-3c0 2 1 4 3 5l-1 2c-3-1-5-4-5-7V7z" />
              </svg>
              <p className="font-display text-foreground mt-5 flex-1 text-xl leading-snug sm:text-2xl">
                "{q.quote}"
              </p>
              <div className="border-line mt-7 flex items-center gap-4 border-t pt-5">
                <span className="border-cyan/30 relative h-12 w-12 overflow-hidden rounded-full border">
                  <Image src={q.image} alt={q.name} fill sizes="48px" className="object-cover" />
                </span>
                <div>
                  <div className="text-foreground text-sm font-medium">{q.name}</div>
                  <div className="text-foreground/60 text-xs">{q.role}</div>
                </div>
              </div>
            </Card>
          </m.div>
        ))}
      </m.div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="border-line bg-line mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4"
      >
        {orgs.map((org) => (
          <m.div
            key={org}
            variants={fadeUp}
            className="bg-navy-deep/80 text-foreground/80 hover:bg-navy/80 hover:text-mint flex h-24 cursor-pointer items-center justify-center p-4 text-center text-sm font-medium transition-colors"
          >
            {org}
          </m.div>
        ))}
      </m.div>
    </SectionFrame>
  )
}
