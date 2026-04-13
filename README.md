# Otto Dental — Demo 1

A premium dental clinic landing page built with Astro, React, Tailwind CSS, and TypeScript.

## Tech Stack

- **Astro** — Static site framework
- **React** — Interactive components (mobile menu)
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/vite`
- **TypeScript** — Type safety throughout

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to Vercel

This project includes the `@astrojs/vercel` adapter and is ready to deploy:

1. Push this repo to GitHub
2. Import the repo in [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Astro — deploy with default settings

Or use the Vercel CLI:

```bash
npx vercel
```

## Project Structure

```
src/
├── assets/images/       # Local images (replace placeholders)
├── components/
│   ├── layout/          # Header, Footer, MobileMenu
│   ├── sections/        # Page sections (Hero, Services, etc.)
│   └── ui/              # Reusable UI (Button, SectionHeading)
├── data/
│   └── site.ts          # All site content, services, team data
├── layouts/
│   └── BaseLayout.astro # HTML shell, SEO, fonts
├── pages/
│   └── index.astro      # Landing page
└── styles/
    └── global.css       # Tailwind config, design tokens, animations
```

## Replacing Images

All image placeholders are in `src/assets/images/`. Replace these files with your own:

| File | Usage | Recommended Size |
|------|-------|-----------------|
| `hero-dental.jpg` | Hero section | 800x1000px |
| `about-consultation.jpg` | Consultation section | 700x500px |
| `service-filling.jpg` | Dental Fillings card | 600x450px |
| `service-whitening.jpg` | Teeth Whitening card | 600x450px |
| `service-surgery.jpg` | Oral Surgery card | 600x450px |
| `service-implants.jpg` | Dental Implants card | 600x450px |
| `doctor-1.jpg` through `doctor-4.jpg` | Specialist portraits | 400x400px |
| `review-1.jpg` | Testimonial avatar | 200x200px |

Search for `Replace with` comments in the component files to find every image placeholder.

## Customizing

### Colors

Edit design tokens in `src/styles/global.css` under `@theme`:

```css
--color-primary: #0C6B63;    /* Main dark green */
--color-secondary: #DDF5F1;  /* Light mint */
--color-accent: #E8B86D;     /* Warm gold */
--color-footer: #083B36;     /* Deep footer green */
```

### Content

All text content, services, specialists, and testimonials are in `src/data/site.ts`. Edit that single file to update:

- Site name, phone, email, address
- Navigation links
- Services list
- Team members
- Testimonials
- Audience cards

### Fonts

Fonts are loaded in `src/layouts/BaseLayout.astro` via Google Fonts. Currently using **Sora** (headings) and **Inter** (body).

## Sections

1. **Header** — Sticky nav with mobile menu
2. **Hero** — Full-width with image and CTAs
3. **Trust** — Intro with value indicators
4. **Services Marquee** — Animated text band
5. **Services** — 4-card grid
6. **Specialists** — Team portraits
7. **Consultation** — Split layout with CTA
8. **Who We Help** — Kids, Teens, Adults cards
9. **Testimonials** — 3-column review cards
10. **CTA** — Final booking section
11. **Footer** — Links, contact, socials
