# Aperture Studio

A premium, Apple-inspired photography studio website. Calm minimal design:
generous whitespace, subtle shadows, 16px radii, and a restrained palette —
no gradients, no flashy colors.

## Tech Stack

- **Next.js** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first theme + design tokens)
- **shadcn/ui** primitives + **Radix UI**
- **Framer Motion** for motion
- **Lucide React** for icons
- **Embla Carousel** for carousels
- **yet-another-react-lightbox** for galleries
- **React Hook Form** + **Zod** for forms & validation

## Design Tokens

| Token          | Value     |
| -------------- | --------- |
| Background     | `#FFFFFF` |
| Surface        | `#F8F8FA` |
| Primary text   | `#111827` |
| Secondary text | `#6B7280` |
| Accent         | `#2563EB` |
| Border         | `#E5E7EB` |
| Radius         | `16px`    |

Fonts: **Playfair Display** (headings) and **Inter** (body), via `next/font`.

- CSS tokens: [`styles/tokens.css`](styles/tokens.css)
- Tailwind mapping: [`app/globals.css`](app/globals.css)
- TS mirror: [`lib/tokens.ts`](lib/tokens.ts)

## Project Structure

```
app/                 # App Router routes, layout, global CSS
components/
  ui/                # Primitives (Button, Card, Container, Input, …)
  layout/            # Navbar, Footer, Logo
  sections/          # Landing-page sections
  forms/             # React Hook Form + Zod forms
  gallery/           # Lightbox-enabled gallery grid
hooks/               # useScroll, useMediaQuery
lib/                 # utils, constants, animations, fonts, tokens, validations
types/               # Gallery, Service, Review, Blog, Team, Navigation
data/                # Sample content
public/              # Static assets
styles/              # Design tokens stylesheet
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script              | Description                |
| ------------------- | -------------------------- |
| `npm run dev`       | Start the dev server       |
| `npm run build`     | Production build           |
| `npm run start`     | Serve the production build |
| `npm run lint`      | Run ESLint                 |
| `npm run typecheck` | Type-check with `tsc`      |

## Architecture Notes

- **Navbar** — fixed, transparent by default; frosted glass + border on scroll
- **Footer** — logo, quick links, services, socials, copyright
- **Motion** — shared Framer variants in `lib/animations.ts`; `AnimatedSection` for scroll reveals
- **Forms** — `ContactForm` demonstrates React Hook Form + Zod end-to-end
- **Gallery** — `GalleryGrid` + `yet-another-react-lightbox`
