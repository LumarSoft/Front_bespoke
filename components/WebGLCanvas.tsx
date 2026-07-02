"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { MQ_MOBILE, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

const Scene = dynamic(() => import("@/components/webgl/Scene"), { ssr: false });

/**
 * Única capa WebGL del sitio: fixed a pantalla completa, detrás del DOM
 * (z-index bajo, pointer-events none). Lee scrollState (escrito por
 * SmoothScrollProvider) dentro de useFrame; nunca maneja scroll por su cuenta.
 * En mobile o prefers-reduced-motion se reemplaza por un fallback estático.
 */
export default function WebGLCanvas() {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    const mobileQuery = window.matchMedia(MQ_MOBILE);
    const reducedQuery = window.matchMedia(MQ_REDUCED_MOTION);

    const evaluate = () => setMode(mobileQuery.matches || reducedQuery.matches ? "static" : "webgl");

    evaluate();
    mobileQuery.addEventListener("change", evaluate);
    reducedQuery.addEventListener("change", evaluate);
    return () => {
      mobileQuery.removeEventListener("change", evaluate);
      reducedQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return (
    // Sin z-index negativo a propósito: un <body> no posicionado pinta su
    // propio background-color por ENCIMA de cualquier hijo con z negativo
    // (es la capa "in-flow, non-positioned" del root stacking context, que
    // va antes que la capa de posicionados/z:auto). Con z-index:auto acá,
    // este div entra en esa segunda capa junto al resto del contenido
    // posicionado, y el orden en el DOM (este nodo va primero en layout.tsx)
    // alcanza para quedar detrás de #smooth-wrapper.
    <div className="fixed inset-0 bg-noir pointer-events-none" aria-hidden="true">
      {mode === "webgl" && (
        <Suspense fallback={null}>
          <Scene lowPower={false} />
        </Suspense>
      )}
      {mode === "static" && (
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_20%,var(--color-noir-soft),var(--color-noir))]" />
      )}
    </div>
  );
}
