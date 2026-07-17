'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { pac, home } from '@/data/pac'

export default function Hero() {
  const root = useRef(null)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-screen w-full items-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div
        aria-hidden
        className="bg-highlight/15 pointer-events-none absolute top-1/3 -left-32 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
      />

      <m.div
        style={{ y }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12"
      >
        <div className="lg:col-span-8">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="border-primary/25 bg-surface text-primary mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="bg-primary absolute inset-0 rounded-full" />
              <span className="pulse-ring bg-primary absolute inset-0 rounded-full" />
            </span>
            {home.hero.eyebrow}
          </m.div>

          <div className="font-display text-foreground text-[12vw] leading-[0.95] font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[86px]">
            <SplitText
              as="span"
              text={home.hero.heading}
              className="block"
              charClassName=""
              delay={0.2}
              inView={false}
            />
          </div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="text-foreground/80 mt-8 max-w-2xl space-y-4 text-base sm:text-lg md:text-xl"
          >
            {home.hero.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/donate" size="lg">
              {home.hero.ctas.primary}
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
            <Button href="/volunteer" variant="secondary" size="lg">
              {home.hero.ctas.secondary}
            </Button>
            <Link
              href="/about"
              className="group text-foreground/70 hover:text-primary inline-flex cursor-pointer items-center gap-3 text-sm transition-colors"
            >
              <span className="border-primary/30 group-hover:border-primary grid h-9 w-9 place-items-center rounded-full border transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M13 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  />
                </svg>
              </span>
              {home.hero.ctas.textLink}
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="border-primary/15 mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t pt-6"
          >
            {home.hero.values.map((v) => (
              <div key={v.label}>
                <div className="font-display text-primary text-2xl font-medium tracking-tight sm:text-3xl">
                  {v.label}
                </div>
                <div className="text-foreground/70 mt-1 text-xs sm:text-sm">
                  {v.description}
                </div>
              </div>
            ))}
          </m.div>
        </div>

        <div className="relative lg:col-span-4">
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            <div
              aria-hidden
              className="spin-slow border-primary/25 absolute -inset-4 rounded-[2rem] border border-dashed"
            />
            <div className="border-primary/20 bg-surface-alt relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border p-10 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80&auto=format&fit=crop"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply"
                loading="eager"
              />
              <div
                aria-hidden
                className="from-surface-alt via-surface-alt/85 to-surface-alt/40 absolute inset-0 bg-gradient-to-b"
              />
              <div className="relative text-muted font-mono text-[10px] tracking-[0.35em] uppercase">
                Est. 2025
              </div>
              <div className="relative font-display text-primary mt-6 text-4xl leading-tight font-medium sm:text-5xl">
                Northwest
                <br />
                Oregon
                <br />
                <span className="text-highlight">PAC</span>
              </div>
              <div className="relative bg-primary/40 mt-6 h-px w-16" />
              <p className="relative text-foreground/75 mt-6 max-w-[240px] text-sm">
                Prosperity · Accountability · Opportunity
              </p>
              <div className="relative border-primary/25 bg-surface/70 mt-8 rounded-full border px-4 py-1.5 backdrop-blur-sm">
                <span className="text-primary font-mono text-[10px] tracking-[0.3em] uppercase">
                  Filing #{pac.filingNumber}
                </span>
              </div>
            </div>

            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="border-primary/30 bg-surface text-primary absolute top-10 -left-6 hidden rotate-[-6deg] rounded-2xl border px-4 py-2 text-xs font-medium tracking-widest uppercase shadow-md sm:block"
            >
              For our region
            </m.div>
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
