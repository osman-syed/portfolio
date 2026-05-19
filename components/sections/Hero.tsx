"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
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
        className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-8 lg:gap-16 items-center"
      >
        <div>
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-neutral-200 bg-paper">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          <span className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 font-medium">Building YottaBuilder</span>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.35em] uppercase text-neutral-400 mb-4"
        >
          — Full Stack · AI Engineer
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tightest text-ink leading-[1.0] mb-2 whitespace-nowrap"
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

        <motion.div
          variants={fadeInUp}
          className="flex gap-8 pt-6 mt-6 border-t border-neutral-100"
        >
          <div>
            <div className="text-2xl font-black text-ink leading-none mb-1">3.5</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Yrs Exp</div>
          </div>
          <div>
            <div className="text-2xl font-black text-ink leading-none mb-1">3</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Products</div>
          </div>
          <div>
            <div className="text-2xl font-black text-coral leading-none mb-1">AI</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Native</div>
          </div>
          <div>
            <div className="text-2xl font-black text-teal leading-none mb-1">∞</div>
            <div className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Curiosity</div>
          </div>
        </motion.div>
        </div>

        {/* Profile photo */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative w-[320px] h-[320px] lg:w-[440px] lg:h-[440px]">
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-coral/15 pointer-events-none" />
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-teal/20 pointer-events-none" />
            <div className="w-full h-full rounded-full overflow-hidden ring-1 ring-neutral-200 bg-paper">
              <Image
                src="/profile.png"
                alt="Syed Osman"
                width={420}
                height={420}
                className="object-cover object-top w-full h-full scale-110"
                priority
              />
            </div>
          </div>
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
