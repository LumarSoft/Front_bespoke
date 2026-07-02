"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ_MOBILE, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

type ClipTextTag = "div" | "span" | "h1" | "h2" | "h3" | "p";

export interface ClipTextProps {
  children: string;
  as?: ClipTextTag;
  /** Ruta real de imagen/video-poster para el knockout text. Sin ella, usa el patrón rayado placeholder. */
  src?: string;
  className?: string;
  /** Parallax de la imagen dentro de las letras al scrollear (requiere src). */
  parallax?: boolean;
}

/**
 * Titular "knockout": el fondo (imagen real o placeholder rayado) se ve a
 * través del texto vía background-clip:text. Con `src` + `parallax`, la imagen
 * se desplaza dentro de las letras ligada al scroll.
 */
export default function ClipText({
  children,
  as: Tag = "div",
  src,
  className = "",
  parallax = true,
}: ClipTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !src || !parallax) return;

      const mm = gsap.matchMedia();
      mm.add({ reduced: MQ_REDUCED_MOTION, mobile: MQ_MOBILE }, (context) => {
        const { reduced, mobile } = context.conditions as { reduced: boolean; mobile: boolean };
        if (reduced || mobile) return;

        const tween = gsap.fromTo(
          el,
          { backgroundPosition: "50% 35%" },
          {
            backgroundPosition: "50% 65%",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: ref, dependencies: [src, parallax] }
  );

  const style: React.CSSProperties | undefined = src
    ? { backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }
    : undefined;

  // Tag es un set fijo de elementos nativos (todos forwardean ref/className/style
  // de la misma forma); el cast evita que TS arme el enorme union type de JSX.IntrinsicElements.
  const Component = Tag as "div";

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement>}
      className={`clip-text ${src ? "" : "clip-text--placeholder"} ${className}`}
      style={style}
      aria-label={children}
    >
      {children}
    </Component>
  );
}
