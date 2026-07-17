'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import { cardReveal, fadeUp, stagger, EASE } from '@/animations/variants'
import { formatBlogDate } from '@/data/blogs'

function BlogCard({ post, featured = false }) {
  return (
    <m.article
      variants={featured ? fadeUp : cardReveal}
      className={
        featured
          ? 'border-border bg-surface group relative isolate flex flex-col overflow-hidden rounded-3xl border transition-colors hover:border-primary/40 lg:flex-row'
          : 'border-border bg-surface group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border transition-colors hover:border-primary/40'
      }
    >
      <Link
        href={`/blogs/${post.slug}`}
        className={
          featured
            ? 'relative block aspect-[16/10] w-full overflow-hidden lg:aspect-auto lg:w-1/2'
            : 'relative block aspect-[16/10] w-full overflow-hidden'
        }
      >
        {post.heroImage ? (
          <img
            src={post.heroImage}
            alt={post.heroAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="from-primary/25 via-surface-alt to-surface-alt h-full w-full bg-gradient-to-br" />
        )}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60"
        />
        <span className="border-primary/40 bg-surface/85 text-primary absolute top-4 left-4 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
          {post.category}
        </span>
      </Link>

      <div
        className={
          featured
            ? 'flex flex-1 flex-col gap-4 p-7 sm:p-10 lg:justify-between'
            : 'flex flex-1 flex-col gap-4 p-6 sm:p-7'
        }
      >
        <div className="text-foreground/60 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
          <span>{formatBlogDate(post.date)}</span>
          <span aria-hidden className="bg-border h-3 w-px" />
          <span>{post.readingMinutes} min read</span>
        </div>

        <h3
          className={
            featured
              ? 'font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl'
              : 'font-display text-foreground text-xl leading-tight font-medium tracking-tight sm:text-2xl'
          }
        >
          <Link
            href={`/blogs/${post.slug}`}
            className="group-hover:text-primary transition-colors"
          >
            {post.title}
          </Link>
        </h3>

        <p
          className={
            featured
              ? 'text-foreground/80 text-base sm:text-lg'
              : 'text-foreground/75 text-sm sm:text-base'
          }
        >
          {post.excerpt}
        </p>

        <div className={featured ? 'mt-2 flex items-center justify-between gap-4' : 'mt-auto pt-2'}>
          <span className="text-muted text-xs">By {post.author}</span>
          <Link
            href={`/blogs/${post.slug}`}
            className="text-primary group/link inline-flex cursor-pointer items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors hover:text-highlight"
          >
            Read article
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
      </div>
    </m.article>
  )
}

export default function BlogsPage({ posts = [] }) {
  const [featured, ...rest] = posts

  return (
    <>
      <PageHeader
        eyebrow="Blogs"
        number="10"
        title="Field notes from Northwest Oregon."
        description="Working essays on the policy fights, endorsements, and neighborhood-level work that shapes our region. Written by the people doing it."
      />

      <section className="relative isolate overflow-x-clip pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {posts.length === 0 && (
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="border-primary/25 bg-surface-alt/60 mx-auto rounded-3xl border p-10 text-center sm:p-14"
            >
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Field notes coming online
              </div>
              <h2 className="font-display text-primary mt-4 text-3xl font-medium sm:text-4xl">
                New essays are on the way.
              </h2>
              <p className="text-foreground/75 mx-auto mt-4 max-w-xl">
                We&rsquo;re preparing the first working essays for the region — check back shortly,
                or subscribe below to hear when the first one publishes.
              </p>
            </m.div>
          )}

          {featured && (
            <m.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <div className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                <span className="text-primary">01</span>
                <span className="bg-highlight/40 h-px w-8" />
                <span>Latest</span>
              </div>
              <BlogCard post={featured} featured />
            </m.div>
          )}

          {rest.length > 0 && (
            <div className="mt-16">
              <div className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
                <span className="text-primary">02</span>
                <span className="bg-highlight/40 h-px w-8" />
                <span>More reading</span>
              </div>

              <m.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </m.div>
            </div>
          )}

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="border-primary/25 bg-surface-alt/50 mt-20 flex flex-col items-start gap-6 rounded-3xl border p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                Want the next one first?
              </div>
              <h2 className="font-display text-foreground mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
                Get new essays in your inbox.
              </h2>
            </div>
            <Link
              href="/ask"
              className="border-primary bg-primary text-primary-fg hover:bg-primary/90 inline-flex items-center gap-3 rounded-full border px-6 py-3 text-sm tracking-widest uppercase transition-colors"
            >
              Send us a note
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
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </m.div>
        </div>
      </section>
    </>
  )
}
