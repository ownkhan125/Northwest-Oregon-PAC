import ThankYouPage from '@/sections/pages/thank-you-page'

export const metadata = {
  title: 'Thank you — Your guide is ready',
  description:
    'Your free Northwest Oregon PAC guide is ready to download. Clear, practical information about the issues shaping Northwest Oregon families.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/thank-you' },
}

export default function Page() {
  return <ThankYouPage />
}
