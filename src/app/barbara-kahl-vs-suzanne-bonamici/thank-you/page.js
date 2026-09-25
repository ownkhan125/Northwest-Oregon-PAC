import KahlVsBonamiciThankYouPage from '@/sections/pages/kahl-vs-bonamici-thank-you-page'

export const metadata = {
  title: 'Your Barbara Kahl vs Suzanne Bonamici Voter Guide is Ready — Northwest Oregon PAC',
  description:
    'Thanks for requesting the 2026 Oregon’s 1st Congressional District Voter Guide: Barbara Kahl vs. Suzanne Bonamici. Download your copy.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/barbara-kahl-vs-suzanne-bonamici/thank-you' },
  openGraph: {
    title: 'Your Barbara Kahl vs Suzanne Bonamici Voter Guide is Ready',
    description: 'Your free Barbara Kahl vs Suzanne Bonamici Voter Guide is ready to download.',
    url: '/barbara-kahl-vs-suzanne-bonamici/thank-you',
    type: 'website',
  },
}

export default function Page() {
  return <KahlVsBonamiciThankYouPage />
}
