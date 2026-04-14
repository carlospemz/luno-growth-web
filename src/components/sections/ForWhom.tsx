"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * ForWhom — salud-first verticals strip.
 *
 * The order matters: the first 6 positions are health sector (with
 * larger visual weight) because Vincent Growth is actively focused
 * on that vertical while Vincent Care gets ready to launch.
 * Positions 7-12 are other sectors — they matter, they're welcomed,
 * but they don't get the spotlight.
 */

const VERTICALS = [
  // ── Salud (foco activo) ──
  { emoji: "🦷", name: "Consultorios dentales", weight: "heavy" as const, bucket: "salud" as const },
  { emoji: "🩺", name: "Consultorios médicos", weight: "heavy" as const, bucket: "salud" as const },
  { emoji: "💆‍♀️", name: "Clínicas estéticas", weight: "heavy" as const, bucket: "salud" as const },
  { emoji: "🤸", name: "Fisio y rehabilitación", weight: "heavy" as const, bucket: "salud" as const },
  { emoji: "🧠", name: "Psicología y salud mental", weight: "heavy" as const, bucket: "salud" as const },
  { emoji: "👶", name: "Pediatría", weight: "heavy" as const, bucket: "salud" as const },
  // ── Otros sectores ──
  { emoji: "🍽️", name: "Restaurantes y cafés", weight: "light" as const, bucket: "otros" as const },
  { emoji: "🏠", name: "Inmobiliarias", weight: "light" as const, bucket: "otros" as const },
  { emoji: "💪", name: "Gimnasios y estudios", weight: "light" as const, bucket: "otros" as const },
  { emoji: "⚖️", name: "Servicios profesionales", weight: "light" as const, bucket: "otros" as const },
  { emoji: "🛍️", name: "Retail local", weight: "light" as const, bucket: "otros" as const },
  { emoji: "✨", name: "Cualquier dueño agotado", weight: "light" as const, bucket: "otros" as const },
];

// Duplicate for infinite scroll effect
const ITEMS = [...VERTICALS, ...VERTICALS];

export default function ForWhom() {
  return (
    <Section id="para-quien" className="pb-[48px] overflow-hidden">
      <SectionHeader
        kicker="Para quién trabaja Vincent"
        title="Negocios con un dueño que ya no puede todo."
        accentWord="todo."
        subcopy="Construido para cualquier negocio con un dueño harto de improvisar. Con un cariño especial por los que cuidan la salud de los demás."
        compact
      />

      {/* Salud-focus pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [...MOTION.ease] }}
        className="flex justify-center mb-10"
      >
        <div
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5"
          style={{
            borderColor: "rgba(232, 185, 49, 0.35)",
            background: "rgba(232, 185, 49, 0.08)",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "#E8B931" }}
          />
          <span
            className="text-[12px] font-mono uppercase tracking-[0.14em] font-medium"
            style={{ color: "#E8B931" }}
          >
            Foco activo · Sector salud · 2026
          </span>
        </div>
      </motion.div>

      {/* Infinite scroll strip */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
          className="flex gap-3 w-max"
        >
          {ITEMS.map((v, i) => {
            const isHeavy = v.weight === "heavy";
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-full border whitespace-nowrap backdrop-blur-sm"
                style={{
                  borderColor: isHeavy
                    ? "rgba(232, 185, 49, 0.35)"
                    : "rgba(245, 240, 225, 0.12)",
                  background: isHeavy
                    ? "rgba(232, 185, 49, 0.06)"
                    : "rgba(245, 240, 225, 0.03)",
                  padding: isHeavy ? "14px 22px" : "11px 18px",
                }}
              >
                <span className={isHeavy ? "text-xl leading-none" : "text-base leading-none"}>{v.emoji}</span>
                <span
                  className={`font-medium ${isHeavy ? "text-[15px]" : "text-[13px]"}`}
                  style={{
                    color: isHeavy ? "#F5F0E1" : "rgba(245, 240, 225, 0.65)",
                  }}
                >
                  {v.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ROI pitch */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [...MOTION.ease], delay: 0.15 }}
        className="mt-14 rounded-[24px] border px-6 py-7 md:px-10 md:py-9 text-center"
        style={{
          borderColor: "rgba(245, 240, 225, 0.1)",
          background: "rgba(245, 240, 225, 0.03)",
        }}
      >
        <p
          className="font-headline text-[22px] md:text-[28px] font-bold leading-[1.2] max-w-[640px] mx-auto"
          style={{ color: "#F5F0E1" }}
        >
          Cada mensaje sin responder es una venta perdida.{" "}
          <span className="vin-gradient-gold-text">Te instalamos el sistema que responde, califica y cierra</span>
          {" "}— cuando tú no puedes.
        </p>
        <p
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: "rgba(245, 240, 225, 0.45)" }}
        >
          Sin equipo propio · Sin contratos largos · Resultados medibles desde la primera semana
        </p>
      </motion.div>
    </Section>
  );
}
