import Image from "next/image";
import Link from "next/link";
import { logo, studio } from "@/lib/content";

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

        <div className="mt-10 border-t border-white/10 pt-8 text-xs text-paper/60">
          <p>
            © {year} {studio.full}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
