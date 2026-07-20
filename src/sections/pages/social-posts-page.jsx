'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import { cardReveal, stagger, EASE } from '@/animations/variants'
import { feedPosts, storyPosts } from '@/data/social-posts'
import { pac } from '@/data/pac'

function SectionMarker({ number, label, size }) {
  return (
    <div className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
      <span className="text-primary">{number}</span>
      <span className="bg-highlight/40 h-px w-8" />
      <span>{label}</span>
      <span className="text-foreground/50 ml-auto tracking-[0.2em]">{size}</span>
    </div>
  )
}

function FeedCard({ post, index }) {
  return (
    <m.article
      variants={cardReveal}
      className="border-border bg-surface group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border transition-colors hover:border-primary/40"
    >
      <div className="relative block aspect-square w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-50"
        />
        <span className="border-primary/40 bg-surface/85 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
          {post.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="text-foreground/60 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>Feed {String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden className="bg-border h-3 w-px" />
          <span>{post.size}</span>
        </div>

        <h3 className="font-display text-foreground group-hover:text-primary text-lg leading-tight font-medium tracking-tight transition-colors sm:text-xl">
          {post.title}
        </h3>

        <p className="text-foreground/75 text-sm">{post.caption}</p>
      </div>
    </m.article>
  )
}

function StoryCard({ post, index }) {
  return (
    <m.article
      variants={cardReveal}
      className="border-border bg-surface group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border transition-colors hover:border-primary/40"
    >
      <div className="relative block aspect-[9/16] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-50"
        />
        <span className="border-primary/40 bg-surface/85 text-primary absolute top-3 left-3 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.2em] uppercase">
          {post.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-foreground/60 font-mono text-[9px] tracking-[0.25em] uppercase">
          Story {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="font-display text-foreground group-hover:text-primary text-sm leading-snug font-medium tracking-tight transition-colors sm:text-base">
          {post.title}
        </h3>
      </div>
    </m.article>
  )
}

export default function SocialPostsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Social"
        number="11"
        title="Made to be shared."
        description="Ready-to-post graphics carrying one consistent voice for Northwest Oregon — squares for the feed, verticals for the story. Preview each layout below."
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <SectionMarker number="01" label="Feed posts" size="1080 × 1080" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {feedPosts.map((post, i) => (
                <FeedCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </m.div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
            className="mt-20"
          >
            <SectionMarker number="02" label="Story posts" size="1080 × 1920" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
              {storyPosts.map((post, i) => (
                <StoryCard key={post.id} post={post} index={i} />
              ))}
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border-primary/25 bg-surface-alt/50 mt-20 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Post it forward
              </div>
              <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Share these with your neighbors.
              </h2>
              <p className="text-foreground/75 mt-3 max-w-xl text-sm sm:text-base">
                Follow along for the finished graphics, then pair one with your own words and tag{' '}
                {pac.name}.
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
              </a>
              <Link
                href="/contact"
                className="text-primary group/link inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors hover:text-highlight"
              >
                Request a format
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover/link:translate-x-1"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
