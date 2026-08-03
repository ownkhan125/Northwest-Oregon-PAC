'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE_SOFT } from '@/animations/variants'

/**
 * Editorial section marker used everywhere a section label pairs
 * a number + eyebrow ("01 — WHO WE ARE").
 */
const SectionMarker = ({ number, eyebrow, className }) => {
  if (!number && !eyebrow) return null

  return (
    <div className={cn('relative', className)}>
      <m.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ delay: 0.3, duration: 0.7, ease: EASE_SOFT }}
        className="text-highlight mb-6 flex items-baseline gap-4"
      >
        {number && (
          <span className="text-primary font-display text-3xl leading-none font-medium tracking-tight sm:text-4xl">
            {number}
          </span>
        )}
        {number && eyebrow && (
          <span
            aria-hidden
            className="from-primary/50 via-primary/25 relative bottom-[6px] block h-px w-10 bg-gradient-to-r to-transparent sm:w-14"
          />
        )}
        {eyebrow && (
          <span className="text-highlight font-mono text-[10px] leading-none tracking-[0.34em] uppercase sm:text-[11px]">
            {eyebrow}
          </span>
        )}
      </m.div>
    </div>
  )
}

SectionMarker.propTypes = {
  number: PropTypes.string,
  eyebrow: PropTypes.string,
  className: PropTypes.string,
}

export default SectionMarker
