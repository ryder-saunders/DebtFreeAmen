export const sectionTemplates = [
  {
    id: "hero-with-form",
    name: "Hero With Lead Form",
    useFor: "Primary paid-traffic landing page opening.",
    structure: [
      "Non-sticky header with white logo and phone CTA",
      "Navy image-overlay hero",
      "Left-side headline, subcopy, CTAs, and trust chips",
      "Right-side private survey or lead form",
    ],
    componentReference: "src/components/hero.tsx",
  },
  {
    id: "value-cards",
    name: "Value Cards",
    useFor: "Three fast reasons the visitor should continue.",
    structure: [
      "Short section heading and body",
      "Three compact cards",
      "Standalone check icons, no icon boxes",
    ],
    componentReference: "src/components/value-section.tsx",
  },
  {
    id: "process-steps",
    name: "Process Steps",
    useFor: "Explain what happens after the visitor starts.",
    structure: [
      "Tan or white band",
      "Three numbered steps",
      "Conversion CTA aligned with section title on desktop",
    ],
    componentReference: "src/components/process-section.tsx",
  },
  {
    id: "image-proof",
    name: "Image Proof Split",
    useFor: "Add human trust and clarify the page purpose.",
    structure: [
      "Realistic image on one side",
      "Heading, short body, and proof bullets on the other",
      "Mobile-safe crop and compact spacing",
    ],
    componentReference: "src/components/proof-section.tsx",
  },
  {
    id: "final-cta-band",
    name: "Final CTA Band",
    useFor: "Close with qualify and phone actions.",
    structure: [
      "Brand-blue full-width band",
      "Short promise-oriented heading",
      "Primary qualify CTA and secondary phone CTA",
    ],
    componentReference: "src/components/final-cta.tsx",
  },
] as const;
