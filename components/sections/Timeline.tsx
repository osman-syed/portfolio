"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer, viewportOptions } from "@/lib/animations";
import { timelineEntries } from "@/data/content";

export default function Timeline() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" className="px-8 md:px-16 lg:px-24 py-24 bg-white">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOptions}
        className="max-w-3xl mx-auto"
      >
        <motion.p
          variants={fadeInUp}
          className="text-xs tracking-[0.3em] uppercase text-neutral-400 mb-4"
        >
          06 — Timeline
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          3.5 years.{" "}
          <span className="text-coral italic">One company. All in.</span>
        </motion.h2>

        <div ref={lineRef} className="relative pl-8">
          {/* Animated vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-neutral-100 overflow-hidden">
            <motion.div
              style={{ scaleY: lineScaleY, originY: 0 }}
              className="w-full h-full bg-gradient-to-b from-coral via-teal to-neutral-400"
            />
          </div>

          {timelineEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              variants={fadeInUp}
              className={i < timelineEntries.length - 1 ? "mb-10" : ""}
            >
              {/* Dot */}
              <div
                className="absolute left-0 w-4 h-4 rounded-full ring-4 ring-white"
                style={{ backgroundColor: entry.dotColor, marginTop: "4px" }}
              />

              <div className="pl-4">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-black text-ink text-base">{entry.role}</h3>
                  {entry.isCurrent && (
                    <span className="bg-coral text-white text-[9px] px-2.5 py-0.5 rounded-full tracking-[0.1em] uppercase font-semibold">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  {entry.company} · {entry.period} · {entry.location}
                </p>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {entry.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-2 text-sm text-neutral-500">
                      <span style={{ color: entry.dotColor }} className="mt-0.5 shrink-0">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {entry.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2.5 py-1 rounded border font-medium"
                      style={{
                        backgroundColor: entry.dotColor + "15",
                        color: entry.dotColor === "#888888" ? "#666" : entry.dotColor,
                        borderColor: entry.dotColor + "40",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
