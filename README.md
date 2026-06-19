# Veil — landing page

Institutional landing page for **Veil**, the private, compliant settlement layer for tokenized
real-world assets on Starknet. Next.js (App Router) + Tailwind v4, with an "Apply for the pilot"
form that emails each application to you via [Resend](https://resend.com).

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

The form posts to `app/api/apply/route.ts`. Without a `RESEND_API_KEY` it returns a clear
"not configured" message instead of sending — everything else (design, comparison table) works.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes (for the form) | Resend API key — create one at resend.com |
| `APPLY_TO_EMAIL` | recommended | Where applications are delivered (default: `esdrassenasantos@gmail.com`) |
| `APPLY_FROM_EMAIL` | recommended | Verified sender. Defaults to Resend's sandbox `onboarding@resend.dev` |

**Sandbox vs production sender:** `onboarding@resend.dev` works immediately but only delivers to
the email that owns the Resend account — perfect for testing. For production, verify your own domain
in Resend and set `APPLY_FROM_EMAIL=Veil Pilot <pilot@yourdomain.com>`.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel → **New Project** → import the repo (Vercel auto-detects Next.js).
3. Add the env vars above under **Settings → Environment Variables**.
4. Deploy. Add your custom domain under **Settings → Domains** when ready.

Or from the CLI:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

## Editing content

- Copy, features, the comparison table, and the how-it-works steps are plain arrays at the top of
  [`app/page.tsx`](app/page.tsx).
- Form fields live in [`app/components/ApplyForm.tsx`](app/components/ApplyForm.tsx).
- Email formatting + delivery in [`app/api/apply/route.ts`](app/api/apply/route.ts).
- Brand colors / fonts in [`app/globals.css`](app/globals.css) (`@theme` block).
- The logo is `public/veil-logo.png` — swap the file to update it everywhere.

## Notes on honesty

The comparison table and copy describe Veil accurately: it is **live on Starknet Sepolia (testnet),
pending independent audit**, and the DvP settlement is **Tier 1** (private identity + holdings; trade
amounts public, like a lit exchange). Keep these qualifiers if you edit the copy.