'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { fadeUp, cardReveal, stagger, EASE } from '@/animations/variants'
import { CATEGORIES, FORMATS, socialPosts } from '@/data/social-posts'

export default function SocialPostsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [format, setFormat] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return socialPosts.filter((p) => {
      if (category !== 'all' && p.category !== category) return false
      if (format !== 'all' && p.format !== format) return false
      if (!q) return true
      const haystack = [
        p.title,
        p.subtitle,
        p.description,
        p.category,
        ...(p.tags ?? []),
        ...(p.keywords ?? []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query, category, format])

  const counts = useMemo(() => {
    const total = socialPosts.length
    const feed = socialPosts.filter((p) => p.format === 'feed').length
    const story = socialPosts.filter((p) => p.format === 'story').length
    return { total, feed, story }
  }, [])

  return (
    <>
      <PageHeader
        eyebrow="Content Library"
        number="01"
        title="Social media creatives."
        description={`A premium pack of ${counts.total} ready-to-publish designs — ${counts.feed} Instagram feed squares and ${counts.story} vertical stories — built in the campaign’s typography and palette.`}
      />

      <section className="relative overflow-x-clip pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* ─── Filter / search bar */}
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="border-cyan/15 bg-navy/40 sticky top-20 z-30 -mx-2 mb-12 rounded-3xl border p-4 backdrop-blur-xl sm:top-24 sm:mx-0 sm:p-5"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5">
              {/* Search */}
              <label className="border-cyan/20 bg-cyan/[0.04] focus-within:border-mint relative flex h-12 flex-1 items-center gap-3 rounded-full border px-5 transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-foreground/60 shrink-0"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search designs, themes, tags..."
                  className="text-foreground placeholder:text-foreground/40 h-full w-full bg-transparent text-sm outline-none"
                  aria-label="Search creatives"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-foreground/50 hover:text-mint cursor-pointer text-xs tracking-widest uppercase"
                  >
                    Clear
                  </button>
                )}
              </label>

              {/* Format toggle */}
              <div className="border-cyan/15 bg-navy-deep/40 flex shrink-0 items-center gap-1 rounded-full border p-1">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={cn(
                      'relative cursor-pointer rounded-full px-4 py-2 text-xs tracking-wider whitespace-nowrap uppercase transition-colors',
                      format === f.id
                        ? 'text-navy-deep'
                        : 'text-foreground/70 hover:text-mint',
                    )}
                  >
                    {format === f.id && (
                      <m.span
                        layoutId="format-pill"
                        className="bg-mint absolute inset-0 -z-0 rounded-full"
                        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                      />
                    )}
                    <span className="relative z-10">{f.label.split('·')[0].trim()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category chips */}
            <div className="border-line mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
              {CATEGORIES.map((c) => {
                const active = category === c.id
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      'cursor-pointer rounded-full border px-3.5 py-1.5 text-xs tracking-wider uppercase transition-all',
                      active
                        ? 'border-mint text-mint bg-mint/10'
                        : 'border-cyan/15 text-foreground/65 hover:border-cyan/40 hover:text-foreground',
                    )}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>
          </m.div>

          {/* ─── Result count */}
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-cyan/80 mb-8 flex items-center justify-between font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            <span>
              <span className="text-mint">{filtered.length}</span>
              {' / '}
              {counts.total} designs
            </span>
            <span className="hidden sm:inline">Click any tile to open full view</span>
          </m.div>

          {/* ─── Gallery grid */}
          {filtered.length === 0 ? (
            <EmptyState onReset={() => { setQuery(''); setCategory('all'); setFormat('all') }} />
          ) : (
            <m.div
              key={`${category}-${format}-${query}`}
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </AnimatePresence>
            </m.div>
          )}
        </div>
      </section>
    </>
  )
}

/* ────────────────────────────────────────────────────────────── */

function PostCard({ post }) {
  return (
    <m.div
      layout
      variants={cardReveal}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      className="group relative h-full"
    >
      <Link href={`/social-media-posts/${post.slug}`} className="block h-full cursor-pointer">
        <div className="border-cyan/15 bg-navy-deep/60 group-hover:border-mint/40 relative flex h-full flex-col overflow-hidden rounded-2xl border backdrop-blur-md transition-colors duration-500">
          {/* Preview frame — preserves true aspect ratio, no cropping */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: post.aspectRatio }}
          >
            <Image
              src={`/social-media/previews/${post.preview}`}
              alt={`${post.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              priority={false}
            />

            {/* Soft gradient veil — preserves the design but adds depth on hover */}
            <div className="from-navy-deep/40 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Format badge */}
            <span className="border-cyan/30 bg-navy-deep/75 text-mint absolute top-3 left-3 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase backdrop-blur">
              {post.format === 'feed' ? '1:1 · Feed' : '9:16 · Story'}
            </span>

            {/* Index */}
            <span className="border-cyan/20 bg-navy-deep/75 text-foreground/85 absolute top-3 right-3 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-widest backdrop-blur">
              {post.index}
            </span>

            {/* Open arrow */}
            <span className="border-mint/40 bg-mint text-navy-deep absolute right-3 bottom-3 grid h-9 w-9 translate-y-3 place-items-center rounded-full border opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </div>

          {/* Meta */}
          <div className="border-line flex flex-col gap-1 border-t p-5">
            <span className="text-cyan/75 font-mono text-[10px] tracking-[0.25em] uppercase">
              {post.subtitle}
            </span>
            <h3 className="font-display text-foreground group-hover:text-mint text-lg leading-tight font-medium transition-colors">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
    </m.div>
  )
}

function EmptyState({ onReset }) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className="border-cyan/15 bg-navy-deep/40 mx-auto flex max-w-xl flex-col items-center gap-5 rounded-3xl border px-8 py-16 text-center"
    >
      <div className="border-mint/30 grid h-14 w-14 place-items-center rounded-full border">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          className="text-mint"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-display text-foreground text-2xl font-medium">No designs match</h3>
      <p className="text-foreground/65 text-sm">
        Try a different search term, category, or format toggle.
      </p>
      <Button variant="secondary" size="md" onClick={onReset}>
        Reset filters
      </Button>
    </m.div>
  )
}
