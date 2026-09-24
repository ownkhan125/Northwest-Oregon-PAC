import HD28ThankYouPage from '@/sections/pages/fryer-vs-grayber-thank-you-page'

export const metadata = {
  title: 'Your HD28 Voter Guide is Ready — Northwest Oregon PAC',
  description:
    'Thanks for requesting the 2026 Oregon House District 28 Voter Guide: Randall Fryer vs. Dacia Grayber. Download your copy.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/oregon-house-district-28-comparison/thank-you' },
  openGraph: {
    title: 'Your HD28 Voter Guide is Ready',
    description: 'Your free HD28 Voter Guide is ready to download.',
    url: '/oregon-house-district-28-comparison/thank-you',
    type: 'website',
  },
}

export default function Page() {
  return <HD28ThankYouPage />
}
