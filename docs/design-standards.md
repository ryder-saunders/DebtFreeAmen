# River Relief Design Standards

Use these standards for the homepage and every new page until the client
changes direction.

## Conversion Rules

- Every major section needs a clear CTA. Prefer `Qualify For Debt Relief`,
  `Qualify Today`, `Call River Relief`, or `Talk With Us`.
- CTAs that are not contact links or inbound phone calls should route into
  the focused conversion funnel at `/qualify`.
- Funnel pages stay intentionally narrow: centered-logo header only, hero,
  SBS survey, one supporting component, then redirect to `/review-complete`
  after form submission. Keep the standard footer, but do not show the
  sticky mobile CTA on funnel routes.
- The phone number is `(800) 520-1758`; links should use `tel:8005201758`.
- Avoid the word `intake` in visible CTAs. Use help, qualify, review, call,
  or debt relief language instead.
- The online flow should feel like a private multistep survey that gathers a
  CRM-ready borrower profile over time. Step-by-step survey questions stay
  single-select until contact information.
- Keep copy short. Financial services pages convert better when the user can
  scan benefits, steps, and proof quickly.

## Visual Direction

- Avoid tan-heavy layouts. Use a regal, modern navy and white foundation with
  restrained grey text and small green/red status accents when useful.
- Do not use the common AI pattern of decorative colored side strips on boxes.
- Buttons should be squared modern rectangles with modest radius, not pills.
- Icons should be standalone SVGs, usually from the local lucide-style icon
  set in `src/components/icons.tsx`; do not put icons inside little square
  icon containers unless a specific status badge is needed.
- Use realistic generated or sourced imagery on website pages. Follow
  `docs/image-generation-guide.md` before generating, editing, selecting, or
  placing images.

## Layout Preferences

- The header is not sticky at any viewport.
- Desktop nav should feel advanced, with top-level pages and dropdown options.
- Mobile nav uses a right-side drawer. Keep a visible CTA immediately left of
  the hamburger.
- Use section padding around `py-12` by default. Avoid large empty vertical
  gaps.
- On mobile, repeated cards should be compact: icon left, text right, icon
  vertically centered with the text block.
- Where two sides exist, put the CTA on the side that does not make the
  section taller.
- On mobile, hero trust items use a 2-column by 3-row grid. Fit cards stay
  side by side unless the content becomes unreadable.
- Contact mobile keeps the advisor image/name/status in a short horizontal
  profile card, with phone and debt-relief CTA buttons below.

## Copy Tone

- River Relief is a financial services/debt relief company, not an
  environmental nonprofit.
- Lean into faith, stewardship, privacy, practical relief, and no judgement.
- Copy should sound calm, human, and respectful, not shame-based or hypey.
- Use result-oriented benefits: lower payment pressure, fewer due dates,
  clearer options, true cost, budget fit, next step.
- SCAB-style survey affirmations should reassure the visitor that they are
  taking the right step, for example: “No judgement here. Everyone is on
  their own path.”

## Page Build Guidance

- Keep page copy in `src/lib/site-config.ts`.
- Reuse shared page components when possible so future pages inherit the same
  CTA rhythm, imagery, card density, and mobile behavior.
- Do not add unrelated marketing sections just to fill space. Add purposeful
  proof, process, comparison, FAQ, or CTA sections.
- Secondary pages should feel full through structure, not long copy: hero,
  benefit cards, confidence/support cues, proof image, comparison section,
  simple steps, FAQ, and final CTA.
- Once suitable generated images exist, use the real image instead of a red
  image-generation note. Red notes are temporary staging placeholders only.
