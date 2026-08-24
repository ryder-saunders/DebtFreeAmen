# Forth CRM Connection

Last updated: 2026-08-24

This file tracks the Forth CRM integration for the River Relief Debt Free Amen
landing page. Keep credentials in local or Vercel environment variables only;
do not commit secrets.

## Current Status

- Lead submissions post to `/api/leads`.
- `/api/leads` validates the website survey payload, then creates a Forth
  contact through `src/lib/forth.ts`.
- After a Forth contact is created, the app attempts to create one related debt
  record through `POST /v1/debts` when a contact ID is returned.
- Successful submission still routes the visitor to `/book-consultation`.
- Local development uses `.env.local`, which is ignored by git.

## Required Environment Variables

- `FORTH_CLIENT_ID`
- `FORTH_CLIENT_SECRET`
- `FORTH_API_BASE_URL`
- `FORTH_LEAD_SOURCE`
- `FORTH_LEAD_CAMPAIGN`

Optional overrides:

- `FORTH_CREATE_DEBT_RECORDS`, defaults to enabled unless set to `false`
- `FORTH_WEBSITE_INTAKE_CREDITOR_ID`, defaults to `28280013`
- `FORTH_CAMPAIGN_ID`
- `FORTH_FIELD_ESTIMATED_DEBT_ID`, defaults to `749411`
- `FORTH_FIELD_LEAD_TYPE_ID`, defaults to `749418`
- `FORTH_FIELD_LEAD_SOURCE_ID`, defaults to `750639`
- `FORTH_FIELD_ORIGINAL_DATA_SOURCE_ID`, defaults to `750532`
- `FORTH_FIELD_UTM_CAMPAIGN_ID`, defaults to `774881`
- `FORTH_FIELD_BALANCE_OF_UNSECURED_ACCOUNTS_ID`, defaults to `750771`
- `FORTH_FIELD_NET_INCOME_ID`, defaults to `750765`
- `FORTH_FIELD_STRUGGLING_TO_MAKE_PAYMENTS_ID`, defaults to `760267`
- `FORTH_FIELD_TELL_US_MORE_ID`, defaults to `750868`

## Contact Mapping

Standard Forth contact fields:

- First name -> `first_name`
- Last name -> `last_name`
- Email -> `email`
- Phone/HomePhone -> `phone_number`
- State -> `state`
- Numeric debt estimate -> `total_debt`

Applicant address:

- `address.state`: two-letter state abbreviation
- `address.address1`: `-`
- `address.city`: `-`
- `address.zip`: `00000`
- `address.address2`: empty string
- `address.address3`: empty string

Forth requires `address1`, `city`, and `zip` when sending Applicant Address.
Use only the neutral filler values above.

## Custom Fields

- `750868` / `Tell us more...`: generated website survey summary
- `750771` / `Total Unsecured Debt`: selected debt range
- `750765` / `Net Income`: selected monthly take-home pay
- `749411` / `Estimated Debt`: closest Forth debt-range option
- `749418` / `Lead Type`: `debt-consolidation-intake`
- `750639` / `Lead Source`: `Website`
- `760267` / `Struggling to Make Payments`: `Yes`
- `750532` / `Original Data Source`: configured `FORTH_LEAD_SOURCE`
- `774881` / `UTM Campaign`: configured `FORTH_LEAD_CAMPAIGN`

Estimated debt option mapping:

- `$0 - $30,000` -> `$20,000 - $30,000`
- `$30,000 - $50,000` -> `$30,000 - $40,000`
- `$50,000+` -> `$50,000 - $60,000`

Numeric estimate mapping:

- `$0 - $30,000` -> `30000`
- `$30,000 - $50,000` -> `40000`
- `$50,000+` -> `50000`

## Do Not Send

- Do not populate `749414` / `Hardship Description`.
- Do not include consent value in Forth custom fields or notes.
- Do not include source URL or landing page URL in Forth custom fields or
  notes.
- Do not write `Not Provided` into address fields.

## Debt Record

When contact creation returns a contact ID, create a related debt record:

- `client_id`: Forth contact ID
- `creditor`: configured website intake creditor ID, default `28280013`
- `debt_type`: `186` / Unknown, because this landing page does not ask debt
  type
- `original_debt_amount`: numeric debt estimate
- `current_debt_amount`: numeric debt estimate
- `notes`: selected debt range, state, address state abbreviation,
  combine-debt answer, monthly take-home pay, and survey version

## Reference Record

Use this Forth contact as the reference for expected field appearance:

- Name: `mapping version4.6`
- Contact ID: `1247721064`
- Email: `riverrelief.mapping.version4.6+20260824193951@example.com`
- Phone: `5554193951`
- Link:
  `https://login.debtpaypro.com/index.php?module=contacts&page=view&id=1247721064`

## Live Test Log

- 2026-08-24: Sent a fake Debt Free Amen LP test lead through local
  `/api/leads` with `.env.local` Forth credentials. Forth accepted the lead and
  returned contact ID `1247733820`. Test used Florida, `$30,000 - $50,000`,
  combine debt `Yes`, and `$3,000 - $5,000` take-home pay.
