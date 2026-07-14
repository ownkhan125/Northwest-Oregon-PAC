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
    <SectionFrame id="events" eyebrow="Get involved" number="06">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Show up. Speak up. Be part of it."
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
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
        className="from-primary/60 via-primary/20 mt-14 h-px origin-left bg-gradient-to-r to-transparent"
      />

      {list.length === 0 ? (
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, ease: EASE }}
          className="border-primary/20 bg-surface-alt/60 mt-10 rounded-3xl border p-8 text-center sm:p-14"
        >
          <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            The calendar is opening up
          </div>
          <h3 className="font-display text-primary mt-4 text-2xl font-medium sm:text-3xl md:text-4xl">
            No events on the schedule yet.
          </h3>
          <p className="text-foreground/75 mx-auto mt-4 max-w-xl">
            We’re a new PAC and we’re building. Sign up to get first word when we host a canvass,
            phone bank, or candidate meet-and-greet in your neighborhood.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/volunteer" size="lg">
              Get event alerts
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Host an event
            </Button>
          </div>
        </m.div>
      ) : (
        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="relative"
        >
          {list.map((e, i) => (
            <m.li key={e.slug} variants={rowVariant} className="group relative">
              <Link
                href={`/events/${e.slug}`}
                className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-6 py-7 transition-transform duration-500 group-hover:translate-x-2 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
              >
                <m.div
                  whileHover={{ rotate: -2, scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  className="border-primary/25 bg-surface-alt/60 group-hover:border-primary/60 group-hover:bg-surface-alt relative flex h-20 w-20 flex-col items-center justify-center rounded-xl border transition-colors duration-500 sm:h-24 sm:w-24"
                >
                  <span className="font-display text-foreground group-hover:text-primary text-3xl leading-none font-medium transition-colors duration-500 sm:text-4xl">
                    {e.day}
                  </span>
                  <span className="text-highlight mt-1 font-mono text-[10px] tracking-widest uppercase">
                    {e.month}
                  </span>
                </m.div>

                <div>
                  <div className="text-primary font-mono text-[10px] tracking-widest uppercase">
                    {e.type}
                  </div>
                  <h3 className="font-display group-hover:text-primary mt-2 text-xl leading-tight font-medium transition-colors duration-300 sm:text-2xl">
                    {e.title}
                  </h3>
                  <div className="text-foreground/70 mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                    <span>{e.when}</span>
                    <span>{e.where}</span>
                  </div>
                </div>

                <span className="border-primary/30 text-foreground/80 group-hover:border-primary group-hover:text-primary relative hidden cursor-pointer items-center gap-2 overflow-hidden rounded-full border px-5 py-2.5 text-xs tracking-widest uppercase transition-colors duration-300 sm:inline-flex">
                  RSVP
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>

              {i < list.length - 1 && (
                <span
                  aria-hidden
                  className="bg-primary/15 absolute inset-x-0 bottom-0 block h-px"
                />
              )}
            </m.li>
          ))}
        </m.ul>
      )}

      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
        className="via-primary/20 to-primary/60 mt-10 h-px origin-left bg-gradient-to-r from-transparent"
      />
    </SectionFrame>
  )
}
