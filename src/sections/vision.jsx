'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Marquee from '@/components/ui/marquee'
import CivicIcon from '@/components/ui/civic-icon'
import { mission, pac } from '@/data/pac'

const marqueeWords = [
  'Prosperity',
  'Accountability',
  'Public Safety',
  'Education',
  'Reliable Energy',
  'Small Business',
  'Common Sense',
  'Community',
]

const HEADING_CLASS =
  'block font-display font-medium leading-[0.95] tracking-tight text-[clamp(2.5rem,9vw,9rem)]'

export default function Vision() {
  const ref = useRef(null)
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], isWide ? ['0%', '-12%'] : ['0%', '0%'])
  const x2 = useTransform(scrollYProgress, [0, 1], isWide ? ['-4%', '8%'] : ['0%', '0%'])
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="vision" ref={ref} className="relative isolate overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="grain" />

      <m.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="text-primary/10 pointer-events-none absolute top-16 right-4 -z-10 hidden h-48 w-48 select-none sm:right-10 md:right-16 md:block md:h-64 md:w-64 lg:top-20 lg:right-24 lg:h-72 lg:w-72"
      >
        <CivicIcon src="/icons/target.svg" className="h-full w-full" />
      </m.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.7 }}
          className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
        >
          <span className="text-primary">03</span>
          <span className="bg-highlight/40 h-px w-8" />
          <span>Our Mission</span>
        </m.div>

        <m.div style={{ x }} className="will-change-transform">
          <SplitText
            as="h2"
            text="A region worth"
            by="word"
            staggerChildren={0.08}
            className={`${HEADING_CLASS} text-foreground`}
          />
        </m.div>
        <m.div style={{ x: x2 }} className="will-change-transform">
          <SplitText
            as="h2"
            text="fighting for."
            by="word"
            staggerChildren={0.08}
            delay={0.15}
            className={HEADING_CLASS}
            charClassName="text-primary"
          />
        </m.div>

        <m.div style={{ y }} className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7 }}
            className="text-foreground/80 text-base leading-relaxed sm:text-lg lg:col-span-7 lg:text-xl"
          >
            {mission}
          </m.p>

          <div className="lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="border-primary/25 bg-surface-alt/60 rounded-2xl border p-6"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                A promise to our region
              </div>
              <p className="font-display text-primary mt-3 text-lg leading-snug sm:text-xl md:text-2xl">
                “{pac.shortPromise}”
              </p>
              <div className="text-foreground/60 mt-4 flex items-center gap-2 text-[10px] tracking-widest uppercase">
                {pac.values.join(' · ')}
              </div>
            </m.div>
          </div>
        </m.div>
      </div>

      <div className="mt-20 sm:mt-24">
        <Marquee items={marqueeWords} />
      </div>
    </section>
  )
}
