"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const links = [
  { label: "About", href: "#about" },
  { label: "Priorities", href: "#priorities" },
  { label: "Vision", href: "#vision" },
  { label: "Endorsements", href: "#endorsements" },
  { label: "News", href: "#news" },
  { label: "Events", href: "#events" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <m.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <div
          className={cn(
            "flex w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled
              ? "border-cyan/20 bg-navy/70 backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]"
              : "border-white/5 bg-white/[0.02] backdrop-blur",
          )}
        >
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link, i) => (
              <m.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.06, duration: 0.5 }}
                className="group relative rounded-full px-4 py-2 text-sm text-foreground/75 transition-colors hover:text-mint"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-mint transition-transform duration-300 group-hover:scale-x-100" />
              </m.a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button as="a" href="#donate" variant="primary" size="md">
              Donate
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </Button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 text-foreground transition-colors hover:border-mint/50 hover:text-mint lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <m.span
              animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: -4 }}
              className="absolute h-px w-5 bg-current"
            />
            <m.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              className="absolute h-px w-5 bg-current"
            />
            <m.span
              animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 4 }}
              className="absolute h-px w-5 bg-current"
            />
          </button>
        </div>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-navy-deep/95 backdrop-blur-xl" />
            <m.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } }}
              exit={{ opacity: 0 }}
              className="relative flex h-full flex-col justify-center gap-2 px-8 pt-24"
            >
              {links.map((link) => (
                <m.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-display text-4xl font-medium text-foreground hover:text-mint sm:text-5xl"
                >
                  {link.label}
                </m.a>
              ))}
              <div className="mt-8">
                <Button as="a" href="#donate" size="lg" onClick={() => setOpen(false)}>
                  Donate Now
                </Button>
              </div>
            </m.nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
