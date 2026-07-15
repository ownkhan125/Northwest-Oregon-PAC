'use client'

import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { EASE } from '@/animations/variants'
import { events } from '@/data/events'

export default function EventsPage() {
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

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="border-primary/25 bg-surface-alt/60 mx-auto mt-16 max-w-3xl rounded-3xl border p-10 text-center sm:p-14"
          >
            <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
              {events.length === 0
                ? 'Calendar coming online'
                : `${events.length} upcoming`}
            </div>
            <h2 className="font-display text-primary mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
              {events.length === 0
                ? 'No events on the schedule yet.'
                : 'Find an event near you'}
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
        </div>
      </section>
    </>
  )
}
