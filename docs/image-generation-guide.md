# River Relief Image Generation Guide

Read this guide before generating, editing, selecting, or placing any new
imagery for River Relief.

## Purpose

River Relief is a faith-oriented financial services company helping people
explore debt relief and personal-loan options. Images should make the page feel
trustworthy, modern, calm, and conversion-focused. The visual tone should feel
more premium than stock lending ads, while still being direct enough for paid ad
traffic.

## Storage And Versioning

Generated or edited site images must be saved inside:

```text
public/brand/generated/
```

Use version folders so the site can keep prior concepts without losing
traceability:

```text
public/brand/generated/v001/
public/brand/generated/v002/
public/brand/generated/v003/
```

File names should be lowercase, descriptive, and stable:

```text
hero-faith-family-prayer-v001.webp
advisor-phone-consult-v001.webp
budget-table-family-v001.webp
```

When an image is used in code, reference it from the public root:

```tsx
src = "/brand/generated/v001/hero-faith-family-prayer-v001.webp";
```

Keep source prompts and usage notes in the version folder's `manifest.md`.

## Brand Direction

Use:

- Navy and white as the dominant palette.
- Soft natural light, clean contrast, and composed editorial framing.
- Faith cues that feel sincere and grounded: prayer at a table, open Bible,
  church community, a cross in the background, or family reflection.
- Modern financial-services trust cues: advisor conversation, phone support,
  budget table, laptop intake, calm home environment.
- Realistic people and spaces. Prefer human warmth over abstract symbolism.

Avoid:

- Tan-dominant compositions.
- Guilt, panic, despair, aggressive debt imagery, collections letters, or
  shame-based visuals.
- Prosperity-gospel cues, televangelist aesthetics, halos, miracles, glowing
  money, or overly literal divine imagery.
- Stock-photo stiffness, fake smiles, corporate handshakes, and cheesy thumbs
  up.
- Environmental nonprofit imagery such as rivers, cleanups, forests, or
  conservation unless it is subtle brand texture.
- Text baked into images. Page copy and CTAs should stay in HTML.

## Visual Requirements

Hero images:

- Create at 16:9 or wider, ideally 2400x1350 or 2880x1600.
- Leave negative space on the left or center-left for headline text.
- Keep the main subject away from the survey card area on desktop.
- Should work under a navy overlay.

Section images:

- Create at 4:3 or 3:2, ideally 1600x1200 or 1800x1200.
- Focus on one clear idea per section.
- Avoid busy backgrounds behind people.

Mobile:

- The subject must remain understandable in a narrow crop.
- Avoid tiny props that carry the whole meaning.
- Do not rely on wide-only composition.

## Prompt Framework

Use this structure for image prompts:

```text
Create a realistic premium editorial image for River Relief, a faith-oriented
financial services company helping people explore credit card debt relief and
personal-loan options.

Scene: [specific scene]
Emotion: calm, dignified, hopeful, private
Faith cue: [subtle cue]
Financial cue: [specific cue]
Composition: [hero/section crop requirements]
Color direction: deep navy, white, soft neutrals, restrained warmth
Lighting: natural, soft, trustworthy
Style: realistic photography, modern financial services, not stocky
Avoid: text, logos, tan-heavy palette, panic, shame, cheesy stock-photo poses,
environmental nonprofit imagery
```

## Ready-To-Use Prompt Starters

Hero background:

```text
Create a realistic premium editorial hero image for River Relief, a
faith-oriented financial services company helping people explore credit card
debt relief and personal-loan options. Scene: a calm family at a kitchen table
in quiet prayer beside a closed laptop and simple household budget notes.
Emotion: dignified, hopeful, private. Faith cue: hands gently clasped and a
subtle Bible on the table. Financial cue: budget notes and laptop intake.
Composition: wide 16:9, subject on the right third, clean negative space on the
left for headline text, works under a navy overlay. Color direction: deep navy,
white, soft neutrals, restrained warmth. Lighting: natural soft morning light.
Style: realistic photography, modern financial services, not stocky. Avoid:
text, logos, tan-heavy palette, panic, shame, cheesy stock-photo poses,
environmental nonprofit imagery.
```

Advisor/contact image:

```text
Create a realistic premium editorial image for River Relief, a faith-oriented
financial services company. Scene: a warm lending advisor on a phone call at a
clean desk with a laptop intake form visible but unreadable. Emotion: calm,
competent, reassuring. Faith cue: small tasteful cross on the wall or desk,
subtle and secondary. Financial cue: laptop, notebook, simple budget worksheet.
Composition: 4:3 section image, advisor centered with uncluttered background.
Color direction: navy, white, soft grey, restrained warmth. Lighting: soft
natural office light. Style: realistic photography, modern trust-focused
financial services. Avoid: text, logos, fake headset-call-center feel,
tan-heavy palette, cheesy stock-photo poses.
```

Budget/stewardship image:

```text
Create a realistic premium editorial image for River Relief, a faith-oriented
financial services company. Scene: an adult couple reviewing a simple household
budget at a dining table, calm and thoughtful rather than stressed. Emotion:
private, hopeful, practical. Faith cue: open Bible or devotional nearby,
subtle. Financial cue: calculator, notebook, laptop, credit card statements
blurred and unreadable. Composition: 3:2 section image, medium crop, clear
subject, works beside web copy. Color direction: deep navy accents, white, soft
grey, restrained warmth. Lighting: natural window light. Style: realistic
photography, premium and modern. Avoid: readable financial data, text, logos,
panic, shame, tan-heavy palette, environmental nonprofit imagery.
```

## Selection Checklist

Before using an image, confirm:

- It matches River Relief as financial services, not environmental nonprofit.
- Faith cues are present but tasteful.
- It can sit with navy/white UI without fighting the palette.
- It has no embedded text, logos, or readable private financial data.
- It does not make debt feel shameful or desperate.
- It has a mobile-safe crop.
- It is stored in `public/brand/generated/vXXX/` with a manifest entry.
