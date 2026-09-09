'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { fadeUp, stagger, cardReveal, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { pac } from '@/data/pac'
import Card from '@/components/ui/card'
import TrackOnMount from '@/components/analytics/track-on-mount'
import {
  newEventId,
  trackFormError,
  trackFormStart,
  trackLead,
  trackNewsletterSignup,
} from '@/lib/analytics/meta'

const FORM_NAME = 'hd33_voter_guide'
const SOURCE = 'ciatta-thompson-vs-shannon-jones-isadore'
const THANK_YOU_PATH = '/ciatta-thompson-vs-shannon-jones-isadore/thank-you'

const VIEW_PARAMS = {
  content_category: 'voter_info',
  content_name: 'hd33_voter_guide',
}

const CIATTA_URL = 'https://www.ciattathompson.com/'

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
  const el = document.getElementById('hd33-form')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

/* ------------------------------------------------------------------
   Conversion form. Same wiring as the guide-to-action form:
   /api/lead → GHL webhook → /ciatta-.../thank-you.
   Sits on the site's neutral surface (cream in light, forest in dark)
   so the base Input contrast (text-foreground on bg-surface-alt/30)
   reads clearly in both themes without overrides.
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
      id="hd33-form"
      className="bg-surface text-foreground border-border relative rounded-3xl border p-6 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.25)] sm:p-8 dark:shadow-[0_28px_80px_-30px_rgba(0,0,0,0.55)]"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="text-foreground mb-2 block text-sm font-medium"
          >
            First Name<span className="text-primary ml-0.5">*</span>
          </label>
          <Input
            name="firstName"
            id="firstName"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={onChange}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          <FieldError id="firstName-error" message={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className="text-foreground mb-2 block text-sm font-medium">
            Last Name<span className="text-primary ml-0.5">*</span>
          </label>
          <Input
            name="lastName"
            id="lastName"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={onChange}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          <FieldError id="lastName-error" message={errors.lastName} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
          Email Address<span className="text-primary ml-0.5">*</span>
        </label>
        <Input
          name="email"
          id="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="border-red-500/40 bg-red-500/10 text-red-700 mt-5 rounded-xl border p-4 text-sm dark:text-red-300"
        >
          Something went wrong sending your info. Please try again in a moment.
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          variant="primary"
          className="w-full tracking-[0.14em] uppercase whitespace-nowrap"
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
      <p className="text-foreground/60 mt-2 text-center text-[13px]">
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
    </form>
  )
}

/* ------------------------------------------------------------------
   1. HERO — "Portland Has Spent Years Trying To Fix The Crisis."
   Two-column: copy left, Ciatta Thompson portrait right.
------------------------------------------------------------------ */
const Hero = () => (
  <section className="text-foreground relative isolate overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20">
    <div
      aria-hidden
      className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
    />
    <div
      aria-hidden
      className="bg-primary/15 pointer-events-none absolute -right-24 bottom-0 -z-10 h-[45vmin] w-[45vmin] rounded-full blur-3xl"
    />

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
          Oregon House District 33 • 2026
        </m.div>

        <SplitText
          as="h1"
          by="word"
          text="Portland Has Spent Years Trying To Fix The Crisis."
          className="font-display text-foreground text-[10vw] leading-[1.02] font-medium tracking-tight sm:text-5xl md:text-[54px] lg:text-[58px]"
          delay={0.15}
          staggerChildren={0.05}
          duration={0.7}
          inView={false}
        />

        <m.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="font-display text-primary mt-6 text-2xl font-medium sm:text-3xl md:text-[34px]"
        >
          What Are the Results?
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="text-foreground/85 mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Needles near schools. Addiction on the street. Neighborhood shelter fights. Rising costs.
          Millions spent on programs.
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="text-foreground/85 mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Before you vote in Oregon House District 33, examine the record behind the headlines.
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="text-foreground/85 mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
        >
          Get the free election guide examining Ciatta Thompson vs Shannon Jones Isadore, and the
          decisions shaping Northwest Portland.
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.6 }}
          className="mt-8"
        >
          <Button
            onClick={scrollToForm}
            size="lg"
            variant="primary"
            className="tracking-[0.14em] uppercase"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            See the HD33 Record
          </Button>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-foreground/65 mt-5 max-w-xl text-sm leading-relaxed"
        >
          Free download • Concise issue breakdown • Based on candidate positions, public records
          and published reporting
        </m.p>
      </div>

      <m.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
        className="relative lg:col-span-5"
      >
        <div className="border-border relative mx-auto aspect-[407/509] w-full max-w-[420px] overflow-hidden rounded-[28px] border shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
          <Image
            src="/images/funnels/ciatta-vs-isadore/thompson-hero.jpg"
            alt="Ciatta Thompson, candidate for Oregon House District 33"
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
            quality={85}
            className="object-cover object-[center_top]"
          />
        </div>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   2. DISTRICT 33 DESERVES ANSWERS — centered intro band
