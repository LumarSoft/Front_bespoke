"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Aparición suave (fade + slide) al entrar en viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Revelado de titular palabra por palabra, con máscara vertical.
 * `as` permite elegir el tag (h1, h2, p...).
 */
export function RevealText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const words = text.split(" ");

  const inner = words.map((word, i) => (
    <span key={i} className="mr-[0.28em] inline-block overflow-hidden py-[0.06em]">
      <motion.span
        aria-hidden
        className={cn("inline-block", wordClassName)}
        initial={{ y: "110%" }}
        animate={inView ? { y: 0 } : { y: "110%" }}
        transition={{
          duration: 0.85,
          ease: EASE,
          delay: delay + i * stagger,
        }}
      >
        {word}
      </motion.span>
    </span>
  ));

  const classes = cn("flex flex-wrap", className);

  switch (as) {
    case "h1":
      return <h1 ref={ref} className={classes} aria-label={text}>{inner}</h1>;
    case "h3":
      return <h3 ref={ref} className={classes} aria-label={text}>{inner}</h3>;
    case "p":
      return <p ref={ref} className={classes} aria-label={text}>{inner}</p>;
    case "span":
      return <span ref={ref} className={classes} aria-label={text}>{inner}</span>;
    default:
      return <h2 ref={ref} className={classes} aria-label={text}>{inner}</h2>;
  }
}
