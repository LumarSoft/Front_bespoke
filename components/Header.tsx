"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motionPrefs";

const NAV_LINKS = [
  { href: "#estudio", label: "Estudio" },
  { href: "#obra", label: "Obra" },
  { href: "#servicios", label: "Servicios" },
  { href: "#portfolio", label: "Proyectos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

/**
 * Header fijo con fondo oscuro constante (para que el wordmark blanco siempre
 * se lea, sin depender de qué sección haya detrás). Solo el logo escala al
 * scrollear (transform, nunca layout) para el efecto grande→chico.
 */
export default function Header() {
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!logoRef.current || prefersReducedMotion()) return;

    const tween = gsap.to(logoRef.current, {
      scale: 0.62,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: { start: 0, end: 320, scrub: true },
    });

    return () => tween.kill();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 bg-noir/85 px-6 py-4 backdrop-blur-sm md:px-10">
      <a href="#top" className="shrink-0" data-cursor-hover>
        <div ref={logoRef}>
          <Image
            src="/logo-2048x870.png"
            alt="Bespoke Arquitectura"
            width={2048}
            height={870}
            priority
            className="h-10 w-auto md:h-12"
          />
        </div>
      </a>
      <nav className="hidden gap-8 text-sm tracking-wide text-hueso/90 md:flex">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="nav-link" data-cursor-hover>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
