"use client";

import { cn } from "@/utils/cn";

export default function Marquee({ items, className, separator = "—" }) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-line",
        className,
      )}
      aria-hidden
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap py-5">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-display text-3xl font-medium text-foreground/85 sm:text-4xl"
          >
            <span>{item}</span>
            <span className="text-mint">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
