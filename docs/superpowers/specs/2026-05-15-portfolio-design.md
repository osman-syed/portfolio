# Portfolio Design Spec
**Date:** 2026-05-15  
**Owner:** Syed Osman  
**Status:** Approved

---

## Overview

A personal developer portfolio for Syed Osman — Full-Stack AI Engineer at Yotta Tech Ports Inc. The site targets recruiters and technical decision-makers looking for AI engineers with production experience. It must balance being visually impressive and professionally credible.

---

## Design Direction

**Style:** Bold Editorial — light/white base, heavy black typography, color pops in coral (`#ff6b6b`) and teal (`#4ecdc4`), editorial section layouts with large punchy statements.

**Color palette:**
- Background: `#ffffff` / `#f8f8f6`
- Primary text: `#111111`
- Accent 1 (coral): `#ff6b6b` — hero, CTAs, current-role highlights
- Accent 2 (teal): `#4ecdc4` — secondary projects, backend skills
- Muted text: `#888888`, `#999999`
- Dark section bg: `#111111` (AI Work spotlight, Contact)

**Typography:** Inter — 900 weight for headlines, tight letter-spacing (`-2px` on large sizes), uppercase small caps for labels.

**Animation philosophy:** Framer Motion throughout. Scroll-linked animations via `useScroll` + `useTransform`. Section entrances via `useInView`. Nothing gratuitous — every animation should reveal or reinforce content.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR/SSG for SEO, industry standard |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS | Utility-first, consistent with design tokens |
| Animation | Framer Motion | Scroll animations, stagger, layout |
| Components | shadcn/ui | Accessible base components |
| Deployment | Vercel (recommended) | Zero-config Next.js hosting |

---

## Animations Spec

| Animation | Implementation |
|---|---|
| Scroll progress bar | Fixed top bar, width tied to `useScroll` `scrollYProgress` |
| Custom scrollbar | CSS — thin, coral accent |
| Hero text entrance | Framer Motion stagger — each word/line fades+slides up with 0.1s delay |
| Section fade-in | `useInView` — fade + translateY(20px) → 0 on enter |
| Parallax blobs | `useTransform(scrollY)` on decorative background circles |
| Timeline line draw | SVG path `pathLength` animated from 0→1 as section scrolls into view |
| Card hover | `whileHover={{ scale: 1.02, boxShadow }}` via Framer Motion |
| Project card reveal | Stagger children with `variants` + `staggerChildren: 0.1` |
| Stat counters (About) | Count up animation on `useInView` trigger |
| Nav hide/show | `useScroll` direction — hides on scroll down, reappears on scroll up |

---

## Sections

### 1. Hero
- Name: **Syed Osman** (large, 900 weight)
- Role label: `— Full Stack · AI Engineer` (uppercase, letter-spaced)
- Tagline: **"I build software that builds software."** (second line in coral italic)
- Bio (left-bordered): "Full-stack developer since Dec 2022. Currently building AI-powered platforms that turn ideas into production software — no manual coding required."
- CTAs: `View Work ↓` (black filled) + `Let's talk →` (underline text)
- Decorative: soft coral and teal blurred circles in background (parallax on scroll)
- Scroll indicator at bottom

### 2. About
- Headline: `Who I am.`
- Left column: 2–3 sentence bio
- Right column: 2×2 stat grid
  - `3.5` — Yrs exp
  - `3` — Products
  - `AI` — Native (black card, coral text)
  - `∞` — Curiosity
- Stat counters animate up on first view

### 3. AI Work (Spotlight)
- Dark section (`#111` background)
- "Featured — 3 months deep" pill badge with glowing coral dot
- Project: **YottaBuilder**
- Description: AI-powered no-code platform that generates full-stack applications from natural language
- 3 feature tiles: AI Core (multi-agent orchestration) / Memory (RAG + Knowledge graph) / Infra (AWS Serverless + Bedrock)
- Tech tags: Claude API, React 19, Python, AWS Lambda, DynamoDB
- Subtle radial glow in background

### 4. Projects
- Headline: `Things I've actually shipped.`
- Full-width cards stacked vertically (not a 2-col grid — more editorial)
- Each card: category label, project name (large), description, 3 bullet points, tech stack tags, live link button

**Aeon Legal Tech**
- Tag: AI · Legal Tech · Live
- Accent: teal left border
- Description: AI-powered legal document automation for law firms, enterprises, and banking institutions
- Bullets: compliance-aware generation / SOC-compliant security, no training on user data / targets law firms, banks & Fortune 500
- Link: aeonlegaltech.com

**Lumino**
- Tag: Data · Enterprise · Analytics · Live
- Accent: black left border
- Description: Enterprise intelligence platform for grant-making organizations
- Bullets: grant analytics with geographic & cause segmentation / financial forecasting & proforma modeling / React 19 + FastAPI + PostgreSQL on AWS ECS
- Link: luminoinsight.com

### 5. Stack
- Headline: color-coded tech grid
- Black tags: frontend (React, Next.js, TypeScript)
- Coral tags: AI/LLM (Claude API, AWS Bedrock, LangChain)
- Teal tags: backend (Python, FastAPI)
- Grey tags: infra (AWS Lambda, PostgreSQL, DynamoDB, Docker, Terraform)

### 6. Timeline
- Headline: `3.5 years. One company. All in.`
- Vertical timeline with animated gradient line (coral → teal → black, draws on scroll)
- 3 roles (no Research Intern):

| Role | Period | Highlights |
|---|---|---|
| Associate Software Engineer — L2 | Apr 2025 – Present | YottaBuilder, backend ownership, CI/CD |
| Associate Software Engineer | Jun 2023 – Mar 2025 | Aeon + Lumino, REST APIs, AWS |
| Project Intern | Dec 2022 – May 2023 | First production code, Python/React/PostgreSQL |

- Each role: dot indicator (coral/teal/grey), title, date, 2–3 bullet points, skill tags

### 7. Contact
- Dark section (`#111` background)
- Headline: `Let's build something.` (white, "something." in coral italic)
- Subtext: "Open to roles, contracts, and interesting problems."
- CTAs: `Send a message` (coral filled → mailto link), `GitHub` (ghost), `LinkedIn` (ghost)
- Radial glow behind headline
- **Links needed before deploy:** email address, GitHub profile URL, LinkedIn profile URL
- `∞` stat in About section is static (no count-up — not a number)

---

## Navigation

- Sticky top nav, hides on scroll down / shows on scroll up
- Logo: `SO.` in bold, gradient on hover
- Links: Work · About · Contact (uppercase, letter-spaced)
- Scroll progress bar sits above the nav at the very top of the viewport

---

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Tailwind base + custom scrollbar CSS
├── components/
│   ├── Nav.tsx
│   ├── ScrollProgress.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── AIWork.tsx
│   │   ├── Projects.tsx
│   │   ├── Stack.tsx
│   │   ├── Timeline.tsx
│   │   └── Contact.tsx
│   └── ui/                 # shadcn components
├── lib/
│   └── animations.ts       # Shared Framer Motion variants
└── public/
```

---

## Data

All content is hardcoded in component files (no CMS needed). Projects, stack items, and timeline entries are defined as typed constants at the top of each section component.

---

## SEO

- `metadata` export in `layout.tsx`: title, description, OG tags
- Static generation (default in Next.js App Router)
- Semantic HTML: `<main>`, `<section>`, `<h1>`–`<h3>`, `<nav>`
