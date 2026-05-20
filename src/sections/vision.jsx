"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "motion/react";
import SplitText from "@/components/ui/SplitText";
import Marquee from "@/components/ui/Marquee";

const words = [
  "Opportunity",
  "Accountability",
  "Fairness",
  "Service",
  "Climate Action",
  "Democracy",
  "Dignity",
  "Common Ground",
];

export default function Vision() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="vision" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="grain" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/80"
        >
          <span className="text-mint">03</span>
          <span className="h-px w-8 bg-cyan/40" />
          <span>The Vision</span>
        </m.div>

        <m.div style={{ x }} className="will-change-transform">
          <SplitText
            as="h2"
            text="Government that works"
            by="word"
            staggerChildren={0.08}
            className="font-display text-[12vw] font-medium leading-[0.92] tracking-tight text-foreground sm:text-[88px] md:text-[120px] lg:text-[148px]"
          />
        </m.div>
        <m.div style={{ x: useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]) }}>
          <SplitText
            as="h2"
            text="for working people."
            by="word"
            staggerChildren={0.08}
            delay={0.15}
            className="block font-display text-[12vw] font-medium leading-[0.92] tracking-tight sm:text-[88px] md:text-[120px] lg:text-[148px]"
            charClassName="bg-gradient-to-r from-cyan via-mint to-cyan bg-clip-text text-transparent"
          />
        </m.div>

        <m.div
          style={{ y }}
          className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12"
        >
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7 }}
            className="text-lg leading-relaxed text-foreground/75 lg:col-span-7 lg:text-xl"
          >
            For too long, the people of this district have been told to lower
            their expectations. We don't believe that. We believe in a country
            that builds, invests, listens, and acts — a Congress that's worthy
            of the workers, dreamers, and families it serves.
          </m.p>

          <div className="lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="rounded-2xl border border-cyan/20 bg-navy/40 p-6 backdrop-blur"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan/80">
                A pledge in writing
              </div>
              <p className="mt-3 font-display text-xl leading-snug text-foreground sm:text-2xl">
                "I won't take a dime of corporate PAC money. I won't take
                lobbyist gifts. And I'll publish every vote — with my reason —
                online, every week."
              </p>
            </m.div>
          </div>
        </m.div>
      </div>

      <div className="mt-24">
        <Marquee items={words} />
      </div>
    </section>
  );
}
