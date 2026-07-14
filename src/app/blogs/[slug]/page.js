import { notFound } from 'next/navigation'
import BlogDetailPage from '@/sections/pages/blog-detail-page'
import { blogPosts, getBlogBySlug, getBlogNeighbors, getRelatedBlogs } from '@/data/blogs'

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) {
    return { title: 'Article not found | Northwest Oregon PAC' }
  }
  return {
    title: `${post.title} | Northwest Oregon PAC`,
    description: post.excerpt,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()
  const { prev, next } = getBlogNeighbors(slug)
  const related = getRelatedBlogs(slug, 2)
  return <BlogDetailPage post={post} prev={prev} next={next} related={related} />
}
