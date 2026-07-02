"use client";

import { nav, studio, contact } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink px-5 pb-10 pt-4 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Marca gigante */}
        <a
          href="#top"
          className="block select-none border-t border-white/10 pt-8"
          aria-label={`Volver arriba — ${studio.full}`}
        >
          <span className="block font-display text-[22vw] font-light leading-[0.8] tracking-[-0.03em] text-paper/95 lg:text-[16rem]">
            {studio.name}
          </span>
        </a>

        <div className="mt-8 flex flex-col gap-8 border-t border-white/10 pt-8 text-sm text-paper/60 sm:flex-row sm:justify-between">
          <div>
            <p className="text-paper">{studio.full}</p>
            <p className="mt-1">{contact.address}</p>
            <p>{contact.city}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="link-underline text-paper/70 transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="sm:text-right">
            <a href={contact.emailHref} className="link-underline text-paper/70 hover:text-paper">
              {contact.email}
            </a>
            <p className="mt-1">{contact.phone}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-paper/40 sm:flex-row sm:justify-between">
          <p>© {year} {studio.full}. Todos los derechos reservados.</p>
          <p>Arquitectura hecha a medida — Rosario, Argentina.</p>
        </div>
      </div>
    </footer>
  );
}
