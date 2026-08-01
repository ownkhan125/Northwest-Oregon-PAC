import dynamic from 'next/dynamic'
import Hero from '@/sections/hero'
import { fetchGHLEvents } from '@/lib/ghl'

// Only the Hero is above the fold on mobile — the seven sections below
// still render via SSR (default `ssr: true`) but their client-side
// hydration chunks are split off, so they no longer bloat the initial
// route bundle. Trims ~100-150ms of TBT during first hydration without
// changing any user-visible output.
const About = dynamic(() => import('@/sections/about'))
const Priorities = dynamic(() => import('@/sections/priorities'))
const Vision = dynamic(() => import('@/sections/vision'))
const Endorsements = dynamic(() => import('@/sections/endorsements'))
const News = dynamic(() => import('@/sections/news'))
const Events = dynamic(() => import('@/sections/events'))
const Donate = dynamic(() => import('@/sections/donate'))

export const revalidate = 60

export default async function Home() {
  const events = await fetchGHLEvents()
  return (
    <>
      <Hero />
      <About />
      <Priorities />
      <Vision />
      <Endorsements />
      <News />
      <Events events={events} />
      <Donate />
    </>
  )
}
