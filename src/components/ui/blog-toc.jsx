'use client'

import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { AnimatePresence, m } from 'motion/react'
import { cn } from '@/lib/cn'

const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 100
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function BlogToc({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!items.length) return
    const observed = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        // Track the entry currently closest to the top of the viewport.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-15% 0px -70% 0px', threshold: [0, 1] },
    )
    observed.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  const onClick = useCallback((id) => {
    setOpen(false)
    setActiveId(id)
    scrollToId(id)
  }, [])

  if (!items.length) return null

  const activeItem = items.find((it) => it.id === activeId) || items[0]

  return (
    <>
      {/* Mobile / tablet: collapsible summary bar */}
      <div className="border-border bg-surface sticky top-24 z-30 mb-8 rounded-2xl border p-3 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="blog-toc-mobile"
          className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="text-highlight block font-mono text-[10px] tracking-[0.3em] uppercase">
              On this page
            </span>
            <span className="text-foreground mt-1 block truncate text-sm">
              {activeItem.text}
            </span>
          </span>
          <m.span
            aria-hidden
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-primary grid h-8 w-8 shrink-0 place-items-center rounded-md"
          >
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
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </m.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <m.ol
              id="blog-toc-mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-primary/15 mt-2 space-y-1 border-t pt-3">
                {items.map((it) => (
                  <li key={it.id}>
                    <button
                      type="button"
                      onClick={() => onClick(it.id)}
                      className={cn(
                        'block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors',
                        it.level === 3 && 'pl-6 text-xs',
                        activeId === it.id
                          ? 'text-primary bg-surface-alt/60'
                          : 'text-foreground/75 hover:text-primary',
                      )}
                    >
                      {it.text}
                    </button>
                  </li>
                ))}
              </div>
            </m.ol>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: sticky sidebar */}
      <nav
        aria-label="Article contents"
        className="sticky top-32 hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 lg:block"
      >
        <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
          On this page
        </div>
        <ol className="mt-4 space-y-1">
          {items.map((it) => {
            const isActive = activeId === it.id
            return (
              <li key={it.id}>
                <button
                  type="button"
                  onClick={() => onClick(it.id)}
                  className={cn(
                    'group relative block w-full rounded-md py-1.5 pr-3 pl-4 text-left text-sm transition-colors',
                    it.level === 3 && 'pl-8 text-xs',
                    isActive
                      ? 'text-primary'
                      : 'text-foreground/65 hover:text-foreground',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'absolute top-1/2 left-0 h-[70%] w-px -translate-y-1/2 transition-colors',
                      isActive ? 'bg-primary' : 'bg-border group-hover:bg-primary/40',
                    )}
                  />
                  {it.text}
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

BlogToc.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      level: PropTypes.oneOf([2, 3]).isRequired,
    }),
  ).isRequired,
}
