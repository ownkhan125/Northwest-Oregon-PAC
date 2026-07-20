'use client'

import { useState } from 'react'
import { m } from 'motion/react'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

// Applies the initial theme synchronously (before hydration) to avoid a flash.
// Included in the app layout so it runs once at page load.
export const ThemeInit = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var s=localStorage.getItem('nwop-theme');var p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var t=s||p;var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);}catch(e){}})();`,
    }}
  />
)

export default function ThemeToggle({ className = '' }) {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState('light')

  // Sync the toggle's icon to the real DOM class before the first paint so
  // the button is never showing the wrong icon by the time the user can click.
  useIsomorphicLayoutEffect(() => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    setTheme(current)
    setMounted(true)
  }, [])

  const toggle = () => {
    // Read the DOM at click time — the source of truth — so a stale React
    // state (pre-hydration or otherwise) can't cause a two-click desync.
    const root = document.documentElement
    const current = root.classList.contains('dark') ? 'dark' : 'light'
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
