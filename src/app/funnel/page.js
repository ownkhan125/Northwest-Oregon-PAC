import FunnelPage from '@/sections/pages/funnel-page'

export const metadata = {
  title: 'Join Northwest Oregon PAC — Add your voice',
  description:
    'Stand with Northwest Oregon PAC. Nonpartisan, region-focused, and backing the candidates and priorities that keep our communities thriving.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/funnel' },
}

export default function Page() {
  return <FunnelPage />
}
