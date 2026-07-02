"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionPrefs";

const SESSION_KEY = "bespoke-preloader-seen";

/**
 * Solo en la primera carga de la sesión: contador 0→100, logo con reveal por
 * máscara y curtain que sube revelando el hero. ScrollTrigger.refresh() se
 * llama recién cuando termina, para que los triggers midan el layout final.
 */
export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY) === "1";
    const reduced = prefersReducedMotion();

    if (alreadySeen || reduced) {
      setHidden(true);
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "hidden";

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setHidden(true);
        ScrollTrigger.refresh();
      },
    });

    gsap.set(logoRef.current, { clipPath: "inset(0 100% 0 0)" });

    tl.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.value));
      },
    })
      .to(logoRef.current, { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "buttery" }, "-=1.4")
      .to(rootRef.current, { yPercent: -100, duration: 1, ease: "buttery" }, "+=0.2");

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Cargando Bespoke"
      className="fixed inset-0 z-[9998] flex will-change-transform flex-col items-center justify-center gap-6 bg-noir"
    >
      <div ref={logoRef} className="overflow-hidden">
        <Image
          src="/logo-2048x870.png"
          alt="Bespoke Arquitectura"
          width={2048}
          height={870}
          priority
          className="h-10 w-auto md:h-12"
        />
      </div>
      <span ref={counterRef} className="font-sans text-sm tabular-nums text-gris-calido">
        0
      </span>
    </div>
  );
}
