import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.APPLY_TO_EMAIL || "esdrassenasantos@gmail.com";
const FROM = process.env.APPLY_FROM_EMAIL || "Veil Pilot <onboarding@resend.dev>";

const isEmail = (s: unknown) => typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const clean = (s: unknown, max = 2000) =>
  String(s ?? "").replace(/[<>]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field.
  if (clean(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const fullName = clean(body.fullName, 120);
  const email = clean(body.email, 160);
  const company = clean(body.company, 160);
  const orgType = clean(body.orgType, 80);
  const assetClass = clean(body.assetClass, 80);
  const volume = clean(body.volume, 120);
  const message = clean(body.message, 4000);

  if (!fullName || !company || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide your name, company and a valid work email." },
      { status: 422 },
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot deliver application.");
    return NextResponse.json(
      { ok: false, error: "Submissions aren't configured yet. Please email us directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows: [string, string][] = [
    ["Name", fullName],
    ["Email", email],
    ["Company", company],
    ["Type", orgType],
    ["Asset class", assetClass],
    ["Volume", volume || "—"],
  ];

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="font-family:Georgia,serif;margin:0 0 4px">New Veil pilot application</h2>
      <p style="color:#666;margin:0 0 18px">Submitted via the landing page.</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 10px;background:#f6f6f4;border:1px solid #eee;font-weight:600;width:130px">${k}</td><td style="padding:8px 10px;border:1px solid #eee">${v}</td></tr>`,
          )
          .join("")}
      </table>
      ${
        message
          ? `<p style="font-weight:600;margin:18px 0 6px">Use case</p><p style="white-space:pre-wrap;font-size:14px;line-height:1.6">${message}</p>`
          : ""
      }
    </div>`;

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Veil pilot — ${company} (${fullName})`,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please email us directly." },
      { status: 502 },
    );
  }
}