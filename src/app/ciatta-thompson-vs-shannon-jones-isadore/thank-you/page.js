import HD33ThankYouPage from '@/sections/pages/ciatta-vs-isadore-thank-you-page'

export const metadata = {
  title: 'Your HD33 Voters Guide is Ready — Northwest Oregon PAC',
  description:
    'Thanks for requesting the Oregon House District 33 Voters Guide. Download your copy — a concise look at Ciatta Thompson vs Shannon Jones Isadore on public safety, addiction, homelessness, and accountability.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/ciatta-thompson-vs-shannon-jones-isadore/thank-you' },
  openGraph: {
    title: 'Your HD33 Voters Guide is Ready',
    description: 'Your free HD33 Voters Guide is ready to download.',
    url: '/ciatta-thompson-vs-shannon-jones-isadore/thank-you',
    type: 'website',
  },
}

export default function Page() {
  return <HD33ThankYouPage />
}
