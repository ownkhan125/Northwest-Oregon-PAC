'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, m } from 'motion/react'
import Button from '@/components/ui/button'
import SplitText from '@/components/ui/split-text'
import { cardReveal, fadeUp, stagger, EASE } from '@/animations/variants'
import {
  getCategoryLabel,
  getPostNeighbors,
  getRelatedPosts,
} from '@/data/social-posts'

export default function SocialPostDetailPage({ post }) {
  const { prev, next } = getPostNeighbors(post.slug)
  const related = getRelatedPosts(post.slug, 3)
  const [fullView, setFullView] = useState(false)

  return (
    <>
      {/* ─── Header / breadcrumbs */}
      <section className="relative isolate overflow-x-clip pt-28 pb-8 sm:pt-32 lg:pt-36">
        <div aria-hidden className="grid-overlay opacity-40" />
        <div
          aria-hidden
          className="bg-cyan/15 pointer-events-none absolute top-20 -left-32 -z-10 h-[40vmin] w-[40vmin] rounded-full blur-3xl"
        />
        <div
          aria-hidden
          className="bg-mint/10 pointer-events-none absolute top-10 -right-20 -z-10 h-[35vmin] w-[35vmin] rounded-full blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-cyan/80 flex flex-wrap items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase"
          >
            <Link href="/social-media-posts" className="hover:text-mint cursor-pointer">
              Social Posts
            </Link>
            <span className="bg-cyan/40 h-px w-6" />
            <span className="text-mint">{getCategoryLabel(post.category)}</span>
            <span className="bg-cyan/40 h-px w-6" />
            <span>{post.format === 'feed' ? '1:1 · Feed' : '9:16 · Story'}</span>
          </m.div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="font-display text-mint text-3xl leading-none font-medium italic">
                  {post.index}
                </span>
                <span className="bg-line h-6 w-px" />
                <span className="text-foreground/65 font-mono text-[11px] tracking-[0.25em] uppercase">
                  {post.subtitle}
                </span>
              </div>
              <SplitText
                as="h1"
                by="word"
                staggerChildren={0.05}
                inView={false}
                text={post.title}
                className="font-display text-foreground text-[clamp(2rem,6vw,4.5rem)] leading-[1.02] font-medium tracking-tight"
              />
            </div>

            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap items-center gap-2"
            >
              <Button
                href={`/social-media/posts/${post.file}`}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
                size="md"
              >
                Open raw
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
              </Button>
              <Button variant="primary" size="md" onClick={() => setFullView(true)}>
                Full view
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
                  <path d="M4 9V4h5M20 15v5h-5M4 15v5h5M20 9V4h-5" />
                </svg>
              </Button>
            </m.div>
          </div>
        </div>
      </section>

      {/* ─── Preview + meta */}
      <section className="relative overflow-x-clip pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Live preview */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className={`lg:col-span-8 ${post.format === 'story' ? 'lg:col-span-7' : ''}`}
            >
              <LivePreview post={post} onExpand={() => setFullView(true)} />
            </m.div>

            {/* Meta panel */}
            <m.aside
              variants={stagger}
              initial="hidden"
              animate="show"
              className={`flex flex-col gap-6 lg:col-span-4 ${post.format === 'story' ? 'lg:col-span-5' : ''}`}
            >
              <m.div
                variants={cardReveal}
                className="border-cyan/15 bg-navy-deep/55 rounded-2xl border p-6 backdrop-blur-md"
              >
                <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                  About this design
                </div>
                <p className="text-foreground/80 mt-4 text-[15px] leading-relaxed">
                  {post.description}
                </p>
              </m.div>

              <m.dl
                variants={cardReveal}
                className="border-cyan/15 bg-navy-deep/55 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border p-6 backdrop-blur-md"
              >
                <MetaRow label="Format" value={post.format === 'feed' ? 'Feed · 1:1' : 'Story · 9:16'} />
                <MetaRow label="Canvas" value={`${post.width} × ${post.height}`} />
                <MetaRow label="Category" value={getCategoryLabel(post.category)} />
                <MetaRow label="Index" value={post.index} />
              </m.dl>

              {post.tags?.length > 0 && (
                <m.div variants={cardReveal} className="flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="border-cyan/20 bg-cyan/[0.04] text-foreground/75 rounded-full border px-3 py-1.5 text-[11px] tracking-wider uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </m.div>
              )}

              <m.div variants={cardReveal} className="flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" size="md" onClick={() => setFullView(true)}>
                  View at full size
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  href={`/social-media/posts/${post.file}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in new tab
                </Button>
              </m.div>
            </m.aside>
          </div>

          {/* ─── Prev / Next nav */}
          <m.nav
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="border-line mt-16 grid grid-cols-1 gap-4 border-t pt-10 sm:grid-cols-2"
          >
            <NavLink direction="prev" post={prev} />
            <NavLink direction="next" post={next} />
          </m.nav>

          {/* ─── Related */}
          {related.length > 0 && (
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mt-20"
            >
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <div className="text-cyan/80 font-mono text-[11px] tracking-[0.3em] uppercase">
                    More in {getCategoryLabel(post.category)}
                  </div>
                  <h2 className="font-display mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                    Related designs
                  </h2>
                </div>
                <Link
                  href="/social-media-posts"
                  className="text-cyan hover:text-mint hidden items-center gap-2 text-xs tracking-widest uppercase transition-colors sm:inline-flex"
                >
                  See all
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <m.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {related.map((r) => (
                  <m.div key={r.slug} variants={cardReveal}>
                    <Link href={`/social-media-posts/${r.slug}`} className="group block">
                      <div className="border-cyan/15 bg-navy-deep/60 group-hover:border-mint/40 overflow-hidden rounded-2xl border transition-colors duration-500">
                        <div
                          className="relative w-full"
                          style={{ aspectRatio: r.aspectRatio }}
                        >
                          <Image
                            src={`/social-media/previews/${r.preview}`}
                            alt={r.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <span className="font-display text-foreground group-hover:text-mint text-base font-medium transition-colors">
                            {r.title}
                          </span>
                          <span className="text-cyan/75 font-mono text-[10px] tracking-widest uppercase">
                            {r.index}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </m.div>
                ))}
              </m.div>
            </m.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {fullView && <FullViewOverlay post={post} onClose={() => setFullView(false)} />}
      </AnimatePresence>
    </>
  )
}

/* ────────────────────────────────────────────────────────────── */

function LivePreview({ post, onExpand }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const w = el.clientWidth
      setScale(w / post.width)
    }
    compute()
    const obs = new ResizeObserver(compute)
    obs.observe(el)
    return () => obs.disconnect()
  }, [post.width])

  const scaledHeight = post.height * scale

  return (
    <div className="border-cyan/15 bg-navy-deep/60 group relative overflow-hidden rounded-3xl border p-3 backdrop-blur-md sm:p-4">
      <div className="border-cyan/10 bg-navy-deep/40 mb-3 flex items-center justify-between rounded-full border px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="text-foreground/60 font-mono text-[10px] tracking-widest uppercase">
          {post.file}
        </span>
        <button
          type="button"
          onClick={onExpand}
          className="text-foreground/60 hover:text-mint cursor-pointer font-mono text-[10px] tracking-widest uppercase"
        >
          Expand ↗
        </button>
      </div>

      <div
        ref={containerRef}
        className="bg-navy-deep relative w-full overflow-hidden rounded-2xl"
        style={{
          height: scaledHeight > 0 ? `${scaledHeight}px` : undefined,
          aspectRatio: scaledHeight > 0 ? undefined : post.aspectRatio,
        }}
      >
        {/* PNG fallback — always renders so the frame is never empty */}
        <Image
          src={`/social-media/previews/${post.preview}`}
          alt={`${post.title} preview`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain"
          priority
        />
        <iframe
          src={`/social-media/posts/${post.file}`}
          title={post.title}
          scrolling="no"
          onLoad={() => {
            // small delay so fonts/layout settle before crossfading the PNG
            setTimeout(() => setLoaded(true), 400)
          }}
          style={{
            width: `${post.width}px`,
            height: `${post.height}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            border: 0,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </div>
    </div>
  )
}

function MetaRow({ label, value }) {
  return (
    <div>
      <dt className="text-cyan/75 font-mono text-[10px] tracking-[0.25em] uppercase">{label}</dt>
      <dd className="text-foreground mt-1.5 text-sm">{value}</dd>
    </div>
  )
}

function NavLink({ direction, post }) {
  if (!post) return <div />
  const isPrev = direction === 'prev'
  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className={`group border-cyan/15 hover:border-mint/40 bg-navy-deep/40 flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors ${
        isPrev ? '' : 'sm:flex-row-reverse sm:text-right'
      }`}
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-lg"
        style={{
          aspectRatio: post.aspectRatio,
          width: post.format === 'story' ? '48px' : '72px',
        }}
      >
        <Image
          src={`/social-media/previews/${post.preview}`}
          alt={post.title}
          fill
          sizes="72px"
          className="object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-cyan/75 font-mono text-[10px] tracking-[0.25em] uppercase">
          {isPrev ? '← Previous' : 'Next →'}
        </div>
        <div className="font-display text-foreground group-hover:text-mint mt-1 truncate text-base font-medium transition-colors">
          {post.title}
        </div>
        <div className="text-foreground/55 mt-0.5 truncate text-[11px] tracking-wider uppercase">
          {post.subtitle}
        </div>
      </div>
    </Link>
  )
}

