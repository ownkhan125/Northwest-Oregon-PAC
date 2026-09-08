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
   Small dark-mode pill CTA used across the funnel — sand background,
   ink text — matches every "GET / SEE / READ" button in the Figma.
------------------------------------------------------------------ */
const SandButton = ({ children, onClick, href, className, size = 'md', target, rel }) => (
  <Button
    onClick={onClick}
    href={href}
    size={size}
    target={target}
    rel={rel}
    className={cn(
      '!bg-sand !text-ink !border-sand hover:!opacity-90 tracking-[0.14em] uppercase',
      className,
    )}
    icon={<ArrowRight className="h-4 w-4" />}
  >
    {children}
  </Button>
)

/* ------------------------------------------------------------------
   Conversion form (dark surface). Same wiring as the guide-to-action
   form — /api/lead → GHL webhook → /thank-you.
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
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-300">
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

  const darkFieldClass =
    '!bg-forest/60 !border-sand/25 !text-cream placeholder:!text-cream/50 focus:!border-sand focus:!bg-forest/80'

  return (
    <form
      onSubmit={onSubmit}
      onFocus={handleFirstInteraction}
      onChange={handleFirstInteraction}
      noValidate
      data-form-state={status}
      id="hd33-form"
      className="relative rounded-3xl border border-sand/25 bg-forest p-6 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.55)] sm:p-8"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-cream"
          >
            First Name<span className="ml-0.5 text-sand">*</span>
          </label>
          <Input
            name="firstName"
            id="firstName"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={onChange}
            className={darkFieldClass}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          <FieldError id="firstName-error" message={errors.firstName} />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-cream">
            Last Name<span className="ml-0.5 text-sand">*</span>
          </label>
          <Input
            name="lastName"
            id="lastName"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={onChange}
            className={darkFieldClass}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          <FieldError id="lastName-error" message={errors.lastName} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-cream">
          Email Address<span className="ml-0.5 text-sand">*</span>
        </label>
        <Input
          name="email"
          id="email"
          type="email"
          required
          autoComplete="email"
          value={values.email}
          onChange={onChange}
          className={darkFieldClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error" message={errors.email} />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-5 rounded-xl border border-sand/40 bg-ink/40 p-4 text-sm text-cream"
        >
          Something went wrong sending your info. Please try again in a moment.
        </div>
      )}

      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          className="w-full !bg-sand !text-ink !border-sand hover:!opacity-90 tracking-[0.14em] uppercase whitespace-nowrap"
          data-testid="funnel-submit"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <span className="border-ink/40 border-t-ink h-4 w-4 animate-spin rounded-full border-2" />
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

      <p className="mt-5 text-center text-[13px] leading-relaxed text-cream/70">
        By submitting this form, you agree to receive email communications from Northwest Oregon
        PAC. You can unsubscribe at any time.
      </p>
      <p className="mt-2 text-center text-[13px] text-cream/60">
        <a href="/privacy-policy" className="text-sand hover:text-cream underline-offset-2 hover:underline">
          Privacy Policy
        </a>
        <span className="mx-2 text-cream/40">|</span>
        <a href="/terms-of-service" className="text-sand hover:text-cream underline-offset-2 hover:underline">
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
  <section className="relative isolate overflow-x-clip bg-ink pt-28 pb-16 text-cream sm:pt-32 sm:pb-20">
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-sage/20 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 -right-24 -z-10 h-[45vmin] w-[45vmin] rounded-full bg-forest/40 blur-3xl"
    />

    <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
      <div className="lg:col-span-7">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-3 rounded-full border border-sand/30 bg-forest/60 px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase text-sand"
        >
          <span className="relative grid h-2 w-2 place-items-center">
            <span className="absolute inset-0 rounded-full bg-sand" />
            <span className="pulse-ring absolute inset-0 rounded-full bg-sand" />
          </span>
          Oregon House District 33 • 2026
        </m.div>

        <SplitText
          as="h1"
          by="word"
          text="Portland Has Spent Years Trying To Fix The Crisis."
          className="font-display text-cream text-[10vw] leading-[1.02] font-medium tracking-tight sm:text-5xl md:text-[54px] lg:text-[58px]"
          delay={0.15}
          staggerChildren={0.05}
          duration={0.7}
          inView={false}
        />

        <m.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="font-display mt-6 text-2xl font-medium text-sand sm:text-3xl md:text-[34px]"
        >
          What Are the Results?
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          Needles near schools. Addiction on the street. Neighborhood shelter fights. Rising costs.
          Millions spent on programs.
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          Before you vote in Oregon House District 33, examine the record behind the headlines.
        </m.p>

        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
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
          <SandButton size="lg" onClick={scrollToForm}>
            See the HD33 Record
          </SandButton>
        </m.div>

        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-cream/60"
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
        <div className="relative mx-auto aspect-[407/509] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-sand/20 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)]">
          <Image
            src="/images/funnels/ciatta-vs-isadore/thompson-hero.jpg"
            alt="Ciatta Thompson, candidate for Oregon House District 33"
            fill
            priority
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 60vw, 90vw"
            quality={85}
            className="object-cover object-[center_top]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
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
  <section className="relative isolate bg-ink pt-8 pb-12 text-cream sm:pt-12 sm:pb-16">
    <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="District 33 Deserves Answers."
        className="font-display text-cream text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
      />

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg"
      >
        Portland has spent years trying to address homelessness, addiction, public safety, and
        downtown decline.
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80"
      >
        Money has been spent. Programs have been created. Promises have been made.
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="font-display mt-8 text-2xl text-sand sm:text-3xl"
      >
        But what are the results?
      </m.p>

      <m.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-cream/80"
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
  <section className="relative isolate overflow-x-clip bg-ink pb-16 text-cream sm:pb-20">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-4">
        <SplitText
          as="h2"
          by="word"
          text="The Issues you See Every Day"
          className="font-display text-cream text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 hidden lg:block"
        >
          <SandButton onClick={scrollToForm}>Get the Full Story</SandButton>
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
            className={cn(
              'group flex items-start gap-5 py-6 sm:gap-6 sm:py-7',
              i > 0 && 'border-t border-sand/15',
            )}
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-sand/25 bg-forest/60 text-sand transition-colors group-hover:border-sand group-hover:text-cream">
              <span className="h-5 w-5">{row.icon}</span>
            </span>
            <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-sand/85">
                  {row.eyebrow}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-cream/80 sm:text-base">
                  {row.body}
                </p>
              </div>
              <p className="font-display text-lg leading-snug text-cream md:max-w-[220px] md:text-right md:text-xl">
                {row.question}
              </p>
            </div>
          </m.li>
        ))}
      </m.ul>

      <div className="flex justify-center lg:hidden">
        <SandButton onClick={scrollToForm}>Get the Full Story</SandButton>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   4. TWO CANDIDATES. ONE DISTRICT. — side-by-side candidate cards
------------------------------------------------------------------ */
const thompsonPriorities = [
  'More police and firefighters',
  'Real addiction and mental-health treatment',
  'Lower costs for working families',
  'Audits of government programs',
  'Measurable results',
  'Accountability for homelessness spending',
]

