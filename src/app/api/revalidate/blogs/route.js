import { revalidatePath, revalidateTag } from 'next/cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Called by GoHighLevel (or any operator) after a blog post is published,
// updated, or deleted. Revalidates the /blogs listing plus the specific
// slug when one is provided, so newly-published posts appear on the live
// site within seconds without any manual code changes.
//
// GHL webhook target (server-only URL):
//   POST /api/revalidate/blogs
//   Headers: x-revalidate-secret: <GHL_REVALIDATE_SECRET>
//   Body:    { "slug": "optional-slug" }

const readSecret = (request) =>
  request.headers.get('x-revalidate-secret') ||
  new URL(request.url).searchParams.get('secret') ||
  ''

export async function POST(request) {
  const expected = process.env.GHL_REVALIDATE_SECRET || ''
  if (!expected || readSecret(request) !== expected) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    // Empty/invalid body is fine — we'll still revalidate the listing.
  }

  const slug = typeof body?.slug === 'string' ? body.slug.trim() : ''
  const revalidated = ['/blogs']
  revalidatePath('/blogs')
  if (slug) {
    revalidatePath(`/blogs/${slug}`)
    revalidated.push(`/blogs/${slug}`)
  }
  revalidateTag('ghl-blogs')
  revalidated.push('tag:ghl-blogs')

  return Response.json({ ok: true, revalidated, at: new Date().toISOString() })
}

// Same handler for GET so operators can poke the endpoint from a browser
// bookmark or a scheduled ping using ?secret=… in the URL.
export const GET = POST
