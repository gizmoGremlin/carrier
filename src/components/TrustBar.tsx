import { Reveal } from "./Reveal";

const stats = [
  { value: "3+ hrs", label: "saved every week" },
  { value: "100%", label: "of calls answered" },
  { value: "0", label: "spam interruptions" },
  { value: "24/7", label: "AI on the line" },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-cloud-2">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Keep your number · switch in minutes · cancel anytime
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <div className="text-center">
                <div className="display-sm text-4xl text-ink sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-base text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
