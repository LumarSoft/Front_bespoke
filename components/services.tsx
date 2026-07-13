"use client";

import { motion } from "motion/react";
import { services } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/reveal";

export default function Services() {
  return (
    <section
      id="enfoque"
      className="relative bg-ink px-5 py-28 text-paper sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <span className="eyebrow text-clay-soft">Cómo trabajamos</span>
            </Reveal>
            <RevealText
              as="h2"
              text="Un proceso, cuatro cuidados."
              className="mt-4 max-w-2xl font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] text-paper sm:text-6xl"
              delay={0.05}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-paper/60">
              Del diagnóstico a la certificación, acompañamos cada etapa del
              ciclo de vida de la obra.
            </p>
          </Reveal>
        </div>

        <ul className="border-t border-white/10">
          {services.map((s) => (
            <li key={s.id}>
              <motion.div
                className="group relative grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-b border-white/10 py-8 transition-colors sm:grid-cols-[5rem_1fr_1.2fr] sm:gap-x-8 sm:py-10"
              >
                <span className="font-mono text-sm text-paper/40 transition-colors group-hover:text-clay-soft">
                  {s.id}
                </span>
                <motion.h3
                  className="font-display text-3xl font-light tracking-tight transition-transform duration-500 ease-out sm:text-5xl sm:group-hover:translate-x-3"
                >
                  {s.title}
                </motion.h3>
                <p className="col-span-2 mt-3 max-w-md text-sm leading-relaxed text-paper/55 sm:col-span-1 sm:mt-0">
                  {s.desc}
                </p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
