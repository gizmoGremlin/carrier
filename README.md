# Voice.ai Phone — AI Carrier landing page

Marketing site positioning **Voice.ai Phone** as the first **AI-native phone carrier**:
spam blocked before it rings, every call screened/answered/summarized, for less than
you pay today.

Built with **Next.js 16 (App Router) + Tailwind CSS v4 + Motion**. Design blends the
mobile app's brand (bold black display headings, blue `.ai` accent, pill CTAs, the
screening-call UI, Without/With + Personal/Business framing, premium dark sections with
glowing rings) with the structure of mobilerun.ai (italic-emphasis hero, pillars,
billing toggle, dark showcase).

## Develop

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Structure

- `src/app/layout.tsx` — fonts (Inter), SEO metadata
- `src/app/globals.css` — Tailwind v4 theme + brand tokens (`--color-brand`, `--color-night`, …)
- `src/app/page.tsx` — section composition
- `src/components/` — one file per section
  - `Hero` · `TrustBar` · `Pillars` · `HowItWorks` (dark) · `Comparison`
  - `UseCases` · `Pricing` (monthly/yearly toggle) · `Testimonials` · `FinalCTA` · `Footer`
  - `PhoneFrame`, `Reveal`, `icons` — shared primitives

## Deploy

Zero-config on Vercel: `vercel` or push to a connected Git repo.

> Copy, stats, pricing, and reviews are illustrative placeholders — swap for real figures
> before launch.
