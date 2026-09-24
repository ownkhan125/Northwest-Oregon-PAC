import HD27ThankYouPage from '@/sections/pages/norman-vs-carpenter-thank-you-page'

export const metadata = {
  title: 'Your HD27 Voter Guide is Ready — Northwest Oregon PAC',
  description:
    'Thanks for requesting the 2026 Oregon House District 27 Voter Guide: Mark Norman vs. Tammy Carpenter. Download your copy.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/mark-norman-vs-tammy-carpenter/thank-you' },
  openGraph: {
    title: 'Your HD27 Voter Guide is Ready',
    description: 'Your free HD27 Voter Guide is ready to download.',
    url: '/mark-norman-vs-tammy-carpenter/thank-you',
    type: 'website',
  },
}

export default function Page() {
  return <HD27ThankYouPage />
}
