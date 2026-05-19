# Blog Section Design Spec
**Date:** 2026-05-19
**Owner:** Syed Osman
**Status:** Approved

---

## Overview

Add a Blog section to the portfolio that surfaces a curated list of posts published on Medium. The section sits between Projects and Stack, sharing the Bold Editorial design language already established throughout the site. Posts are hardcoded in `data/content.ts` for curatorial control; clicking a card opens the post on Medium in a new tab.

---

## Placement

Inserted between Projects and Stack. Section numbering updates:

| # | Section |
|---|---|
| 01 | Hero |
| 02 | About |
| 03 | AI Work |
| 04 | Projects (was 04 — unchanged) |
| **05** | **Blog (NEW)** |
| 06 | Stack (was 05) |
| 07 | Timeline (was 06) |
| 08 | Contact (was 07) |

Existing section number labels in component headers must be updated to reflect the shift (Stack `05 → 06`, Timeline `06 → 07`, Contact `07 → 08`).

---

## Heading & Copy

Eyebrow label: `05 — WRITING` (uppercase, letter-spaced, `#bbb`).

Headline (two lines, 900 weight, `-1px` tracking):
> Notes from the build.
> *Lessons from the trenches.*

Second line is coral (`#ff6b6b`) italic.

Subhead (muted, `#666`): "Things I've learned worth writing down."

---

## Section Background & Decoration

- **Background:** `var(--color-paper)` (`#f8f8f6`) — the portfolio's existing paper token. Creates a visual rest between Projects (white) and Stack (white).
- **Top hairline rule:** 1px coral line, full width of the section's inner content container. Animates `scaleX` from 0 → 1 on `whileInView` enter, `origin: left`, 0.8s duration with the standard easing curve `[0.22, 1, 0.36, 1]`. Sits just above the eyebrow label.

---

## Card Layout

**Grid:** 2 columns on `md+` screens, 1 column on mobile. Gap: `gap-6` (24px).

**Card structure (top to bottom):**

1. Tag chips row — uppercase, coral text on `#fff0ee` background, `1px solid #ffd5ce`, `text-[10px]`, `letter-spacing: 1px`, padded `3px 8px`, rounded `4px`. Display rule: if the post has ≤3 tags, show all of them. If it has 4+, show the first 2 tags plus a `+N` chip (where N is the count of hidden tags), for a total of 3 chips. Example: 5 tags → `[Stripe] [SaaS] [+3]`.
2. Post title — black, `font-weight: 900`, `letter-spacing: -0.5px`, `text-lg` (18px), `line-height: 1.3`, line-clamped to 3 lines.
3. Excerpt — `#666`, `text-sm` (14px), `line-height: 1.7`, line-clamped to 3 lines.
4. Divider — `1px solid #e8e8e8`, full card width minus padding, vertical margin `16px 0`.
5. Metadata row — `flex justify-between items-center`:
   - Left: `MAR 9, 2026 · 5 MIN` — uppercase, letter-spaced, `text-[10px]`, `#999`.
   - Right: arrow glyph `↗`, `#111`, `text-sm`, transitions to coral on hover.

**Card container:**
- Background: `#ffffff`
- Border: `1px solid #e8e8e8` default
- Border-radius: `10px`
- Padding: `28px`
- Cursor: `pointer`
- The entire card is wrapped in an `<a>` with `target="_blank"` and `rel="noopener noreferrer"` pointing at the post URL.

---

## Card Interaction

- **Hover state:**
  - Border color transitions from `#e8e8e8` → `#ff6b6b` (300ms CSS transition).
  - Card lifts via Framer Motion `whileHover={{ y: -4 }}`.
  - Arrow glyph color transitions from `#111` → `#ff6b6b`.
- **Tap state:** `whileTap={{ scale: 0.99 }}`.
- **Focus state:** Keyboard focus shows a `2px solid #ff6b6b` outline with `2px` outline-offset (accessibility).

---

## Bottom CTA

Right-aligned below the grid, separated by `mt-10`:

> Read more on **Medium ↗**

