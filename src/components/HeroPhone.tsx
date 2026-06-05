"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Shield,
  PhoneIcon,
  Calendar,
  Check,
  Bolt,
  Clock,
  Search,
} from "./icons";

type TLine = { t: string; who: string; text: string };

// Cycle 1 — a caller reaches you; your AI identifies them and books the time.
// Neutral on purpose: works for a client (business) or a friend (personal).
const BOOKING_LINES: TLine[] = [
  { t: "00:01", who: "Caller", text: "Hi, is Alex around?" },
  { t: "00:05", who: "AI", text: "He&rsquo;s busy — who&rsquo;s calling?" },
  { t: "00:09", who: "Caller", text: "It&rsquo;s Jordan, re: Tuesday." },
  { t: "00:13", who: "AI", text: "Hi Jordan! Booked Tue 4:30." },
];

// Cycle 2 — your AI screens an unknown caller and shuts down the spammer.
const SPAM_LINES: TLine[] = [
  { t: "00:02", who: "AI", text: "Hi, who&rsquo;s calling please?" },
  { t: "00:06", who: "Caller", text: "Auto warranty department…" },
  { t: "00:11", who: "AI", text: "No thanks — removing this number." },
];

// Per-cycle dwell, balanced — booking has a touch more to read than spam.
const DWELL = [4500, 5000]; // [booking, spam]
// staggered reveal — cards appear one by one in story order
const STEP = [0.15, 0.55, 0.95, 1.35, 1.75];

