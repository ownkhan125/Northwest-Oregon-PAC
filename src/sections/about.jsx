'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import { fadeUp, fadeRight, stagger } from '@/animations/variants'
import { home, differentiator } from '@/data/pac'
import whoWeAreImage from '@/assets/images/Who we are.jpg'

export default function About() {
  return (
    <SectionFrame id="about" eyebrow="Who we are" number="01">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.06}
            text={home.about.heading}
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="text-foreground/80 mt-8 max-w-2xl space-y-5"
          >
            {home.about.paragraphs.map((p, i) => (
              <m.p key={i} variants={fadeUp} className="text-base sm:text-lg">
                {p}
              </m.p>
            ))}
          </m.div>

          <m.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="mt-10 space-y-4"
          >
            {home.about.highlights.map((h, i) => (
              <m.li
                key={h.label}
                variants={fadeUp}
                className="group border-primary/15 flex items-start gap-5 border-t py-4"
              >
                <span className="text-highlight mt-1 font-mono text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="font-display text-foreground text-xl font-medium sm:text-2xl">
                    {h.label}
                  </div>
                  <div className="text-foreground/70 mt-1 text-sm sm:text-base">{h.detail}</div>
                </div>
              </m.li>
            ))}
          </m.ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/about" variant="primary" size="lg">
              {home.about.ctas.primary}
            </Button>
          </div>
        </div>

        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          variants={fadeRight}
          className="lg:col-span-5"
        >
          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="border-primary/20 relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-3xl border"
          >
            <Image
              src={whoWeAreImage}
              alt="Northwest Oregon PAC leaders in conversation at a community meeting"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
            <div
              aria-hidden
              className="from-primary/20 absolute inset-0 bg-gradient-to-tr via-transparent to-transparent"
            />
          </m.div>

          <div className="relative">
            <div className="border-primary/20 bg-surface-alt/60 relative w-full overflow-hidden rounded-3xl border p-8 sm:p-10">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                What makes us different
              </div>
              <p className="font-display text-primary mt-4 text-xl leading-snug sm:text-2xl">
                “{differentiator}”
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </SectionFrame>
  )
}
