import SocialMediaPostsPage from '@/sections/pages/social-media-posts-page'

export const metadata = {
  title: 'Social Media Posts | Northwest Oregon PAC',
  description:
    'A curated gallery of Northwest Oregon PAC social media posts — portraits, prints, and posts made for Northwest Oregon.',
  alternates: { canonical: '/social-media-posts' },
}

export default function Page() {
  return <SocialMediaPostsPage />
}
