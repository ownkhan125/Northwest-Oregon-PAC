import EventsPage from '@/sections/pages/events-page'
import { fetchGHLEvents } from '@/lib/ghl'

export const revalidate = 60

export const metadata = {
  title: 'Events | Northwest Oregon PAC',
  description:
    'Upcoming events with Northwest Oregon PAC — town halls, canvasses, phone banks, and candidate meet-and-greets across our region.',
}

export default async function Page() {
  const events = await fetchGHLEvents()
  return <EventsPage events={events} />
}