- Text: "Read more on" in `#666`, "Medium ↗" in `#111` bold.
- Hover: "Medium ↗" transitions to coral (`#ff6b6b`).
- Links to `MEDIUM_PROFILE_URL` constant, `target="_blank"`, `rel="noopener noreferrer"`.

---

## Animations

Reuses existing variants from `lib/animations.ts`. No new variants needed.

| Element | Animation |
|---|---|
| Section heading block | `fadeInUp` via `motion.div` with `whileInView` + `viewportOptions` |
| Hairline rule | `motion.div` with `initial={{ scaleX: 0 }}`, `whileInView={{ scaleX: 1 }}`, `transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}`, `style={{ originX: 0 }}` |
| Card grid | Wrapped in `motion.div` with `staggerContainerFast` (0.06s stagger), `whileInView="visible"`, `viewport={viewportOptions}` |
| Each card | `fadeInUp` variant + `whileHover={{ y: -4 }}` + `whileTap={{ scale: 0.99 }}` |
| Bottom CTA | `fadeInUp` with `whileInView` |

All `whileInView` triggers use the existing `viewportOptions` (`{ once: true, margin: "-80px" }`).

---

## Data Structure

Added to `data/content.ts`:

```typescript
export type BlogPost = {
  title: string;
  excerpt: string;       // 2-3 sentence summary
  date: string;          // ISO format "YYYY-MM-DD"
  readMinutes: number;
  tags: string[];
  url: string;           // Full Medium post URL
};

export const blogPosts: BlogPost[] = [
  {
    title: "From Zero to Production: Integrating Stripe Payments in a B2B SaaS Platform",
    excerpt: "Implementing a payment system using Stripe Checkout — architectural considerations, webhook handling, and best practices for secure, production-ready payment processing.",
    date: "2026-03-09",
    readMinutes: 5,
    tags: ["Stripe", "SaaS", "FastAPI", "AWS"],
    url: "https://medium.com/@osmansyed.developer/from-zero-to-production-integrating-stripe-payments-in-a-b2b-saas-platform-10c2b4ceb851",
  },
];

export const MEDIUM_PROFILE_URL = "https://medium.com/@osmansyed.developer";
```

Sort order: the Blog component sorts `blogPosts` by `date` descending at render time, so newest is always top-left. Adding a future post is a one-line append to the array — sort handles ordering automatically.

Date formatting helper (inline in the Blog component, no new dependency):

```typescript
function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
}
// "2026-03-09" → "MAR 9, 2026"
```

---

## File Structure

| File | Action |
|---|---|
| `components/sections/Blog.tsx` | Create — the new section component |
| `data/content.ts` | Modify — add `BlogPost` type, `blogPosts` array, `MEDIUM_PROFILE_URL` constant |
| `app/page.tsx` | Modify — import and render `<Blog />` between `<Projects />` and `<Stack />` |
| `components/sections/Stack.tsx` | Modify — update eyebrow label `05 — STACK` → `06 — STACK` |
| `components/sections/Timeline.tsx` | Modify — update eyebrow label `06 — TIMELINE` → `07 — TIMELINE` |
| `components/sections/Contact.tsx` | Modify — update eyebrow label `07 — CONTACT` → `08 — CONTACT` |

---

## Accessibility

- Each card is a single `<a>` element wrapping all interactive content (avoids nested-anchor problems).
- Cards include `aria-label` describing the post (e.g., `aria-label="Read 'From Zero to Production' on Medium"`).
- Keyboard focus ring uses the coral outline described in the Card Interaction section.
- `target="_blank"` links include `rel="noopener noreferrer"`.

---

## Out of Scope

- Self-hosted blog pages (`/blog/[slug]`) — future consideration once post count exceeds ~20.
- RSS auto-pulling from Medium — explicitly rejected in brainstorming for curatorial control.
- Tag-based filtering — not needed at this scale (2 posts now, ~10 by year-end).
- Search — not needed at this scale.
- Pagination — 2-column grid scales cleanly through ~12 posts; revisit then.
