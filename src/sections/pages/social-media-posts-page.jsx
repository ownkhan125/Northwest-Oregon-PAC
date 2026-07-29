'use client'

import { useCallback, useEffect, useState } from 'react'
import { m, AnimatePresence } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import { cardReveal, stagger, EASE } from '@/animations/variants'
import { cn } from '@/lib/cn'

const POSTS = [
  {
    id: 'a-stronger-voice',
    src: '/social-media-posts/01-a-stronger-voice.png',
    title: 'A Stronger Voice for Northwest Oregon',
    tag: 'Introduction',
  },
  {
    id: 'what-matters-most',
    src: '/social-media-posts/02-what-matters-most.png',
    title: 'What Matters Most?',
    tag: 'Values',
  },
  {
    id: 'be-part-of-something-bigger',
    src: '/social-media-posts/03-be-part-of-something-bigger.png',
    title: 'Be Part of Something Bigger for Oregon',
    tag: 'Get involved',
  },
  {
    id: 'ciatta-thompson',
    src: '/social-media-posts/04-ciatta-thompson.png',
    title: 'Ciatta Thompson',
    tag: 'Candidates',
  },
  {
    id: 'invest-in-northwest-oregon',
    src: '/social-media-posts/05-invest-in-northwest-oregon.png',
    title: 'Invest in Northwest Oregon.',
    tag: 'Support',
  },
  {
    id: 'building-the-foundation',
    src: '/social-media-posts/06-building-the-foundation.jpg',
    title: "Building the Foundation for Northwest Oregon's Future",
    tag: 'Vision',
  },
  {
    id: 'more-than-campaign-promises',
    src: '/social-media-posts/07-more-than-campaign-promises.png',
    title: 'More Than Campaign Promises',
    tag: 'Values',
  },
  {
    id: 'powered-by-innovation',
    src: '/social-media-posts/08-powered-by-innovation.png',
    title: 'Powered by Innovation',
    tag: 'Economy',
  },
  {
    id: 'affordable-energy',
    src: '/social-media-posts/09-affordable-energy.png',
    title: 'Affordable Energy Is a Family Issue',
    tag: 'Issues',
  },
  {
    id: 'building-tomorrow',
    src: '/social-media-posts/10-building-tomorrow.png',
    title: 'Building Tomorrow. Starting Today.',
    tag: 'Get involved',
  },
]

function PostCard({ post, index, onOpen }) {
  return (
    <m.article
      variants={cardReveal}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="group h-full"
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Preview ${post.title}`}
        className="border-border bg-surface hover:border-primary hover:bg-primary hover:text-primary-fg focus-visible:ring-primary/40 relative isolate flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border text-left transition-[background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_60px_-30px_rgba(46,69,56,0.55)] focus-visible:ring-2 focus-visible:outline-none"
      >
        <span className="relative block aspect-square w-full overflow-hidden">
          <img
            src={post.src}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
          <span
            aria-hidden
            className="from-ink/50 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="border-primary/35 bg-surface/90 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.22em] uppercase backdrop-blur-sm">
            {post.tag}
          </span>
          <span
            aria-hidden
            className="bg-surface/90 text-primary absolute right-4 bottom-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full opacity-0 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </span>
        <span className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
          <span className="text-foreground/55 group-hover:text-primary-fg/70 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-500">
            <span>Post {String(index + 1).padStart(2, '0')}</span>
            <span aria-hidden className="bg-border group-hover:bg-primary-fg/30 h-3 w-px transition-colors duration-500" />
            <span>1080 × 1080</span>
          </span>
          <span className="font-display text-foreground group-hover:text-primary-fg text-lg leading-tight font-medium tracking-tight transition-colors duration-500 sm:text-xl">
            {post.title}
          </span>
        </span>
      </button>
    </m.article>
  )
}

function Lightbox({ posts, index, onClose, onPrev, onNext }) {
  const post = posts[index]
  return (
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-xl sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="focus-visible:ring-sand/50 absolute top-5 right-5 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-sand/30 bg-ink/40 text-sand transition-all hover:border-sand/70 hover:bg-ink/60 focus-visible:ring-2 focus-visible:outline-none sm:top-8 sm:right-8"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Previous post"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="focus-visible:ring-sand/50 absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-sand/30 bg-ink/40 p-3 text-sand transition-all hover:border-sand/70 hover:bg-ink/60 focus-visible:ring-2 focus-visible:outline-none sm:left-6 sm:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Next post"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="focus-visible:ring-sand/50 absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-sand/30 bg-ink/40 p-3 text-sand transition-all hover:border-sand/70 hover:bg-ink/60 focus-visible:ring-2 focus-visible:outline-none sm:right-6 sm:flex"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <m.div
        className="relative flex max-h-full max-w-full flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.35, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={post.src}
          src={post.src}
          alt={post.title}
          className="max-h-[80vh] w-auto max-w-full rounded-2xl border border-sand/20 object-contain shadow-[0_60px_140px_-40px_rgba(0,0,0,0.85)]"
        />
        <div className="text-center">
          <div className="font-mono text-[10px] tracking-[0.32em] uppercase text-sand/70">
            {post.tag} · Post {String(index + 1).padStart(2, '0')} of {posts.length}
          </div>
          <div className="font-display mt-2 text-lg font-medium tracking-tight text-sand sm:text-xl">
            {post.title}
          </div>
        </div>
      </m.div>
    </m.div>
  )
}

export default function SocialMediaPostsPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const isOpen = openIndex !== null

  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + POSTS.length) % POSTS.length)),
    [],
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % POSTS.length)),
    [],
  )

  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close, prev, next])

  return (
    <>
      <PageHeader
        eyebrow="Field notes from our feed"
        number="01"
        title="Social Media Posts"
        description="A curated look at the campaign we're building out loud — posts, portraits, and prints made for Northwest Oregon. Tap any card to open the full-size image."
      />

      <section className="relative isolate overflow-x-clip pt-4 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            data-testid="gallery-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            className={cn(
              'grid gap-6 sm:gap-7 lg:gap-8',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {POSTS.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} onOpen={setOpenIndex} />
            ))}
          </m.div>

        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <Lightbox
            posts={POSTS}
            index={openIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  )
}
