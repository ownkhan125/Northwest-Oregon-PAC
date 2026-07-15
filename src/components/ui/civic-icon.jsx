'use client'

import PropTypes from 'prop-types'
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

CivicIcon.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default CivicIcon
