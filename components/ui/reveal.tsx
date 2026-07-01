"use client";

import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Extra delay in ms, applied as an inline transition-delay. */
  delay?: number;
  /** Use the clip-path heading variant instead of the default fade-up. */
  variant?: "fade" | "clip";
}

/**
 * Wrapper that fades/reveals its children when scrolled into view.
 * Pure presentation — the observer logic lives in useReveal.
 */
export function Reveal({
  children,
  as,
  className = "",
  delay = 0,
  variant = "fade",
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, inView } = useReveal<HTMLElement>();
  const base = variant === "clip" ? "reveal-clip" : "reveal";

  return (
    <Tag
      ref={ref}
      className={`${base} ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
