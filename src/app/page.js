import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Hero from '@/sections/hero'
import { fetchGHLEvents } from '@/lib/ghl'

// Only the Hero is above the fold on mobile — the seven sections below
// still render via SSR (default `ssr: true`) but their client-side
// hydration chunks are split off, so they no longer bloat the initial
// route bundle. Explicit Suspense boundaries let React 19 yield between
// hydrating each section instead of committing them in one long task,
// which shortens the app-chunk Total Blocking Time on mobile.
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
      <Suspense fallback={null}><About /></Suspense>
      <Suspense fallback={null}><Priorities /></Suspense>
      <Suspense fallback={null}><Vision /></Suspense>
      <Suspense fallback={null}><Endorsements /></Suspense>
      <Suspense fallback={null}><News /></Suspense>
      <Suspense fallback={null}><Events events={events} /></Suspense>
      <Suspense fallback={null}><Donate /></Suspense>
    </>
  )
}
