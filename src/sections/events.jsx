'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { stagger, EASE } from '@/animations/variants'
import { events } from '@/data/events'

const rowVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export default function Events() {
  const list = events.slice(0, 4)

  return (
    <SectionFrame id="events" eyebrow="Get Involved" number="06">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Show up. Speak up. Be part of it."
            className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Button href="/volunteer" variant="primary" size="lg">
            Volunteer
          </Button>
          <Button href="/events" variant="ghost" size="lg">
            All events
          </Button>
        </div>
      </div>

      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="from-cyan/60 via-cyan/20 mt-14 h-px origin-left bg-gradient-to-r to-transparent"
      />

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="relative"
      >
        {list.map((e, i) => (
          <m.li key={e.slug} variants={rowVariant} className="group relative">
            <m.div
              aria-hidden
              initial={false}
              className="from-cyan/[0.06] via-mint/[0.04] pointer-events-none absolute inset-x-0 inset-y-2 -z-10 rounded-2xl bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
            <span
              aria-hidden
              className="via-mint pointer-events-none absolute top-1/2 left-0 h-12 w-px origin-center -translate-y-1/2 scale-y-0 bg-gradient-to-b from-transparent to-transparent transition-transform duration-500 group-hover:scale-y-100"
            />

            <Link
              href={`/events/${e.slug}`}
              className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-6 py-7 transition-transform duration-500 group-hover:translate-x-2 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
            >
              <m.div
                whileHover={{ rotate: -2, scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                className="border-cyan/25 bg-cyan/[0.04] group-hover:border-mint/60 group-hover:bg-mint/[0.06] relative flex h-20 w-20 flex-col items-center justify-center rounded-xl border transition-colors duration-500 sm:h-24 sm:w-24"
              >
                <span className="font-display text-foreground group-hover:text-mint text-3xl leading-none font-medium transition-colors duration-500 sm:text-4xl">
                  {e.day}
                </span>
                <span className="text-cyan mt-1 font-mono text-[10px] tracking-widest uppercase">
                  {e.month}
                </span>
                <span
                  aria-hidden
                  className="bg-mint/0 group-hover:bg-mint/15 pointer-events-none absolute -inset-2 -z-10 rounded-2xl blur-xl transition-colors duration-500"
                />
              </m.div>

              <div>
                <div className="text-mint font-mono text-[10px] tracking-widest uppercase">
                  {e.type}
                </div>
                <h3 className="font-display group-hover:text-mint mt-2 text-xl leading-tight font-medium transition-colors duration-300 sm:text-2xl">
                  {e.title}
                </h3>
                <div className="text-foreground/65 mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                  <span className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" strokeLinecap="round" />
                    </svg>
                    {e.when}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path
                        d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="9" r="2.5" />
                    </svg>
                    {e.where}
                  </span>
                </div>
              </div>

              <span className="border-cyan/30 text-foreground/80 group-hover:border-mint group-hover:text-mint relative hidden cursor-pointer items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-xs tracking-widest uppercase transition-colors duration-300 sm:inline-flex">
                <span className="relative z-10">RSVP</span>
                <svg
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  aria-hidden
                  className="bg-mint/10 absolute inset-0 -z-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                />
              </span>
            </Link>

            {i < list.length - 1 && (
              <m.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: EASE }}
                className="bg-line absolute inset-x-0 bottom-0 block h-px origin-left"
              />
            )}
          </m.li>
        ))}
      </m.ul>

      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="via-cyan/20 to-cyan/60 h-px origin-left bg-gradient-to-r from-transparent"
      />
    </SectionFrame>
  )
}
