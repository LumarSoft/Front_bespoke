import Image from "next/image";
import Link from "next/link";
import { logo, nav, studio, contacto, portfolioList } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-5 pb-10 pt-4 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Marca a gran escala — versión negativa sobre negro (manual, pág. 13). */}
        <Link
          href="/#top"
          className="block select-none border-t border-white/10 pb-4 pt-10"
          aria-label={`Volver arriba — ${studio.full}`}
        >
          <Image
            src={logo.negativa.src}
            alt={logo.alt}
            width={logo.negativa.width}
            height={logo.negativa.height}
            sizes="(max-width: 1024px) 92vw, 72rem"
            className="h-auto w-full"
          />
        </Link>

        <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 text-sm text-paper/60 sm:grid-cols-3">
          <div>
            <p className="text-paper">{studio.full}</p>
            <p className="mt-1">{contacto.address}</p>
            <p>{contacto.city}</p>
          </div>

          <nav className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline w-fit text-paper/70 transition-colors hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            {portfolioList.map((portfolio) => (
              <Link
                key={portfolio.slug}
                href={`/proyectos/${portfolio.slug}`}
                className="link-underline w-fit text-paper/60 transition-colors hover:text-paper"
              >
                — {portfolio.label}
              </Link>
            ))}
          </nav>

          <div className="sm:text-right">
            <a
              href={contacto.emailHref}
              className="link-underline break-all text-paper/70 hover:text-paper"
            >
              {contacto.email}
            </a>
            <p className="mt-1">
              <a
                href={contacto.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-paper"
              >
                WhatsApp {contacto.whatsapp}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 text-xs text-paper/60 sm:flex-row sm:justify-between">
          <p>
            © {year} {studio.full}. Todos los derechos reservados.
          </p>
          <p>{studio.tagline} — Rosario, Argentina.</p>
        </div>
      </div>
    </footer>
  );
}
