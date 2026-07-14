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

const counties = [
  'Clatsop',
  'Columbia',
  'Multnomah',
  'Tillamook',
  'Washington',
  'Yamhill',
  'Other',
]

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <PageHeader
        eyebrow="Join the team"
        number="03"
        title="Your energy fuels this region."
        description="Northwest Oregon PAC is built by grassroots volunteers. Whether you can give a few hours a month or want to run for office yourself, there is a place for you here."
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
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
              className="border-primary/25 bg-surface mt-12 space-y-8 rounded-3xl border p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input label="First name" name="firstName" required autoComplete="given-name" />
                <Input label="Last name" name="lastName" required autoComplete="family-name" />
                <Input label="Email" name="email" type="email" required autoComplete="email" />
                <Input label="Zip code" name="zipCode" autoComplete="postal-code" />
                <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                <Select label="County" name="county" defaultValue="">
                  <option value="" disabled>
                    Select county
                  </option>
                  {counties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Select label="Registered voter" name="registeredVoter" required defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unsure">Not sure</option>
                </Select>
                <Select
                  label="Prior campaign experience"
                  name="campaignExperience"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="none">None — first time</option>
                  <option value="some">Some — a few cycles</option>
                  <option value="lots">A lot — long-time organizer</option>
                </Select>
              </div>

              <div>
                <div className="text-highlight font-mono text-[10px] tracking-[0.25em] uppercase">
                  How would you like to help? <span className="text-primary">*</span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {volunteerActivities.map((a) => (
                    <Checkbox key={a} name={`activity_${a}`} label={a} />
                  ))}
                </div>
              </div>

              <Textarea
                label="Which of our issues matters most to you?"
                name="issues"
                rows={4}
                placeholder="Small business, accountability, public safety, education, energy — tell us where you want to help."
              />

              <Textarea
                label="Anything else we should know? (optional)"
                name="anythingElse"
                rows={3}
                placeholder="Skills, availability, ideas, or context — share what’s useful."
              />

              <div className="border-primary/15 space-y-3 border-t pt-6">
                <Checkbox
                  name="email_consent"
                  label="I’d like to receive email updates from Northwest Oregon PAC."
                />
                <Checkbox
                  name="sms_consent"
                  label="I’d like to receive occasional SMS updates. Reply STOP to unsubscribe."
                />
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-foreground/60 text-xs">
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
                <Button type="submit" size="lg">
                  Sign up
                </Button>
              </div>
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
