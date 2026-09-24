import FryerVsGrayberPage from '@/sections/pages/fryer-vs-grayber-page'

export const metadata = {
  title: 'Randall Fryer vs Dacia Grayber — HD28 Voter Guide | Northwest Oregon PAC',
  description:
    'A free 5-minute voter guide to Oregon House District 28. Compare Randall Fryer and Dacia Grayber on taxes, transportation, schools, healthcare and government spending — with Grayber’s legislative record and Fryer’s taxpayer-first alternative.',
  alternates: { canonical: '/oregon-house-district-28-comparison' },
  openGraph: {
    title: 'Randall Fryer vs Dacia Grayber — HD28 Voter Guide',
    description:
      'You paid the taxes. Find out what Salem did with them. Get the free HD28 Voter Guide before November 3.',
    url: '/oregon-house-district-28-comparison',
    type: 'website',
  },
}

export default function Page() {
  return <FryerVsGrayberPage />
}
