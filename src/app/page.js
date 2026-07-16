import Hero from '@/sections/hero'
import About from '@/sections/about'
import Priorities from '@/sections/priorities'
import Vision from '@/sections/vision'
import Endorsements from '@/sections/endorsements'
import News from '@/sections/news'
import Events from '@/sections/events'
import Donate from '@/sections/donate'
import { fetchGHLEvents } from '@/lib/ghl'

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
