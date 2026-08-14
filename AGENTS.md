# River Relief Debt Relief Amen LP

This is a lightweight landing-page project for River Relief LLC, a financial
services company helping visitors explore debt relief and personal-loan options.
It shares branding with `river-relief-website-rebuild` but should stay focused:
single-purpose landing pages, conversion forms, and CRM lead delivery.

## Stack

- Next.js 16 App Router, React 19, TypeScript strict mode.
- Tailwind CSS 4 through `@import "tailwindcss"` and `@theme inline` in
  `src/app/globals.css`.
- Keep copy and links in `src/lib/site-config.ts`; components should stay mostly
  presentational.

## Brand

- Use the River Relief brand tokens from `src/app/globals.css`.
- Navy and white should dominate. Avoid tan-heavy layouts.
- CTAs use squared modern rectangles, not pills.
- River Relief is financial services, not an environmental nonprofit.
- Visible CTAs should use debt relief, qualify, call, or review language.
- Phone: `(800) 520-1758`, `tel:8005201758`.

## Leads

- The lead form posts to `src/app/api/leads/route.ts`.
- Configure `CRM_WEBHOOK_URL` when a CRM endpoint is ready.
- Optional: set `CRM_WEBHOOK_SECRET`; it is sent as a bearer token.
- Do not commit real CRM endpoints, API keys, or secrets.

## Before committing

Run:

```bash
npm run format
npm run lint
npm run typecheck
npm run build
```
