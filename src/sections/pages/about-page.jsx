'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { cardReveal, fadeUp, stagger, EASE, lineBuild } from '@/animations/variants'

const story = [
  {
    title: 'California Native',
    body: 'Morgan grew up in the 14th — the daughter of a nurse and a union electrician. Public school graduate, first in her family to attend college.',
  },
  {
    title: 'Twelve Years a Civil Rights Attorney',
    body: "Twelve years at the Bay Area Workers' Defense Center — defending workers, immigrants, and small businesses against bad actors and broken systems.",
  },
  {
    title: 'City Council, 2018 – 2022',
    body: "Elected at 29. Passed the district's first affordable housing reform package, expanded paid family leave, and tripled climate resilience funding.",
  },
  {
    title: 'Why Congress',
    body: "Because Washington isn't broken by accident — it's broken by design. The 14th deserves a representative who shows up, listens, and votes their conscience.",
  },
]

const expertise = [
  {
    eyebrow: '2022 Public Service Award',
    title: 'Bay Area Civic League',
    body: "Recognized for leadership on the district's affordable housing reform package.",
  },
  {
    eyebrow: 'State Legislature Testimony',
    title: 'California State Senate',
    body: 'Invited testimony on tenant protections, climate jobs, and small-business permitting.',
  },
  {
    eyebrow: 'Professional Credentials',
    title: 'J.D. · Berkeley Law',
    body: 'B.A. Political Science, UC Davis. Member, California State Bar (since 2014).',
  },
]

const timeline = [
  ['2008', 'B.A. Political Science, UC Davis'],
  ['2014', 'J.D. Berkeley Law — top of class'],
  ['2014 – 2026', "Civil rights attorney, Bay Area Workers' Defense Center"],
  ['2018', 'Elected to City Council at 29'],
  ['2020', "Passed district's affordable housing reform package"],
  ['2022', 'Re-elected with 71% of the vote'],
  ['2026', 'Announced campaign for the 14th Congressional District'],
]

const values = [
  {
    title: 'Accountability',
    body: 'Every vote published, every reason explained. No corporate PAC money. No lobbyist gifts. Ever.',
  },
  {
    title: 'Evidence over ideology',
    body: 'We solve the problem in front of us with the best evidence available — not the prettiest talking points.',
  },
  {
    title: 'Community first',
    body: "Real listening, real follow-through. The 14th doesn't need another insider; it needs a neighbor.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Candidate"
        number="01"
        title="A leader who shows up, listens, and gets it done."
        description="Born in the 14th. Trained as a lawyer. Tested in office. Running for Congress to deliver results — not headlines."
      />

      {/* Lead bio */}
      <SectionFrame eyebrow="The Story" number="02" withGrid>
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
              className="bg-cyan absolute top-4 -left-3 h-px w-12 origin-left"
            />
            <div className="border-cyan/20 relative aspect-[4/5] w-full overflow-hidden rounded-3xl border">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                alt="Morgan Hale portrait"
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
          </m.div>

          <div className="lg:col-span-7">
            <SplitText
              as="h2"
              by="word"
              staggerChildren={0.05}
              text="A neighbor first. A leader second."
              className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl"
            />

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
              className="mt-10 space-y-7"
            >
              {story.map((s) => (
                <m.div key={s.title} variants={fadeUp} className="border-line border-l pl-6">
                  <h3 className="font-display text-foreground text-xl font-medium sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="text-foreground/70 mt-2">{s.body}</p>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </SectionFrame>

      {/* Expertise cards */}
      <SectionFrame eyebrow="Proven Expertise" number="03">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Recognized leadership. Proven results."
          className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {expertise.map((e) => (
            <m.div key={e.title} variants={cardReveal}>
              <Card className="h-full p-7" interactive={false} tilt={false}>
                <div className="text-cyan/80 font-mono text-[10px] tracking-[0.25em] uppercase">
                  {e.eyebrow}
                </div>
                <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium">
                  {e.title}
                </h3>
                <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{e.body}</p>
              </Card>
            </m.div>
          ))}
        </m.div>
      </SectionFrame>

      {/* Timeline */}
      <SectionFrame eyebrow="Career of Service" number="04" withGrid>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SplitText
              as="h2"
              by="word"
              staggerChildren={0.05}
              text="From the courtroom to the council chamber."
              className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl"
            />
            <p className="text-foreground/70 mt-6 max-w-md">
              Two decades of preparation for the moment. A track record built on listening,
              learning, and getting things done.
            </p>
          </div>

          <m.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="relative lg:col-span-7"
          >
            <m.span
              variants={lineBuild}
              className="bg-line absolute top-2 left-[5rem] h-full w-px origin-top sm:left-[6rem]"
            />
            {timeline.map(([year, label], i) => (
              <m.li
                key={year + i}
                variants={fadeUp}
                className="relative grid grid-cols-[5rem_1fr] items-baseline gap-6 pb-8 sm:grid-cols-[6rem_1fr]"
              >
                <span className="font-display text-mint text-2xl font-medium sm:text-3xl">
                  {year}
                </span>
                <span className="text-foreground/85 relative pl-6">
                  <span
                    aria-hidden
                    className="bg-mint absolute top-2 -left-1 grid h-2.5 w-2.5 place-items-center rounded-full"
                  />
                  {label}
                </span>
              </m.li>
            ))}
          </m.ol>
        </div>
      </SectionFrame>

      {/* Values */}
      <SectionFrame eyebrow="What Drives Morgan" number="05">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Three values. No compromises."
          className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
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
                <div className="text-cyan/80 font-mono text-[11px] tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium">
                  {v.title}
                </h3>
                <p className="text-foreground/70 mt-3 text-sm leading-relaxed">{v.body}</p>
              </Card>
            </m.div>
          ))}
        </m.div>
      </SectionFrame>

      {/* CTA */}
      <section className="relative overflow-x-clip pt-8 pb-24">
        <div
          aria-hidden
          className="bg-mint/15 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-cyan/25 bg-navy-deep/70 rounded-3xl border p-8 backdrop-blur-xl sm:p-12 lg:p-16"
          >
            <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <div className="text-cyan font-mono text-[11px] tracking-[0.3em] uppercase">
                  Join the campaign
                </div>
                <h2 className="font-display mt-4 text-3xl leading-[1.05] font-medium tracking-tight sm:text-4xl md:text-5xl">
                  Meet Morgan on the trail.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/events" size="lg">
                  See upcoming events
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
