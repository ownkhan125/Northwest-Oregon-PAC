'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { m } from 'motion/react'
import Logo from '@/components/ui/logo'
import CivicIcon from '@/components/ui/civic-icon'
import { fadeUp, stagger, EASE } from '@/animations/variants'
import { pac } from '@/data/pac'

const columns = [
  {
    title: 'THE PAC',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Events', href: '/events' },
      { label: 'Ask', href: '/ask' },
    ],
  },
  {
    title: 'GET INVOLVED',
    links: [
      { label: 'Donate', href: '/donate' },
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Host an Event', href: '/contact' },
      { label: 'Social Posts', href: '/social-posts' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQs', href: '/faq' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Oregon Secretary of State', href: 'https://sos.oregon.gov/elections/', external: true },
    ],
  },
]

const socials = [
  {
    name: 'Facebook',
    href: pac.socials.facebook,
    icon: (
      <path
        d="M13 22v-8h3l.5-4H13V7.5c0-1 .3-1.6 1.7-1.6H17V2.5c-.4 0-1.5-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V10H7v4h2.8v8H13Z"
        fill="currentColor"
      />
    ),
  },
]

export default function Footer() {
  const pathname = usePathname()
  // Standalone conversion funnels (/funnel) render without global chrome.
  if (pathname === '/funnel' || pathname?.startsWith('/funnel/')) return null

  return (
    <footer className="bg-surface-alt border-border relative overflow-hidden border-t pt-20 sm:pt-24">
      <CivicIcon
        src="/icons/capitol.svg"
        className="text-primary/5 pointer-events-none absolute -right-16 bottom-0 hidden h-72 w-72 select-none md:right-8 md:block lg:right-16 lg:h-80 lg:w-80"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo size="lg" />
            <p className="text-foreground/75 mt-6 max-w-md">{pac.tagline}</p>

            <div className="mt-6 space-y-3 text-sm">
              <div>
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  General inquiries
                </span>
                <p className="mt-1">
                  <a
                    href={`mailto:${pac.contact.generalEmail}`}
                    className="text-primary hover:text-highlight transition-colors"
                  >
                    {pac.contact.generalEmail}
                  </a>
                </p>
              </div>

              <div>
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  {pac.contact.role}
                </span>
                <p className="text-foreground/85 mt-1">{pac.contact.name}</p>
                <p className="text-foreground/70">{pac.contact.phone}</p>
              </div>

              <div>
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Mailing address
                </span>
                <address className="text-foreground/70 mt-1 not-italic">
                  {pac.contact.mailingAddressLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </address>
              </div>

              <div className="pt-2">
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Follow
                </span>
                <div className="mt-3 flex items-center gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.name}
                      className="group border-border text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 focus-visible:ring-primary/40 grid h-10 w-10 cursor-pointer place-items-center rounded-full border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-sm focus-visible:ring-2 focus-visible:outline-none"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110"
                      >
                        {s.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
                <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
                  {col.title}
                </div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => {
                    const linkClass =
                      'group text-foreground/80 hover:text-primary inline-flex cursor-pointer items-center gap-2 text-sm transition-colors'
                    const indicator = (
                      <span className="bg-primary h-px w-3 origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
                    )
                    return (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                          >
                            {link.label}
                            {indicator}
                          </a>
                        ) : (
                          <Link href={link.href} className={linkClass}>
                            {link.label}
                            {indicator}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </m.div>
            ))}
          </m.div>
        </div>

        <div className="border-border mt-12 border-t pt-6 sm:pt-7">
          <div className="text-foreground/60 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] tracking-widest uppercase sm:text-[13px]">
            <span>© {new Date().getFullYear()} {pac.legalName}</span>
            <span className="bg-border-strong h-3 w-px" />
            <span>{pac.type} · Committee #{pac.pacId}</span>
          </div>
        </div>

        <div className="border-border mt-6 border-t pt-6 pb-8 space-y-2">
          <p className="text-foreground/70 text-center text-[13px] leading-relaxed tracking-wide">
            {pac.disclaimers.paidFor}
          </p>
          <p className="text-foreground/70 text-center text-[13px] leading-relaxed tracking-wide">
            {pac.disclaimers.aiNotice}
          </p>
          <p className="text-foreground/55 mt-2 text-center text-[12px] tracking-widest uppercase">
            {pac.disclaimers.notAuthorized}
          </p>
        </div>
      </div>
    </footer>
  )
}
