'use client'

import PropTypes from 'prop-types'

// External / donation CTA. Renders a plain <a> with data-cta-* attributes;
// the delegated click handler in site-analytics.jsx reads those attributes
// and fires trackCTA (and trackDonateClick when ctaKind === 'donate').
// Firing here as well would double-count — do not add an onClick that also
// calls trackCTA.
const TrackedCTALink = ({
  ctaName,
  ctaLocation,
  ctaKind,
  href,
  children,
  className,
  target,
  rel,
  onClick,
  ...rest
}) => {
  return (
    <a
      {...rest}
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
      data-cta-name={ctaName}
      data-cta-location={ctaLocation}
      data-cta-kind={ctaKind}
    >
      {children}
    </a>
  )
}

TrackedCTALink.propTypes = {
  ctaName: PropTypes.string.isRequired,
  ctaLocation: PropTypes.string.isRequired,
  ctaKind: PropTypes.string,
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  onClick: PropTypes.func,
}

export default TrackedCTALink
