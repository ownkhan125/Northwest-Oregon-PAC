'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Textarea from '@/components/ui/textarea'
import Checkbox from '@/components/ui/checkbox'
import { cardReveal, fadeUp, stagger, EASE } from '@/animations/variants'
import { priorities, antiSocialismStatement, pac } from '@/data/pac'
import { ISSUE_CATEGORIES } from '@/lib/form-constants'

function AskForm() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

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
      email_updates: data.get('email_updates') === 'on' ? 'Yes' : 'No',
    }

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
        <p className="text-foreground/60 mt-2 text-xs leading-relaxed">
          Please do not include sensitive financial, account, or identification information in your
          message.
        </p>
      </div>

      <div className="border-primary/15 space-y-3 border-t pt-6">
        <Checkbox
          name="email_updates"
          label="Send me occasional updates from Northwest Oregon PAC."
        />
        <p className="text-foreground/60 text-xs leading-relaxed">
          Submitting a question should not add someone to the email list unless this box is
          selected.
        </p>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
        <p className="text-foreground/60 max-w-md text-xs">
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
          className="border-primary/30 bg-surface-alt/60 mt-4 rounded-2xl border p-5"
        >
          <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            Thank you
          </div>
          <p className="font-display text-primary mt-2 text-lg leading-snug sm:text-xl">
            Your question is in. We&rsquo;ll be in touch from {pac.contact.generalEmail}.
          </p>
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
        eyebrow="Our Issues"
        number="02"
        title="Five priorities. One region."
        description="Northwest Oregon PAC advances a common-sense agenda focused on prosperity, accountability, safety, education, and reliable energy — the fights that matter to families and businesses across our region."
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
              <div className="border-primary/15 mt-8 space-y-3 border-t pt-6 text-sm">
                <div>
                  <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                    General inquiries
                  </span>
                  <p className="mt-1">
                    <a
                      href={`mailto:${pac.contact.generalEmail}`}
                      className="text-primary hover:text-highlight transition-colors"
                    >
                      {pac.contact.generalEmail}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                    {pac.contact.role}
                  </span>
                  <p className="text-foreground/85 mt-1">{pac.contact.name}</p>
                  <p className="text-foreground/70">{pac.contact.phone}</p>
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

      {priorities.map((issue, idx) => (
        <SectionFrame
          key={issue.id}
          id={issue.id}
          eyebrow={`Issue ${issue.id}`}
          number={issue.id}
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Our position
              </div>
              <SplitText
                as="h2"
                by="word"
                staggerChildren={0.05}
                text={issue.name}
                className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl"
              />
              <p className="font-display text-primary mt-6 text-xl leading-snug sm:text-2xl">
                “{issue.position}”
              </p>

              {issue.rationale && (
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="border-primary/25 bg-surface-alt/50 mt-8 rounded-2xl border p-5"
                >
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    Why it matters here
                  </div>
                  <p className="text-foreground/85 mt-2 text-sm sm:text-base">{issue.rationale}</p>
                </m.div>
              )}
            </div>

            <m.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="space-y-4 lg:col-span-7"
            >
              {issue.supporting.map((point, i) => (
                <m.li key={i} variants={fadeUp}>
                  <Card className="p-6" interactive={false} tilt={false}>
                    <div className="flex gap-4">
                      <span className="border-primary/30 text-primary mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-xs">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-foreground/85 flex-1 text-sm leading-relaxed sm:text-base">
                        {point}
                      </p>
                    </div>
                  </Card>
                </m.li>
              ))}
            </m.ul>
          </div>
        </SectionFrame>
      ))}

      {/* Anti-socialism statement */}
      <section className="relative isolate overflow-x-clip py-16 sm:py-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-primary/25 bg-primary text-primary-fg on-dark relative overflow-hidden rounded-3xl border p-8 sm:p-12 lg:p-16"
          >
            <div className="text-primary-fg/70 font-mono text-[10px] tracking-[0.3em] uppercase">
              A closing word
            </div>
            <h2 className="font-display text-primary-fg mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
              Economic freedom is the engine of human flourishing.
            </h2>
            <p className="text-primary-fg/85 mt-6 max-w-3xl leading-relaxed sm:text-lg">
              {antiSocialismStatement}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/donate" size="lg">
                Support the mission
              </Button>
              <Button
                href="/volunteer"
                variant="ghost"
                size="lg"
                className="border-primary-fg/30 bg-primary-fg/10 text-primary-fg hover:bg-primary-fg/20"
              >
                Get involved
              </Button>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
