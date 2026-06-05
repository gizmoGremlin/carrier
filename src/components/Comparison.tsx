import { Reveal } from "./Reveal";
import { Check, X, WaveMark } from "./icons";

const without = [
  "3+ hours lost to calls every day",
  "Spam calls interrupt your day",
  "Miss important calls when you&rsquo;re busy",
  "Forget to schedule appointments",
  "No record of what was said",
  "Screen every call manually",
];

const withAi = [
  "Answer in popular voices, automatically",
  "Save 3+ hours every single day",
  "Spam blocked before it reaches you",
  "AI answers every call, 24/7",
  "Summary + transcript for every call",
  "Auto-booked appointments & reminders",
];

export function Comparison() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-cloud/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Before &amp; after
            </span>
            <h2 className="display-sm mt-5 max-w-2xl text-5xl sm:text-7xl">
              Your phone, before and after Voice.ai Phone
            </h2>
            <p className="mt-5 max-w-lg text-xl text-muted">
              The same day on the line — with and without an AI answering for you.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* Without — muted light card */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-3xl border border-line bg-cloud-2 p-7 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-coral/15">
                  <X className="h-4 w-4 text-coral" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Without Voice.ai Phone
                </span>
              </div>
              <h3 className="display-sm mt-5 text-3xl text-ink-soft sm:text-[2.1rem]">
                Your phone runs you.
              </h3>
              <ul className="mt-6 space-y-3.5">
                {without.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-base text-muted"
                  >
                    <X className="mt-0.5 h-4.5 w-4.5 shrink-0 text-coral/70" />
                    <span dangerouslySetInnerHTML={{ __html: t }} />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* With — black feature tile */}
          <Reveal delay={0.08} className="h-full">
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-night p-7 text-white shadow-[0_24px_60px_-28px_rgba(46,107,245,0.5)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl"
              />
              <WaveMark
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-6 h-48 w-48 text-white/[0.05]"
              />
              <div className="relative flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                  <Check className="h-4 w-4 text-white" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                  With Voice.ai Phone
                </span>
              </div>
              <h3 className="display-sm relative mt-5 text-3xl text-white sm:text-[2.1rem]">
                Your phone runs itself.
              </h3>
              <ul className="relative mt-6 space-y-3.5">
                {withAi.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-3 text-base font-medium text-white/90"
                  >
                    <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-white" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
