'use client'

import { forwardRef, useRef } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { m, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-primary text-primary-fg hover:opacity-90 border border-primary shadow-[0_18px_40px_-18px_rgba(46,69,56,0.55)]',
  secondary:
    'bg-transparent text-primary border border-primary/40 hover:border-primary hover:bg-primary/10',
  ghost:
    'bg-surface/40 text-foreground/90 border border-border hover:border-primary/50 hover:bg-surface-alt/60',
}

const sizes = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
  xl: 'h-14 px-8 text-base',
}

const MotionLink = m.create(Link)

const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    className,
    children,
    icon = null,
    magnetic = true,
    href,
    type,
    onClick,
    target,
    rel,
    ...rest
  },
  ref,
) {
  const localRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 14, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 200, damping: 14, mass: 0.3 })
  const rx = useTransform(sy, [-12, 12], [4, -4])
  const ry = useTransform(sx, [-12, 12], [-4, 4])

  function onMove(e) {
    if (!magnetic) return
    const el = localRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = (e.clientX - cx) / (r.width / 2)
    const dy = (e.clientY - cy) / (r.height / 2)
    x.set(dx * 8)
    y.set(dy * 6)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  const sharedClass = cn(
    'btn-shine group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300',
    variants[variant],
    sizes[size],
    className,
  )

  const inner = (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {icon}
    </span>
  )

  const motionProps = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: {
      x: sx,
      y: sy,
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 800,
    },
    whileTap: { scale: 0.97 },
  }

  const refSetter = (node) => {
    localRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }

  if (href) {
    const isExternal =
      /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
    if (isExternal) {
      return (
        <m.a
          ref={refSetter}
          href={href}
          target={target}
          rel={rel}
          className={sharedClass}
          onClick={onClick}
          {...motionProps}
          {...rest}
        >
          {inner}
        </m.a>
      )
    }
    return (
      <MotionLink
        ref={refSetter}
        href={href}
        className={sharedClass}
        onClick={onClick}
        {...motionProps}
        {...rest}
      >
        {inner}
      </MotionLink>
    )
  }

  return (
    <m.button
      ref={refSetter}
      type={type || 'button'}
      className={sharedClass}
      onClick={onClick}
      {...motionProps}
      {...rest}
    >
      {inner}
    </m.button>
  )
})

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['md', 'lg', 'xl']),
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  magnetic: PropTypes.bool,
  href: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  target: PropTypes.string,
  rel: PropTypes.string,
}

export default Button
