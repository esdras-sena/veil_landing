import Image from "next/image";
import ApplyForm from "./components/ApplyForm";

/* ----------------------------------------------------------------- data --- */

const problems = [
  {
    title: "Front-running",
    body: "Visible order flow and on-chain positions get picked off — institutions get worse execution the moment they accumulate.",
  },
  {
    title: "Client-data exposure",
    body: "A wallet tied to a real client makes its holdings permanent public data, colliding with GDPR, bank secrecy and fiduciary duty.",
  },
  {
    title: "Institutions stay away",
    body: "Regulated firms legally cannot trade where positions are public. The serious flow never arrives on a transparent chain.",
  },
];

const features = [
  {
    title: "Encrypted holdings",
    body: "A tokenized asset becomes an encrypted note on-chain — ownership, amounts and transfers hidden from everyone but you and authorized auditors.",
  },
  {
    title: "KYC + ERC-3643 compliance",
    body: "Every transfer is proven to satisfy eligibility, can-transfer, freeze, pause and country rules — enforced privately, inside the proof.",
  },
  {
    title: "Issuer controls preserved",
    body: "Freeze and forced-transfer (recovery / clawback) execute even on an encrypted holding. Issuers never give up control.",
  },
  {
    title: "Auditor view keys",
    body: "Selective, provably-scoped disclosure on lawful request — the auditor reads one user, never the uninvolved rest.",
  },
  {
    title: "Private atomic DvP",
    body: "Asset-for-cash settles atomically, with the maker's limit price and per-token conservation enforced on-chain.",
  },
  {
    title: "Starknet-native proofs",
    body: "SNIP-36 in-protocol verification with the Stwo STARK prover — no trusted setup, post-quantum, no new chain, no bridge.",
  },
];

const steps = [
  { n: "01", title: "Deposit", body: "A tokenized RWA enters the pool and becomes an encrypted holding." },
  { n: "02", title: "Transact", body: "Hold, transfer or trade through your platform — exchange, issuer, fund or desk. Any order flow or matching stays off-chain." },
  { n: "03", title: "Settle", body: "Veil settles privately on-chain — atomic DvP for trades, confidential transfers otherwise. Balances and counterparties stay hidden." },
  { n: "04", title: "Disclose", body: "Issuers keep freeze & recovery; auditors get view-key access only when the law requires." },
];

type Mark = "yes" | "partial" | "no";

const compCols = [
  "Confidential holdings",
  "KYC + auditor disclosure",
  "RWA issuer controls",
  "Private DvP settlement",
  "Public chain · self-custody",
];

const compRows: { name: string; approach: string; highlight?: boolean; cells: Mark[] }[] = [
  { name: "Veil", approach: "zk-STARK · Starknet", highlight: true, cells: ["yes", "yes", "yes", "yes", "yes"] },
  { name: "Zama", approach: "FHE · fhEVM (cross-chain)", cells: ["yes", "partial", "partial", "partial", "yes"] },
  { name: "Canton Network", approach: "Permissioned · need-to-know", cells: ["yes", "yes", "yes", "yes", "no"] },
  { name: "Aztec", approach: "zk-SNARK · privacy L2", cells: ["yes", "partial", "no", "partial", "yes"] },
  { name: "Aleo", approach: "zk-SNARK · privacy L1", cells: ["yes", "partial", "no", "no", "yes"] },
  { name: "Railgun", approach: "zk · EVM privacy system", cells: ["yes", "partial", "no", "no", "yes"] },
  { name: "Panther", approach: "zk · privacy DeFi", cells: ["yes", "partial", "no", "no", "yes"] },
  { name: "Renegade", approach: "MPC + zk · dark pool", cells: ["yes", "no", "no", "yes", "yes"] },
  { name: "Confidential EVMs", approach: "TEE / FHE · Oasis, Inco, Fhenix, COTI", cells: ["yes", "no", "no", "no", "yes"] },
];

/* ----------------------------------------------------------- components --- */

function Mark({ v }: { v: Mark }) {
  if (v === "yes") return <span className="text-[var(--color-gold-soft)] text-lg leading-none">✓</span>;
  if (v === "partial") return <span className="text-[var(--color-faint)] text-lg leading-none">◐</span>;
  return <span className="text-[var(--color-faint)]/50 text-lg leading-none">✕</span>;
}

function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image src="/veil-logo.png" alt="Veil" width={size} height={size} priority className="rounded-md" />
      <span className="font-serif text-xl tracking-[0.12em] metallic">VEIL</span>
    </span>
  );
}

/* ----------------------------------------------------------------- page --- */

