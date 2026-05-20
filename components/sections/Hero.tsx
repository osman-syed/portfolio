"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const base = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-20 pt-28 pb-20"
      style={{ backgroundColor: "var(--color-paper)" }}
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-20 items-center">

        {/* Left — text */}
        <div>
          <motion.p
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0 }}
            className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.18em] uppercase mb-6"
            style={{ color: "var(--color-muted-hm)" }}
          >
            Full-Stack · AI Engineer · Hyderabad
          </motion.p>

          <motion.h1
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0.08 }}
            className="font-[family-name:var(--font-display)] font-semibold italic leading-[1.02] tracking-[-0.01em] mb-2"
            style={{ fontSize: "var(--text-display)", color: "var(--color-ink)" }}
          >
            Syed Osman
          </motion.h1>

          <motion.div
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0.16 }}
            className="mb-8"
          >
            <span
              className="font-[family-name:var(--font-body)] font-light leading-[1.2] tracking-[-0.02em]"
              style={{ fontSize: "var(--text-xl)", color: "var(--color-ink-2)" }}
            >
              I build software{" "}
            </span>
            <span
              className="font-[family-name:var(--font-display)] italic font-normal leading-[1.2]"
              style={{ fontSize: "var(--text-xl)", color: "var(--color-coral)" }}
            >
              that builds software.
            </span>
          </motion.div>

          <motion.p
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0.24 }}
            className="font-[family-name:var(--font-body)] font-normal leading-relaxed max-w-[50ch] mb-10"
            style={{ fontSize: "var(--text-base)", color: "var(--color-muted-hm)" }}
          >
            Full-stack developer since Dec 2022. Currently building AI-powered
            platforms that turn natural language into production software —
            no manual coding required.
          </motion.p>

          <motion.div
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0.32 }}
            className="flex items-center gap-6 flex-wrap mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 font-[family-name:var(--font-body)] font-semibold text-[var(--text-sm)] tracking-wide"
              style={{
                backgroundColor: "var(--color-ink)",
                color: "var(--color-paper)",
                border: "1px solid var(--color-ink)",
                borderRadius: "var(--radius-sm)",
                transition: `background-color var(--dur-short) var(--ease-out), transform var(--dur-micro) var(--ease-out)`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--color-ink-2)";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = "var(--color-ink)";
                el.style.transform = "translateY(0)";
              }}
            >
              View work ↓
            </a>
            <a
              href="#contact"
              className="font-[family-name:var(--font-body)] font-medium text-[var(--text-sm)]"
              style={{
                color: "var(--color-ink-2)",
                textDecoration: "underline",
                textDecorationColor: "var(--color-rule)",
                textUnderlineOffset: "4px",
                transition: `color var(--dur-short) var(--ease-out)`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--color-coral)";
                el.style.textDecorationColor = "var(--color-coral)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--color-ink-2)";
                el.style.textDecorationColor = "var(--color-rule)";
              }}
            >
              Let&apos;s talk →
            </a>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            variants={base} initial="hidden" animate="visible"
            transition={{ duration: 0.52, ease, delay: 0.40 }}
            className="flex gap-8 pt-6"
            style={{ borderTop: "1px solid var(--color-rule)" }}
          >
            {[
              { value: "3.5", label: "Years exp" },
              { value: "3", label: "Products" },
              { value: "∞", label: "Curiosity" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div
                  className="font-[family-name:var(--font-display)] font-semibold italic leading-none mb-1"
                  style={{ fontSize: "var(--text-2xl)", color: "var(--color-ink)", fontVariantNumeric: "tabular-nums" }}
                >
                  {value}
                </div>
                <div
                  className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] tracking-[0.14em] uppercase"
                  style={{ color: "var(--color-muted-hm)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — photo */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.64, ease, delay: 0.18 }}
          className="flex justify-center lg:justify-end"
        >
          <div
            className="relative"
            style={{ width: "clamp(260px, 36vw, 400px)", aspectRatio: "1 / 1" }}
          >
            <div
              className="absolute -top-3 -left-3 w-6 h-6"
              style={{ backgroundColor: "var(--color-coral)", borderRadius: "var(--radius-sm)" }}
            />
            <div
              className="absolute -bottom-3 -right-3 w-3 h-3"
              style={{ backgroundColor: "var(--color-ink)", borderRadius: "var(--radius-sm)" }}
            />
            <div
              className="w-full h-full overflow-hidden"
              style={{ borderRadius: "var(--radius-lg)", border: "1px solid var(--color-rule)" }}
            >
              <Image
                src="/profile.png"
                alt="Syed Osman"
                width={400}
                height={400}
                className="object-cover object-top w-full h-full scale-105"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
