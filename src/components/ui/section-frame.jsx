"use client";

import { m } from "motion/react";
import { cn } from "@/utils/cn";
import { EASE_SOFT, lineBuild, lineBuildY, fadeUp } from "@/animations/variants";

export default function SectionFrame({
  id,
  eyebrow,
  number,
  className,
  children,
  withGrid = false,
}) {
  return (
    <section id={id} className={cn("relative isolate w-full", className)}>
      {withGrid && <div aria-hidden className="grid-overlay" />}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <m.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15% 0px" }}
          className="relative"
        >
          {/* Top border line builds first */}
          <m.div
            variants={lineBuild}
            className="absolute -top-6 left-0 right-0 h-px origin-left bg-gradient-to-r from-cyan/60 via-cyan/20 to-transparent"
          />
          {/* Left tick mark */}
          <m.div
            variants={lineBuildY}
            className="absolute -top-6 left-0 h-6 w-px origin-top bg-cyan/60"
          />

          {(eyebrow || number) && (
            <m.div
              variants={fadeUp}
              transition={{ delay: 0.4, duration: 0.8, ease: EASE_SOFT }}
              className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/80"
            >
              {number && <span className="text-mint">{number}</span>}
              {number && eyebrow && <span className="h-px w-8 bg-cyan/40" />}
              {eyebrow && <span>{eyebrow}</span>}
            </m.div>
          )}

          {children}
        </m.div>
      </div>
    </section>
  );
}
