"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isTouchDevice, prefersReducedMotion } from "@/lib/motionPrefs";

const HOVER_SELECTOR = "a, button, [data-cursor-hover]";

/** Cursor circular con lag, se agranda sobre links/imágenes. Desactivado en touch. */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    if (!dot || isTouchDevice() || prefersReducedMotion()) return;

    const quickX = gsap.quickTo(dot, "x", { duration: 0.35, ease: "buttery" });
    const quickY = gsap.quickTo(dot, "y", { duration: 0.35, ease: "buttery" });

    const onMove = (event: MouseEvent) => {
      quickX(event.clientX);
      quickY(event.clientY);
    };

    const onOver = (event: Event) => {
      if ((event.target as HTMLElement).closest(HOVER_SELECTOR)) {
        gsap.to(dot, { scale: 2.4, duration: 0.3, ease: "buttery" });
      }
    };

    const onOut = (event: Event) => {
      if ((event.target as HTMLElement).closest(HOVER_SELECTOR)) {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "buttery" });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
