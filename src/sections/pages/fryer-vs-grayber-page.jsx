'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Card from '@/components/ui/card'
import { fadeUp, stagger, cardReveal, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import TrackOnMount from '@/components/analytics/track-on-mount'
import {
  newEventId,
  trackFormError,
  trackFormStart,
  trackLead,
  trackNewsletterSignup,
} from '@/lib/analytics/meta'

// Copy is verbatim from the HD28 Fryer vs. Grayber funnel spec PDF (PART 1).
const FORM_NAME = 'hd28_voter_guide'
const SOURCE = 'oregon-house-district-28-comparison'
const THANK_YOU_PATH = '/oregon-house-district-28-comparison/thank-you'
const FORM_ID = 'hd28-form'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'hd28_voter_guide',
}

const FRYER_URL = 'https://www.randallfororegon.com/'
const FRYER_PHOTO = '/images/funnels/oregon-house-district-28-comparison/randall-fryer.webp'

export const HD28_PAID_FOR = 'Paid for by Randall Fryer For Representative'

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

const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-10% 0px' },
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
   Conversion form — /api/lead (source: oregon-house-district-28-comparison)
   → GHL HD28 webhook → /oregon-house-district-28-comparison/thank-you.
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
              Send Me the Free Guide
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <p className="text-foreground/70 mt-5 text-center text-[13px] leading-relaxed">
        By submitting this form, you agree to receive email communications from Northwest Oregon
        PAC. You can unsubscribe at any time.
      </p>
      <LegalLinks className="text-foreground/60 mt-2 text-center" />
    </form>
  )
}

/* ------------------------------------------------------------------
   1. HERO
------------------------------------------------------------------ */
const heroTags = ['Taxes.', 'Transportation.', 'Schools.', 'Healthcare.', 'Government programs.']

