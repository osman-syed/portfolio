"use client";

import { stackItems } from "@/data/content";

const categories = [
  { key: "frontend", label: "Frontend" },
  { key: "ai",       label: "AI / LLM" },
  { key: "backend",  label: "Backend" },
  { key: "infra",    label: "Infra" },
] as const;

export default function Stack() {
  const grouped = Object.fromEntries(
    categories.map(({ key }) => [
      key,
      stackItems.filter((item) => item.category === key),
    ])
  );

  return (
    <section
      id="stack"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.04] tracking-tight"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-ink)" }}
          >
            Stack
          </h2>
          <p
            className="font-[family-name:var(--font-body)] mt-3"
            style={{ fontSize: "var(--text-base)", color: "var(--color-muted-hm)" }}
          >
            Tools I reach for in production.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ borderTop: "1px solid var(--color-rule)" }}
        >
          {categories.map(({ key, label }, colIndex) => (
            <div
              key={key}
              className="py-8"
              style={{
                paddingRight: colIndex < 3 ? "var(--space-xl)" : undefined,
                borderRight: colIndex < 3 ? "1px solid var(--color-rule)" : "none",
                paddingLeft: colIndex > 0 ? "var(--space-xl)" : undefined,
              }}
            >
              <div
                className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.18em] uppercase mb-6"
                style={{ color: "var(--color-coral)" }}
              >
                {label}
              </div>
              <ul className="space-y-3">
                {grouped[key].map((item) => (
                  <li
                    key={item.name}
                    className="font-[family-name:var(--font-body)] font-medium"
                    style={{ fontSize: "var(--text-sm)", color: "var(--color-ink-2)" }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
