"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 pb-16 overflow-hidden bg-white"
    >
      {/* Decorative blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-coral opacity-[0.06] pointer-events-none"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute bottom-[-60px] left-[15%] w-[280px] h-[280px] rounded-full bg-teal opacity-[0.08] pointer-events-none"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.35em] uppercase text-neutral-400 mb-4"
        >
          — Full Stack · AI Engineer
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl md:text-8xl font-black tracking-tightest text-ink leading-[1.0] mb-2"
        >
          Syed Osman
        </motion.h1>

        <motion.div variants={fadeInUp} className="mb-6">
          <span className="text-3xl md:text-5xl font-black tracking-tighter text-ink leading-[1.1]">
            I build software{" "}
          </span>
          <span className="text-3xl md:text-5xl font-black tracking-tighter text-coral italic leading-[1.1]">
            that builds software.
          </span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-sm text-neutral-500 leading-relaxed max-w-md border-l-[3px] border-coral pl-4 mb-8"
        >
          Full-stack developer since Dec 2022. Currently building AI-powered
          platforms that turn ideas into production software — no manual coding
          required.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex gap-4 items-center flex-wrap">
          <a
            href="#projects"
            className="bg-ink text-white px-6 py-3 text-xs font-bold tracking-[0.1em] uppercase rounded hover:bg-neutral-800 transition-colors duration-200"
          >
            View Work ↓
          </a>
          <a
            href="#contact"
            className="text-ink text-sm font-semibold underline underline-offset-4 hover:text-coral transition-colors duration-200"
          >
            Let&apos;s talk →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-300">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-6 bg-gradient-to-b from-neutral-300 to-transparent"
        />
      </motion.div>
    </section>
  );
}
