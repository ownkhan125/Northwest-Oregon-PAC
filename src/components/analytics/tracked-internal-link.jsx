'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'

// Internal navigation CTA. Renders next/link with data-cta-* attributes;
// the delegated click handler in site-analytics.jsx reads those attributes
// and fires trackCTA. Firing here as well would double-count.
const TrackedInternalLink = ({
  ctaName,
  ctaLocation,
  href,
  children,
  className,
  onClick,
  ...rest
}) => {
  return (
    <Link
      {...rest}
      href={href}
      className={className}
      onClick={onClick}
      data-cta-name={ctaName}
      data-cta-location={ctaLocation}
    >
      {children}
    </Link>
  )
}

TrackedInternalLink.propTypes = {
  ctaName: PropTypes.string.isRequired,
  ctaLocation: PropTypes.string.isRequired,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default TrackedInternalLink
