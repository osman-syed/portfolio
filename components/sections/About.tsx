"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
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
    <div ref={ref}>
      {count}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-paper-2)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 lg:gap-24 items-start">

        {/* Left — bio */}
        <div>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.08] tracking-[-0.01em] mb-8"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-ink)" }}
          >
            Engineer by trade,<br />builder by instinct.
          </h2>
          <div
            className="font-[family-name:var(--font-body)] leading-relaxed space-y-4"
            style={{ fontSize: "var(--text-base)", color: "var(--color-muted-hm)", maxWidth: "55ch" }}
          >
            <p>
              I&apos;ve been at Yotta Tech Ports since December 2022 — starting as a
              project intern and growing into the engineer building the company&apos;s
              most ambitious product.
            </p>
            <p>
              My work spans the full stack: React frontends, FastAPI backends,
              AWS infrastructure, and increasingly the AI layer — multi-agent
              orchestration, RAG pipelines, knowledge graphs. I care about
              systems that are both technically sound and genuinely useful.
            </p>
            <p>
              Currently building YottaBuilder: describe your software in plain
              English, get production code. It&apos;s the hardest thing I&apos;ve worked on.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="https://medium.com/@osmansyed.developer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-body)] font-medium text-[var(--text-sm)]"
              style={{
                color: "var(--color-coral)",
                textDecoration: "underline",
                textDecorationColor: "var(--color-coral)",
                textUnderlineOffset: "4px",
              }}
            >
              Read my writing →
            </a>
          </div>
        </div>

        {/* Right — stats */}
        <div className="flex flex-col gap-10 pt-2">
          {[
            { target: 3.5, label: "Years at Yotta Tech Ports" },
            { target: 3, label: "Production products shipped" },
          ].map(({ target, label }) => (
            <div key={label} style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "var(--space-lg)" }}>
              <div
                className="font-[family-name:var(--font-display)] font-semibold italic leading-none mb-2"
                style={{ fontSize: "var(--text-4xl)", color: "var(--color-coral)", fontVariantNumeric: "tabular-nums" }}
              >
                <CountUp target={target} />
              </div>
              <div
                className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase"
                style={{ color: "var(--color-muted-hm)" }}
              >
                {label}
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "var(--space-lg)" }}>
            <div
              className="font-[family-name:var(--font-display)] font-semibold italic leading-none mb-2"
              style={{ fontSize: "var(--text-4xl)", color: "var(--color-coral)" }}
            >
              ∞
            </div>
            <div
              className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase"
              style={{ color: "var(--color-muted-hm)" }}
            >
              Curiosity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
