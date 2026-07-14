'use client'

import { useEffect, useRef } from 'react'

// A slim top-of-viewport progress bar. Reads scroll position directly and
// writes to the bar's transform in the scroll handler — no React re-render
// per frame, keeps it 60fps.
export default function ReadingProgress({ targetId }) {
  const ref = useRef(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return

    const compute = () => {
      const target = targetId ? document.getElementById(targetId) : null
      let progress
      if (target) {
        const rect = target.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const scrolled = -rect.top
        progress = total > 0 ? scrolled / total : 0
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight
        progress = total > 0 ? window.scrollY / total : 0
      }
      const clamped = Math.min(1, Math.max(0, progress))
      bar.style.transform = `scaleX(${clamped})`
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [targetId])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[3px]"
    >
      <div
        ref={ref}
        className="bg-primary h-full origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  )
}
