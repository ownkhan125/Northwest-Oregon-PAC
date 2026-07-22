'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import { cardReveal, stagger, EASE } from '@/animations/variants'
import { feedPosts, storyPosts, carouselPosts, socialTags } from '@/data/social-posts'
import { pac } from '@/data/pac'
import { cn } from '@/lib/cn'

const FORMATS = [
  { key: 'all', label: 'All formats' },
  { key: 'feed', label: 'Feed' },
  { key: 'story', label: 'Stories' },
  { key: 'carousel', label: 'Carousels' },
]

const ALL_POSTS = { feed: feedPosts, story: storyPosts, carousel: carouselPosts }

/* ---------------------------------------------------------------- */

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'cursor-pointer rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.22em] uppercase transition-all duration-300',
        active
          ? 'border-primary bg-primary text-primary-fg shadow-[0_14px_30px_-16px_rgba(46,69,56,0.6)]'
          : 'border-border text-foreground/70 hover:border-primary/50 hover:text-primary bg-surface/60',
      )}
    >
      {children}
    </button>
  )
}

function SectionMarker({ number, label, size, count }) {
  return (
    <div className="text-highlight mb-7 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
      <span className="text-primary">{number}</span>
      <span className="bg-highlight/40 h-px w-8" />
      <span>{label}</span>
      <span className="border-border text-foreground/60 ml-2 rounded-full border px-2.5 py-0.5 text-[10px] tracking-[0.2em]">
        {count}
      </span>
      <span className="text-foreground/50 ml-auto hidden tracking-[0.2em] sm:block">{size}</span>
    </div>
  )
}

