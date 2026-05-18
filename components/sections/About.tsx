"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = (target / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-3xl font-black text-coral leading-none">
      {count}{suffix}
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="px-8 md:px-16 lg:px-24 py-24 bg-paper"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Left: bio */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
          >
            02 — About
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-black tracking-tightest text-ink mb-6"
          >
            Who I am.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-neutral-500 text-sm leading-relaxed mb-4">
            Started Dec 2022 with zero production experience. Three and a half years later — shipped enterprise analytics platforms, AI document automation, and an AI no-code platform that writes its own code.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-neutral-500 text-sm leading-relaxed">
            Based in Hyderabad. Currently going deep on multi-agent systems, RAG, and production LLM pipelines at Yotta Tech Ports.
          </motion.p>
        </div>

        {/* Right: stat grid */}
        <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
          {/* 3.5 Yrs */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <CountUp target={3.5} />
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Yrs Exp</p>
          </motion.div>

          {/* 3 Products */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <CountUp target={3} />
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Products</p>
          </motion.div>

          {/* AI Native */}
          <motion.div
            variants={fadeInUp}
            className="bg-ink rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-black text-coral leading-none">AI</div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mt-1">Native</p>
          </motion.div>

          {/* Curiosity */}
          <motion.div
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-5 text-center"
          >
            <div className="text-3xl font-black text-teal leading-none">∞</div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-1">Curiosity</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
