"use client";

import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.04] tracking-[-0.01em]"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-ink)" }}
          >
            Shipped.
          </h2>
          <p
            className="font-[family-name:var(--font-body)] mt-3"
            style={{ fontSize: "var(--text-base)", color: "var(--color-muted-hm)" }}
          >
            Production systems used by law firms, enterprises, and grant-makers.
          </p>
        </div>

        <div>
          {projects.map((project, i) => (
            <div
              key={project.id}
              style={{
                borderTop: "1px solid var(--color-rule)",
                paddingTop: "var(--space-2xl)",
                paddingBottom: "var(--space-2xl)",
                borderBottom: i === projects.length - 1 ? "1px solid var(--color-rule)" : "none",
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-16">

                {/* Left */}
                <div>
                  <div className="flex items-baseline gap-4 mb-4">
                    <h3
                      className="font-[family-name:var(--font-display)] font-semibold italic leading-none tracking-tight"
                      style={{ fontSize: "var(--text-3xl)", color: "var(--color-ink)" }}
                    >
                      {project.name}
                    </h3>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.1em] shrink-0"
                      style={{
                        color: "var(--color-coral)",
                        textDecoration: "underline",
                        textDecorationColor: "var(--color-coral)",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {project.url.replace("https://", "")} ↗
                    </a>
                  </div>

                  <p
                    className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase mb-4"
                    style={{ color: "var(--color-muted-hm)" }}
                  >
                    {project.category}
                  </p>

                  <p
                    className="font-[family-name:var(--font-body)] leading-relaxed"
                    style={{ fontSize: "var(--text-base)", color: "var(--color-ink-2)", maxWidth: "52ch" }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Right — bullets + stack */}
                <div>
                  <ul className="space-y-3 mb-6">
                    {project.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="font-[family-name:var(--font-body)] flex gap-3"
                        style={{ fontSize: "var(--text-sm)", color: "var(--color-muted-hm)" }}
                      >
                        <span style={{ color: "var(--color-coral)", flexShrink: 0, marginTop: "1px" }}>—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-wide px-3 py-1.5"
                        style={{
                          color: "var(--color-ink-2)",
                          backgroundColor: "var(--color-paper-2)",
                          border: "1px solid var(--color-rule)",
                          borderRadius: "var(--radius-sm)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
