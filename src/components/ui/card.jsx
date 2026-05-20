"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/utils/cn";

export default function Card({
  className,
  children,
  hoverGlow = true,
  tilt = true,
  ...rest
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 18 });
  const sy = useSpring(y, { stiffness: 140, damping: 18 });
  const rx = useTransform(sy, [-50, 50], [6, -6]);
  const ry = useTransform(sx, [-50, 50], [-6, 6]);
  const glowX = useTransform(sx, [-50, 50], ["20%", "80%"]);
  const glowY = useTransform(sy, [-50, 50], ["20%", "80%"]);

  function onMove(e) {
    if (!tilt) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: tilt ? rx : 0, rotateY: tilt ? ry : 0, transformPerspective: 1000 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-card-border bg-card-DEFAULT/40 backdrop-blur-md",
        "bg-[rgba(9,60,93,0.45)]",
        className,
      )}
      {...rest}
    >
      {hoverGlow && (
        <m.div
          aria-hidden
          style={{
            background: `radial-gradient(220px circle at var(--mx) var(--my), rgba(93,248,216,0.18), transparent 60%)`,
            "--mx": glowX,
            "--my": glowY,
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      <div className="relative z-10">{children}</div>
    </m.div>
  );
}
