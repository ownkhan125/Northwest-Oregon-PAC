import CiattaVsIsadorePage from '@/sections/pages/ciatta-vs-isadore-page'

export const metadata = {
  title:
    'Ciatta Thompson vs Shannon Jones Isadore — HD33 Voters Guide | Northwest Oregon PAC',
  description:
    'A free 5-minute voter guide to Oregon House District 33. Compare Ciatta Thompson and Shannon Jones Isadore on public safety, addiction, homelessness spending, and affordability — with the record behind the headlines.',
  alternates: { canonical: '/ciatta-thompson-vs-shannon-jones-isadore' },
  openGraph: {
    title: 'Ciatta Thompson vs Shannon Jones Isadore — HD33 Voters Guide',
    description:
      'See what happened. See where the candidates stand. Decide for yourself. Free download for Oregon House District 33 voters.',
    url: '/ciatta-thompson-vs-shannon-jones-isadore',
    type: 'website',
  },
}

export default function Page() {
  return <CiattaVsIsadorePage />
}