const Hero = () => (
  <section className="text-foreground relative isolate overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
      <div className="lg:col-span-7">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="bg-primary absolute inset-0 rounded-full" />
            <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
          </span>
          Oregon House District 28 • 2026 Voter Guide
        </m.div>

        <SplitText
          as="h1"
          by="word"
          text="You Paid the Taxes. What Did You Get?"
          className="font-display text-foreground text-[10vw] leading-[1.02] font-medium tracking-tight sm:text-5xl md:text-[54px] lg:text-[58px]"
          delay={0.15}
          staggerChildren={0.05}
          duration={0.7}
          inView={false}
        />

        {[
          'House District 28 voters have a choice between a challenger calling for greater limits on taxes and government spending and an incumbent with a legislative record voters can examine.',
          'Randall Fryer is asking District 28 to judge the record.',
        ].map((copy, i) => (
          <m.p
            key={copy}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 + i * 0.1, duration: 0.6 }}
            className={cn(
              'text-foreground/85 max-w-xl text-base leading-relaxed sm:text-lg',
              i === 0 ? 'mt-6' : 'mt-4',
            )}
          >
            {copy}
          </m.p>
        ))}

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="text-foreground/70 mt-5 flex max-w-xl flex-wrap gap-x-3 gap-y-1 text-sm font-medium tracking-wide sm:text-base"
        >
          {heroTags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="mt-8"
        >
          <CtaButton size="lg">Get the Free HD28 Voter Guide</CtaButton>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-foreground/65 mt-5 max-w-xl text-sm leading-relaxed"
        >
          Free download • 5-minute read • Candidate positions + legislative record
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
        className="relative lg:col-span-5"
      >
        <div className="border-border relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] border shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
          <Image
            src={FRYER_PHOTO}
            alt="Randall Fryer, candidate for Oregon House District 28"
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
            quality={85}
            className="object-cover object-[center_20%]"
          />
        </div>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   2. ONE VOTE WORTH EXAMINING — Grayber's HB 3991 vote
------------------------------------------------------------------ */
const OneVoteSection = () => (
  <section className="text-foreground relative isolate pt-8 pb-16 sm:pt-12 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
      <m.p
        variants={fadeUp}
        {...inView}
        className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase"
      >
        One Vote Worth Examining
      </m.p>

      <SplitText
        as="h2"
        by="word"
        text="Grayber Voted Yes."
        className="font-display text-foreground mt-4 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
      />
      <SplitText
        as="p"
        by="word"
        text="More Than 83% of Oregon Voters Said No."
        className="font-display text-primary mt-3 text-2xl leading-snug sm:text-3xl md:text-4xl"
      />

      <m.p
        variants={fadeUp}
        {...inView}
        className="text-foreground/80 mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
      >
        Grayber voted <strong>Yes</strong> on HB 3991, the transportation package described in the
        guide. Measure 120 later put key tax-and-fee increases from that package before Oregon
        voters, including a gas-tax increase, higher vehicle fees and a higher transit payroll tax.
      </m.p>

      <m.p
        variants={fadeUp}
        {...inView}
        className="font-display text-foreground mx-auto mt-6 max-w-2xl text-2xl leading-snug sm:text-3xl"
      >
        More than 83% voted NO.
      </m.p>

      <m.p
        variants={fadeUp}
        {...inView}
        className="text-foreground/85 mt-8 text-base leading-relaxed sm:text-lg"
      >
        Randall Fryer takes a different approach:
      </m.p>

      <m.ul
        variants={stagger}
        {...inView}
        className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
      >
        {[
          'Taxes should reflect what median-income Oregonians can afford.',
          'Highway tolling should require direct voter approval.',
        ].map((s) => (
          <m.li
            key={s}
            variants={cardReveal}
            className="border-border bg-surface text-foreground/90 flex items-start gap-3 rounded-2xl border px-5 py-4 text-[15px] leading-snug"
          >
            <span className="bg-primary/10 text-primary mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
              <Check className="h-3 w-3" />
            </span>
            <span className="font-semibold">{s}</span>
          </m.li>
        ))}
      </m.ul>

      <m.div variants={fadeUp} {...inView} className="mt-10 flex justify-center">
        <CtaButton>See the Full Transportation Comparison</CtaButton>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   3. SIDE-BY-SIDE COMPARISON — Fryer vs. Grayber (SEE THE DIFFERENCE)
------------------------------------------------------------------ */
const comparison = [
  {
    issue: 'Taxes',
    fryer: 'What can median-income Oregonians afford?',
    grayber: 'Supported HB 3991',
  },
  {
    issue: 'Transportation',
    fryer: 'Roads + voter approval for tolling',
    grayber: 'Transit + climate-focused infrastructure',
  },
  {
    issue: 'Schools',
    fryer: 'Basics + teacher judgment + results',
    grayber: 'Greater education investment',
  },
  {
    issue: 'Government Programs',
    fryer: 'Measure before expanding',
    grayber: 'Record includes expanded public programs',
  },
  {
    issue: 'Healthcare',
    fryer: 'Physician focused on delivery + cost',
    grayber: 'Greater public investment/access',
  },
  {
    issue: 'Accountability',
    fryer: 'Set limits',
    grayber: 'Incumbent record voters can judge',
  },
]

const ComparisonSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="See the Difference."
        className="font-display text-foreground mx-auto max-w-4xl text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <m.div
        variants={fadeUp}
        {...inView}
        className="border-border bg-surface mt-12 overflow-hidden rounded-3xl border shadow-[0_28px_80px_-40px_rgba(0,0,0,0.3)] lg:mt-16"
      >
        <div className="hidden grid-cols-[200px_1fr_1fr] md:grid">
          <div />
          <div className="bg-forest text-cream px-6 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Randall Fryer
          </div>
          <div className="bg-brown text-cream px-6 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Dacia Grayber
          </div>
        </div>
        <ul>
          {comparison.map((row, i) => (
            <li
              key={row.issue}
              className={cn(
                'grid grid-cols-1 md:grid-cols-[200px_1fr_1fr]',
                i > 0 && 'border-border border-t',
              )}
            >
              <p className="font-display text-foreground px-6 pt-5 text-lg md:py-5">{row.issue}</p>
              <div className="px-6 pt-3 md:py-5">
                <p className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Randall Fryer
                </p>
                <p className="text-foreground/90 mt-1 text-[15px] leading-relaxed md:mt-0">
                  {row.fryer}
                </p>
              </div>
              <div className="bg-surface-alt/30 px-6 pt-3 pb-5 md:py-5">
                <p className="text-brown dark:text-sand text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Dacia Grayber
                </p>
                <p className="text-foreground/90 mt-1 text-[15px] leading-relaxed md:mt-0">
                  {row.grayber}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </m.div>

      <m.blockquote
        variants={fadeUp}
        {...inView}
        className="border-primary mx-auto mt-10 max-w-3xl border-l-4 pl-5"
      >
        <p className="font-display text-foreground text-xl leading-snug sm:text-2xl">
          One asks government to do more. Randall Fryer asks whether what government already does
          actually works.
        </p>
      </m.blockquote>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   4. WHERE THE DIFFERENCES MATTER — the five buckets
------------------------------------------------------------------ */
const stakes = [
  {
    title: 'Your Paycheck',
    body: 'Should Salem take more, or start with what working households can afford?',
  },
  {
    title: 'Your Commute',
    body: 'Should transportation dollars follow how people actually travel?',
  },
  {
    title: 'Your Child’s Classroom',
    body: 'More spending, or reading, writing, math and measurable results?',
  },
  {
    title: 'Your Healthcare',
    body: 'More promises, or a serious conversation about care and its cost?',
  },
  {
    title: 'Your Tax Dollars',
    body: 'Should government expand programs before taxpayers see whether the first investment worked?',
  },
]

const StakesSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Where the Differences Matter."
        className="font-display text-foreground text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <m.ol
        variants={stagger}
        {...inView}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
      >
        {stakes.map((p, i) => (
          <m.li key={p.title} variants={cardReveal} className="h-full">
            <Card className="flex h-full flex-col p-6 sm:p-7" tilt={false} pointer={false}>
              <p className="text-primary group-hover:text-accent font-mono text-xs tracking-widest transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-foreground group-hover:text-primary-fg mt-3 text-2xl leading-tight font-medium transition-colors duration-500">
                {p.title}
              </h3>
              <p className="text-foreground/80 group-hover:text-primary-fg/85 mt-3 text-[15px] leading-relaxed transition-colors duration-500">
                {p.body}
              </p>
            </Card>
          </m.li>
        ))}
      </m.ol>

      <m.div variants={fadeUp} {...inView} className="mt-12 flex flex-col items-center gap-6 text-center">
        <p className="font-display text-foreground max-w-3xl text-xl leading-snug tracking-[0.02em] uppercase sm:text-2xl">
          These aren&rsquo;t abstract debates. You&rsquo;re already paying for them.
        </p>
        <CtaButton>Compare Fryer and Grayber</CtaButton>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   5. WHY FRYER IS RUNNING — bio + standards
------------------------------------------------------------------ */
const fryerStandards = [
  'Can we afford it?',
  'Do we need it?',
  'Does it work?',
  'Are we getting what we paid for?',
]

const WhyFryerSection = () => (
  <section
    style={{
      '--foreground': 'var(--cream)',
      '--primary': 'var(--sand)',
      '--primary-fg': 'var(--ink)',
      '--border': 'rgba(224, 214, 188, 0.25)',
    }}
    className="text-foreground relative isolate overflow-hidden bg-[#2a2a26] py-20 sm:py-24"
  >
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-7">
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase"
        >
          Why Fryer Is Running
        </m.p>
        <SplitText
          as="h2"
          by="word"
          text="He’s Seen What Happens When Resources Have Limits."
          className="font-display text-foreground mt-4 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/85 mt-6 text-base leading-relaxed sm:text-lg"
        >
          <a
            href={FRYER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline-offset-2 hover:underline"
          >
            Randall Fryer
          </a>{' '}
          spent years practicing medicine, including in rural and remote emergency departments.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/85 mt-4 text-base leading-relaxed sm:text-lg"
        >
          He is not a Salem incumbent. That&rsquo;s part of his case.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="font-display text-primary mt-6 text-xl leading-snug sm:text-2xl"
        >
          His standard for government is the same one working families use every day:
        </m.p>
      </div>

      <m.ul
        variants={stagger}
        {...inView}
        className="border-border grid grid-cols-1 gap-3 rounded-3xl border bg-white/[0.04] p-6 sm:p-8 lg:col-span-5"
      >
        {fryerStandards.map((s) => (
          <m.li
            key={s}
            variants={cardReveal}
            className="text-foreground/90 flex items-start gap-3 text-[16px] leading-snug"
          >
            <span className="bg-primary/15 text-primary mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full">
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className="font-semibold">{s}</span>
          </m.li>
        ))}
      </m.ul>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   6. FIVE MINUTES. ONE RECORD. A CLEARER CHOICE.
------------------------------------------------------------------ */
const guideExamines = [
  'Grayber’s HB 3991 vote',
  'The 83% rejection of Measure 120',
  'Taxes and tolling',
  'Roads vs. transit priorities',
  'PPS spending and classroom results',
  'Firefighter-apprenticeship spending',
  'Healthcare costs',
  'Grayber’s Salem record',
  'Fryer’s taxpayer-first alternative',
]

const InsideGuideSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Five Minutes. One Record. A Clearer Choice."
        className="font-display text-foreground text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />
      <m.p
        variants={fadeUp}
        {...inView}
        className="text-foreground/80 mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed sm:text-lg"
      >
        The free HD28 Voter Guide examines:
      </m.p>

      <m.ul
        variants={stagger}
        {...inView}
        className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {guideExamines.map((item) => (
          <m.li
            key={item}
            variants={cardReveal}
            className="border-border bg-surface text-foreground/90 flex items-start gap-3 rounded-2xl border px-5 py-4 text-[15px] leading-snug"
          >
            <span className="bg-primary/10 text-primary mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
              <Check className="h-3 w-3" />
            </span>
            <span>{item}</span>
          </m.li>
        ))}
      </m.ul>

      <m.p
        variants={fadeUp}
        {...inView}
        className="font-display text-foreground mt-10 text-center text-2xl leading-snug sm:text-3xl"
      >
        See the record before you cast your vote.
      </m.p>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   7. FORM
------------------------------------------------------------------ */
const FormSection = () => (
  <section className="text-foreground relative isolate py-20 sm:py-24">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-5">
        <SplitText
          as="h2"
          by="word"
          text="Get the Free HD28 Voter Guide"
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="font-display text-primary mt-6 max-w-md text-xl leading-snug sm:text-2xl"
        >
          You already paid the taxes. Find out what Salem did with them.
        </m.p>
      </div>
      <div className="lg:col-span-7">
        <GuideForm />
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   8. FINAL CTA — District 28 has a choice
------------------------------------------------------------------ */
const FinalCta = () => (
  <section className="text-foreground relative isolate py-16 sm:py-20">
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={cardReveal}
        {...inView}
        className="bg-primary text-primary-fg border-primary rounded-[28px] border px-6 py-14 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] sm:px-10 sm:py-16 md:px-16 md:py-20 dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
      >
        <SplitText
          as="h2"
          by="word"
          text="District 28 Has a Choice."
          className="font-display text-primary-fg mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-primary-fg/85 mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          One candidate is asking voters to evaluate an incumbent record. The other is asking for
          another term based on that record.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="font-display text-primary-fg mt-6 text-2xl leading-snug sm:text-3xl"
        >
          Compare the approach.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-primary-fg/70 mt-6 text-xs tracking-[0.22em] uppercase"
        >
          General Election • November 3, 2026
        </m.p>
        <m.div variants={fadeUp} {...inView} className="mt-8 flex justify-center">
          <Button
            onClick={scrollToForm}
            size="lg"
            className="!bg-primary-fg !text-primary !border-primary-fg tracking-[0.14em] uppercase hover:!opacity-90"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get the Free HD28 Voter Guide
          </Button>
        </m.div>
        <p className="mt-6 text-[13px]">
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
   FOOTER NOTE / DISCLAIMER (funnel-scoped — does not modify the site footer)
------------------------------------------------------------------ */
const LegalStrip = () => (
  <div className="border-border text-foreground border-t py-10">
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/60 text-[11px] leading-relaxed">
        <span className="font-semibold">Information &amp; Sources Disclaimer:</span> Candidate
        positions, statements, legislative records, policy information, and other factual claims in
        this guide are based on publicly available information and cited sources reviewed as of{' '}
        <strong>September 9, 2026</strong>. Candidate positions, campaign materials, websites, and
        policy proposals may change after publication. Readers are encouraged to review the cited
        sources and current candidate materials for the most recent information.
      </p>
      <p className="text-foreground/70 text-[11px] font-semibold">{HD28_PAID_FOR}</p>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
export default function FryerVsGrayberPage() {
  return (
    <>
      <TrackOnMount event="VoterInfoView" params={VIEW_PARAMS} />
      <Hero />
      <OneVoteSection />
      <ComparisonSection />
      <StakesSection />
      <WhyFryerSection />
      <InsideGuideSection />
      <FormSection />
      <FinalCta />
      <LegalStrip />
    </>
  )
}
