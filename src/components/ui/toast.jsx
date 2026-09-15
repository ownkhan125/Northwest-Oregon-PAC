'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { AnimatePresence, m } from 'motion/react'
import { EASE } from '@/animations/variants'

const ToastContext = createContext(null)

const DEFAULT_DURATION = 4000
const MAX_VISIBLE = 3

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ eyebrow, title, description, action, duration = DEFAULT_DURATION }) => {
      const id = ++counter.current
      setToasts((prev) => [
        ...prev.slice(-(MAX_VISIBLE - 1)),
        { id, eyebrow, title, description, action },
      ])
      if (duration > 0) window.setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Sits under the fixed navbar and clear of the cookie banner at the
          bottom. Full-width on phones, a fixed column from sm up. */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-3 top-20 z-[70] flex flex-col items-end gap-3 sm:inset-x-auto sm:top-24 sm:right-5 sm:w-96"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <m.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE }}
              role="status"
              className="border-primary/25 bg-surface/95 supports-[backdrop-filter]:bg-surface/85 pointer-events-auto w-full rounded-2xl border p-4 shadow-[0_24px_60px_-24px_rgba(46,69,56,0.45)] backdrop-blur-md"
            >
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  {t.eyebrow && (
                    <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                      {t.eyebrow}
                    </div>
                  )}
                  <div className="text-foreground mt-1 text-sm font-medium">{t.title}</div>
                  {t.description && (
                    <div className="text-foreground/70 mt-0.5 text-xs">{t.description}</div>
                  )}
                  {t.action && (
                    <Link
                      href={t.action.href}
                      onClick={() => dismiss(t.id)}
                      className="text-primary hover:text-highlight mt-3 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase transition-colors"
                    >
                      {t.action.label}
                      <svg
                        width="12"
                        height="12"
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
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss"
                  className="text-foreground/50 hover:text-primary -mt-1 -mr-1 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full transition-colors"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </m.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

/**
 * Fire a toast. Must be used inside <ToastProvider>.
 * @returns {{
 *   toast: (opts: { eyebrow?: string, title: string, description?: string,
 *            action?: { label: string, href: string }, duration?: number }) => number,
 *   dismiss: (id: number) => void,
 * }}
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export default ToastProvider
