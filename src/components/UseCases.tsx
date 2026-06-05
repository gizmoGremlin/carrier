import { Reveal } from "./Reveal";
import { User, Briefcase, Check } from "./icons";

const personalPoints = [
  "Filter & redirect unknown numbers",
  "Take messages while you&rsquo;re busy",
  "A second number for the things you&rsquo;d rather keep separate",
];

const businessPoints = [
  "Auto-book appointments 24/7",
  "Answer questions about your services",
  "Handle rescheduling & cancellations",
];

export function UseCases() {
  return (
    <section id="usecases" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display-sm mx-auto max-w-2xl text-center text-5xl sm:text-7xl">
            Built for your life <span className="text-brand">and</span> your
            business
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-xl text-muted">
            One carrier, tuned to how you actually use your phone — switch the
            moment your day does.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Personal — light card */}
          <Reveal className="h-full">
            <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(46,107,245,0.22)]">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10">
                  <User className="h-6 w-6 text-brand" />
                </span>
                <span className="rounded-pill bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
                  Personal
                </span>
              </div>
              <h3 className="display-sm mt-6 text-3xl text-ink sm:text-[2.4rem]">
                Stay connected to who matters
              </h3>
              <p className="mt-3 text-xl leading-snug text-muted">
                Stop spam, screen the unknown, and handle calls on your schedule.
                It keeps you on top of follow-ups so you never drop a thread.
              </p>
              <ul className="mt-7 space-y-3">
                {personalPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <Check className="h-3.5 w-3.5 text-brand" />
                    </span>
                    <span
                      className="text-ink-soft"
                      dangerouslySetInnerHTML={{ __html: p }}
                    />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          {/* Business — deep-blue feature tile */}
          <Reveal delay={0.08} className="h-full">
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-night p-8 text-white">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl"
              />
              <Briefcase
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 text-white/[0.05]"
              />
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Briefcase className="h-6 w-6 text-white" />
                </span>
                <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ring-1 ring-white/15">
                  Business · SMB
                </span>
              </div>
              <h3 className="display-sm relative mt-6 text-3xl text-white sm:text-[2.4rem]">
                Never lose a lead again
              </h3>
              <p className="relative mt-3 text-xl leading-snug text-white/70">
                A receptionist answers every call, books appointments on
                your calendar, and responds to customers instantly — even when
                you&rsquo;re with another client.
              </p>
              <ul className="relative mt-7 space-y-3">
                {businessPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-white/85">{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
