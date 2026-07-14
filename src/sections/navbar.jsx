'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'motion/react'
import Logo from '@/components/ui/logo'
import Button from '@/components/ui/button'
import ThemeToggle from '@/components/ui/theme-toggle'
import { cn } from '@/lib/cn'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Ask', href: '/ask' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Events', href: '/events' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const pathname = usePathname()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24)
  })

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <div
          className={cn(
            'flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4',
            scrolled
              ? 'border-border bg-surface/85 shadow-[0_18px_50px_-30px_rgba(46,69,56,0.35)] backdrop-blur-xl'
              : 'border-border/60 bg-surface/50 backdrop-blur',
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link, i) => (
              <m.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.06, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'group relative inline-flex rounded-full px-4 py-2 text-sm transition-colors',
                    isActive(link.href)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary',
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  <span
                    className={cn(
                      'bg-primary absolute inset-x-3 bottom-1 h-px origin-left transition-transform duration-300',
                      isActive(link.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              </m.div>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button href="/donate" variant="primary" size="md">
              Donate
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
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="text-foreground hover:border-primary/50 hover:text-primary border-border relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors"
            >
              <span className="sr-only">Menu</span>
              <m.span
                animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: -4 }}
                className="absolute h-px w-5 bg-current"
              />
              <m.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="absolute h-px w-5 bg-current"
              />
              <m.span
                animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 4 }}
                className="absolute h-px w-5 bg-current"
              />
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="bg-background/95 absolute inset-0 backdrop-blur-xl" />
            <m.nav
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.15 },
              }}
              exit={{ opacity: 0 }}
              className="relative flex h-full flex-col justify-center gap-2 px-8 pt-24"
            >
              {links.map((link) => (
                <m.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'font-display block text-4xl font-medium sm:text-5xl',
                      isActive(link.href)
                        ? 'text-primary'
                        : 'text-foreground hover:text-primary',
                    )}
                  >
                    {link.label}
                  </Link>
                </m.div>
              ))}
              <div className="mt-8">
                <Button as={Link} href="/donate" size="lg" onClick={() => setOpen(false)}>
                  Donate Now
                </Button>
              </div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
