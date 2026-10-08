"use client";

import Image from "next/image";
import { metodo } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import MixedHeading from "@/components/ui/mixed-heading";

/**
 * Eje 2 — MÉTODO. Cómo trabajamos.
 *
 * Tres reglas explícitas del cliente para esta sección:
 *   1. Fondo pleno negro (sin video ni textura de fondo).
 *   2. Organización tipográfica igual a la de Estudio → `MixedHeading`.
 *   3. Los ítems NO se animan. Lo único que reacciona es el color del número
 *      al pasar o tabular sobre el ítem — de ahí que sea una transición de
 *      color y nada más: sin desplazamientos, sin fades de entrada, sin pin.
 */
export default function Metodo() {
  return (
    <section
      id="metodo"
      className="relative bg-ink px-5 py-28 text-paper sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-6xl">
        {/*
          La intro de la revisión 3 es un párrafo largo: en la columna angosta
          de antes quedaba una tira ilegible. Desde `lg` titular e intro se
          reparten el ancho; por debajo, la intro cae debajo del titular.
        */}
        <div className="mb-20 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow text-clay-soft">{metodo.eyebrow}</span>
            </Reveal>
            <Reveal delay={0.05}>
              <MixedHeading
                lines={metodo.title.lines}
                className="mt-5 max-w-2xl text-4xl text-paper sm:text-6xl"
              />
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-paper/70">
              {metodo.intro.map((fragmento, i) =>
                fragmento.strong ? (
                  <strong key={i} className="font-semibold text-paper">
                    {fragmento.text}
                  </strong>
                ) : (
                  fragmento.text
                ),
              )}
            </p>
          </Reveal>
        </div>

        {/* Ítems estáticos: sin animación de entrada ni de hover. */}
        <ul className="border-t border-white/10">
          {metodo.pasos.map((paso) => (
            <li
              key={paso.id}
              tabIndex={0}
              className="group grid grid-cols-[auto_1fr] items-center gap-x-5 border-b border-white/10 py-8 outline-none sm:grid-cols-[3rem_4rem_1fr_1.2fr] sm:gap-x-8 sm:py-10"
            >
              {/*
                Reposo al 60% y no al 40%: al 40% el número daba 3,4:1 sobre
                negro y WCAG AA pide 4,5:1. Y el color de interacción es
                `clay-soft` (6,3:1) en lugar de `clay` (4,2:1) — la misma
                terracota que ya usan el resto de las secciones oscuras.
                El cambio de color al interactuar, que es lo que pidió el
                cliente, se mantiene intacto.
              */}
              <span className="font-sans text-sm tabular-nums text-paper/60 transition-colors duration-200 group-hover:text-clay-soft group-focus:text-clay-soft">
                {paso.id}
              </span>

              {/* Ícono del manual. Es negro sobre transparente: acá se invierte. */}
              <Image
                src={paso.icon}
                alt=""
                aria-hidden
                width={4500}
                height={4500}
                sizes="64px"
                className="icon-invert col-start-2 row-span-2 hidden size-12 sm:block"
              />

              {/* Títulos de hasta cinco palabras: un cuerpo menor que el de
                  los cuatro pilares anteriores para que no se partan en tres líneas. */}
              <h3 className="font-display text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
                {paso.title}
              </h3>
              <p className="col-span-2 mt-3 max-w-lg text-sm leading-relaxed text-paper/60 sm:col-span-1 sm:mt-0">
                {paso.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
