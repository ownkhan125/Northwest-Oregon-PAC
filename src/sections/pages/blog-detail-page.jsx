'use client'

import Link from 'next/link'
import PropTypes from 'prop-types'
import { m } from 'motion/react'
import Breadcrumb from '@/components/ui/breadcrumb'
import BlogToc from '@/components/ui/blog-toc'
import ReadingProgress from '@/components/ui/reading-progress'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { formatBlogDate, tocFromBody } from '@/data/blogs'

const shareLinks = (post) => {
  const url = `https://northwestoregon.com/blogs/${post.slug}`
  const title = encodeURIComponent(post.title)
  return [
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`,
      icon: (
        <path
          d="M4 4l16 16M20 4L4 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ),
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: (
        <path
          d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.6 1.7-1.6H17V2.5c-.4 0-1.5-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V10H7v4h2.8v8H13Z"
          fill="currentColor"
        />
      ),
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ),
    },
    {
      label: 'Copy link',
      href: url,
      copy: true,
      icon: (
        <path
          d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ),
    },
  ]
}

function ShareButtons({ post }) {
  const links = shareLinks(post)
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
        Share
      </span>
      {links.map((s) => {
        const commonClass =
          'border-border text-foreground/80 hover:border-primary hover:text-primary grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors'
        if (s.copy) {
          return (
            <button
              type="button"
              key={s.label}
              onClick={() => {
                if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(s.href).catch(() => null)
                }
              }}
              aria-label={s.label}
              className={commonClass}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                {s.icon}
              </svg>
            </button>
          )
        }
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className={commonClass}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              {s.icon}
            </svg>
          </a>
        )
      })}
    </div>
  )
}

ShareButtons.propTypes = {
  post: PropTypes.object.isRequired,
}

function ArticleBody({ body }) {
  return (
    <m.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-5% 0px' }}
      className="space-y-8"
    >
      {body.map((block, i) => {
        if (block.type === 'heading') {
          const Tag = block.level === 2 ? 'h2' : 'h3'
          const className =
            block.level === 2
              ? 'font-display text-foreground scroll-mt-32 pt-6 text-3xl leading-tight font-medium tracking-tight sm:text-4xl'
              : 'font-display text-foreground scroll-mt-32 pt-4 text-xl leading-tight font-medium tracking-tight sm:text-2xl'
          return (
            <m.div key={i} variants={fadeUp}>
              <Tag id={block.id} className={className}>
                {block.text}
              </Tag>
            </m.div>
          )
        }
        if (block.type === 'paragraph') {
          return (
            <m.p
              key={i}
              variants={fadeUp}
              className="text-foreground/85 text-base leading-relaxed sm:text-lg"
            >
              {block.text}
            </m.p>
          )
        }
        if (block.type === 'image') {
          return (
            <m.figure key={i} variants={fadeUp} className="my-4">
              <div className="border-border overflow-hidden rounded-2xl border">
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              {block.caption && (
                <figcaption className="text-muted mt-3 text-center text-xs tracking-wide">
                  {block.caption}
                </figcaption>
              )}
            </m.figure>
          )
        }
        if (block.type === 'quote') {
          return (
            <m.blockquote
              key={i}
              variants={fadeUp}
              className="border-primary/40 bg-surface-alt/40 my-2 rounded-2xl border-l-4 px-6 py-5 sm:px-8 sm:py-7"
            >
              <p className="font-display text-primary text-xl leading-snug sm:text-2xl md:text-3xl">
                “{block.text}”
              </p>
              {block.cite && (
                <footer className="text-muted mt-4 font-mono text-[10px] tracking-[0.3em] uppercase">
                  — {block.cite}
                </footer>
              )}
            </m.blockquote>
          )
        }
        return null
      })}
    </m.div>
  )
}

ArticleBody.propTypes = { body: PropTypes.array.isRequired }

function PrevNext({ prev, next }) {
  if (!prev && !next) return null
  return (
    <nav
      aria-label="Article navigation"
      className="border-primary/15 mt-16 grid grid-cols-1 gap-4 border-t pt-10 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/blogs/${prev.slug}`}
          className="group border-border bg-surface hover:border-primary/40 flex flex-col gap-2 rounded-2xl border p-5 transition-colors"
        >
          <span className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            ← Previous
          </span>
          <span className="font-display text-foreground group-hover:text-primary text-lg leading-snug font-medium transition-colors sm:text-xl">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blogs/${next.slug}`}
          className="group border-border bg-surface hover:border-primary/40 flex flex-col items-end gap-2 rounded-2xl border p-5 text-right transition-colors sm:text-right"
        >
          <span className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
            Next →
          </span>
          <span className="font-display text-foreground group-hover:text-primary text-lg leading-snug font-medium transition-colors sm:text-xl">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}

PrevNext.propTypes = { prev: PropTypes.object, next: PropTypes.object }

function RelatedArticles({ items }) {
  if (!items?.length) return null
  return (
    <section className="relative isolate overflow-x-clip py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="text-highlight mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
          <span className="text-primary">Related</span>
          <span className="bg-highlight/40 h-px w-8" />
          <span>More reading</span>
        </div>
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="Keep going."
          className="font-display text-foreground text-3xl leading-tight font-medium tracking-tight sm:text-4xl md:text-5xl"
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {items.map((post) => (
            <m.div key={post.slug} variants={fadeUp}>
              <Card className="h-full overflow-hidden p-0" interactive={false} tilt={false}>
                <Link href={`/blogs/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.heroAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <span className="border-primary/40 bg-surface/85 text-primary absolute top-3 left-3 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase">
                      {post.category}
                    </span>
                  </div>
                  <div className="space-y-3 p-6 sm:p-7">
                    <div className="text-foreground/60 flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
                      <span>{formatBlogDate(post.date)}</span>
                      <span aria-hidden className="bg-border h-3 w-px" />
                      <span>{post.readingMinutes} min read</span>
                    </div>
                    <h3 className="font-display text-foreground group-hover:text-primary text-xl leading-tight font-medium transition-colors sm:text-2xl">
                      {post.title}
                    </h3>
                    <p className="text-foreground/75 text-sm sm:text-base">{post.excerpt}</p>
                  </div>
                </Link>
              </Card>
            </m.div>
          ))}
        </m.div>
      </div>
    </section>
  )
}

