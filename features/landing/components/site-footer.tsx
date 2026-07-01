import { NAV_LINKS, CONTACT } from "@/lib/site-data";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-ink pt-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-serif text-2xl tracking-[0.2em] text-paper">
              BESPOKE
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Estudio de arquitectura y construcción. Arquitectura exclusiva,
              completamente única, diseñada especialmente.
            </p>
          </div>

          <nav className="md:col-span-3">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-600">
              Navegación
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-paper-dim/80 transition-colors hover:text-paper"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-stone-600">
              Contacto
            </p>
            <ul className="mt-5 space-y-3 text-sm text-paper-dim/80">
              <li>{CONTACT.city}</li>
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-paper">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-paper"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div
          className="select-none pb-8 text-center font-serif font-light leading-none text-paper/5 transition-colors duration-500 ease-out hover:text-paper"
          style={{ fontSize: "clamp(4rem, 20vw, 20rem)" }}
          aria-hidden
        >
          BESPOKE
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] py-8 text-xs text-stone-600 sm:flex-row">
          <p>© {year} Bespoke Arquitectura. Todos los derechos reservados.</p>
          <p>
            Sitio desarrollado por{" "}
            <span className="text-stone-400">Lumarsoft</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
