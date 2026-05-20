'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'

const contactInfo = [
  {
    label: 'Call us',
    value: '(415) 555-0142',
    href: 'tel:+14155550142',
    icon: (
      <path
        d="M5 5c0 8 6 14 14 14l2-4-5-2-2 2c-2-1-4-3-5-5l2-2-2-5L5 5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: 'Email us',
    value: 'team@morganhale.com',
    href: 'mailto:team@morganhale.com',
    icon: (
      <>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
        />
        <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </>
    ),
  },
  {
    label: 'Visit HQ',
    value: '412 Riverside Ave\nOakwood, CA 94602',
    href: null,
    icon: (
      <>
        <path
          d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </>
    ),
  },
]

const faqs = [
  {
    q: 'How can I volunteer for the campaign?',
    a: 'Head to our Volunteer page and fill out the short signup form. Our team will follow up within 48 hours with the next event near you.',
  },
  {
    q: 'How do I request a yard sign?',
    a: 'Email team@morganhale.com with your name and address. We deliver in waves — signs are usually at your door within 7 – 10 days of confirmation.',
  },
  {
    q: 'Can I schedule Morgan for a speaking engagement?',
    a: "Yes — please email team@morganhale.com with the event details, expected audience, and dates. We'll get back to you within a week.",
  },
  {
    q: 'Where does campaign funding go?',
    a: 'Every dollar is reported to the FEC. The bulk of grassroots donations powers field operations, voter outreach, and our small full-time team.',
  },
  {
    q: 'How can I report an issue in my community?',
    a: "Use the contact form on this page and we'll route it to the right organizer. Real concerns from real neighbors shape our priorities.",
  },
]

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <m.div variants={fadeUp} className="border-line border-b last:border-b-0">
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors',
          isOpen ? 'text-mint' : 'text-foreground hover:text-mint',
        )}
      >
        <span className="font-display text-lg font-medium sm:text-xl">{q}</span>
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors',
            isOpen ? 'border-mint bg-mint/10' : 'border-cyan/30',
          )}
        >
          <m.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </m.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-foreground/75 pr-12 pb-6">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default function ContactPage() {
  const [open, setOpen] = useState(0)
  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        number="03"
        title="We want to hear from you."
        description="A real person reads every message. Press inquiries, volunteer questions, scheduling, or a quick hello — drop us a line."
      />

      <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-7"
            >
              <div className="border-cyan/25 bg-navy-deep/70 rounded-3xl border p-6 backdrop-blur-xl sm:p-10">
                <div className="text-cyan/85 font-mono text-[11px] tracking-[0.3em] uppercase">
                  Send a message
                </div>
                <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  How can we help?
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label="First name" name="firstName" required autoComplete="given-name" />
                    <Input label="Last name" name="lastName" required autoComplete="family-name" />
                  </div>
                  <Input label="Email" name="email" type="email" required autoComplete="email" />
                  <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <Textarea
                    label="Message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind."
                  />

                  <div className="border-line space-y-3 border-t pt-6">
                    <Checkbox
                      name="sms_updates"
                      label="I agree to receive SMS updates from the campaign. Reply STOP to unsubscribe."
                    />
                    <Checkbox
                      name="sms_promo"
                      label="I agree to receive promotional SMS messages including fundraising requests."
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                    <p className="text-foreground/55 text-xs">
                      By submitting, you agree to our{' '}
                      <a href="/privacy-policy" className="text-cyan hover:text-mint">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="/terms-of-service" className="text-cyan hover:text-mint">
                        Terms
                      </a>
                      .
                    </p>
                    <Button type="submit" size="lg">
                      Send message
                    </Button>
                  </div>
                </form>
              </div>
            </m.div>

            {/* Sidebar contact info */}
            <div className="lg:col-span-5">
              <m.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                className="space-y-4"
              >
                {contactInfo.map((c) => (
                  <m.div
                    key={c.label}
                    variants={fadeUp}
                    className="group border-cyan/20 bg-navy-deep/60 hover:border-mint/40 flex items-start gap-5 rounded-2xl border p-5 backdrop-blur transition-colors"
                  >
                    <span className="border-cyan/25 bg-cyan/[0.04] text-mint grid h-12 w-12 shrink-0 place-items-center rounded-xl border">
                      <svg viewBox="0 0 24 24" className="h-5 w-5">
                        {c.icon}
                      </svg>
                    </span>
                    <div>
                      <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="font-display text-foreground hover:text-mint mt-2 inline-block text-lg leading-snug whitespace-pre-line transition-colors sm:text-xl"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <div className="font-display text-foreground mt-2 text-lg leading-snug whitespace-pre-line sm:text-xl">
                          {c.value}
                        </div>
                      )}
                    </div>
                  </m.div>
                ))}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
                className="border-mint/30 bg-mint/[0.04] mt-8 rounded-2xl border p-6"
              >
                <div className="text-mint font-mono text-[10px] tracking-[0.3em] uppercase">
                  Press
                </div>
                <p className="text-foreground/85 mt-3">
                  Press inquiries: <br />
                  <a
                    href="mailto:press@morganhale.com"
                    className="font-display text-foreground hover:text-mint text-lg sm:text-xl"
                  >
                    press@morganhale.com
                  </a>
                </p>
              </m.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="from-cyan/60 via-cyan/20 h-px origin-left bg-gradient-to-r to-transparent"
          />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="text-cyan/80 font-mono text-[11px] tracking-[0.3em] uppercase">
                Frequently asked
              </div>
              <h2 className="font-display mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
                You ask. We answer.
              </h2>
            </m.div>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="lg:col-span-7"
            >
              {faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </m.div>
          </div>
        </div>
      </section>
    </>
  )
}
