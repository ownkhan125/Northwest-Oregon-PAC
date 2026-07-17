'use client'

import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import CivicIcon from '@/components/ui/civic-icon'
import { cardReveal, stagger, fadeUp } from '@/animations/variants'
import { home } from '@/data/pac'
import markNorman from '@/assets/images/Mark Norman.png'
import brianSchimmel from '@/assets/images/Brian Schimmel.jpg'
import barbaraKahl from '@/assets/images/Barbara Kahl.png'
import ciattaThompson from '@/assets/images/Ciatta Thompson.jpg'
import randallFryer from '@/assets/images/Randall Fryer.jpg'

// Candidate portraits keyed by slug (see `home.endorsements.candidates` in
// src/data/pac.js). Add a new entry here when onboarding a new candidate.
const CANDIDATE_PORTRAITS = {
  'mark-norman': markNorman,
  'brian-schimmel': brianSchimmel,
  'barbara-kahl': barbaraKahl,
  'ciatta-thompson': ciattaThompson,
  'randall-fryer': randallFryer,
}

export default function Endorsements() {
  return (
    <SectionFrame id="candidates" eyebrow={home.endorsements.eyebrow} number="04">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text={home.endorsements.heading}
            className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <m.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-foreground/75 max-w-md lg:col-span-5"
        >
          {home.endorsements.intro}
        </m.p>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {home.endorsements.candidates.map((c, i) => {
          const portrait = CANDIDATE_PORTRAITS[c.slug]
          return (
          <m.div key={c.slug} variants={cardReveal}>
            <Card className="flex h-full flex-col overflow-hidden p-0" tilt={i % 2 === 0}>
              <div
                aria-hidden
                className="border-primary/15 bg-surface-alt/70 relative aspect-[4/3] w-full overflow-hidden border-b"
              >
                {portrait && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={portrait.src}
                    alt={c.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-foreground text-2xl leading-tight font-medium sm:text-3xl">
                  {c.name}
                </h3>
                <p className="text-foreground/75 mt-2 text-sm sm:text-base">{c.office}</p>
                <p className="text-foreground/70 mt-4 text-sm leading-relaxed">{c.bio}</p>

                <div className="border-primary/15 mt-6 flex items-center justify-between border-t pt-5">
                  {c.link ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:text-highlight inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
                    >
                      {c.cta}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-foreground/50 text-xs tracking-[0.25em] uppercase">
                      {c.cta}
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </m.div>
          )
        })}

        <m.div variants={fadeUp}>
          <Card
            className="from-surface-alt/70 to-surface relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br p-7"
            interactive={false}
            tilt={false}
          >
            <CivicIcon
              src="/icons/billboard.svg"
              className="text-primary/10 pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 select-none sm:h-48 sm:w-48"
            />
            <div className="relative">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                {home.endorsements.runForOffice.eyebrow}
              </div>
              <h3 className="font-display text-primary mt-4 text-2xl leading-tight font-medium sm:text-3xl">
                {home.endorsements.runForOffice.heading}
              </h3>
              <p className="text-foreground/75 mt-3 text-sm">
                {home.endorsements.runForOffice.description}
              </p>
            </div>
            <div className="relative mt-6">
              <Button href="/volunteer" variant="primary" size="md">
                {home.endorsements.runForOffice.cta}
              </Button>
            </div>
          </Card>
        </m.div>
      </m.div>
    </SectionFrame>
  )
}
