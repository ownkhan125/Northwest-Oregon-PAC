'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { stagger, EASE } from '@/animations/variants'
import { formatEventDate, formatEventTime } from '@/lib/event-format'

const rowVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export default function EventsPage({ events = [] }) {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        number="03"
        title="Events across Northwest Oregon."
        description="Town halls, candidate meet-and-greets, canvass launches, and phone banks. We’ll list them here as they’re scheduled — sign up to get first word."
        accent="/icons/podium.svg"
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="from-primary/60 via-primary/20 h-px origin-left bg-gradient-to-r to-transparent"
          />

          {events.length === 0 ? (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="border-primary/25 bg-surface-alt/60 mx-auto mt-16 max-w-3xl rounded-3xl border p-10 text-center sm:p-14"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Calendar coming online
              </div>
              <h2 className="font-display text-primary mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                No events on the schedule yet.
              </h2>
              <p className="text-foreground/75 mx-auto mt-6 max-w-xl">
                Northwest Oregon PAC is a new organization and we’re building. Sign up to be
                notified when we host a canvass, phone bank, or candidate meet-and-greet in your
                neighborhood — or reach out to host one yourself.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
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
              className="relative mt-10"
            >
              {events.map((e, i) => {
                const dateLabel = formatEventDate(e)
                const timeLabel = formatEventTime(e)
                return (
                  <m.li key={e.id} variants={rowVariant} className="group relative">
                    <Link
                      href={`/events/${e.id}`}
                      className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-6 py-7 transition-transform duration-500 group-hover:translate-x-2 sm:grid-cols-[auto_1fr_auto] sm:gap-10"
                    >
                      <m.div
                        whileHover={{ rotate: -1.5, scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                        className="border-primary/25 bg-surface-alt/60 group-hover:border-primary/60 relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition-colors duration-500 sm:h-24 sm:w-24"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={e.image}
                          alt={e.title ? `${e.title} event image` : 'Event image'}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </m.div>

                      <div className="min-w-0">
                        <div className="text-primary font-mono text-[10px] tracking-widest uppercase">
                          {e.type}
                        </div>
                        <h3 className="font-display group-hover:text-primary mt-2 truncate text-xl leading-tight font-medium transition-colors duration-300 sm:text-2xl">
                          {e.title}
                        </h3>
                        <div className="text-foreground/70 mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
                          <span className="text-foreground font-medium">{dateLabel}</span>
                          {timeLabel && <span>{timeLabel}</span>}
                          {e.location && <span>{e.location}</span>}
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

                    {i < events.length - 1 && (
                      <span
                        aria-hidden
                        className="bg-primary/15 absolute inset-x-0 bottom-0 block h-px"
                      />
                    )}
                  </m.li>
                )
              })}
            </m.ul>
          )}
        </div>
      </section>
    </>
  )
}
