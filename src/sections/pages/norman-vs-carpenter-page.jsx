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

// Copy is verbatim from "LM_FUNNEL - MN & TC Comparison - updated.docx".
const FORM_NAME = 'hd27_voter_guide'
const SOURCE = 'mark-norman-vs-tammy-carpenter'
const THANK_YOU_PATH = '/mark-norman-vs-tammy-carpenter/thank-you'
const FORM_ID = 'hd27-form'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'hd27_voter_guide',
}

const NORMAN_URL = 'https://www.markfororegon.com/'
const NORMAN_PHOTO = '/images/funnels/norman-vs-carpenter/mark-norman.jpg'

export const HD27_PAID_FOR = 'Paid for by Friends of Mark Norman PAC #24927'

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
   Conversion form — /api/lead (source: mark-norman-vs-tammy-carpenter)
   → GHL HD27 webhook → /mark-norman-vs-tammy-carpenter/thank-you.
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
   1. HERO
------------------------------------------------------------------ */
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
          Oregon House District 27 • 2026 Voter Guide
        </m.div>

        <SplitText
          as="h1"
          by="word"
          text="More Government Means More Taxpayer Funding."
          className="font-display text-foreground text-[10vw] leading-[1.02] font-medium tracking-tight sm:text-5xl md:text-[54px] lg:text-[58px]"
          delay={0.15}
          staggerChildren={0.05}
          duration={0.7}
          inView={false}
        />

        {[
          'Mark Norman and Tammy Carpenter propose substantially different approaches to spending, taxation, healthcare, housing and government’s role in Oregon.',
          'Mark Norman wants lower costs, controlled spending, more housing construction and government measured by results.',
          'Tammy Carpenter is a democratic socialist and supports higher taxes on wealthy Oregonians.',
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
          transition={{ delay: 1.15, duration: 0.6 }}
          className="font-display text-primary mt-6 max-w-xl text-xl leading-snug sm:text-2xl"
        >
          Before you vote, look beyond the promises and understand what they could cost.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="mt-8"
        >
          <CtaButton size="lg">Get the Free HD27 Voter Guide</CtaButton>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-foreground/65 mt-5 max-w-xl text-sm leading-relaxed"
        >
          Free download • 5-minute read • Based on candidate positions and public records
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
            src={NORMAN_PHOTO}
            alt="Mark Norman, candidate for Oregon House District 27"
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
   2. THIS ISN'T JUST ABOUT PARTY LABELS
------------------------------------------------------------------ */
const stakes = [
  'How much you pay.',
  'How Oregon funds healthcare.',
  'How housing gets built.',
  'What schools prioritize.',
  'How communities address crime, addiction and homelessness.',
  'Whether Northwest Oregon remains competitive for jobs and investment.',
]

const StakesSection = () => (
  <section className="text-foreground relative isolate pt-8 pb-16 sm:pt-12 sm:pb-20">
    <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="This Isn’t Just About Party Labels."
        className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
      />

      <m.p
        variants={fadeUp}
        {...inView}
        className="text-foreground/80 mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
      >
        The next representative from House District 27 will vote on decisions that affect:
      </m.p>

      <m.ul
        variants={stagger}
        {...inView}
        className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-left sm:grid-cols-2"
      >
        {stakes.map((s) => (
          <m.li
            key={s}
            variants={cardReveal}
            className="border-border bg-surface text-foreground/90 flex items-start gap-3 rounded-2xl border px-5 py-4 text-[15px] leading-snug"
          >
            <span className="bg-primary/10 text-primary mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
              <Check className="h-3 w-3" />
            </span>
            {s}
          </m.li>
        ))}
      </m.ul>

      <m.p
        variants={fadeUp}
        {...inView}
        className="text-foreground/80 mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
      >
        And Mark Norman and Tammy Carpenter have very different ideas about those decisions.
      </m.p>

      <m.div variants={fadeUp} {...inView} className="mt-10">
        <p className="font-display text-foreground text-2xl leading-snug tracking-[0.02em] uppercase sm:text-3xl">
          The question isn&rsquo;t only what government promises.
        </p>
        <p className="font-display text-primary mt-3 text-2xl leading-snug tracking-[0.02em] uppercase sm:text-3xl">
          It&rsquo;s what it costs, how it&rsquo;s funded and what results it produces.
        </p>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   3. SIDE-BY-SIDE COMPARISON — table on desktop, stacked rows on mobile
------------------------------------------------------------------ */
const comparison = [
  {
    issue: 'Taxes',
    norman: 'Reduce burden',
    carpenter: 'Higher taxes on wealthy Oregonians to finance expanded government programs',
  },
  {
    issue: 'Healthcare',
    norman: 'Opposes government-run healthcare',
    carpenter: 'Statewide government-run universal healthcare',
  },
  {
    issue: 'Housing',
    norman: 'Reduce barriers to build more',
    carpenter: 'More renter regulation + greater government role',
  },
  {
    issue: 'Schools',
    norman: 'Fundamentals + results',
    carpenter: 'Massive taxpayer investment across multiple levels of education',
  },
  {
    issue: 'Public Safety',
    norman: 'Enforcement + treatment + accountability',
    carpenter: 'Sanctuary protections + “Abolish ICE”',
  },
  { issue: 'Data Centers', norman: 'Preserve investment', carpenter: 'Moratorium on expansion' },
  {
    issue: 'Government',
    norman: 'Limited + accountable',
    carpenter:
      'Democratic socialist approach and greater government regulation across major sectors',
  },
  { issue: 'Childcare', norman: '–', carpenter: 'Expanded government-run childcare programs' },
]

const ComparisonSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Don’t Compare the Promises. Compare What They Could Mean for You."
        className="font-display text-foreground mx-auto max-w-4xl text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <m.div
        variants={fadeUp}
        {...inView}
        className="border-border bg-surface mt-12 overflow-hidden rounded-3xl border shadow-[0_28px_80px_-40px_rgba(0,0,0,0.3)] lg:mt-16"
      >
        <div className="hidden grid-cols-[180px_1fr_1fr] md:grid">
          <div />
          <div className="bg-forest text-cream px-6 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Mark Norman
          </div>
          <div className="bg-brown text-cream px-6 py-4 text-[11px] font-semibold tracking-[0.24em] uppercase">
            Tammy Carpenter
          </div>
        </div>
        <ul>
          {comparison.map((row, i) => (
            <li
              key={row.issue}
              className={cn(
                'grid grid-cols-1 md:grid-cols-[180px_1fr_1fr]',
                i > 0 && 'border-border border-t',
              )}
            >
              <p className="font-display text-foreground px-6 pt-5 text-lg md:py-5">{row.issue}</p>
              <div className="px-6 pt-3 md:py-5">
                <p className="text-primary text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Mark Norman
                </p>
                <p className="text-foreground/90 mt-1 text-[15px] leading-relaxed md:mt-0">
                  {row.norman}
                </p>
              </div>
              <div className="bg-surface-alt/30 px-6 pt-3 pb-5 md:py-5">
                <p className="text-brown dark:text-sand text-[10px] font-semibold tracking-[0.22em] uppercase md:hidden">
                  Tammy Carpenter
                </p>
                <p className="text-foreground/90 mt-1 text-[15px] leading-relaxed md:mt-0">
                  {row.carpenter}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   4. EXPANDING GOVERNMENT PROGRAMS REQUIRES MONEY — six proposals
------------------------------------------------------------------ */
const proposals = [
  {
    title: 'Healthcare',
    body: 'Statewide universal healthcare financed through a statewide system.',
    promise: 'healthcare free at the point of service.',
    danger:
      'the cost doesn’t disappear. Government must raise the money somewhere, and taxpayers are on the list.',
  },
  {
    title: 'Housing',
    body: 'Additional statewide renter regulation and social-housing policies.',
    promise: 'greater protection and affordability.',
    danger:
      'additional restrictions and costs can discourage the private investment Oregon needs to build and maintain housing.',
  },
  {
    title: 'Taxes',
    body: 'Carpenter says Oregon should “tax the rich” to finance expanded public programs. She says major corporations should pay more.',
    promise: 'government provides more.',
    danger:
      'programs grow, bureaucracy grows and the amount government must collect to finance them grows with them.',
  },
  {
    title: 'Education',
    body: 'Carpenter calls for massive taxpayer investment in education.',
    promise: 'greater taxpayer investment from early childhood through higher education.',
    danger:
      'how much additional spending is needed, how should it be financed and what measurable outcomes should taxpayers expect?',
  },
  {
    title: 'Economic Growth',
    body: 'Carpenter backs a three-year large-scale data-center moratorium.',
    promise: 'reduce infrastructure pressure.',
    danger: 'investment and jobs can go somewhere else.',
  },
  {
    title: 'Childcare',
    body: 'Tammy Carpenter argues families should receive greater support with childcare costs as part of a larger taxpayer-investment agenda. She asks for additional government-funded childcare programs.',
  },
]

const ProposalsSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <SplitText
          as="h2"
          by="word"
          text="Expanding Government Programs Requires Money."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/80 mt-6 text-base leading-relaxed sm:text-lg"
        >
          Carpenter proposes greater government involvement across several areas.
        </m.p>
      </div>

      <m.ol
        variants={stagger}
        {...inView}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
      >
        {proposals.map((p, i) => (
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
              {p.promise && (
                <dl className="border-border group-hover:border-primary-fg/25 mt-auto space-y-3 border-t pt-5 text-[15px] leading-relaxed transition-colors duration-500">
                  <div>
                    <dt className="text-primary group-hover:text-accent inline font-semibold transition-colors duration-500">
                      The promise:{' '}
                    </dt>
                    <dd className="text-foreground/85 group-hover:text-primary-fg/85 inline transition-colors duration-500">
                      {p.promise}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-foreground group-hover:text-primary-fg inline font-semibold transition-colors duration-500">
                      The danger:{' '}
                    </dt>
                    <dd className="text-foreground/85 group-hover:text-primary-fg/85 inline transition-colors duration-500">
                      {p.danger}
                    </dd>
                  </div>
                </dl>
              )}
            </Card>
          </m.li>
        ))}
      </m.ol>

      <m.div
        variants={fadeUp}
        {...inView}
        className="mt-12 flex flex-col items-center gap-6 text-center"
      >
        <p className="font-display text-foreground max-w-3xl text-xl leading-snug tracking-[0.02em] uppercase sm:text-2xl">
          The guide examines what these proposals would require from state government and how they
          could be financed.
        </p>
        <CtaButton>See the Full Comparison</CtaButton>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   5. COMPARE THEIR PRIORITIES + the DSA question
------------------------------------------------------------------ */
const normanPriorities = [
  'Control spending',
  'Oppose unnecessary taxes and fees',
  'Reduce housing barriers',
  'Strengthen academic standards',
  'Support public safety',
  'Demand measurable government results',
]

const carpenterPriorities = [
  'Government-run healthcare',
  'Renters’ Bill of Rights and rent regulation',
  'Greater taxpayer investment in education and childcare',
  'Taxing wealthy Oregonians',
  'Green New Deal',
  'Sanctuary protections / “Abolish ICE”',
  'Data-center moratorium',
]

const dsaPositions = [
  [
    'Police & incarceration',
    'redirecting police funding as steps toward police and prison abolition',
  ],
  ['Immigration', 'abolishing ICE and substantially expanding legalization and citizenship pathways'],
  [
    'Economy',
    'public ownership of major corporations and essential industries, along with aggressive wealth taxation',
  ],
  ['Housing', 'publicly owned social housing and universal rent control'],
  ['Healthcare', 'universal healthcare without individual charges'],
  [
    'Federal government',
    'abolishing the Electoral College and U.S. Senate and major restructuring of the presidency and federal judiciary',
  ],
]

const PriorityList = ({ items }) => (
  <ul className="mt-4 space-y-2.5">
    {items.map((p) => (
      <li
        key={p}
        className="text-foreground/85 group-hover:text-primary-fg/85 flex items-start gap-3 text-[15px] transition-colors duration-500"
      >
        <span className="bg-primary/10 text-primary group-hover:bg-primary-fg/15 group-hover:text-accent mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-500">
          <Check className="h-3 w-3" />
        </span>
        <span>{p}</span>
      </li>
    ))}
  </ul>
)

const NormanCard = () => (
  <a
    href={NORMAN_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="See Mark Norman's published positions on his campaign website"
    className="group block h-full"
  >
    <Card className="flex h-full flex-col overflow-hidden p-4 sm:p-5" tilt interactive>
      <div className="border-primary/15 group-hover:border-primary-fg/20 relative aspect-[440/300] w-full overflow-hidden rounded-2xl border transition-colors duration-500">
        <Image
          src={NORMAN_PHOTO}
          alt="Mark Norman"
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          quality={85}
          className="object-cover object-[center_22%]"
        />
      </div>
      <div className="flex flex-1 flex-col px-2 pt-6 pb-2 sm:px-3 sm:pt-8">
        <h3 className="font-display text-foreground group-hover:text-primary-fg text-3xl leading-tight font-medium transition-colors duration-500">
          Mark Norman
        </h3>
        <p className="text-highlight group-hover:text-accent mt-3 text-sm leading-relaxed transition-colors duration-500">
          Navy veteran. Veterinarian. Small-business owner.
        </p>
        <p className="text-foreground group-hover:text-primary-fg mt-6 text-sm font-semibold tracking-wide transition-colors duration-500">
          His priorities:
        </p>
        <PriorityList items={normanPriorities} />
        <p className="text-primary group-hover:text-accent mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold tracking-wide transition-colors duration-500">
          See Norman&rsquo;s published positions
          <ArrowRight className="h-4 w-4" />
        </p>
      </div>
    </Card>
  </a>
)

const CarpenterCard = () => (
  <div
    /* Fixed dark palette, same treatment as the HD33 opponent card. */
    style={{
      '--foreground': 'var(--cream)',
      '--surface': 'var(--ink)',
      '--surface-alt': 'rgba(107, 90, 66, 0.35)',
      '--primary': 'var(--sand)',
      '--primary-fg': 'var(--cream)',
      '--accent': 'var(--sand)',
      '--highlight': 'var(--sand)',
      '--border': 'rgba(224, 214, 188, 0.18)',
    }}
    className="group block h-full w-full text-left"
  >
    <Card
      className="hover:!bg-brown hover:!border-brown hover:!text-cream flex h-full flex-col overflow-hidden p-6 hover:!shadow-[0_28px_60px_-30px_rgba(107,90,66,0.55)] sm:p-8"
      tilt={false}
      interactive
      pointer={false}
    >
      <h3 className="font-display text-foreground group-hover:text-primary-fg text-3xl leading-tight font-medium transition-colors duration-500">
        Tammy Carpenter
      </h3>
      <p className="text-highlight group-hover:text-accent mt-3 text-sm leading-relaxed transition-colors duration-500">
        Democratic Socialist
      </p>
      <p className="text-foreground group-hover:text-primary-fg mt-6 text-sm font-semibold tracking-wide transition-colors duration-500">
        Her published priorities include:
      </p>
      <PriorityList items={carpenterPriorities} />
      <div className="border-primary/15 group-hover:border-primary-fg/25 mt-auto border-t pt-6 transition-colors duration-500">
        <p className="font-display text-foreground group-hover:text-primary-fg text-xl leading-snug transition-colors duration-500">
          The policies are hers. The question is whether District 27 can afford the consequences.
        </p>
      </div>
    </Card>
  </div>
)

const PrioritiesSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Compare their priorities."
        className="font-display text-foreground text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <m.div
        variants={stagger}
        {...inView}
        className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
      >
        <m.div variants={cardReveal} className="h-full">
          <NormanCard />
        </m.div>
        <m.div variants={cardReveal} className="h-full">
          <CarpenterCard />
        </m.div>
      </m.div>

      <m.div
        variants={fadeUp}
        {...inView}
        className="border-border bg-surface mt-12 rounded-3xl border p-6 sm:p-10 lg:mt-16"
      >
        <h3 className="font-display text-foreground text-2xl leading-tight font-medium tracking-[0.02em] uppercase sm:text-3xl">
          Carpenter also identifies with DSA. What does national DSA advocate?
        </h3>
        <p className="text-foreground/80 mt-5 max-w-3xl text-base leading-relaxed">
          Carpenter says she joined Democratic Socialists of America in 2016 and describes DSA as
          her political home.
        </p>
        <p className="text-foreground/80 mt-3 text-base leading-relaxed">
          The national DSA program separately advocates policies including:
        </p>

        <dl className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          {dsaPositions.map(([label, body]) => (
            <div key={label} className="bg-surface-alt/30 rounded-2xl px-5 py-4">
              <dt className="text-primary text-[11px] font-semibold tracking-[0.22em] uppercase">
                {label}
              </dt>
              <dd className="text-foreground/85 mt-1.5 text-[15px] leading-relaxed">{body}</dd>
            </div>
          ))}
        </dl>

        <div className="border-primary mt-6 border-l-4 py-1 pl-5">
          <p className="text-foreground text-[11px] font-semibold tracking-[0.22em] uppercase">
            Important note
          </p>
          <p className="text-foreground/80 mt-1.5 text-[15px] leading-relaxed">
            Those are national DSA positions. Carpenter&rsquo;s membership in DSA does not, by
            itself, establish that she personally endorses every national DSA proposal.
          </p>
        </div>

        <div className="mt-8">
          <CtaButton>See the Sourced DSA Comparison in the Guide</CtaButton>
        </div>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   6. HEALTHCARE — fixed dark band with the Governance Board figures
------------------------------------------------------------------ */
const HealthcareSection = () => (
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
        <SplitText
          as="h2"
          by="word"
          text="“Free at the Point of Service” Still Has to Be Financed."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/85 mt-6 text-base leading-relaxed sm:text-lg"
        >
          Carpenter wants healthcare free at the point of service. But Oregon&rsquo;s own work on
          universal healthcare shows the scale of financing that could be required to fund such a
          system.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/85 mt-4 text-base leading-relaxed sm:text-lg"
        >
          Norman rejects a government-run Oregon single-payer system.
        </m.p>
        <m.p
          variants={fadeUp}
          {...inView}
          className="font-display text-primary mt-6 text-xl leading-snug sm:text-2xl"
        >
          The guide shows you the proposed financing numbers, and what they could mean for workers
          and employers.
        </m.p>
        <m.div variants={fadeUp} {...inView} className="mt-8">
          <CtaButton>See the Healthcare Comparison in the Guide</CtaButton>
        </m.div>
      </div>

      <m.div
        variants={cardReveal}
        {...inView}
        className="border-border relative rounded-3xl border bg-white/[0.04] p-8 lg:col-span-5"
      >
        <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
          Inside the guide
        </p>
        <p className="font-display text-foreground mt-4 text-2xl leading-snug">
          The financing concepts Oregon&rsquo;s Universal Health Plan Governance Board examined.
        </p>
        <div className="border-border mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-[rgba(224,214,188,0.2)]">
          {['Personal income tax', 'Employer payroll tax', 'Corporate income tax', 'Corporate activity tax'].map(
            (label) => (
              <div key={label} className="bg-[#2a2a26] p-4">
                <p className="font-display text-primary text-2xl blur-[6px] select-none" aria-hidden>
                  00.0%
                </p>
                <p className="text-foreground/75 mt-1 text-sm">{label}</p>
              </div>
            ),
          )}
        </div>
        <p className="text-foreground/60 mt-4 text-xs">
          Download the free guide to see the figures and sources.
        </p>
      </m.div>
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
          text="Get the Free Voter Guide"
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          {...inView}
          className="text-foreground/80 mt-6 max-w-md text-base leading-relaxed sm:text-lg"
        >
          The differences are too important to discover after Election Day.
        </m.p>
      </div>
      <div className="lg:col-span-7">
        <GuideForm />
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   8. FINAL CTA
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
          text="Know the Record. Make Your Choice."
          className="font-display text-primary-fg mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
        />
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
            Get the Free HD27 Voter Guide
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
   FOOTER NOTE / DISCLAIMER
------------------------------------------------------------------ */
const LegalStrip = () => (
  <div className="border-border text-foreground border-t py-10">
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/60 text-[11px] leading-relaxed">
        <span className="font-semibold">Information &amp; Sources Disclaimer:</span> Candidate
        positions, statements, policy information and other factual claims presented on this page
        are based on publicly available information and linked sources reviewed as of September 18,
        2026. Candidate positions, campaign materials, websites and policy proposals may change
        after publication. References to the national Democratic Socialists of America program
        describe national DSA positions and should not be interpreted as Tammy Carpenter&rsquo;s
        individual positions unless separately attributed to her. Readers are encouraged to review
        the linked sources and current candidate materials for the latest information.
      </p>
      <p className="text-foreground/70 text-[11px] font-semibold">{HD27_PAID_FOR}</p>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
export default function NormanVsCarpenterPage() {
  return (
    <>
      <TrackOnMount event="VoterInfoView" params={VIEW_PARAMS} />
      <Hero />
      <StakesSection />
      <ComparisonSection />
      <ProposalsSection />
      <PrioritiesSection />
      <HealthcareSection />
      <FormSection />
      <FinalCta />
      <LegalStrip />
    </>
  )
}
