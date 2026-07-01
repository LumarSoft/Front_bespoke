"use client";

import { useEffect, useState } from "react";

const WORD = "BESPOKE";

export function Preloader() {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const exitTimer = window.setTimeout(() => setExiting(true), 2000);
    const doneTimer = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 2900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden
    >
      <div className="overflow-hidden">
        <h1 className="display flex text-5xl tracking-[0.25em] text-paper sm:text-7xl">
          {WORD.split("").map((letter, i) => (
            <span key={`${letter}-${i}`} className="overflow-hidden">
              <span
                className="pre-letter"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {letter}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className="pre-line mt-6 h-px w-40 bg-accent sm:w-56" />

      <p className="pre-sub mt-6 text-[0.7rem] uppercase tracking-[0.32em] text-stone-500">
        Estudio de arquitectura
      </p>
    </div>
  );
}
