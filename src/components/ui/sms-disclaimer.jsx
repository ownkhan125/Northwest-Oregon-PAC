import Link from 'next/link'
import { cn } from '@/lib/cn'

// Peerly 10DLC opt-in disclaimer for political (PAC) SMS registration.
// Must stay visible next to every phone/SMS opt-in form, include donation
// language, and hyperlink the Privacy Policy. See the Peerly 10DLC SOP.
export default function SmsDisclaimer({ className }) {
  return (
    <p className={cn('text-foreground/60 text-xs leading-relaxed', className)}>
      By providing your telephone number, you consent to receive calls and text
      messages. Msg &amp; data rates may apply. Msg frequency may vary. Messaging
      may include requests for donation. Reply STOP to opt-out &amp; HELP for
      help.{' '}
      <Link
        href="/privacy-policy"
        className="text-primary hover:text-highlight underline underline-offset-2 transition-colors"
      >
        View Privacy Policy
      </Link>{' '}
      for more info.
    </p>
  )
}
