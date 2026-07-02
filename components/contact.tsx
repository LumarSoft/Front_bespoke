"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contact, studio } from "@/lib/content";
import { Reveal, RevealText } from "@/components/ui/reveal";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="contacto"
      ref={ref}
      className="relative overflow-hidden bg-ink px-5 py-32 text-paper sm:px-8 sm:py-44"
    >
      {/* Fondo parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-0 scale-110">
        <Image
          src="/projects/dusk-glow.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <span className="eyebrow text-clay-soft">Trabajemos juntos</span>
        </Reveal>

        <RevealText
          as="h2"
          text="¿Tenés una idea? La hacemos a tu medida."
          className="mt-6 max-w-4xl font-display text-4xl font-light leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-7xl"
          delay={0.05}
        />

        <div className="mt-14 flex flex-col gap-10 border-t border-white/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <a
              href={contact.emailHref}
              className="group inline-flex items-center gap-4"
            >
              <span className="grid size-14 place-items-center rounded-full bg-clay text-paper transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="size-6 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              <span className="font-display text-2xl font-light sm:text-4xl">
                {contact.email}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="flex flex-col gap-4 text-sm text-paper/80">
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-clay-soft" />
                <span>
                  {contact.address}, {contact.city}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-clay-soft" />
                <a href={contact.phoneHref} className="link-underline">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-clay-soft" />
                <a href={contact.emailHref} className="link-underline">
                  {contact.email}
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <p className="mt-16 font-display text-sm text-paper/40">
          {studio.full} · {studio.location}
        </p>
      </div>
    </section>
  );
}
