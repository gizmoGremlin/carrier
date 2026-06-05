import { Reveal } from "./Reveal";

const reviews = [
  {
    name: "James Anderson",
    role: "CEO at CyberTech",
    initial: "J",
    tint: "bg-brand/10 text-brand",
    quote:
      "I love how it filters unknown calls and redirects them. No more distractions from random numbers while I'm working.",
  },
  {
    name: "Mia Miller",
    role: "Registered Nurse",
    initial: "M",
    tint: "bg-brand/10 text-brand",
    quote:
      "Voice.ai Phone keeps me on top of tasks and follow-ups, so I can focus on delivering great care to my patients.",
  },
  {
    name: "Daniel Reyes",
    role: "Owner, Reyes Cleaning Co.",
    initial: "D",
    tint: "bg-brand/10 text-brand",
    quote:
      "It books jobs while I'm on a ladder. I haven't missed a lead since I switched — it genuinely pays for itself.",
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
