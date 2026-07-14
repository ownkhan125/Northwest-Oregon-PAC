'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import Button from '@/components/ui/button'
import SplitText from '@/components/ui/split-text'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { fadeUp, stagger, EASE, lineBuild } from '@/animations/variants'

export default function EventDetailPage({ event }) {
  return (
    <>
      <section className="relative isolate overflow-x-clip pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-highlight flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            <Link href="/events" className="hover:text-primary">
              Events
            </Link>
            <span className="bg-highlight/40 h-px w-6" />
            <span className="text-primary">{event.type}</span>
          </m.div>

          <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
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
                <span>{event.date}</span>
                <span>{event.when}</span>
                <span>{event.where}</span>
              </m.div>
            </div>
          </div>

          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="from-primary/60 via-primary/20 mt-14 h-px origin-left bg-gradient-to-r to-transparent"
          />
        </div>
      </section>

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <m.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
                variants={stagger}
              >
                <m.div
                  variants={fadeUp}
                  className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase"
                >
                  About this event
                </m.div>
                <m.h2
                  variants={fadeUp}
                  className="font-display text-foreground mt-4 text-3xl leading-tight font-medium sm:text-4xl"
                >
                  What to expect
                </m.h2>
                <m.p
                  variants={fadeUp}
                  className="text-foreground/80 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
                >
                  {event.excerpt}
                </m.p>
              </m.div>

              {event.schedule && event.schedule.length > 0 && (
                <div className="mt-14">
                  <div className="flex items-center gap-3">
                    <m.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="bg-primary block h-px w-10 origin-left"
                    />
                    <span className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
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
                      className="bg-primary/20 absolute top-2 left-[5.5rem] h-[calc(100%-1.5rem)] w-px origin-top"
                    />
                    {event.schedule.map(([time, label], i) => (
                      <m.li
                        key={time + i}
                        variants={fadeUp}
                        className="relative grid grid-cols-[5.5rem_1fr] items-baseline gap-5 pb-6"
                      >
                        <span className="text-primary font-mono text-xs tracking-widest uppercase">
                          {time}
                        </span>
                        <span className="text-foreground/85 relative pl-5">
                          <span
                            aria-hidden
                            className="bg-primary absolute top-1.5 -left-1 grid h-2 w-2 place-items-center rounded-full"
                          />
                          {label}
                        </span>
                      </m.li>
                    ))}
                  </m.ol>
                </div>
              )}

              <m.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="border-primary/15 bg-primary/[0.02] mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2"
              >
                <div className="bg-surface/80 p-6">
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Date
                  </div>
                  <div className="font-display text-foreground mt-3 text-2xl font-medium">
                    {event.date}
                  </div>
                  <div className="text-foreground/70 mt-1 text-sm">{event.when}</div>
                </div>
                <div className="bg-surface/80 p-6">
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Location
                  </div>
                  <div className="font-display text-foreground mt-3 text-2xl font-medium">
                    {event.where}
                  </div>
                  {event.address && (
                    <div className="text-foreground/70 mt-1 text-sm">{event.address}</div>
                  )}
                </div>
              </m.div>
            </div>

            <div className="lg:col-span-5">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, ease: EASE }}
                className="border-primary/25 bg-surface sticky top-28 rounded-3xl border p-7 sm:p-8"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  Register · Free
                </div>
                <h3 className="font-display text-foreground mt-3 text-2xl leading-tight font-medium sm:text-3xl">
                  Save your seat.
                </h3>
                <p className="text-foreground/70 mt-2 text-sm">
                  Quick form — we’ll send a confirmation email.
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
                  <Checkbox name="updates" label="Send me updates from Northwest Oregon PAC." />

                  <Button type="submit" size="lg" className="w-full">
                    Register
                  </Button>
                </form>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
