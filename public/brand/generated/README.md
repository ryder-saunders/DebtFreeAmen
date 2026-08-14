# Generated Brand Images

Site-ready generated images live here so Next.js can serve and deploy them.

Before generating images, read:

```text
docs/image-generation-guide.md
```

Use version folders:

```text
v001/
v002/
v003/
```

Reference images in code from the public root:

```tsx
src = "/brand/generated/v001/example-image-v001.webp";
```

Each version folder should include a `manifest.md` listing prompts, filenames,
dimensions, and where each image is used.
