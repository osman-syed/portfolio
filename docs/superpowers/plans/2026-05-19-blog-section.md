# Blog Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Blog section to the portfolio that surfaces curated Medium posts as a 2-column card grid, placed between Projects and Stack.

**Architecture:** A new `<Blog />` section component renders a typed list of `BlogPost` entries from `data/content.ts`. Cards link out to Medium. Section uses the existing Bold Editorial design language and reuses shared Framer Motion variants. Section numbers in Stack/Timeline/Contact shift up by one.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind v4 (CSS-based config in `app/globals.css`), Framer Motion.

**Environmental notes:**
- Git is not configured on the dev machine. **Skip all `git add` / `git commit` steps.**
- There is no component test runner. Verification = TypeScript compilation + `npm run build` + visual check in dev server.
- Tailwind v4 uses `@theme inline {}` in `globals.css`. There is no `tailwind.config.ts`.
- Existing eyebrow labels use sentence case in source (`05 — Stack`) and Tailwind's `uppercase` class for display. Match this pattern.

**Spec:** `docs/superpowers/specs/2026-05-19-blog-section-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `data/content.ts` | Modify | Add `BlogPost` type, `blogPosts` array, `MEDIUM_PROFILE_URL` constant |
| `components/sections/Blog.tsx` | Create | The new Blog section component (heading, hairline rule, card grid, bottom CTA) |
| `app/page.tsx` | Modify | Import and render `<Blog />` between `<Projects />` and `<Stack />` |
| `components/sections/Stack.tsx` | Modify | Update eyebrow label `05 — Stack` → `06 — Stack` |
| `components/sections/Timeline.tsx` | Modify | Update eyebrow label `06 — Timeline` → `07 — Timeline` |
| `components/sections/Contact.tsx` | Modify | Update eyebrow label `07 — Contact` → `08 — Contact` |

---

## Task 1: Data Layer

**Files:**
- Modify: `data/content.ts` (append to end of file)

- [ ] **Step 1: Add `BlogPost` type, `blogPosts` array, and `MEDIUM_PROFILE_URL` constant**

Append the following to the end of `data/content.ts`:

```typescript
export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;          // ISO format "YYYY-MM-DD"
  readMinutes: number;
  tags: string[];
  url: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "stripe-b2b-saas",
    title: "From Zero to Production: Integrating Stripe Payments in a B2B SaaS Platform",
    excerpt:
      "Implementing a payment system using Stripe Checkout — architectural considerations, webhook handling, and best practices for secure, production-ready payment processing.",
    date: "2026-03-09",
    readMinutes: 5,
    tags: ["Stripe", "SaaS", "FastAPI", "AWS"],
    url: "https://medium.com/@osmansyed.developer/from-zero-to-production-integrating-stripe-payments-in-a-b2b-saas-platform-10c2b4ceb851",
  },
];

export const MEDIUM_PROFILE_URL = "https://medium.com/@osmansyed.developer";
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from project root:

```bash
npx tsc --noEmit
```

Expected: exits with code 0, no errors.

---

## Task 2: Blog Component

**Files:**
- Create: `components/sections/Blog.tsx`

- [ ] **Step 1: Create the full Blog component file**

Create `components/sections/Blog.tsx` with the following content:

```typescript
"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainerFast,
  viewportOptions,
} from "@/lib/animations";
import { blogPosts, BlogPost, MEDIUM_PROFILE_URL } from "@/data/content";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function getVisibleTags(tags: string[]): { visible: string[]; hidden: number } {
  if (tags.length <= 3) {
    return { visible: tags, hidden: 0 };
  }
  return { visible: tags.slice(0, 2), hidden: tags.length - 2 };
}

function BlogCard({ post }: { post: BlogPost }) {
  const { visible, hidden } = getVisibleTags(post.tags);

  return (
    <motion.a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read '${post.title}' on Medium`}
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="block bg-white border border-neutral-200 rounded-[10px] p-7 transition-colors duration-300 hover:border-coral focus:outline-none focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2 group"
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {visible.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-[0.1em] uppercase px-2 py-[3px] rounded font-medium"
            style={{
              backgroundColor: "#fff0ee",
              color: "#ff6b6b",
              border: "1px solid #ffd5ce",
            }}
          >
            {tag}
          </span>
        ))}
        {hidden > 0 && (
          <span
            className="text-[10px] tracking-[0.1em] uppercase px-2 py-[3px] rounded font-medium"
            style={{
              backgroundColor: "#fff0ee",
              color: "#ff6b6b",
              border: "1px solid #ffd5ce",
            }}
          >
            +{hidden}
          </span>
        )}
      </div>

      <h3
        className="text-lg font-black text-ink mb-3 leading-snug"
        style={{ letterSpacing: "-0.5px" }}
      >
        <span className="line-clamp-3">{post.title}</span>
      </h3>

      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between items-center">
        <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">
          {formatDate(post.date)} · {post.readMinutes} MIN
        </span>
        <span className="text-sm text-ink transition-colors duration-300 group-hover:text-coral">
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function Blog() {
  const sortedPosts = [...blogPosts].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <section
      id="blog"
      className="px-8 md:px-16 lg:px-24 py-24"
      style={{ backgroundColor: "#f8f8f6" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOptions}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0, backgroundColor: "#ff6b6b", height: 1 }}
          className="mb-8"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4">
            05 — Writing
          </p>
          <h2 className="text-4xl font-black tracking-tightest text-ink mb-3">
            Notes from the build.
            <br />
            <span className="text-coral italic">
              Lessons from the trenches.
            </span>
          </h2>
          <p className="text-neutral-500 text-base mb-12">
            Things I&apos;ve learned worth writing down.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {sortedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOptions}
          variants={fadeInUp}
          className="mt-10 flex justify-end"
        >
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 group inline-flex items-center gap-1"
          >
            Read more on{" "}
            <span className="text-ink font-semibold group-hover:text-coral transition-colors duration-300">
              Medium ↗
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run from project root:

