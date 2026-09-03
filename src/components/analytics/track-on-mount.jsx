'use client'

import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { standardParams, trackMeta, trackStandard } from '@/lib/analytics/meta'

// Fires one view event on mount and renders nothing. Place it as the
// first child of the page fragment or section it describes.
//
// `params` sits in the effect's dependency array, so a new object
// identity re-fires the event. Pass an object literal (stable across a
// mount) or a memoized object — never a value rebuilt on each render.
const TrackOnMount = ({ event, params = {}, kind = 'custom' }) => {
  useEffect(() => {
    // Wrapped so every view event carries site_name / page context,
    // exactly like the named helpers in meta.js.
    const payload = standardParams(params)
    if (kind === 'standard') trackStandard(event, payload)
    else trackMeta(event, payload)
  }, [event, params, kind])

  return null
}

TrackOnMount.propTypes = {
  event: PropTypes.string.isRequired,
  params: PropTypes.object,
  kind: PropTypes.oneOf(['custom', 'standard']),
}

export default TrackOnMount
