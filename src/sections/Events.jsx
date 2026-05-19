"use client";

import { m } from "motion/react";
import SectionFrame from "@/components/ui/SectionFrame";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import { stagger, fadeUp } from "@/animations/variants";

const events = [
  {
    day: "24",
    month: "MAY",
    title: "Town Hall: Cost of Living in CA-14",
    when: "Sat · 10:00 AM",
    where: "Oakwood Community Center",
    type: "Town Hall",
  },
  {
    day: "31",
    month: "MAY",
    title: "Volunteer Canvass Launch",
    when: "Sat · 9:30 AM",
    where: "Field HQ · Riverside Ave",
    type: "Field",
  },
  {
    day: "07",
    month: "JUN",
    title: "Climate & Jobs Roundtable",
    when: "Sat · 1:00 PM",
    where: "Solartech Workshop, Bayview",
    type: "Policy",
  },
  {
    day: "14",
    month: "JUN",
    title: "Coffee with Morgan",
    when: "Sat · 8:30 AM",
    where: "Daybreak Café, Pinegrove",
    type: "Meet & Greet",
  },
];

export default function Events() {
  return (
    <SectionFrame id="events" eyebrow="Get Involved" number="06">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Show up. Speak up. Be part of it."
            className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          />
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
          <Button as="a" href="#" variant="primary" size="lg">
            Volunteer
          </Button>
          <Button as="a" href="#" variant="ghost" size="lg">
            Host an event
          </Button>
        </div>
      </div>

      <m.ul
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="mt-14 divide-y divide-line border-y border-line"
      >
        {events.map((e) => (
          <m.li
            key={e.title}
            variants={fadeUp}
            className="group relative grid grid-cols-[auto_1fr] items-center gap-6 py-7 transition-colors hover:bg-cyan/[0.03] sm:grid-cols-[auto_1fr_auto] sm:gap-10"
          >
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-xl border border-cyan/25 bg-cyan/[0.04] sm:h-24 sm:w-24">
              <span className="font-display text-3xl font-medium leading-none text-foreground sm:text-4xl">
                {e.day}
              </span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyan">
                {e.month}
              </span>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-mint">
                {e.type}
              </div>
              <h3 className="mt-2 font-display text-xl font-medium leading-tight sm:text-2xl">
                {e.title}
              </h3>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-foreground/65">
                <span className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" strokeLinecap="round" />
                  </svg>
                  {e.when}
                </span>
                <span className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M12 21s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {e.where}
                </span>
              </div>
            </div>

            <a
              href="#"
              className="hidden items-center gap-2 rounded-full border border-cyan/30 px-4 py-2 text-xs uppercase tracking-widest text-foreground/80 transition-all group-hover:border-mint group-hover:text-mint sm:inline-flex"
            >
              RSVP
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </m.li>
        ))}
      </m.ul>
    </SectionFrame>
  );
}
