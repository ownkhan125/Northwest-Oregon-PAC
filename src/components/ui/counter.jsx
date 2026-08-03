'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { EASE } from '@/animations/variants'

const defaultFormat = (value, { prefix, suffix, decimals, useGrouping }) =>
  `${prefix}${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping,
  })}${suffix}`

const Counter = ({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  useGrouping = true,
  duration = 1.8,
  delay = 0,
  format,
  className,
  ariaLabel,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced || value === 0) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, delay, reduced])

  const text = format
    ? format(display)
    : defaultFormat(display, { prefix, suffix, decimals, useGrouping })

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? text}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {text}
    </span>
  )
}

export default Counter
