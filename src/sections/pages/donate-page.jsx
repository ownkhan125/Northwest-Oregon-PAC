'use client'

import { m } from 'motion/react'
import PageHeader from '@/components/ui/page-header'
import Button from '@/components/ui/button'
import { EASE } from '@/animations/variants'
import { pac } from '@/data/pac'

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Chip in"
        number="04"
        title="Fund the fight for Northwest Oregon."
        description="Every contribution is pooled locally and invested in candidates, organizing, and outreach across our region."
        accent="/icons/money-bag.svg"
      />

      <section className="relative isolate overflow-x-clip py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-12">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="border-primary/25 bg-surface relative rounded-3xl border p-8 shadow-[0_30px_80px_-40px_rgba(46,69,56,0.35)] sm:p-12"
          >
            <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
              Contribute
            </div>
            <h2 className="font-display text-foreground mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
              Online contributions are launching soon.
            </h2>
            <div className="text-foreground/80 mt-5 space-y-4 text-base leading-relaxed sm:text-lg">
              <p>
                Northwest Oregon PAC is finalizing our secure contribution portal. Until it goes
                live, our team can walk you through the ways to give — including personal checks
                and other lawful contributions — and record the information required for
                campaign-finance reporting.
              </p>
              <p>Get in touch and we&rsquo;ll make it easy.</p>
            </div>

            <div className="border-primary/15 mt-8 grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-2">
              <div>
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Email
                </span>
                <p className="mt-1.5">
                  <a
                    href={`mailto:${pac.contact.generalEmail}`}
                    className="text-primary hover:text-highlight text-base transition-colors sm:text-lg"
                  >
                    {pac.contact.generalEmail}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Phone
                </span>
                <p className="mt-1.5">
                  <a
                    href={`tel:${pac.contact.phone.replace(/[^\d+]/g, '')}`}
                    className="text-primary hover:text-highlight text-base transition-colors sm:text-lg"
                  >
                    {pac.contact.phone}
                  </a>
                </p>
              </div>
              <div className="sm:col-span-2">
                <span className="text-muted font-mono text-[10px] tracking-[0.3em] uppercase">
                  Mailing address
                </span>
                <address className="text-foreground/85 mt-1.5 text-base not-italic leading-relaxed">
                  Northwest Oregon PAC
                  <br />
                  {pac.contact.mailingAddressLines.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < pac.contact.mailingAddressLines.length - 1 && <br />}
                    </span>
                  ))}
                </address>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Contact the PAC
              </Button>
              <Button href="/volunteer" size="lg" variant="secondary">
                Volunteer instead
              </Button>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="border-primary/25 bg-surface-alt/60 mt-8 rounded-3xl border p-6 sm:p-8"
          >
            <div className="text-highlight font-mono text-[10px] tracking-[0.3em] uppercase">
              Compliance
            </div>
            <ul className="text-foreground/85 mt-4 space-y-3 text-sm leading-relaxed">
              <li>{pac.disclaimers.foreignNationals}</li>
              <li>{pac.disclaimers.donorRequirement}</li>
              <li>{pac.disclaimers.notAuthorized}</li>
              <li className="text-foreground/70 text-xs tracking-widest uppercase">
                {pac.disclaimers.paidFor}
              </li>
            </ul>
          </m.div>
        </div>
      </section>
    </>
  )
}
