'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { home, pac } from '@/data/pac'
import heroBackdrop from '@/assets/images/Bridge-7.png'

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
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16"
    >
      {/* Layer 1 — solid brand fallback behind everything. */}
      <div aria-hidden className="bg-background pointer-events-none absolute inset-0 -z-40" />

      {/* Layer 2 — full-bleed backdrop with subtle cinematic grade
          (contrast + saturation for depth; dark mode dims the frame). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <Image
          src={heroBackdrop}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] opacity-95 saturate-[1.08] contrast-[1.06] sm:object-[72%_center] lg:object-center dark:opacity-55 dark:brightness-90"
        />
      </div>

      {/* Layer 3 — cinematic vignette. Subtle radial darkening pulls the
          eye toward the copy and keeps the corners feeling composed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-25"
        style={{
          background:
            'radial-gradient(ellipse 95% 80% at 62% 45%, transparent 42%, rgba(0,0,0,0.32) 100%)',
        }}
      />

      {/* Layer 4a — mobile readability wash, top → bottom.
          Copy stacks over the top half, image reveals below. */}
      <div
        aria-hidden
        className="from-background via-background/88 to-background/40 pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b sm:hidden"
      />
      {/* Layer 4b — tablet readability wash, left → right.
          Copy extends closer to the right edge on tablet widths, so the
          wash stays strong further across before releasing the image. */}
      <div
        aria-hidden
        className="from-background via-background/88 to-background/25 pointer-events-none absolute inset-0 -z-20 hidden bg-gradient-to-r sm:block lg:hidden"
      />
      {/* Layer 4c — desktop readability wash, left → right.
          Full-opacity brand color behind the copy, fading to transparent
          so the skyline stays vivid on the right two-fifths. */}
      <div
        aria-hidden
        className="from-background via-background/78 to-transparent pointer-events-none absolute inset-0 -z-20 hidden bg-gradient-to-r lg:block"
      />

      {/* Layer 5 — bottom fade softens the transition into the next
          section so the skyline / snow rooftops don't clash with About. */}
      <div
        aria-hidden
        className="from-background via-background/65 to-transparent pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t sm:h-44"
      />

      <m.div
        style={{ y }}
        className="relative mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12"
      >
        <div className="max-w-4xl">
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

          <div className="font-display text-foreground text-[12vw] leading-[0.95] font-medium tracking-tight sm:text-6xl md:text-7xl lg:text-[92px]">
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
            <Button href={pac.donateUrl} size="lg" target="_blank" rel="noopener noreferrer">
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
            className="border-primary/15 mt-12 grid max-w-2xl grid-cols-3 gap-x-6 gap-y-6 border-t pt-6 sm:gap-x-10 sm:gap-y-8 md:gap-x-12"
          >
            {home.hero.values.map((v) => (
              <div key={v.label} className="min-w-0">
                <div className="font-display text-primary text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
                  {v.label}
                </div>
                <div className="text-foreground/70 mt-1 text-[11px] leading-snug sm:text-sm">
                  {v.description}
                </div>
              </div>
            ))}
          </m.div>
        </div>
      </m.div>
    </section>
  )
}
