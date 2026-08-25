# Forth CRM Connection

Last updated: 2026-08-25

This file tracks the Forth CRM integration for the River Relief Debt Free Amen
landing page. Keep credentials and private post URLs in local or Vercel
environment variables only; do not commit secrets.

The implementation reference guide is stored at
`docs/river-relief-forth-crm-data-source-guide.md`.

## Current Status

- Lead submissions post to `/api/leads`.
- `/api/leads` validates the website survey payload, then sends collected lead
  values to a Forth Data Source Post URL through `src/lib/forth.ts`.
- The Forth data source owns stage, status, assignment, file type, and import
  field mapping.
- Successful submission still routes the visitor to `/book-consultation`.
- Local development uses `.env.local`, which is ignored by git.

## Required Environment Variables

- `FORTH_DATA_SOURCE_POST_URL`: Forth Data Source Post URL for the active River
  Relief webform.

## Active Data Source

- Post URL: stored in `FORTH_DATA_SOURCE_POST_URL` for local development and
  Vercel. Do not commit the live post URL token.
- Field map observed on 2026-08-25:
  - `Address` -> Address 1
  - `Campaign` -> Campaign
  - `City` -> City
  - `DOB` -> Date Of Birth
  - `Email` -> Email
  - `EmailAddress` -> Email
  - `FirstName` -> First Name
  - `HomePhone` -> Home Phone
  - `How_much_total_debt_are_you_in` -> How much total debt are you in
  - `LastName` -> Last Name
  - `Net_Income` -> Net Income
  - `State` -> State

## Website Payload

The backend sends a `POST` request to the configured data source URL and puts
lead values in query parameters.

Sent fields:

- `FirstName`
- `first_name`
- `LastName`
- `last_name`
- `Email`
- `EmailAddress`
- `HomePhone`
- `Phone`
- `State`
- `How_much_total_debt_are_you_in`
- `Net_Income`

The duplicate name/email/phone keys are intentional. They preserve compatibility
with the routing guide while the active field map accepts the title-case keys.

## Do Not Send

- Do not send placeholder address values.
- Do not send `-`, `N/A`, `not provided`, fake ZIP codes, or fake city/street
  values.
- Do not send direct custom field IDs.
- Do not send debt values to `total_debt`,
  `Balance_of_Unsecured_Accounts`, estimated debt, debt rows, or any other CRM
  field.
- Do not send stage/status values from the website.
- Do not send generated survey summaries or `Tell_us_more` for this survey
  flow.
- If the user did not provide a value, omit that field entirely.

## Response Handling

Forth responses shaped like `Success:{contactId}` are treated as accepted, and
the returned contact ID is surfaced in the `/api/leads` response as
`forthContactId`.

## Live Test Log

- 2026-08-24: Sent a fake Debt Free Amen LP test lead through the previous
  authenticated contacts API flow. Forth accepted the lead and returned contact
  ID `1247733820`.
- 2026-08-25: Updated the integration to use the Forth Data Source Post URL
  flow for the active River Relief webform.
- 2026-08-25: Sent V1.0 test contact `RiverReliefV1.0 Test` through local
  `/api/leads`. Forth accepted the lead and returned contact ID `1248471208`.
