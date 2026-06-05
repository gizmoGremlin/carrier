"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Shield, PhoneIcon, Note, WaveMark, Check } from "./icons";

const steps = [
  {
    key: "screen",
    label: "Screen",
    icon: Shield,
    title: "Spam handled before your phone rings",
    body: "Voice.ai Phone checks every incoming call against live spam intelligence and your contacts. Known junk is blocked silently — no buzz, no banner, no interruption.",
    points: ["Live spam database", "Silent auto-block", "Allow-list your people"],
  },
  {
    key: "answer",
    label: "Answer",
    icon: PhoneIcon,
    title: "Your line answers first, in your voice",
    body: "Can&rsquo;t pick up? Your virtual receptionist greets the caller, finds out what they need, and books appointments or takes a message — so you only deal with calls that matter.",
    points: ["A natural voice", "Books appointments", "Takes detailed messages"],
  },
  {
    key: "summary",
    label: "Summarize",
    icon: Note,
    title: "See what was said, without listening back",
    body: "After every call you get a quick summary, a full transcript, and the important details. Search any conversation you&rsquo;ve ever had — instantly.",
    points: ["Instant summaries", "Full transcripts", "Search every call"],
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section
      id="how"
      className="relative overflow-hidden bg-night px-5 py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,107,245,0.5), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80">
            <WaveMark className="h-4 w-4" /> How Voice.ai Phone works
          </span>
          <h2 className="display-sm mx-auto mt-6 max-w-3xl text-5xl sm:text-7xl">
            Three things happen on every call —
            <span className="text-brand-bright"> automatically.</span>
          </h2>
        </div>

        {/* step tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold transition-all ${
                i === active
                  ? "bg-white text-ink"
                  : "border border-white/15 text-white/70 hover:bg-white/5"
              }`}
            >
              <s.icon className="h-4 w-4" />
              {s.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
          {/* glowing diagram */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[14%] rounded-full border border-white/10" />
            <div className="pulse-ring absolute inset-[10%] rounded-full bg-brand/20 blur-xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br from-brand-bright to-brand shadow-[0_20px_60px_-10px_rgba(46,107,245,0.6)]"
              >
                <step.icon className="h-14 w-14 text-white" />
              </motion.div>
            </AnimatePresence>

            {/* orbiting mini-nodes */}
            {[Shield, PhoneIcon, Note].map((Ic, i) => {
              const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
              const r = 44;
              return (
                <div
                  key={i}
                  className="absolute flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-night-2"
                  style={{
                    left: `calc(50% + ${Math.cos(angle) * r}% - 1.375rem)`,
                    top: `calc(50% + ${Math.sin(angle) * r}% - 1.375rem)`,
                  }}
                >
                  <Ic className="h-5 w-5 text-white/60" />
                </div>
              );
            })}
          </div>

          {/* copy */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35 }}
            >
              <h3 className="display-sm text-3xl sm:text-4xl">
                {step.title}
              </h3>
              <p
                className="mt-4 text-xl leading-snug text-white/65"
                dangerouslySetInnerHTML={{ __html: step.body }}
              />
              <ul className="mt-7 space-y-3">
                {step.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/20">
                      <Check className="h-3.5 w-3.5 text-brand-bright" />
                    </span>
                    <span className="font-medium text-white/90">{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
