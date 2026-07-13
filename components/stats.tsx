"use client";

import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { stats } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export default function Stats() {
  return (
    <section className="bg-bone px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col">
              <Counter
                value={s.value}
                suffix={s.suffix}
                decimals={s.value % 1 !== 0 ? 1 : 0}
                plain={s.plain}
              />
              <span className="mt-3 max-w-[12rem] text-sm text-ink-soft">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Counter({
  value,
  suffix,
  decimals,
  plain,
}: {
  value: number;
  suffix: string;
  decimals: number;
  plain?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    plain
      ? String(Math.round(v))
      : v.toLocaleString("es-AR", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }),
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <span
      ref={ref}
      className="flex items-baseline font-display text-6xl font-light tracking-tight text-ink sm:text-7xl"
    >
      <motion.span>{rounded}</motion.span>
      <span className="text-clay">{suffix}</span>
    </span>
  );
}
