'use client'

import { useState } from 'react'
import { AnimatePresence, m } from 'motion/react'
import Link from 'next/link'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE, EASE_SOFT } from '@/animations/variants'
import { cn } from '@/lib/cn'
import { faqs } from '@/data/faqs'

function renderAnswer(a) {
  if (Array.isArray(a)) {
    return a.map((part, i) => {
      if (typeof part === 'string') return part
      return (
        <Link
          key={i}
          href={part.href}
          className="text-primary hover:text-highlight underline underline-offset-4 transition-colors"
        >
          {part.link}
        </Link>
      )
    })
  }
  return a
}

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
            <p className="text-foreground/80 pr-12 pb-6 sm:text-base">{renderAnswer(a)}</p>
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
        number="09"
        title="Everything you need to know"
        description="We are here to provide clear answers. If you can’t find what you’re looking for, we’re always happy to hear from you."
        accent="/icons/gavel.svg"
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE_SOFT }}
            className="-mt-4 mb-4 flex flex-wrap gap-3"
          >
            <Button href="/ask" size="lg">
              Ask a Question
            </Button>
          </m.div>

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
              <h2 className="font-display text-foreground text-2xl font-medium tracking-tight sm:text-3xl md:text-4xl">
                Still Have Questions?
              </h2>
              <p className="text-foreground/75 mt-3 text-base sm:text-lg">
                We’re always happy to help.
              </p>
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
