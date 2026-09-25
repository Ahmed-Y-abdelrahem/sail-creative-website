# SAIL Creative — website

Next.js 15 (App Router) · React 19 · JavaScript/JSX only · Tailwind CSS v4 · Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` in production (defaults to https://www.sail-ksa.com) for canonical URLs, sitemap and OpenGraph.

## Structure
- `src/app/[locale]/…` — pages. English is served at `/`, Arabic at `/ar` (see `src/middleware.js`).
- `src/data/` — single source of truth: `projects.js`, `services.js`, `partners.js`, `site.js`, `dictionary.js` (UI strings, EN + AR), `media.js` (image manifest).
- `src/features/` — page-specific sections (home, work, case, services, about, events, contact).
- `src/components/` — layout (header, menu, footer, page transition), ui primitives (Button, RevealText, ImageReveal, Marquee, Cursor…), shared.
- `public/work`, `public/partners`, `public/brand`, `public/textures` — imagery cropped from the SAIL 2026 profile PDF.

## Replacing imagery
Every project image is registered in `src/data/media.js` as `'project/name': [width, height]` and served from `/public/work/project/name.webp`.
Drop in a higher-resolution export with the same filename and update the two numbers.

## Adding a project
Add one object to `src/data/projects.js`. Listings, filters, case study, sitemap and related/next links are all generated from it.
Bilingual fields are `{ en, ar }`.

## Content notes
- Nothing is invented: no metrics, years, awards or testimonials. Projects without scope text in the profile show only what is visible.
- Arabic project overviews are translations of the English profile text and should get a native review.
- The Contact page builds a WhatsApp message (no backend). The WhatsApp business link may ignore the prefilled `text`, so a "Copy message" fallback is included.
