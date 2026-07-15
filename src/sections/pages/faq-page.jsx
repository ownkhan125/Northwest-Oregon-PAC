'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { faqs } from '@/data/faqs'

function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <m.div variants={fadeUp} className="border-primary/15 border-b last:border-b-0">
      <button
        onClick={onToggle}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left transition-colors',
          isOpen ? 'text-primary' : 'text-foreground hover:text-primary',
        )}
      >
        <span className="font-display text-lg font-medium sm:text-xl md:text-2xl">{q}</span>
        <span
          className={cn(
            'grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors',
            isOpen ? 'border-primary bg-primary/10' : 'border-primary/30',
          )}
        >
          <m.svg
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12h14" />
          </m.svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="text-foreground/80 pr-12 pb-6 sm:text-base">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

export default function FaqPage() {
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHeader
        eyebrow="Frequently asked"
        number="09"
        title="You ask. We answer."
        description="Common questions about Northwest Oregon PAC — who we are, how we work, and how you can plug in."
        accent="/icons/gavel.svg"
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="from-primary/60 via-primary/20 h-px origin-left bg-gradient-to-r to-transparent"
          />

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="mt-8"
          >
            {faqs.map((f, i) => (
              <FaqItem
                key={f.q}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-primary/25 bg-surface-alt/60 mt-16 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
                Still have a question?
              </div>
              <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
                Reach out — we read every message.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Contact us
              </Button>
              <Button href="/volunteer" variant="secondary" size="lg">
                Volunteer
              </Button>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
