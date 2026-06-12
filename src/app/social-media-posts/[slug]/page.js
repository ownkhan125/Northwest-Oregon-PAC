import { notFound } from 'next/navigation'
import SocialPostDetailPage from '@/sections/pages/social-post-detail-page'
import { socialPosts, getPostBySlug } from '@/data/social-posts'

export function generateStaticParams() {
  return socialPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post not found | Morgan Hale for Congress' }
  return {
    title: `${post.title} · ${post.format === 'feed' ? 'Feed' : 'Story'} | Social Media Posts`,
    description: post.description,
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return <SocialPostDetailPage post={post} />
}
