import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "James Anderson",
    role: "Joined early access",
    initial: "J",
    tint: "bg-brand/10 text-brand",
    quote:
      "Signed up for early access expecting a gimmick. Now unknown numbers never reach me — no random interruptions while I work.",
  },
  {
    name: "Mia Miller",
    role: "Early access · week 1",
    initial: "M",
    tint: "bg-brand/10 text-brand",
    quote:
      "Early access sold me in a week. It screens every call and keeps me on top of follow-ups, so I stay focused on patients.",
  },
  {
    name: "Daniel Reyes",
    role: "Early access · business line",
    initial: "D",
    tint: "bg-brand/10 text-brand",
    quote:
      "Got early access for my business line and it books jobs while I'm on a ladder. Haven't missed a lead since.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-ink">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15l-5.3 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="border-y border-line bg-cloud-2 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="display-sm mx-auto max-w-2xl text-center text-5xl sm:text-7xl">
            People are done answering random calls
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-xl text-muted">
            What our early-access members are telling us.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-7">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${r.tint}`}
                    >
                      {r.initial}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-ink">{r.name}</div>
                      <div className="text-xs text-muted">{r.role}</div>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-pill bg-brand/10 px-2.5 py-1 text-[11px] font-semibold text-brand">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Early
                    access
                  </span>
                </div>
                <Stars />
                <blockquote className="mt-4 leading-snug text-ink-soft">
                  “{r.quote}”
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
