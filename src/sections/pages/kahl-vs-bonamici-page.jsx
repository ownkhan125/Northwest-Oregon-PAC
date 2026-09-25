'use client'

/* Oregon's 1st Congressional District — Kahl vs. Bonamici funnel.
   Design direction: "The Record" — an editorial ledger aesthetic that leans on
   the fourteen-year incumbent record. Emphasizes numbered dossier sections,
   monospaced vote tallies, and roll-call bar visualizations. Intentionally
   avoids the profile-card-plus-comparison-table pattern used by the HD27,
   HD28, and HD33 funnels — this funnel is built around the record itself,
   with the challenger and incumbent framed as two contrasting columns of
   evidence rather than portrait cards.

   Copy is verbatim from "Dr.barbara kahl funnel.pdf" (PART 1). */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { m } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { fadeUp, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import TrackOnMount from '@/components/analytics/track-on-mount'
import {
  newEventId,
  trackFormError,
  trackFormStart,
  trackLead,
  trackNewsletterSignup,
} from '@/lib/analytics/meta'

const FORM_NAME = 'cd1_voter_guide'
const SOURCE = 'barbara-kahl-vs-suzanne-bonamici'
const THANK_YOU_PATH = '/barbara-kahl-vs-suzanne-bonamici/thank-you'
const FORM_ID = 'cd1-form'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'cd1_voter_guide',
}

const KAHL_URL = 'https://www.drkahlforcongress.com/'
const KAHL_PHOTO = '/images/funnels/cd1/barbara-kahl.png'

export const CD1_PAID_FOR =
  'Paid for by Northwest Oregon PAC #25045. Not authorized by any candidate committee.'

/* ------------------------------------------------------------------
   Icons
------------------------------------------------------------------ */
const ArrowRight = ({ className }) => (
  <svg
    className={className}
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
)

const Check = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M5 12l4 4 10-10" />
  </svg>
)

const scrollToForm = () => {
  if (typeof window === 'undefined') return
  const el = document.getElementById(FORM_ID)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const CtaButton = ({ children, size, className }) => (
  <Button
    onClick={scrollToForm}
    size={size}
    variant="primary"
    className={cn('tracking-[0.14em] uppercase', className)}
    icon={<ArrowRight className="h-4 w-4" />}
  >
    {children}
  </Button>
)

const LegalLinks = ({ className }) => (
  <p className={cn('text-[13px]', className)}>
    <a
      href="/privacy-policy"
      className="text-primary hover:text-highlight underline-offset-2 hover:underline"
    >
      Privacy Policy
    </a>
    <span className="text-foreground/40 mx-2">|</span>
    <a
      href="/terms-of-service"
      className="text-primary hover:text-highlight underline-offset-2 hover:underline"
    >
      Terms of Service
    </a>
  </p>
)

/* ------------------------------------------------------------------
   GSAP hook — registers ScrollTrigger once client-side, then runs the
   caller's setup function inside a gsap.context so all tweens are
   cleaned up when the section unmounts.
------------------------------------------------------------------ */
const useScrollReveal = (setup) => {
  const scope = useRef(null)
  useEffect(() => {
    if (!scope.current) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(setup, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return scope
}

/* ------------------------------------------------------------------
   Form
------------------------------------------------------------------ */
const initialForm = { firstName: '', lastName: '', email: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (values) => {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Please enter your last name.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  return errors
}

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
      {message}
    </p>
  ) : null

const fields = [
  { name: 'firstName', label: 'First Name', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last Name', autoComplete: 'family-name' },
  { name: 'email', label: 'Email Address', autoComplete: 'email', type: 'email', wide: true },
]

const GuideForm = () => {
  const router = useRouter()
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const formStarted = useRef(false)

  const handleFirstInteraction = () => {
    if (formStarted.current) return
    formStarted.current = true
    trackFormStart({ form_name: FORM_NAME })
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const found = validate(values)
    if (Object.keys(found).length) {
      setErrors(found)
      setStatus('idle')
      return
    }
    setStatus('loading')
    setErrors({})
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          source: SOURCE,
        }),
      })
      if (!res.ok) throw new Error('submission_failed')
      setStatus('success')

      const eventId = newEventId()
      trackLead({ form_name: FORM_NAME }, eventId)
      trackNewsletterSignup({ form_name: FORM_NAME }, eventId)

      formStarted.current = false
      router.push(THANK_YOU_PATH)
    } catch {
      setStatus('error')
      trackFormError({ form_name: FORM_NAME })
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={handleFirstInteraction}
      onChange={handleFirstInteraction}
      noValidate
      data-form-state={status}
      id={FORM_ID}
      className="bg-surface text-foreground border-border relative rounded-3xl border p-6 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.25)] sm:p-8 dark:shadow-[0_28px_80px_-30px_rgba(0,0,0,0.55)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? 'sm:col-span-2' : undefined}>
            <label htmlFor={f.name} className="text-foreground mb-2 block text-sm font-medium">
              {f.label}
              <span className="text-primary ml-0.5">*</span>
            </label>
            <Input
              name={f.name}
              id={f.name}
              type={f.type}
              required
              autoComplete={f.autoComplete}
              value={values[f.name]}
              onChange={onChange}
              aria-invalid={!!errors[f.name]}
              aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            />
            <FieldError id={`${f.name}-error`} message={errors[f.name]} />
          </div>
        ))}
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
        >
          Something went wrong sending your info. Please try again in a moment.
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-full tracking-[0.14em] whitespace-nowrap uppercase"
          data-testid="funnel-submit"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <span className="border-primary-fg/40 border-t-primary-fg h-4 w-4 animate-spin rounded-full border-2" />
              Sending…
            </span>
          ) : (
            <>
              Send Me the Guide
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <p className="text-foreground/70 mt-5 text-center text-[13px] leading-relaxed">
        By submitting this form, you agree to receive email communications from Northwest Oregon
        PAC. You may unsubscribe at any time.
      </p>
      <LegalLinks className="text-foreground/60 mt-2 text-center" />
    </form>
  )
}

