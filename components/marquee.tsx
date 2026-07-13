"use client";

import { motion, useScroll, useTransform, useVelocity, useSpring } from "motion/react";
import { useRef } from "react";

const WORDS = [
  "Diseño a medida",
  "Dirección de obra",
  "Detalle",
  "Hormigón",
  "Paisaje",
  "Gestión",
];

/**
 * Marquee tipográfico infinito. La velocidad reacciona al scroll:
 * al hacer scroll fuerte, el texto acelera (skew sutil incluido).
 */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 2000], [-4, 4], {
    clamp: false,
  });
  const skew = useTransform(velocityFactor, [-4, 4], [-4, 4], { clamp: true });

  return (
    <div
      ref={ref}
      className="relative flex items-center overflow-hidden border-y border-ink/10 bg-bone py-6"
    >
      <motion.div
        style={{ skewX: skew }}
        className="flex shrink-0 whitespace-nowrap"
      >
        {[0, 1].map((dup) => (
          <motion.div
            key={dup}
            aria-hidden={dup === 1}
            className="flex shrink-0 items-center"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {WORDS.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="px-8 font-display text-4xl font-light tracking-tight text-ink sm:text-5xl">
                  {w}
                </span>
                <span className="text-2xl text-clay">✳</span>
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