function CardShell({ post, onOpen, aspect, children, footer }) {
  return (
    <m.article variants={cardReveal} className="group h-full">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Preview ${post.title}`}
        className="border-border bg-surface hover:border-primary/50 focus-visible:ring-primary/40 relative isolate flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_36px_70px_-38px_rgba(46,69,56,0.55)] focus-visible:ring-2 focus-visible:outline-none"
      >
        <span className={cn('relative block w-full overflow-hidden', aspect)}>
          <img
            src={post.preview}
            alt={`${post.title} — ${post.size} social graphic`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
          />
          <span
            aria-hidden
            className="from-ink/45 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <span className="border-primary/35 bg-surface/90 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.22em] uppercase backdrop-blur-sm">
            {post.tag}
          </span>
          {children}
          <span
            aria-hidden
            className="bg-surface/90 text-primary absolute right-4 bottom-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full opacity-0 shadow-lg backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </span>
        {footer}
      </button>
    </m.article>
  )
}

function FeedCard({ post, onOpen }) {
  return (
    <CardShell
      post={post}
      onOpen={onOpen}
      aspect="aspect-square"
      footer={
        <span className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
          <span className="text-foreground/55 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span>Feed {String(post.n).padStart(2, '0')}</span>
            <span aria-hidden className="bg-border h-3 w-px" />
            <span>{post.size}</span>
          </span>
          <span className="font-display text-foreground group-hover:text-primary text-lg leading-tight font-medium tracking-tight transition-colors sm:text-xl">
            {post.title}
          </span>
          <span className="text-foreground/70 line-clamp-2 text-sm">{post.caption}</span>
        </span>
      }
    />
  )
}

function StoryCard({ post, onOpen }) {
  return (
    <CardShell
      post={post}
      onOpen={onOpen}
      aspect="aspect-[9/16]"
      footer={
        <span className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-foreground/55 font-mono text-[9px] tracking-[0.25em] uppercase">
            Story {String(post.n).padStart(2, '0')}
          </span>
          <span className="font-display text-foreground group-hover:text-primary text-sm leading-snug font-medium tracking-tight transition-colors sm:text-base">
            {post.title}
          </span>
        </span>
      }
    />
  )
}

function CarouselCard({ post, onOpen }) {
  return (
    <CardShell
      post={post}
      onOpen={onOpen}
      aspect="aspect-square"
      footer={
        <span className="flex flex-1 flex-col gap-2.5 p-5 sm:p-6">
          <span className="text-foreground/55 flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span>Carousel {String(post.n).padStart(2, '0')}</span>
            <span aria-hidden className="bg-border h-3 w-px" />
            <span>{post.slideCount} slides</span>
          </span>
          <span className="font-display text-foreground group-hover:text-primary text-lg leading-tight font-medium tracking-tight transition-colors sm:text-xl">
            {post.title}
          </span>
          <span className="text-foreground/70 line-clamp-2 text-sm">{post.caption}</span>
          <span aria-hidden className="mt-1 flex items-center gap-1.5">
            {post.slides.map((s, i) => (
              <span
                key={s}
                className={cn(
                  'h-1 rounded-full transition-colors',
                  i === 0 ? 'bg-primary w-6' : 'bg-border-strong w-1.5',
                )}
              />
            ))}
          </span>
        </span>
      }
    >
      <span className="border-sand/40 bg-ink/70 text-sand absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[9px] tracking-[0.2em] uppercase backdrop-blur-sm">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="13" height="14" rx="2" />
          <path d="M19 7v10M22 9v6" />
        </svg>
        {post.slideCount}
      </span>
    </CardShell>
  )
}

/* ------------------------------- lightbox ------------------------------- */

function Artboard({ src, width, height }) {
  const wrapRef = useRef(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const update = () => setScale(el.clientWidth / width)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [width, src])

  return (
    <div
      ref={wrapRef}
      className="border-sand/25 relative overflow-hidden rounded-2xl border shadow-[0_60px_140px_-40px_rgba(0,0,0,0.75)]"
      style={{
        aspectRatio: `${width} / ${height}`,
        width: `min(88vw, calc(72vh * ${width / height}))`,
      }}
    >
      {scale > 0 && (
        <iframe
          key={src}
          src={src}
          title="Social creative preview"
          scrolling="no"
          className="pointer-events-none absolute top-0 left-0 border-0"
          style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}
        />
      )}
    </div>
  )
}

function Lightbox({ post, onClose }) {
  const isCarousel = post.format === 'carousel'
  const [slide, setSlide] = useState(0)
  const width = 1080
  const height = post.format === 'story' ? 1920 : 1080
  const src = isCarousel ? post.slides[slide] : post.html

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (isCarousel && e.key === 'ArrowRight') setSlide((s) => Math.min(s + 1, post.slideCount - 1))
      if (isCarousel && e.key === 'ArrowLeft') setSlide((s) => Math.max(s - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isCarousel, post, onClose])

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${post.title} preview`}
      className="bg-ink/85 fixed inset-0 z-[90] flex flex-col items-center justify-center p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <m.div
        initial={{ opacity: 0, y: 26, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="flex max-h-full flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sand/70 font-mono text-[10px] tracking-[0.28em] uppercase">
              {post.tag} · {post.size}
              {isCarousel && ` · Slide ${slide + 1}/${post.slideCount}`}
            </div>
            <div className="font-display text-cream truncate text-lg font-medium tracking-tight sm:text-xl">
              {post.title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open creative in a new tab"
              className="border-sand/30 text-sand hover:bg-sand hover:text-ink grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="border-sand/30 text-sand hover:bg-sand hover:text-ink grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <Artboard src={src} width={width} height={height} />
          {isCarousel && slide > 0 && (
            <button
              type="button"
              onClick={() => setSlide((s) => s - 1)}
              aria-label="Previous slide"
              className="bg-cream text-ink absolute top-1/2 -left-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full shadow-xl transition-transform hover:scale-105 sm:-left-5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          {isCarousel && slide < post.slideCount - 1 && (
            <button
              type="button"
              onClick={() => setSlide((s) => s + 1)}
              aria-label="Next slide"
              className="bg-cream text-ink absolute top-1/2 -right-3 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full shadow-xl transition-transform hover:scale-105 sm:-right-5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          )}
        </div>

        {isCarousel && (
          <div className="flex items-center gap-2" role="tablist" aria-label="Carousel slides">
            {post.slides.map((s, i) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={i === slide}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className={cn(
                  'h-2 cursor-pointer rounded-full transition-all duration-300',
                  i === slide ? 'bg-sand w-8' : 'bg-sand/30 hover:bg-sand/60 w-2',
                )}
              />
            ))}
          </div>
        )}
      </m.div>
    </m.div>
  )
}

/* -------------------------------- page -------------------------------- */

export default function SocialPostsPage() {
  const [format, setFormat] = useState('all')
  const [tag, setTag] = useState('all')
  const [active, setActive] = useState(null)

  const byTag = (posts) => (tag === 'all' ? posts : posts.filter((p) => p.tag === tag))
  const visible = useMemo(
    () => ({
      feed: format === 'all' || format === 'feed' ? byTag(feedPosts) : [],
      story: format === 'all' || format === 'story' ? byTag(storyPosts) : [],
      carousel: format === 'all' || format === 'carousel' ? byTag(carouselPosts) : [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [format, tag],
  )
  const total = visible.feed.length + visible.story.length + visible.carousel.length

  const tagCounts = useMemo(() => {
    const counts = { all: feedPosts.length + storyPosts.length + carouselPosts.length }
    for (const t of socialTags) {
      counts[t] = Object.values(ALL_POSTS).reduce(
        (a, posts) => a + posts.filter((p) => p.tag === t).length,
        0,
      )
    }
    return counts
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Social"
        number="11"
        title="Made to be shared."
        description={`A complete creative library carrying one consistent voice for Northwest Oregon — ${feedPosts.length} feed posts, ${storyPosts.length} stories, and ${carouselPosts.length} carousels, designed to match the campaign from headline to hairline.`}
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Filter bar */}
          <m.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="border-border bg-background/85 sticky top-24 z-30 -mx-2 mb-12 rounded-3xl border px-4 py-4 backdrop-blur-lg sm:px-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-highlight mr-1 hidden font-mono text-[10px] tracking-[0.3em] uppercase lg:block">
                Format
              </span>
              {FORMATS.map((f) => (
                <FilterPill key={f.key} active={format === f.key} onClick={() => setFormat(f.key)}>
                  {f.label}
                </FilterPill>
              ))}
            </div>
            <div className="bg-border mt-3 mb-3 h-px w-full" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-highlight mr-1 hidden font-mono text-[10px] tracking-[0.3em] uppercase lg:block">
                Topic
              </span>
              <FilterPill active={tag === 'all'} onClick={() => setTag('all')}>
                All · {tagCounts.all}
              </FilterPill>
              {socialTags.map((t) => (
                <FilterPill key={t} active={tag === t} onClick={() => setTag(t)}>
                  {t} · {tagCounts[t]}
                </FilterPill>
              ))}
            </div>
          </m.div>

          {/* Feed */}
          {visible.feed.length > 0 && (
            <m.div
              key={`feed-${format}-${tag}`}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <SectionMarker number="01" label="Feed posts" size="1080 × 1080" count={visible.feed.length} />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.feed.map((post) => (
                  <FeedCard key={post.id} post={post} onOpen={() => setActive(post)} />
                ))}
              </div>
            </m.div>
          )}

          {/* Stories */}
          {visible.story.length > 0 && (
            <m.div
              key={`story-${format}-${tag}`}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
              className={visible.feed.length > 0 ? 'mt-20' : ''}
            >
              <SectionMarker number="02" label="Story posts" size="1080 × 1920" count={visible.story.length} />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
                {visible.story.map((post) => (
                  <StoryCard key={post.id} post={post} onOpen={() => setActive(post)} />
                ))}
              </div>
            </m.div>
          )}

          {/* Carousels */}
          {visible.carousel.length > 0 && (
            <m.div
              key={`carousel-${format}-${tag}`}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-8% 0px' }}
              className={visible.feed.length > 0 || visible.story.length > 0 ? 'mt-20' : ''}
            >
              <SectionMarker
                number="03"
                label="Carousels"
                size="1080 × 1080 · 5–7 slides"
                count={visible.carousel.length}
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.carousel.map((post) => (
                  <CarouselCard key={post.id} post={post} onOpen={() => setActive(post)} />
                ))}
              </div>
            </m.div>
          )}

          {/* Empty state */}
          {total === 0 && (
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="border-border bg-surface-alt/40 flex flex-col items-center gap-4 rounded-3xl border border-dashed px-8 py-20 text-center"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                No matches
              </div>
              <p className="font-display text-foreground text-2xl font-medium tracking-tight">
                Nothing in this combination yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormat('all')
                  setTag('all')
                }}
                className="border-primary/40 text-primary hover:bg-primary hover:text-primary-fg mt-2 cursor-pointer rounded-full border px-5 py-2.5 font-mono text-[10px] tracking-[0.25em] uppercase transition-colors"
              >
                Reset filters
              </button>
            </m.div>
          )}

          {/* Share CTA */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border-primary/25 bg-surface-alt/50 mt-24 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Post it forward
              </div>
              <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Share these with your neighbours.
              </h2>
              <p className="text-foreground/75 mt-3 max-w-xl text-sm sm:text-base">
                Open any graphic, pair it with your own words, and tag {pac.name}.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={pac.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="border-primary bg-primary text-primary-fg hover:bg-primary/90 inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm tracking-widest uppercase transition-colors"
              >
                Follow on Facebook
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="text-primary group/link hover:text-highlight inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
              >
                Request a format
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/link:translate-x-1">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <AnimatePresence>
        {active && <Lightbox key={active.id} post={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  )
}
