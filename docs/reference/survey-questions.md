# Canonical Survey Questions

This is the hard-defined River Relief survey basis for future landing pages.
The importable source of truth lives in `src/lib/survey-questions.ts`.

## 1. Debt Type

Question: `What type of debt is giving you the most stress right now?`

Options:

- `Credit Card Debt`
- `Personal Loan Debt`
- `Another Kind Of Debt`

Affirmation:
`Naming the pressure is a faithful first step toward Financial Stewardship.`

## 2. Debt Amount

Question: `How Much Debt Do You Currently Have?`

Options:

- `$0 - $30,000`
- `$30,000 - $50,000`
- `$50,000+`

Affirmation:
`A range is enough. River Relief can help you compare options without shame.`

## 3. Payment Struggle Duration

Question: `How Long Have You Been Struggling With Payments?`

Options:

- `Very Recently`
- `6 Months - 1 Year`
- `1-3 years`
- `3+ Years`

Affirmation:
`There is grace for every timeline. The next step can still be practical.`

## 4. State

Title: `You Qualify For Debt Relief Options!`

Question: `State of Residence*`

Options: all 50 United States.

Affirmation:
`State availability matters. This helps River Relief point you toward the right review path.`

## 5. Contact

Title: `Debt Relief Options Found!`

Question: `Where Should We Send Your Options?`

Fields:

- `firstName`, required
- `lastName`, required
- `email`, required
- `phone`, required
- `tellUsMore`, optional
- `consent`, required

Hidden fields:

- `website`, honeypot
- `landingPage`, current path or variant
- `source`, lead source identifier

Consent text:
`By providing your phone number and checking this box, I consent to receive calls and text messages, including marketing and promotional messages, from River Relief, including through the use of an automatic telephone dialing system or an artificial or prerecorded voice, at any telephone number I provide. Msg and data rates may apply. Consent is not a condition for purchase. For text messages, reply STOP to cancel. If you choose not to consent, you may call us at 800-520-1758 to continue your inquiry.`

Affirmation:
`The integrity of the upright guides them. Proverbs 11:3`
