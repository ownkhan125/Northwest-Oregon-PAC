import BlogsPage from '@/sections/pages/blogs-page'
import { fetchGHLBlogs } from '@/lib/ghl-blogs'

// Revalidate the /blogs listing every 60 seconds. On-demand revalidation is
// also triggered by /api/revalidate/blogs when GHL fires the publish webhook,
// so newly-published posts appear on the live site within a few seconds.
export const revalidate = 60

export const metadata = {
  title: 'Blogs | Northwest Oregon PAC',
  description:
    'Working essays and field notes on Northwest Oregon policy, endorsements, and community — written by the people doing the work.',
}

export default async function Page() {
  const posts = await fetchGHLBlogs()
  return <BlogsPage posts={posts} />
}
