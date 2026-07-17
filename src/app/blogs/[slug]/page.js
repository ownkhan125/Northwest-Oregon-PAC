import { notFound } from 'next/navigation'
import BlogDetailPage from '@/sections/pages/blog-detail-page'
import { fetchGHLBlogs } from '@/lib/ghl-blogs'

export const revalidate = 60
export const dynamicParams = true

async function loadPosts() {
  return (await fetchGHLBlogs()) || []
}

// Prebuild static params for whichever posts are known at build time. Posts
// published after the build render on-demand via dynamicParams.
export async function generateStaticParams() {
  const posts = await loadPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const posts = await loadPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: 'Article not found | Northwest Oregon PAC' }
  return {
    title: `${post.seoTitle || post.title} | Northwest Oregon PAC`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.heroImage ? [{ url: post.heroImage }] : undefined,
      type: 'article',
    },
  }
}

function neighbors(posts, slug) {
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? posts[idx - 1] : null,
    next: idx < posts.length - 1 ? posts[idx + 1] : null,
  }
}

function related(posts, slug, limit = 2) {
  const current = posts.find((p) => p.slug === slug)
  if (!current) return []
  const others = posts.filter((p) => p.slug !== slug)
  const sameCategory = others.filter((p) => p.category === current.category)
  const rest = others.filter((p) => p.category !== current.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

export default async function Page({ params }) {
  const { slug } = await params
  const posts = await loadPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const { prev, next } = neighbors(posts, slug)
  const relatedList = related(posts, slug, 2)

  return <BlogDetailPage post={post} prev={prev} next={next} related={relatedList} />
}
