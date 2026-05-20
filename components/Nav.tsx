"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "Work", href: "#projects" },
  { label: "Writing", href: "#blog" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - lastY;
    if (current < 60) {
      setVisible(true);
    } else if (diff > 6) {
      setVisible(false);
    } else if (diff < -6) {
      setVisible(true);
    }
    setLastY(current);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -72, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ zIndex: "var(--z-sticky)" }}
          className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-6 px-5 py-2.5 rounded-[var(--radius-pill)] border border-[var(--color-rule)] bg-[var(--color-paper)]/80 backdrop-blur-md backdrop-saturate-150 shadow-[0_1px_3px_oklch(13%_0.012_250/0.08)]"
        >
          <a
            href="#"
            className="font-[family-name:var(--font-display)] font-semibold italic text-[var(--color-ink)] text-lg leading-none tracking-tight hover:text-[var(--color-coral)] transition-colors duration-[var(--dur-short)]"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            SO.
          </a>

          <div className="w-px h-4 bg-[var(--color-rule)]" />

          <div className="flex items-center gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[var(--text-sm)] font-medium text-[var(--color-ink-2)] hover:text-[var(--color-ink)] transition-colors duration-[var(--dur-short)]"
                style={{ transitionTimingFunction: "var(--ease-out)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-px h-4 bg-[var(--color-rule)]" />

          <a
            href="#contact"
            className="text-[var(--text-sm)] font-semibold text-[var(--color-coral)] hover:text-[var(--color-coral-dim)] transition-colors duration-[var(--dur-short)] whitespace-nowrap"
            style={{ transitionTimingFunction: "var(--ease-out)" }}
          >
            Contact →
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
