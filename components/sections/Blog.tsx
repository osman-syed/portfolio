"use client";

import { blogPosts, BlogPost, MEDIUM_PROFILE_URL } from "@/data/content";

function formatDate(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

function ArticleRow({ post }: { post: BlogPost }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Read "${post.title}" on Medium`}
      className="group block py-7"
      style={{
        borderBottom: "1px solid var(--color-rule)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:gap-16 items-baseline">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.1em] px-2.5 py-1"
                style={{
                  color: "var(--color-coral)",
                  backgroundColor: "var(--color-paper-2)",
                  border: "1px solid var(--color-rule)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h3
            className="font-[family-name:var(--font-display)] italic font-semibold leading-snug tracking-tight mb-2 group-hover:text-[var(--color-coral)] transition-colors duration-[var(--dur-short)]"
            style={{
              fontSize: "var(--text-xl)",
              color: "var(--color-ink)",
              transitionTimingFunction: "var(--ease-out)",
            }}
          >
            {post.title}
          </h3>
          <p
            className="font-[family-name:var(--font-body)] leading-relaxed"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-muted-hm)",
              maxWidth: "68ch",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span
            className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.12em] whitespace-nowrap"
            style={{ color: "var(--color-muted-hm)" }}
          >
            {formatDate(post.date)} · {post.readMinutes} MIN
          </span>
          <span
            className="text-[var(--text-md)] group-hover:text-[var(--color-coral)] transition-colors duration-[var(--dur-short)]"
            style={{ color: "var(--color-ink-2)", transitionTimingFunction: "var(--ease-out)" }}
          >
            ↗
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Blog() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section
      id="blog"
      className="px-6 md:px-12 lg:px-20 py-28"
      style={{ backgroundColor: "var(--color-paper-2)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10" style={{ borderBottom: "1px solid var(--color-rule)", paddingBottom: "var(--space-lg)" }}>
          <h2
            className="font-[family-name:var(--font-display)] font-semibold italic leading-none tracking-tight"
            style={{ fontSize: "var(--text-display-s)", color: "var(--color-ink)" }}
          >
            Writing
          </h2>
          <a
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-body)] font-medium text-[var(--text-sm)] shrink-0"
            style={{
              color: "var(--color-muted-hm)",
              textDecoration: "underline",
              textDecorationColor: "var(--color-rule)",
              textUnderlineOffset: "4px",
              transition: `color var(--dur-short) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-coral)";
              (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-coral)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-muted-hm)";
              (e.currentTarget as HTMLElement).style.textDecorationColor = "var(--color-rule)";
            }}
          >
            All on Medium →
          </a>
        </div>

        <div>
          {sorted.map((post) => (
            <ArticleRow key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
