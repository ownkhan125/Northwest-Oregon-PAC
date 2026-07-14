'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { EASE, fadeUp, stagger } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { donationAmounts, pac } from '@/data/pac'

export default function DonatePage() {
  const [picked, setPicked] = useState(100)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState('once')
  const [submitted, setSubmitted] = useState(false)

  const value = custom ? `$${custom}` : `$${picked}`

  return (
    <>
      <PageHeader
        eyebrow="Chip in"
        number="04"
        title="Fund the fight for Northwest Oregon."
        description="Every contribution is pooled locally and invested in candidates, organizing, and outreach across our region."
      />

      <section className="relative isolate overflow-x-clip py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative lg:col-span-7"
            >
              <div className="border-primary/25 bg-surface relative rounded-3xl border p-6 shadow-[0_30px_80px_-40px_rgba(46,69,56,0.35)] sm:p-10">
                {submitted ? (
                  <div className="py-10 text-center">
                    <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                      Thank you
                    </div>
                    <h2 className="font-display text-primary mt-4 text-3xl font-medium sm:text-4xl">
                      {pac.successMessage}
                    </h2>
                  </div>
                ) : (
                  <>
                    <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                      Step 1 · Amount
                    </div>
                    <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                      Pick an amount
                    </h2>

                    <div className="border-primary/25 bg-surface-alt/40 mt-5 inline-flex rounded-full border p-1">
                      {[
                        { id: 'once', label: 'One-time' },
                        { id: 'monthly', label: 'Monthly' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setRecurring(opt.id)}
                          className={cn(
                            'relative cursor-pointer rounded-full px-5 py-2 text-xs tracking-widest uppercase transition-colors',
                            recurring === opt.id ? 'text-primary-fg' : 'text-foreground/70 hover:text-foreground',
                          )}
                        >
                          {recurring === opt.id && (
                            <m.span
                              layoutId="recurring-pill"
                              className="bg-primary absolute inset-0 -z-0 rounded-full"
                              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    <m.div
                      variants={stagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: '-10% 0px' }}
                      className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
                    >
                      {donationAmounts.map((a) => {
                        const active = picked === a && !custom
                        return (
                          <m.button
                            key={a}
                            variants={fadeUp}
                            whileHover={{ y: -3 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                            onClick={() => {
                              setPicked(a)
                              setCustom('')
                            }}
                            className={cn(
                              'group relative cursor-pointer overflow-hidden rounded-2xl border px-3 py-4 transition-colors duration-300',
                              active
                                ? 'border-primary bg-primary text-primary-fg'
                                : 'border-primary/25 text-foreground hover:border-primary/60 bg-surface-alt/40',
                            )}
                          >
                            <span className="font-display relative z-10 text-xl font-medium">
                              ${a}
                            </span>
                          </m.button>
                        )
                      })}
                    </m.div>

                    <label className="border-primary/25 bg-surface-alt/40 focus-within:border-primary mt-5 flex h-14 items-center rounded-2xl border px-5 transition-colors">
                      <span className="font-display text-foreground/70 text-2xl">$</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        placeholder="Other amount"
                        value={custom}
                        onChange={(e) => {
                          setCustom(e.target.value)
                          setPicked(null)
                        }}
                        className="text-foreground placeholder:text-foreground/40 ml-2 h-full w-full bg-transparent text-lg outline-none"
                      />
                    </label>

                    <div className="text-highlight mt-10 font-mono text-[10px] tracking-[0.3em] uppercase">
                      Step 2 · Your details
                    </div>
                    <h3 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                      Donor information
                    </h3>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setSubmitted(true)
                      }}
                      className="mt-6 space-y-5"
                    >
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input label="First name" name="firstName" required />
                        <Input label="Last name" name="lastName" required />
                        <Input label="Email" name="email" type="email" required />
                        <Input label="Phone (optional)" name="phone" type="tel" />
                        <Input
                          label="Employer name"
                          name="employer"
                          required
                          placeholder="Required by law"
                        />
                        <Input
                          label="Occupation"
                          name="occupation"
                          required
                          placeholder="Required by law"
                        />
                        <Input label="Address" name="address" required className="sm:col-span-2" />
                        <Input
                          label="Employer city"
                          name="employerCity"
                          required
                          placeholder="Required by law"
                        />
                        <Input
                          label="Employer state"
                          name="employerState"
                          required
                          placeholder="Required by law"
                        />
                        <Input label="City" name="city" required />
                        <Input label="State" name="state" required defaultValue="OR" />
                        <Input label="ZIP" name="zip" required />
                        <Select label="Country" name="country" required defaultValue="US">
                          <option value="US">United States</option>
                          <option value="OTHER">Other</option>
                        </Select>
                      </div>

                      <Checkbox
                        name="citizen"
                        required
                        label="I am a U.S. citizen or lawfully admitted permanent resident."
                      />
                      <Checkbox
                        name="own_funds"
                        required
                        label="This contribution is made from my own funds, not those of another."
                      />
                      <Checkbox
                        name="not_foreign"
                        required
                        label="I am not a foreign national."
                      />

                      <div className="border-primary/15 flex flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-foreground/60 text-xs">
                          {pac.disclaimers.paidFor}
                        </p>
                        <Button type="submit" size="xl">
                          Donate {value}
                          {recurring === 'monthly' ? ' / mo' : ''}
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
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </m.div>

            <div className="space-y-6 lg:col-span-5">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="border-primary/25 bg-surface rounded-3xl border p-6 sm:p-8"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  Where your dollars go
                </div>
                <ul className="mt-5 space-y-4">
                  {[
                    ['Candidate support', 'Backing competitive candidates across Northwest Oregon.'],
                    ['Fundraising', 'Building a sustainable, local funding base for the region.'],
                    ['Messaging', 'Getting a common-sense voice heard in the districts that need it.'],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-4">
                      <span className="border-primary/40 text-primary mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="5 12 10 17 19 7" />
                        </svg>
                      </span>
                      <div>
                        <div className="font-display text-foreground text-lg font-medium">{title}</div>
                        <div className="text-foreground/70 text-sm">{body}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="border-primary/25 bg-surface-alt/60 rounded-3xl border p-6 sm:p-8"
              >
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  Compliance
                </div>
                <ul className="text-foreground/85 mt-4 space-y-3 text-sm">
                  <li>{pac.disclaimers.foreignNationals}</li>
                  <li>{pac.disclaimers.donorRequirement}</li>
                  <li>{pac.disclaimers.notAuthorized}</li>
                </ul>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="border-primary/30 bg-primary text-primary-fg on-dark rounded-3xl border p-6 sm:p-8"
              >
                <div className="text-primary-fg/70 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Our promise
                </div>
                <p className="font-display text-primary-fg mt-3 text-lg leading-snug sm:text-xl">
                  “{pac.shortPromise}”
                </p>
                <div className="text-primary-fg/60 mt-3 text-xs tracking-widest uppercase">
                  {pac.values.join(' · ')}
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
