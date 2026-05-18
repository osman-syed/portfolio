# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Bold Editorial style personal portfolio for Syed Osman — Full-Stack AI Engineer — using Next.js 14, Tailwind CSS, and Framer Motion with scroll-driven animations.

**Architecture:** Single-page Next.js 14 App Router site with all sections as isolated client components assembled in `page.tsx`. Content is hardcoded in `data/content.ts` as typed constants. All Framer Motion animations live in `lib/animations.ts` as reusable variants.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, Inter font (next/font/google)

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout, Inter font, metadata/SEO, globals |
| `app/page.tsx` | Assembles all sections in order |
| `app/globals.css` | Tailwind directives, custom scrollbar, CSS variables |
| `lib/animations.ts` | Shared Framer Motion variants (fadeInUp, stagger, etc.) |
| `data/content.ts` | All typed content constants (projects, stack, timeline) |
| `components/ScrollProgress.tsx` | Fixed top progress bar tied to scroll position |
| `components/Nav.tsx` | Sticky nav, hides on scroll down, shows on scroll up |
| `components/sections/Hero.tsx` | Hero with stagger entrance + parallax blobs |
| `components/sections/About.tsx` | Bio + 2×2 stat grid with count-up animation |
| `components/sections/AIWork.tsx` | YottaBuilder dark spotlight section |
| `components/sections/Projects.tsx` | Aeon + Lumino full-width cards |
| `components/sections/Stack.tsx` | Color-coded tech grid |
| `components/sections/Timeline.tsx` | Vertical timeline with animated line draw |
| `components/sections/Contact.tsx` | Dark contact section |

---

## Task 1: Scaffold project and install dependencies

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts` (auto-generated)
- Create: `app/globals.css`

- [ ] **Step 1: Scaffold Next.js app**

Run inside `/home/osman/Projects/portfolio`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --yes
```
Expected: Project files created, `npm install` runs automatically.

- [ ] **Step 2: Install Framer Motion**
```bash
npm install framer-motion
```
Expected: `framer-motion` appears in `package.json` dependencies.

- [ ] **Step 3: Install shadcn/ui**
```bash
npx shadcn@latest init -d
```
When prompted, accept defaults (New York style, zinc base color).

- [ ] **Step 4: Add Button component from shadcn**
```bash
npx shadcn@latest add button
```

- [ ] **Step 5: Verify dev server starts**
```bash
npm run dev
```
Expected: Server starts at `http://localhost:3000` with default Next.js page.

- [ ] **Step 6: Verify build compiles**
```bash
npm run build
```
Expected: Build succeeds with no TypeScript errors.

---

