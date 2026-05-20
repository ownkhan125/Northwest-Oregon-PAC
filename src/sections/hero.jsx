"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { m, useScroll, useTransform } from "motion/react";
import { gsap } from "@/animations/gsap";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";

export default function Hero() {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useGSAP(
    () => {
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.fromTo(
        ".hero-orb",
        { yPercent: 0 },
        {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".hero-glow",
        { scale: 0.9, opacity: 0.6 },
        {
          scale: 1.15,
          opacity: 1,
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-screen w-full items-center overflow-hidden pt-28 sm:pt-32"
    >
      {/* Background orbs */}
      <div aria-hidden className="grid-overlay opacity-40" />
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -left-32 top-1/3 -z-10 h-[60vmin] w-[60vmin] rounded-full bg-cyan/20 blur-3xl"
      />
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -right-20 top-10 -z-10 h-[55vmin] w-[55vmin] rounded-full bg-mint/15 blur-3xl"
      />
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-1/2 top-2/3 -z-10 h-[40vmin] w-[40vmin] -translate-x-1/2 rounded-full bg-steel/30 blur-3xl"
      />

      <m.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12"
      >
        <div className="lg:col-span-7">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-cyan/30 bg-cyan/[0.06] px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-cyan backdrop-blur"
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute inset-0 rounded-full bg-mint" />
              <span className="pulse-ring absolute inset-0 rounded-full bg-mint" />
            </span>
            Campaign 2026 · CA-14
          </m.div>

          <div className="font-display text-[14vw] font-medium leading-[0.92] tracking-tight text-foreground sm:text-7xl md:text-[88px] lg:text-[104px]">
            <SplitText
              as="span"
              text="Morgan"
              className="block"
              delay={0.2}
              inView={false}
            />
            <SplitText
              as="span"
              text="Hale."
              className="block"
              charClassName="bg-gradient-to-r from-cyan via-mint to-cyan bg-clip-text text-transparent"
              delay={0.55}
              inView={false}
            />
          </div>

          <m.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="mt-8 max-w-xl text-base text-foreground/75 sm:text-lg"
          >
            A new generation of leadership for California's 14th. Building a
            fair economy, defending democracy, and putting working families
            first — not the loudest lobbyists.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button as="a" href="#donate" size="lg">
              Chip in $14
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Button>
            <Button as="a" href="#priorities" variant="secondary" size="lg">
              See Priorities
            </Button>
            <a
              href="#events"
              className="group inline-flex items-center gap-3 text-sm text-foreground/70 hover:text-mint"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan/30 transition-colors group-hover:border-mint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 5v14l11-7z"
                    fill="currentColor"
                    className="text-mint"
                  />
                </svg>
              </span>
              Watch the message
            </a>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6"
          >
            {[
              ["12K+", "Volunteers"],
              ["3.2M", "Doors knocked"],
              ["94%", "Grassroots funded"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-display text-2xl font-medium text-mint sm:text-3xl">
                  {num}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-widest text-foreground/55">
                  {label}
                </div>
              </div>
            ))}
          </m.div>
        </div>

        <div className="relative lg:col-span-5">
          <m.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-md"
          >
            {/* Decorative spinning ring */}
            <div
              aria-hidden
              className="spin-slow absolute -inset-4 rounded-[2rem] border border-dashed border-cyan/30"
            />
            {/* Image frame */}
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-cyan/20 bg-navy">
              <Image
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=900&q=80"
                alt="Morgan Hale, candidate for Congress"
                fill
                priority
                sizes="(max-width: 1024px) 70vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

              {/* Floating signature card */}
              <m.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 rounded-2xl border border-cyan/25 bg-navy-deep/80 p-4 backdrop-blur"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-display text-lg leading-none">Morgan Hale</div>
                    <div className="mt-1 text-[11px] uppercase tracking-widest text-cyan">
                      Democrat · CA-14
                    </div>
                  </div>
                  <svg viewBox="0 0 80 24" className="h-7 w-20 text-mint">
                    <path
                      d="M2 18 C 10 4, 18 24, 26 12 C 34 0, 42 22, 50 10 C 58 -2, 66 20, 78 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </m.div>
            </div>

            {/* Floating accent tag */}
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-10 hidden rotate-[-6deg] rounded-2xl border border-mint/40 bg-mint/10 px-4 py-2 text-xs font-medium uppercase tracking-widest text-mint backdrop-blur sm:block"
            >
              For the People
            </m.div>
          </m.div>
        </div>
      </m.div>

      {/* Scroll indicator */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden bg-cyan/20">
          <m.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-gradient-to-b from-transparent via-mint to-transparent"
          />
        </div>
      </m.div>
    </section>
  );
}
