"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ_MOBILE, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

export interface UseImageRevealOptions {
  /** Parallax vertical en px al scrollear (desactivado en mobile/reduced-motion). */
  parallax?: number;
  start?: string;
  duration?: number;
  ease?: string;
  scaleFrom?: number;
}

/**
 * Reveal por máscara (clip-path inset) + scale leve al entrar en viewport,
 * con parallax opcional por scrub. El contenedor necesita overflow-hidden;
 * este hook anima un wrapper interno para no romper el propio clip-path del reveal.
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseImageRevealOptions = {}
) {
  const wrapperRef = useRef<T | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const { parallax = 0, start = "top 88%", duration = 1.2, ease = "buttery", scaleFrom = 1.15 } = options;

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const media = mediaRef.current;
      if (!wrapper || !media) return;

      const mm = gsap.matchMedia();

      mm.add({ reduced: MQ_REDUCED_MOTION, mobile: MQ_MOBILE }, (context) => {
        const { reduced, mobile } = context.conditions as { reduced: boolean; mobile: boolean };

        if (reduced) {
          gsap.set(wrapper, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(media, { scale: 1, y: 0 });
          return;
        }

        gsap.set(wrapper, { clipPath: "inset(8% 8% 8% 8%)" });
        gsap.set(media, { scale: scaleFrom });

        const reveal = gsap.timeline({
          scrollTrigger: { trigger: wrapper, start, once: true },
        });

        reveal.to(wrapper, { clipPath: "inset(0% 0% 0% 0%)", duration, ease }).to(
          media,
          { scale: 1, duration: duration * 1.2, ease },
          "<"
        );

        let parallaxTween: gsap.core.Tween | undefined;
        if (parallax && !mobile) {
          parallaxTween = gsap.fromTo(
            media,
            { y: -parallax },
            {
              y: parallax,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        return () => {
          reveal.kill();
          parallaxTween?.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: wrapperRef }
  );

  return { wrapperRef, mediaRef };
}
