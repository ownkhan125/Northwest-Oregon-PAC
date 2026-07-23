'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import { m, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

/**
 * Editorial card. On hover:
 *   • background swaps to brand primary (forest)
 *   • text + icon surfaces flip to cream via [data-card-hover]
 *   • a slim gold accent line rises from the bottom edge
 * No gradient spotlight, no glass, no glow.
 */
const Card = ({
  className,
  children,
  hoverGlow: _legacyHoverGlow, // retained in prop list for backwards compat
  tilt = true,
  interactive = true,
  ...rest
}) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 18 })
  const sy = useSpring(y, { stiffness: 140, damping: 18 })
  const rx = useTransform(sy, [-50, 50], [3, -3])
  const ry = useTransform(sx, [-50, 50], [-3, 3])

  function onMove(e) {
    const el = ref.current
    if (!el || !tilt) return
    const r = el.getBoundingClientRect()
    x.set(e.clientX - r.left - r.width / 2)
    y.set(e.clientY - r.top - r.height / 2)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      ref={ref}
      data-card={interactive ? 'hover' : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{
        rotateX: tilt ? rx : 0,
        rotateY: tilt ? ry : 0,
        transformPerspective: 1000,
      }}
      className={cn(
        'group border-border bg-surface relative isolate overflow-hidden rounded-2xl border transition-[background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
        interactive &&
          'cursor-pointer hover:border-primary hover:bg-primary hover:text-primary-fg hover:shadow-[0_28px_60px_-30px_rgba(46,69,56,0.55)]',
        className,
      )}
      {...rest}
    >
      {interactive && (
        <span
          aria-hidden
          className="from-accent/0 via-accent to-accent/0 pointer-events-none absolute inset-x-6 bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r opacity-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-hover:opacity-100"
        />
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </m.div>
  )
}

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  hoverGlow: PropTypes.bool,
  tilt: PropTypes.bool,
  interactive: PropTypes.bool,
}

export default Card