/* ------------------------------------------------------------------
   1. HERO — the "14" mark
------------------------------------------------------------------ */
const heroIssues = ['Jobs', 'Energy', 'Immigration', 'Schools', 'Healthcare', 'Federal Accountability']

const Hero = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-hero-mark]', {
      opacity: 0,
      scale: 0.92,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.1,
    })
    gsap.from('[data-hero-issue]', {
      opacity: 0,
      y: 14,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.06,
      delay: 0.9,
    })
  })

  return (
    <section
      ref={scope}
      className="text-foreground relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* Giant "14" typographic mark — the recurring motif of the funnel. Sits
          behind the H1 as a soft ledger stamp; below md it slips off the right
          edge so it never crowds the copy. */}
      <div
        aria-hidden
        data-hero-mark
        className="pointer-events-none absolute -top-4 right-0 -z-10 select-none sm:top-8 md:top-4 md:right-[-4vw] lg:right-0"
      >
        <span className="font-display text-primary/[0.06] block text-[46vw] leading-none font-medium sm:text-[34vw] md:text-[26vw] lg:text-[22vw] dark:text-primary/[0.10]">
          14
        </span>
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <div className="lg:col-span-7">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="bg-primary absolute inset-0 rounded-full" />
              <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
            </span>
            Oregon&rsquo;s 1st Congressional District • 2026 Voter Guide
          </m.div>

          <SplitText
            as="h1"
            by="word"
            text="What does the record show after serving 14 years in Washington?"
            className="font-display text-foreground text-[9vw] leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px] lg:text-[58px]"
            delay={0.2}
            staggerChildren={0.05}
            duration={0.65}
            inView={false}
          />

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-foreground/85 mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            <strong>Suzanne Bonamici</strong> has represented Oregon&rsquo;s 1st Congressional
            District since 2012.
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-foreground/85 mt-3 max-w-2xl text-base leading-relaxed sm:text-lg"
          >
            Now veterinarian, former Intel employee, and fourth-generation Oregonian{' '}
            <a
              href={KAHL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              Barbara Kahl
            </a>{' '}
            is challenging that record with a different approach to:
          </m.p>

          <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
            {heroIssues.map((issue) => (
              <span
                key={issue}
                data-hero-issue
                className="border-primary/25 bg-surface/60 text-foreground/90 rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase backdrop-blur-sm sm:text-[13px]"
              >
                {issue}
              </span>
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-9"
          >
            <CtaButton size="lg">Get the Free CD1 Voter Guide</CtaButton>
          </m.div>

          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.6 }}
            className="text-foreground/65 mt-5 max-w-xl text-sm leading-relaxed"
          >
            Free download • 5-minute read • Candidate positions + congressional record
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
          className="relative lg:col-span-5"
        >
          <figure className="border-border relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-[24px] border shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
            <Image
              src={KAHL_PHOTO}
              alt="Dr. Barbara Kahl, candidate for Oregon’s 1st Congressional District"
              fill
              priority
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 60vw, 90vw"
              quality={90}
              className="object-cover object-center"
            />
            <figcaption className="from-ink/85 absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent p-5 pt-16">
              <p className="text-sand text-[10px] font-semibold tracking-[0.22em] uppercase">
                The Challenger
              </p>
              <p className="font-display text-cream mt-1 text-2xl leading-tight font-medium">
                Dr. Barbara Kahl
              </p>
            </figcaption>
          </figure>
        </m.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   2. LOOK AT THE RECORD — Immigration + Laken Riley vote card
------------------------------------------------------------------ */

// Roll-call bar for a single vote. Renders two segments (Yea / Nay) that
// GSAP scales in horizontally on scroll-in — a small ledger-style flourish.
const RollCall = ({ yea, nay, className }) => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-rc-bar]', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: scope.current, start: 'top 80%' },
      stagger: 0.05,
    })
  })
  const total = yea + nay
  const yeaPct = (yea / total) * 100
  return (
    <div ref={scope} className={cn('w-full', className)}>
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] uppercase">
        <span className="text-primary">Yea {yea}</span>
        <span className="text-brown dark:text-sand">Nay {nay}</span>
      </div>
      <div className="border-border mt-2 flex h-2 w-full overflow-hidden rounded-full border">
        <span
          data-rc-bar
          className="bg-primary block h-full"
          style={{ width: `${yeaPct}%` }}
        />
        <span
          data-rc-bar
          className="bg-brown dark:bg-sand block h-full flex-1"
        />
      </div>
    </div>
  )
}

const LookAtTheRecordSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-record-block]', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, start: 'top 70%' },
    })
  })

  return (
    <section
      ref={scope}
      className="text-foreground relative isolate py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <div data-record-block>
          <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
            Immigration
          </p>
          <SplitText
            as="h2"
            by="word"
            text="Look at the record."
            className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
          />
        </div>

        {/* Bonamici direct-quote card */}
        <div
          data-record-block
          className="border-primary bg-surface-alt/25 relative mt-10 rounded-2xl border-l-4 p-6 sm:p-8"
        >
          <p className="text-foreground/70 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Bonamici&rsquo;s Campaign Says
          </p>
          <p className="font-display text-foreground mt-2 text-2xl leading-snug italic sm:text-3xl">
            &ldquo;No more ICE funding.&rdquo;
          </p>
        </div>

        {/* Laken Riley Act vote card */}
        <div
          data-record-block
          className="border-border bg-surface relative mt-6 overflow-hidden rounded-2xl border p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.28)] sm:p-8 dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.6)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-primary text-[11px] font-semibold tracking-[0.24em] uppercase">
                The Congressional Record
              </p>
              <p className="font-display text-foreground mt-2 text-xl leading-tight sm:text-2xl">
                Laken Riley Act — final 2025 House vote
              </p>
            </div>
            <span className="border-brown bg-brown/10 text-brown dark:border-sand dark:bg-sand/10 dark:text-sand inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.24em] uppercase">
              <span className="relative grid h-1.5 w-1.5 place-items-center">
                <span className="bg-brown dark:bg-sand absolute inset-0 rounded-full" />
              </span>
              Bonamici voted Nay
            </span>
          </div>
          <RollCall yea={263} nay={156} className="mt-6" />
          <p className="text-foreground/80 mt-5 text-[15px] leading-relaxed sm:text-base">
            Her congressional record includes Nay votes on the Laken Riley Act in both 2024 and
            2025. The final 2025 House vote passed 263–156. Bonamici voted Nay.
          </p>
        </div>

        {/* Kahl alternative */}
        <div
          data-record-block
          className="border-primary/20 mt-6 rounded-2xl border-l-2 pl-6 sm:pl-8"
        >
          <p className="text-primary text-[11px] font-semibold tracking-[0.24em] uppercase">
            Barbara Kahl&rsquo;s Position
          </p>
          <p className="text-foreground/85 mt-2 text-[15px] leading-relaxed sm:text-base">
            Barbara Kahl&rsquo;s published position emphasizes border enforcement, spending
            constraints and stricter eligibility for government benefits.
          </p>
        </div>

        <div data-record-block className="mt-10">
          <CtaButton>See the Complete Immigration Record</CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   3. WHAT DOES BARBARA KAHL OFFER INSTEAD — priority chips
------------------------------------------------------------------ */
const kahlPriorities = [
  'Economic growth',
  'Fewer costs and less red tape for small businesses',
  'Federal accountability',
  'School choice and teacher freedom',
  'Lower healthcare costs',
  'Responsible forest management',
  'Housing permitting reform',
  'Protecting Oregon’s ports and maritime economy',
]

const KahlPrioritiesSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-priority-chip]', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.05,
      scrollTrigger: { trigger: scope.current, start: 'top 75%' },
    })
  })
  return (
    <section ref={scope} className="text-foreground relative isolate pb-16 sm:pb-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <SplitText
          as="h2"
          by="word"
          text="What does Barbara Kahl offer instead?"
          className="font-display text-foreground text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl md:text-[42px]"
        />
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-foreground/85 mt-6 max-w-3xl text-base leading-relaxed sm:text-lg"
        >
          Kahl is running on a different set of priorities. Her campaign describes her approach as
          putting evidence, accountability, and the needs of Oregon communities ahead of Washington
          politics.
        </m.p>

        <ul className="mt-8 flex flex-wrap gap-2.5">
          {kahlPriorities.map((p) => (
            <li
              key={p}
              data-priority-chip
              className="border-border bg-surface text-foreground/90 flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] leading-tight"
            >
              <span className="bg-primary/10 text-primary grid h-4 w-4 shrink-0 place-items-center rounded-full">
                <Check className="h-2.5 w-2.5" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   4. WHERE DO THEY DIFFER — contrast rows, alternating reveal
   (not a table; each policy area is its own labeled two-column row)
------------------------------------------------------------------ */
const differences = [
  {
    issue: 'Economy',
    kahl: 'Production + lower barriers',
    bonamici: 'Federal government investment + climate policy',
  },
  {
    issue: 'Energy',
    kahl: 'Reliability + cost',
    bonamici: 'Federal energy/climate policy',
  },
  {
    issue: 'Immigration',
    kahl: 'Border enforcement',
    bonamici: 'Less ICE funding + Nay on Laken Riley Act',
  },
  {
    issue: 'Schools',
    kahl: 'Choice + money follows student',
    bonamici: 'Greater federal government education spending',
  },
  {
    issue: 'Healthcare',
    kahl: 'Lower prices first',
    bonamici: 'Greater federal government role in coverage',
  },
  {
    issue: 'Federal Role',
    kahl: 'Accountability + less red tape',
    bonamici: 'Broader federal government programs/investment',
  },
]

const DifferencesSection = () => {
  const scope = useScrollReveal(() => {
    gsap.utils.toArray('[data-diff-row]').forEach((row, i) => {
      gsap.from(row, {
        opacity: 0,
        y: 24,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 80%' },
        delay: i * 0.02,
      })
      // Kahl and Bonamici sides ease in from opposite edges — a subtle
      // reinforcement of the "two contrasting columns of evidence" idea.
      gsap.from(row.querySelector('[data-diff-side="kahl"]'), {
        x: -18,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 80%' },
      })
      gsap.from(row.querySelector('[data-diff-side="bonamici"]'), {
        x: 18,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: row, start: 'top 80%' },
      })
    })
  })
  return (
    <section
      ref={scope}
      style={{
        '--foreground': 'var(--cream)',
        '--primary': 'var(--sand)',
        '--primary-fg': 'var(--ink)',
        '--border': 'rgba(224, 214, 188, 0.22)',
      }}
      className="text-foreground relative isolate overflow-hidden bg-[#2a2a26] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
            The Difference
          </p>
          <SplitText
            as="h2"
            by="word"
            text="Where do they differ?"
            className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
          />
        </div>

        {/* Column headers — tiny anchors that repeat the two names above the
            rows so the reader keeps their sides straight while scrolling. */}
        <div className="mx-auto mt-12 hidden max-w-5xl grid-cols-[minmax(140px,180px)_1fr_1fr] gap-6 md:grid">
          <div />
          <div className="text-primary text-[11px] font-semibold tracking-[0.24em] uppercase">
            Barbara Kahl
          </div>
          <div className="text-foreground/70 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Suzanne Bonamici
          </div>
        </div>

        <ul className="mx-auto mt-4 max-w-5xl divide-y divide-[rgba(224,214,188,0.15)]">
          {differences.map((row) => (
            <li
              key={row.issue}
              data-diff-row
              className={cn(
                'group/row relative grid grid-cols-1 gap-3 py-6 md:grid-cols-[minmax(140px,180px)_1fr_1fr] md:gap-6',
                'transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                'hover:bg-[rgba(224,214,188,0.04)]',
              )}
            >
              {/* Left accent bar — a thin primary tick grows top-down on
                  hover, marking the row currently under the reader's eye. */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute top-5 bottom-5 -left-4 hidden w-[2px] origin-top rounded-full bg-primary md:block',
                  'scale-y-0 opacity-0 [will-change:transform,opacity]',
                  'transition-[opacity,transform] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                  'group-hover/row:scale-y-100 group-hover/row:opacity-100',
                )}
              />

              {/* Highlighter — a sand-toned line sweeps in along the bottom
                  of the row, left to right, like ink being drawn across a
                  ledger entry. */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left bg-gradient-to-r from-primary via-primary/60 to-transparent',
                  'scale-x-0 [will-change:transform]',
                  'transition-transform duration-[750ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                  'group-hover/row:scale-x-100',
                )}
              />

              <p
                className={cn(
                  'font-display text-primary relative text-lg leading-tight md:pt-1',
                  '[will-change:transform]',
                  'transition-[transform,text-shadow] duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                  'md:group-hover/row:translate-x-1',
                  'group-hover/row:[text-shadow:0_0_18px_rgba(224,214,188,0.25)]',
                )}
              >
                {row.issue}
              </p>
              <div data-diff-side="kahl" className="md:pt-1">
                <p className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Barbara Kahl
                </p>
                <p
                  className={cn(
                    'text-foreground/90 mt-1 text-[15px] leading-relaxed md:mt-0 md:text-base',
                    'transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                    'group-hover/row:text-foreground',
                  )}
                >
                  {row.kahl}
                </p>
              </div>
              <div data-diff-side="bonamici" className="md:pt-1">
                <p className="text-foreground/60 text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Suzanne Bonamici
                </p>
                <p
                  className={cn(
                    'text-foreground/75 mt-1 text-[15px] leading-relaxed md:mt-0 md:text-base',
                    'transition-colors duration-[600ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
                    'group-hover/row:text-foreground/95',
                  )}
                >
                  {row.bonamici}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <CtaButton>Read the Full CD1 Guide</CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   5. THREE RECENT VOTES — a deck of ledger cards
------------------------------------------------------------------ */
const votes = [
  {
    kicker: 'Laken Riley Act',
    dates: '2024 & 2025',
    body: 'Bonamici voted Nay on the legislation in 2024 and again when Congress considered the Laken Riley Act in 2025.',
    yea: 263,
    nay: 156,
    note: 'Final 2025 House vote',
  },
  {
    kicker: 'National Fraud Enforcement Division Act',
    dates: 'September 16, 2026',
    body: 'Bonamici voted Nay on H.R. 9576, the National Fraud Enforcement Division Act of 2026. The legislation would establish the National Fraud Enforcement Division within the Department of Justice.',
    yea: 352,
    nay: 72,
    note: 'House passed 352–72',
  },
  {
    kicker: '“Denouncing the Horrors of Socialism”',
    dates: '2023',
    body: 'The House considered H.Con.Res.9 under that title. Bonamici voted Nay.',
    yea: 328,
    nay: 86,
    note: 'House passed 328–86',
  },
]

const ThreeVotesSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-vote-card]', {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, start: 'top 78%' },
    })
  })
  return (
    <section ref={scope} className="text-foreground relative isolate py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
            The Record — Three Recent Votes
          </p>
          <SplitText
            as="h2"
            by="word"
            text="Three recent votes in the record."
            className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {votes.map((v, i) => (
            <li
              key={v.kicker}
              data-vote-card
              className="border-border bg-surface flex h-full flex-col rounded-2xl border p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.24)] sm:p-7 dark:shadow-[0_18px_50px_-30px_rgba(0,0,0,0.55)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-primary font-mono text-xs tracking-[0.16em]">
                  {String(i + 1).padStart(2, '0')} / 03
                </span>
                <span className="text-foreground/60 font-mono text-[11px] tracking-[0.14em] uppercase">
                  {v.dates}
                </span>
              </div>
              <p className="text-foreground/60 mt-4 text-[10px] font-semibold tracking-[0.22em] uppercase">
                Vote
              </p>
              <h3 className="font-display text-foreground mt-2 text-xl leading-tight sm:text-2xl">
                {v.kicker}
              </h3>
              <p className="text-foreground/85 mt-4 text-[15px] leading-relaxed">{v.body}</p>
              <div className="mt-6">
                <p className="text-foreground/60 text-[10px] font-semibold tracking-[0.22em] uppercase">
                  {v.note}
                </p>
                <RollCall yea={v.yea} nay={v.nay} className="mt-3" />
              </div>
              <div className="mt-6 flex items-center gap-2">
                <span className="border-brown/60 bg-brown/10 text-brown dark:border-sand/50 dark:bg-sand/10 dark:text-sand inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.24em] uppercase">
                  Bonamici Nay
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <CtaButton>Get the Guide for the Sourced Congressional Record</CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   6. CD-1 NEEDS POWER — editorial energy panel
------------------------------------------------------------------ */
const PowerSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-power-el]', {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: scope.current, start: 'top 75%' },
    })
  })
  return (
    <section ref={scope} className="text-foreground relative isolate py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-5 sm:px-8 md:grid-cols-12 md:gap-14 lg:px-12">
        <div className="md:col-span-5">
          <p data-power-el className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
            Energy
          </p>
          <SplitText
            as="h2"
            by="word"
            text="CD-1 needs power."
            className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
          />
        </div>
        <div className="md:col-span-7">
          <p data-power-el className="font-display text-foreground text-2xl leading-snug sm:text-3xl">
            Homes need it. Semiconductor manufacturing needs it. And data centers increasingly need
            it.
          </p>
          <p data-power-el className="text-foreground/80 mt-6 text-base leading-relaxed sm:text-lg">
            Bonamici introduced H.R. 7129, addressing hydropower, marine energy and pumped storage,
            including research concerning integration with large loads such as data centers.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   7. THREE QUESTIONS BARBARA KAHL IS ASKING
------------------------------------------------------------------ */
const questions = [
  {
    tag: 'Your Jobs',
    q: 'Does Washington make it easier or difficult to build, manufacture, ship, and hire?',
  },
  {
    tag: 'Your Power Bill',
    q: 'Who pays when data centers, factories, and households compete for limited grid capacity?',
  },
  {
    tag: 'Your Federal Representative',
    q: 'Does the incumbent’s current record reflect the priorities of the district she has represented since 2012?',
  },
]

const QuestionsSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-question]', {
      opacity: 0,
      y: 26,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: scope.current, start: 'top 78%' },
    })
  })
  return (
    <section
      ref={scope}
      style={{
        '--foreground': 'var(--cream)',
        '--primary': 'var(--sand)',
        '--border': 'rgba(224, 214, 188, 0.22)',
      }}
      className="text-foreground relative isolate overflow-hidden bg-[#2a2a26] py-20 sm:py-24"
    >
      {/* Kahl portrait as an atmospheric right-side visual (lg+ only). Below
          lg the image is hidden and the original centered layout runs full
          width. Multiple stacked gradients dissolve the portrait into the
          section background from the left, so it reads as an editorial
          treatment rather than a plain image block. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block xl:w-[55%]"
      >
        <Image
          src={KAHL_PHOTO}
          alt=""
          fill
          sizes="55vw"
          quality={85}
          className="object-cover object-[center_18%]"
        />
        {/* Left-to-right blend — image dissolves into the dark section bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a26] from-0% via-[#2a2a26]/85 via-30% to-transparent to-95%" />
        {/* Top + bottom soft feather — hides any hard image edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a26]/60 via-transparent to-[#2a2a26]/80" />
        {/* Subtle darken pass — keeps left-side card contrast strong */}
        <div className="absolute inset-0 bg-[#2a2a26]/25" />
        {/* Warm sand highlight radiating from the upper-right, adds depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(224,214,188,0.09),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="lg:max-w-[52%] xl:max-w-[54%]">
          <SplitText
            as="h2"
            by="word"
            text="Three questions Barbara Kahl is asking."
            className="font-display text-foreground mx-auto max-w-4xl text-center text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl md:text-[42px] lg:mx-0 lg:text-left"
          />
          <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-1 lg:gap-5">
            {questions.map((it, i) => (
              <li
                key={it.tag}
                data-question
                className="border-border/60 relative rounded-2xl border-t bg-white/[0.03] p-6 pt-8 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8"
              >
                <span className="text-primary absolute -top-4 left-6 bg-[#2a2a26] px-3 font-mono text-xs tracking-[0.24em]">
                  Q{String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase">
                  {it.tag}
                </p>
                <p className="font-display text-foreground mt-3 text-xl leading-snug sm:text-2xl">
                  {it.q}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   8. EDUCATION — split ledger row
------------------------------------------------------------------ */
const EducationSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-edu-col]', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.14,
      scrollTrigger: { trigger: scope.current, start: 'top 75%' },
    })
  })
  return (
    <section ref={scope} className="text-foreground relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
          Education
        </p>
        <SplitText
          as="h2"
          by="word"
          text="Spending and outcomes."
          className="font-display text-foreground mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          <div
            data-edu-col
            className="border-primary/30 rounded-2xl border-l-[3px] py-2 pl-6 sm:pl-8"
          >
            <p className="text-foreground/60 text-[10px] font-semibold tracking-[0.22em] uppercase">
              Suzanne Bonamici
            </p>
            <p className="text-foreground/85 mt-3 text-[15px] leading-relaxed sm:text-base">
              Serves on the House Education and Workforce Committee and advocates increased federal
              government education funding.
            </p>
          </div>
          <div
            data-edu-col
            className="border-primary rounded-2xl border-l-[3px] py-2 pl-6 sm:pl-8"
          >
            <p className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase">
              Barbara Kahl
            </p>
            <p className="text-foreground/85 mt-3 text-[15px] leading-relaxed sm:text-base">
              Proposes school choice, teacher freedom, vocational pathways and funding that follows
              students.
            </p>
          </div>
        </div>

        <p
          data-edu-col
          className="font-display text-foreground mt-10 max-w-3xl text-2xl leading-snug sm:text-3xl"
        >
          The guide compares what each candidate proposes for the federal government&rsquo;s role in
          education.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   9. INSIDE THE GUIDE
------------------------------------------------------------------ */
const guideItems = [
  'Bonamici’s fourteen-year congressional record',
  'Kahl’s background and priorities',
  'Jobs and manufacturing',
  'Energy and data centers',
  'Border enforcement and ICE',
  'Schools and federal education funding',
  'Healthcare costs',
  'Federal accountability',
]

const InsideTheGuideSection = () => {
  const scope = useScrollReveal(() => {
    gsap.from('[data-guide-item]', {
      opacity: 0,
      x: -14,
      duration: 0.55,
      ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: scope.current, start: 'top 75%' },
    })
  })
  return (
    <section ref={scope} className="text-foreground relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
        <SplitText
          as="h2"
          by="word"
          text="Inside the guide."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
        />
        <ul className="mx-auto mt-10 grid max-w-3xl auto-rows-fr grid-cols-1 gap-2.5 text-left sm:grid-cols-2">
          {guideItems.map((item) => (
            <li
              key={item}
              data-guide-item
              className={cn(
                'group/guide relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-[15px] leading-snug',
                'border-border bg-surface text-foreground/90',
                'transition-[border-color,background-color,box-shadow,color] duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]',
                'hover:border-primary/40 hover:bg-primary/[0.04] hover:text-foreground',
                'hover:shadow-[0_0_0_1px_rgba(46,69,56,0.06),0_10px_28px_-18px_rgba(46,69,56,0.28)]',
                'dark:hover:bg-primary/[0.07]',
                'dark:hover:shadow-[0_0_0_1px_rgba(224,214,188,0.10),0_12px_30px_-20px_rgba(0,0,0,0.55)]',
              )}
            >
              {/* Soft primary wash sweeps in from the left on hover. */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute inset-0 origin-left bg-gradient-to-r from-primary/[0.06] via-primary/[0.02] to-transparent',
                  'scale-x-0 opacity-0 transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]',
                  'group-hover/guide:scale-x-100 group-hover/guide:opacity-100',
                )}
              />
              <span
                className={cn(
                  'relative bg-primary/10 text-primary mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full',
                  'transition-[background-color,box-shadow,transform] duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]',
                  'group-hover/guide:bg-primary/25 group-hover/guide:scale-110',
                  'group-hover/guide:shadow-[0_0_0_5px_rgba(46,69,56,0.12)] dark:group-hover/guide:shadow-[0_0_0_5px_rgba(224,214,188,0.14)]',
                )}
              >
                <Check className="h-3 w-3" />
              </span>
              <span className="relative">{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-display text-primary mx-auto mt-10 max-w-2xl text-xl leading-snug sm:text-2xl">
          Five minutes. One district. See clearer comparison.
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   10. FORM
------------------------------------------------------------------ */
const FormSection = () => (
  <section className="text-foreground relative isolate py-20 sm:py-24">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-5">
        <SplitText
          as="h2"
          by="word"
          text="Get the free CD1 voter guide."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
        />
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-foreground/80 mt-6 max-w-md text-base leading-relaxed sm:text-lg"
        >
          Fourteen years of votes on record. Five minutes to compare.
        </m.p>
      </div>
      <div className="lg:col-span-7">
        <GuideForm />
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   11. FINAL CTA — Fourteen Years Creates a Record
------------------------------------------------------------------ */
const FinalCta = () => (
  <section className="text-foreground relative isolate py-16 sm:py-20">
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="bg-primary text-primary-fg border-primary relative overflow-hidden rounded-[28px] border px-6 py-14 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] sm:px-10 sm:py-16 md:px-16 md:py-20 dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
      >
        <span
          aria-hidden
          className="font-display text-primary-fg/[0.08] pointer-events-none absolute -top-6 -right-4 select-none text-[26vw] leading-none font-medium sm:text-[20vw] md:text-[16vw]"
        >
          14
        </span>
        <SplitText
          as="h2"
          by="word"
          text="Fourteen years creates a record."
          className="font-display text-primary-fg relative mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-primary-fg/85 relative mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          Barbara Kahl is asking voters to compare that record with a different approach to jobs,
          energy, schools, healthcare, and federal accountability.
        </m.p>
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="font-display text-primary-fg relative mt-6 text-2xl leading-snug sm:text-3xl"
        >
          You have the record. Compare the record and priorities. Decide for yourself.
        </m.p>
        <p className="text-primary-fg/70 relative mt-6 text-xs tracking-[0.22em] uppercase">
          General Election • November 3, 2026
        </p>
        <div className="relative mt-8 flex justify-center">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="!bg-primary-fg !text-primary !border-primary-fg tracking-[0.14em] uppercase hover:!opacity-90"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get the Free CD1 Voter Guide
          </Button>
        </div>
        <p className="relative mt-6 text-[13px]">
          <a href="/privacy-policy" className="text-primary-fg/80 underline-offset-2 hover:underline">
            Privacy Policy
          </a>
          <span className="text-primary-fg/40 mx-2">|</span>
          <a
            href="/terms-of-service"
            className="text-primary-fg/80 underline-offset-2 hover:underline"
          >
            Terms of Service
          </a>
        </p>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   FOOTER DISCLAIMER — funnel-scoped. Rendered at the very bottom of the
   global site Footer (see src/sections/footer.jsx) rather than inline in
   the page, so it reads as an integrated final band of the footer with
   its container edges aligned to the footer's max-w-7xl grid.
------------------------------------------------------------------ */
export const KahlLegalStrip = () => (
  <div className="border-border border-t">
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-5 py-6 text-center sm:px-8 sm:py-7 lg:px-12">
      <p className="text-foreground/60 text-[11px] leading-relaxed">
        <span className="font-semibold">Information &amp; Sources Disclaimer:</span> Candidate
        positions, statements, voting records, policy information, and other factual claims on this
        page are based on publicly available information and cited sources reviewed as of{' '}
        <strong>September 21, 2026</strong>. Candidate positions, campaign materials, websites,
        and policy proposals may change. Please review linked sources and current candidate
        materials for the latest information.
      </p>
      <p className="text-foreground/70 text-[11px] font-semibold">{CD1_PAID_FOR}</p>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
export default function KahlVsBonamiciPage() {
  return (
    <>
      <TrackOnMount event="VoterInfoView" params={VIEW_PARAMS} />
      <Hero />
      <LookAtTheRecordSection />
      <KahlPrioritiesSection />
      <DifferencesSection />
      <ThreeVotesSection />
      <PowerSection />
      <QuestionsSection />
      <EducationSection />
      <InsideTheGuideSection />
      <FormSection />
      <FinalCta />
    </>
  )
}
