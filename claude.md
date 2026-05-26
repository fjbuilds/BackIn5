# BackIn5 — Next.js Website

24/7 enquiry handling website for busy trades firms. Single-page layout with anchor navigation.

## Tech stack

- **Next.js 15** (App Router, TypeScript)
- **GSAP 3** with ScrollTrigger for all animations
- **@gsap/react** for proper React cleanup
- Custom CSS (no Tailwind) — all styles in `app/globals.css`

## Commands

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

## Project structure

```
app/
  layout.tsx      — root layout, metadata
  page.tsx        — composes all sections (server component)
  globals.css     — all styles (CSS variables + component styles)

components/
  Nav.tsx           — sticky nav with GSAP slide-in, scroll-aware bg
  Hero.tsx          — hero section (transcript variant default)
  TranscriptCard.tsx — live transcript UI card
  PanelCarousel.tsx  — cycling value-prop panels
  BuiltFor.tsx       — trades grid with auto-cycling active state
  BuiltForMotion.tsx — animated inbound→qualified motion graphic
  BeforeAfter.tsx    — drag-reveal before/after slider
  HowItWorks.tsx     — tabbed scenario flow (6 scenarios)
  Comparison.tsx     — feature comparison table
  Pricing.tsx        — 2-tier pricing cards
  CtaBand.tsx        — dark CTA section with watermark "5"
  Faqs.tsx           — accordion FAQs (general + trade-specific)
  Contact.tsx        — 3-card contact section with Calendly embed
  Footer.tsx         — footer with links
  icons.tsx          — inline SVG icon components

public/assets/
  backin5-logo-v4.png
```

## Brand

- **Colours:** #0E1116 ink, #171B22 elevated, #2341A8 accent, #F5F7FA soft, #8B94A7 muted
- **Fonts:** IBM Plex Sans + IBM Plex Mono — loaded via Google Fonts in globals.css
- **Tone:** Trade-friendly, plainspoken. Not an AI voice product.

## GSAP animations

All scroll-triggered with `once: true`. Key patterns:
- Hero: timeline on mount — slides up + trust strip stagger
- All section headers: y:40 fade-up on scroll
- Cards: stagger y fade on scroll enter
- CTA watermark: scale from 1.3 on scroll
- Nav: slides down from y:-80 on load

## Customisation

- **Hero variant:** Change `variant` prop in `app/page.tsx` (transcript|editorial|dashboard|phone)
- **Pricing:** Edit `tiers` array in `Pricing.tsx`
- **Calendly:** Replace the `src` URL in `Contact.tsx`
- **Logo:** Replace `public/assets/backin5-logo-v4.png`

---

# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Single `index.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color