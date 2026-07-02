"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionPrefs";

/**
 * Hero oscuro: el logo real (blanco) necesita fondo oscuro para tener
 * contraste, así que esta es la única sección que deja ver la capa WebGL de
 * fondo (noir + grano, ver WebGLCanvas). El resto del sitio es hueso/claro.
 */
export default function Hero() {
  const eyebrowRef = useSplitReveal<HTMLParagraphElement>({ type: "lines", y: 20 });
  const subRef = useSplitReveal<HTMLParagraphElement>({ type: "words", y: 16, stagger: 0.02 });
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!logoWrapRef.current) return;

    if (prefersReducedMotion()) {
      gsap.set(logoWrapRef.current, { autoAlpha: 1, clipPath: "inset(0 0% 0 0)" });
      return;
    }

    gsap.set(logoWrapRef.current, { autoAlpha: 0, clipPath: "inset(0 100% 0 0)" });
    const tween = gsap.to(logoWrapRef.current, {
      autoAlpha: 1,
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "buttery",
      delay: 0.2,
    });

    return () => tween.kill();
  }, []);

  useGSAP(() => {
    if (!indicatorRef.current || prefersReducedMotion()) return;
    const tween = gsap.to(indicatorRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.3,
      ease: "sine.inOut",
    });
    return () => tween.kill();
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-36 pb-14 text-hueso md:px-10"
    >
      <div className="blueprint-grid--dark pointer-events-none absolute inset-0" aria-hidden="true" />

      <p
        ref={eyebrowRef}
        aria-label="Estudio de arquitectura"
        className="relative mx-auto font-sans text-xs uppercase tracking-[0.4em] text-hueso/70"
      >
        Estudio de arquitectura
      </p>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <div ref={logoWrapRef} className="w-full max-w-3xl px-6">
          <Image
            src="/logo-2048x870.png"
            alt="Bespoke Arquitectura"
            width={2048}
            height={870}
            priority
            className="h-auto w-full"
          />
        </div>
        <p
          ref={subRef}
          aria-label="Cada detalle, una decisión de diseño."
          className="mt-10 max-w-xl font-sans text-lg text-hueso/75 md:text-xl"
        >
          Cada detalle, una decisión de diseño.
        </p>
      </div>

      <div
        ref={indicatorRef}
        className="relative mx-auto flex flex-col items-center gap-3 font-sans text-[0.65rem] uppercase tracking-[0.35em] text-hueso/60"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-hueso/40" />
      </div>
    </section>
  );
}
