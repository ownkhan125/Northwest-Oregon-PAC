'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import { fadeUp, stagger, EASE } from '@/animations/variants'

const LegalPage = ({ eyebrow, number, title, lastUpdated, intro, sections }) => {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        number={number}
        title={title}
        description={`Last updated: ${lastUpdated}`}
      />

      <section className="relative isolate overflow-x-clip py-16 sm:py-20 lg:py-24">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
          {/* Sticky table of contents */}
          <aside className="hidden lg:col-span-3 lg:block">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-32"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Contents
              </div>
              <ol className="mt-4 space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.heading}>
                    <a
                      href={`#sec-${i}`}
                      className="text-foreground/75 hover:text-primary cursor-pointer transition-colors"
                    >
                      <span className="text-primary">{String(i + 1).padStart(2, '0')}.</span>{' '}
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </m.div>
          </aside>

          <div className="lg:col-span-9">
            {intro && (
              <m.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-foreground/85 max-w-2xl text-base leading-relaxed sm:text-lg"
              >
                {intro}
              </m.p>
            )}

            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
              className="mt-12 space-y-12"
            >
              {sections.map((s, i) => (
                <m.section
                  key={s.heading}
                  id={`sec-${i}`}
                  variants={fadeUp}
                  className="border-primary/15 scroll-mt-32 border-t pt-10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-primary font-mono text-xs">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-display text-foreground text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
                      {s.heading}
                    </h2>
                  </div>
                  <div className="text-foreground/80 mt-5 max-w-2xl space-y-4 leading-relaxed">
                    {s.body.map((p, j) => {
                      if (typeof p === 'string') return <p key={j}>{p}</p>
                      if (p && Array.isArray(p.list)) {
                        return (
                          <ul key={j} className="text-foreground/80 list-disc space-y-2 pl-6">
                            {p.list.map((li, k) => (
                              <li key={k}>{li}</li>
                            ))}
                          </ul>
                        )
                      }
                      return null
                    })}
                  </div>
                </m.section>
              ))}
            </m.div>

            <m.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="from-primary/60 via-primary/20 mt-16 h-px origin-left bg-gradient-to-r to-transparent"
            />
            <p className="text-foreground/55 mt-8 text-xs tracking-wide">
              Paid for by Northwest Oregon PAC #25045. Not authorized by any candidate committee.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

LegalPage.propTypes = {
  eyebrow: PropTypes.string,
  number: PropTypes.string,
  title: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
  intro: PropTypes.string,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      body: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({ list: PropTypes.arrayOf(PropTypes.string).isRequired }),
        ]),
      ).isRequired,
    }),
  ).isRequired,
}

export default LegalPage
