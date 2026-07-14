// Northwest Oregon PAC — event calendar.
// Per the brand document (July 2026): "We have no events yet — but please make
// sure we have access to an events page." Populate this array as events are
// scheduled and the events page + homepage rail will render automatically.

export const events = []

export function getEvent(slug) {
  return events.find((e) => e.slug === slug)
}
