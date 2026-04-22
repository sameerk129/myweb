# sameerk.dev — Personal Portfolio

A premium, high-trust personal portfolio for **Sameer Kumar** — Senior Backend Engineer (Distributed Systems · Reliability · Platform Engineering).

Designed for the bar of recruiters at **Meta · Google · Stripe · Databricks · Atlassian · Uber · Airbnb · Spotify**.

> Stack: **Next.js 16 (App Router · RSC · Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Radix UI (shadcn-style primitives) · next-themes · Zod · React Hook Form · cmdk · Sonner · Vitest · React Testing Library · Playwright**

---

## Highlights

- **Hero** with strong headline, three CTAs (Resume, Contact, LinkedIn), and copy-email button
- **Career highlights** with animated counters
- **Experience timeline** built from typed data
- **Skills matrix**, **Architecture mindset**, **Projects ("Things I Built")**, **Travel & personality** (interactive world map)
- **Testimonials**, **Contact form** (Zod-validated, rate-limited API route)
- **Floating glass nav**, **Theme toggle** (dark default), **Command palette (⌘K)**
- **SEO**: per-route metadata, JSON-LD person schema, `sitemap.xml`, `robots.txt`
- **Accessibility**: skip-link, semantic HTML, focus rings, prefers-reduced-motion, ARIA
- **Easter egg**: Konami code 🎮

---

## Project structure

```
src/
  app/
    (site)/blog/        # blog-ready route
    api/contact/        # POST /api/contact (Zod-validated)
    layout.tsx          # root layout, fonts, providers, JSON-LD
    page.tsx            # home (assembles all sections)
    providers.tsx       # ThemeProvider + Tooltip + CommandPalette + Toaster
    sitemap.ts          # SEO sitemap
    robots.ts           # SEO robots
    globals.css         # Tailwind v4 theme tokens (light + dark)
  components/
    ui/                 # shadcn-style primitives (button, card, badge, …)
    blocks/             # composable building blocks (section, world-map, …)
    motion/             # framer-motion helpers (Reveal, Stagger, Counter)
    nav/                # FloatingNav, ThemeToggle, CommandPalette, Footer
    sections/           # Hero, Highlights, Experience, Skills, Mindset,
                        # Projects, Travel, Testimonials, Contact
  data/                 # typed content (single source of truth)
  lib/
    site-config.ts      # name, urls, socials
    seo/                # metadata helpers
    analytics/          # provider-agnostic `track()` shim
    utils.ts            # cn(), formatters
tests/
  unit/                 # Vitest + RTL component tests
e2e/                    # Playwright specs
.github/workflows/ci.yml
```

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| script              | what it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Next.js dev server (Turbopack)            |
| `npm run build`     | Production build                          |
| `npm run start`     | Run the production build                  |
| `npm run lint`      | ESLint                                    |
| `npm run format`    | Prettier (write)                          |
| `npm run typecheck` | `tsc --noEmit`                            |
| `npm test`          | Vitest unit + integration tests           |
| `npm run test:ui`   | Vitest UI                                 |
| `npm run e2e`       | Playwright end-to-end tests               |

## Testing

- **Unit / component**: Vitest + React Testing Library (`tests/unit/*`)
  - Sample tests cover: `FloatingNav`, Hero CTAs, Theme toggle, Contact form validation, Project cards
- **E2E**: Playwright (`e2e/*`)
  - Covers: full home page render, ⌘K command palette, contact form validation
- jsdom polyfills for Framer Motion + Radix live in `vitest.setup.ts`

```bash
npm test                # unit
npm run e2e:install     # one-time browser install
npm run e2e             # end-to-end
```

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://sameerk.dev
NEXT_PUBLIC_ANALYTICS_PROVIDER=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

The contact API in `src/app/api/contact/route.ts` is wired with rate limiting + Zod validation; plug in your delivery provider (Resend / Postmark / Slack webhook) inside `deliver(...)`.

## Deploy on Vercel

The fastest path:

1. Push the repo to GitHub.
2. Go to <https://vercel.com/new> and import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `next build`. Output dir: `.next`.
5. Add env vars from `.env.example` in **Project → Settings → Environment Variables**.
6. Click **Deploy**. Set up a custom domain at **Settings → Domains** (e.g. `sameerk.dev`).
7. Optional: enable **Vercel Analytics** and **Speed Insights** from the project dashboard.

CLI alternative:

```bash
npm i -g vercel
vercel        # link
vercel --prod # deploy
```

## DevOps

- **ESLint** + **Prettier** (with `prettier-plugin-tailwindcss`)
- **Husky** hooks:
  - `pre-commit` → `lint-staged` (prettier + eslint --fix on staged files)
  - `commit-msg` → `commitlint` (Conventional Commits)
  - `pre-push`   → `typecheck` + `build`
- **GitHub Actions CI** (`.github/workflows/ci.yml`):
  - Lint · Typecheck · Test · Build (on every PR)
  - Playwright E2E job uploading the report as an artifact

## Roadmap (iterating in public)

- [ ] Real testimonials with attribution
- [ ] First blog post (`/blog`)
- [ ] OG image generator route (`/api/og`)
- [ ] Add real screenshots to project cards
- [ ] Wire analytics provider in `src/lib/analytics/index.ts`

---

© Sameer Kumar. Built with care.
