'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Button from '@/components/ui/button'
import Counter from '@/components/ui/counter'
import { fadeUp, fadeRight, stagger, lineBuild } from '@/animations/variants'

const bullets = [
  {
    label: 'Civil rights attorney',
    detail: '12 years defending workers, families, and small businesses.',
  },
  {
    label: 'City council, 2018–2022',
    detail: "Passed the district's first affordable housing reform package.",
  },
  {
    label: 'Born and raised in CA-14',
    detail: 'Public school grad; first in her family to attend college.',
  },
]

export default function About() {
  return (
    <SectionFrame id="about" eyebrow="About Morgan" number="01" withGrid>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.06}
            text="A leader who shows up, listens, and gets the work done."
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="text-foreground/75 mt-8 max-w-xl space-y-5"
          >
            <m.p variants={fadeUp} className="text-base sm:text-lg">
              Morgan grew up in a working-class family in the 14th — the daughter of a nurse and a
              union electrician. She turned that start into a career fighting for the people too
              often left out of the conversation in Washington.
            </m.p>
            <m.p variants={fadeUp} className="text-base sm:text-lg">
              Now she's running for Congress with a simple promise: a government that actually
              delivers. Lower costs. Better schools. Safer communities. And a democracy that answers
              to you, not to corporate donors.
            </m.p>
          </m.div>

          <m.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="mt-10 space-y-4"
          >
            {bullets.map((b, i) => (
              <m.li
                key={b.label}
                variants={fadeUp}
                className="group border-line flex items-start gap-5 border-t py-4"
              >
                <span className="text-cyan mt-1 font-mono text-xs">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="font-display text-foreground text-xl font-medium sm:text-2xl">
                    {b.label}
                  </div>
                  <div className="text-foreground/65 mt-1 text-sm sm:text-base">{b.detail}</div>
                </div>
                <svg
                  className="text-cyan mt-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </m.li>
            ))}
          </m.ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/about" variant="primary" size="lg">
              Read the platform
            </Button>
            <Button href="/events" variant="ghost" size="lg">
              Meet Morgan in person
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
          <div className="relative">
            <m.div
              variants={lineBuild}
              className="bg-cyan absolute top-4 -left-3 h-px w-12 origin-left"
            />
            <div className="border-cyan/20 relative aspect-[4/5] w-full overflow-hidden rounded-3xl border">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                alt="Morgan Hale at a town hall meeting"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
              <div className="from-navy-deep via-navy-deep/10 absolute inset-0 bg-gradient-to-t to-transparent" />
            </div>

            <div className="border-cyan/20 bg-navy/80 absolute -bottom-6 -left-6 hidden w-[280px] rounded-2xl border p-5 backdrop-blur sm:block">
              <div className="font-display text-cyan text-sm">
                "Politics shouldn't be a game for insiders."
              </div>
              <div className="text-foreground/55 mt-3 text-[11px] tracking-widest uppercase">
                — Morgan, Town Hall · Oakland
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 lg:mt-12">
            <div>
              <Counter
                value={2018}
                useGrouping={false}
                duration={2}
                className="font-display text-mint text-3xl font-medium"
              />
              <div className="text-foreground/55 mt-1 text-xs tracking-widest uppercase">
                Elected City Council
              </div>
            </div>
            <div>
              <Counter
                value={0}
                prefix="$"
                className="font-display text-mint text-3xl font-medium"
              />
              <div className="text-foreground/55 mt-1 text-xs tracking-widest uppercase">
                Corporate PAC money
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </SectionFrame>
  )
}
