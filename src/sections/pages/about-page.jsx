'use client'

import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cardReveal, fadeUp, stagger, EASE, lineBuild } from '@/animations/variants'
import { foundingStory, team, candidates, focusAreas, differentiator, pac } from '@/data/pac'

const storyBlocks = [
  {
    title: 'Why we exist',
    body: 'To support residents, candidates, and values that have been left behind in a region too easily conceded by both state and national party leadership.',
  },
  {
    title: 'Who we serve',
    body: 'Republicans, moderates, and common-sense voters across our Democratic-leaning communities — the people paying the taxes, running the businesses, and keeping our neighborhoods together.',
  },
  {
    title: 'How we work',
    body: 'We pool local resources to build lasting infrastructure — recruiting competitive candidates, funding organized outreach, and giving center-right voters a voice again.',
  },
  {
    title: 'What we believe',
    body: 'No community should be written off. Prosperity, accountability, and common sense still have a home in Northwest Oregon.',
  },
]

const values = [
  {
    title: 'Prosperity',
    body: 'Private enterprise, small business, and economic freedom — the proven engine of opportunity.',
  },
  {
    title: 'Accountability',
    body: 'Every taxpayer dollar tracked. Every program measured. Real transparency, real consequences.',
  },
  {
    title: 'Common sense',
    body: 'Solving the problem in front of us with the best evidence available — not ideology.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the PAC"
        number="01"
        title="A voice for Northwest Oregon."
        description={pac.tagline}
        accent="/icons/certificate.svg"
      />

      {/* Founding story */}
      <SectionFrame eyebrow="The Story" number="02">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            variants={fadeUp}
            className="relative lg:sticky lg:top-32 lg:col-span-5"
          >
            <m.div
              variants={lineBuild}
              className="bg-primary absolute top-4 -left-3 h-px w-12 origin-left"
            />
            <div className="border-primary/25 bg-surface-alt/60 relative w-full overflow-hidden rounded-3xl border p-8 sm:p-10">
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                What makes us different
              </div>
              <p className="font-display text-primary mt-4 text-xl leading-snug sm:text-2xl">
                “{differentiator}”
              </p>
              <div className="border-primary/15 mt-8 border-t pt-6">
                <div className="text-foreground/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                  Focus areas
                </div>
                <div className="text-foreground/85 mt-3 flex flex-wrap gap-2">
                  {focusAreas.map((f) => (
                    <span
                      key={f}
                      className="border-primary/25 rounded-full border px-3 py-1 text-xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </m.div>

          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              by="word"
              staggerChildren={0.05}
              text="A region left behind — until now."
              className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl"
            />

            <p className="text-foreground/85 mt-8 max-w-2xl text-base leading-relaxed sm:text-lg">
              {foundingStory.long}
            </p>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="mt-10 space-y-7"
            >
              {storyBlocks.map((s) => (
                <m.div key={s.title} variants={fadeUp} className="border-primary/20 border-l pl-6">
                  <h3 className="font-display text-foreground text-xl font-medium sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="text-foreground/75 mt-2">{s.body}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </SectionFrame>

      {/* Team */}
      <SectionFrame eyebrow="Our Team" number="03">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Local leadership. Real experience."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
        <p className="text-foreground/75 mt-6 max-w-2xl">
          Northwest Oregon PAC is led by seasoned volunteers already active in our
          communities — from county government to state party leadership.
        </p>
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {team.map((member) => (
            <m.div key={member.name} variants={cardReveal}>
              <Card className="h-full p-7" interactive={false} tilt={false}>
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  Leadership
                </div>
                <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium sm:text-3xl">
                  {member.name}
                </h3>
                <ul className="mt-4 space-y-2">
                  {member.roles.map((role) => (
                    <li
                      key={role}
                      className="text-foreground/80 flex items-start gap-2 text-sm leading-snug"
                    >
                      <span
                        aria-hidden
                        className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
              </Card>
            </m.div>
          ))}
        </m.div>
      </SectionFrame>

      {/* Candidates */}
      <SectionFrame id="candidates" eyebrow="Candidates" number="04">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              by="word"
              staggerChildren={0.05}
              text="Candidates we’re supporting in 2026."
              className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
            />
          </div>
          <p className="text-foreground/75 max-w-md lg:col-span-5">
            State house, state legislature, and Congressional District 1 — candidates from
            across Northwest Oregon who share our values and are ready to serve.
          </p>
        </div>

        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 divide-forest/15 border-primary/15 divide-y rounded-2xl border"
        >
          {candidates.map((c) => (
            <m.li
              key={c.slug}
              variants={fadeUp}
              className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[1fr_auto_auto] sm:gap-8 sm:p-7"
            >
              <div>
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  {c.year} · {c.state}
                </div>
                <div className="font-display text-foreground mt-2 text-2xl font-medium sm:text-3xl">
                  {c.name}
                </div>
              </div>
              <div className="text-foreground/80 text-sm sm:text-base">{c.office}</div>
              <div>
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                    className="border-primary/30 text-primary hover:border-primary hover:bg-surface-alt/60 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs tracking-widest uppercase transition-colors"
                  >
                    Visit campaign
                    <svg
                      width="12"
                      height="12"
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
                  <span className="text-foreground/50 text-xs tracking-widest uppercase">
                    Site coming soon
                  </span>
                )}
              </div>
            </m.li>
          ))}
        </m.ul>
      </SectionFrame>

      {/* Values */}
      <SectionFrame eyebrow="What we stand for" number="05">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Three values. No compromises."
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {values.map((v, i) => (
            <m.div key={v.title} variants={cardReveal}>
              <Card className="h-full p-7" interactive={false}>
                <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium">
                  {v.title}
                </h3>
                <p className="text-foreground/75 mt-3 text-sm leading-relaxed">{v.body}</p>
              </Card>
            </m.div>
          ))}
        </m.div>
      </SectionFrame>

      {/* CTA */}
      <section className="relative isolate overflow-x-clip pt-8 pb-24">
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-primary/25 bg-surface-alt rounded-3xl border p-8 sm:p-12 lg:p-16"
          >
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="text-highlight font-mono text-[11px] tracking-[0.3em] uppercase">
                  Join us
                </div>
                <h2 className="font-display text-foreground mt-4 text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl md:text-5xl">
                  Ready to help build the future of Northwest Oregon?
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/donate" size="lg">
                  Donate
                </Button>
                <Button href="/volunteer" variant="secondary" size="lg">
                  Volunteer
                </Button>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
