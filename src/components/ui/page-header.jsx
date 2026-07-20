'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import CivicIcon from '@/components/ui/civic-icon'
import { fadeUp, EASE_SOFT } from '@/animations/variants'

const PageHeader = ({ eyebrow, title, description, number, align = 'left', accent, action }) => {
  const center = align === 'center'
  return (
    <section className="relative isolate overflow-x-clip pt-32 pb-12 sm:pt-40 lg:pt-44">
      {accent && (
        <m.div
          aria-hidden
          initial={{ opacity: 0, y: -12, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: EASE_SOFT }}
          className="text-primary/15 pointer-events-none absolute top-24 right-4 -z-10 hidden h-40 w-40 select-none sm:right-8 md:top-28 md:right-12 md:block md:h-52 md:w-52 lg:top-32 lg:right-20 lg:h-64 lg:w-64"
        >
          <CivicIcon src={accent} className="h-full w-full" />
        </m.div>
      )}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {(eyebrow || number) && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE_SOFT }}
            className={`text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase ${
              center ? 'justify-center' : ''
            }`}
          >
            {number && <span className="text-primary">{number}</span>}
            {number && eyebrow && <span className="bg-highlight/40 h-px w-8" />}
            {eyebrow && <span>{eyebrow}</span>}
          </m.div>
        )}

        <SplitText
          as="h1"
          by="word"
          staggerChildren={0.05}
          inView={false}
          text={title}
          className={`font-display text-foreground text-[clamp(2.25rem,7vw,6rem)] leading-[1.02] font-medium tracking-tight ${
            center ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'
          }`}
        />

        {description &&
          (Array.isArray(description) ? (
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.7, duration: 0.7, ease: EASE_SOFT }}
              className={`text-foreground/75 mt-6 max-w-2xl space-y-4 text-base sm:text-lg ${
                center ? 'mx-auto text-center' : ''
              }`}
            >
              {description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </m.div>
          ) : (
            <m.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.7, duration: 0.7, ease: EASE_SOFT }}
              className={`text-foreground/75 mt-6 max-w-2xl text-base sm:text-lg ${
                center ? 'mx-auto text-center' : ''
              }`}
            >
              {description}
            </m.p>
          ))}

        {action && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: EASE_SOFT }}
            className={`mt-8 flex flex-wrap gap-3 ${center ? 'justify-center' : ''}`}
          >
            {action}
          </m.div>
        )}

        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE_SOFT }}
          className="from-primary/60 via-primary/20 mt-12 h-px origin-left bg-gradient-to-r to-transparent"
        />
      </div>
    </section>
  )
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  number: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
  accent: PropTypes.string,
  action: PropTypes.node,
}

export default PageHeader
