"use client";

import type { ButtonHTMLAttributes } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function MagneticButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.4 });

  return (
    <button
      ref={ref}
      data-cursor-hover
      className={`inline-flex items-center justify-center rounded-full bg-acento px-8 py-4 font-sans text-sm tracking-wide text-hueso transition-colors hover:bg-acento-soft ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
