"use client";

import Image from "next/image";
import { useImageReveal } from "@/hooks/useImageReveal";

export interface RevealImageProps {
  /** Ruta real en /public/images. Si se omite, se muestra un contenedor rayado placeholder. */
  src?: string;
  alt: string;
  /** Aspect-ratio CSS, ej "4 / 5", "16 / 9". */
  ratio?: string;
  /** Texto TODO mostrado dentro del placeholder (nombre de archivo esperado, etc). */
  label?: string;
  priority?: boolean;
  /** Desplazamiento de parallax en px (0 = desactivado). */
  parallax?: number;
  className?: string;
  dark?: boolean;
  sizes?: string;
}

/**
 * Imagen con reveal por máscara (clip-path) + scale leve al entrar en viewport
 * y parallax opcional. Sin `src`, renderiza un contenedor rayado con el nombre
 * de archivo esperado — reemplazar por la foto real en /public/images.
 */
export default function RevealImage({
  src,
  alt,
  ratio = "4 / 5",
  label,
  priority,
  parallax = 0,
  className = "",
  dark = false,
  sizes = "100vw",
}: RevealImageProps) {
  const { wrapperRef, mediaRef } = useImageReveal({ parallax });

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div ref={mediaRef} className="absolute inset-0 h-full w-full">
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <div
            className={`img-placeholder${dark ? " img-placeholder--dark" : ""} flex h-full w-full items-end p-4`}
            role="img"
            aria-label={alt}
          >
            <span className="img-placeholder__label text-gris-calido-oscuro">
              {label ?? `TODO imagen: ${alt}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
