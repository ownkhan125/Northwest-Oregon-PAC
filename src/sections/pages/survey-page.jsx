'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Radio from '@/components/ui/radio'
import Select from '@/components/ui/select'
import { EASE } from '@/animations/variants'
import { pac } from '@/data/pac'
import { OREGON_COUNTIES } from '@/lib/form-constants'

const TOP_ISSUES = [
  'Cost of Living',
  'Housing',
  'Public Safety',
  'Education',
  'Government Accountability',
]

const INVOLVEMENT_OPTIONS = [
  'Receive Community Updates',
  'Volunteer',
  'Attend Events',
  'Learn More About Local Candidates',
  'Donate',
]

const LegalStrip = () => (
  <div className="border-primary/10 border-t py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/55 text-[11px] leading-relaxed">
        {pac.disclaimers.paidFor}
      </p>
      <p className="text-foreground/40 text-[10px] tracking-widest uppercase">
        {pac.disclaimers.notAuthorized}
      </p>
    </div>
  </div>
)

export default function SurveyPage() {
  const router = useRouter()
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [errors, setErrors] = useState({})

  async function onSubmit(e) {
    e.preventDefault()
    if (status === 'loading') return

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      topIssue: String(fd.get('topIssue') || '').trim(),
      county: String(fd.get('county') || '').trim(),
      involvement: String(fd.get('involvement') || '').trim(),
    }

    const nextErrors = {}
    if (!payload.topIssue) nextErrors.topIssue = 'Please select an option.'
    if (!payload.county) nextErrors.county = 'Please choose your county.'
    if (!payload.involvement) nextErrors.involvement = 'Please select an option.'
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStatus('loading')
    try {
      const res = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('submission_failed')
      router.push('/survey/thank-you')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <section className="relative isolate flex w-full items-start justify-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div
          aria-hidden
          className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-primary/10 pointer-events-none absolute bottom-0 -right-24 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        />

        <div className="relative mx-auto flex w-full max-w-3xl flex-col px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 self-start rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="bg-primary absolute inset-0 rounded-full" />
              <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
            </span>
            Community Survey
          </m.div>

          <SplitText
            as="h1"
            by="word"
            text="What Matters Most To You?"
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
            delay={0.2}
            staggerChildren={0.06}
            duration={0.7}
            inView={false}
          />

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
            className="text-foreground/75 mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            Help us understand what issues are most important to Northwest Oregon families.
          </m.p>

          <m.form
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
            onSubmit={onSubmit}
            noValidate
            data-form-state={status}
            className="border-primary/25 bg-surface mt-10 space-y-10 rounded-3xl border p-6 shadow-[0_25px_80px_-40px_rgba(46,69,56,0.35)] sm:p-8"
          >
            <fieldset className="space-y-4">
              <legend className="font-display text-foreground text-lg font-medium sm:text-xl">
                Which issue concerns you the most?
              </legend>
              <div className="space-y-3 pt-2">
                {TOP_ISSUES.map((issue) => (
                  <Radio key={issue} name="topIssue" value={issue} label={issue} />
                ))}
              </div>
              {errors.topIssue && (
                <p role="alert" className="text-primary mt-1.5 text-xs">
                  {errors.topIssue}
                </p>
              )}
            </fieldset>

            <div className="border-primary/15 border-t pt-8">
              <label
                htmlFor="county"
                className="font-display text-foreground mb-3 block text-lg font-medium sm:text-xl"
              >
                2. Which county do you live in?
              </label>
              <Select
                id="county"
                name="county"
                required
                defaultValue=""
                placeholder="Select a county"
              >
                <option value="" disabled>
                  Select a county
                </option>
                {OREGON_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
              {errors.county && (
                <p role="alert" className="text-primary mt-1.5 text-xs">
                  {errors.county}
                </p>
              )}
            </div>

            <fieldset className="border-primary/15 border-t pt-8">
              <legend className="font-display text-foreground text-lg font-medium sm:text-xl">
                3. How would you like to stay involved?
              </legend>
              <div className="mt-4 space-y-3">
                {INVOLVEMENT_OPTIONS.map((opt) => (
                  <Radio key={opt} name="involvement" value={opt} label={opt} />
                ))}
              </div>
              {errors.involvement && (
                <p role="alert" className="text-primary mt-1.5 text-xs">
                  {errors.involvement}
                </p>
              )}
            </fieldset>

            {status === 'error' && (
              <div
                role="alert"
                className="border-primary/40 bg-surface-alt/60 rounded-xl border p-4 text-sm"
              >
                Something went wrong sending your responses. Please try again in a moment.
              </div>
            )}

            <div className="flex flex-col items-stretch gap-3">
              <Button
                type="submit"
                size="lg"
                className="w-full whitespace-nowrap"
                data-testid="survey-submit"
              >
                {status === 'loading' ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="border-primary-fg/40 border-t-primary-fg h-4 w-4 animate-spin rounded-full border-2" />
                    Submitting…
                  </span>
                ) : (
                  <>
                    Submit
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </Button>
              <p className="text-foreground/55 text-center text-[11px] leading-relaxed">
                By submitting, you agree to our{' '}
                <a href="/privacy-policy" className="text-primary hover:text-highlight">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </m.form>
        </div>
      </section>

      <LegalStrip />
    </>
  )
}
