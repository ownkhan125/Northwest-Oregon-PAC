"use client";

import { forwardRef, useRef } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-mint text-navy-deep hover:bg-cyan border border-mint/80 shadow-[0_18px_40px_-18px_rgba(93,248,216,0.6)]",
  secondary:
    "bg-transparent text-mint border border-mint/40 hover:border-mint hover:bg-mint/10",
  ghost:
    "bg-white/[0.03] text-foreground/90 border border-white/10 hover:border-cyan/50 hover:bg-cyan/5",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
  xl: "h-14 px-8 text-base",
};

const Button = forwardRef(function Button(
  {
    as: As = "button",
    variant = "primary",
    size = "md",
    className,
    children,
    icon = null,
    magnetic = true,
    href,
    ...rest
  },
  ref,
) {
  const localRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 14, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 14, mass: 0.3 });
  const rx = useTransform(sy, [-12, 12], [4, -4]);
  const ry = useTransform(sx, [-12, 12], [-4, 4]);

  function onMove(e) {
    if (!magnetic) return;
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    x.set(dx * 8);
    y.set(dy * 6);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const Comp = href ? m.a : m.button;
  const compProps = href ? { href } : { type: rest.type || "button" };

  return (
    <Comp
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX: rx, rotateY: ry, transformPerspective: 800 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300",
        variants[variant],
        sizes[size],
        className,
      )}
      {...compProps}
      {...rest}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
    </Comp>
  );
});

export default Button;
