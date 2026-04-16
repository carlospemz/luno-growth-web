"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { MOTION } from "@/lib/motion";

/**
 * ForWhom — health-first verticals as destination cards.
 *
 * Each card: full-bleed photo + themed HSL gradient overlay.
 * Each vertical gets its own theme color drawn from the VINCENT
 * palette (indigo, cobalt, gold, plus soft health-tinted accents).
 */

type Vertical = {
  icon: string;
  name: string;
  line: string;
  imageUrl: string;
  themeColor: string;
};

const PRIMARY: Vertical[] = [
  {
    icon: "🦷",
    name: "Consultorios dentales",
    line: "Agendar, confirmar, recordar. Reducir no-shows.",
    imageUrl:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    themeColor: "215 55% 22%",
  },
  {
    icon: "🩺",
    name: "Consultorios médicos",
    line: "Recepción sin recepcionista. 24/7, en silencio.",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    themeColor: "225 50% 26%",
  },
  {
    icon: "✨",
    name: "Clínicas estéticas",
    line: "Cotizar, reservar, reactivar pacientes dormidos.",
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    themeColor: "340 45% 28%",
  },
  {
    icon: "💪",
    name: "Fisio y rehabilitación",
    line: "Seguimiento de sesiones y reagendamiento fluido.",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
    themeColor: "195 55% 24%",
  },
  {
    icon: "🧠",
    name: "Psicología",
    line: "Primera cita sin fricción. Confidencialidad absoluta.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    themeColor: "265 45% 28%",
  },
  {
    icon: "👶",
    name: "Pediatría",
    line: "Padres que escriben a las 11 pm. Tú duermes.",
    imageUrl:
      "https://images.unsplash.com/photo-1632053003053-644fe81f3f1b?auto=format&fit=crop&w=1200&q=80",
    themeColor: "40 55% 28%",
  },
];

type SecondarySector = { label: string; hint: string };

const SECONDARY: SecondarySector[] = [
  { label: "Restaurantes y cafés", hint: "Pedidos, reservas, menú" },
  { label: "Inmobiliarias", hint: "Captación y seguimiento" },
  { label: "Gimnasios y estudios", hint: "Clases, pagos, renovaciones" },
  { label: "Servicios profesionales", hint: "Citas y cotizaciones" },
  { label: "Retail local", hint: "Catálogo y WhatsApp" },
  { label: "Y cualquier dueño agotado", hint: "Si el tuyo no está, escríbenos" },
];

