'use client'

import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import CivicIcon from '@/components/ui/civic-icon'
import { cardReveal, stagger, fadeUp } from '@/animations/variants'
import { candidates } from '@/data/pac'

export default function Endorsements() {
  const featured = candidates.slice(0, 5)

  return (
    <SectionFrame id="candidates" eyebrow="Who we support" number="04">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Candidates we’re standing with in 2026."
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-foreground/75 max-w-md lg:col-span-5"
        >
          Competitive candidates for Northwest Oregon — from state house races to Congressional
          District 1. Support them, learn about them, or help get them across the finish line.
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {featured.map((c, i) => (
          <m.div key={c.slug} variants={cardReveal}>
            <Card className="flex h-full flex-col p-7" tilt={i % 2 === 0}>
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                {c.year} · {c.state}
              </div>
              <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium sm:text-3xl">
                {c.name}
              </h3>
              <p className="text-foreground/75 mt-2 text-sm sm:text-base">{c.office}</p>

              <div className="border-primary/15 mt-6 flex items-center justify-between border-t pt-5">
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:text-highlight inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
                  >
                    Visit campaign
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
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-foreground/50 text-xs tracking-[0.25em] uppercase">
                    Campaign site coming soon
                  </span>
                )}
              </div>
            </Card>
          </m.div>
        ))}

        <m.div variants={fadeUp}>
          <Card
            className="from-surface-alt/70 to-surface relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br p-7"
            interactive={false}
            tilt={false}
          >
            <CivicIcon
              src="/icons/billboard.svg"
              className="text-primary/10 pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 select-none sm:h-48 sm:w-48"
            />
            <div className="relative">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Want to run?
              </div>
              <h3 className="font-display text-primary mt-4 text-2xl leading-tight font-medium sm:text-3xl">
                Run for office.
              </h3>
              <p className="text-foreground/75 mt-3 text-sm">
                We interview and support candidates who share the values of our region and are
                ready to work hard with grassroots volunteers.
              </p>
            </div>
            <div className="relative mt-6">
              <Button href="/volunteer" variant="primary" size="md">
                Start the conversation
              </Button>
            </div>
          </Card>
        </m.div>
      </m.div>
    </SectionFrame>
  )
}
