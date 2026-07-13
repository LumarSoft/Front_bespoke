"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { MQ_MOBILE, MQ_REDUCED_MOTION } from "@/lib/motionPrefs";

const Scene = dynamic(() => import("@/components/webgl/Scene"), { ssr: false });

/**
 * Capa WebGL de fondo, absoluta al contenedor que la monta (el padre debe ser
 * `relative overflow-hidden`) — así queda contenida en esa sección y no se
 * filtra en los huecos del resto de la página.
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
    <div className="absolute inset-0 z-0 bg-noir pointer-events-none" aria-hidden="true">
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
