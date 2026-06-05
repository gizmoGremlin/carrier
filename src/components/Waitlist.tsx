"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Arrow, Check, WaveMark, X } from "./icons";
import { trackPixel, trackPixelCustom } from "./MetaPixel";

type Ctx = { open: () => void };
const WaitlistCtx = createContext<Ctx | null>(null);

export function useWaitlist() {
  const ctx = useContext(WaitlistCtx);
  if (!ctx) throw new Error("useWaitlist must be used within WaitlistProvider");
  return ctx;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
    trackPixelCustom("FormOpened", { content_name: "Get started form" });
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <WaitlistCtx.Provider value={{ open }}>
      {children}
      <WaitlistModal isOpen={isOpen} onClose={close} />
    </WaitlistCtx.Provider>
  );
}

/** Styled CTA that opens the waitlist modal. */
export function GetStartedButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useWaitlist();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  // ESC to close + lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  // reset shortly after close so re-opening is fresh
  useEffect(() => {
    if (isOpen) return;
    const id = window.setTimeout(() => {
      setStatus("idle");
      setError(null);
      setName("");
      setEmail("");
      setPhone("");
    }, 300);
    return () => window.clearTimeout(id);
  }, [isOpen]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      trackPixel("Lead", { content_name: "Get started form" });
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Get started"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-[0_40px_90px_-30px_rgba(8,12,40,0.5)] sm:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-cloud hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
                  <Check className="h-7 w-7 text-brand" />
                </div>
                <h2 className="display-sm mt-5 text-2xl">You&rsquo;re all set.</h2>
                <p className="mx-auto mt-2 max-w-xs text-muted">
                  Thanks{name ? `, ${name.split(" ")[0]}` : ""}! We&rsquo;ll reach
                  out at <span className="font-semibold text-ink">{email}</span>{" "}
                  to get you set up.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center justify-center rounded-pill bg-ink px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-cloud/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                  <WaveMark className="h-3.5 w-3.5" /> Get started
                </span>
                <h2 className="display-sm mt-4 text-2xl sm:text-3xl">
                  Switch in minutes
                </h2>
                <p className="mt-2 text-muted">
                  Drop your details and we&rsquo;ll reach out to get you set up
                  on the carrier that thinks — keep your number.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-3">
                  <div>
                    <label htmlFor="wl-name" className="sr-only">
                      Name
                    </label>
                    <input
                      id="wl-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(ev) => setName(ev.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-line bg-cloud-2 px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="wl-email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="wl-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-2xl border border-line bg-cloud-2 px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
                    />
                  </div>
                  <div>
                    <label htmlFor="wl-phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="wl-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      value={phone}
                      onChange={(ev) => setPhone(ev.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-2xl border border-line bg-cloud-2 px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15"
                    />
                  </div>

                  {error && (
                    <p className="text-sm font-medium text-coral">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-ink px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      "Getting started…"
                    ) : (
                      <>
                        Get started
                        <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
                <p className="mt-3 text-center text-xs text-muted">
                  No spam. We&rsquo;ll only reach out about getting you set up.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
