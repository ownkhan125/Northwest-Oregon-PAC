'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import Select from '@/components/ui/select'
import { EASE } from '@/animations/variants'
import { pac } from '@/data/pac'
import { A2P_SMS_UPDATES_LABEL, A2P_SMS_PROMO_LABEL } from '@/lib/form-constants'
import { validateContactFields } from '@/lib/form'

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

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const clearFieldError = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

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

    const errs = validateContactFields(payload, {
      phoneKey: 'phone',
      phoneRequired: false,
      zipKey: 'zip_code',
      zipRequired: true,
    })
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs)
      const firstBadName = Object.keys(errs)[0]
      form.querySelector(`[name="${firstBadName}"]`)?.focus()
      return
    }
    setFieldErrors({})

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
        eyebrow="CONTACT THE PAC"
        number="06"
        title="Let’s start a conversation."
        description={[
          'Contact Northwest Oregon PAC about our work, candidates, policy priorities, volunteer opportunities, upcoming events, contributions, or running for office.',
          'Choose the contact method that best fits your inquiry.',
        ]}
        accent="/icons/envelope.svg"
      />

      <section
        aria-label="Contact information and form"
        className="relative isolate overflow-x-clip pt-4 pb-14 sm:pb-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="lg:sticky lg:top-32 lg:col-span-4"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Reach us
              </div>
              <SplitText
                as="h2"
                by="word"
                staggerChildren={0.05}
                text="General inquiries."
                className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl"
              />
              <p className="text-foreground/80 mt-5 text-base leading-relaxed">
                Prefer to reach out directly? Use the details below — otherwise fill out the form
                and our team will route your message to the right person.
              </p>
              <div className="border-primary/15 mt-8 space-y-5 border-t pt-6">
                <div>
                  <span className="text-muted font-mono text-[11px] tracking-[0.3em] uppercase">
                    General inquiries
                  </span>
                  <p className="mt-1.5 text-base sm:text-lg">
                    <a
                      href={`mailto:${pac.contact.generalEmail}`}
                      className="text-primary hover:text-highlight transition-colors"
                    >
                      {pac.contact.generalEmail}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-muted font-mono text-[11px] tracking-[0.3em] uppercase">
                    {pac.contact.role}
                  </span>
                  <p className="text-foreground/90 mt-1.5 text-base sm:text-lg">
                    {pac.contact.name}
                  </p>
                  <p className="text-foreground/80 text-base sm:text-lg">
                    <a
                      href={`tel:${pac.contact.phone.replace(/[^\d+]/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {pac.contact.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-muted font-mono text-[11px] tracking-[0.3em] uppercase">
                    Mailing address
                  </span>
                  <address className="text-foreground/85 mt-1.5 text-base not-italic leading-relaxed sm:text-lg">
                    {pac.contact.mailingAddressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div className="border-primary/25 bg-surface rounded-3xl border p-6 shadow-[0_30px_80px_-40px_rgba(46,69,56,0.35)] sm:p-10">
                {submitted ? (
                  <div
                    role="status"
                    className="border-primary/25 bg-surface-alt/60 rounded-2xl border p-6"
                  >
                    <p className="font-display text-primary text-xl sm:text-2xl">
                      {pac.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
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
                      inputMode="tel"
                      placeholder="(503) 555-0123"
                      error={fieldErrors.phone}
                      onChange={() => clearFieldError('phone')}
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
                        maxLength={5}
                        autoComplete="postal-code"
                        placeholder="97005"
                        error={fieldErrors.zip_code}
                        onChange={() => clearFieldError('zip_code')}
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
                      <p className="text-foreground/70 mt-2 text-[13px] leading-relaxed">
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

                    <p className="text-foreground/70 pt-2 text-[13px] leading-relaxed">
                      We use the information submitted through this form to review and respond to
                      your inquiry.
                    </p>

                    <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                      <p className="text-foreground/70 max-w-md text-[13px] leading-relaxed">
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
          </div>
        </div>
      </section>
    </>
  )
}