```bash
npx tsc --noEmit
```

Expected: exits with code 0, no errors.

---

## Task 3: Integrate Blog Into Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import the Blog component**

In `app/page.tsx`, add the import after the `Projects` import. The full imports block should look like this:

```typescript
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIWork from "@/components/sections/AIWork";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Stack from "@/components/sections/Stack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
```

- [ ] **Step 2: Render `<Blog />` between `<Projects />` and `<Stack />`**

Update the `<main>` block in `app/page.tsx` so it reads exactly:

```typescript
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Blog />
      <Stack />
      <Timeline />
      <Contact />
    </main>
```

- [ ] **Step 3: Verify TypeScript compiles**

Run from project root:

```bash
npx tsc --noEmit
```

Expected: exits with code 0, no errors.

---

## Task 4: Renumber Existing Sections

**Files:**
- Modify: `components/sections/Stack.tsx` (line 28)
- Modify: `components/sections/Timeline.tsx` (line 29)
- Modify: `components/sections/Contact.tsx` (line 30)

- [ ] **Step 1: Update Stack eyebrow**

In `components/sections/Stack.tsx`, change line 28:

From:
```tsx
          05 — Stack
```

To:
```tsx
          06 — Stack
```

- [ ] **Step 2: Update Timeline eyebrow**

In `components/sections/Timeline.tsx`, change line 29:

From:
```tsx
          06 — Timeline
```

To:
```tsx
          07 — Timeline
```

- [ ] **Step 3: Update Contact eyebrow**

In `components/sections/Contact.tsx`, change line 30:

From:
```tsx
          07 — Contact
```

To:
```tsx
          08 — Contact
```

- [ ] **Step 4: Verify TypeScript compiles**

Run from project root:

```bash
npx tsc --noEmit
```

Expected: exits with code 0, no errors.

---

## Task 5: Production Build & Visual Verification

**Files:** None modified — this is a verification-only task.

- [ ] **Step 1: Run the production build**

Run from project root:

```bash
npm run build
```

Expected: build completes successfully with no TypeScript errors and no ESLint errors. Look for `✓ Compiled successfully` and route `/` listed in the output.

- [ ] **Step 2: Start the dev server in the background**

Run from project root:

```bash
npm run dev
```

Expected: server starts and reports a local URL (likely `http://localhost:3000` or `http://localhost:3001` if 3000 is taken).

- [ ] **Step 3: Visual verification checklist**

Open the local URL in a browser and confirm each of the following by scrolling and interacting:

1. **Section order** — Top to bottom: Hero, About, AI Work, Projects, **Blog**, Stack, Timeline, Contact.
2. **Eyebrow numbers** — Projects shows `04`, Blog shows `05`, Stack shows `06`, Timeline shows `07`, Contact shows `08`.
3. **Blog background** — Section has the off-white paper background (`#f8f8f6`), visually distinct from the white sections above and below.
4. **Hairline rule** — A thin coral line draws in across the top of the Blog section as it scrolls into view.
5. **Heading** — "Notes from the build." in black, "Lessons from the trenches." in coral italic on the second line.
6. **Card grid** — One card visible on this build (the Stripe post). Grid is 2-column on desktop (the card sits in the left column) and 1-column on mobile.
7. **Card content** — Tag chips (`STRIPE`, `SAAS`, `FASTAPI`, `AWS`) display correctly. Tags are 4, so all 4 should show? **Verify the tag display rule:** with 4 tags the rule says show first 2 + `+2`. Confirm the card shows `[Stripe] [SaaS] [+2]`, not all four tags.
8. **Hover state** — Hovering the card lifts it 4px and changes the border from light grey to coral. The `↗` arrow turns coral on hover.
9. **Click behavior** — Clicking the card opens the Medium post in a new tab.
10. **Bottom CTA** — Right-aligned "Read more on Medium ↗" link. The "Medium ↗" portion turns coral on hover.
11. **No layout regressions** — Hero, About, AIWork, Projects, Stack, Timeline, Contact all look unchanged from before.

If any check fails, stop and report the specific failure for fixing.

---

## Self-Review Summary

This plan covers all sections of the spec:

- **Placement (spec § Placement)** → Task 3 (insert in page.tsx) + Task 4 (renumber)
- **Heading & Copy (spec § Heading & Copy)** → Task 2 Step 1 (eyebrow `05 — Writing`, two-line headline, subhead)
- **Section background + hairline rule (spec § Section Background & Decoration)** → Task 2 Step 1 (`#f8f8f6` background, animated `motion.div` for hairline)
- **Card layout (spec § Card Layout)** → Task 2 Step 1 (`BlogCard` component)
- **Tag display rule (spec § Card Layout)** → Task 2 Step 1 (`getVisibleTags` helper)
- **Card interaction (spec § Card Interaction)** → Task 2 Step 1 (`whileHover`, `whileTap`, hover border transition, focus ring)
- **Bottom CTA (spec § Bottom CTA)** → Task 2 Step 1 (right-aligned link block)
- **Animations (spec § Animations)** → Task 2 Step 1 (`fadeInUp`, `staggerContainerFast`, hairline `scaleX`)
- **Data structure (spec § Data Structure)** → Task 1 (type + array + constant + sort)
- **Accessibility (spec § Accessibility)** → Task 2 Step 1 (`aria-label`, `rel="noopener noreferrer"`, focus-visible outline)
