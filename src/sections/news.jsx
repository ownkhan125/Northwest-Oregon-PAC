"use client";

import Image from "next/image";
import { m } from "motion/react";
import SectionFrame from "@/components/ui/SectionFrame";
import SplitText from "@/components/ui/SplitText";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { cardReveal, stagger } from "@/animations/variants";

const articles = [
  {
    tag: "Statement",
    date: "May 12, 2026",
    title: "Morgan unveils plan to cap insulin at $25 for every American.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
    href: "#",
  },
  {
    tag: "Press",
    date: "May 4, 2026",
    title: "The Chronicle: 'Hale is the candidate to beat in CA-14.'",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    href: "#",
  },
  {
    tag: "Field",
    date: "April 27, 2026",
    title: "Volunteers knock 14,000 doors over the weekend across the district.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    href: "#",
  },
];

export default function News() {
  return (
    <SectionFrame id="news" eyebrow="Latest News" number="05" withGrid>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SplitText
          as="h2"
          by="word"
          staggerChildren={0.05}
          text="From the trail."
          className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        />
        <Button as="a" href="#" variant="ghost" size="md">
          All updates
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>

      <m.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {articles.map((a) => (
          <m.a key={a.title} href={a.href} variants={cardReveal} className="block">
            <Card className="group h-full overflow-hidden p-0" tilt={false}>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-cyan/30 bg-navy-deep/70 px-3 py-1 text-[10px] uppercase tracking-widest text-mint backdrop-blur">
                  {a.tag}
                </span>
              </div>
              <div className="p-7">
                <div className="font-mono text-[11px] uppercase tracking-widest text-cyan/80">
                  {a.date}
                </div>
                <h3 className="mt-4 font-display text-2xl font-medium leading-tight text-foreground transition-colors group-hover:text-mint">
                  {a.title}
                </h3>
                <span className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/70 transition-colors group-hover:text-mint">
                  Read more
                  <svg
                    className="transition-transform group-hover:translate-x-1"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Card>
          </m.a>
        ))}
      </m.div>
    </SectionFrame>
  );
}
