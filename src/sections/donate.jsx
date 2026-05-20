"use client";

import { useState } from "react";
import { m } from "motion/react";
import SplitText from "@/components/ui/SplitText";
import Button from "@/components/ui/Button";
import { fadeUp, stagger } from "@/animations/variants";
import { cn } from "@/utils/cn";

const amounts = [14, 27, 100, 250, 500, 1000];

export default function Donate() {
  const [picked, setPicked] = useState(27);
  const [custom, setCustom] = useState("");

  return (
    <section id="donate" className="relative overflow-hidden py-24 sm:py-32">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-mint/15 blur-3xl"
      />
      <div aria-hidden className="grid-overlay opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <m.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto h-px w-32 origin-center bg-gradient-to-r from-transparent via-mint to-transparent"
        />

        <m.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20% 0px" }}
          className="mx-auto mt-10 max-w-3xl text-center"
        >
          <m.div
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan"
          >
            07 · Join the Movement
          </m.div>
          <SplitText
            as="h2"
            by="word"
            staggerChildren={0.05}
            text="Chip in. Change Washington."
            className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          />
          <m.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-base text-foreground/75 sm:text-lg"
          >
            94% of our funding comes from grassroots donors like you. No
            corporate PACs. No lobbyists. Just a campaign powered by the
            people.
          </m.p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-3xl"
        >
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-cyan/20 via-mint/15 to-steel/20 blur-xl" />
          <div className="rounded-3xl border border-cyan/25 bg-navy-deep/80 p-6 backdrop-blur-xl sm:p-10">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {amounts.map((a) => (
                <button
                  key={a}
                  onClick={() => {
                    setPicked(a);
                    setCustom("");
                  }}
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border px-3 py-4 transition-all",
                    picked === a && !custom
                      ? "border-mint bg-mint/10 text-mint"
                      : "border-cyan/20 text-foreground hover:border-mint/50 hover:bg-cyan/5",
                  )}
                >
                  <span className="relative z-10 font-display text-xl font-medium">
                    ${a}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]">
              <label className="relative flex h-14 items-center rounded-2xl border border-cyan/20 bg-cyan/[0.04] px-5 focus-within:border-mint">
                <span className="font-display text-2xl text-foreground/60">
                  $
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Other amount"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setPicked(null);
                  }}
                  className="ml-2 h-full w-full bg-transparent text-lg text-foreground outline-none placeholder:text-foreground/40"
                />
              </label>
              <Button as="button" size="xl" className="w-full sm:w-auto">
                Donate {custom ? `$${custom}` : `$${picked}`}
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
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3">
              {[
                ["94%", "Grassroots funded"],
                ["$32", "Average donation"],
                ["12,400+", "First-time donors"],
              ].map(([num, label]) => (
                <div key={label} className="text-center sm:text-left">
                  <div className="font-display text-2xl font-medium text-mint">
                    {num}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-foreground/55">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}
