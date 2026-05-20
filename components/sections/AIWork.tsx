"use client";

const features = [
  { label: "AI Core", value: "Multi-agent orchestration" },
  { label: "Memory", value: "RAG + knowledge graph" },
  { label: "Infra", value: "AWS Serverless + Bedrock" },
  { label: "Interface", value: "Natural language → production code" },
];

const tags = ["Claude API", "React 19", "Python", "AWS Lambda", "DynamoDB", "Memgraph"];

export default function AIWork() {
  return (
    <section
      id="ai-work"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

        {/* Left — headline + description */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--color-coral)" }}
            />
            <span
              className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.18em] uppercase"
              style={{ color: "var(--color-coral)" }}
            >
              Featured — Active build
            </span>
          </div>

          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.04] tracking-[-0.01em] mb-6"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-dark-ink)" }}
          >
            YottaBuilder
          </h2>

          <p
            className="font-[family-name:var(--font-body)] leading-relaxed mb-10"
            style={{ fontSize: "var(--text-base)", color: "var(--color-dark-muted)", maxWidth: "48ch" }}
          >
            AI-powered no-code platform. Describe your software in natural
            language — it generates the architecture, database schema, UI,
            backend APIs, and test cases. Automatically.
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] px-3 py-1.5 tracking-wide"
                style={{
                  color: "var(--color-dark-muted)",
                  backgroundColor: "var(--color-dark-3)",
                  border: "1px solid var(--color-dark-rule)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right — spec table */}
        <div style={{ borderTop: "1px solid var(--color-dark-rule)" }}>
          {features.map((f, i) => (
            <div
              key={f.label}
              className="flex justify-between items-baseline py-5"
              style={{
                borderBottom: i < features.length - 1 ? "1px solid var(--color-dark-rule)" : "none",
              }}
            >
              <span
                className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase"
                style={{ color: "var(--color-coral)" }}
              >
                {f.label}
              </span>
              <span
                className="font-[family-name:var(--font-body)] font-normal text-[var(--text-sm)] text-right"
                style={{ color: "var(--color-dark-ink)", maxWidth: "24ch" }}
              >
                {f.value}
              </span>
            </div>
          ))}

          <div className="pt-10">
            <div
              className="font-[family-name:var(--font-display)] italic leading-tight"
              style={{ fontSize: "var(--text-lg)", color: "var(--color-dark-muted)" }}
            >
              "Describe your software.<br />
              <span style={{ color: "var(--color-dark-ink)" }}>Ship it."</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
