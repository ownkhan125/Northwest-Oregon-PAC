'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cardReveal, stagger, EASE } from '@/animations/variants'
import { events } from '@/data/events'

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the Campaign"
        number="01"
        title="Upcoming events across CA-14."
        description="Town halls, canvass kickoffs, policy roundtables, and weekend coffee meetups. Bring a friend — bring your questions."
      />

      <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="from-cyan/60 via-cyan/20 h-px origin-left bg-gradient-to-r to-transparent"
          />

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <div className="text-cyan/80 font-mono text-[11px] tracking-[0.3em] uppercase">
                {events.length} upcoming · CA-14
              </div>
              <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                Find an event near you
              </h2>
            </div>
            <Button href="/volunteer" variant="secondary" size="md">
              Host an event
            </Button>
          </m.div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {events.map((e) => (
              <m.div key={e.slug} variants={cardReveal}>
                <Link href={`/events/${e.slug}`} className="block h-full cursor-pointer">
                  <Card className="flex h-full flex-col overflow-hidden p-0" tilt={false}>
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={e.image}
                        alt={e.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="from-navy-deep/95 via-navy-deep/30 absolute inset-0 bg-gradient-to-t to-transparent" />
                      <span className="border-cyan/30 bg-navy-deep/70 text-mint absolute top-5 left-5 rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase backdrop-blur">
                        {e.type}
                      </span>
                      <div className="border-mint/40 bg-navy-deep/80 absolute bottom-5 left-5 flex h-16 w-16 flex-col items-center justify-center rounded-xl border backdrop-blur">
                        <span className="font-display text-foreground text-2xl leading-none font-medium">
                          {e.day}
                        </span>
                        <span className="text-mint mt-1 font-mono text-[10px] tracking-widest uppercase">
                          {e.month}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-display text-foreground group-hover:text-mint text-xl leading-tight font-medium transition-colors sm:text-2xl">
                        {e.title}
                      </h3>
                      <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{e.excerpt}</p>
                      <div className="text-foreground/65 mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
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
                      <span className="text-cyan group-hover:text-mint mt-7 inline-flex items-center gap-2 text-xs tracking-widest uppercase transition-colors">
                        RSVP & details
                        <svg
                          className="transition-transform group-hover:translate-x-1"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </Card>
                </Link>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </>
  )
}
