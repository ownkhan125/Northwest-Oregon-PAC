'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'
import { getResolvedTheme } from '@/lib/resolved-theme'

// Applies the initial theme synchronously (before body renders) so
// Tailwind's `dark:*` utilities have the right class to key off on the
// first paint. Rendered as a plain <script> tag (not next/script), since
// `next/script` with strategy=beforeInteractive queues inline scripts
// into __next_s and defers execution until after hydration — the exact
// opposite of what we need for a pre-paint class toggle.
//
// The stored value is strictly validated: an unrecognized value (a
// leftover from an older schema, a hand-edited localStorage entry) used
// to be applied verbatim as a class, leaving <html> with neither `.dark`
// nor `.light`. In that state the CSS still resolved to dark on OS-dark
// machines via the `prefers-color-scheme` media query, but the logo —
// which keyed off the class — showed the light-background artwork on the
// dark background until the second toggle click. Explicitly falling back
// to the OS preference guarantees exactly one of `dark`/`light` is set.
export const ThemeInit = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var s=localStorage.getItem('nwop-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=(s==='dark'||s==='light')?s:p;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);}catch(e){}})();`,
    }}
  />
)

export default function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  // Sync the toggle's icon to the RESOLVED theme (see resolved-theme.js) —
  // not just the class — so the icon and click direction stay consistent
  // with what the browser is actually painting, even in the edge case
  // where `<html>` momentarily has no theme class.
  useIsomorphicLayoutEffect(() => {
    const html = document.documentElement
    const sync = () => setTheme(getResolvedTheme(html))
    sync()
    setMounted(true)
    const observer = new MutationObserver(sync)
    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    mql.addEventListener('change', sync)
    return () => {
      observer.disconnect()
      mql.removeEventListener('change', sync)
    }
  }, [])

  const toggle = () => {
    // Read the RESOLVED theme (class OR media query) so the first click
    // actually flips whatever the user is currently seeing. Reading only
    // the class was the source of the "first click only updates the logo"
    // bug: when no class was set and OS-dark was applying dark via CSS,
    // the click read `light` and re-added `dark` — a no-op for the page
    // background, but a flip for the class-keyed logo.
    const root = document.documentElement
    const current = getResolvedTheme(root)
    const next = current === 'dark' ? 'light' : 'dark'
    root.classList.remove('light', 'dark')
    root.classList.add(next)
    try {
      localStorage.setItem('nwop-theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
      aria-pressed={mounted ? isDark : undefined}
      className={
        'text-foreground hover:border-primary/50 hover:text-primary border-border relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors ' +
        className
      }
    >
      <m.span
        aria-hidden
        initial={false}
        animate={{ rotate: isDark ? 40 : 0, opacity: isDark ? 0 : 1, scale: isDark ? 0.7 : 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inline-flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </m.span>
      <m.span
        aria-hidden
        initial={false}
        animate={{ rotate: isDark ? 0 : -40, opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.7 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inline-flex"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M20 15a8 8 0 0 1-11-11 8.5 8.5 0 1 0 11 11z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      </m.span>
    </button>
  )
}
