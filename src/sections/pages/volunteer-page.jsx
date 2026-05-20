'use client'

import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Counter from '@/components/ui/counter'
import Input from '@/components/ui/input'
import Textarea from '@/components/ui/textarea'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { fadeUp, stagger, EASE } from '@/animations/variants'

const stats = [
  { value: 247, label: 'Volunteers' },
  { value: 12000, suffix: '+', label: 'Doors knocked' },
  { value: 38, label: 'Events held' },
]

const counties = ['Alameda', 'Contra Costa', 'Marin', 'San Francisco', 'San Mateo', 'Santa Clara']

const regions = ['East Bay', 'North Bay', 'Peninsula', 'South Bay', 'Other']

const activities = [
  'Knock doors',
  'Phone bank',
  'Text bank',
  'Host a house party',
  'Drop literature',
  'Tabling at events',
  'Data entry',
  'Graphic design / video',
]

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the Team"
        number="02"
        title="Your energy fuels this movement."
        description="This campaign runs on people, not PAC money. Whether you have five hours or fifty, your time makes a measurable difference in CA-14."
      />

      {/* Stats strip */}
      <section className="relative overflow-x-clip py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="border-line bg-line grid grid-cols-3 gap-px overflow-hidden rounded-2xl border"
          >
            {stats.map((stat, i) => (
              <m.div
                key={stat.label}
                variants={fadeUp}
                className="bg-navy-deep/80 p-6 text-center sm:p-8"
              >
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={i * 0.12}
                  duration={2}
                  className="font-display text-mint text-3xl font-medium sm:text-4xl md:text-5xl"
                />
                <div className="text-foreground/55 mt-2 text-[11px] tracking-widest uppercase sm:text-xs">
                  {stat.label}
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
              "I knocked my first door at 68. If I can do it, anyone can."
            </p>
            <footer className="text-cyan mt-4 font-mono text-[11px] tracking-widest uppercase">
              — Mary T., Alameda County Volunteer
            </footer>
          </m.blockquote>
        </div>
      </section>

      {/* Form */}
      <section className="relative overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="bg-cyan/12 pointer-events-none absolute top-40 -left-32 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        />
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="via-mint mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent to-transparent"
          />
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="text-cyan font-mono text-[11px] tracking-[0.3em] uppercase">
              Sign up
            </div>
            <h2 className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
              Join the team
            </h2>
            <p className="text-foreground/70 mx-auto mt-4 max-w-xl">
              Tell us a little about yourself. We'll match you with the work that fits your time,
              interests, and neighborhood.
            </p>
          </m.div>

          <m.form
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="border-cyan/25 bg-navy-deep/70 mt-12 space-y-8 rounded-3xl border p-6 backdrop-blur-xl sm:p-10"
          >
            {/* Personal */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Input label="First name" name="firstName" required autoComplete="given-name" />
              <Input label="Last name" name="lastName" required autoComplete="family-name" />
              <Input label="Email" name="email" type="email" required autoComplete="email" />
              <Input label="Zip code" name="zipCode" autoComplete="postal-code" />
              <Input label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
              <Select label="County" name="county">
                <option value="">Select county</option>
                {counties.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Select label="Region" name="region" required defaultValue="">
                <option value="" disabled>
                  Select region
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Select>
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
                <option value="none">None — first campaign</option>
                <option value="some">Some — a few cycles</option>
                <option value="lots">A lot — career organizer</option>
              </Select>
              <Select label="Weekly availability" name="availability" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option value="1-3">1 – 3 hours</option>
                <option value="4-8">4 – 8 hours</option>
                <option value="9-20">9 – 20 hours</option>
                <option value="20+">20+ hours</option>
              </Select>
            </div>

            {/* Activities */}
            <div>
              <div className="text-cyan/85 font-mono text-[10px] tracking-[0.25em] uppercase">
                How would you like to help? <span className="text-mint">*</span>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activities.map((a) => (
                  <Checkbox key={a} name={`activity_${a}`} label={a} />
                ))}
              </div>
            </div>

            {/* Issues */}
            <Textarea
              label="Issues that matter most to you"
              name="issues"
              required
              rows={4}
              placeholder="Housing, healthcare, climate, schools — what's keeping you up at night?"
            />

            <Textarea
              label="Anything else we should know? (optional)"
              name="anythingElse"
              rows={3}
              placeholder="Skills, languages, special access, ideas — share what's useful."
            />

            {/* Consent */}
            <div className="border-line space-y-3 border-t pt-6">
              <Checkbox
                name="email_consent"
                label="I'd like to receive email updates from Morgan Hale for Congress."
              />
              <Checkbox
                name="sms_consent"
                label="I'd like to receive occasional SMS updates. Reply STOP to unsubscribe."
              />
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-foreground/55 text-xs">
                By signing up, you agree to our{' '}
                <a href="/privacy-policy" className="text-cyan hover:text-mint">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms-of-service" className="text-cyan hover:text-mint">
                  Terms of Service
                </a>
                .
              </p>
              <Button type="submit" size="lg">
                Sign up to volunteer
              </Button>
            </div>
          </m.form>
        </div>
      </section>

      {/* Alt CTA: donate */}
      <section className="relative overflow-x-clip py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-cyan/25 bg-navy-deep/70 grid grid-cols-1 items-center gap-6 rounded-3xl border p-8 backdrop-blur-xl sm:p-12 lg:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="text-cyan font-mono text-[11px] tracking-[0.3em] uppercase">
                Not ready to volunteer?
              </div>
              <h2 className="font-display mt-4 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                Donate instead.
              </h2>
              <p className="text-foreground/70 mt-3 max-w-xl">
                Every dollar helps us reach another voter, knock another door, and run another ad
                telling the truth.
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
