"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { services } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/reveal";

const PREVIEWS = [
  "/projects/facade-glass.jpg",
  "/projects/stair.jpg",
  "/projects/aerial-field.jpg",
  "/projects/hearth.jpg",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  // Imagen flotante que sigue el cursor (solo desktop).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 350, damping: 40 });
  const y = useSpring(my, { stiffness: 350, damping: 40 });

  return (
    <section
      id="enfoque"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
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
          {services.map((s, i) => (
            <li key={s.id}>
              <motion.div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
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

      {/* Preview flotante */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-30 hidden h-56 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl md:block"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Image
              src={PREVIEWS[hovered % PREVIEWS.length]}
              alt=""
              fill
              sizes="288px"
              className="object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
