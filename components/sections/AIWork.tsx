"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, viewportOptions } from "@/lib/animations";

const features = [
  { label: "AI Core", value: "Multi-agent orchestration" },
  { label: "Memory", value: "RAG + Knowledge graph" },
  { label: "Infra", value: "AWS Serverless + Bedrock" },
];

const tags = ["Claude API", "React 19", "Python", "AWS Lambda", "DynamoDB", "Memgraph"];

export default function AIWork() {
  return (
    <section id="ai-work" className="px-8 md:px-16 lg:px-24 py-24 bg-ink relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-coral opacity-[0.07] pointer-events-none blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-6"
        >
          03 — AI Work
        </motion.p>

        {/* Badge */}
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-coral/10 border border-coral/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-coral shadow-[0_0_6px_#ff6b6b]" />
          <span className="text-coral text-[10px] tracking-[0.2em] uppercase font-medium">
            Featured — 3 months deep
          </span>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-5xl md:text-6xl font-black tracking-tightest text-white mb-4"
        >
          YottaBuilder
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8"
        >
          AI-powered no-code platform. Describe your software in natural language — it generates the
          architecture, DB schema, UI, backend APIs, and test cases. Automatically.
        </motion.p>

        {/* Feature tiles */}
        <motion.div
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {features.map((f) => (
            <motion.div
              key={f.label}
              variants={scaleIn}
              whileHover={{ scale: 1.02, borderColor: "rgba(255,107,107,0.4)" }}
              className="bg-white/5 border border-white/10 rounded-xl p-5 transition-colors duration-200"
            >
              <p className="text-coral text-[10px] tracking-[0.2em] uppercase mb-2">{f.label}</p>
              <p className="text-white text-sm">{f.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech tags */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-coral/15 text-coral text-xs px-3 py-1.5 rounded"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