## Task 2: Design tokens, globals, and custom scrollbar

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#ff6b6b",
        teal: "#4ecdc4",
        ink: "#111111",
        paper: "#f8f8f6",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      letterSpacing: {
        tightest: "-0.125em",
        tighter: "-0.075em",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Replace `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --font-inter: "Inter", sans-serif;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #f8f8f6;
}
::-webkit-scrollbar-thumb {
  background: #ff6b6b;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #e85555;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #ff6b6b #f8f8f6;
}

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Verify build**
```bash
npm run build
```
Expected: Build succeeds.

---

## Task 3: Shared animation variants

**Files:**
- Create: `lib/animations.ts`

- [ ] **Step 1: Create `lib/animations.ts`**

```typescript
import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const viewportOptions = {
  once: true,
  margin: "-80px",
};
```

- [ ] **Step 2: Verify TypeScript**
```bash
npx tsc --noEmit
```
Expected: No errors.

---

## Task 4: Content data constants

**Files:**
- Create: `data/content.ts`

- [ ] **Step 1: Create `data/content.ts`**

```typescript
export type Project = {
  id: string;
  category: string;
  name: string;
  description: string;
  bullets: string[];
  stack: string[];
  accentColor: string;
  url: string;
};

export type StackItem = {
  name: string;
  category: "frontend" | "ai" | "backend" | "infra";
};

export type TimelineEntry = {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  location: string;
  isCurrent: boolean;
  bullets: string[];
  skills: string[];
  dotColor: string;
};

export const projects: Project[] = [
  {
    id: "aeon",
    category: "AI · Legal Tech · Live",
    name: "Aeon Legal Tech",
    description:
      "AI-powered legal document automation platform serving law firms, enterprises, and banking institutions. Cuts document drafting from hours to minutes with compliance-aware generation.",
    bullets: [
      "Enterprise-grade AI that generates compliant first drafts without training on user data",
      "SOC-compliant security infrastructure with end-to-end encryption",
      "Targets law firms, banks & Fortune 500 legal departments",
    ],
    stack: ["React", "Python", "AI / LLM", "AWS"],
    accentColor: "#4ecdc4",
    url: "https://aeonlegaltech.com",
  },
  {
    id: "lumino",
    category: "Data · Enterprise · Analytics · Live",
    name: "Lumino",
    description:
      "Enterprise intelligence platform for grant-making organizations. Replaces spreadsheet chaos with data-driven grant intelligence, financial forecasting, and portfolio risk analysis.",
    bullets: [
      "Grant analytics with geographic & cause segmentation, grantee performance metrics",
      "Financial forecasting & proforma modeling with portfolio risk assessment",
      "Built on React 19, FastAPI, PostgreSQL — deployed on AWS ECS with Terraform",
    ],
    stack: ["React 19", "FastAPI", "PostgreSQL", "Terraform", "AWS ECS"],
    accentColor: "#111111",
    url: "https://www.luminoinsight.com",
  },
];

export const stackItems: StackItem[] = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Claude API", category: "ai" },
  { name: "AWS Bedrock", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "AWS Lambda", category: "infra" },
  { name: "PostgreSQL", category: "infra" },
  { name: "DynamoDB", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Terraform", category: "infra" },
];

export const stackCategoryStyles: Record<
  StackItem["category"],
  { bg: string; text: string; border: string }
> = {
  frontend: { bg: "#111111", text: "#ffffff", border: "#111111" },
  ai: { bg: "#ff6b6b", text: "#ffffff", border: "#ff6b6b" },
  backend: { bg: "#4ecdc4", text: "#ffffff", border: "#4ecdc4" },
  infra: { bg: "#f0f0ee", text: "#555555", border: "#e0e0de" },
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "l2",
    role: "Associate Software Engineer — L2",
    company: "Yotta Tech Ports",
    period: "Apr 2025 – Present",
    duration: "1 yr 2 mos",
    location: "Hyderabad, India",
    isCurrent: true,
    bullets: [
      "Building YottaBuilder — AI platform with multi-agent orchestration, RAG pipelines & knowledge graphs",
      "Owning backend services, cloud infrastructure & CI/CD pipelines for production systems",
      "Leading full feature delivery from requirement analysis through deployment",
    ],
    skills: ["Claude API", "FastAPI", "React", "AWS", "Python"],
    dotColor: "#ff6b6b",
  },
  {
    id: "ase",
    role: "Associate Software Engineer",
    company: "Yotta Tech Ports",
    period: "Jun 2023 – Mar 2025",
    duration: "1 yr 10 mos",
    location: "Hyderabad, India",
    isCurrent: false,
    bullets: [
      "Developed & maintained full-stack features across multiple production systems",
      "Built REST APIs, data models & AWS integrations for Aeon Legal Tech and Lumino",
    ],
    skills: ["Python", "React", "PostgreSQL", "AWS"],
    dotColor: "#4ecdc4",
  },
  {
    id: "intern",
    role: "Project Intern",
    company: "Yotta Tech Ports",
    period: "Dec 2022 – May 2023",
    duration: "6 mos",
    location: "Hyderabad, India",
    isCurrent: false,
    bullets: [
      "Full-stack development using Python, React, and PostgreSQL — first production code",
    ],
    skills: ["Python", "React", "PostgreSQL"],
    dotColor: "#888888",
  },
];
```

- [ ] **Step 2: Verify TypeScript**
```bash
npx tsc --noEmit
```
Expected: No errors.

---

## Task 5: ScrollProgress component

**Files:**
- Create: `components/ScrollProgress.tsx`

- [ ] **Step 1: Create `components/ScrollProgress.tsx`**

```typescript
"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-coral origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx` temporarily to verify**

