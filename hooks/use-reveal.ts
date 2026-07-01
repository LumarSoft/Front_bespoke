"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface UseRevealResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  inView: boolean;
}

/**
 * Adds a scroll-reveal trigger to any element.
 * Returns a ref to attach and a boolean that flips true once the element
 * enters the viewport. Respects prefers-reduced-motion by revealing instantly.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {},
): UseRevealResult<T> {
  const { threshold = 0.18, rootMargin = "0px 0px -8% 0px", once = true } =
    options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Note: users with prefers-reduced-motion still see all content because
    // globals.css forces the revealed state under that media query — so there
    // is no need to flip state synchronously here.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}
