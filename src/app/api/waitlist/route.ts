import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
// Server-only destination — never sent to the client or bundled.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "";
// Free Resend tier ships from this sender until a domain is verified.
const FROM_ADDRESS =
  process.env.RESEND_FROM ?? "Voice.ai Phone <onboarding@resend.dev>";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email } = (body ?? {}) as Record<string, unknown>;
  const n = typeof name === "string" ? name.trim() : "";
  const e = typeof email === "string" ? email.trim() : "";

  if (!n) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return NextResponse.json(
      { ok: false, error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (n.length > 120 || e.length > 200) {
    return NextResponse.json(
      { ok: false, error: "Input too long." },
      { status: 400 },
    );
  }

  // Until RESEND_API_KEY + CONTACT_EMAIL are set, accept signups in dev so the
  // flow is testable, but never silently drop them in production.
  if (!RESEND_API_KEY || !CONTACT_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[waitlist] (dev · email not configured) signup:", { n, e });
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "Signups are not configured yet." },
      { status: 503 },
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  try {
    const result = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [CONTACT_EMAIL],
      replyTo: e,
      subject: `Early-access signup — ${n}`,
      text: `New Voice.ai Phone early-access signup

Name:  ${n}
Email: ${e}
`,
      html: `<div style="font-family: ui-sans-serif, system-ui, -apple-system, Helvetica, Arial; color:#0a0a0b; line-height:1.55;">
  <h2 style="margin:0 0 12px;font-size:18px;">New early-access signup</h2>
  <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(n)}</p>
  <p style="margin:0 0 6px;"><strong>Email:</strong> ${escapeHtml(e)}</p>
</div>`,
    });
    if (result.error) {
      console.error("Resend error:", result.error);
      const detail =
        (result.error as { message?: string }).message ?? "Unknown send error.";
      return NextResponse.json(
        { ok: false, error: `Signup failed: ${detail}` },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send exception:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { ok: false, error: `Signup failed: ${detail}` },
      { status: 502 },
    );
  }
}
