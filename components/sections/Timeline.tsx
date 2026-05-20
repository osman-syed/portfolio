"use client";

import { timelineEntries } from "@/data/content";

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-paper-2)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.04] tracking-tight"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-ink)" }}
          >
            3.5 years.
          </h2>
          <p
            className="font-[family-name:var(--font-display)] italic mt-1"
            style={{ fontSize: "var(--text-xl)", color: "var(--color-coral)" }}
          >
            One company. All in.
          </p>
        </div>

        <div style={{ borderTop: "1px solid var(--color-rule)" }}>
          {timelineEntries.map((entry, i) => (
            <div
              key={entry.id}
              className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 lg:gap-16 py-10"
              style={{
                borderBottom: i < timelineEntries.length - 1 ? "1px solid var(--color-rule)" : "none",
              }}
            >
              {/* Left — date + company */}
              <div>
                <div
                  className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase mb-2"
                  style={{ color: "var(--color-muted-hm)" }}
                >
                  {entry.period}
                </div>
                <div
                  className="font-[family-name:var(--font-body)] font-medium text-[var(--text-sm)]"
                  style={{ color: "var(--color-ink-2)" }}
                >
                  {entry.company}
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.1em] mt-1"
                  style={{ color: "var(--color-muted-hm)" }}
                >
                  {entry.location}
                </div>
                {entry.isCurrent && (
                  <div className="mt-3">
                    <span
                      className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.12em] uppercase px-2.5 py-1"
                      style={{
                        color: "var(--color-coral-ink)",
                        backgroundColor: "var(--color-coral)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Current
                    </span>
                  </div>
                )}
              </div>

              {/* Right — role + bullets + skills */}
              <div>
                <h3
                  className="font-[family-name:var(--font-display)] font-semibold italic leading-tight tracking-tight mb-4"
                  style={{ fontSize: "var(--text-xl)", color: "var(--color-ink)" }}
                >
                  {entry.role}
                </h3>

                <ul className="space-y-2 mb-6">
                  {entry.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="font-[family-name:var(--font-body)] flex gap-3"
                      style={{ fontSize: "var(--text-sm)", color: "var(--color-muted-hm)" }}
                    >
                      <span style={{ color: "var(--color-coral)", flexShrink: 0, marginTop: "2px" }}>—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {entry.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-wide px-3 py-1.5"
                      style={{
                        color: "var(--color-ink-2)",
                        backgroundColor: "var(--color-paper-3)",
                        border: "1px solid var(--color-rule)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
