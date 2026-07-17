'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import Select from '@/components/ui/select'
import { EASE } from '@/animations/variants'
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
        eyebrow="CONTACT THE PAC"
        number="06"
        title="Let’s start a conversation."
        description={[
          'Contact Northwest Oregon PAC about our work, candidates, policy priorities, volunteer opportunities, upcoming events, contributions, or running for office.',
          'Choose the contact method that best fits your inquiry.',
        ]}
        accent="/icons/envelope.svg"
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="border-primary/25 bg-surface rounded-3xl border p-6 sm:p-10">
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
        </div>
      </section>
    </>
  )
}
