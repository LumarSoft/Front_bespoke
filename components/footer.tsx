import { studio } from "@/lib/content";

/**
 * Pie mínimo. Revisión 3: el cliente pidió sacar el logo a gran escala que
 * cerraba la página (quedaba muy grande y repetía la marca del navbar).
 * El año es el de la página y se actualiza solo.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink px-5 pb-10 pt-4 text-paper sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="border-t border-white/10 pt-8 text-xs text-paper/60">
          <p>
            © {year} {studio.full}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
