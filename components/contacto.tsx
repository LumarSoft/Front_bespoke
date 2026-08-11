import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { contacto, studio } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import MixedHeading from "@/components/ui/mixed-heading";

const TITLE = [
  [
    { text: "¿Tenés una", tone: "regular" },
    { text: "idea?", tone: "italic" },
  ],
  [
    { text: "La hacemos a tu", tone: "regular" },
    { text: "medida.", tone: "black" },
  ],
] as const;

/**
 * Eje 4 — CONTACTO. Email y WhatsApp como los dos canales principales.
 *
 * Sin `"use client"`: el desplazamiento del fondo, que antes era un
 * `useScroll` + `useTransform` de motion, ahora es una animación CSS atada al
 * scroll (`.parallax-drift`, en globals.css). Misma deriva de ±12%, cero
 * JavaScript, y en los navegadores que todavía no soportan scroll-driven
 * animations la imagen simplemente queda quieta.
 */
export default function Contacto() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-ink px-5 py-32 text-paper sm:px-8 sm:py-44"
    >
      <div className="parallax-drift absolute inset-0">
        <Image
          src="/projects/dusk-glow.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow text-clay-soft">Trabajemos juntos</span>
        </Reveal>

        <Reveal delay={0.05}>
          <MixedHeading
            lines={TITLE}
            className="mt-6 max-w-4xl text-4xl text-paper sm:text-6xl lg:text-7xl"
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-10 border-t border-white/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <a
              href={contacto.emailHref}
              className="group inline-flex items-center gap-4"
            >
              <span className="grid size-14 place-items-center rounded-full bg-clay text-paper transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
              <span className="font-display text-xl font-light break-all sm:text-3xl">
                {contacto.email}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="flex flex-col gap-4 text-sm text-paper/80">
              <li className="flex items-center gap-3">
                <MessageCircle className="size-4 shrink-0 text-clay-soft" />
                <a
                  href={contacto.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp {contacto.whatsapp}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-clay-soft" />
                <a href={contacto.emailHref} className="link-underline break-all">
                  {contacto.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 shrink-0 text-clay-soft" />
                <span>
                  {contacto.address}, {contacto.city}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        <p className="mt-16 text-sm text-paper/55">
          {studio.full} · {studio.location}
        </p>
      </div>
    </section>
  );
}
