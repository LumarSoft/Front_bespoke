"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { logo, nav, studio, contacto } from "@/lib/content";
import { cn } from "@/lib/utils";

/** A partir de acá el vidrio se densifica. */
const UMBRAL_SCROLL = 40;

/**
 * Navbar fijo. Está siempre presente, en su versión clara, sobre cualquier
 * sección — no se esconde ni cambia de color.
 *
 * Lo que hace que no moleste sobre los titulares grandes es el desenfoque
 * (ver `.nav-glass` en globals.css), que hasta hace poco no llegaba a
 * aplicarse por un problema de minificado del `backdrop-filter`.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activa = useSeccionActiva();

  /**
   * Un listener pasivo alcanza: lo único que necesitamos saber es si pasamos
   * los 40px. Antes esto usaba `useScroll` de motion, que instala un observador
   * de scroll y un motion value para leer un booleano — y arrastraba toda la
   * librería de animación al bundle de la barra, que es lo primero que se
   * pinta. `passive: true` para no interferir con el scroll.
   */
  useEffect(() => {
    const alScrollear = () => setScrolled(window.scrollY > UMBRAL_SCROLL);
    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    return () => window.removeEventListener("scroll", alScrollear);
  }, []);

  // Con el menú abierto, el fondo no debe scrollear detrás.
  useEffect(() => {
    if (!open) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [open]);

  // Cerrar el menú con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/*
        `<header>` plano, no `motion.header`, y sin animación de entrada: la
        barra tiene que estar presente desde el primer frame, sin depender de
        que ninguna animación llegue a correr. Ver la nota en globals.css.
      */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
        <nav
          aria-label="Navegación principal"
          className={cn(
            "nav-glass flex w-full max-w-6xl items-center justify-between rounded-full",
            // `is-scrolled` es la que densifica el vidrio (ver globals.css).
            // Estaba definida en el CSS pero nadie la aplicaba, así que el
            // navbar se quedaba siempre en el estado de reposo.
            scrolled ? "is-scrolled px-4 py-2 sm:px-5" : "px-5 py-3 sm:px-7",
          )}
        >
          {/* Versión positiva: la píldora es clara (manual, pág. 13). */}
          <Link
            href="/"
            className="flex shrink-0 items-center rounded-full pl-1 pr-2 outline-none focus-visible:ring-2 focus-visible:ring-clay"
            aria-label={`${studio.full} — ir al inicio`}
          >
            <Image
              src={logo.positiva.src}
              alt={logo.alt}
              width={logo.positiva.width}
              height={logo.positiva.height}
              // Arriba del pliegue: se carga de entrada, sin robarle prioridad
              // al logo del hero, que es el LCP. (`priority` está deprecado en
              // Next 16.)
              loading="eager"
              quality={90}
              sizes="150px"
              className={cn(
                "h-auto transition-[width] duration-500",
                scrolled ? "w-[104px] sm:w-[118px]" : "w-[112px] sm:w-[132px]",
              )}
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => {
              const esActiva = activa === item.href.replace("/#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={esActiva ? "page" : undefined}
                    className={cn(
                      "link-underline rounded-sm text-sm outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-clay",
                      esActiva
                        ? "font-semibold text-ink"
                        : "font-medium text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={contacto.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper outline-none transition-colors duration-300 hover:bg-clay focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 md:inline-flex"
            >
              Consultar
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full text-ink outline-none transition-colors hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-clay md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/*
        Overlay del menú mobile. La entrada es CSS (`.menu-overlay`): no hace
        falta orquestar una salida animada porque al cerrar el nodo se
        desmonta, y un fundido de salida de 0,4 s en un menú de pantalla
        completa se percibe como demora, no como refinamiento.
      */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="menu-overlay fixed inset-0 z-60 flex flex-col bg-ink text-paper md:hidden"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            {/* Menú mobile: fondo negro → versión negativa. */}
            <Image
              src={logo.negativa.src}
              alt={logo.alt}
              width={logo.negativa.width}
              height={logo.negativa.height}
              sizes="130px"
              className="h-auto w-[120px]"
            />
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
              autoFocus
              className="grid size-10 place-items-center rounded-full outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-clay"
            >
              <X className="size-5" />
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className="menu-item"
                style={{ animationDelay: `${0.1 + i * 0.07}s` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/10 py-4 font-display text-4xl font-light tracking-tight"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6 pb-10 text-sm text-white/60">
            <a href={contacto.emailHref} className="block break-all text-paper">
              {contacto.email}
            </a>
            <a
              href={contacto.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block"
            >
              WhatsApp {contacto.whatsapp}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Marca en el navbar la sección que se está mirando. Usa el mismo truco de
 * `rootMargin` que antes servía para el tono: una franja de detección debajo
 * de la barra, así no hay que medir posiciones en cada frame.
 */
function useSeccionActiva() {
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const ids = nav
      .map((n) => n.href.replace("/#", ""))
      .filter((id) => document.getElementById(id));
    if (!ids.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiva(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 },
    );

    ids.forEach((id) => observer.observe(document.getElementById(id)!));
    return () => observer.disconnect();
  }, []);

  return activa;
}
