"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Video de fondo en reproducción continua.
 *
 * Reemplaza al scrub por scroll que había antes (seek de `currentTime` atado
 * al progreso): ese patrón obligaba a reservar 300–400vh de alto muerto y a
 * pinnear la sección, que es exactamente lo que hacía sentir el scroll
 * "trancado". Acá el video corre solo y el scroll queda libre.
 *
 * - `priority` carga de entrada (hero). Sin él, el video sólo empieza a bajar
 *   cuando la sección se acerca al viewport, para no competir con el LCP.
 * - Con `prefers-reduced-motion` no se reproduce: queda el póster fijo.
 */
export default function BackgroundVideo({
  src,
  poster,
  objectPosition = "50% 50%",
  priority = false,
  className,
}: {
  src: string;
  poster?: string;
  objectPosition?: string;
  priority?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    if (priority) {
      video.play().catch(() => {
        /* autoplay bloqueado: queda el póster */
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { rootMargin: "300px 0px" },
    );

    io.observe(video);
    return () => io.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster || undefined}
      muted
      loop
      playsInline
      autoPlay={priority}
      preload={priority ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      style={{ objectPosition }}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
