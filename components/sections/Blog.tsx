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
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 22 } }}
      whileTap={{ scale: 0.97 }}
      className="block bg-white border border-neutral-200 rounded-[10px] p-7 transition-colors duration-300 hover:border-coral focus:outline-none focus-visible:outline-2 focus-visible:outline-coral focus-visible:outline-offset-2 group"
    >
      <div className="flex flex-wrap gap-1.5 mb-4">
        {visible.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-[0.1em] uppercase px-2 py-[3px] rounded font-medium bg-coral/10 text-coral border border-coral/30"
          >
            {tag}
          </span>
        ))}
        {hidden > 0 && (
          <span
            className="text-[10px] tracking-[0.1em] uppercase px-2 py-[3px] rounded font-medium bg-coral/10 text-coral border border-coral/30"
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
      className="px-8 md:px-16 lg:px-24 py-24 bg-paper"
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
