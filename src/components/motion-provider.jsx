'use client'

import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'

const MotionProvider = ({ children }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
)

export default MotionProvider
