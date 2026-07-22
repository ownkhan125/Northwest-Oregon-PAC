'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Counter from '@/components/ui/counter'
import ThemeToggle from '@/components/ui/theme-toggle'
import Logo from '@/components/ui/logo'
import { fadeUp, stagger, cardReveal, EASE } from '@/animations/variants'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { cn } from '@/lib/cn'
import { pac, priorities } from '@/data/pac'

/* ------------------------------------------------------------------
   Minimal top strip — logo + theme toggle only. No nav, no menu.
------------------------------------------------------------------ */
const TopStrip = () => (
  <m.div
    initial={{ opacity: 0, y: -12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
    className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 sm:px-6 sm:pt-6"
  >
    <div className="border-border/60 bg-surface/70 pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl sm:px-4">
      <Logo />
      <ThemeToggle />
    </div>
  </m.div>
)

/* ------------------------------------------------------------------
   Trust bar — nonpartisan filing #, region, oversight
------------------------------------------------------------------ */
const trustItems = [
  { label: 'Filing', value: `#${pac.filingNumber}` },
  { label: 'Type', value: pac.type },
  { label: 'Region', value: pac.region },
  { label: 'Oversight', value: pac.regulator },
]

const TrustBar = () => (
  <m.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-10% 0px' }}
    className="border-primary/15 mx-auto mt-4 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-4 border-t border-b py-6 sm:grid-cols-4"
  >
    {trustItems.map((it) => (
      <m.div key={it.label} variants={fadeUp} className="text-center">
        <div className="text-muted font-mono text-[9px] tracking-[0.3em] uppercase">{it.label}</div>
        <div className="font-display text-foreground mt-1 text-base font-medium sm:text-lg">
          {it.value}
        </div>
      </m.div>
    ))}
  </m.div>
)

/* ------------------------------------------------------------------
   Why Support Matters — impact numbers with counters
------------------------------------------------------------------ */
const impacts = [
  {
    value: 6,
    suffix: '',
    label: 'Endorsed candidates',
    desc: 'Local voices we are actively backing in the 2026 cycle.',
  },
  {
    value: 5,
    suffix: '',
    label: 'Core priorities',
    desc: 'From small business to affordable, reliable energy.',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Regional focus',
    desc: 'Every dollar stays in Northwest Oregon races.',
  },
]

const WhySection = () => (
  <section className="relative isolate overflow-x-clip py-20 sm:py-24">
    <div
      aria-hidden
      className="bg-highlight/12 pointer-events-none absolute top-1/3 -right-32 -z-10 h-[45vmin] w-[45vmin] rounded-full blur-3xl"
    />
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <div className="max-w-3xl">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase"
        >
          Why your support matters
        </m.div>
        <SplitText
          as="h2"
          by="word"
          text="Northwest Oregon has been written off for too long."
          className="font-display text-foreground mt-4 text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl md:text-5xl"
          delay={0.15}
          staggerChildren={0.06}
          duration={0.7}
        />
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="text-foreground/75 mt-6 max-w-2xl text-base sm:text-lg"
        >
          Republicans, moderates, and common-sense voters here deserve real support, competitive
          candidates, and a voice that stands up for the people who actually live and work in our
          region.
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3"
      >
        {impacts.map((it) => (
          <m.div
            key={it.label}
            variants={cardReveal}
            className="group border-primary/20 bg-surface hover:border-primary/45 flex h-full flex-col rounded-2xl border p-6 transition-colors"
          >
            <div className="font-display text-primary text-4xl font-medium sm:text-5xl">
              <Counter value={it.value} suffix={it.suffix} duration={1.6} />
            </div>
            <div className="text-highlight mt-2 font-mono text-[10px] tracking-[0.28em] uppercase">
              {it.label}
            </div>
            <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{it.desc}</p>
          </m.div>
        ))}
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   Key Commitments — five priorities, tight
------------------------------------------------------------------ */
const CommitmentsSection = () => {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const cards = el.querySelectorAll('[data-commit-card]')
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: (i % 3) * 0.05,
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })
    }, el)
    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="relative isolate overflow-x-clip py-20 sm:py-24" ref={rootRef}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
              What we stand for
            </div>
            <h2 className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
              Five commitments. Zero fluff.
            </h2>
          </div>
          <p className="text-foreground/70 max-w-sm text-sm sm:text-base">
            Every candidate we back and every dollar we spend traces back to these five priorities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {priorities.map((p) => (
            <div
              key={p.id}
              data-commit-card
              className="border-primary/20 bg-surface hover:border-primary/45 group relative flex h-full flex-col rounded-2xl border p-6 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-highlight font-mono text-[10px] tracking-[0.35em] uppercase">
                  {p.id}
                </span>
                <span className="border-primary/25 bg-surface-alt/50 text-primary grid h-9 w-9 place-items-center rounded-full border">
                  <svg viewBox="0 0 24 24" className="h-4 w-4">
                    <path
                      d="M5 12h14M13 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </div>
              <h3 className="font-display text-foreground mt-4 text-xl leading-snug font-medium tracking-tight">
                {p.name}
              </h3>
              <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{p.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Social Proof — supporter voices + community impact
------------------------------------------------------------------ */
const voices = [
  {
    quote:
      'Finally, a group that gets what our region has been dealing with. Real people, real priorities, real backing.',
    name: 'Portland-metro voter',
    role: 'First-time supporter',
  },
  {
    quote:
      'They asked what mattered to my community before they asked for a dollar. That is a change.',
    name: 'Small business owner',
    role: 'Beaverton',
  },
  {
    quote:
      'Nonpartisan, common-sense, and locally focused. This is the coalition Northwest Oregon needed.',
    name: 'Volunteer',
    role: 'Congressional District 1',
  },
]

const SocialProofSection = () => (
  <section className="bg-surface-alt/40 relative isolate overflow-x-clip py-20 sm:py-24">
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <div className="max-w-2xl">
        <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
          Community impact
        </div>
        <h2 className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
          A growing coalition of neighbours, donors, and volunteers.
        </h2>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10% 0px' }}
        className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3"
      >
        {voices.map((v, i) => (
          <m.figure
            key={i}
            variants={cardReveal}
            className="border-primary/20 bg-surface flex h-full flex-col rounded-2xl border p-6"
          >
            <svg viewBox="0 0 24 24" className="text-primary/60 h-6 w-6" aria-hidden>
              <path
                d="M7 7c-2 1-3 3-3 6v4h5v-6H6c0-2 1-3 3-4V7Zm10 0c-2 1-3 3-3 6v4h5v-6h-3c0-2 1-3 3-4V7Z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="text-foreground/85 mt-4 flex-1 text-base leading-relaxed">
              “{v.quote}”
            </blockquote>
            <figcaption className="border-primary/15 mt-6 border-t pt-4">
              <div className="font-display text-foreground text-sm font-medium">{v.name}</div>
              <div className="text-muted mt-0.5 font-mono text-[10px] tracking-[0.25em] uppercase">
                {v.role}
              </div>
            </figcaption>
          </m.figure>
        ))}
      </m.div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   FAQ — accordion, keyboard accessible
------------------------------------------------------------------ */
const faqs = [
  {
    q: 'Is my contribution tax deductible?',
    a: 'Contributions to a state PAC like Northwest Oregon PAC are generally not tax deductible for federal income-tax purposes. Please consult your tax advisor for your situation.',
  },
  {
    q: 'Where does my support go?',
    a: 'Every dollar stays focused on Northwest Oregon races — supporting endorsed candidates, community outreach, and organizing across our region.',
  },
  {
    q: 'Do I have to donate to get involved?',
    a: 'Not at all. You can volunteer, canvass, phone bank, or help plan events. Sign up on the form and select what fits — we will follow up with next steps.',
  },
  {
    q: 'Is this partisan?',
    a: 'We are nonpartisan and coalition-focused. Our work backs candidates and policies aligned with our five priorities — prosperity, accountability, safety, education, and reliable energy.',
  },
]

const FAQItem = ({ q, a, index, open, onToggle }) => (
  <m.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.55, ease: EASE, delay: index * 0.05 }}
    className={cn(
      'border-primary/20 rounded-2xl border transition-colors',
      open ? 'bg-surface' : 'bg-surface/60 hover:bg-surface',
    )}
  >
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left"
    >
      <span className="font-display text-foreground text-base font-medium sm:text-lg">{q}</span>
      <m.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="border-primary/30 text-primary grid h-8 w-8 shrink-0 place-items-center rounded-full border"
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
          <path
            d="M12 5v14M5 12h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </m.span>
    </button>
    <m.div
      initial={false}
      animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="overflow-hidden"
    >
      <p className="text-foreground/75 px-6 pb-6 text-sm leading-relaxed sm:text-base">{a}</p>
    </m.div>
  </m.div>
)

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="relative isolate overflow-x-clip py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
            Common questions
          </div>
          <h2 className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
            Everything you might be wondering.
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Conversion form — validation, loading, success, error
------------------------------------------------------------------ */
const initialForm = { name: '', email: '', phone: '', zip: '', message: '' }

const ZIP_RE = /^\d{5}(-\d{4})?$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[0-9()+\-.\s]{7,}$/

const validate = (values) => {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.phone.trim()) errors.phone = 'Phone is required.'
  else if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (!values.zip.trim()) errors.zip = 'ZIP is required.'
  else if (!ZIP_RE.test(values.zip.trim())) errors.zip = 'Enter a 5-digit ZIP.'
  return errors
}

const FieldError = ({ id, message }) =>
  message ? (
    <p id={id} role="alert" className="text-primary mt-1.5 text-xs">
      {message}
    </p>
  ) : null

const ConversionForm = ({ compact = false }) => {
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
      // Simulated submission — swap with real endpoint when wired up.
      await new Promise((resolve) => setTimeout(resolve, 900))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="border-primary/30 bg-surface-alt/50 rounded-2xl border p-8 text-center"
        data-form-state="success"
      >
        <div className="border-primary/40 text-primary mx-auto grid h-12 w-12 place-items-center rounded-full border">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
            <path
              d="M5 12l4 4 10-10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-display text-foreground mt-5 text-2xl font-medium sm:text-3xl">
          {pac.successMessage}
        </h3>
        <p className="text-foreground/70 mx-auto mt-3 max-w-md text-sm">
          Your details are in. Watch your inbox for a note from the team and next steps.
        </p>
      </m.div>
    )
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
      <div className="flex items-center gap-3">
        <span className="relative grid h-2 w-2 place-items-center">
          <span className="bg-primary absolute inset-0 rounded-full" />
          <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
        </span>
        <span className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
          Join the movement
        </span>
      </div>
      <h3 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
        Add your voice in 30 seconds.
      </h3>
      <p className="text-foreground/65 mt-2 text-sm">
        Nonpartisan · No spam · Unsubscribe anytime
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <Input
            label="Full name"
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Input
            label="Email"
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              label="Phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={values.phone}
              onChange={onChange}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
          <div>
            <Input
              label="ZIP code"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={10}
              required
              value={values.zip}
              onChange={onChange}
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? 'zip-error' : undefined}
            />
            <FieldError id="zip-error" message={errors.zip} />
          </div>
        </div>

        <Textarea
          label="Message (optional)"
          name="message"
          rows={4}
          value={values.message}
          onChange={onChange}
          placeholder="Anything you would like us to know?"
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="border-primary/40 bg-surface-alt/60 mt-5 rounded-xl border p-4 text-sm"
        >
          Something went wrong sending your info. Please try again in a moment.
        </div>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground/55 text-[11px] leading-relaxed">
          By submitting, you agree to our{' '}
          <a href="/privacy-policy" className="text-primary hover:text-highlight">
            Privacy Policy
          </a>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          data-testid="funnel-submit"
        >
          {status === 'loading' ? (
            <span className="inline-flex items-center gap-2">
              <span className="border-primary-fg/40 border-t-primary-fg h-4 w-4 animate-spin rounded-full border-2" />
              Sending…
            </span>
          ) : (
            <>
              Get me involved
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
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------
   Hero — form above the fold, headline + supporting copy
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
            2026 Cycle · Nonpartisan · Filing #{pac.filingNumber}
          </m.div>

          <div className="font-display text-foreground text-[11vw] leading-[0.98] font-medium tracking-tight sm:text-6xl md:text-[64px] lg:text-[72px]">
            <SplitText
              as="span"
              text="Our region"
              className="block"
              delay={0.2}
              staggerChildren={0.045}
              duration={0.7}
              inView={false}
            />
            <SplitText
              as="span"
              text="deserves"
              className="block"
              delay={0.42}
              staggerChildren={0.045}
              duration={0.7}
              inView={false}
            />
            <SplitText
              as="span"
              text="a voice."
              className="block"
              charClassName="text-primary"
              delay={0.62}
              staggerChildren={0.045}
              duration={0.7}
              inView={false}
            />
          </div>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="text-foreground/80 mt-7 max-w-lg text-base sm:text-lg"
          >
            Join Northwest Oregon PAC and back the candidates, priorities, and people fighting for
            prosperity, accountability, and opportunity across our region.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="text-foreground/60 mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs"
          >
            <span className="inline-flex items-center gap-2">
              <span className="bg-primary/60 h-1.5 w-1.5 rounded-full" />
              Nonpartisan coalition
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="bg-primary/60 h-1.5 w-1.5 rounded-full" />
              100% Northwest Oregon focus
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="bg-primary/60 h-1.5 w-1.5 rounded-full" />
              No spam, ever
            </span>
          </m.div>
        </div>

        <m.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
          className="lg:col-span-6"
        >
          <ConversionForm />
        </m.div>
      </m.div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Final CTA — jump user back to the form
------------------------------------------------------------------ */
const FinalCTA = () => {
  const scrollToForm = () => {
    if (typeof window === 'undefined') return
    const el = document.getElementById('funnel-form')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <section className="relative isolate overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="border-primary/25 bg-surface-inverse relative isolate overflow-hidden rounded-[2rem] border px-6 py-14 text-center sm:px-14 sm:py-20"
        >
          <div
            aria-hidden
            className="bg-highlight/25 pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full blur-3xl"
          />
          <div
            aria-hidden
            className="bg-accent/20 pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full blur-3xl"
          />

          <div className="on-dark relative">
            <span className="font-mono text-[10px] tracking-[0.35em] uppercase opacity-80">
              Ready?
            </span>
            <h2 className="font-display mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
              Stand with Northwest Oregon.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm opacity-85 sm:text-base">
              Thirty seconds is all it takes to become part of the coalition. We will take it from
              here.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                onClick={scrollToForm}
                size="xl"
                className="bg-accent text-ink hover:opacity-95 border-accent"
              >
                Add my voice
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------
   Contact / Conversion Form (second form near the bottom, matches spec)
------------------------------------------------------------------ */
const ContactFormSection = () => (
  <section
    id="funnel-form"
    className="relative isolate overflow-x-clip py-16 sm:py-24"
    aria-label="Sign-up form"
  >
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
      <div className="lg:col-span-5">
        <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
          Final step
        </div>
        <h2 className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl">
          Complete your sign-up.
        </h2>
        <p className="text-foreground/70 mt-5 text-base leading-relaxed">
          Send us your details and a member of the team will follow up with everything you need to
          know — how to get involved, upcoming events, and the candidates we are backing.
        </p>

        <div className="border-primary/15 mt-8 space-y-4 border-t pt-8 text-sm">
          <div>
            <div className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
              Direct line
            </div>
            <p className="text-foreground/85 mt-1">
              {pac.contact.name} · {pac.contact.phone}
            </p>
          </div>
          <div>
            <div className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">Email</div>
            <a
              href={`mailto:${pac.contact.generalEmail}`}
              className="text-primary hover:text-highlight mt-1 inline-block transition-colors"
            >
              {pac.contact.generalEmail}
            </a>
          </div>
          <div>
            <div className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
              Mailing
            </div>
            <address className="text-foreground/85 mt-1 not-italic">
              {pac.contact.mailingAddressLines.map((l) => (
                <div key={l}>{l}</div>
              ))}
            </address>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <ConversionForm />
      </div>
    </div>
  </section>
)

/* ------------------------------------------------------------------
   Minimal legal footer (no navigation)
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
export default function FunnelPage() {
  return (
    <>
      <TopStrip />
      <Hero />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <TrustBar />
      </div>
      <WhySection />
      <CommitmentsSection />
      <SocialProofSection />
      <FAQSection />
      <FinalCTA />
      <ContactFormSection />
      <LegalStrip />
    </>
  )
}
