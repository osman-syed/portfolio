"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

const GITHUB_URL = "https://github.com/YOUR_GITHUB";
const LINKEDIN_URL = "https://linkedin.com/in/YOUR_LINKEDIN";
const EMAIL = "syed.osman@yottatechports.com";

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-8 md:px-16 lg:px-24 py-32 bg-ink relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-coral opacity-[0.05] pointer-events-none blur-3xl" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-600 mb-6"
        >
          08 — Contact
        </motion.p>

        <motion.h2 variants={fadeInUp} className="text-5xl md:text-6xl font-black tracking-tightest text-white mb-4">
          Let&apos;s build{" "}
          <span className="text-coral italic">something.</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-neutral-400 text-sm mb-10">
          Open to roles, contracts, and interesting problems.
        </motion.p>

        <motion.div variants={staggerContainer} className="flex justify-center gap-4 flex-wrap">
          <motion.a
            variants={fadeInUp}
            href={`mailto:${EMAIL}`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-coral text-white px-8 py-3 rounded text-sm font-bold tracking-wide hover:bg-[#e85555] transition-colors duration-200"
          >
            Send a message
          </motion.a>
          <motion.a
            variants={fadeInUp}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-white/20 transition-colors duration-200"
          >
            GitHub
          </motion.a>
          <motion.a
            variants={fadeInUp}
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-white/10 text-white px-8 py-3 rounded text-sm font-semibold hover:bg-white/20 transition-colors duration-200"
          >
            LinkedIn
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
