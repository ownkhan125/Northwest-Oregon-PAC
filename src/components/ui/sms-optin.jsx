'use client'

import PropTypes from 'prop-types'
import Link from 'next/link'
import Checkbox from '@/components/ui/checkbox'

// Single Peerly 10DLC SMS opt-in checkbox for political (PAC) registration.
// Replaces the separate informational/promotional consent checkboxes with one
// opt-in whose label IS the required disclaimer — donation language plus a
// hyperlinked Privacy Policy. See the Peerly 10DLC SOP (Steps 2-4).
export default function SmsOptIn({ name = 'sms_optin', checked, onChange, disabled }) {
  return (
    <Checkbox
      name={name}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      label={
        <span className="leading-relaxed">
          By providing your telephone number, you consent to receive calls and
          text messages. Msg &amp; data rates may apply. Msg frequency may vary.
          Messaging may include requests for donation. Reply STOP to opt-out
          &amp; HELP for help.{' '}
          <Link
            href="/privacy-policy"
            className="text-primary hover:text-highlight underline underline-offset-2 transition-colors"
          >
            View Privacy Policy
          </Link>{' '}
          for more info.
        </span>
      }
    />
  )
}

SmsOptIn.propTypes = {
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
}
