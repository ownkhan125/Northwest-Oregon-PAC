"use client";

import { useMemo } from "react";
import { m } from "motion/react";
import { cn } from "@/utils/cn";
import { EASE } from "@/animations/variants";

export default function SplitText({
  text,
  as: Tag = "h1",
  className,
  charClassName,
  delay = 0,
  staggerChildren = 0.035,
  duration = 0.8,
  by = "char",
  once = true,
  inView = true,
}) {
  const MotionTag = m[Tag] ?? m.h1;

  const units = useMemo(() => {
    if (by === "word") {
      return text.split(/(\s+)/).filter((s) => s.length > 0);
    }
    return text.split("");
  }, [text, by]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { y: "110%", opacity: 0, rotate: 4 },
    show: {
      y: "0%",
      opacity: 1,
      rotate: 0,
      transition: { duration, ease: EASE },
    },
  };

  const animateProps = inView
    ? {
        initial: "hidden",
        whileInView: "show",
        viewport: { once, margin: "-15% 0px" },
      }
    : { initial: "hidden", animate: "show" };

  return (
    <MotionTag
      className={cn("text-balance", className)}
      variants={container}
      {...animateProps}
      aria-label={text}
    >
      {units.map((u, i) => {
        if (u === " " || /^\s+$/.test(u)) {
          return (
            <span key={`s-${i}`} aria-hidden style={{ whiteSpace: "pre" }}>
              {u}
            </span>
          );
        }
        return (
          <span
            key={`u-${i}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ lineHeight: 1 }}
          >
            <m.span
              variants={child}
              className={cn("split-char inline-block", charClassName)}
            >
              {u}
            </m.span>
          </span>
        );
      })}
    </MotionTag>
  );
}
