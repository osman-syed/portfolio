"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, slideInLeft, viewportOptions } from "@/lib/animations";
import { projects } from "@/data/content";

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 lg:px-24 py-24 bg-white">
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
          04 — Projects
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-black tracking-tightest text-ink mb-12"
        >
          Things I&apos;ve{" "}
          <span className="text-coral italic">actually shipped.</span>
        </motion.h2>

        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={slideInLeft}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-neutral-200 rounded-xl p-8 group"
              style={{ borderLeftWidth: 4, borderLeftColor: project.accentColor }}
            >
              <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                <div>
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-2 font-medium"
                    style={{ color: project.accentColor }}
                  >
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight text-ink">
                    {project.name}
                  </h3>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink text-white text-xs px-4 py-2 rounded font-semibold hover:bg-neutral-800 transition-colors duration-200 whitespace-nowrap"
                >
                  {project.url.replace("https://", "").replace("www.", "")} ↗
                </a>
              </div>

              <p className="text-neutral-500 text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              <ul className="flex flex-col gap-2 mb-6">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-3 text-sm text-neutral-600">
                    <span style={{ color: project.accentColor }} className="mt-0.5 shrink-0">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-3 py-1.5 rounded border font-medium"
                    style={{
                      backgroundColor: project.accentColor + "15",
                      color: project.accentColor,
                      borderColor: project.accentColor + "40",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
