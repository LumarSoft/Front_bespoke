"use client";

import { useRef } from "react";
import Image from "next/image";
import DraftingFrame from "@/components/ui/DraftingFrame";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionPrefs";

const FOOTER_LINKS = [
  { href: "#estudio", label: "Estudio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portfolio", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
  { href: "#top", label: "Volver arriba" },
];

/** Cierre calmo: logo real grande y estático (reveal on-enter, sin marquee) + nav + copyright. */
export default function Footer() {
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = logoWrapRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { autoAlpha: 1, clipPath: "inset(0% 0 0 0)" });
      return;
    }

    gsap.set(el, { autoAlpha: 0, clipPath: "inset(0 0 100% 0)" });
    const tween = gsap.to(el, {
      autoAlpha: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 1.1,
      ease: "buttery",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });

    return () => tween.kill();
  }, []);

  return (
    <footer className="relative overflow-hidden bg-noir px-6 py-24 text-hueso md:px-10">
      <div className="blueprint-grid--dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <DraftingFrame label="07 / BESPOKE" dark />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-14 text-center">
        <div ref={logoWrapRef} className="w-full max-w-xl px-6">
          <Image
            src="/logo-2048x870.png"
            alt="Bespoke Arquitectura"
            width={2048}
            height={870}
            className="h-auto w-full"
          />
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-sans text-sm text-hueso/70">
          {FOOTER_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link" data-cursor-hover>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-6xl flex-col gap-4 border-t border-hueso/15 pt-8 font-sans text-xs text-hueso/50 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Bespoke Arquitectura. Todos los derechos reservados.</span>
        <a href="mailto:hola@bespoke.arq" className="nav-link" data-cursor-hover>
          hola@bespoke.arq
        </a>
      </div>
    </footer>
  );
}
