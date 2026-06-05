import { Reveal } from "./Reveal";
import { Shield, PhoneIcon, Search } from "./icons";

const cards = [
  {
    n: "02",
    icon: PhoneIcon,
    title: "Answers the calls you miss",
    body: "A virtual receptionist picks up in your chosen voice, takes a message, and only forwards what actually matters.",
  },
  {
    n: "03",
    icon: Search,
    title: "Summarizes & makes it searchable",
    body: "Every call comes back as a clean summary and full transcript. Search any conversation you&rsquo;ve ever had.",
  },
];

export function Pillars() {
  return (
    <section id="features" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-cloud/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Every call, screened
            </span>
            <h2 className="display-sm mt-5 max-w-2xl text-5xl sm:text-7xl">
              One plan. Spam gone, calls handled,{" "}
              <span className="text-brand">nothing missed.</span>
            </h2>
            <p className="mt-5 max-w-xl text-xl text-muted">
              Voice.ai Phone sits between you and every incoming call — doing the
              work your old carrier never could.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          {/* 01 — featured tile: spam gone */}
          <Reveal className="h-full lg:row-span-2">
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-night p-8 text-white">
              {/* ambient glow + watermark */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl"
              />
              <Shield
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-8 h-56 w-56 text-white/[0.05]"
              />

              <span className="relative text-xs font-bold tracking-[0.25em] text-white/35">
                01
              </span>
              <div className="relative mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="display-sm relative mt-6 text-3xl sm:text-4xl">
                Blocks spam before it rings
              </h3>
              <p className="relative mt-3 max-w-sm leading-snug text-white/70">
                Spam callers are screened and handled automatically — your
                phone stays silent so you stay focused.
              </p>

              <div className="relative mt-auto pt-10">
                <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  100% silent · zero interruptions
                </span>
              </div>
            </article>
          </Reveal>

          {/* 02 / 03 — supporting tiles */}
          {cards.map((c, i) => (
            <Reveal key={c.n} delay={0.08 * (i + 1)} className="h-full">
              <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(46,107,245,0.25)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 transition-colors duration-200 group-hover:bg-brand/15">
                    <c.icon className="h-6 w-6 text-brand" />
                  </div>
                  <span className="text-xs font-bold tracking-[0.25em] text-brand/30">
                    {c.n}
                  </span>
                </div>
                <h3 className="display-sm mt-6 text-2xl text-ink">
                  {c.title}
                </h3>
                <p
                  className="mt-3 leading-snug text-muted"
                  dangerouslySetInnerHTML={{ __html: c.body }}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
