'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m } from 'motion/react'
import Button from '@/components/ui/button'
import SplitText from '@/components/ui/split-text'
import Input from '@/components/ui/input'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { formatEventDate, formatEventTime } from '@/lib/event-format'

export default function EventDetailPage({ event }) {
  const dateLabel = formatEventDate(event, { long: true })
  const whenLabel = formatEventTime(event)
  const hasImage = event.image && event.image !== '/placeholder-event.svg'

  // Event context for the RSVP webhook payload.
  const eventName = event.title || ''
  const eventDate = formatEventDate(event) // "Jun 14, 2026" style
  const eventTime = whenLabel
  const eventCategory = event.type || ''

  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const submitted = status === 'success'

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      firstName: String(data.get('firstName') || '').trim(),
      lastName: String(data.get('lastName') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      eventName,
      eventDate,
      eventTime,
      eventCategory,
    }

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await res.json().catch(() => ({}))
      if (!res.ok || !result.ok) {
        setErrorMsg(result.error || 'Something went wrong. Please try again in a moment.')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }
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
                <span>{dateLabel}</span>
                <span>{whenLabel}</span>
                <span>{event.location}</span>
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

          {hasImage && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="border-primary/25 bg-surface-alt/60 relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-3xl border sm:aspect-[21/9]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.image}
                alt={event.title ? `${event.title} event image` : 'Event image'}
                className="h-full w-full object-cover"
              />
            </m.div>
          )}
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
                  {event.description}
                </m.p>
              </m.div>

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
                    {dateLabel}
                  </div>
                  <div className="text-foreground/70 mt-1 text-sm">{whenLabel}</div>
                </div>
                <div className="bg-surface/80 p-6">
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Location
                  </div>
                  <div className="font-display text-foreground mt-3 text-2xl font-medium">
                    {event.location}
                  </div>
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

                {submitted ? (
                  <div
                    role="status"
                    className="border-primary/25 bg-surface-alt/60 mt-7 rounded-2xl border p-5"
                  >
                    <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                      You&rsquo;re in
                    </div>
                    <p className="font-display text-primary mt-2 text-lg leading-snug sm:text-xl">
                      Thanks — we&rsquo;ll send confirmation details to your inbox.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Input
                        label="First name"
                        name="firstName"
                        required
                        autoComplete="given-name"
                        placeholder="Barbara"
                      />
                      <Input
                        label="Last name"
                        name="lastName"
                        required
                        autoComplete="family-name"
                        placeholder="Kahl"
                      />
                    </div>
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@email.com"
                    />
                    <Input
                      label="Contact number"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(503) 555-1234"
                    />

                    {status === 'error' && errorMsg && (
                      <div
                        role="alert"
                        className="border-primary/30 bg-surface-alt/60 text-foreground rounded-2xl border px-4 py-3 text-sm"
                      >
                        {errorMsg}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={status === 'loading'}
                      aria-busy={status === 'loading'}
                    >
                      {status === 'loading' ? 'Reserving…' : 'Register'}
                    </Button>
                  </form>
                )}
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
