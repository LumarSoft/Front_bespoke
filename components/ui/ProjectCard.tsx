"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useState, type MouseEvent } from "react";
import RevealImage from "@/components/ui/RevealImage";

const DistortCard = dynamic(() => import("@/components/webgl/DistortCard"), { ssr: false });

export interface ProjectCardProps {
  title: string;
  category: string;
  alt: string;
  label: string;
  src?: string;
  ratio?: string;
}

/**
 * Card de proyecto: reveal por máscara (vía RevealImage), overlay de hover con
 * título/categoría, y plano WebGL con shader de distorsión que sigue al cursor
 * (se monta solo durante el hover para no acumular contextos WebGL).
 */
export default function ProjectCard({ title, category, alt, label, src, ratio = "4 / 5" }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [active, setActive] = useState(false);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: 1 - (event.clientY - rect.top) / rect.height,
    };
  };

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer overflow-hidden"
      style={{ aspectRatio: ratio }}
      onMouseEnter={() => {
        hoverRef.current = 1;
        setActive(true);
      }}
      onMouseLeave={() => {
        hoverRef.current = 0;
        setActive(false);
      }}
      onMouseMove={handleMove}
      data-cursor-hover
    >
      <RevealImage src={src} alt={alt} label={label} ratio={ratio} className="h-full" />

      {active && (
        <div className="pointer-events-none absolute inset-0">
          <Suspense fallback={null}>
            <DistortCard src={src} hoverRef={hoverRef} mouseRef={mouseRef} />
          </Suspense>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-noir/75 via-noir/0 to-noir/0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="font-display text-xl text-hueso">{title}</span>
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-hueso/70">{category}</span>
      </div>
    </div>
  );
}
