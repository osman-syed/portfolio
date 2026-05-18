"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const links = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const diff = current - lastY;
    if (current < 80) {
      setVisible(true);
    } else if (diff > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastY(current);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-[3px] left-0 right-0 z-50 px-8 py-4 flex justify-between items-center bg-white/90 backdrop-blur-sm border-b border-black/5"
        >
          <a
            href="#"
            className="font-black text-lg tracking-tightest text-ink hover:text-coral transition-colors duration-200"
          >
            SO.
          </a>
          <div className="flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-neutral-400 hover:text-ink transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
