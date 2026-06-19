"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const assetClasses = [
  "Tokenized gold / commodities",
  "Tokenized equities",
  "Tokenized treasuries / funds",
  "Other RWA",
];

const orgTypes = ["Exchange / venue", "RWA issuer", "Fund / trading desk", "Market maker", "Other"];

export default function ApplyForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please email us directly.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-3xl text-[var(--color-gold-soft)]">✓</div>
        <h3 className="font-serif text-2xl text-[var(--color-ink)]">Application received</h3>
        <p className="mt-3 max-w-xs text-sm text-[var(--color-muted)]">
          Thank you. We&apos;ll review and get back to you shortly at the email you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-ghost mt-7 rounded-full px-5 py-2.5 text-sm"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h3 className="font-serif text-xl text-[var(--color-ink)]">Pilot application</h3>

      {/* honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Full name *</span>
          <input className="field" name="fullName" required placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Work email *</span>
          <input className="field" type="email" name="email" required placeholder="jane@firm.com" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Company *</span>
          <input className="field" name="company" required placeholder="Firm name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">You are a…</span>
          <select className="field" name="orgType" defaultValue={orgTypes[0]}>
            {orgTypes.map((o) => (
              <option key={o} value={o} className="bg-[var(--color-panel)]">
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Asset class of interest</span>
          <select className="field" name="assetClass" defaultValue={assetClasses[0]}>
            {assetClasses.map((a) => (
              <option key={a} value={a} className="bg-[var(--color-panel)]">
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs text-[var(--color-muted)]">Indicative volume (optional)</span>
          <input className="field" name="volume" placeholder="e.g. $10M / month" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs text-[var(--color-muted)]">What would you pilot?</span>
        <textarea
          className="field min-h-[96px] resize-y"
          name="message"
          placeholder="A sentence or two on your use case, timeline, and any compliance requirements."
        />
      </label>

      {status === "error" && (
        <p className="text-sm text-[#e0a0a0]">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gold w-full rounded-full px-6 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Apply for the pilot"}
      </button>

      <p className="text-center text-xs leading-relaxed text-[var(--color-faint)]">
        We use your details only to evaluate the pilot. No spam.
      </p>
    </form>
  );
}