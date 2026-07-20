'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac, welcomeEmail } from '@/data/pac'
import { validateContactFields } from '@/lib/form'
import {
  A2P_SMS_UPDATES_LABEL,
  A2P_SMS_PROMO_LABEL,
  OREGON_COUNTIES,
  OREGON_REGIONS,
  CAMPAIGN_EXPERIENCE_OPTIONS,
  AVAILABILITY_OPTIONS,
  HELP_FREQUENCY_OPTIONS,
} from '@/lib/form-constants'

// Volunteer Page — Section 2 content, sourced verbatim from the Volunteer
// Page content document. Do NOT paraphrase or edit without an updated doc.
const WAYS_TO_HELP = [
  {
    id: '01',
    title: 'CANVASS',
    subheading: 'Meet voters in their communities.',
    paragraphs: [
      'Canvassing gives volunteers an opportunity to introduce candidates, discuss important races, distribute information, and listen to the concerns of local residents.',
    ],
    listIntro: 'Volunteer activities may include:',
    list: [
      'Door-to-door voter outreach',
      'Literature distribution',
      'Neighborhood walks',
      'Voter-information conversations',
      'Candidate introductions',
    ],
    cta: 'Volunteer to Canvass',
    href: '#run',
  },
  {
    id: '02',
    title: 'PHONE BANKING',
    subheading: 'Help candidates reach more people.',
    paragraphs: [
      'Phone-bank volunteers help campaigns communicate with voters, recruit supporters, share event information, and identify people interested in becoming involved.',
      'Opportunities may be conducted individually, remotely, or as part of an organized volunteer session.',
    ],
    cta: 'Join a Phone Bank',
    href: '#run',
  },
  {
    id: '03',
    title: 'EVENT PLANNING',
    subheading: 'Help bring the community together.',
    paragraphs: [
      'Event volunteers assist with candidate gatherings, community conversations, fundraising activities, volunteer meetings, and other regional events.',
    ],
    listIntro: 'Ways to help may include:',
    list: [
      'Finding or preparing a venue',
      'Greeting and checking in guests',
      'Coordinating volunteers',
      'Sharing event information',
      'Assisting with setup and cleanup',
      'Helping hosts and speakers',
    ],
    cta: 'Help With Events',
    href: '#run',
  },
  {
    id: '04',
    title: 'RUN FOR OFFICE',
    subheading: 'Consider becoming the candidate.',
    paragraphs: [
      'Northwest Oregon needs capable people who understand their communities and are prepared to listen, organize, communicate, and lead.',
      'A first conversation does not create a commitment to run. It gives us an opportunity to learn about your experience, the community you want to serve, and what has motivated your interest.',
    ],
    cta: 'Start the Conversation',
    href: '/contact',
  },
]

