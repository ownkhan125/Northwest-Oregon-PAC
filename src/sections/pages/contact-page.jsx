'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import Select from '@/components/ui/select'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac } from '@/data/pac'
import { A2P_SMS_UPDATES_LABEL, A2P_SMS_PROMO_LABEL } from '@/lib/form-constants'

const HELP_TOPIC_OPTIONS = [
  'General inquiry',
  'Candidate support',
  'Running for office',
  'Volunteer opportunity',
  'Event information',
  'Host an event',
  'Contribution question',
  'Media or interview request',
  'Website assistance',
  'Other',
]

const contactInfo = [
  {
    label: 'General inquiries',
    value: pac.contact.generalEmail,
    href: `mailto:${pac.contact.generalEmail}`,
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
    label: pac.contact.role,
    value: `${pac.contact.name}\n${pac.contact.phone}\n${pac.contact.email}`,
    href: null,
    icon: (
      <path
        d="M20 21a8 8 0 0 0-16 0M12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: 'After-hours',
    value: `${pac.contact.afterHoursName}\n${pac.contact.afterHoursPhone}`,
    href: null,
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
    label: 'Mailing address',
    value: pac.contact.mailingAddressLines.join('\n'),
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

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      firstName: String(fd.get('firstName') || '').trim(),
      lastName: String(fd.get('lastName') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      phone: String(fd.get('phone') || '').trim(),
      organization: String(fd.get('organization') || '').trim(),
      city: String(fd.get('city') || '').trim(),
      zip_code: String(fd.get('zip_code') || '').trim(),
      help_topic: String(fd.get('help_topic') || '').trim(),
      message: String(fd.get('message') || '').trim(),
      sms_updates: fd.get('sms_updates') === 'on' ? 'Yes' : 'No',
      sms_promo: fd.get('sms_promo') === 'on' ? 'Yes' : 'No',
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }
      setStatus('success')
      form.reset()
    } catch {
      setErrorMessage('Network error. Please try again.')
      setStatus('error')
    }
  }

  const submitted = status === 'success'
  const submitting = status === 'submitting'

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        number="06"
        title="We want to hear from you."
        description="Donors, volunteers, candidates, or press — reach out and we’ll be in touch soon."
        accent="/icons/envelope.svg"
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="lg:col-span-7"
            >
              <div className="border-primary/25 bg-surface rounded-3xl border p-6 sm:p-10">
                <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
                  Send a message
                </div>
                <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                  How can we help?
                </h2>

                {submitted ? (
                  <div
                    role="status"
                    className="border-primary/25 bg-surface-alt/60 mt-8 rounded-2xl border p-6"
                  >
                    <p className="font-display text-primary text-xl sm:text-2xl">
                      {pac.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input
                        label="First name"
                        name="firstName"
                        required
                        autoComplete="given-name"
                      />
                      <Input
                        label="Last name"
                        name="lastName"
                        required
                        autoComplete="family-name"
                      />
                    </div>
                    <Input
                      label="Email address"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                    />
                    <Input
                      label="Phone (optional)"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                    <Input
                      label="Organization — optional"
                      name="organization"
                      autoComplete="organization"
                    />
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Input label="City" name="city" required autoComplete="address-level2" />
                      <Input
                        label="ZIP code"
                        name="zip_code"
                        required
                        inputMode="numeric"
                        pattern="\d{5}(-\d{4})?"
                        maxLength={10}
                        autoComplete="postal-code"
                      />
                    </div>
                    <Select
                      label="What can we help with?"
                      name="help_topic"
                      required
                      defaultValue=""
                      placeholder="Choose one"
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {HELP_TOPIC_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </Select>
                    <div>
                      <Textarea label="Message" name="message" required rows={5} />
                      <p className="text-foreground/60 mt-2 text-xs leading-relaxed">
                        Provide any names, dates, districts, or other details that will help us
                        understand your inquiry.
                      </p>
                    </div>

                    <div className="border-primary/15 space-y-4 border-t pt-6">
                      <Checkbox name="sms_updates" label={A2P_SMS_UPDATES_LABEL} />
                      <Checkbox name="sms_promo" label={A2P_SMS_PROMO_LABEL} />
                    </div>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="border-primary/30 bg-surface-alt/60 text-foreground rounded-2xl border px-4 py-3 text-sm"
                      >
                        {errorMessage}
                      </div>
                    )}

                    <p className="text-foreground/60 pt-2 text-xs leading-relaxed">
                      We use the information submitted through this form to review and respond to
                      your inquiry.
                    </p>

                    <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="text-foreground/60 max-w-md text-xs leading-relaxed">
                        By submitting, you agree to our{' '}
                        <a href="/privacy-policy" className="text-primary hover:text-highlight">
                          Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="/terms-of-service" className="text-primary hover:text-highlight">
                          Terms of Service
                        </a>
                        .
                      </p>
                      <Button type="submit" size="lg" disabled={submitting}>
                        {submitting ? 'Sending…' : 'Send message'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </m.div>

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
                    className="group border-primary/20 bg-surface hover:border-primary/40 flex items-start gap-5 rounded-2xl border p-5 transition-colors"
                  >
                    <span className="border-primary/25 bg-surface-alt/60 text-primary grid h-12 w-12 shrink-0 place-items-center rounded-xl border">
                      <svg viewBox="0 0 24 24" className="h-5 w-5">
                        {c.icon}
                      </svg>
                    </span>
                    <div>
                      <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                        {c.label}
                      </div>
                      {c.href ? (
                        <a
                          href={c.href}
                          className="font-display text-foreground hover:text-primary mt-2 inline-block text-lg leading-snug whitespace-pre-line transition-colors sm:text-xl"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <address className="font-display text-foreground mt-2 text-lg leading-snug not-italic whitespace-pre-line sm:text-xl">
                          {c.value}
                        </address>
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
                className="border-primary/25 bg-surface-alt/60 mt-8 rounded-2xl border p-6"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  Follow along
                </div>
                <p className="text-foreground/85 mt-3">
                  <a
                    href={pac.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-foreground hover:text-primary text-lg sm:text-xl"
                  >
                    Northwest Oregon PAC on Facebook
                  </a>
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
                className="border-primary/25 bg-surface/70 mt-4 flex items-center justify-between gap-6 rounded-2xl border p-6"
              >
                <div>
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Have a common question?
                  </div>
                  <p className="text-foreground/85 mt-2 text-sm">Check the FAQ first.</p>
                </div>
                <Button href="/faq" variant="secondary" size="md">
                  Visit FAQ
                </Button>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
