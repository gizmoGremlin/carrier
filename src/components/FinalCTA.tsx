import { Reveal } from "./Reveal";
import { Arrow, WaveMark } from "./icons";
import { GetStartedButton } from "./Waitlist";

export function FinalCTA() {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-night px-7 py-16 text-center text-white sm:px-12 sm:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 left-1/2 h-[480px] w-[700px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(46,107,245,0.55), rgba(46,107,245,0.18), transparent)",
              }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80">
                <WaveMark className="h-4 w-4" /> Switch in minutes
              </span>
              <h2 className="display mx-auto mt-6 max-w-2xl text-5xl sm:text-7xl">
                Never miss a call again.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-xl text-white/65">
                Every call answered. Zero effort. Switch to the carrier that
                works while you don&rsquo;t.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GetStartedButton className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-white px-7 py-4 text-base font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto">
                  Get started — keep your number
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </GetStartedButton>
                <a
                  href="#how"
                  className="inline-flex w-full items-center justify-center rounded-pill border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  See how it works
                </a>
              </div>
              <p className="mt-6 text-sm text-white/40">
                30-day free trial · No SIM swap headache · Cancel anytime
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