RelatedArticles.propTypes = { items: PropTypes.array }

export default function BlogDetailPage({ post, prev, next, related }) {
  const toc = tocFromBody(post.body)

  return (
    <>
      <ReadingProgress targetId="article-body" />

      {/* Hero */}
      <section className="relative isolate overflow-x-clip pt-28 pb-12 sm:pt-32 lg:pt-36">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blogs', href: '/blogs' },
              { label: post.category, href: '/blogs' },
              { label: post.title },
            ]}
          />

          <div className="mt-8">
            <div className="text-highlight flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase">
              <span className="text-primary">{post.category}</span>
              <span className="bg-highlight/40 h-px w-8" />
              <span>{formatBlogDate(post.date)}</span>
              <span aria-hidden className="bg-highlight/40 h-3 w-px" />
              <span>{post.readingMinutes} min read</span>
            </div>

            <SplitText
              as="h1"
              by="word"
              staggerChildren={0.05}
              inView={false}
              text={post.title}
              className="font-display text-foreground mt-6 text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-medium tracking-tight"
            />

            <div className="border-primary/15 mt-10 flex flex-wrap items-center justify-between gap-6 border-t pt-6">
              <div>
                <div className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Written by
                </div>
                <div className="text-foreground/85 mt-1">
                  {post.author}
                  {post.authorRole && (
                    <span className="text-foreground/55"> · {post.authorRole}</span>
                  )}
                </div>
              </div>
              <ShareButtons post={post} />
            </div>
          </div>

          <m.figure
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="border-border relative mt-10 overflow-hidden rounded-3xl border"
          >
            <img
              src={post.heroImage}
              alt={post.heroAlt}
              className="aspect-[16/9] w-full object-cover"
            />
          </m.figure>
        </div>
      </section>

      {/* Body with sticky TOC */}
      <section className="relative isolate overflow-x-clip pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <BlogToc items={toc} />
            </aside>

            <div id="article-body" className="lg:col-span-9">
              <div className="max-w-3xl">
                <ArticleBody body={post.body} />
                <PrevNext prev={prev} next={next} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedArticles items={related} />
    </>
  )
}

BlogDetailPage.propTypes = {
  post: PropTypes.object.isRequired,
  prev: PropTypes.object,
  next: PropTypes.object,
  related: PropTypes.array,
}
