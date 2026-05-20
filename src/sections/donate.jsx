'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Counter from '@/components/ui/counter'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'

const amounts = [14, 27, 100, 250, 500, 1000]

export default function Donate() {
  const [picked, setPicked] = useState(27)
  const [custom, setCustom] = useState('')

  return (
    <section id="donate" className="relative overflow-x-clip py-24 sm:py-32">
      {/* Animated soft glow */}
      <m.div
        aria-hidden
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 25, 0],
          opacity: [0.6, 1, 0.7, 0.6],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-mint/15 pointer-events-none absolute -top-32 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full blur-3xl"
      />
      <m.div
        aria-hidden
        animate={{
          x: [0, -40, 25, 0],
          y: [0, 30, -15, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-cyan/15 pointer-events-none absolute right-0 bottom-0 h-[40vmin] w-[40vmin] translate-x-1/3 translate-y-1/3 rounded-full blur-3xl"
      />

      <div aria-hidden className="grid-overlay opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="via-mint mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent to-transparent"
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-20% 0px' }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <m.div
            variants={fadeUp}
            className="text-cyan font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            07 · Join the Movement
          </m.div>
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Chip in. Change Washington."
            className="font-display mt-5 text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
          />
          <m.p
            variants={fadeUp}
            className="text-foreground/75 mx-auto mt-6 max-w-xl text-base sm:text-lg"
          >
            94% of our funding comes from grassroots donors like you. No corporate PACs. No
            lobbyists. Just a campaign powered by the people.
          </m.p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          {/* Animated glow behind card */}
          <m.div
            aria-hidden
            animate={{
              opacity: [0.55, 0.9, 0.55],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="from-cyan/25 via-mint/20 to-steel/25 absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br blur-2xl"
          />

          {/* Conic border ring */}
          <div
            aria-hidden
            className="absolute -inset-px rounded-[26px] opacity-70 [background:conic-gradient(from_var(--a,0deg),rgba(111,209,215,0.6),rgba(93,248,216,0.1),rgba(59,117,151,0.4),rgba(93,248,216,0.6))]"
            style={{
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
              animation: 'spin-slow 14s linear infinite',
            }}
          />

          <div className="border-cyan/25 bg-navy-deep/85 relative rounded-3xl border p-6 backdrop-blur-xl sm:p-10">
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="grid grid-cols-3 gap-3 sm:grid-cols-6"
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
                        ? 'border-mint bg-mint/10 text-mint shadow-[0_18px_40px_-18px_rgba(93,248,216,0.55)]'
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

            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]"
            >
              <label className="border-cyan/20 bg-cyan/[0.04] focus-within:border-mint relative flex h-14 items-center rounded-2xl border px-5 transition-colors">
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
              <Button as="button" size="xl" className="w-full sm:w-auto">
                Donate {custom ? `$${custom}` : `$${picked}`}
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
            </m.div>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="border-line mt-8 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3"
            >
              {[
                { value: 94, suffix: '%', label: 'Grassroots funded' },
                { value: 32, prefix: '$', label: 'Average donation' },
                { value: 12400, suffix: '+', label: 'First-time donors' },
              ].map((stat, i) => (
                <m.div key={stat.label} variants={fadeUp} className="text-center sm:text-left">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={i * 0.12}
                    duration={1.8}
                    className="font-display text-mint text-2xl font-medium"
                  />
                  <div className="text-foreground/55 mt-1 text-[11px] tracking-widest uppercase">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
