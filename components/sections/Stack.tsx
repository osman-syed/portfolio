"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerContainerFast, viewportOptions } from "@/lib/animations";
import { stackItems, stackCategoryStyles } from "@/data/content";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  ai: "AI / LLM",
  backend: "Backend",
  infra: "Infra",
};

export default function Stack() {
  return (
    <section id="stack" className="px-8 md:px-16 lg:px-24 py-24 bg-paper">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
        >
          05 — Stack
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          Tools I reach for.
        </motion.h2>

        <motion.div variants={staggerContainerFast} className="flex flex-wrap gap-3">
          {stackItems.map((item) => {
            const style = stackCategoryStyles[item.category];
            return (
              <motion.span
                key={item.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.08, y: -2 }}
                className="text-sm px-4 py-2 rounded font-semibold cursor-default"
                style={{
                  backgroundColor: style.bg,
                  color: style.text,
                  border: `1px solid ${style.border}`,
                }}
              >
                {item.name}
              </motion.span>
            );
          })}
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
          {Object.entries(categoryLabels).map(([key, label]) => {
            const style = stackCategoryStyles[key as keyof typeof stackCategoryStyles];
            return (
              <div key={key} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: style.bg, border: `1px solid ${style.border}` }}
                />
                <span className="text-[10px] text-neutral-400 uppercase tracking-[0.15em]">
                  {label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
