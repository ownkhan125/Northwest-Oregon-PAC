'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { donationAmounts, pac } from '@/data/pac'

export default function Donate() {
  const [picked, setPicked] = useState(100)
  const [custom, setCustom] = useState('')

  return (
    <section id="donate" className="bg-surface-alt/30 relative overflow-x-clip py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="via-primary mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent to-transparent"
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
            className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            07 · Chip in
          </m.div>
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Fund the fight for our region."
            className="font-display text-foreground mt-5 text-5xl leading-[1.05] font-medium tracking-tight sm:text-6xl md:text-7xl"
          />
          <m.p variants={fadeUp} className="text-foreground/80 mx-auto mt-6 max-w-xl text-base sm:text-lg">
            Every contribution is pooled locally and invested in candidates, organizing, and
            outreach across Northwest Oregon. Contributions from foreign nationals are prohibited.
          </m.p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          <div className="border-primary/25 bg-surface relative rounded-3xl border p-6 shadow-[0_30px_80px_-40px_rgba(46,69,56,0.35)] sm:p-10">
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4"
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
                        ? 'border-primary bg-primary text-primary-fg shadow-[0_18px_40px_-18px_rgba(46,69,56,0.55)]'
                        : 'border-primary/25 text-foreground hover:border-primary/60 bg-surface-alt/40',
                    )}
                  >
                    <span className="font-display relative z-10 text-xl font-medium">${a}</span>
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
              <label className="border-primary/25 bg-surface-alt/40 focus-within:border-primary relative flex h-14 items-center rounded-2xl border px-5 transition-colors">
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
              <Button href="/donate" size="xl" className="w-full sm:w-auto">
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

            <div className="border-primary/15 mt-8 border-t pt-6">
              <p className="text-foreground/65 text-center text-xs">
                {pac.disclaimers.donorRequirement} {pac.disclaimers.foreignNationals}
              </p>
              <p className="text-foreground/50 mt-3 text-center text-[10px] tracking-widest uppercase">
                {pac.disclaimers.paidFor}
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
