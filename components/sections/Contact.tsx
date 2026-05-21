"use client";

const EMAIL = "syed.osman@yottatechports.com";
const GITHUB_URL = "https://github.com/osmansyed";
const LINKEDIN_URL = "https://www.linkedin.com/in/osman-syed9/";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-dark)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Statement — Ft5 pattern */}
        <div className="mb-16" style={{ borderBottom: "1px solid var(--color-dark-rule)", paddingBottom: "var(--space-2xl)" }}>
          <h2
            className="font-[family-name:var(--font-display)] font-bold leading-[1.04] tracking-[-0.01em]"
            style={{ fontSize: "var(--text-display)", color: "var(--color-dark-ink)" }}
          >
            Let&apos;s build<br />
            <span style={{ color: "var(--color-coral)" }}>something.</span>
          </h2>
          <p
            className="font-[family-name:var(--font-body)] mt-6"
            style={{ fontSize: "var(--text-base)", color: "var(--color-dark-muted)", maxWidth: "44ch" }}
          >
            Open to engineering roles, contracts, and interesting problems.
            If you&apos;re building something ambitious, I&apos;d like to hear about it.
          </p>
        </div>

        {/* Contact links */}
        <div className="flex flex-wrap gap-6 items-center">
          <a
            href={`mailto:${EMAIL}`}
            className="font-[family-name:var(--font-body)] font-semibold"
            style={{
              fontSize: "var(--text-base)",
              color: "var(--color-dark-ink)",
              textDecoration: "underline",
              textDecorationColor: "var(--color-dark-rule)",
              textUnderlineOffset: "5px",
              transition: `color var(--dur-short) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-coral)";
              (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-coral)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-dark-ink)";
              (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-dark-rule)";
            }}
          >
            {EMAIL}
          </a>

          <span style={{ color: "var(--color-dark-rule)" }}>·</span>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tracking-wide"
            style={{
              color: "var(--color-dark-muted)",
              transition: `color var(--dur-short) var(--ease-out)`,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-dark-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--color-dark-muted)"}
          >
            GitHub ↗
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] tracking-wide"
            style={{
              color: "var(--color-dark-muted)",
              transition: `color var(--dur-short) var(--ease-out)`,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-dark-ink)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--color-dark-muted)"}
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Footer meta */}
        <div
          className="flex justify-between items-center flex-wrap gap-4 mt-16 pt-6"
          style={{ borderTop: "1px solid var(--color-dark-rule)" }}
        >
          <span
            className="font-[family-name:var(--font-display)] font-bold uppercase tracking-[0.08em]"
            style={{ fontSize: "var(--text-lg)", color: "var(--color-dark-muted)" }}
          >
            SO.
          </span>
          <span
            className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em]"
            style={{ color: "var(--color-dark-muted)" }}
          >
            Hyderabad · {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </section>
  );
}
