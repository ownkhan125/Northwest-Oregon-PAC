import NormanVsCarpenterPage from '@/sections/pages/norman-vs-carpenter-page'

export const metadata = {
  title: 'Mark Norman vs Tammy Carpenter — HD27 Voter Guide | Northwest Oregon PAC',
  description:
    'A free 5-minute voter guide to Oregon House District 27. Compare Mark Norman and Tammy Carpenter on taxes, healthcare, housing, education, public safety and economic growth — and what each approach could cost.',
  alternates: { canonical: '/mark-norman-vs-tammy-carpenter' },
  openGraph: {
    title: 'Mark Norman vs Tammy Carpenter — HD27 Voter Guide',
    description:
      'More government means more taxpayer funding. Get the free HD27 Voter Guide before November 3.',
    url: '/mark-norman-vs-tammy-carpenter',
    type: 'website',
  },
}

export default function Page() {
  return <NormanVsCarpenterPage />
}
