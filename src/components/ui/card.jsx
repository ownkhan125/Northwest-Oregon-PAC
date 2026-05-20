'use client'

import { useRef } from 'react'
import PropTypes from 'prop-types'
import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

const Card = ({
  className,
  children,
  hoverGlow = true,
  tilt = true,
  interactive = true,
  ...rest
}) => {
  const ref = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 140, damping: 18 })
  const sy = useSpring(y, { stiffness: 140, damping: 18 })
  const rx = useTransform(sy, [-50, 50], [4, -4])
  const ry = useTransform(sx, [-50, 50], [-4, 4])

  const glow = useMotionTemplate`radial-gradient(320px circle at ${mx}% ${my}%, rgba(93,248,216,0.22), rgba(111,209,215,0.08) 28%, transparent 60%)`
  const border = useMotionTemplate`radial-gradient(180px circle at ${mx}% ${my}%, rgba(93,248,216,0.55), transparent 70%)`

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * 100
    const py = ((e.clientY - r.top) / r.height) * 100
    mx.set(px)
    my.set(py)
    if (tilt) {
      x.set(e.clientX - r.left - r.width / 2)
      y.set(e.clientY - r.top - r.height / 2)
    }
  }

  function onLeave() {
    x.set(0)
    y.set(0)
    mx.set(50)
    my.set(50)
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      style={{
        rotateX: tilt ? rx : 0,
        rotateY: tilt ? ry : 0,
        transformPerspective: 1000,
      }}
      className={cn(
        'group border-card-border relative isolate overflow-hidden rounded-2xl border bg-[rgba(9,60,93,0.45)] backdrop-blur-md transition-[border-color] duration-500',
        interactive && 'hover:border-mint/40 cursor-pointer',
        className,
      )}
      {...rest}
    >
      {hoverGlow && (
        <>
          {/* Soft spotlight follows cursor */}
          <m.div
            aria-hidden
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          {/* Animated border glow */}
          <m.div
            aria-hidden
            style={{
              background: border,
              WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '1px',
            }}
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
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
