# River Relief Debt Relief Amen LP

Lightweight River Relief landing-page workspace.

## Local Development

```bash
npm install
npm run dev
```

## Forth Lead Delivery

The landing page form posts to `/api/leads`, which creates contacts in Forth CRM
and then attempts to create a related debt record. Local secrets live in
`.env.local`; production values should be configured in Vercel.

```bash
FORTH_CLIENT_ID=
FORTH_CLIENT_SECRET=
FORTH_API_BASE_URL=https://api.forthcrm.com/v1
FORTH_LEAD_SOURCE="River Relief Website"
FORTH_LEAD_CAMPAIGN="Website Leads"
```

See `docs/forth-crm-connection.md` for field mapping and current integration
status.
