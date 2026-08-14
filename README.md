# River Relief Debt Relief Amen LP

Lightweight River Relief landing-page workspace.

## Local Development

```bash
npm install
npm run dev
```

## CRM Lead Delivery

The landing page form posts to `/api/leads`. Add these variables when a CRM is
ready:

```bash
CRM_WEBHOOK_URL="https://example-crm.test/leads"
CRM_WEBHOOK_SECRET="optional-bearer-token"
```

Without `CRM_WEBHOOK_URL`, submissions validate and return success in local
development without forwarding anywhere.