```typescript
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <div style={{ height: "300vh" }}>Scroll me</div>
    </main>
  );
}
```

- [ ] **Step 3: Run dev server and verify progress bar appears and animates on scroll**
```bash
npm run dev
```
Open `http://localhost:3000` — scroll down and confirm the coral bar at the top grows.

---

## Task 6: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```typescript
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - lastY;
    if (current < 80) {
      setVisible(true);
    } else if (diff > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastY(current);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[3px] left-0 right-0 z-50 px-8 py-4 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-black/5"
        >
          <a
            href="#"
            className="font-black text-lg tracking-tightest text-ink hover:text-coral transition-colors duration-200"
          >
            SO.
          </a>
          <div className="flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Add Nav to `app/page.tsx`**

```typescript
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <div style={{ height: "300vh", paddingTop: "80px" }}>Scroll me</div>
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm: nav shows at top, hides when scrolling down, reappears when scrolling up.

- [ ] **Step 4: Verify build**
```bash
npm run build
```
Expected: No errors.

---

## Task 7: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```typescript
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden bg-white"
    >
      {/* Decorative blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-coral opacity-[0.06] pointer-events-none"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute bottom-[-60px] left-[15%] w-[280px] h-[280px] rounded-full bg-teal opacity-[0.08] pointer-events-none"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.35em] uppercase text-neutral-400 mb-4"
        >
          — Full Stack · AI Engineer
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl font-black tracking-tightest text-ink leading-[1.0] mb-2"
        >
          Syed Osman
        </motion.h1>

        <motion.div variants={fadeInUp} className="mb-6">
          <span className="text-3xl md:text-5xl font-black tracking-tighter text-ink leading-[1.1]">
            I build software{" "}
          </span>
          <span className="text-3xl md:text-5xl font-black tracking-tighter text-coral italic leading-[1.1]">
            that builds software.
          </span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-sm text-neutral-500 leading-relaxed max-w-md border-l-[3px] border-coral pl-4 mb-8"
        >
          Full-stack developer since Dec 2022. Currently building AI-powered
          platforms that turn ideas into production software — no manual coding
          required.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex gap-4 items-center flex-wrap">
          <a
            href="#projects"
            className="bg-ink text-white px-6 py-3 text-xs font-bold tracking-[0.1em] uppercase rounded hover:bg-neutral-800 transition-colors duration-200"
          >
            View Work ↓
          </a>
          <a
            href="#contact"
            className="text-ink text-sm font-semibold underline underline-offset-4 hover:text-coral transition-colors duration-200"
          >
            Let&apos;s talk →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-neutral-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to `app/page.tsx`**

```typescript
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000`. Confirm: hero text staggers in on load, parallax blobs move on scroll, scroll indicator bounces.

---

## Task 8: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```typescript
"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = (target / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-3xl font-black text-coral leading-none">
      {count}{suffix}
    </div>
  );
}

const stats = [
  { display: "count", value: 3.5, suffix: "", label: "Yrs Exp", dark: false },
  { display: "count", value: 3, suffix: "", label: "Products", dark: false },
  { display: "static", staticVal: "AI", label: "Native", dark: true },
  { display: "static", staticVal: "∞", label: "Curiosity", dark: false, teal: true },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="px-8 md:px-16 lg:px-24 py-24 bg-paper"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left: bio */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
          >
            02 — About
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-black tracking-tightest text-ink mb-6"
          >
            Who I am.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-500 text-sm leading-relaxed mb-4">
            Started Dec 2022 with zero production experience. Three and a half years later — shipped enterprise analytics platforms, AI document automation, and an AI no-code platform that writes its own code.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-neutral-500 text-sm leading-relaxed">
            Based in Hyderabad. Currently going deep on multi-agent systems, RAG, and production LLM pipelines at Yotta Tech Ports.
          </motion.p>
        </div>

        {/* Right: stat grid */}
        <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
          {/* 3.5 Yrs */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <CountUp target={3.5} />
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Yrs Exp</p>
          </motion.div>

          {/* 3 Products */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <CountUp target={3} />
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Products</p>
          </motion.div>

          {/* AI Native */}
          <motion.div
            variants={fadeInUp}
            className="bg-ink rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-black text-coral leading-none">AI</div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1">Native</p>
          </motion.div>

          {/* Curiosity */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-black text-teal leading-none">∞</div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Curiosity</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add About to `app/page.tsx`**

```typescript
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to About section. Confirm: stat numbers count up when section enters viewport.

---

## Task 9: AI Work section (YottaBuilder spotlight)

**Files:**
- Create: `components/sections/AIWork.tsx`

- [ ] **Step 1: Create `components/sections/AIWork.tsx`**

```typescript
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, viewportOptions } from "@/lib/animations";

const features = [
  { label: "AI Core", value: "Multi-agent orchestration" },
  { label: "Memory", value: "RAG + Knowledge graph" },
  { label: "Infra", value: "AWS Serverless + Bedrock" },
];

const tags = ["Claude API", "React 19", "Python", "AWS Lambda", "DynamoDB", "Memgraph"];

export default function AIWork() {
  return (
    <section id="ai-work" className="px-8 md:px-16 lg:px-24 py-24 bg-ink relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-coral opacity-[0.07] pointer-events-none blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-6"
        >
          03 — AI Work
        </motion.p>

        {/* Badge */}
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-coral/10 border border-coral/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-coral shadow-[0_0_6px_#ff6b6b]" />
          <span className="text-coral text-[10px] tracking-[0.2em] uppercase font-medium">
            Featured — 3 months deep
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-black tracking-tightest text-white mb-4"
        >
          YottaBuilder
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8"
        >
          AI-powered no-code platform. Describe your software in natural language — it generates the
          architecture, DB schema, UI, backend APIs, and test cases. Automatically.
        </motion.p>

        {/* Feature tiles */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={scaleIn}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,107,107,0.4)" }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 transition-colors duration-200"
            >
              <p className="text-coral text-[10px] tracking-[0.2em] uppercase mb-2">{f.label}</p>
              <p className="text-white text-sm">{f.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech tags */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-coral/15 text-coral text-xs px-3 py-1.5 rounded"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add AIWork to `app/page.tsx`**

```typescript
import AIWork from "@/components/sections/AIWork";
// ... existing imports

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to AI Work section. Confirm dark section appears, badge glows, feature tiles have hover scale effect.

---

## Task 10: Projects section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create `components/sections/Projects.tsx`**

```typescript
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, viewportOptions } from "@/lib/animations";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 lg:px-24 py-24 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
        >
          04 — Projects
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          Things I&apos;ve{" "}
          <span className="text-coral italic">actually shipped.</span>
        </motion.h2>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={slideInLeft}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-neutral-200 rounded-xl p-8 group"
              style={{ borderLeftWidth: 4, borderLeftColor: project.accentColor }}
            >
              <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-2 font-medium"
                    style={{ color: project.accentColor }}
                  >
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-ink">
                    {project.name}
                  </h3>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink text-white text-xs px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition-colors duration-200 whitespace-nowrap"
                >
                  {project.url.replace("https://", "").replace("www.", "")} ↗
                </a>
              </div>

              <p className="text-neutral-500 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-600">
                    <span style={{ color: project.accentColor }} className="mt-0.5 shrink-0">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-3 py-1.5 rounded border font-medium"
                    style={{
                      backgroundColor: project.accentColor + "15",
                      color: project.accentColor,
                      borderColor: project.accentColor + "40",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Projects to `app/page.tsx`**

```typescript
import Projects from "@/components/sections/Projects";
// ... existing imports

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Projects. Confirm cards slide in from left, hover effect nudges card right, live links work.

---

## Task 11: Stack section

**Files:**
- Create: `components/sections/Stack.tsx`

- [ ] **Step 1: Create `components/sections/Stack.tsx`**

```typescript
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerContainerFast, viewportOptions } from "@/lib/animations";
import { stackItems, stackCategoryStyles } from "@/data/content";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  ai: "AI / LLM",
  backend: "Backend",
  infra: "Infra",
};

export default function Stack() {
  return (
    <section id="stack" className="px-8 md:px-16 lg:px-24 py-24 bg-paper">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
        >
          05 — Stack
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          Tools I reach for.
        </motion.h2>

        <motion.div variants={staggerContainerFast} className="flex flex-wrap gap-3">
          {stackItems.map((item) => {
            const style = stackCategoryStyles[item.category];
            return (
              <motion.span
                key={item.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-sm px-4 py-2 rounded font-semibold cursor-default"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                  border: `1px solid ${style.border}`,
                }}
              >
                {item.name}
              </motion.span>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const style = stackCategoryStyles[key as keyof typeof stackCategoryStyles];
            return (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: style.bg, border: `1px solid ${style.border}` }}
                />
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.15em]">
                  {label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Stack to `app/page.tsx`**

```typescript
import Stack from "@/components/sections/Stack";
// ... existing imports

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Stack />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Stack. Confirm tags appear with correct colors, hover lifts each tag.

---

## Task 12: Timeline section

**Files:**
- Create: `components/sections/Timeline.tsx`

- [ ] **Step 1: Create `components/sections/Timeline.tsx`**

```typescript
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";
import { timelineEntries } from "@/data/content";

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="px-8 md:px-16 lg:px-24 py-24 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
        >
          06 — Timeline
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          3.5 years.{" "}
          <span className="text-coral italic">One company. All in.</span>
        </motion.h2>

        <div ref={lineRef} className="relative pl-8">
          {/* Animated vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neutral-100 overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-coral via-teal to-neutral-400"
            />
          </div>

          {timelineEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              variants={fadeInUp}
              className={i < timelineEntries.length - 1 ? "mb-10" : ""}
            >
              {/* Dot */}
              <div
                className="absolute left-0 w-4 h-4 rounded-full ring-4 ring-white"
                style={{ backgroundColor: entry.dotColor, marginTop: "4px" }}
              />

              <div className="pl-4">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-black text-ink text-base">{entry.role}</h3>
                  {entry.isCurrent && (
                    <span className="bg-coral text-white text-[9px] px-2.5 py-0.5 rounded-full tracking-[0.1em] uppercase font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  {entry.company} · {entry.period} · {entry.location}
                </p>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {entry.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-sm text-neutral-500">
                      <span style={{ color: entry.dotColor }} className="mt-0.5 shrink-0">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {entry.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2.5 py-1 rounded border font-medium"
                      style={{
                        backgroundColor: entry.dotColor + "15",
                        color: entry.dotColor === "#888888" ? "#666" : entry.dotColor,
                        borderColor: entry.dotColor + "40",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Add Timeline to `app/page.tsx`**

```typescript
import Timeline from "@/components/sections/Timeline";
// ... existing imports

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Stack />
      <Timeline />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Timeline. Confirm the gradient line draws downward as you scroll through the section. Each role entry fades in.

---

## Task 13: Contact section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```typescript
"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

const GITHUB_URL = "https://github.com/YOUR_GITHUB";
const LINKEDIN_URL = "https://linkedin.com/in/YOUR_LINKEDIN";
const EMAIL = "syed.osman@yottatechports.com";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-8 md:px-16 lg:px-24 py-32 bg-ink relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral opacity-[0.05] pointer-events-none blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-6"
        >
          07 — Contact
        </motion.p>

        <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-black tracking-tightest text-white mb-4">
          Let&apos;s build{" "}
          <span className="text-coral italic">something.</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-neutral-400 text-sm mb-10">
          Open to roles, contracts, and interesting problems.
        </motion.p>

        <motion.div variants={staggerContainer} className="flex justify-center gap-4 flex-wrap">
          <motion.a
            variants={fadeInUp}
            href={`mailto:${EMAIL}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-coral text-white px-8 py-3 rounded text-sm font-bold tracking-wide hover:bg-[#e85555] transition-colors duration-200"
          >
            Send a message
          </motion.a>
          <motion.a
            variants={fadeInUp}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-white/20 transition-colors duration-200"
          >
            GitHub
          </motion.a>
          <motion.a
            variants={fadeInUp}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-white/20 transition-colors duration-200"
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

> **Note:** Before deploying, replace `YOUR_GITHUB` and `YOUR_LINKEDIN` with real URLs.

- [ ] **Step 2: Add Contact to `app/page.tsx`**

```typescript
import Contact from "@/components/sections/Contact";
// ... existing imports

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Stack />
      <Timeline />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Verify in browser**

Scroll to Contact. Confirm dark section, glow effect, buttons have hover scale, email link opens mail client.

---

## Task 14: Layout, SEO, and final page assembly

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Syed Osman — Full-Stack AI Engineer",
  description:
    "Full-stack developer and AI engineer. Building intelligent products with multi-agent systems, RAG pipelines, and LLMs. Available for roles and contracts.",
  keywords: ["AI engineer", "full-stack developer", "React", "Python", "LLM", "multi-agent"],
  authors: [{ name: "Syed Osman" }],
  openGraph: {
    title: "Syed Osman — Full-Stack AI Engineer",
    description: "I build software that builds software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Final `app/page.tsx`**

```typescript
import ScrollProgress from "@/components/ScrollProgress";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import AIWork from "@/components/sections/AIWork";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Nav />
      <Hero />
      <About />
      <AIWork />
      <Projects />
      <Stack />
      <Timeline />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 3: Run final build**
```bash
npm run build
```
Expected: Build succeeds. No TypeScript errors. No ESLint errors.

- [ ] **Step 4: Full visual pass in browser**
```bash
npm run dev
```
Check each section top-to-bottom:
- [ ] Scroll progress bar animates
- [ ] Nav hides/shows on scroll
- [ ] Hero text staggers in, parallax blobs move
- [ ] About stats count up on first view
- [ ] AI Work dark section, badge glows, tiles hover
- [ ] Projects cards slide in, live links work
- [ ] Stack tags hover with lift
- [ ] Timeline line draws on scroll, roles fade in
- [ ] Contact buttons have hover scale, email opens

---

## Task 15: Add GitHub and LinkedIn links + deploy

**Files:**
- Modify: `components/sections/Contact.tsx`

- [ ] **Step 1: Update real links in `components/sections/Contact.tsx`**

Replace the placeholder constants at the top of the file:
```typescript
const GITHUB_URL = "https://github.com/YOUR_ACTUAL_GITHUB_USERNAME";
const LINKEDIN_URL = "https://linkedin.com/in/YOUR_ACTUAL_LINKEDIN_HANDLE";
```

- [ ] **Step 2: Final build verification**
```bash
npm run build
```
Expected: Clean build.

- [ ] **Step 3: Deploy to Vercel**
```bash
npx vercel
```
Follow prompts. Link to a new project. Accept defaults.
Expected: Deployment URL printed to terminal. Open it and verify the live site.
