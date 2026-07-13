"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, studio, contact } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5"
      >
        <nav
          className={cn(
            "glass flex w-full max-w-6xl items-center justify-between rounded-full transition-all duration-500",
            scrolled ? "px-4 py-2 sm:px-5" : "px-5 py-3 sm:px-7",
          )}
        >
          {/* Marca */}
          <a
            href="#top"
            className="group flex items-baseline gap-2 pl-1 pr-2"
            aria-label={studio.full}
          >
            <span className="font-display text-xl font-semibold tracking-tight text-ink">
              {studio.name}
            </span>
            <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft sm:inline">
              Arquitectura
            </span>
          </a>

          {/* Enlaces desktop */}
          <ul className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-underline text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + toggle mobile */}
          <div className="flex items-center gap-2">
            <a
              href={contact.emailHref}
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-clay md:inline-flex"
            >
              Consultar
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menú mobile a pantalla completa */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-paper md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-display text-xl font-semibold">{studio.name}</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-2 px-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: EASE, duration: 0.6 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-4 font-display text-4xl font-light tracking-tight"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="px-6 pb-10 text-sm text-white/60">
              <a href={contact.emailHref} className="block text-paper">
                {contact.email}
              </a>
              <p className="mt-1">{contact.phone}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
