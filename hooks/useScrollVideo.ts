"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { MQ_DESKTOP, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

export interface UseScrollVideoOptions {
  /** Distancia de scroll pinneada, en "pantallas" (100 = un viewport de alto). */
  scrollLengthVh?: number;
  /** Fracción (0-1) del video mostrada como frame estático en mobile/reduced-motion. */
  stillFrameAt?: number;
}

/**
 * Pinnea un contenedor y scrubea `video.currentTime` según el progreso de
 * scroll — el mismo truco de Apple, con un <video> real en vez de canvas +
 * sprite sheet. En mobile / prefers-reduced-motion no pinnea ni reproduce:
 * muestra un frame fijo (liviano, sin costo de batería/datos).
 */
export function useScrollVideo(options: UseScrollVideoOptions = {}) {
  const { scrollLengthVh = 300, stillFrameAt = 0.6 } = options;
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const mm = gsap.matchMedia();

      mm.add({ isDesktop: MQ_DESKTOP, reduced: MQ_REDUCED_MOTION }, (context) => {
        const { isDesktop, reduced } = context.conditions as { isDesktop: boolean; reduced: boolean };

        if (!isDesktop || reduced) {
          const setStill = () => {
            video.currentTime = (video.duration || 0) * stillFrameAt;
          };
          if (video.readyState >= 1) setStill();
          else video.addEventListener("loadedmetadata", setStill, { once: true });
          return () => video.removeEventListener("loadedmetadata", setStill);
        }

        video.pause();
        let trigger: ScrollTrigger | undefined;

        const setup = () => {
          const duration = video.duration || 0;
          if (!duration) return;

          trigger = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: () => `+=${(scrollLengthVh / 100) * window.innerHeight}`,
            scrub: 0.5,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const target = self.progress * duration;
              // Evita seeks redundantes al mismo frame (cada seek() tiene
              // costo de decode aunque el keyframe esté cerca).
              if (Math.abs(video.currentTime - target) > 0.01) {
                video.currentTime = target;
              }
            },
          });
        };

        if (video.readyState >= 1) setup();
        else video.addEventListener("loadedmetadata", setup, { once: true });

        return () => {
          trigger?.kill();
          video.removeEventListener("loadedmetadata", setup);
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return { containerRef, videoRef };
}
