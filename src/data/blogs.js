// Blog rendering utilities. All post content itself is fetched live from
// GoHighLevel (see src/lib/ghl-blogs.js). These helpers just shape data on
// the client side for the TOC and date display.

export function tocFromBody(body) {
  return body
    .filter((b) => b.type === 'heading' && b.id && (b.level === 2 || b.level === 3))
    .map((b) => ({ id: b.id, level: b.level, text: b.text }))
}

export function formatBlogDate(iso) {
  try {
    return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
