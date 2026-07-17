'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE_SOFT } from '@/animations/variants'

const SectionFrame = ({ id, eyebrow, number, className, bgImage, overlayClassName, children }) => (
  <section
    id={id}
    className={cn('relative isolate w-full overflow-hidden', className)}
  >
    {bgImage && (
      <>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-scroll lg:bg-fixed"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-background/78',
            overlayClassName,
          )}
        />
      </>
    )}
    <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
      <div className="relative">
        <m.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.9, ease: EASE_SOFT }}
          className="from-primary/60 via-primary/20 absolute -top-6 right-0 left-0 h-px origin-left bg-gradient-to-r to-transparent"
        />
        <m.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_SOFT }}
          className="bg-primary/60 absolute -top-6 left-0 h-6 w-px origin-top"
        />

        {(eyebrow || number) && (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE_SOFT }}
            className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            {number && <span className="text-primary">{number}</span>}
            {number && eyebrow && <span className="bg-highlight/40 h-px w-8" />}
            {eyebrow && <span>{eyebrow}</span>}
          </m.div>
        )}

        {children}
      </div>
    </div>
  </section>
)

SectionFrame.propTypes = {
  id: PropTypes.string,
  eyebrow: PropTypes.string,
  number: PropTypes.string,
  className: PropTypes.string,
  bgImage: PropTypes.string,
  overlayClassName: PropTypes.string,
  children: PropTypes.node,
}

export default SectionFrame
