"use client";

import { useEffect, useState } from "react";
import { Wordmark } from "./icons";
import { useWaitlist } from "./Waitlist";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Plans", href: "#pricing" },
  { label: "Business", href: "#usecases" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openWaitlist } = useWaitlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? "mt-2 rounded-pill border border-line/80 bg-white/80 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:mt-3"
            : "mt-0 border border-transparent py-4"
        }`}
        style={{ width: scrolled ? "calc(100% - 1.5rem)" : "100%" }}
      >
        <a href="#top" className="shrink-0">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openWaitlist}
            className="rounded-pill bg-ink px-5 py-2.5 text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
          >
            Get started
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-ink" />
              <span className="block h-0.5 w-4 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-3 mt-2 rounded-3xl border border-line bg-white p-4 shadow-xl md:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-base font-medium text-ink hover:bg-cloud"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
