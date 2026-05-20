'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import Logo from '@/components/ui/logo'
import Button from '@/components/ui/button'
import { fadeUp, stagger, EASE } from '@/animations/variants'

const columns = [
  {
    title: 'Campaign',
    links: [
      { label: 'About Morgan', href: '/about' },
      { label: 'Events', href: '/events' },
      { label: 'Donate', href: '/donate' },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Terms of service', href: '/terms-of-service' },
    ],
  },
]

const socials = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/',
    icon: (
      <path
        d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1A4.1 4.1 0 0 0 12 9.2c0 .3 0 .6.1.9C8.7 9.9 5.7 8.2 3.7 5.7c-.4.7-.6 1.5-.6 2.3 0 1.4.7 2.7 1.8 3.4-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.7 3.3 4.1-.4.1-.7.2-1.1.2-.3 0-.5 0-.8-.1.5 1.7 2.1 2.9 4 2.9-1.5 1.1-3.3 1.8-5.3 1.8H2c1.9 1.2 4.1 1.9 6.5 1.9 7.7 0 12-6.4 12-12v-.5c.8-.6 1.5-1.3 2.1-2.1Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <path
        d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.6 1.7-1.6H17V2.5c-.4 0-1.5-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V10H7v4h2.8v8H13Z"
        fill="currentColor"
      />
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/',
    icon: (
      <>
        <rect
          x="2"
          y="5"
          width="20"
          height="14"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path d="M10 9.5v5l4.5-2.5L10 9.5Z" fill="currentColor" />
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-line relative overflow-x-clip border-t pt-20 sm:pt-28">
      <div aria-hidden className="grain" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="overflow-hidden pb-6 select-none">
          <m.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="from-foreground/15 via-foreground/[0.06] font-display bg-gradient-to-b to-transparent bg-clip-text text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-tight text-transparent"
          >
            HALE 2026
          </m.div>
        </div>

        <div className="border-line mt-10 grid grid-cols-1 gap-12 border-t pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="text-foreground/70 mt-6 max-w-md">
              A new generation of leadership for California's 14th District — powered by grassroots
              donors, organizers, and neighbors.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label className="border-cyan/25 bg-cyan/[0.04] focus-within:border-mint relative flex h-12 flex-1 items-center rounded-full border px-5">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="text-foreground placeholder:text-foreground/40 h-full w-full bg-transparent text-sm outline-none"
                />
              </label>
              <Button type="submit" size="md" variant="primary">
                Subscribe
              </Button>
            </form>
            <p className="text-foreground/45 mt-3 text-[11px] tracking-widest uppercase">
              Weekly updates from the campaign. Unsubscribe anytime.
            </p>
          </div>

          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7"
          >
            {columns.map((col) => (
              <m.div key={col.title} variants={fadeUp}>
                <div className="text-cyan/80 font-mono text-[10px] tracking-[0.3em] uppercase">
                  {col.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group text-foreground/80 hover:text-mint inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
                      >
                        {link.label}
                        <span className="bg-mint h-px w-3 origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </m.div>
            ))}
          </m.div>
        </div>

        <div className="border-line mt-16 flex flex-col items-start gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-foreground/55 flex flex-wrap items-center gap-3 text-[11px] tracking-widest uppercase">
            <span>© 2026 Morgan Hale for Congress</span>
            <span className="bg-line h-3 w-px" />
            <span>FEC ID: C00XXXXXXX</span>
            <span className="bg-line h-3 w-px" />
            <Link href="/privacy-policy" className="hover:text-mint cursor-pointer">
              Privacy
            </Link>
            <Link href="/terms-of-service" className="hover:text-mint cursor-pointer">
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="border-cyan/20 text-foreground/80 hover:border-mint hover:text-mint grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="border-line text-foreground/35 border-t py-6 text-center text-[10px] tracking-widest uppercase">
          Paid for by Morgan Hale for Congress
        </div>
      </div>
    </footer>
  )
}
