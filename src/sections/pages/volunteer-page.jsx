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
import { volunteerActivities, pac, welcomeEmail } from '@/data/pac'
import {
  A2P_SMS_UPDATES_LABEL,
  A2P_SMS_PROMO_LABEL,
  OREGON_COUNTIES,
  OREGON_REGIONS,
  CAMPAIGN_EXPERIENCE_OPTIONS,
  AVAILABILITY_OPTIONS,
  HELP_FREQUENCY_OPTIONS,
} from '@/lib/form-constants'

export default function VolunteerPage() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const submitted = status === 'success'

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
        eyebrow="Join the team"
        number="03"
        title="Your energy fuels this region."
        description="Northwest Oregon PAC is built by grassroots volunteers. Whether you can give a few hours a month or want to run for office yourself, there is a place for you here."
        accent="/icons/ballot-box.svg"
      />

      {/* Ways to help */}
      <section className="relative isolate overflow-x-clip py-12">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="border-primary/15 bg-primary/[0.02] grid grid-cols-2 gap-px overflow-hidden rounded-2xl border md:grid-cols-4"
          >
            {volunteerActivities.map((activity, i) => (
              <m.div
                key={activity}
                variants={fadeUp}
                className="bg-surface/80 p-6 text-center sm:p-8"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="font-display text-foreground mt-3 text-xl font-medium sm:text-2xl">
                  {activity}
                </div>
              </m.div>
            ))}
          </m.div>

          <m.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="mx-auto mt-12 max-w-3xl text-center"
          >
            <p className="font-display text-foreground text-2xl leading-snug sm:text-3xl md:text-4xl">
              “{pac.shortPromise}”
            </p>
            <footer className="text-highlight mt-4 font-mono text-[11px] tracking-widest uppercase">
              — {pac.values.join(' · ')}
            </footer>
          </m.blockquote>
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
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
              Sign up
            </div>
            <h2 className="font-display text-foreground mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
              Join the team
            </h2>
            <p className="text-foreground/75 mx-auto mt-4 max-w-xl">
              Tell us a little about yourself. We match volunteers with the work that fits their
              time, interests, and neighborhood.
            </p>
          </m.div>

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
                />
                <Input
                  label="ZIP code (optional)"
                  name="zipCode"
                  inputMode="numeric"
                  pattern="\d{5}(-\d{4})?"
                  maxLength={10}
                  autoComplete="postal-code"
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
                <p className="text-foreground/60 max-w-md text-xs">
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

      {/* Alt CTA: donate */}
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
              <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
                Not ready to volunteer?
              </div>
              <h2 className="font-display text-foreground mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                Donate instead.
              </h2>
              <p className="text-foreground/75 mt-3 max-w-xl">
                Every dollar helps us reach another voter, back another candidate, and organize
                another corner of Northwest Oregon.
              </p>
            </div>
            <Button href="/donate" size="lg">
              Chip in now
            </Button>
          </m.div>
        </div>
      </section>
    </>
  )
}
