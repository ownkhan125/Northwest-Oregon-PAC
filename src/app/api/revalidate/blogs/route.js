import { revalidatePath, revalidateTag } from 'next/cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Called by GoHighLevel (or any operator) after a blog post is published,
// updated, or deleted. Revalidates the /blogs listing plus the specific slug
// when one is provided, so newly-published posts appear on the live site
// within seconds without any manual code changes.
//
// GHL webhook target (server-only URL):
//   POST /api/revalidate/blogs
//   Headers: x-revalidate-secret: <GHL_REVALIDATE_SECRET>
//   Body:    { "slug": "optional-slug", "tag": "optional-tag" }
//
// The endpoint is idempotent, safe to call repeatedly, and requires the
// shared secret so untrusted callers can't invalidate the cache at will.

const readSecret = (request) =>
  request.headers.get('x-revalidate-secret') ||
  new URL(request.url).searchParams.get('secret') ||
  ''

const expectedSecret = () => process.env.GHL_REVALIDATE_SECRET || ''

export async function POST(request) {
  const expected = expectedSecret()
  const provided = readSecret(request)
  if (!expected || provided !== expected) {
    return Response.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    // Empty or invalid body is fine — we'll still revalidate the listing.
  }

  const slug = typeof body?.slug === 'string' ? body.slug.trim() : ''
  const tag = typeof body?.tag === 'string' ? body.tag.trim() : ''

  const revalidated = []
  try {
    revalidatePath('/blogs')
    revalidated.push('/blogs')
    if (slug) {
      revalidatePath(`/blogs/${slug}`)
      revalidated.push(`/blogs/${slug}`)
    }
    // Blanket cache tag used by the GHL fetcher — bust it so the next request
    // hits GHL fresh.
    revalidateTag('ghl-blogs')
    revalidated.push('tag:ghl-blogs')
    if (tag) {
      revalidateTag(tag)
      revalidated.push(`tag:${tag}`)
    }
  } catch (err) {
    return Response.json(
      { ok: false, error: 'revalidate-failed', message: String(err?.message || err) },
      { status: 500 },
    )
  }

  return Response.json({
    ok: true,
    revalidated,
    at: new Date().toISOString(),
  })
}

// Allow a GET with the same secret for quick manual pokes from a browser
// bookmark or a scheduled ping.
export async function GET(request) {
  return POST(request)
}
