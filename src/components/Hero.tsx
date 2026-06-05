"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Arrow } from "./icons";
import { HeroPhone } from "./HeroPhone";
import { useWaitlist } from "./Waitlist";

const chips = [
  "Screening",
  "Calls",
  "Voice Agent",
  "AI Notes",
  "Voicemail",
  "Reminders",
  "Call Log",
  "Scheduler",
  "Block",
  "Assistant",
];

export function Hero() {
  const reduce = useReducedMotion();
  const { open } = useWaitlist();

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pt-32 pb-16 sm:pt-36 sm:pb-20"
    >
      {/* very soft ambient glow — keeps the section on near-pure white to match the hero image */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[560px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(77,131,255,0.05), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.a
            href="#how"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-cloud/70 px-3.5 py-1.5 text-sm font-medium text-ink-soft"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand" />
            The first AI-native phone carrier
            <Arrow className="h-3.5 w-3.5 text-muted" />
          </motion.a>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="display mt-6 text-[3.75rem] sm:text-7xl lg:text-[6.25rem]"
          >
            The carrier
            <br />
            that{" "}
            <span className="relative inline-block italic text-brand">
              thinks.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C60 3 240 3 298 7"
                  stroke="var(--color-brand)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.35"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-7 max-w-xl text-2xl leading-relaxed text-muted lg:mx-0"
          >
            Switch to an AI-first phone plan that screens, answers, and
            summarizes every call for you — and works harder than any carrier
            ever has, for{" "}
            <span className="font-semibold text-ink">less than you pay today.</span>
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
          >
            <button
              type="button"
              onClick={open}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-7 py-4 text-base font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              Get started — keep your number
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#how"
              className="inline-flex w-full items-center justify-center rounded-pill border border-line bg-white px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-cloud sm:w-auto"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-base text-muted lg:justify-start"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" /> No new SIM hassle
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" /> Cancel anytime
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-brand" /> 30-day free trial
            </span>
          </motion.div>
        </div>

        {/* Hero graphic — phone image with CSS callouts */}
        <div className="relative w-full">
          <HeroPhone />
        </div>
      </div>

      {/* capability marquee */}
      <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
        <div className="flex w-max animate-marquee gap-3">
          {[...chips, ...chips].map((c, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-pill border border-line bg-cloud-2 px-4 py-2 text-sm font-medium text-ink-soft"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
