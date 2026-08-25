# River Relief Forth CRM Data Source Guide

Last updated: 2026-08-24

## Goal

Use Forth CRM Data Source Post URLs for website leads. Do not create normal
contacts through the authenticated Forth contacts API for this flow, because
that bypasses the data source's stage/status, assignment, file type, and import
field mapping behavior.

The website should submit to its own backend endpoint first, then the backend
should POST to the correct Forth Data Source Post URL with query parameters.

## Data Sources

Home page / survey forms:

- Name: `Webform RR - Home Form`
- Data Source ID: `148675`
- Post URL:
  `https://login.forthcrm.com/post/<home-data-source-token>/`

Contact page form:

- Name: `Webform RR - Contact Us - NEW`
- Data Source ID: `148362`
- Post URL:
  `https://login.forthcrm.com/post/<contact-data-source-token>/`

Both Forth data sources should have:

- Stage: `River Relief Sales`
- Status: `Ready to Apply`

Stage/status should be set in the Forth data source configuration, not sent by
the website.

## Request Format

Send a `POST` request to the Forth Data Source Post URL. Put collected values in
query parameters.

No special auth headers are needed for the post URL. Do not copy response
headers from browser/devtools examples into the request.

Example:

```txt
POST https://login.forthcrm.com/post/.../?FirstName=Jane&LastName=Doe&EmailAddress=jane@example.com
```

## Home Page / Survey Payload

Send only the fields collected by the home/survey form:

```txt
FirstName
first_name
LastName
last_name
Email
EmailAddress
HomePhone
Phone
State
How_much_total_debt_are_you_in
Net_Income
```

Field meanings and Forth mappings:

```txt
FirstName or first_name -> Contact First Name
LastName or last_name -> Contact Last Name
Email or EmailAddress -> Contact Email
HomePhone or Phone -> Contact Home Phone
State -> Contact State
How_much_total_debt_are_you_in -> Custom field: How much total debt are you in
Net_Income -> Custom field: Net Income
```

Do not send `Tell_us_more` for home/survey leads.

Do not send debt to any other field such as `total_debt`,
`Balance_of_Unsecured_Accounts`, estimated debt, or debt rows. The collected
debt answer should only go into `How_much_total_debt_are_you_in`.

## Contact Us Payload

Send only the fields collected by the contact page:

```txt
FirstName
first_name
LastName
last_name
Email
EmailAddress
HomePhone
Phone
Tell_us_more
```

Field meanings and Forth mappings:

```txt
FirstName or first_name -> Contact First Name
LastName or last_name -> Contact Last Name
Email or EmailAddress -> Contact Email
HomePhone or Phone -> Contact Home Phone
Tell_us_more -> Custom field: Tell us more...
```

`Tell_us_more` is only for the user's long-form contact message. Do not put a
survey summary in it.

## Important Do-Nots

Do not send:

- Placeholder address values
- `-`
- `N/A`
- `not provided`
- Fake ZIP codes
- Fake street/city values
- Consent values
- Source URL values
- Generated survey summaries
- Direct custom field IDs in the website payload
- Duplicate debt values in multiple CRM fields
- Stage/status values from the website

If the user did not provide a value, omit that field entirely.

## Verified 5.1 Production Results

Home 5.1 test:

- Contact ID: `1247799940`
- Data Source ID: `148675`
- Stage/status: `River Relief Sales / Ready to Apply`
- Email mapped correctly
- Address state mapped as `FL`
- `Net Income` mapped correctly
- `How much total debt are you in` mapped correctly
- No survey summary in `Tell us more`
- Empty address fields stayed empty/null

Contact Us 5.1 test:

- Contact ID: `1247799943`
- Data Source ID: `148362`
- Stage/status: `River Relief Sales / Ready to Apply`
- Email mapped correctly
- `Tell us more...` contained only the long-form contact message
- No home/survey debt, state, or income fields were sent
- Empty address fields stayed empty/null

## Implementation Shape

Backend route logic:

1. Determine whether the submitted form is the contact page form or a
   home/survey form.
2. Build a `URLSearchParams` payload.
3. Add only non-empty cleaned values.
4. Use the contact data source URL for `/contact` leads.
5. Use the home data source URL for all other survey leads.
6. POST to the selected Forth Data Source Post URL with query parameters.
7. Treat a successful response like `Success:{contactId}` as created.
8. Redirect the user to the calendar booking page after successful submission.

Calendar booking should be the next step after all successful submissions.

## Example Home Payload

```txt
FirstName=Home
first_name=Home
LastName=Version51
last_name=Version51
Email=riverrelief.home.5.1@example.com
EmailAddress=riverrelief.home.5.1@example.com
HomePhone=5555177224
Phone=5555177224
State=Florida
How_much_total_debt_are_you_in=$30,000 - $50,000
Net_Income=$3,000 - $5,000
```

## Example Contact Payload

```txt
FirstName=Contact
first_name=Contact
LastName=Version51
last_name=Version51
Email=riverrelief.contact.5.1@example.com
EmailAddress=riverrelief.contact.5.1@example.com
HomePhone=5556177224
Phone=5556177224
Tell_us_more=Contact us 5.1 test: long-form message only.
```