export default function VolunteerPage() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const submitted = status === 'success'

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
      firstName: String(data.get('firstName') || '').trim(),
      lastName: String(data.get('lastName') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      zipCode: String(data.get('zipCode') || '').trim(),
      city: String(data.get('city') || '').trim(),
      county: String(data.get('county') || '').trim(),
      region: String(data.get('region') || '').trim(),
      registeredVoter: String(data.get('registeredVoter') || '').trim(),
      campaignExperience: String(data.get('campaignExperience') || '').trim(),
      availability: String(data.get('availability') || '').trim(),
      frequency: String(data.get('frequency') || '').trim(),
      anythingElse: String(data.get('anythingElse') || '').trim(),
      sms_updates: data.get('sms_updates') === 'on' ? 'Yes' : 'No',
      sms_promo: data.get('sms_promo') === 'on' ? 'Yes' : 'No',
    }

    const errs = validateContactFields(payload, {
      phoneKey: 'phone',
      phoneRequired: false,
      zipKey: 'zipCode',
      zipRequired: false,
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
      const res = await fetch('/api/volunteer', {
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
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please check your connection and try again.')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="VOLUNTEER WITH NORTHWEST OREGON PAC"
        number="03"
        title="Your time can strengthen the region."
        description="Volunteer with Northwest Oregon PAC by meeting voters, making calls, organizing events, supporting candidates, or beginning a conversation about running for office."
        accent="/icons/ballot-box.svg"
      />

      {/* Find your way to help */}
      <section className="relative isolate overflow-x-clip py-12 sm:py-16">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl"
          >
            FIND YOUR WAY TO HELP
          </m.h2>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {WAYS_TO_HELP.map((way) => (
              <m.article
                key={way.id}
                variants={fadeUp}
                className="border-primary/20 bg-surface/80 flex h-full flex-col justify-between rounded-2xl border p-7 sm:p-8"
              >
                <div>
                  <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                    {way.id}
                  </div>
                  <h3 className="font-display text-foreground mt-3 text-2xl leading-tight font-medium sm:text-3xl">
                    {way.title}
                  </h3>
                  <p className="font-display text-primary mt-3 text-lg leading-snug sm:text-xl">
                    {way.subheading}
                  </p>
                  <div className="text-foreground/80 mt-4 space-y-3 text-sm leading-relaxed sm:text-base">
                    {way.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {way.list && (
                    <div className="mt-5">
                      <p className="text-foreground/85 text-sm sm:text-base">{way.listIntro}</p>
                      <ul className="mt-3 space-y-2">
                        {way.list.map((item) => (
                          <li
                            key={item}
                            className="text-foreground/75 flex items-start gap-3 text-sm sm:text-base"
                          >
                            <span
                              aria-hidden
                              className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-7">
                  <Button href={way.href} size="md">
                    {way.cta}
                  </Button>
                </div>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>

      {/* Form */}
      <section id="run" className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="via-primary mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent to-transparent"
          />
          {submitted ? (
            <m.div
              role="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-primary/25 bg-surface/85 mx-auto mt-12 max-w-2xl rounded-3xl border p-8 sm:p-10"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Welcome
              </div>
              <h3 className="font-display text-primary mt-3 text-2xl sm:text-3xl">
                {pac.successMessage}
              </h3>
              <details className="mt-6">
                <summary className="text-primary cursor-pointer text-sm">
                  Preview the welcome note you’ll receive
                </summary>
                <pre className="text-foreground/80 mt-4 whitespace-pre-wrap font-sans text-sm">
                  {welcomeEmail}
                </pre>
              </details>
            </m.div>
          ) : (
            <m.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="border-primary/25 bg-surface mt-12 space-y-8 rounded-3xl border p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input label="First name" name="firstName" required autoComplete="given-name" />
                <Input label="Last name" name="lastName" required autoComplete="family-name" />
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Input
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(503) 555-0123"
                  error={fieldErrors.phone}
                  onChange={() => clearFieldError('phone')}
                />
                <Input
                  label="ZIP code (optional)"
                  name="zipCode"
                  inputMode="numeric"
                  maxLength={5}
                  autoComplete="postal-code"
                  placeholder="97005"
                  error={fieldErrors.zipCode}
                  onChange={() => clearFieldError('zipCode')}
                />
                <Input
                  label="City"
                  name="city"
                  required
                  autoComplete="address-level2"
                />
                <Select
                  label="County (optional)"
                  name="county"
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
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Select
                  label="Region"
                  name="region"
                  required
                  defaultValue=""
                  placeholder="Select a region"
                >
                  <option value="" disabled>
                    Select a region
                  </option>
                  {OREGON_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>
                <Select
                  label="Registered to vote in Oregon?"
                  name="registeredVoter"
                  required
                  defaultValue=""
                  placeholder="Select one"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </div>

              <Select
                label="Prior campaign experience"
                name="campaignExperience"
                required
                defaultValue=""
                placeholder="Select one"
              >
                <option value="" disabled>
                  Select one
                </option>
                {CAMPAIGN_EXPERIENCE_OPTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </Select>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Select
                  label="Availability"
                  name="availability"
                  required
                  defaultValue=""
                  placeholder="Select one"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {AVAILABILITY_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </Select>
                <Select
                  label="How often would you like to help?"
                  name="frequency"
                  required
                  defaultValue=""
                  placeholder="Select one"
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  {HELP_FREQUENCY_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </Select>
              </div>

              <Textarea
                label="Anything else you'd like to share? (optional)"
                name="anythingElse"
                rows={3}
              />

              <div className="border-primary/15 space-y-4 border-t pt-6">
                <Checkbox name="sms_updates" label={A2P_SMS_UPDATES_LABEL} />
                <Checkbox name="sms_promo" label={A2P_SMS_PROMO_LABEL} />
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-foreground/70 max-w-md text-[13px] leading-relaxed">
                  By signing up, you agree to our{' '}
                  <a href="/privacy-policy" className="text-primary hover:text-highlight">
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href="/terms-of-service" className="text-primary hover:text-highlight">
                    Terms of Service
                  </a>
                  .
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? 'Signing up…' : 'Become a Volunteer'}
                </Button>
              </div>

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
            </m.form>
          )}
        </div>
      </section>

      {/* Section 3 — Show up for Northwest Oregon */}
      <section className="relative isolate overflow-x-clip py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-primary/25 bg-surface-alt/60 grid grid-cols-1 items-center gap-6 rounded-3xl border p-8 sm:p-12 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <h2 className="font-display text-foreground text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                Show up for Northwest Oregon.
              </h2>
              <div className="text-foreground/75 mt-4 max-w-xl space-y-3">
                <p>
                  Give an hour, make a few calls, help organize a room, or begin exploring a larger
                  role.
                </p>
                <p>Every strong organization starts with people willing to take the first step.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="#run" size="lg">
                Sign Up Today
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact the PAC
              </Button>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
