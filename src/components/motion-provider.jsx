'use client'

import PropTypes from 'prop-types'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
)

MotionProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MotionProvider
