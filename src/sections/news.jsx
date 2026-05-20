'use client'

import Image from 'next/image'
import { m } from 'motion/react'
import SectionFrame from '@/components/ui/section-frame'
import SplitText from '@/components/ui/split-text'
import Card from '@/components/ui/card'
import { cardReveal, stagger } from '@/animations/variants'

const articles = [
  {
    tag: 'Statement',
    date: 'May 12, 2026',
    title: 'Morgan unveils plan to cap insulin at $25 for every American.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Press',
    date: 'May 4, 2026',
    title: "The Chronicle: 'Hale is the candidate to beat in CA-14.'",
    image:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Field',
    date: 'April 27, 2026',
    title: 'Volunteers knock 14,000 doors over the weekend across the district.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
]

export default function News() {
  return (
    <SectionFrame id="news" eyebrow="Latest Updates" number="05" withGrid>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="From the trail."
          className="font-display text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl"
        />
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {articles.map((a) => (
          <m.article key={a.title} variants={cardReveal} className="block">
            <Card className="group h-full overflow-hidden p-0" tilt={false} interactive={false}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="from-navy-deep/90 via-navy-deep/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                <span className="border-cyan/30 bg-navy-deep/70 text-mint absolute top-5 left-5 rounded-full border px-3 py-1 text-[10px] tracking-widest uppercase backdrop-blur">
                  {a.tag}
                </span>
              </div>
              <div className="p-7">
                <div className="text-cyan/80 font-mono text-[11px] tracking-widest uppercase">
                  {a.date}
                </div>
                <h3 className="font-display text-foreground mt-4 text-2xl leading-tight font-medium">
                  {a.title}
                </h3>
              </div>
            </Card>
          </m.article>
        ))}
      </m.div>
    </SectionFrame>
  )
}
