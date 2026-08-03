'use client'

import { forwardRef } from 'react'

const CivicIcon = forwardRef(function CivicIcon({ src, className = '', style, ...rest }, ref) {
  return (
    <span
      ref={ref}
      aria-hidden
      className={className}
      style={{
        display: 'inline-block',
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        backgroundColor: 'currentColor',
        ...style,
      }}
      {...rest}
    />
  )
})

export default CivicIcon
