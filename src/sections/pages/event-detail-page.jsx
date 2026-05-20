'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import SplitText from '@/components/ui/split-text'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { cardReveal, fadeUp, stagger, EASE, lineBuild } from '@/animations/variants'
import { events } from '@/data/events'

export default function EventDetailPage({ event }) {
  const related = events.filter((e) => e.slug !== event.slug).slice(0, 3)

  return (
    <>
      {/* Hero / banner */}
      <section className="relative isolate overflow-x-clip pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div aria-hidden className="grid-overlay opacity-40" />
        <div
          aria-hidden
          className="bg-cyan/15 pointer-events-none absolute top-32 -left-20 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cyan/80 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            <Link href="/events" className="hover:text-mint">
              Events
            </Link>
            <span className="bg-cyan/40 h-px w-6" />
            <span className="text-mint">{event.type}</span>
          </m.div>

          <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <SplitText
                as="h1"
                by="word"
                staggerChildren={0.05}
                inView={false}
                text={event.title}
                className="font-display text-foreground text-[clamp(2rem,6vw,5rem)] leading-[1.02] font-medium tracking-tight"
              />
              <m.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-foreground/75 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
              >
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4" />
                  </svg>
                  {event.date}
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" />
                  </svg>
                  {event.when}
                </span>
                <span className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
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
                  {event.where}
                </span>
              </m.div>
            </div>

            <m.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
              className="relative lg:col-span-5"
            >
              <div className="border-cyan/20 relative aspect-[4/5] w-full overflow-hidden rounded-3xl border lg:aspect-[5/6]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
                <div className="from-navy-deep via-navy-deep/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                <div className="border-mint/40 bg-navy-deep/85 absolute bottom-6 left-6 flex h-20 w-20 flex-col items-center justify-center rounded-2xl border backdrop-blur">
                  <span className="font-display text-foreground text-3xl leading-none font-medium">
                    {event.day}
                  </span>
                  <span className="text-mint mt-1 font-mono text-[10px] tracking-widest uppercase">
                    {event.month}
                  </span>
                </div>
              </div>
            </m.div>
          </div>

          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="from-cyan/60 via-cyan/20 mt-14 h-px origin-left bg-gradient-to-r to-transparent"
          />
        </div>
      </section>

      {/* Content: details + schedule + register form */}
      <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left column: details + schedule */}
            <div className="lg:col-span-7">
              <m.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
                variants={stagger}
              >
                <m.div
                  variants={fadeUp}
                  className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase"
                >
                  About this event
                </m.div>
                <m.h2
                  variants={fadeUp}
                  className="font-display mt-4 text-3xl leading-tight font-medium sm:text-4xl"
                >
                  What to expect
                </m.h2>
                <m.p
                  variants={fadeUp}
                  className="text-foreground/75 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
                >
                  {event.excerpt}
                </m.p>
                <m.p
                  variants={fadeUp}
                  className="text-foreground/75 mt-5 max-w-2xl text-base leading-relaxed sm:text-lg"
                >
                  Doors open early — come for coffee, conversation, and a real exchange of ideas. We
                  move quickly and respect your time. RSVP helps us plan, but walk-ins are always
                  welcome.
                </m.p>
              </m.div>

              {/* Schedule */}
              <div className="mt-14">
                <div className="flex items-center gap-3">
                  <m.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="bg-mint block h-px w-10 origin-left"
                  />
                  <span className="text-cyan/85 font-mono text-[10px] tracking-[0.3em] uppercase">
                    Schedule
                  </span>
                </div>
                <m.ol
                  variants={stagger}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-15% 0px' }}
                  className="relative mt-6"
                >
                  <m.span
                    variants={lineBuild}
                    className="bg-line absolute top-2 left-[5.5rem] h-[calc(100%-1.5rem)] w-px origin-top"
                  />
                  {event.schedule.map(([time, label], i) => (
                    <m.li
                      key={time + i}
                      variants={fadeUp}
                      className="relative grid grid-cols-[5.5rem_1fr] items-baseline gap-5 pb-6"
                    >
                      <span className="text-mint font-mono text-xs tracking-widest uppercase">
                        {time}
                      </span>
                      <span className="text-foreground/85 relative pl-5">
                        <span
                          aria-hidden
                          className="bg-mint absolute top-1.5 -left-1 grid h-2 w-2 place-items-center rounded-full"
                        />
                        {label}
                      </span>
                    </m.li>
                  ))}
                </m.ol>
              </div>

              {/* Date & location card */}
              <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="border-line bg-line mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2"
              >
                <div className="bg-navy-deep/80 p-6">
                  <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                    Date
                  </div>
                  <div className="font-display text-foreground mt-3 text-2xl font-medium">
                    {event.date}
                  </div>
                  <div className="text-foreground/65 mt-1 text-sm">{event.when}</div>
                </div>
                <div className="bg-navy-deep/80 p-6">
                  <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                    Location
                  </div>
                  <div className="font-display text-foreground mt-3 text-2xl font-medium">
                    {event.where}
                  </div>
                  <div className="text-foreground/65 mt-1 text-sm">{event.address}</div>
                </div>
              </m.div>
            </div>

            {/* Right column: register form */}
            <div className="lg:col-span-5">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="border-cyan/25 bg-navy-deep/70 sticky top-28 rounded-3xl border p-7 backdrop-blur-xl sm:p-8"
              >
                <div className="text-cyan/85 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Register · Free
                </div>
                <h3 className="font-display mt-3 text-2xl leading-tight font-medium sm:text-3xl">
                  Save your seat.
                </h3>
                <p className="text-foreground/65 mt-2 text-sm">
                  Quick form — under 30 seconds. We'll send a confirmation email.
                </p>

                <form onSubmit={(e) => e.preventDefault()} className="mt-7 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input label="First name" name="firstName" required autoComplete="given-name" />
                    <Input label="Last name" name="lastName" required autoComplete="family-name" />
                  </div>
                  <Input label="Email" name="email" type="email" required autoComplete="email" />
                  <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <Select label="How many seats" name="seats" required defaultValue="1">
                    <option value="1">1 — just me</option>
                    <option value="2">2 — bringing a guest</option>
                    <option value="3">3 — bringing a couple of friends</option>
                    <option value="4">4 or more</option>
                  </Select>
                  <Checkbox name="updates" label="Send me campaign updates by email." />

                  <Button type="submit" size="lg" className="w-full">
                    Register
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Button>
                </form>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related events */}
      {related.length > 0 && (
        <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-cyan/80 font-mono text-[11px] tracking-[0.3em] uppercase">
                  More on the trail
                </div>
                <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  Related events
                </h2>
              </div>
              <Button href="/events" variant="ghost" size="md">
                All events
              </Button>
            </div>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
            >
              {related.map((e) => (
                <m.div key={e.slug} variants={cardReveal}>
                  <Link href={`/events/${e.slug}`} className="block h-full cursor-pointer">
                    <Card className="flex h-full flex-col overflow-hidden p-0" tilt={false}>
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={e.image}
                          alt={e.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="from-navy-deep/95 via-navy-deep/30 absolute inset-0 bg-gradient-to-t to-transparent" />
                        <span className="border-cyan/30 bg-navy-deep/70 text-mint absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase backdrop-blur">
                          {e.type}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="text-cyan/80 font-mono text-[11px] tracking-widest uppercase">
                          {e.date}
                        </div>
                        <h3 className="font-display group-hover:text-mint mt-3 text-xl leading-tight font-medium transition-colors">
                          {e.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                </m.div>
              ))}
            </m.div>
          </div>
        </section>
      )}
    </>
  )
}