const CandidateSection = () => (
  <section className="relative isolate overflow-x-clip bg-ink py-16 text-cream sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <SplitText
        as="h2"
        by="word"
        text="Two Candidates. One District."
        className="font-display text-cream text-center text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
        {/* Ciatta Thompson */}
        <m.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="relative flex flex-col overflow-hidden rounded-3xl border border-sand/20 bg-forest"
        >
          <div className="relative aspect-[440/330] w-full overflow-hidden">
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
            <h3 className="font-display text-3xl font-medium text-cream">Ciatta Thompson</h3>
            <p className="mt-3 text-sm leading-relaxed text-sand/90">
              NW Portland resident. Hotel manager. Former Democrat. Political newcomer.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/85">
              Thompson says years of working downtown changed the way she looked at Portland&rsquo;s
              policies.
            </p>

            <p className="mt-6 text-sm font-semibold tracking-wide text-cream">
              Her priorities include:
            </p>
            <ul className="mt-3 space-y-2.5">
              {thompsonPriorities.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-cream/85">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand/20 text-sand">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-sand/15 pt-6">
              <p className="text-sm text-cream/70">Her campaign&rsquo;s message is straightforward:</p>
              <p className="font-display mt-2 text-xl leading-snug text-sand">
                &ldquo;Portland over party. Results over politics.&rdquo;
              </p>
            </div>

            <div className="mt-8">
              <Button
                href={CIATTA_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="!border-sand/40 !text-cream hover:!bg-sand/10 hover:!border-sand"
              >
                Visit Ciatta&rsquo;s campaign
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </m.article>

        {/* Shannon Jones Isadore */}
        <m.article
          variants={cardReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="relative flex flex-col overflow-hidden rounded-3xl border border-sand/20 bg-forest"
        >
          <div className="relative aspect-[440/330] w-full overflow-hidden">
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
            <h3 className="font-display text-3xl font-medium text-cream">Shannon Jones Isadore</h3>
            <p className="mt-3 text-sm leading-relaxed text-sand/90">
              Current state representative. Marine veteran. Family psychotherapist. Business owner.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/85">
              Isadore was appointed to the Oregon House in 2024 and later won election.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-cream/80">
              Her campaign points to investments and accomplishments including the James Beard
              Market, St. Johns cohousing, Hoyt Arboretum, critical-energy infrastructure, and Moda
              Center renovations.
            </p>

            <div className="mt-8 border-t border-sand/15 pt-6">
              <p className="text-[15px] leading-relaxed text-cream/85">
                She has a record in Salem. The guide looks at that record, and the issues still
                facing District 33.
              </p>
            </div>

            <div className="mt-auto pt-8">
              <Button
                onClick={scrollToForm}
                variant="secondary"
                className="!border-sand/40 !text-cream hover:!bg-sand/10 hover:!border-sand"
              >
                See her record
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </m.article>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   5. "WHAT CHANGES AT 1,001 FEET?" — copy left over Ciatta backdrop
------------------------------------------------------------------ */
const ThousandFeetSection = () => (
  <section className="relative isolate overflow-hidden bg-ink py-20 text-cream sm:py-24">
    <div className="absolute inset-0 -z-10">
      <Image
        src="/images/funnels/ciatta-vs-isadore/thompson-hero.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="object-cover object-[70%_20%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/40 mix-blend-multiply" />
    </div>

    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
      <div className="max-w-xl">
        <SplitText
          as="h2"
          by="word"
          text="“What Changes at 1,001 Feet?”"
          className="font-display text-cream text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[54px]"
        />

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-6 text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          Multnomah County eventually banned mobile syringe services within 1,000 feet of K–12
          schools after state legislation failed.
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-4 text-base leading-relaxed text-cream/80"
        >
          Ciatta Thompson called the restriction a step in the right direction.
        </m.p>

        <m.blockquote
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-8 rounded-2xl border border-sand/25 bg-ink/60 p-6 backdrop-blur-sm"
        >
          <p className="text-sm tracking-wide uppercase text-sand/85">Then she asked:</p>
          <p className="font-display mt-3 text-xl leading-snug text-cream sm:text-2xl">
            &ldquo;What changes at 1,001 feet? The same addiction. The same fentanyl. The same
            discarded needles. Moving the problem isn&rsquo;t solving the problem.&rdquo;
          </p>
        </m.blockquote>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-8 text-sm tracking-wide uppercase text-sand/85"
        >
          The question gets to the heart of this race:
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="font-display mt-3 text-2xl leading-snug text-cream sm:text-3xl"
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
          <SandButton onClick={scrollToForm}>Read the Full Comparison</SandButton>
        </m.div>
      </div>
      <div aria-hidden className="hidden lg:block" />
    </div>
  </section>
)

/* ------------------------------------------------------------------
   6. HD33 VOTERS GUIDE — decorative "book cover" left, TOC + CTA right
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
      className="absolute inset-x-6 -bottom-4 h-6 rounded-full bg-black/45 blur-2xl"
    />

    {/* Stacked "back page" layers peeking out to the right and bottom
        (Figma: rectangles 1:241 + 1:242 sit behind the front cover 1:243
        at slight positive x/y offsets to create a booklet effect). */}
    <div
      aria-hidden
      className="pointer-events-none absolute top-3 left-3 h-full w-full rounded-[18px] border border-sand/15 bg-sand/25"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-1.5 left-1.5 h-full w-full rounded-[18px] border border-sand/20 bg-sand/40"
    />

    {/* Front cover */}
    <div className="relative aspect-[421/551] rounded-[18px] border border-sand/25 bg-gradient-to-br from-forest to-ink p-8 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-sand/85">
            Oregon House District 33
          </p>
          <p className="mt-1 text-[11px] tracking-[0.28em] uppercase text-sand/60">
            Voters Guide
          </p>
        </div>
        <span className="rounded-full border border-sand/30 bg-sand/10 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-sand">
          Free
        </span>
      </div>

      <h3 className="font-display mt-16 text-4xl leading-[1.05] font-medium text-cream sm:text-5xl">
        HD33 Voters Guide
      </h3>
      <span className="mt-4 block h-[3px] w-12 rounded-full bg-sand" />
      <p className="mt-5 text-sm leading-relaxed text-cream/80">
        See what happened. See where the candidates stand. Decide for yourself.
      </p>

      <div className="absolute right-8 bottom-8 left-8 border-t border-sand/15 pt-5">
        <p className="text-[11px] leading-relaxed text-cream/75">
          Downtown • Northwest Portland • Pearl • Linnton • Cathedral Park • Forest Park
        </p>
        <p className="mt-2 text-[11px] tracking-wide text-sand/85">
          General Election • November 3, 2026
        </p>
      </div>
    </div>
  </div>
)

const GuideCoversSection = () => (
  <section className="relative isolate overflow-x-clip bg-ink py-16 text-cream sm:py-20">
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
        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-sand/85">
          The free HD33 Voters Guide covers:
        </p>
        <SplitText
          as="h2"
          by="word"
          text="Know What Happened Before You Vote."
          className="font-display text-cream mt-4 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[48px]"
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
              className="group flex items-center gap-4 border-b border-sand/15 py-4 last:border-b-0"
            >
              <span className="text-xs font-mono tracking-widest text-sand/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 text-base leading-snug text-cream/90 sm:text-lg">
                {chapter}
              </span>
              <ArrowRight className="h-4 w-4 text-sand/60 transition-colors group-hover:text-cream" />
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
          <p className="font-display text-2xl leading-snug text-cream sm:max-w-xs">
            Know the issues, the record, and the choice.
          </p>
          <SandButton onClick={scrollToForm}>Send Me the Free Guide</SandButton>
        </m.div>
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   7. TWO SOCIAL POSTS — companion imagery pair
------------------------------------------------------------------ */
const SocialPairSection = () => (
  <section className="relative isolate overflow-x-clip bg-ink py-16 text-cream sm:py-20">
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
          className="relative aspect-[1080/1350] overflow-hidden rounded-2xl border border-sand/15 bg-forest shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
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
  <section className="relative isolate bg-ink py-20 text-cream sm:py-24">
    <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-5">
        <SplitText
          as="h2"
          by="word"
          text="Get the HD33 Voters Guide"
          className="font-display text-cream text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[52px]"
        />
        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-6 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg"
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
   9. DISTRICT 33 LIVES WITH THE RESULTS — sand-panel final CTA
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
  <section className="relative isolate bg-ink py-16 text-cream sm:py-20">
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <m.div
        variants={cardReveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="rounded-[28px] bg-sand px-6 py-14 text-center text-ink shadow-[0_40px_100px_-40px_rgba(0,0,0,0.55)] sm:px-10 sm:py-16 md:px-16 md:py-20"
      >
        <SplitText
          as="h2"
          by="word"
          text="District 33 Lives With the Results."
          className="font-display text-ink mx-auto max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-[56px]"
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
              className="rounded-full border border-ink/25 bg-ink/5 px-4 py-1.5 text-sm text-ink"
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
          className="mt-8 text-base leading-relaxed text-ink/80"
        >
          Before November 3, take a few minutes to look at the record.
        </m.p>

        <m.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="font-display mt-4 text-2xl tracking-[0.03em] uppercase text-ink sm:text-3xl md:text-[32px]"
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
            className="!bg-ink !text-cream !border-ink hover:!opacity-90 tracking-[0.14em] uppercase"
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
          className="mt-8 text-xs tracking-[0.22em] uppercase text-ink/60"
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
  <div className="border-t border-sand/15 bg-ink py-8 text-cream">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center sm:px-8 lg:px-12">
      <p className="text-[11px] leading-relaxed text-cream/60">{pac.disclaimers.paidFor}</p>
      <p className="text-[10px] tracking-widest uppercase text-cream/45">
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
