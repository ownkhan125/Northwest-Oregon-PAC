'use client'

import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { m } from 'motion/react'
import { cn } from '@/lib/cn'
import { EASE } from '@/animations/variants'

const SplitText = ({
  text,
  as: Tag = 'h1',
  className,
  charClassName,
  delay = 0,
  staggerChildren = 0.035,
  duration = 0.8,
  by = 'char',
  once = true,
  inView = true,
}) => {
  const MotionTag = m[Tag] ?? m.h1

  // For per-character animation we still group characters by their parent
  // word so line breaks can only fall between words — never inside "voice".
  // Each entry is either a whitespace string or an array of chars belonging
  // to the same word.
  const units = useMemo(() => {
    const tokens = text.split(/(\s+)/).filter((s) => s.length > 0)
    if (by === 'word') return tokens
    return tokens.map((t) => (/^\s+$/.test(t) ? t : t.split('')))
  }, [text, by])

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { y: '110%', opacity: 0, rotate: 4 },
    show: {
      y: '0%',
      opacity: 1,
      rotate: 0,
      transition: { duration, ease: EASE },
    },
  }

  const animateProps = inView
    ? {
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once, margin: '-15% 0px' },
      }
    : { initial: 'hidden', animate: 'show' }

  return (
    <MotionTag
      className={cn('text-balance', className)}
      variants={container}
      {...animateProps}
      aria-label={text}
    >
      {units.map((u, i) => {
        if (typeof u === 'string' && /^\s+$/.test(u)) {
          // Render a normal, collapsible space so wrapped lines don't inherit
          // a leading indent (white-space: pre would preserve the space and
          // push the first word of each wrapped line to the right).
          return <span key={`s-${i}`} aria-hidden>{' '}</span>
        }
        // Whole-word span — nowrap keeps characters together on one line.
        if (Array.isArray(u)) {
          return (
            <span
              key={`w-${i}`}
              aria-hidden
              className="inline-block"
              style={{ whiteSpace: 'nowrap' }}
            >
              {u.map((ch, j) => (
                <span
                  key={`u-${i}-${j}`}
                  aria-hidden
                  className="inline-block overflow-hidden align-bottom"
                  style={{
                    lineHeight: 1.15,
                    paddingBottom: '0.18em',
                    marginBottom: '-0.18em',
                  }}
                >
                  <m.span
                    variants={child}
                    className={cn('split-char inline-block', charClassName)}
                  >
                    {ch}
                  </m.span>
                </span>
              ))}
            </span>
          )
        }
        // by="word" — whole word as a single animated unit.
        return (
          <span
            key={`u-${i}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{
              lineHeight: 1.15,
              paddingBottom: '0.18em',
              marginBottom: '-0.18em',
            }}
          >
            <m.span variants={child} className={cn('split-char inline-block', charClassName)}>
              {u}
            </m.span>
          </span>
        )
      })}
    </MotionTag>
  )
}

SplitText.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  charClassName: PropTypes.string,
  delay: PropTypes.number,
  staggerChildren: PropTypes.number,
  duration: PropTypes.number,
  by: PropTypes.oneOf(['char', 'word']),
  once: PropTypes.bool,
  inView: PropTypes.bool,
}

export default SplitText
