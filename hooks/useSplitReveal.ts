"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { MQ_MOBILE, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

type SplitType = "lines" | "words" | "chars";

export interface UseSplitRevealOptions {
  /** Unidad que se anima: línea, palabra o carácter. */
  type?: SplitType;
  /** number = scrub ligado al scroll; true = scrub automático; false/undefined = reveal on-enter. */
  scrub?: boolean | number;
  start?: string;
  stagger?: number;
  y?: number | string;
  /** Opacidad inicial antes del reveal (spec pide 0.1→1 en el scrub de "palabra mágica"). */
  fromOpacity?: number;
  duration?: number;
  ease?: string;
}

/**
 * Split + reveal accesible ligado al scroll. Guarda el texto original en
 * aria-label del contenedor y marca las unidades generadas aria-hidden.
 * Respeta prefers-reduced-motion (muestra todo sin animar) y re-splitea en
 * resize vía SplitText autoSplit.
 */
export function useSplitReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseSplitRevealOptions = {}
) {
  const ref = useRef<T | null>(null);
  const {
    type = "lines",
    scrub = false,
    start = "top 85%",
    stagger = 0.06,
    y = "100%",
    fromOpacity = 0,
    duration = 1,
    ease = "buttery",
  } = options;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const label = el.getAttribute("aria-label") ?? el.textContent ?? "";
      el.setAttribute("aria-label", label);

      const mm = gsap.matchMedia();

      mm.add(
        { reduced: MQ_REDUCED_MOTION, mobile: MQ_MOBILE },
        (context) => {
          const { reduced, mobile } = context.conditions as { reduced: boolean; mobile: boolean };

          const split = SplitText.create(el, {
            type,
            mask: type === "lines" ? "lines" : undefined,
            autoSplit: true,
            aria: "hidden",
          });

          if (reduced) {
            gsap.set(split[type], { autoAlpha: 1, y: 0 });
            return () => split.revert();
          }

          const targets = split[type];
          gsap.set(targets, { autoAlpha: fromOpacity, y });

          const tween = gsap.to(targets, {
            autoAlpha: 1,
            y: 0,
            duration: mobile ? duration * 0.7 : duration,
            ease,
            stagger: mobile ? stagger * 0.6 : stagger,
            scrollTrigger: {
              trigger: el,
              start,
              scrub,
              once: !scrub,
            },
          });

          return () => {
            tween.kill();
            split.revert();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: ref }
  );

  return ref;
}
