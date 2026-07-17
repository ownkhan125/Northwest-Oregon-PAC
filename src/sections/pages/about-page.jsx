'use client'

import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cardReveal, fadeUp, stagger, EASE, lineBuild } from '@/animations/variants'
import { focusAreas, differentiator, aboutPage } from '@/data/pac'

export default function AboutPage() {
  const { hero, story, teamSection, candidatesSection, values, cta } = aboutPage

  return (
    <>
      <PageHeader
        eyebrow={hero.eyebrow}
        number="01"
        title={hero.heading}
        description={hero.paragraphs}
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
              text={story.heading}
              className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl"
            />

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="mt-8 max-w-2xl space-y-5"
            >
              {story.paragraphs.map((p, i) => (
                <m.p
                  key={i}
                  variants={fadeUp}
                  className="text-foreground/85 text-base leading-relaxed sm:text-lg"
                >
                  {p}
                </m.p>
              ))}
            </m.div>

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="mt-10 space-y-7"
            >
              {story.blocks.map((s) => (
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
      <SectionFrame eyebrow={teamSection.eyebrow} number="03">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text={teamSection.heading}
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
        <div className="text-foreground/75 mt-6 max-w-2xl space-y-4">
          {teamSection.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {teamSection.members.map((member) => (
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
                {member.bio && (
                  <p className="text-foreground/70 border-primary/15 mt-5 border-t pt-4 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </Card>
            </m.div>
          ))}
        </m.div>
      </SectionFrame>

      {/* Candidates */}
      <SectionFrame id="candidates" eyebrow={candidatesSection.eyebrow} number="04">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              by="word"
              staggerChildren={0.05}
              text={candidatesSection.heading}
              className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
            />
          </div>
          <div className="text-foreground/75 max-w-md space-y-3 lg:col-span-5">
            {candidatesSection.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <m.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 divide-forest/15 border-primary/15 divide-y rounded-2xl border"
        >
          {candidatesSection.list.map((c) => (
            <m.li
              key={c.slug}
              variants={fadeUp}
              className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[1fr_auto_auto] sm:gap-8 sm:p-7"
            >
              <div>
                <div className="font-display text-foreground text-2xl font-medium sm:text-3xl">
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
                    {candidatesSection.cta}
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
                    {candidatesSection.cta}
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
          text={values.heading}
          className="font-display text-foreground text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {values.list.map((v, i) => (
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
                  {cta.heading}
                </h2>
                <p className="text-foreground/75 mt-5 text-base sm:text-lg">{cta.body}</p>
              </div>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <div className="flex flex-wrap gap-3">
                  <Button href={cta.primary.href} size="lg">
                    {cta.primary.label}
                  </Button>
                  <Button href={cta.secondary.href} variant="secondary" size="lg">
                    {cta.secondary.label}
                  </Button>
                </div>
                <a
                  href={cta.textLink.href}
                  className="text-primary hover:text-highlight inline-flex items-center gap-2 text-sm font-medium tracking-wide uppercase transition-colors"
                >
                  {cta.textLink.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