/* The phone (transparent PNG) with two story cycles of callouts rebuilt in JS/CSS */
export function HeroPhone() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0); // 0 = booking, 1 = spam

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setCycle((c) => (c === 0 ? 1 : 0)), DWELL[cycle]);
    return () => clearTimeout(id);
  }, [reduce, cycle]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]">
      {/* soft brand halo behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      {/* phone — plain <img> (raw PNG, no next/image optimizer) so it always renders.
          Absolutely centered so it never dictates the container height. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/phone-only.png"
          alt="Voice.ai Phone running its AI Call Assistant, screening a live call."
          width={1024}
          height={1024}
          loading="eager"
          decoding="async"
          className="h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(8,12,40,0.18)]"
        />
      </div>

      {/* ---- One story (cycle) at a time. The whole set cross-fades on swap. ---- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          className="absolute inset-0 z-20"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {cycle === 0 ? (
            <BookingScene reduce={reduce} />
          ) : (
            <SpamScene reduce={reduce} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- Scenes ----------------------------- */

function BookingScene({ reduce }: { reduce: boolean | null }) {
  return (
    <>
      {/* 1 · TL primary — AI searches & identifies the caller */}
      <Callout
        reduce={reduce}
        delay={STEP[0]}
        floatDelay="0.9s"
        highlight
        className="left-[-6%] top-[3%] w-[45%] sm:w-[41%]"
      >
        <Row
          icon={<Search className="h-4 w-4 text-brand" />}
          iconBg="bg-brand/10"
          title="Caller identified"
          sub="Jordan Lee"
        />
      </Callout>

      {/* 2 · ML — live transcript of the call */}
      <Callout
        reduce={reduce}
        delay={STEP[1]}
        floatDelay="1.2s"
        className="left-[-7%] top-[37%] w-[47%] sm:w-[43%]"
      >
        <TranscriptCard lines={BOOKING_LINES} reduce={reduce} />
      </Callout>

      {/* 3 · BL — call summary */}
      <Callout
        reduce={reduce}
        delay={STEP[2]}
        floatDelay="0.6s"
        className="bottom-[1%] left-[-5%] w-[46%] sm:w-[42%]"
      >
        <SummaryCard
          rows={[
            {
              icon: <PhoneIcon className="h-3.5 w-3.5 text-brand" />,
              label: "Caller",
              value: "Jordan Lee",
            },
            {
              icon: <Bolt className="h-3.5 w-3.5 text-brand" />,
              label: "Reason",
              value: "Wants to schedule",
            },
            {
              icon: <Check className="h-3.5 w-3.5 text-brand" />,
              label: "Outcome",
              value: "Booked for Tuesday",
            },
          ]}
        />
      </Callout>

      {/* 4 · BR — outcome: appointment booked */}
      <Callout
        reduce={reduce}
        delay={STEP[3]}
        floatDelay="1.6s"
        className="bottom-[8%] right-[-6%] w-[42%] sm:w-[38%]"
      >
        <AppointmentBody reduce={reduce} delay={STEP[3]} />
      </Callout>

      {/* 5 · TR — secondary: reminder set */}
      <Callout
        reduce={reduce}
        delay={STEP[4]}
        floatDelay="0s"
        className="right-[-5%] top-[4%] w-[42%] sm:w-[39%]"
      >
        <Row
          icon={<Clock className="h-4 w-4 text-brand" />}
          iconBg="bg-brand/10"
          title="Reminder set"
          sub="1 day before"
        />
      </Callout>
    </>
  );
}

function SpamScene({ reduce }: { reduce: boolean | null }) {
  return (
    <>
      {/* 1 · TL primary — AI searches, finds no match */}
      <Callout
        reduce={reduce}
        delay={STEP[0]}
        floatDelay="0.9s"
        highlight
        className="left-[-6%] top-[3%] w-[45%] sm:w-[41%]"
      >
        <Row
          icon={<Search className="h-4 w-4 text-coral" />}
          iconBg="bg-coral/10"
          title="No caller match"
          sub="Unknown · likely spam"
        />
      </Callout>

      {/* 2 · ML — live transcript of the screening */}
      <Callout
        reduce={reduce}
        delay={STEP[1]}
        floatDelay="1.2s"
        className="left-[-7%] top-[37%] w-[47%] sm:w-[43%]"
      >
        <TranscriptCard lines={SPAM_LINES} reduce={reduce} />
      </Callout>

      {/* 3 · BL — call summary */}
      <Callout
        reduce={reduce}
        delay={STEP[2]}
        floatDelay="0.6s"
        className="bottom-[1%] left-[-5%] w-[46%] sm:w-[42%]"
      >
        <SummaryCard
          rows={[
            {
              icon: <PhoneIcon className="h-3.5 w-3.5 text-brand" />,
              label: "Caller",
              value: "Unknown number",
            },
            {
              icon: <Bolt className="h-3.5 w-3.5 text-coral" />,
              label: "Risk",
              value: "High · spam",
            },
            {
              icon: <Shield className="h-3.5 w-3.5 text-coral" />,
              label: "Outcome",
              value: "Blocked",
            },
          ]}
        />
      </Callout>

      {/* 4 · BR — outcome: spam blocked (number strikes through) */}
      <Callout
        reduce={reduce}
        delay={STEP[3]}
        floatDelay="1.6s"
        className="bottom-[8%] right-[-6%] w-[42%] sm:w-[38%]"
      >
        <SpamBlockedRow reduce={reduce} delay={STEP[3]} />
      </Callout>

      {/* 5 · TR — secondary: reported */}
      <Callout
        reduce={reduce}
        delay={STEP[4]}
        floatDelay="0s"
        className="right-[-5%] top-[4%] w-[42%] sm:w-[39%]"
      >
        <Row
          icon={<Shield className="h-4 w-4 text-brand" />}
          iconBg="bg-brand/10"
          title="Reported"
          sub="Carrier notified"
        />
      </Callout>
    </>
  );
}

/* ----------------------------- Building blocks ----------------------------- */

function Callout({
  children,
  className = "",
  delay,
  floatDelay,
  reduce,
  highlight = false,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  floatDelay: string;
  reduce: boolean | null;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${highlight ? "z-30" : "z-20"} ${className}`}
    >
      <div className="floaty relative" style={{ animationDelay: floatDelay }}>
        {/* primary card gets a soft blue glow beneath it */}
        {highlight && (
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.6rem] bg-brand/15 blur-2xl"
          />
        )}
        <div
          className={`rounded-2xl border bg-white/95 p-3 backdrop-blur ${
            highlight
              ? "border-brand/20 shadow-[0_16px_40px_-14px_rgba(46,107,245,0.32)] ring-1 ring-brand/10"
              : "border-line shadow-[0_14px_40px_-12px_rgba(8,12,40,0.22)]"
          }`}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function Row({
  icon,
  iconBg,
  title,
  sub,
}: {
  icon: ReactNode;
  iconBg: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold leading-tight text-ink">
          {title}
        </p>
        <p className="truncate text-[9px] leading-tight text-muted">{sub}</p>
      </div>
    </div>
  );
}

function TranscriptCard({
  lines,
  reduce,
}: {
  lines: TLine[];
  reduce: boolean | null;
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-ink">Transcript</p>
        <span className="flex items-center gap-1 text-[8px] font-semibold text-coral">
          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-coral" />
          LIVE
        </span>
      </div>
      <LiveTranscript lines={lines} reduce={reduce} />
      <p className="mt-1.5 text-[8px] text-muted">Transcribed in real time</p>
    </>
  );
}

function SummaryCard({
  rows,
}: {
  rows: { icon: ReactNode; label: string; value: string }[];
}) {
  return (
    <>
      <p className="text-[11px] font-bold text-ink">Call summary</p>
      <ul className="mt-2 space-y-2">
        {rows.map((r) => (
          <SummaryRow key={r.label} {...r} />
        ))}
      </ul>
    </>
  );
}

/* Spam blocked — shield with a light sweep + the number striking through */
function SpamBlockedRow({
  reduce,
  delay = 0,
}: {
  reduce: boolean | null;
  delay?: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-coral/10">
        <Shield className="h-4 w-4 text-coral" />
        {!reduce && (
          <span className="animate-sweep absolute inset-y-0 -left-2 w-2 bg-white/70 blur-[2px]" />
        )}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-bold leading-tight text-ink">
          Spam blocked
        </p>
        <span className="relative inline-block">
          <span className="text-[9px] leading-tight text-muted">
            +1 (555) 012-3456
          </span>
          <motion.span
            aria-hidden
            className="absolute left-0 top-1/2 h-[1.5px] w-full origin-left rounded-full bg-coral"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              reduce
                ? undefined
                : { duration: 0.5, delay: delay + 0.5, ease: "easeInOut" }
            }
          />
        </span>
      </div>
    </div>
  );
}

/* Appointment booked — check pops, then "Added to calendar" appears (after card reveal) */
function AppointmentBody({
  reduce,
  delay = 0,
}: {
  reduce: boolean | null;
  delay?: number;
}) {
  return (
    <>
      <Row
        icon={<Calendar className="h-4 w-4 text-brand" />}
        iconBg="bg-brand/10"
        title="Appointment booked"
        sub="Tue, May 12 · 4:30 PM"
      />
      <motion.span
        className="mt-2 inline-flex items-center gap-1 rounded-pill bg-brand/10 px-2 py-0.5 text-[8px] font-semibold text-brand"
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reduce ? undefined : { duration: 0.4, delay: delay + 0.5, ease: "easeOut" }
        }
      >
        <motion.span
          className="inline-flex"
          initial={reduce ? false : { scale: 0.3 }}
          animate={reduce ? { scale: 1 } : { scale: [0.3, 1.25, 1] }}
          transition={
            reduce
              ? undefined
              : { duration: 0.45, delay: delay + 0.6, times: [0, 0.6, 1], ease: "easeOut" }
          }
        >
          <Check className="h-2.5 w-2.5" />
        </motion.span>
        Added to calendar
      </motion.span>
    </>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-cloud">
        {icon}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="text-[8px] font-medium text-muted">{label}</p>
        <p
          className="truncate text-[9.5px] font-semibold text-ink"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </li>
  );
}

/* Streaming transcript: lines reveal one by one and auto-scroll. Stops when full
   (the parent scene remounts on each cycle, which restarts the stream cleanly). */
function LiveTranscript({
  lines,
  reduce,
}: {
  lines: TLine[];
  reduce: boolean | null;
}) {
  const [count, setCount] = useState(reduce ? lines.length : 1);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || count >= lines.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), 1200);
    return () => clearTimeout(id);
  }, [count, reduce, lines.length]);

  // keep the newest line in view
  useEffect(() => {
    const el = scroller.current;
    if (el)
      el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [count, reduce]);

  return (
    <div
      ref={scroller}
      className="mt-2 h-[54px] space-y-1.5 overflow-hidden"
      aria-hidden
    >
      <AnimatePresence initial={false}>
        {lines.slice(0, count).map((l) => (
          <motion.div
            key={l.t}
            layout
            initial={reduce ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Line {...l} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Line({ t, who, text }: TLine) {
  const ai = who === "AI";
  return (
    <div className="flex gap-1.5">
      <span className="shrink-0 text-[8px] font-semibold tabular-nums text-muted">
        {t}
      </span>
      <p className="text-[8.5px] leading-snug text-ink-soft">
        <span className={`font-bold ${ai ? "text-brand" : "text-ink"}`}>
          {who}:
        </span>{" "}
        <span dangerouslySetInnerHTML={{ __html: text }} />
      </p>
    </div>
  );
}
