import { notFound } from 'next/navigation'
import EventDetailPage from '@/sections/pages/event-detail-page'
import { fetchGHLEvent } from '@/lib/ghl'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { id } = await params
  const event = await fetchGHLEvent(id)
  if (!event) return { title: 'Event not found | Northwest Oregon PAC' }
  return {
    title: `${event.title} | Northwest Oregon PAC`,
    description: event.description,
  }
}

export default async function Page({ params }) {
  const { id } = await params
  const event = await fetchGHLEvent(id)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}