export default function Home() {
  return (
    <main className="relative">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-[var(--color-muted)] md:flex">
            <a className="transition hover:text-[var(--color-ink)]" href="#problem">The blocker</a>
            <a className="transition hover:text-[var(--color-ink)]" href="#how">How it works</a>
            <a className="transition hover:text-[var(--color-ink)]" href="#compare">Compare</a>
            <a className="transition hover:text-[var(--color-ink)]" href="#pilot">Pilot</a>
          </div>
          <a href="#pilot" className="btn-gold rounded-full px-4 py-2 text-sm">
            Apply for pilot
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-36 pb-24 md:pt-44 md:pb-28">
        <div className="grid-bg pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[620px] -translate-x-1/2 glow" />
        <div className="relative mx-auto max-w-4xl text-center fade-up">
          <div className="mb-9 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 glow" />
              <Image
                src="/veil-logo.png"
                alt="Veil logo"
                width={104}
                height={104}
                priority
                className="relative rounded-2xl"
              />
            </div>
          </div>
          <p className="kicker mb-6">Confidential · Compliant · On-chain</p>
          <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-gradient sm:text-5xl md:text-6xl">
            Private, compliant settlement for tokenized real-world assets.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--color-muted)] md:text-lg">
            Veil turns a tokenized asset into an encrypted holding — ownership, balances and transfers hidden —
            while KYC, issuer controls and authorized-auditor view keys stay fully intact. The confidential
            settlement layer for institutions, built on Starknet.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#pilot" className="btn-gold w-full rounded-full px-7 py-3.5 text-sm sm:w-auto">
              Apply for the pilot
            </a>
            <a href="#how" className="btn-ghost w-full rounded-full px-7 py-3.5 text-sm sm:w-auto">
              How it works
            </a>
          </div>
          <p className="mt-10 text-xs leading-relaxed text-[var(--color-faint)]">
            Starknet-native · SNIP-36 in-protocol proofs · Stwo STARK — no trusted setup · ERC-3643 + ERC-721 · Live on Sepolia
          </p>
        </div>
      </section>

      {/* Problem */}
      <section id="problem" className="border-t border-[var(--color-line)] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker mb-4">The blocker</p>
          <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
            RWA can&apos;t run on a chain that exposes every position.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((p) => (
              <div key={p.title} className="panel panel-hover rounded-2xl p-6">
                <div className="mb-4 h-px w-10 bg-[var(--color-gold)]/70" />
                <h3 className="text-lg font-medium text-[var(--color-ink)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-serif text-xl italic text-[var(--color-gold-soft)] md:text-2xl">
            Privacy here isn&apos;t a feature. It&apos;s the precondition for institutional volume.
          </p>
        </div>
      </section>

      {/* Solution / stack */}
      <section className="border-t border-[var(--color-line)] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="kicker mb-4">The layer</p>
          <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
            You run the platform. Veil is the confidential settlement underneath.
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
            Veil isn&apos;t an exchange or an issuer. Exchanges, issuers, funds and desks keep their product,
            users and operations; Veil settles the result privately and compliantly on-chain.
          </p>

          <div className="mt-12 space-y-3">
            <div className="panel rounded-2xl px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-serif text-lg tracking-wide text-[var(--color-ink)]">YOUR PLATFORM</span>
                <span className="text-sm text-[var(--color-muted)]">Exchange · Issuer · Fund · Desk — product, users, UX</span>
              </div>
            </div>
            <div className="text-center text-xs tracking-[0.25em] text-[var(--color-gold)]">
              ▲ &nbsp; PRIVATE, COMPLIANT SETTLEMENT &nbsp; ▼
            </div>
            <div className="rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-panel)] px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-serif text-lg tracking-wide metallic">VEIL</span>
                <span className="text-sm text-[var(--color-muted)]">
                  Hidden positions · KYC + issuer controls · Auditor view keys · Provable on-chain
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-line)] px-6 py-4 text-center text-sm text-[var(--color-faint)]">
              STARKNET — native to your stack. No new chain, no bridge.
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[var(--color-line)] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker mb-4">What you get</p>
          <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
            Privacy by default. Disclosure only when the law demands.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="panel panel-hover rounded-2xl p-6">
                <h3 className="text-base font-medium text-[var(--color-ink)]">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-[var(--color-line)] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker mb-4">How it works</p>
          <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
            From tokenized asset to confidential settlement.
          </h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="panel rounded-2xl p-6">
                <div className="font-serif text-2xl text-[var(--color-gold)]/80">{s.n}</div>
                <h3 className="mt-4 text-lg font-medium text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="compare" className="border-t border-[var(--color-line)] px-5 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="kicker mb-4">How Veil compares</p>
          <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
            The only stack that is private, compliant and self-custodial at once.
          </h2>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-sm">
              <thead>
                <tr className="text-[var(--color-faint)]">
                  <th className="py-4 pr-4 text-left font-medium">Protocol</th>
                  <th className="px-3 py-4 text-left font-medium">Approach</th>
                  {compCols.map((c) => (
                    <th key={c} className="px-3 py-4 text-center font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compRows.map((r) => (
                  <tr
                    key={r.name}
                    className={`border-t border-[var(--color-line)] ${
                      r.highlight ? "bg-[var(--color-gold)]/[0.06]" : ""
                    }`}
                  >
                    <td
                      className={`py-3.5 pr-4 text-left font-medium ${
                        r.highlight ? "text-[var(--color-gold-soft)]" : "text-[var(--color-ink)]"
                      }`}
                    >
                      {r.name}
                    </td>
                    <td className="px-3 py-3.5 text-left text-xs text-[var(--color-muted)]">{r.approach}</td>
                    {r.cells.map((cell, ci) => (
                      <td key={ci} className="px-3 py-3.5 text-center">
                        <Mark v={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--color-faint)]">
            <span><span className="text-[var(--color-gold-soft)]">✓</span> supported</span>
            <span><span className="text-[var(--color-faint)]">◐</span> partial / emerging</span>
            <span><span className="text-[var(--color-faint)]/50">✕</span> not a focus</span>
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--color-muted)]">
            Closest overlaps: <span className="text-[var(--color-ink)]">Canton Network</span> leads institutional
            RWA but is permissioned — no public-chain access or self-custody; <span className="text-[var(--color-ink)]">Zama</span> brings
            FHE confidential tokens to Ethereum but isn&apos;t an RWA settlement venue with issuer controls and DvP;
            <span className="text-[var(--color-ink)]"> Renegade</span> nails private trading but carries no compliance
            or issuer layer. Veil is the only one combining confidential holdings, ERC-3643 compliance with auditor
            disclosure, issuer controls, and private DvP on a public, self-custodial chain.
          </p>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-[var(--color-faint)]">
            Positioning as of mid-2026, by each project&apos;s primary design focus — not a feature-by-feature audit.
            &quot;Confidential EVMs&quot; groups TEE/FHE infrastructure (Oasis Sapphire, Inco, Fhenix, COTI). Veil is
            live on Starknet Sepolia (testnet) and pending independent audit. Sources: project docs, Messari,
            CoinGecko, Canton Network.
          </p>
        </div>
      </section>

      {/* Pilot / Apply */}
      <section id="pilot" className="border-t border-[var(--color-line)] px-5 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="kicker mb-4">Apply for the pilot</p>
            <h2 className="font-serif text-3xl leading-tight text-gradient md:text-4xl">
              Prove a confidential RWA market end-to-end — at zero risk.
            </h2>
            <p className="mt-5 max-w-md text-[var(--color-muted)]">
              We run a low-risk pilot entirely on Starknet testnet: private positions, compliant settlement,
              issuer controls and auditor access. Contracts are deployed and the SDK is ready — it&apos;s mostly
              integration.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--color-muted)]">
              {[
                "Zero production exposure, zero regulatory exposure.",
                "A working demo in a few weeks.",
                "For exchanges, RWA issuers, funds and institutional desks.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-0.5 text-[var(--color-gold-soft)]">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-[var(--color-faint)]">
              Prefer email? <a className="text-[var(--color-gold-soft)] underline-offset-4 hover:underline" href="mailto:esantoz@protonmail.com">esantoz@protonmail.com</a>
            </p>
          </div>

          <div className="panel rounded-2xl p-6 md:p-8">
            <ApplyForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-line)] px-5 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <Logo size={26} />
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-[var(--color-faint)]">
              The privacy and compliance layer for tokenized real-world assets on Starknet.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-xs text-[var(--color-faint)] md:items-end">
            <div className="flex gap-5">
              <a className="transition hover:text-[var(--color-ink)]" href="https://x.com/Veil_rwa" target="_blank" rel="noreferrer">X / Twitter</a>
              <a className="transition hover:text-[var(--color-ink)]" href="mailto:esantoz@protonmail.com">Contact</a>
              <a className="transition hover:text-[var(--color-ink)]" href="#pilot">Apply</a>
            </div>
            <p className="mt-2 tracking-[0.2em]">CONFIDENTIAL · COMPLIANT · ON-CHAIN</p>
            <p className="text-[var(--color-faint)]/70">© {new Date().getFullYear()} Veil. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}