------------------------------------------------------------------ */
const AnswersBand = () => (
  <section className="text-foreground relative isolate pt-8 pb-12 sm:pt-12 sm:pb-16">
    <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="District 33 Deserves Answers."
        className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
      />

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="text-foreground/80 mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
      >
        Portland has spent years trying to address homelessness, addiction, public safety, and
        downtown decline.
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="text-foreground/80 mx-auto mt-6 max-w-2xl text-base leading-relaxed"
      >
        Money has been spent. Programs have been created. Promises have been made.
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="font-display text-primary mt-8 text-2xl sm:text-3xl"
      >
        But what are the results?
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="text-foreground/80 mx-auto mt-6 max-w-2xl text-base leading-relaxed"
      >
        This guide looks at the issues people in District 33 actually live with, and how the two
        candidates approach them.
      </m.p>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   3. THE ISSUES YOU SEE EVERY DAY — heading left, 5 rows right
------------------------------------------------------------------ */
const issueRows = [
  {
    eyebrow: 'NEEDLES NEAR SCHOOLS',
    body: 'Neighbors spent years asking Salem to keep mobile syringe programs away from schools.',
    question: 'What happened?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-6.5-5.4-6.5-10.5a6.5 6.5 0 1113 0C18.5 15.6 12 21 12 21z"
        />
        <circle cx="12" cy="10.5" r="2.2" />
      </svg>
    ),
  },
  {
    eyebrow: 'THE PEARL SHELTER',
    body: 'Residents strongly objected to the low-barrier shelter on NW Northrup.',
    question: 'Who was listening?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M9 12h.01M15 12h.01"
        />
      </svg>
    ),
  },
  {
    eyebrow: 'ADDICTION & MENTAL HEALTH',
    body: 'Portland funds services and harm reduction.',
    question: 'But are enough people getting into real treatment and recovery?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-7-4.4-7-11a5 5 0 019-3 5 5 0 019 3c0 6.6-7 11-7 11h-4z"
        />
      </svg>
    ),
  },
  {
    eyebrow: 'HOMELESSNESS SPENDING',
    body: 'Millions of taxpayer dollars go toward programs and services.',
    question: 'Are we measuring what actually works?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        />
      </svg>
    ),
  },
  {
    eyebrow: 'AFFORDABILITY',
    body: 'Housing, childcare, transportation, taxes, and everyday costs keep adding up.',
    question: 'Can working people still afford Portland?',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21V10l9-6 9 6v11M8 21v-6h8v6M3 21h18"
        />
      </svg>
    ),
  },
]

const IssuesSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip pb-16 sm:pb-20">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-4">
        <SplitText
          as="h2"
          by="word"
          text="The Issues you See Every Day"
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 hidden lg:block"
        >
          <Button
            onClick={scrollToForm}
            variant="primary"
            className="tracking-[0.14em] uppercase"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get the Full Story
          </Button>
        </m.div>
      </div>

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="lg:col-span-8"
      >
        {issueRows.map((row, i) => (
          <m.li
            key={row.eyebrow}
            variants={cardReveal}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className={cn(
              /* Filled-panel hover: the whole row becomes a fixed forest
                 (#2E4538) card on hover, regardless of theme. Icon chip,
                 eyebrow, body, and question text flip via group-hover:*
                 with the site's standard 500ms easing. */
              'group hover:bg-forest hover:text-cream relative isolate flex cursor-pointer items-start gap-5 px-4 py-6 transition-[background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_60px_-30px_rgba(46,69,56,0.55)] sm:gap-6 sm:px-6 sm:py-7',
              i > 0 && 'border-border group-hover:border-transparent border-t',
            )}
            onClick={scrollToForm}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToForm()
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${row.eyebrow} — ${row.question} Jump to the guide request form.`}
          >
            <span className="border-border bg-surface text-primary group-hover:border-cream/25 group-hover:bg-cream/10 group-hover:text-sand grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-colors duration-500">
              <span className="h-5 w-5">{row.icon}</span>
            </span>
            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <p className="text-primary group-hover:text-sand text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors duration-500">
                  {row.eyebrow}
                </p>
                <p className="text-foreground/80 group-hover:text-cream/85 mt-2 text-[15px] leading-relaxed transition-colors duration-500 sm:text-base">
                  {row.body}
                </p>
              </div>
              <p className="font-display text-foreground group-hover:text-cream text-lg leading-snug transition-colors duration-500 md:max-w-[220px] md:text-right md:text-xl">
                {row.question}
              </p>
            </div>
          </m.li>
        ))}
      </m.ul>

      <div className="flex justify-center lg:hidden">
        <Button
          onClick={scrollToForm}
          variant="primary"
          className="tracking-[0.14em] uppercase"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Get the Full Story
        </Button>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   4. TWO CANDIDATES. ONE DISTRICT. — side-by-side candidate cards.
   Uses the shared editorial Card system from @/components/ui/card:
   base surface → primary on hover, gold accent line, spring lift +
   tilt, and every inner text element flips via group-hover:*, matching
   the home-page priorities/endorsements card behavior.
------------------------------------------------------------------ */
const thompsonPriorities = [
  'More police and firefighters',
  'Real addiction and mental-health treatment',
  'Lower costs for working families',
  'Audits of government programs',
  'Measurable results',
  'Accountability for homelessness spending',
]

const CiattaCard = () => (
  <a
    href={CIATTA_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Visit Ciatta Thompson's campaign website"
    className="group block h-full"
  >
    <Card className="flex h-full flex-col overflow-hidden p-0" tilt interactive>
      <div className="border-primary/15 bg-surface-alt/70 group-hover:border-primary-fg/20 relative aspect-[440/330] w-full overflow-hidden border-b transition-colors duration-500">
        <Image
          src="/images/funnels/ciatta-vs-isadore/thompson-portrait.jpg"
          alt="Ciatta Thompson"
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          quality={85}
          className="object-cover object-[center_25%]"
        />
      </div>
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3 className="font-display text-foreground group-hover:text-primary-fg text-3xl leading-tight font-medium transition-colors duration-500">
          Ciatta Thompson
        </h3>
        <p className="text-highlight group-hover:text-accent mt-3 text-sm leading-relaxed transition-colors duration-500">
          NW Portland resident. Hotel manager. Former Democrat. Political newcomer.
        </p>
        <p className="text-foreground/85 group-hover:text-primary-fg/85 mt-5 text-[15px] leading-relaxed transition-colors duration-500">
          Thompson says years of working downtown changed the way she looked at
          Portland&rsquo;s policies.
        </p>

        <p className="text-foreground group-hover:text-primary-fg mt-6 text-sm font-semibold tracking-wide transition-colors duration-500">
          Her priorities include:
        </p>
        <ul className="mt-3 space-y-2.5">
          {thompsonPriorities.map((p) => (
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

        <div className="border-primary/15 group-hover:border-primary-fg/25 mt-8 border-t pt-6 transition-colors duration-500">
          <p className="text-foreground/70 group-hover:text-primary-fg/75 text-sm transition-colors duration-500">
            Her campaign&rsquo;s message is straightforward:
          </p>
          <p className="font-display text-primary group-hover:text-accent mt-2 text-xl leading-snug transition-colors duration-500">
            &ldquo;Portland over party. Results over politics.&rdquo;
          </p>
        </div>

        <div className="border-primary/15 group-hover:border-primary-fg/25 mt-auto flex items-center justify-between border-t pt-6 transition-colors duration-500">
          <span className="text-primary group-hover:text-accent inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors duration-500">
            Visit Ciatta&rsquo;s campaign
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </span>
        </div>
      </div>
    </Card>
  </a>
)

const IsadoreCard = () => (
  <button
    type="button"
    onClick={scrollToForm}
    aria-label="See Shannon Jones Isadore's record — jump to the guide request form"
    className="group block h-full w-full cursor-pointer text-left"
  >
    <Card className="flex h-full flex-col overflow-hidden p-0" tilt={false} interactive>
      <div className="border-primary/15 bg-surface-alt/70 group-hover:border-primary-fg/20 relative aspect-[440/330] w-full overflow-hidden border-b transition-colors duration-500">
        <Image
          src="/images/funnels/ciatta-vs-isadore/isadore-portrait.webp"
          alt="Shannon Jones Isadore"
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 640px) 90vw, 100vw"
          quality={85}
          className="object-cover object-[center_20%]"
        />
      </div>
      <div className="flex flex-1 flex-col p-8 sm:p-10">
        <h3 className="font-display text-foreground group-hover:text-primary-fg text-3xl leading-tight font-medium transition-colors duration-500">
          Shannon Jones Isadore
        </h3>
        <p className="text-highlight group-hover:text-accent mt-3 text-sm leading-relaxed transition-colors duration-500">
          Current state representative. Marine veteran. Family psychotherapist. Business owner.
        </p>
        <p className="text-foreground/85 group-hover:text-primary-fg/85 mt-5 text-[15px] leading-relaxed transition-colors duration-500">
          Isadore was appointed to the Oregon House in 2024 and later won election.
        </p>
        <p className="text-foreground/80 group-hover:text-primary-fg/80 mt-4 text-[15px] leading-relaxed transition-colors duration-500">
          Her campaign points to investments and accomplishments including the James Beard
          Market, St. Johns cohousing, Hoyt Arboretum, critical-energy infrastructure, and Moda
          Center renovations.
        </p>

        <div className="border-primary/15 group-hover:border-primary-fg/25 mt-8 border-t pt-6 transition-colors duration-500">
          <p className="text-foreground/85 group-hover:text-primary-fg/85 text-[15px] leading-relaxed transition-colors duration-500">
            She has a record in Salem. The guide looks at that record, and the issues still
            facing District 33.
          </p>
        </div>

        <div className="border-primary/15 group-hover:border-primary-fg/25 mt-auto flex items-center justify-between border-t pt-6 transition-colors duration-500">
          <span className="text-primary group-hover:text-accent inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors duration-500">
            See her record
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Card>
  </button>
)

const CandidateSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Two Candidates. One District."
        className="font-display text-foreground text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8"
      >
        <m.div variants={cardReveal} className="h-full">
          <CiattaCard />
        </m.div>
        <m.div variants={cardReveal} className="h-full">
          <IsadoreCard />
        </m.div>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   5. "WHAT CHANGES AT 1,001 FEET?" — copy left over Ciatta backdrop.
   Uses a theme-aware overlay so the image blends with the page in
   either mode (fading to cream in light, ink in dark).
------------------------------------------------------------------ */
const ThousandFeetSection = () => (
  <section className="text-foreground relative isolate overflow-hidden py-20 sm:py-24">
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/funnels/ciatta-vs-isadore/thompson-hero.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-[70%_20%] opacity-60 dark:opacity-40"
      />
      <div
        aria-hidden
        className="from-background via-background/90 to-background/40 absolute inset-0 bg-gradient-to-r"
      />
      <div
        aria-hidden
        className="from-background/70 to-background/0 absolute inset-0 bg-gradient-to-t"
      />
    </div>

    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
      <div className="max-w-xl">
        <SplitText
          as="h2"
          by="word"
          text="“What Changes at 1,001 Feet?”"
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[54px]"
        />

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-foreground/85 mt-6 text-base leading-relaxed sm:text-lg"
        >
          Multnomah County eventually banned mobile syringe services within 1,000 feet of K–12
          schools after state legislation failed.
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-foreground/80 mt-4 text-base leading-relaxed"
        >
          Ciatta Thompson called the restriction a step in the right direction.
        </m.p>

        <m.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="border-primary/25 bg-surface/80 mt-8 rounded-2xl border p-6 backdrop-blur-sm"
        >
          <p className="text-primary text-sm tracking-wide uppercase">Then she asked:</p>
          <p className="font-display text-foreground mt-3 text-xl leading-snug sm:text-2xl">
            &ldquo;What changes at 1,001 feet? The same addiction. The same fentanyl. The same
            discarded needles. Moving the problem isn&rsquo;t solving the problem.&rdquo;
          </p>
        </m.blockquote>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-primary mt-8 text-sm tracking-wide uppercase"
        >
          The question gets to the heart of this race:
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="font-display text-foreground mt-3 text-2xl leading-snug sm:text-3xl"
        >
          Should government be judged by what it does or by the results it gets?
        </m.p>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-8"
        >
          <Button
            onClick={scrollToForm}
            variant="primary"
            className="tracking-[0.14em] uppercase"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Read the Full Comparison
          </Button>
        </m.div>
      </div>
      <div aria-hidden className="hidden lg:block" />
    </div>
  </section>
)

/* ------------------------------------------------------------------
   6. HD33 VOTERS GUIDE — decorative "book cover" left, TOC + CTA right
   The book cover itself is always dark (it represents a physical
   voter-guide booklet) — but the surrounding section adapts to theme.
------------------------------------------------------------------ */
const guideChapters = [
  'Needles near schools',
  'The Pearl District shelter fight',
  'Addiction and mental-health treatment',
  'Homelessness spending',
  'Public safety',
  'Affordability',
  'Isadore’s record in Salem',
  'What Thompson says she would change',
]

const GuideBook = () => (
  <div className="relative mx-auto w-full max-w-[430px]">
    {/* Soft floor shadow */}
    <div
      aria-hidden
      className="absolute inset-x-6 -bottom-4 h-6 rounded-full bg-black/30 blur-2xl dark:bg-black/45"
    />

    {/* Stacked "back page" layers peeking out to the right and bottom */}
    <div
      aria-hidden
      className="border-primary/15 bg-primary/25 pointer-events-none absolute top-3 left-3 h-full w-full rounded-[18px] border"
    />
    <div
      aria-hidden
      className="border-primary/20 bg-primary/40 pointer-events-none absolute top-1.5 left-1.5 h-full w-full rounded-[18px] border"
    />

    {/* Front cover — a small "on-brand dark" object regardless of theme,
        since it represents a physical booklet. Uses the fixed forest→ink
        gradient with a subtle sand accent line. */}
    <div className="border-forest/60 relative aspect-[421/551] rounded-[18px] border bg-gradient-to-br from-[#2E4538] to-[#1a2621] p-8 text-[#F6F2E8] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.55)] dark:shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#E0D6BC]/85 text-[11px] font-semibold tracking-[0.28em] uppercase">
            Oregon House District 33
          </p>
          <p className="text-[#E0D6BC]/60 mt-1 text-[11px] tracking-[0.28em] uppercase">
            Voters Guide
          </p>
        </div>
        <span className="border-[#E0D6BC]/30 bg-[#E0D6BC]/10 text-[#E0D6BC] rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase">
          Free
        </span>
      </div>

      <h3 className="font-display text-[#F6F2E8] mt-16 text-4xl leading-[1.05] font-medium sm:text-5xl">
        HD33 Voters Guide
      </h3>
      <span className="bg-[#E0D6BC] mt-4 block h-[3px] w-12 rounded-full" />
      <p className="text-[#F6F2E8]/80 mt-5 text-sm leading-relaxed">
        See what happened. See where the candidates stand. Decide for yourself.
      </p>

      <div className="border-[#E0D6BC]/15 absolute right-8 bottom-8 left-8 border-t pt-5">
        <p className="text-[#F6F2E8]/75 text-[11px] leading-relaxed">
          Downtown • Northwest Portland • Pearl • Linnton • Cathedral Park • Forest Park
        </p>
        <p className="text-[#E0D6BC]/85 mt-2 text-[11px] tracking-wide">
          General Election • November 3, 2026
        </p>
      </div>
    </div>
  </div>
)

const GuideCoversSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <m.div
        variants={cardReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="lg:col-span-5"
      >
        <GuideBook />
      </m.div>

      <div className="lg:col-span-7">
        <p className="text-primary text-[11px] font-semibold tracking-[0.28em] uppercase">
          The free HD33 Voters Guide covers:
        </p>
        <SplitText
          as="h2"
          by="word"
          text="Know What Happened Before You Vote."
          className="font-display text-foreground mt-4 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
        />

        <m.ol
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 space-y-0"
        >
          {guideChapters.map((chapter, i) => (
            <m.li
              key={chapter}
              variants={cardReveal}
              className="group border-border flex items-center gap-4 border-b py-4 last:border-b-0"
            >
              <span className="text-primary/70 font-mono text-xs tracking-widest">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-foreground/90 flex-1 text-base leading-snug sm:text-lg">
                {chapter}
              </span>
              <ArrowRight className="text-primary/60 group-hover:text-primary h-4 w-4 transition-colors" />
            </m.li>
          ))}
        </m.ol>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-display text-foreground text-2xl leading-snug sm:max-w-xs">
            Know the issues, the record, and the choice.
          </p>
          <Button
            onClick={scrollToForm}
            variant="primary"
            className="tracking-[0.14em] uppercase"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Send Me the Free Guide
          </Button>
        </m.div>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   7. TWO SOCIAL POSTS — companion imagery pair
------------------------------------------------------------------ */
const SocialPairSection = () => (
  <section className="text-foreground relative isolate overflow-x-clip py-16 sm:py-20">
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-5 sm:px-8 sm:grid-cols-2 lg:px-12">
      {[
        {
          src: '/images/funnels/ciatta-vs-isadore/social-record-needles.png',
          alt: 'The Record: Needles Near Schools — HD33 candidate comparison',
        },
        {
          src: '/images/funnels/ciatta-vs-isadore/social-guide-cover.png',
          alt: 'HD33 Voter Guide — public safety, addiction, accountability',
        },
      ].map((post) => (
        <m.figure
          key={post.src}
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="border-border bg-surface relative aspect-[1080/1350] overflow-hidden rounded-2xl border shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
        >
          <Image
            src={post.src}
            alt={post.alt}
            fill
            sizes="(min-width: 1024px) 500px, (min-width: 640px) 45vw, 90vw"
            quality={85}
            className="object-cover object-center"
          />
        </m.figure>
      ))}
    </div>
  </section>
)

/* ------------------------------------------------------------------
   8. GET THE HD33 VOTERS GUIDE — headline left + inline form right
------------------------------------------------------------------ */
const FormSection = () => (
  <section className="text-foreground relative isolate py-20 sm:py-24">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-5">
        <SplitText
          as="h2"
          by="word"
          text="Get the HD33 Voters Guide"
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-foreground/80 mt-6 max-w-md text-base leading-relaxed sm:text-lg"
        >
          See what happened. See where the candidates stand. Decide for yourself.
        </m.p>
      </div>
      <div className="lg:col-span-7">
        <GuideForm />
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   9. DISTRICT 33 LIVES WITH THE RESULTS — final CTA panel.
   Uses the site's "on-brand" primary panel (forest+cream in light,
   sand+ink in dark) so the CTA reads as an inverted focal moment
   regardless of theme.
------------------------------------------------------------------ */
const finalPills = [
  'Needles near schools.',
  'Addiction.',
  'Shelter fights.',
  'Empty storefronts.',
  'Rising costs.',
  'Government spending.',
]

const FinalCta = () => (
  <section className="text-foreground relative isolate py-16 sm:py-20">
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={cardReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="bg-primary text-primary-fg border-primary rounded-[28px] border px-6 py-14 text-center shadow-[0_40px_100px_-40px_rgba(0,0,0,0.35)] sm:px-10 sm:py-16 md:px-16 md:py-20 dark:shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)]"
      >
        <SplitText
          as="h2"
          by="word"
          text="District 33 Lives With the Results."
          className="font-display text-primary-fg mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
        />

        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
        >
          {finalPills.map((label) => (
            <m.li
              key={label}
              variants={cardReveal}
              className="border-primary-fg/25 bg-primary-fg/10 text-primary-fg rounded-full border px-4 py-1.5 text-sm"
            >
              {label}
            </m.li>
          ))}
        </m.ul>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-primary-fg/80 mt-8 text-base leading-relaxed"
        >
          Before November 3, take a few minutes to look at the record.
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="font-display text-primary-fg mt-4 text-2xl tracking-[0.03em] uppercase sm:text-3xl md:text-[32px]"
        >
          Are you satisfied with the results?
        </m.p>

        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-8 flex justify-center"
        >
          <Button
            onClick={scrollToForm}
            size="lg"
            className="!bg-primary-fg !text-primary !border-primary-fg hover:!opacity-90 tracking-[0.14em] uppercase"
            icon={<ArrowRight className="h-4 w-4" />}
          >
            Get the Free HD33 Voters Guide
          </Button>
        </m.div>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="text-primary-fg/60 mt-8 text-xs tracking-[0.22em] uppercase"
        >
          General Election • November 3, 2026
        </m.p>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   10. LEGAL STRIP — PAC disclosure at page end
------------------------------------------------------------------ */
const LegalStrip = () => (
  <div className="border-border text-foreground border-t py-8">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-foreground/60 text-[11px] leading-relaxed">{pac.disclaimers.paidFor}</p>
      <p className="text-foreground/45 text-[10px] tracking-widest uppercase">
        {pac.disclaimers.notAuthorized}
      </p>
    </div>
  </div>
)

/* ------------------------------------------------------------------ */
export default function CiattaVsIsadorePage() {
  return (
    <>
      <TrackOnMount event="VoterInfoView" params={VIEW_PARAMS} />
      <Hero />
      <AnswersBand />
      <IssuesSection />
      <CandidateSection />
      <ThousandFeetSection />
      <GuideCoversSection />
      <SocialPairSection />
      <FormSection />
      <FinalCta />
      <LegalStrip />
    </>
  )
}
