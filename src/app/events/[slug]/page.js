import { notFound } from 'next/navigation'
import EventDetailPage from '@/sections/pages/event-detail-page'
import { events, getEvent } from '@/data/events'

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) return { title: 'Event not found | Morgan Hale for Congress' }
  return {
    title: `${event.title} | Morgan Hale for Congress`,
    description: event.excerpt,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const event = getEvent(slug)
  if (!event) notFound()
  return <EventDetailPage event={event} />
}
