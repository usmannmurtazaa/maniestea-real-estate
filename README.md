# Maniesta Real Estate

A premium, single-page luxury real estate landing website for the Dubai property market, built for international buyers, families, and investors who expect a considered, editorial experience.

The site is a portfolio-quality frontend demonstration: cinematic hero, filterable sample listings, community exploration, a transparent rental-yield calculator, and a validated inquiry form. It is intentionally a **single-page frontend application** with no backend, no authentication, and no live listings feed.

> **Demonstration notice.** Property listings, prices, and community copy are illustrative sample content. Contact details are placeholders. The inquiry form is in transparent demo mode unless an endpoint is configured. The project does not claim awards, transaction volumes, client testimonials, or guaranteed investment returns.

---

## Table of Contents

- [Project Preview](#project-preview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Configuration and Customization](#configuration-and-customization)
- [SEO and Performance](#seo-and-performance)
- [Deployment](#deployment)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author and Credits](#author-and-credits)

---

## Project Preview

The repository does not include a screenshot yet. Add one so the README renders a preview on GitHub:

1. Create the folder `docs/images/` if it does not already exist.
2. Save a full-page screenshot as `docs/images/website-preview.png` (recommended width: 1600–1920px, PNG or WebP).
3. The image below will render automatically once the file exists.

```markdown
![Maniesta Real Estate — hero section and featured properties](./docs/images/website-preview.png)
```

If you prefer a live preview, deploy the project (see [Deployment](#deployment)) and replace this section with a link to the deployed URL.

---

## Key Features

All features below are implemented in the current source code.

- **Responsive single-page experience** with smooth anchor navigation across Home, Properties, Communities, About, Contact.
- **Cinematic hero** with full-bleed Dubai photography, subtle parallax, staggered entrance animations, and a hero search panel.
- **Hero search → property filter handoff**: location, property type, and budget selected in the hero are applied to the Featured Properties section and the page scrolls there.
- **Featured Properties grid** with 6 sample listings across Dubai Marina, Downtown Dubai, Palm Jumeirah, Dubai Hills Estate, Business Bay, and Dubai Creek Harbour.
- **Functional filters and sorting** by location, property type, budget band, and sort order (Featured, Price ascending/descending, Largest area), plus a one-click **Reset** that is disabled when no filters are active.
- **Community exploration** with four image cards that filter the property grid by community and scroll to the Properties section.
- **Why Maniesta** benefit section using factual, non-credential language.
- **Investment section** with an illustrative **rental-yield calculator** (purchase price, annual rent, occupancy, service charges → gross yield, net yield, net annual income) and explicit "yields not guaranteed" framing.
- **Inquiry form** with:
  - Full name, email, phone with country code, interested area, budget range, message.
  - Client-side validation with accessible `aria-invalid` / `aria-describedby` wiring.
  - Loading state, success state, error state.
  - Clear **demo-mode banner** when no endpoint is configured.
- **Premium navigation**: transparent-to-solid sticky navbar, mobile menu with body-scroll lock, Escape-to-close, and focus-visible states.
- **Motion**: `IntersectionObserver`-based reveals, hover transitions, and a hero parallax — all disabled under `prefers-reduced-motion: reduce`.
- **Accessibility basics**: skip link, semantic section landmarks, labeled form fields, `role="alert"` error messages, visible focus rings, alt text on all images.
- **SEO**: descriptive `<title>`, meta description, canonical URL, Open Graph + Twitter card metadata, and `RealEstateAgent` JSON-LD.
- **PWA metadata**: web app manifest and theme color declared in `index.html` and `public/manifest.webmanifest`. There is no service worker — offline caching is not implemented.

---

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| UI library | **React 19** | Component-based single-page UI |
| Language | **TypeScript 5.8** (strict) | Type safety across components, data, and forms |
| Build tool | **Vite 7** | Dev server, HMR, and production bundling |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Design tokens, utility classes, responsive layout |
| Icons | **Lucide React** | Consistent, lightweight SVG icon set |
| Typography | **Cormorant Garamond** + **Inter** (Google Fonts) | Editorial serif headlines with a clean sans-serif body |
| Animation | Native CSS transitions + `IntersectionObserver` | Reveal-on-scroll and hover motion without a runtime library |
| Linting | **ESLint 9** + `typescript-eslint` + React Hooks / Refresh plugins | Static checks |
| Deployment target | Any static host | Vite outputs static files to `dist/` |

No UI framework, state manager, animation library, backend SDK, or CMS is used. State is local React state at the page level.

---

## Project Architecture

### File tree

```text
maniestea-real-estate/
├── index.html                        # Document shell, meta tags, JSON-LD, fonts
├── package.json
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .env.example
├── public/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   └── robots.txt
└── src/
    ├── main.tsx                      # React entry point
    ├── App.tsx                       # Page composition + shared filter state
    ├── index.css                     # Tailwind import, theme tokens, base + component layers
    ├── vite-env.d.ts                 # Typed VITE_INQUIRY_ENDPOINT
    ├── types.ts                      # Shared TypeScript types
    ├── lib/
    │   ├── utils.ts                  # cn(), formatAED(), formatNumber(), clamp()
    │   ├── images.ts                 # Unsplash URL helper
    │   └── inquiry.ts                # Inquiry submission + demo-mode logic
    ├── data/
    │   └── site.ts                   # Site config, nav, properties, communities, filter options
    └── components/
        ├── forms/
        │   └── InquiryForm.tsx
        ├── layout/
        │   ├── Navbar.tsx
        │   └── Footer.tsx
        ├── sections/
        │   ├── Hero.tsx
        │   ├── FeaturedProperties.tsx
        │   ├── Communities.tsx
        │   ├── WhyManiesta.tsx
        │   ├── Investment.tsx
        │   └── Contact.tsx
        └── ui/
            ├── Button.tsx
            ├── CommunityCard.tsx
            ├── Field.tsx
            ├── PropertyCard.tsx
            ├── Reveal.tsx
            ├── RoiCalculator.tsx
            ├── SearchPanel.tsx
            ├── SectionHeading.tsx
            ├── SelectField.tsx
            └── Wordmark.tsx
```

### Responsibilities

| Path | Responsibility |
| --- | --- |
| `src/App.tsx` | Holds the shared `FilterState`; wires hero search and community selection into the property grid. |
| `src/data/site.ts` | Single source of truth for brand config, navigation, sample properties, communities, filter options, and `filterProperties` / `hasActiveFilters` helpers. |
| `src/lib/inquiry.ts` | The one integration point for form delivery. Returns `{ ok, demo }` and never pretends to have delivered in demo mode. |
| `src/lib/images.ts` | Centralizes the Unsplash URL builder so image sources can be replaced in one place. |
| `src/components/ui/Reveal.tsx` | `IntersectionObserver` wrapper that respects `prefers-reduced-motion`. |
| `src/components/ui/SelectField.tsx` | Shared, accessible labeled `<select>` used by the hero search and property filters. |
| `src/components/ui/PropertyCard.tsx` | Card layout for sample listings, including an "Illustrative listing" badge. |
| `src/components/forms/InquiryForm.tsx` | Validated, accessible inquiry form with `idle` / `submitting` / `success` / `error` states. |
| `src/index.css` | Tailwind theme tokens (ivory, charcoal, champagne, line), base styles, skip link, reveal animation, reduced-motion overrides. |

---

## Getting Started

### Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 7)
- **npm 10+** (or an equivalent package manager — commands below assume npm)

### Install and run

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server
npm run dev
```

Vite prints the local URL (typically `http://localhost:5173`).

### Scripts

The commands below match `package.json` exactly.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Vite dev server with HMR. |
| `npm run build` | Runs `tsc --noEmit` for type checking, then builds the production bundle into `dist/`. |
| `npm run preview` | Serves the production build locally for verification. |
| `npm run lint` | Runs ESLint across the repository. |

### Recommended verification order

```bash
npm install
npm run lint
npm run build
npm run preview
```

---

## Environment Configuration

The project uses a **single optional environment variable**. Copy the example file to get started:

```bash
cp .env.example .env
```

### `.env.example`

```bash
# Optional. When empty, the inquiry form runs in transparent demo mode.
# Add a POST endpoint that accepts JSON to enable delivery.
VITE_INQUIRY_ENDPOINT=
```

### Behaviour

| Scenario | Result |
| --- | --- |
| `VITE_INQUIRY_ENDPOINT` is **empty or unset** | Demo mode. The form waits ~1.1s, logs the payload to the browser console under `[Maniesta demo]`, and shows a success panel that explicitly states the inquiry was **not** delivered and points the user to the contact email. |
| `VITE_INQUIRY_ENDPOINT` is **set** | The form `POST`s the payload as JSON. A `2xx` response shows the standard success state. Non-`2xx` responses and network errors show an inline error with the contact email as a fallback. |

### Payload shape sent to `VITE_INQUIRY_ENDPOINT`

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "countryCode": "+971",
  "phone": "501234567",
  "area": "Dubai Marina",
  "budget": "AED 2M – 5M",
  "message": "Looking for a two-bedroom apartment.",
  "consent": true
}
```

The integration point is `src/lib/inquiry.ts`. Any endpoint that accepts a `POST` with `Content-Type: application/json` and returns a `2xx` status will work — a serverless function, a form service, or a small API you host separately.

**Do not commit a `.env` file containing secrets.** Only `VITE_`-prefixed variables are exposed to the client, so any value placed there is public. Keep authentication and API keys on your own backend, not in this project.

---

## Configuration and Customization

Most editorial and business configuration lives in `src/data/site.ts`. Nothing in this project is generated at build time, so edits are reflected immediately in dev and on the next build.

### Brand, contact, and portfolio

Open `src/data/site.ts` and edit `siteConfig`:

| Field | What it controls |
| --- | --- |
| `name`, `shortName`, `description` | Brand strings used in meta and footer copy. |
| `email`, `phone`, `phoneHref` | Contact links in the mobile menu, Contact section, and Footer. |
| `address` | Location line in Contact. |
| `portfolioUrl` | When set, the footer "Designed & Developed by" line becomes a link. Leave empty to render as plain text. |
| `portfolioLabel` | The developer label shown in the footer. |
| `social.instagram`, `social.linkedin` | When set, appear in the footer. Leave empty to hide. |

Also update the placeholder email, phone, and canonical URL in `index.html` (the `<title>`, canonical `<link>`, Open Graph/Twitter URLs, and the `RealEstateAgent` JSON-LD block). Search for `maniestea.example` and `+971-4-000-0000` to catch every occurrence.

### Navigation

Edit `navLinks` in `src/data/site.ts`. Order, labels, and `#anchor` targets are read directly by the navbar and footer. Every target must correspond to a `section id` in `src/App.tsx` (currently `home`, `properties`, `communities`, `about`, `contact`).

### Properties and filtering

Sample listings live in the `properties` array in `src/data/site.ts`. Each entry has:

```ts
{
  id: 'marina-residence',
  name: 'Marina Sky Residence',
  location: 'Dubai Marina',
  type: 'Apartment', // 'Apartment' | 'Penthouse' | 'Villa' | 'Townhouse'
  bedrooms: 2,
  bathrooms: 3,
  area: 1320,          // square feet
  price: 2_450_000,    // AED
  image: '...',
  imageAlt: '...',
}
```

Filter and sort options are exported alongside:

- `budgetOptions` — the budget bands used by both the hero search and the property filter panel.
- `locationOptions` — auto-derived from the `properties` array. Adding a new location to a listing automatically adds it to the dropdown.
- `propertyTypeOptions`, `sortOptions`.

`filterProperties()` and `hasActiveFilters()` in the same file apply the filters and drive the Reset button's disabled state.

### Communities

Edit the `communities` array in `src/data/site.ts`. Each entry has `id`, `name`, `eyebrow`, `description`, `image`, `imageAlt`. Clicking a card filters the property grid by `name`, so every `name` should also be present on at least one property for the filter to show results.

### Colors and typography

All design tokens are defined in `src/index.css` inside the Tailwind v4 `@theme` block:

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", ui-serif, Georgia, serif;

  --color-ivory: #f6f2ea;
  --color-ivory-50: #fbf8f2;
  --color-ivory-100: #f6f2ea;
  --color-ivory-200: #ede6d9;
  --color-charcoal: #1e1d1a;
  --color-charcoal-800: #2a2824;
  --color-stone: #6f6a61;
  --color-champagne: #b49a67;
  --color-champagne-light: #d4be92;
  --color-line: #ded6c8;
  --shadow-soft: 0 24px 60px -34px rgba(30, 29, 26, 0.45);
}
```

Change a token here and every component that references `bg-champagne`, `text-ivory`, `font-serif`, etc. updates automatically. Fonts themselves are loaded from Google Fonts in `index.html` — swap the `<link>` and the `--font-*` tokens together.

### Imagery

The project currently loads images from Unsplash via the `unsplash()` helper in `src/lib/images.ts`. Replace them with your own licensed photography before commercial use:

1. Add files to `public/images/` (e.g. `public/images/dubai-marina-penthouse.webp`).
2. In `src/data/site.ts`, change `image` to the public path, e.g. `'/images/dubai-marina-penthouse.webp'`.
3. Update `imageAlt` to describe the actual content — keep it descriptive, not decorative.

Recommended sizes:

- **Hero**: 2000–2400px wide, WebP/AVIF
- **Property cards**: 900–1200px wide
- **Community cards**: 1200–1600px wide
- **Open Graph**: 1200×630px (referenced by `og:image` and `twitter:image` in `index.html`)

### Inquiry form endpoint

See [Environment Configuration](#environment-configuration). Validation rules live at the top of `src/components/forms/InquiryForm.tsx` in the `validate()` function — extend it there if you need extra fields.

---

## SEO and Performance

### Implemented

- Descriptive `<title>`, meta description, and `<link rel="canonical">` in `index.html`.
- Open Graph (`og:type`, `og:title`, `og:description`, `og:url`, `og:image`) and Twitter card metadata.
- `RealEstateAgent` JSON-LD structured data with `areaServed`, address, and contact fields.
- Semantic landmarks: `header`, `nav`, `main`, `section[aria-labelledby]`, `footer`, and a skip link.
- One `h1` in the hero, `h2` per section, `h3` for cards and subheadings.
- Descriptive `alt` text on every image.
- `loading="lazy"` and `decoding="async"` on images below the fold.
- Explicit image `sizes` on property cards to help the browser pick appropriate resolutions.
- Font `preconnect` to Google Fonts hosts.
- `prefers-reduced-motion` overrides that disable reveals, parallax, and transitions.
- `robots.txt` and `manifest.webmanifest`.
- No heavy animation, icon, or state-management libraries.

### Limitations

- **No image optimization pipeline.** The hero and card images are delivered from Unsplash CDN with `?w=` sizing; self-hosted replacements should be manually compressed (WebP/AVIF recommended).
- **No service worker.** The manifest enables "installable" metadata but there is no offline caching.
- **Canonical URL and Open Graph URLs still point at `https://maniestea.example/`.** Update them to your real domain before publishing — the placeholder will otherwise be indexed and shared.
- **No sitemap file.** Fine for a single-page site; add one if you later expand to multiple routes.
- **Google Fonts is a third-party request.** Self-host the font files if you need to eliminate that dependency.

---

## Deployment

The build output is a static `dist/` directory. Any static host works.

### Build command and output

| Setting | Value |
| --- | --- |
| Install | `npm install` |
| Build | `npm run build` |
| Output | `dist/` |
| Node | 20.19+ or 22.12+ |

### Vercel

1. Import the repository into Vercel.
2. Framework preset: **Vite** (auto-detected).
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Add `VITE_INQUIRY_ENDPOINT` under **Settings → Environment Variables** if you have configured a form endpoint. Redeploy after changing it.

### Netlify

1. New site → import from Git.
2. Build command: `npm run build`.
3. Publish directory: `dist`.
4. Add the environment variable under **Site settings → Environment variables**.

`netlify.toml` is not included; the dashboard defaults above are sufficient.

### Cloudflare Pages

1. Create a Pages project from the repository.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Build output directory: `dist`.
5. Add environment variables under **Settings → Environment variables**.

### Post-deploy checklist

- Update the canonical URL, `og:url`, `og:image`, `twitter:image`, and the JSON-LD `url` in `index.html` to the deployed domain.
- Update `siteConfig.email`, `siteConfig.phone`, and `siteConfig.address` in `src/data/site.ts`.
- Confirm the inquiry form behaves correctly in both demo and connected modes.
- Verify the site at 360px, 768px, 1024px, and 1440px widths.

---

## Known Limitations

These are intentional scope boundaries, not bugs. They reflect the project's current state.

- **Sample listings only.** The six properties in `src/data/site.ts` are illustrative. There is no database, CMS, or listings API. Each card carries an "Illustrative listing" badge and the section includes a sample-content notice.
- **Indicative prices.** AED figures are example numbers, not live valuations or availability. The ROI calculator is explicitly labelled illustrative and excludes purchase costs, agency fees, maintenance, vacancy beyond the occupancy input, and taxes. It does not guarantee rental yields.
- **Demo inquiry form.** Without `VITE_INQUIRY_ENDPOINT`, submissions are simulated and logged to the console. The success panel clearly states the inquiry was not delivered. See [Environment Configuration](#environment-configuration).
- **Placeholder contact details.** `hello@maniestea.example` and `+971 4 000 0000` are placeholders and must be replaced before the site represents a real business.
- **Placeholder canonical URL and Open Graph image.** `https://maniestea.example/` appears in `index.html` and should be replaced with the deployed domain.
- **Portfolio credit link.** `siteConfig.portfolioUrl` is empty, so the footer credit renders as plain text. Set it to a real URL to turn it into a link.
- **No backend.** No authentication, admin area, property detail pages, booking, or CRM integration. Contact-form submission delivery depends entirely on the endpoint you provide.
- **No automated tests.** There is no test runner or test suite in the repository. Verification is manual — see the QA checklist in [Contributing](#contributing).
- **No analytics or cookie banner.** If you add tracking, you are responsible for the associated consent and disclosure requirements.
- **No service worker.** Offline caching is not implemented despite the manifest being present.

---

## Roadmap

Optional, not yet implemented. These are suggestions, not commitments.

- Add an optional lightweight CMS or JSON file loader so listings can be updated without touching TypeScript.
- Add a multi-page property detail template and sitemap once the catalogue grows.
- Add image optimization (responsive `srcset` or a build-time compression step) for self-hosted photography.
- Add a service worker with an offline fallback if PWA installability becomes a requirement.
- Add end-to-end tests for the search → filter handoff and the inquiry form's validation states.
- Add a newsletter or saved-search component that shares the same inquiry submission pipeline.
- Add a language switcher (EN / AR) with RTL layout support.

---

## Contributing

This is a personal portfolio project, but issues and pull requests are welcome.

### Local workflow

```bash
git clone <repo-url>
cd maniestea-real-estate
npm install
npm run dev
```

### Before opening a PR

1. Run `npm run lint` and fix any reported issues.
2. Run `npm run build` — it runs `tsc --noEmit` first, so type errors will fail the build.
3. Run `npm run preview` and verify the change in the built bundle.
4. Test manually at 360px, 768px, 1024px, and 1440px widths.
5. Confirm reduced-motion behaviour by toggling `prefers-reduced-motion: reduce` in your OS or dev tools.
6. Keep changes scoped — avoid unrelated refactors in feature PRs.

### Manual QA checklist

- [ ] Navbar transitions from transparent to solid on scroll.
- [ ] Mobile menu opens, locks body scroll, closes on Escape, and restores scroll.
- [ ] Hero search scrolls to Properties and applies the selected filters.
- [ ] Property filters and sorting update the grid, and Reset is disabled when nothing is active.
- [ ] Community cards filter properties by location and scroll to the Properties section.
- [ ] ROI calculator updates gross yield, net yield, and net annual income.
- [ ] Inquiry form blocks invalid submissions and focuses the first error.
- [ ] Demo-mode success message is visible when no endpoint is configured.
- [ ] Anchor links land below the sticky header (scroll-margin is applied).
- [ ] Reduced-motion preference disables reveals and parallax.
- [ ] No console errors on load or during interaction.

---

## License

No license file is included in this repository, so the licensing terms are not yet specified. Under default copyright, all rights are reserved.

If you intend to grant reuse or redistribution rights — for example for a commercial client engagement, a template marketplace, or open-source publication — add a `LICENSE` file to the repository root and update this section to reference it. Until then, do not assume any permission to reuse this code outside the repository owner.

---

## Author and Credits

### Design and development

This project is credited in the site footer as **Maniesta Studio** (configurable via `siteConfig.portfolioLabel` in `src/data/site.ts`).

The developer's name, portfolio URL, GitHub profile, and contact details are not stored in the repository, so they are not listed here. To make this section complete, replace the placeholders below with real values:

| Field | Placeholder |
| --- | --- |
| Developer | `Your Name` |
| Portfolio | `https://your-portfolio.example` |
| GitHub | `https://github.com/your-username` |
| Contact | `you@example.com` |

Once those are filled in, also set `siteConfig.portfolioUrl` so the footer credit becomes a working link.

### Third-party credits

- **Photography**: Unsplash contributors, used under the [Unsplash License](https://unsplash.com/license). Replace with your own licensed imagery before commercial launch.
- **Icons**: [Lucide](https://lucide.dev/), ISC License.
- **Fonts**: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and [Inter](https://fonts.google.com/specimen/Inter), SIL Open Font License, served via Google Fonts.
- **Framework**: [React](https://react.dev/), [Vite](https://vite.dev/), [Tailwind CSS](https://tailwindcss.com/).