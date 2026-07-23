'use client'

import PropTypes from 'prop-types'
import SectionMarker from '@/components/ui/section-marker'
import { cn } from '@/lib/cn'

const SectionFrame = ({ id, eyebrow, number, className, bgImage, overlayClassName, children }) => (
  <section
    id={id}
    className={cn('relative isolate w-full overflow-hidden', className)}
  >
    {bgImage && (
      <>
        {/* Backdrop image with a subtle cinematic grade so it holds up
            behind the wash without looking flat. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat bg-scroll saturate-[1.08] contrast-[1.04] lg:bg-fixed"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
        {/* Uniform readability wash — flat, edge-to-edge, no gradient and
            no vignette. Same coverage left, center, and right so nothing
            reads as darker or lighter than anywhere else. Tuned separately
            for light and dark modes to preserve WCAG contrast without
            burying the image. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 -z-10 bg-background/62 dark:bg-background/58',
            overlayClassName,
          )}
        />
      </>
    )}
    <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <div className="relative">
        <SectionMarker number={number} eyebrow={eyebrow} />
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