function FullViewOverlay({ post, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const compute = () => {
      const padding = 24
      const w = el.clientWidth - padding * 2
      const h = el.clientHeight - padding * 2
      const s = Math.min(w / post.width, h / post.height)
      setScale(Math.max(s, 0.1))
    }
    compute()
    const obs = new ResizeObserver(compute)
    obs.observe(el)
    return () => obs.disconnect()
  }, [post.width, post.height])

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex flex-col"
    >
      <div className="bg-navy-deep/95 absolute inset-0 backdrop-blur-2xl" onClick={onClose} />

      <div className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="font-display text-mint text-2xl font-medium italic">{post.index}</span>
          <span className="bg-line h-5 w-px" />
          <span className="font-display text-foreground text-base font-medium sm:text-lg">
            {post.title}
          </span>
          <span className="text-foreground/55 hidden font-mono text-[10px] tracking-widest uppercase sm:inline">
            · {post.width}×{post.height}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full view"
          className="border-cyan/20 text-foreground hover:border-mint hover:text-mint grid h-10 w-10 cursor-pointer place-items-center rounded-full border backdrop-blur transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: EASE }}
        ref={containerRef}
        className="relative z-10 flex flex-1 items-center justify-center overflow-auto px-6 pb-6"
      >
        <div
          className="border-cyan/15 bg-navy-deep relative overflow-hidden rounded-2xl border shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)]"
          style={{
            width: `${post.width * scale}px`,
            height: `${post.height * scale}px`,
          }}
        >
          <iframe
            src={`/social-media/posts/${post.file}`}
            title={`${post.title} — full view`}
            scrolling="no"
            style={{
              width: `${post.width}px`,
              height: `${post.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              border: 0,
            }}
            className="block"
          />
        </div>
      </m.div>

      <div className="text-foreground/55 relative z-10 px-5 pb-5 text-center font-mono text-[10px] tracking-widest uppercase">
        Press Esc · or tap outside · to close
      </div>
    </m.div>
  )
}
