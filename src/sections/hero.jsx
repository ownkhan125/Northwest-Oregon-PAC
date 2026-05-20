'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { m, useScroll, useTransform } from 'motion/react'
import { gsap } from '@/animations/gsap'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Counter from '@/components/ui/counter'

export default function Hero() {
  const root = useRef(null)
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useGSAP(
    () => {
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.fromTo(
        '.hero-orb',
        { yPercent: 0 },
        {
          yPercent: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '.hero-glow',
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1.15,
          opacity: 1,
          duration: 6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        },
      )
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-screen w-full items-center overflow-x-clip pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Background orbs */}
      <div aria-hidden className="grid-overlay opacity-40" />
      <div
        aria-hidden
        className="hero-orb bg-cyan/20 pointer-events-none absolute top-1/3 -left-32 -z-10 h-[60vmin] w-[60vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="hero-orb bg-mint/15 pointer-events-none absolute top-10 -right-20 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="hero-glow bg-steel/30 pointer-events-none absolute top-2/3 left-1/2 -z-10 h-[40vmin] w-[40vmin] -translate-x-1/2 rounded-full blur-3xl"
      />

      <m.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12"
      >
        <div className="lg:col-span-7">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="border-cyan/30 bg-cyan/[0.06] text-cyan mb-7 inline-flex items-center gap-3 rounded-full border px-4 py-1.5 text-[11px] tracking-[0.28em] uppercase backdrop-blur"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="bg-mint absolute inset-0 rounded-full" />
              <span className="pulse-ring bg-mint absolute inset-0 rounded-full" />
            </span>
            Campaign 2026 · CA-14
          </m.div>

          <div className="font-display text-foreground text-[14vw] leading-[0.92] font-medium tracking-tight sm:text-7xl md:text-[88px] lg:text-[104px]">
            <SplitText as="span" text="Morgan" className="block" delay={0.2} inView={false} />
            <SplitText
              as="span"
              text="Hale."
              className="block"
              charClassName="bg-gradient-to-r from-cyan via-mint to-cyan bg-clip-text text-transparent"
              delay={0.55}
              inView={false}
            />
          </div>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-foreground/75 mt-8 max-w-xl text-base sm:text-lg"
          >
            A new generation of leadership for California's 14th. Building a fair economy, defending
            democracy, and putting working families first — not the loudest lobbyists.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/donate" size="lg">
              Chip in $14
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
            <Button href="/about" variant="secondary" size="lg">
              Meet Morgan
            </Button>
            <Link
              href="/events"
              className="group text-foreground/70 hover:text-mint inline-flex cursor-pointer items-center gap-3 text-sm transition-colors"
            >
              <span className="border-cyan/30 group-hover:border-mint grid h-9 w-9 place-items-center rounded-full border transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M8 5v14l11-7z" fill="currentColor" className="text-mint" />
                </svg>
              </span>
              Upcoming events
            </Link>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="border-line mt-14 grid max-w-md grid-cols-3 gap-6 border-t pt-6"
          >
            {[
              { value: 12, suffix: 'K+', label: 'Volunteers', decimals: 0 },
              { value: 3.2, suffix: 'M', label: 'Doors knocked', decimals: 1 },
              { value: 94, suffix: '%', label: 'Grassroots funded', decimals: 0 },
            ].map((stat, i) => (
              <div key={stat.label}>
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  delay={1.6 + i * 0.15}
                  duration={1.6}
                  className="font-display text-mint text-2xl font-medium sm:text-3xl"
                />
                <div className="text-foreground/55 mt-1 text-[11px] tracking-widest uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </m.div>
        </div>

        <div className="relative lg:col-span-5">
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            {/* Decorative spinning ring */}
            <div
              aria-hidden
              className="spin-slow border-cyan/30 absolute -inset-4 rounded-[2rem] border border-dashed"
            />
            {/* Image frame */}
            <div className="border-cyan/20 bg-navy relative h-full w-full overflow-hidden rounded-[2rem] border">
              <Image
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=900&q=80"
                alt="Morgan Hale, candidate for Congress"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 400px"
                className="object-cover"
              />
              <div className="from-navy-deep/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

              {/* Floating signature card */}
              <m.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="border-cyan/25 bg-navy-deep/80 absolute right-6 bottom-6 left-6 rounded-2xl border p-4 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-lg leading-none">Morgan Hale</div>
                    <div className="text-cyan mt-1 text-[11px] tracking-widest uppercase">
                      Democrat · CA-14
                    </div>
                  </div>
                  <svg viewBox="0 0 80 24" className="text-mint h-7 w-20">
                    <path
                      d="M2 18 C 10 4, 18 24, 26 12 C 34 0, 42 22, 50 10 C 58 -2, 66 20, 78 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </m.div>
            </div>

            {/* Floating accent tag */}
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="border-mint/40 bg-mint/10 text-mint absolute top-10 -left-6 hidden rotate-[-6deg] rounded-2xl border px-4 py-2 text-xs font-medium tracking-widest uppercase backdrop-blur sm:block"
            >
              For the People
            </m.div>
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
