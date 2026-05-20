'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import SplitText from '@/components/ui/split-text'
import { fadeUp, EASE_SOFT } from '@/animations/variants'

const PageHeader = ({ eyebrow, title, description, number, align = 'left' }) => {
  const center = align === 'center'
  return (
    <section className="relative isolate overflow-x-clip pt-32 pb-12 sm:pt-40 lg:pt-44">
      <div aria-hidden className="grid-overlay opacity-40" />
      <div
        aria-hidden
        className="bg-cyan/15 pointer-events-none absolute top-20 -left-32 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-mint/10 pointer-events-none absolute top-10 -right-20 -z-10 h-[35vmin] w-[35vmin] rounded-full blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {(eyebrow || number) && (
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: EASE_SOFT }}
            className={`text-cyan/80 mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase ${
              center ? 'justify-center' : ''
            }`}
          >
            {number && <span className="text-mint">{number}</span>}
            {number && eyebrow && <span className="bg-cyan/40 h-px w-8" />}
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

        {description && (
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
        )}

        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.9, ease: EASE_SOFT }}
          className="from-cyan/60 via-cyan/20 mt-12 h-px origin-left bg-gradient-to-r to-transparent"
        />
      </div>
    </section>
  )
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  number: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
}

export default PageHeader
