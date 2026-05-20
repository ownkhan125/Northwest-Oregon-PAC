'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import Marquee from '@/components/ui/marquee'

const words = [
  'Opportunity',
  'Accountability',
  'Fairness',
  'Service',
  'Climate Action',
  'Democracy',
  'Dignity',
  'Common Ground',
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
    <section id="vision" ref={ref} className="relative overflow-x-clip py-24 sm:py-32">
      <div aria-hidden className="grain" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20% 0px' }}
          transition={{ duration: 0.7 }}
          className="text-cyan/80 mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
        >
          <span className="text-mint">03</span>
          <span className="bg-cyan/40 h-px w-8" />
          <span>The Vision</span>
        </m.div>

        <m.div style={{ x }} className="will-change-transform">
          <SplitText
            as="h2"
            text="Government that works"
            by="word"
            staggerChildren={0.08}
            className={`${HEADING_CLASS} text-foreground`}
          />
        </m.div>
        <m.div style={{ x: x2 }} className="will-change-transform">
          <SplitText
            as="h2"
            text="for working people."
            by="word"
            staggerChildren={0.08}
            delay={0.15}
            className={HEADING_CLASS}
            charClassName="bg-gradient-to-r from-cyan via-mint to-cyan bg-clip-text text-transparent"
          />
        </m.div>

        <m.div style={{ y }} className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.7 }}
            className="text-foreground/75 text-base leading-relaxed sm:text-lg lg:col-span-7 lg:text-xl"
          >
            For too long, the people of this district have been told to lower their expectations. We
            don't believe that. We believe in a country that builds, invests, listens, and acts — a
            Congress that's worthy of the workers, dreamers, and families it serves.
          </m.p>

          <div className="lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="border-cyan/20 bg-navy/40 rounded-2xl border p-6 backdrop-blur"
            >
              <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                A pledge in writing
              </div>
              <p className="font-display text-foreground mt-3 text-lg leading-snug sm:text-xl md:text-2xl">
                "I won't take a dime of corporate PAC money. I won't take lobbyist gifts. And I'll
                publish every vote — with my reason — online, every week."
              </p>
            </m.div>
          </div>
        </m.div>
      </div>

      <div className="mt-20 sm:mt-24">
        <Marquee items={words} />
      </div>
    </section>
  )
}
