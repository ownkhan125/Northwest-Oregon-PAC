'use client'

import PropTypes from 'prop-types'
import { m } from 'motion/react'
import { fadeUp } from '@/animations/variants'
import { cn } from '@/lib/cn'

const AnimatedHeading = ({ as = 'h2', className, children, delay = 0.2 }) => {
  const Tag = m[as] ?? m.h2
  return (
    <Tag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('text-balance', className)}
    >
      {children}
    </Tag>
  )
}

AnimatedHeading.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  delay: PropTypes.number,
}

export default AnimatedHeading
