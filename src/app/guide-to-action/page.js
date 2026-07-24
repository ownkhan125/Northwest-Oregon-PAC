import VoterGuidePage from '@/sections/pages/voter-guide-page'

export const metadata = {
  title: 'Guide-to-Action — Northwest Oregon PAC',
  description:
    'Download the free 5-minute guide to the issues affecting Northwest Oregon families — cost of living, housing, public safety, education, and government accountability.',
  alternates: { canonical: '/guide-to-action' },
}

export default function Page() {
  return <VoterGuidePage />
}
