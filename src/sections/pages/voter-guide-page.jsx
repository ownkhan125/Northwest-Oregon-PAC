'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { fadeUp, stagger, cardReveal, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { pac } from '@/data/pac'

/* ------------------------------------------------------------------
   Conversion form — LEFT UNTOUCHED (fields, validation, webhook,
   layout, functionality all preserved as delivered).
------------------------------------------------------------------ */
const initialForm = { firstName: '', lastName: '', email: '', zip: '' }

const ZIP_RE = /^\d{5}(-\d{4})?$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = (values) => {
  const errors = {}
  if (!values.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!values.lastName.trim()) errors.lastName = 'Please enter your last name.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (values.zip.trim() && !ZIP_RE.test(values.zip.trim())) errors.zip = 'Enter a 5-digit ZIP.'
  return errors
}

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} role="alert" className="text-primary mt-1.5 text-xs">
      {message}
    </p>
  ) : null

const ConversionForm = ({ compact = false }) => {
  const router = useRouter()
  const [values, setValues] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

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
          zip: values.zip.trim(),
          source: '5-minutes-voter-guide',
        }),
      })
      if (!res.ok) throw new Error('submission_failed')
      setStatus('success')
      router.push('/thank-you')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      data-form-state={status}
      className={cn(
        'border-primary/25 bg-surface relative rounded-3xl border shadow-[0_25px_80px_-40px_rgba(46,69,56,0.35)]',
        compact ? 'p-5 sm:p-6' : 'p-6 sm:p-8',
      )}
    >
      <h2 className="font-display text-foreground text-2xl font-medium tracking-tight sm:text-3xl">
        Download Your Free Guide
      </h2>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="First Name"
              name="firstName"
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
            <Input
              label="Last Name"
              name="lastName"
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

        <div>
          <Input
            label="Email Address"
            name="email"
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

        <div>
          <Input
            label="ZIP Code (Optional)"
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={10}
            value={values.zip}
            onChange={onChange}
            aria-invalid={!!errors.zip}
            aria-describedby={errors.zip ? 'zip-error' : undefined}
          />
          <FieldError id="zip-error" message={errors.zip} />
        </div>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="border-primary/40 bg-surface-alt/60 mt-5 rounded-xl border p-4 text-sm"
        >
          Something went wrong sending your info. Please try again in a moment.
        </div>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3">
        <Button
          type="submit"
          size="lg"
          className="w-full whitespace-nowrap"
          data-testid="funnel-submit"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <span className="border-primary-fg/40 border-t-primary-fg h-4 w-4 animate-spin rounded-full border-2" />
              Sending…
            </span>
          ) : (
            <>
              Download My Free Guide
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
                <path d="M12 5v14M5 12l7 7 7-7" />
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
    </form>
  )
}

/* ------------------------------------------------------------------
   Hero — PDF Landing Page hero content on the left, form on the right
------------------------------------------------------------------ */
const Hero = () => {
  const root = useRef(null)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])

  return (
    <section
      ref={root}
      className="relative isolate flex min-h-screen w-full items-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div
        aria-hidden
        className="bg-highlight/18 pointer-events-none absolute top-1/4 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-primary/10 pointer-events-none absolute bottom-0 -right-24 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="border-primary/15 spin-slow pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed"
      />

      <m.div
        style={{ y }}
        className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12"
      >
        <div className="lg:col-span-6">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="bg-primary absolute inset-0 rounded-full" />
              <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
            </span>
            Free 5-Minute Guide
          </m.div>

          <SplitText
            as="h1"
            by="word"
            text="Why Does It Feel Like You're Paying More… and Getting Less?"
            className="font-display text-foreground text-[9vw] leading-[1.02] font-medium tracking-tight sm:text-5xl md:text-[56px] lg:text-[60px]"
            delay={0.2}
            staggerChildren={0.05}
            duration={0.7}
            inView={false}
          />

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-highlight mt-6 max-w-xl text-base font-medium sm:text-lg"
          >
            Download Your Free 5-Minute Guide to the Issues Affecting Northwest Oregon Families.
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="text-foreground/80 mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            Everyday life has become more expensive. Housing feels harder to afford. Families are
            asking important questions about public safety, education, and how taxpayer dollars are
            being spent.
          </m.p>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-foreground/80 mt-4 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            This free guide provides clear, practical information about the issues shaping Northwest
            Oregon, without political jargon or partisan talking points.
          </m.p>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="lg:col-span-6"
          id="funnel-form"
        >
          <ConversionForm />
        </m.div>
      </m.div>
    </section>
  )
}

/* ------------------------------------------------------------------
   "In This Free Guide, You'll Learn:" — five checkmark takeaways
------------------------------------------------------------------ */
const learnItems = [
  'Why the cost of living continues to rise',
  "What's driving housing affordability challenges",
  'Why public safety remains a community priority',
  "How education shapes Northwest Oregon's future",
  'Why government accountability matters to every taxpayer',
]

const LearnSection = () => (
  <section className="relative isolate overflow-x-clip py-14 sm:py-20">
    <div
      aria-hidden
      className="bg-highlight/10 pointer-events-none absolute top-1/2 -right-32 -z-10 h-[45vmin] w-[45vmin] -translate-y-1/2 rounded-full blur-3xl"
    />
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase"
        >
          Inside the guide
        </m.div>
        <SplitText
          as="h2"
          by="word"
          text="In This Free Guide, You'll Learn:"
          className="font-display text-foreground mt-4 text-3xl leading-[1.1] font-medium tracking-tight sm:text-4xl md:text-5xl"
          delay={0.1}
          staggerChildren={0.05}
          duration={0.7}
        />
      </div>

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {learnItems.map((item) => (
          <m.li
            key={item}
            variants={cardReveal}
            className="border-primary/20 bg-surface hover:border-primary/45 flex items-start gap-4 rounded-2xl border p-5 transition-colors sm:p-6"
          >
            <span className="border-primary/30 bg-surface-alt/40 text-primary mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M5 12l4 4 10-10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-foreground/85 text-base leading-relaxed sm:text-lg">{item}</p>
          </m.li>
        ))}
      </m.ul>

      <m.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-12 flex justify-center"
      >
        <Button
          onClick={() => {
            if (typeof window === 'undefined') return
            const el = document.getElementById('funnel-form')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }}
          size="lg"
        >
          Download My Free Guide
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Button>
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   Footer note — verbatim from the PDF (unsubscribe / updates)
------------------------------------------------------------------ */
const FooterNote = () => (
  <section className="relative isolate overflow-x-clip pb-16 sm:pb-20">
    <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
      <m.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-foreground/60 text-center text-sm leading-relaxed"
      >
        By downloading this guide, you&rsquo;ll receive occasional updates from Northwest Oregon
        PAC. You can unsubscribe at any time.
      </m.p>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   Minimal legal footer (required PAC disclosure)
------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------
   Assembled page
------------------------------------------------------------------ */
export default function VoterGuidePage() {
  return (
    <>
      <Hero />
      <LearnSection />
      <FooterNote />
      <LegalStrip />
    </>
  )
}
