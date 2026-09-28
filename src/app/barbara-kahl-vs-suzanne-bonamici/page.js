import KahlVsBonamiciPage from '@/sections/pages/kahl-vs-bonamici-page'

export const metadata = {
  title: 'Barbara Kahl vs Suzanne Bonamici — 2026 Voter Guide | Northwest Oregon PAC',
  description:
    'Fourteen years creates a record. See where challenger Dr. Barbara Kahl and incumbent Rep. Suzanne Bonamici differ on jobs, energy, immigration, schools, healthcare, and federal accountability. Free 5-minute voter guide.',
  alternates: { canonical: '/barbara-kahl-vs-suzanne-bonamici' },
  openGraph: {
    title: 'Barbara Kahl vs Suzanne Bonamici — 2026 Voter Guide',
    description:
      'Barbara Kahl vs. Suzanne Bonamici. Compare the fourteen-year record with a different approach to Oregon’s CD-1.',
    url: '/barbara-kahl-vs-suzanne-bonamici',
    type: 'website',
  },
}

export default function Page() {
  return <KahlVsBonamiciPage />
}
