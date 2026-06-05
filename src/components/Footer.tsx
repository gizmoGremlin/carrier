import { Wordmark } from "./icons";
import { GetStartedButton } from "./Waitlist";

const groups = [
  {
    title: "Product",
    links: ["How it works", "Features", "Plans", "For business", "Download app"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Acceptable use", "Number porting", "Coverage"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-base leading-snug text-muted">
              The first AI-native phone carrier. Spam blocked, calls answered,
              every conversation summarized — for less than you pay today.
            </p>
            <div className="mt-5 flex gap-3">
              <GetStartedButton className="rounded-pill bg-ink px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80">
                Get started
              </GetStartedButton>
            </div>
          </div>

          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-base font-bold text-ink">{g.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-base text-muted transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-7 text-base text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Voice.ai Phone. All rights reserved.</p>
          <p>Made for people who&rsquo;d rather not pick up.</p>
        </div>
      </div>
    </footer>
  );
}
