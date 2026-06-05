"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { Check, Arrow } from "./icons";
import { useWaitlist } from "./Waitlist";

type Plan = {
  name: string;
  blurb: string;
  monthly: number;
  yearly: number;
  features: string[];
  featured?: boolean;
  cta: string;
};

const plans: Plan[] = [
  {
    name: "Lite",
    blurb: "Smarter calls, lower bill. Keep your number.",
    monthly: 15,
    yearly: 12,
    cta: "Start free trial",
    features: [
      "Unlimited talk & text (US & CA)",
      "Automatic spam blocking",
      "Call screening for unknown numbers",
      "Voicemail summaries",
    ],
  },
  {
    name: "Pro",
    blurb: "Your always-on receptionist for everyday life.",
    monthly: 29,
    yearly: 23,
    featured: true,
    cta: "Start free trial",
    features: [
      "Everything in Lite",
      "Every call answered, 24/7",
      "Summaries + full transcripts",
      "Search any past conversation",
      "Note-taking on live calls",
      "A second phone number",
    ],
  },
  {
    name: "Business",
    blurb: "For teams that can&rsquo;t afford to miss a lead.",
    monthly: 59,
    yearly: 47,
    cta: "Talk to sales",
    features: [
      "Everything in Pro",
      "Books appointments on your calendar",
      "Answers questions about your services",
      "Handles rescheduling & cancellations",
      "Shared team inbox & call routing",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const { open } = useWaitlist();

  return (
    <section id="pricing" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display-sm mx-auto max-w-2xl text-center text-5xl sm:text-7xl">
            A carrier plan that pays for itself
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-xl text-muted">
            Less than most phone bills — with an assistant built in. Keep
            your number, cancel anytime.
          </p>
        </Reveal>

        {/* toggle */}
        <Reveal delay={0.05}>
          <div className="mt-9 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-semibold ${
                !yearly ? "text-ink" : "text-muted"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() => setYearly((v) => !v)}
              className="relative h-8 w-14 rounded-pill bg-ink p-1"
              aria-label="Toggle billing period"
            >
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="block h-6 w-6 rounded-full bg-white"
                style={{ marginLeft: yearly ? "1.5rem" : 0 }}
              />
            </button>
            <span
              className={`text-sm font-semibold ${
                yearly ? "text-ink" : "text-muted"
              }`}
            >
              Yearly
            </span>
            <span className="rounded-pill bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
              Save 20%
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <div
                className={`flex h-full flex-col rounded-3xl border p-7 transition-all ${
                  p.featured
                    ? "border-brand/40 bg-night text-white shadow-[0_30px_70px_-30px_rgba(46,107,245,0.6)] lg:-translate-y-3"
                    : "border-line bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-xl font-bold ${
                      p.featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {p.name}
                  </h3>
                  {p.featured && (
                    <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/20">
                      Most popular
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 text-base ${
                    p.featured ? "text-white/60" : "text-muted"
                  }`}
                  dangerouslySetInnerHTML={{ __html: p.blurb }}
                />

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="display-sm text-6xl">
                    ${yearly ? p.yearly : p.monthly}
                  </span>
                  <span
                    className={`text-sm ${
                      p.featured ? "text-white/50" : "text-muted"
                    }`}
                  >
                    /mo
                  </span>
                </div>
                <p
                  className={`mt-1 text-xs ${
                    p.featured ? "text-white/40" : "text-muted"
                  }`}
                >
                  {yearly ? "billed annually" : "billed monthly"}
                </p>

                <button
                  type="button"
                  onClick={open}
                  className={`mt-6 inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95 ${
                    p.featured
                      ? "bg-white text-ink"
                      : "bg-ink text-white"
                  }`}
                >
                  {p.cta}
                  <Arrow className="h-4 w-4" />
                </button>

                <ul className="mt-7 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-base">
                      <Check
                        className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                          p.featured ? "text-white" : "text-brand"
                        }`}
                      />
                      <span
                        className={p.featured ? "text-white/85" : "text-ink-soft"}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          All plans include a 30-day free trial. No setup fees. Port your number
          in minutes.
        </p>
      </div>
    </section>
  );
}
