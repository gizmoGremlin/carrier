import { Reveal } from "./Reveal";
import { Shield, PhoneIcon, User, Calendar, Note, Arrow } from "./icons";

const handles = [
  {
    icon: Shield,
    title: "Spam & unknown-caller screening",
    body: "Every unknown number is screened before it ever reaches you.",
  },
  {
    icon: PhoneIcon,
    title: "Answering the calls you miss",
    body: "Your AI receptionist picks up in your voice when you can't.",
  },
  {
    icon: User,
    title: "Lead intake & customer questions",
    body: "It captures who's calling, what they need, and answers the basics.",
  },
  {
    icon: Calendar,
    title: "Booking, rescheduling & cancellations",
    body: "Appointments land on your calendar — changes handled automatically.",
  },
  {
    icon: Note,
    title: "Summaries, transcripts & search",
    body: "Every call comes back written up and searchable forever.",
  },
  {
    icon: Arrow,
    title: "Routing the important calls to you",
    body: "Real opportunities get passed straight through — nothing slips.",
  },
];

export function Pillars() {
  return (
    <section id="features" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-cloud/70 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" /> What it
              handles
            </span>
            <h2 className="display-sm mt-5 max-w-3xl text-4xl sm:text-6xl">
              Built for businesses that can&rsquo;t afford to{" "}
              <span className="text-brand">miss a lead.</span>
            </h2>
            <p className="mt-5 max-w-xl text-xl leading-snug text-muted">
              One phone plan that runs the front desk — here&rsquo;s everything
              Voice.ai Phone handles for you.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {handles.map((h, i) => (
            <Reveal key={h.title} delay={(i % 3) * 0.06} className="h-full">
              <article className="group flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-20px_rgba(46,107,245,0.22)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 transition-colors duration-200 group-hover:bg-brand/15">
                  <h.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                  {h.title}
                </h3>
                <p className="mt-2 leading-snug text-muted">{h.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
