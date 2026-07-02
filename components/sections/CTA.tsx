"use client";

import { useState, type FormEvent } from "react";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import DraftingFrame from "@/components/ui/DraftingFrame";

const inputClass =
  "border-b border-hueso/30 bg-transparent py-2 font-sans outline-none transition-colors focus:border-acento";

export default function CTA() {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ type: "lines", y: "100%" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="relative bg-noir px-6 py-32 text-hueso md:px-10">
      <DraftingFrame label="06 / CONTACTO" dark />
      <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-2">
        <div>
          <h2
            ref={titleRef}
            aria-label="Hablemos de tu próximo proyecto"
            className="font-display text-5xl leading-[0.95] md:text-7xl"
          >
            Hablemos de tu próximo proyecto
          </h2>
          <p className="mt-6 max-w-sm font-sans text-hueso/70">
            Contanos tu idea. Diseñamos, gestionamos y dirigimos cada proyecto como si fuera el único.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {submitted ? (
            <p className="font-sans text-lg text-hueso/90">Gracias. Te vamos a contactar a la brevedad.</p>
          ) : (
            <>
              <label className="flex flex-col gap-2 font-sans text-sm text-hueso/70">
                Nombre
                <input required name="name" type="text" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 font-sans text-sm text-hueso/70">
                Email
                <input required name="email" type="email" className={inputClass} />
              </label>
              <label className="flex flex-col gap-2 font-sans text-sm text-hueso/70">
                Contanos tu proyecto
                <textarea required name="message" rows={4} className={inputClass} />
              </label>
              <MagneticButton type="submit" className="mt-4 self-start">
                Enviar
              </MagneticButton>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
