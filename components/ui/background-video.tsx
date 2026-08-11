"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Video de fondo en reproducción continua.
 *
 * Reemplaza al scrub por scroll que había antes (seek de `currentTime` atado
 * al progreso): ese patrón obligaba a reservar 300–400vh de alto muerto y a
 * pinnear la sección, que es exactamente lo que hacía sentir el scroll
 * "trancado". Acá el video corre solo y el scroll queda libre.
 *
 * ── Cuándo se descarga ───────────────────────────────────────────────────────
 * Nunca antes de que la página haya terminado de cargar. Medido con Lighthouse
 * en mobile con 4G simulado: con el video bajando de entrada, el LCP se iba a
 * 5,9 s, porque el hero se lleva megabytes de ancho de banda mientras el
 * navegador todavía está pidiendo la imagen que define el LCP. Como el póster
 * ES el primer fotograma del video, el visitante no ve ninguna transición: ve
 * la imagen fija y después la misma imagen en movimiento.
 *
 *   · `priority` (hero)  → espera el evento `load` de la ventana.
 *   · el resto           → espera a estar cerca del viewport.
 *
 * Y no se descarga nunca si el visitante pidió menos movimiento o tiene el
 * ahorro de datos activado: en esos casos queda el póster, que es una imagen
 * legítima de la obra y no un placeholder.
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
  /** Mientras sea false, el <video> no tiene `src`: no hay pedido de red. */
  const [descargar, setDescargar] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Ahorro de datos y conexiones muy lentas: se queda el póster.
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return;
    if (conn?.effectiveType && /(^|-)(slow-)?2g$/.test(conn.effectiveType)) return;

    if (priority) {
      const alCargar = () => setDescargar(true);
      // Si la página ya terminó de cargar (navegación cliente, o el efecto
      // corrió tarde), se difiere un frame en lugar de llamar a setState en el
      // cuerpo del efecto, que encadena renders.
      if (document.readyState === "complete") {
        const frame = requestAnimationFrame(alCargar);
        return () => cancelAnimationFrame(frame);
      }
      window.addEventListener("load", alCargar, { once: true });
      return () => window.removeEventListener("load", alCargar);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDescargar(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [priority]);

  // Reproducir cuando ya hay algo que reproducir, y pausar fuera de pantalla
  // (un video corriendo detrás de la pantalla gasta batería sin que nadie lo vea).
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !descargar) return;

    video.play().catch(() => {
      /* autoplay bloqueado: queda el póster */
    });

    if (priority) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [descargar, priority]);

  return (
    <video
      ref={videoRef}
      // Sin `src` no hay pedido de red. Se agrega cuando corresponde.
      {...(descargar ? { src } : {})}
      /*
        El póster del hero se muestra de entrada porque es la primera imagen que
        se ve. En las secciones de abajo se pide junto con el video: un póster
        que nadie va a ver todavía son ~90 KB peleando con el LCP.
      */
      poster={(priority || descargar) && poster ? poster : undefined}
      muted
      loop
      playsInline
      preload={descargar ? "auto" : "none"}
      aria-hidden="true"
      tabIndex={-1}
      style={{ objectPosition }}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