export default function ForWhom() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const CARD_FRACTION = 0.82;
  const GAP = 14;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.clientWidth * CARD_FRACTION + GAP;
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActive(Math.min(Math.max(idx, 0), PRIMARY.length - 1));
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * CARD_FRACTION + GAP;
    el.scrollTo({ left: cardWidth * idx, behavior: "smooth" });
  }, []);

  return (
    <Section id="para-quien" className="relative">
      <SectionHeader
        kicker="Para quién"
        title="Negocios que viven de atender personas."
        accentWord="personas."
        subcopy="Construido para cualquier negocio con un dueño harto de improvisar. Hoy trabajamos mejor con los que cuidan de otros."
        compact
      />

      {/* ── Mobile carousel — destination cards ── */}
      <div className="md:hidden mt-8 relative">
        <div className="-mx-5 sm:-mx-8">
          <div
            ref={scrollerRef}
            data-health-scroller
            className="flex overflow-x-auto px-5 sm:px-8 pb-3 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              gap: `${GAP}px`,
            }}
          >
            {PRIMARY.map((v, i) => (
              <motion.div
                key={v.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  ease: [...MOTION.easeOut],
                  delay: i * 0.04,
                }}
                className="shrink-0 snap-start"
                style={{
                  width: `${CARD_FRACTION * 100}%`,
                  height: 420,
                }}
              >
                <DestinationCard
                  imageUrl={v.imageUrl}
                  location={v.name}
                  icon={v.icon}
                  stats={v.line}
                  href="#brief"
                  themeColor={v.themeColor}
                  ctaLabel="Quiero esto"
                />
              </motion.div>
            ))}
            <div className="shrink-0 w-5 sm:w-8" aria-hidden="true" />
          </div>
        </div>

        {/* Dot indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {PRIMARY.map((v, i) => (
            <button
              key={v.name}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Ir a ${v.name}`}
              className="transition-all"
              style={{
                height: 6,
                width: active === i ? 22 : 6,
                borderRadius: 9999,
                background:
                  active === i ? "#E8B931" : "rgba(232, 185, 49, 0.28)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop grid — same destinations in 3 columns ── */}
      <div className="hidden md:grid mt-12 grid-cols-3 gap-5">
        {PRIMARY.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: [...MOTION.easeOut],
              delay: i * 0.05,
            }}
            style={{ height: 440 }}
          >
            <DestinationCard
              imageUrl={v.imageUrl}
              location={v.name}
              icon={v.icon}
              stats={v.line}
              href="#brief"
              themeColor={v.themeColor}
              ctaLabel="Quiero esto"
            />
          </motion.div>
        ))}
      </div>

      {/* ── Y también — secondary sectors ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: [...MOTION.easeOut], delay: 0.15 }}
        className="mt-14 md:mt-20"
      >
        <div className="flex items-baseline justify-between mb-5 md:mb-6">
          <div>
            <p className="vin-kicker text-[10px] md:text-[11px] mb-1.5">
              Y también
            </p>
            <p
              className="font-headline text-[18px] md:text-[22px] font-bold leading-[1.1] tracking-tight"
              style={{ color: "rgba(245, 240, 225, 0.88)" }}
            >
              trabajamos con
            </p>
          </div>
        </div>

        <div className="md:hidden -mx-5 sm:-mx-8">
          <div
            className="flex gap-2.5 overflow-x-auto px-5 sm:px-8 pb-1 snap-x snap-mandatory scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {SECONDARY.map((s) => (
              <div
                key={s.label}
                className="shrink-0 snap-start flex flex-col justify-center px-4 py-3"
                style={{
                  minWidth: 200,
                  borderRadius: "10px",
                  background: "rgba(245, 240, 225, 0.03)",
                  border: "1px solid rgba(245, 240, 225, 0.12)",
                }}
              >
                <p
                  className="text-[13px] font-semibold leading-[1.15]"
                  style={{ color: "rgba(245, 240, 225, 0.9)" }}
                >
                  {s.label}
                </p>
                <p
                  className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ color: "rgba(245, 240, 225, 0.42)" }}
                >
                  {s.hint}
                </p>
              </div>
            ))}
            <div className="shrink-0 w-5 sm:w-8" aria-hidden="true" />
          </div>
        </div>

        <div className="hidden md:grid grid-cols-3 gap-3">
          {SECONDARY.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline gap-3 px-4 py-3.5"
              style={{
                borderRadius: "12px",
                background: "rgba(245, 240, 225, 0.025)",
                border: "1px solid rgba(245, 240, 225, 0.1)",
              }}
            >
              <p
                className="text-[14px] font-semibold leading-[1.15] shrink-0"
                style={{ color: "rgba(245, 240, 225, 0.9)" }}
              >
                {s.label}
              </p>
              <span
                className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] shrink-0"
                style={{ color: "rgba(245, 240, 225, 0.42)" }}
              >
                {s.hint}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Closing pitch ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55, ease: [...MOTION.easeOut], delay: 0.2 }}
        className="mt-10 md:mt-14 text-center"
        style={{
          borderRadius: "24px",
          padding: "28px 24px",
          background: "rgba(245, 240, 225, 0.03)",
          border: "1px solid rgba(245, 240, 225, 0.1)",
        }}
      >
        <p
          className="font-headline text-[22px] md:text-[30px] font-bold leading-[1.18] max-w-[680px] mx-auto"
          style={{ color: "#F5F0E1", textWrap: "balance" }}
        >
          Cada mensaje sin responder es una venta perdida.{" "}
          <span className="vin-gradient-gold-text">
            Instalamos el sistema que responde, califica y cierra
          </span>{" "}
          — cuando tú no puedes.
        </p>
        <p
          className="mt-4 vin-kicker text-[10px] md:text-[11px]"
          style={{ color: "rgba(245, 240, 225, 0.45)" }}
        >
          Sin equipo propio · Sin contratos largos · Setup en días
        </p>
      </motion.div>
    </Section>
  );
}
