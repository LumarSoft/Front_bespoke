"use client";

import { useState, type FormEvent } from "react";

const FIELD =
  "mt-2 w-full rounded-lg border border-[var(--line-strong)] bg-white/[0.03] px-4 py-3 text-paper placeholder:text-stone-500 focus:border-paper/60 focus:bg-white/[0.06] focus:outline-none transition-colors";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Demo only: the backend/form handler is out of Fase 1 scope.
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[320px] flex-col items-start justify-center gap-4">
        <span className="text-accent">✦</span>
        <p className="font-serif text-3xl font-light text-paper">
          ¡Gracias! Nos pondremos en contacto a la brevedad.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm uppercase tracking-[0.16em] text-stone-400 underline-offset-4 hover:text-paper hover:underline"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
            Nombre
          </span>
          <input
            type="text"
            name="name"
            required
            placeholder="Tu nombre"
            className={FIELD}
          />
        </label>
        <label className="block">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="tu@email.com"
            className={FIELD}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
          Tipo de proyecto
        </span>
        <input
          type="text"
          name="project"
          placeholder="Vivienda, comercial, reforma…"
          className={FIELD}
        />
      </label>

      <label className="block">
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-500">
          Contanos tu idea
        </span>
        <textarea
          name="message"
          rows={4}
          placeholder="Ubicación, superficie estimada, expectativas…"
          className={`${FIELD} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="group mt-2 inline-flex w-fit items-center gap-3 rounded-full bg-paper px-8 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:-translate-y-0.5"
      >
        Enviar consulta
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
    </form>
  );
}
