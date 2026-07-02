"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { manifesto, studio } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

/**
 * Manifiesto: el texto grande se "ilumina" palabra por palabra a medida
 * que la sección atraviesa el viewport (scroll-linked opacity).
 */
export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <section id="estudio" className="relative bg-bone px-5 py-28 sm:px-8 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-14 flex items-center gap-4">
            <span className="eyebrow text-clay">{manifesto.eyebrow}</span>
            <span className="h-px flex-1 bg-ink/15" />
            <span className="text-sm text-ink-soft">
              {studio.name}™ · desde {studio.since}
            </span>
          </div>
        </Reveal>

        <div ref={ref}>
          <p className="flex flex-wrap font-display text-4xl font-light leading-[1.12] tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.6rem]">
            {manifesto.lines.map((line, li) => {
              // índice acumulado de palabras para el degradado de opacidad
              const before = manifesto.lines
                .slice(0, li)
                .reduce((n, l) => n + l.split(" ").length, 0);
              const total = manifesto.lines.reduce(
                (n, l) => n + l.split(" ").length,
                0,
              );
              return (
                <span key={li} className="block w-full">
                  {line.split(" ").map((word, wi) => {
                    const idx = before + wi;
                    const start = idx / total;
                    const end = start + 1 / total;
                    return (
                      <WordFade
                        key={wi}
                        progress={scrollYProgress}
                        range={[start, end]}
                      >
                        {word}
                      </WordFade>
                    );
                  })}
                </span>
              );
            })}
          </p>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
            <p className="font-display text-xl italic text-ink-soft">
              “Los detalles no son decoración: son decisiones de proyecto.”
            </p>
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              {manifesto.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WordFade({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  );
}
