"use client";

import { cn } from "@/utils/cn";

export default function Logo({ className }) {
  return (
    <a href="#top" className={cn("group inline-flex items-center gap-2", className)}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-cyan to-mint">
        <span className="absolute inset-[2px] rounded-full bg-navy-deep" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="relative h-4 w-4 text-mint"
        >
          <path
            d="M4 18L12 4l8 14M8 18h8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold leading-none tracking-tight text-foreground">
        Morgan<span className="text-mint">.</span>Hale
      </span>
    </a>
  );
}
