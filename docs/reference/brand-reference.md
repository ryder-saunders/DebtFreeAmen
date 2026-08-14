# River Relief Brand Reference

This landing-page workspace carries its own copy of the River Relief website
brand references so it can be opened and worked on independently.

## Colors

| Token              | Hex       | Use                                                                |
| ------------------ | --------- | ------------------------------------------------------------------ |
| `brand-blue`       | `#213949` | Primary brand color for dark sections, CTAs, and heading emphasis. |
| `brand-accent`     | `#b57b58` | Warm action/accent color. Use sparingly.                           |
| `brand-tan`        | `#f4f2ed` | Warm off-white support surface. Avoid tan-heavy layouts.           |
| `brand-grey-light` | `#9aa0a9` | Borders and quiet metadata.                                        |
| `brand-grey-mid`   | `#7a7a7a` | Body copy and secondary text.                                      |
| `brand-grey-dark`  | `#33373d` | Default dark copy.                                                 |
| `background`       | `#ffffff` | Main page background.                                              |

The same tokens are defined in `src/app/globals.css` and in
`src/lib/brand-reference.ts`.

## Color Preferences

- Navy and white should be the dominant read.
- Use tan as a support surface, not the page personality.
- Use the accent for primary action, small proof cues, or emphasis.
- Buttons should be squared modern rectangles with modest radius.
- Avoid decorative colored side strips, gradient blobs, and tan-heavy sections.
- Use realistic financial-services imagery with tasteful faith cues.

## Asset References

- Logos: `public/brand/`, including `public/brand/new-logos/`.
- Favicons and app icons: `public/favicon.svg`, `public/favicon-96x96.png`,
  `public/apple-touch-icon.png`, `public/web-app-manifest-*.png`,
  `src/app/favicon.ico`, `src/app/icon.png`, and `src/app/apple-icon.png`.
- Main website page images: `public/brand/generated/` plus
  `public/brand/credit-score-graphic.png`.
- Trust badges: `public/brand/trust-badges/`.

The typed asset list lives in `src/lib/brand-reference.ts`.
