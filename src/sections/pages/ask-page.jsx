'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import { EASE } from '@/animations/variants'
import { pac } from '@/data/pac'
import { ISSUE_CATEGORIES, A2P_SMS_UPDATES_LABEL, A2P_SMS_PROMO_LABEL } from '@/lib/form-constants'
import { validateContactFields } from '@/lib/form'

function AskForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const clearFieldError = (name) => {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      city: String(data.get('city') || '').trim(),
      zip_code: String(data.get('zip_code') || '').trim(),
      issue_category: String(data.get('issue_category') || '').trim(),
      issue_location: String(data.get('issue_location') || '').trim(),
      issue_subject: String(data.get('issue_subject') || '').trim(),
      issue_description: String(data.get('issue_description') || '').trim(),
      sms_updates: data.get('sms_updates') === 'on' ? 'Yes' : 'No',
      sms_promo: data.get('sms_promo') === 'on' ? 'Yes' : 'No',
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

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/ask', {
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
      form.reset()
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input label="Full name" name="name" required autoComplete="name" />

      <Input
        label="Email address"
        name="email"
        type="email"
        required
        autoComplete="email"
      />

      <Input
        label="Phone number (optional)"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="(503) 555-0123"
        error={fieldErrors.phone}
        onChange={() => clearFieldError('phone')}
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
        label="Category"
        name="issue_category"
        required
        defaultValue=""
        placeholder="Choose a category"
      >
        <option value="" disabled>
          Choose a category
        </option>
        {ISSUE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>

      <Input
        label="Location (optional)"
        name="issue_location"
        autoComplete="street-address"
        placeholder="Street address or neighborhood"
      />

      <Input label="Subject" name="issue_subject" required />

      <div>
        <Textarea label="Description" name="issue_description" required rows={6} />
        <p className="text-foreground/70 mt-2 text-[13px] leading-relaxed">
          Please do not include sensitive financial, account, or identification information in your
          message.
        </p>
      </div>

      <div className="border-primary/15 space-y-4 border-t pt-6">
        <Checkbox name="sms_updates" label={A2P_SMS_UPDATES_LABEL} />
        <Checkbox name="sms_promo" label={A2P_SMS_PROMO_LABEL} />
        <p className="text-foreground/70 pt-1 text-[13px] leading-relaxed">
          By selecting this box, you consent to receive campaign emails. You will not be added to
          the list just by submitting a question.
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="text-foreground/70 max-w-md text-[13px] leading-relaxed">
          The information submitted through this form will be used to review and respond to your
          inquiry. Please review our{' '}
          <a href="/privacy-policy" className="text-primary hover:text-highlight">
            Privacy Policy
          </a>{' '}
          for additional information.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={status === 'loading'}
          aria-busy={status === 'loading'}
          className="w-full sm:w-auto"
        >
          {status === 'loading' ? 'Submitting…' : 'Submit'}
        </Button>
      </div>

      {status === 'success' && (
        <m.div
          role="status"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="border-primary/30 bg-surface-alt/60 mt-4 rounded-2xl border p-6 sm:p-8"
        >
          <h3 className="font-display text-primary text-2xl leading-tight font-medium sm:text-3xl">
            Thank you for reaching out.
          </h3>
          <p className="text-foreground/85 mt-3 text-base leading-snug sm:text-lg">
            Your question has been submitted to Northwest Oregon PAC.
          </p>
          <p className="text-foreground/80 mt-4 text-sm leading-relaxed sm:text-base">
            Our team will review your message and route it to the appropriate person. In the
            meantime, you can learn more about our priorities or explore ways to become involved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/#priorities" size="lg">
              Explore Our Priorities
            </Button>
            <Button href="/volunteer" variant="secondary" size="lg">
              Get Involved
            </Button>
          </div>
        </m.div>
      )}

      {status === 'error' && errorMsg && (
        <m.div
          role="alert"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="border-primary/40 bg-surface-alt/40 mt-4 rounded-2xl border p-4"
        >
          <p className="text-foreground/85 text-sm">{errorMsg}</p>
        </m.div>
      )}
    </form>
  )
}

export default function AskPage() {
  return (
    <>
      <PageHeader
        eyebrow="ASK NORTHWEST OREGON PAC"
        number="02"
        title="Have a question? Start here."
        description={[
          'Ask us about our mission, policy priorities, supported candidates, volunteer opportunities, events, contributions, or the process of running for office.',
          'Our team reviews each message and directs it to the appropriate contact.',
        ]}
        accent="/icons/document.svg"
      />

      {/* Ask form — primary focus of the page */}
      <section id="ask" className="relative isolate overflow-x-clip pt-4 pb-20 sm:pb-24">
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
                Ask
              </div>
              <SplitText
                as="h2"
                by="word"
                staggerChildren={0.05}
                text="Send us your question."
                className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl"
              />
              <p className="text-foreground/80 mt-5 text-base leading-relaxed">
                Tell us what&rsquo;s on your mind — a policy question, a candidate to endorse,
                an issue in your neighborhood. We read every message.
              </p>
              <div className="border-primary/15 mt-8 space-y-4 border-t pt-6">
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
                  <p className="text-foreground/90 mt-1.5 text-base sm:text-lg">{pac.contact.name}</p>
                  <p className="text-foreground/80 text-base sm:text-lg">
                    <a
                      href={`tel:${pac.contact.phone.replace(/[^\d+]/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {pac.contact.phone}
                    </a>
                  </p>
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
                <AskForm />
              </div>
            </m.div>
          </div>
        </div>
      </section>

    </>
  )
}
