'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import Counter from '@/components/ui/counter'
import Input from '@/components/ui/input'
import Select from '@/components/ui/select'
import Checkbox from '@/components/ui/checkbox'
import { EASE, fadeUp, stagger } from '@/animations/variants'
import { cn } from '@/lib/cn'

const amounts = [14, 27, 50, 100, 250, 500, 1000, 2900]

const promises = [
  { value: 94, suffix: '%', label: 'Grassroots funded' },
  { value: 32, prefix: '$', label: 'Average donation' },
  { value: 12400, suffix: '+', label: 'First-time donors' },
]

export default function DonatePage() {
  const [picked, setPicked] = useState(27)
  const [custom, setCustom] = useState('')
  const [recurring, setRecurring] = useState('once')

  const value = custom ? `$${custom}` : `$${picked}`

  return (
    <>
      <PageHeader
        eyebrow="Join the Movement"
        number="04"
        title="Chip in. Change Washington."
        description="94% of our funding comes from grassroots donors like you. No corporate PACs. No lobbyist money. Just a campaign powered by the people."
      />

      <section className="relative overflow-x-clip py-12 sm:py-16 lg:py-20">
        <m.div
          aria-hidden
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 25, 0],
            opacity: [0.6, 1, 0.7, 0.6],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-mint/15 pointer-events-none absolute -top-20 left-1/2 -z-10 h-[50vmin] w-[50vmin] -translate-x-1/2 rounded-full blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: amount picker + form */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative lg:col-span-7"
            >
              <div
                aria-hidden
                className="absolute -inset-px rounded-[26px] opacity-70 [background:conic-gradient(from_var(--a,0deg),rgba(111,209,215,0.55),rgba(93,248,216,0.08),rgba(59,117,151,0.4),rgba(93,248,216,0.55))]"
                style={{
                  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  padding: '1px',
                  animation: 'spin-slow 14s linear infinite',
                }}
              />

              <div className="border-cyan/25 bg-navy-deep/85 relative rounded-3xl border p-6 backdrop-blur-xl sm:p-10">
                <div className="text-cyan/85 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Step 1 · Amount
                </div>
                <h2 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                  Pick an amount
                </h2>

                {/* Recurring toggle */}
                <div className="border-cyan/20 bg-cyan/[0.04] mt-5 inline-flex rounded-full border p-1">
                  {[
                    { id: 'once', label: 'One-time' },
                    { id: 'monthly', label: 'Monthly' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRecurring(opt.id)}
                      className={cn(
                        'relative cursor-pointer rounded-full px-5 py-2 text-xs tracking-widest uppercase transition-colors',
                        recurring === opt.id
                          ? 'text-navy-deep'
                          : 'text-foreground/70 hover:text-foreground',
                      )}
                    >
                      {recurring === opt.id && (
                        <m.span
                          layoutId="recurring-pill"
                          className="bg-mint absolute inset-0 -z-0 rounded-full"
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
                  {amounts.map((a) => {
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
                            ? 'border-mint bg-mint/10 text-mint'
                            : 'border-cyan/20 text-foreground hover:border-mint/50',
                        )}
                      >
                        <span className="font-display relative z-10 text-xl font-medium">${a}</span>
                        <span
                          aria-hidden
                          className={cn(
                            'from-mint/15 absolute inset-0 -z-0 origin-bottom scale-y-0 bg-gradient-to-t to-transparent transition-transform duration-500',
                            !active && 'group-hover:scale-y-100',
                          )}
                        />
                      </m.button>
                    )
                  })}
                </m.div>

                <label className="border-cyan/20 bg-cyan/[0.04] focus-within:border-mint mt-5 flex h-14 items-center rounded-2xl border px-5 transition-colors">
                  <span className="font-display text-foreground/60 text-2xl">$</span>
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

                <div className="text-cyan/85 mt-10 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Step 2 · Your details
                </div>
                <h3 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                  Donor information
                </h3>

                <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input label="First name" name="firstName" required />
                    <Input label="Last name" name="lastName" required />
                    <Input label="Email" name="email" type="email" required />
                    <Input label="Phone (optional)" name="phone" type="tel" />
                    <Input
                      label="Employer"
                      name="employer"
                      required
                      placeholder="Required by FEC"
                    />
                    <Input
                      label="Occupation"
                      name="occupation"
                      required
                      placeholder="Required by FEC"
                    />
                    <Input label="Address" name="address" required className="sm:col-span-2" />
                    <Input label="City" name="city" required />
                    <Input label="State" name="state" required />
                    <Input label="ZIP" name="zip" required />
                    <Select label="Country" name="country" required defaultValue="US">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
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
                    name="not_corp"
                    required
                    label="I am not a federal contractor or foreign national."
                  />

                  <div className="border-line flex flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-foreground/55 text-xs">
                      Donations are not tax-deductible. Paid for by Morgan Hale for Congress.
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
              </div>
            </m.div>

            {/* Right: Promises + impact */}
            <div className="space-y-6 lg:col-span-5">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="border-cyan/25 bg-navy-deep/60 rounded-3xl border p-6 backdrop-blur-xl sm:p-8"
              >
                <div className="text-cyan/85 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Where your dollars go
                </div>
                <ul className="mt-5 space-y-4">
                  {[
                    ['Field & voter contact', 'Door knockers, phone banks, text teams.'],
                    ['Communications', 'Honest ads, mail, organizing materials.'],
                    ['Operations', 'A small full-time team that answers your messages.'],
                  ].map(([title, body]) => (
                    <li key={title} className="flex gap-4">
                      <span className="border-mint/40 text-mint mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border">
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
                        <div className="font-display text-foreground text-lg font-medium">
                          {title}
                        </div>
                        <div className="text-foreground/65 text-sm">{body}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </m.div>

              <m.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                className="border-line bg-line grid grid-cols-1 gap-px overflow-hidden rounded-3xl border sm:grid-cols-3 lg:grid-cols-1"
              >
                {promises.map((stat, i) => (
                  <m.div key={stat.label} variants={fadeUp} className="bg-navy-deep/80 p-5 sm:p-6">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      delay={i * 0.12}
                      duration={1.8}
                      className="font-display text-mint text-2xl font-medium sm:text-3xl"
                    />
                    <div className="text-foreground/55 mt-1 text-[11px] tracking-widest uppercase">
                      {stat.label}
                    </div>
                  </m.div>
                ))}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                className="border-mint/30 bg-mint/[0.05] rounded-3xl border p-6 sm:p-8"
              >
                <div className="text-mint font-mono text-[10px] tracking-[0.3em] uppercase">
                  Our pledge
                </div>
                <p className="font-display text-foreground mt-3 text-lg leading-snug sm:text-xl">
                  "I won't take a dime of corporate PAC money. I won't take lobbyist gifts. Ever."
                </p>
                <div className="text-foreground/55 mt-3 text-xs tracking-widest uppercase">
                  — Morgan Hale
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
