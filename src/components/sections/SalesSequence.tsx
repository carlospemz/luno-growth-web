"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * SalesSequence — the map from the PDF.
 *
 * Entrada → Recurrencia → Aceleración → Conversión → Retención
 *
 * This is how the 3 core offers and 3 add-ons connect as a sequence,
 * not a catalog. Mobile: vertical stack. Desktop: horizontal strip
 * with a gold dotted connector that draws itself on view.
 */

const STEPS = [
  {
    num: "01",
    phase: "Entrada",
    offer: "Brand System",
    when: "cuando el cliente está ambiguo, desordenado o sin canon claro",
  },
  {
    num: "02",
    phase: "Recurrencia",
    offer: "Content Engine",
    when: "cuando ya existe dirección y se necesita presencia constante",
  },
  {
    num: "03",
    phase: "Aceleración",
    offer: "Demand Engine",
    when: "cuando el cliente quiere volumen, leads o citas y ya hay oferta clara",
  },
  {
    num: "04",
    phase: "Conversión",
    offer: "Website Execution",
    when: "cuando el sitio realmente vaya a elevar conversión o credibilidad",
  },
  {
    num: "05",
    phase: "Retención",
    offer: "Local Search / Lead Ops",
    when: "solo cuando el negocio lo necesite y el contexto ya esté armado",
  },
];

export default function SalesSequence() {
  return (
    <Section id="sequence" className="relative">
      <SectionHeader
        kicker="Cómo se combina"
        title="Una secuencia, no un catálogo."
        accentWord="no un catálogo."
        subcopy="Cada cliente entra por donde le duele más y avanza cuando está listo. Nunca vendemos todo junto."
      />

      {/* Mobile: vertical stack */}
      <div className="md:hidden mt-10 space-y-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: [...MOTION.easeOut],
              delay: i * 0.08,
            }}
            className="flex items-start gap-4 rounded-2xl border p-4"
            style={{
              borderColor: "rgba(245, 240, 225, 0.1)",
              background: "rgba(245, 240, 225, 0.025)",
            }}
          >
            <div className="flex-shrink-0">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full font-mono text-[12px] font-semibold"
                style={{
                  background: "rgba(232, 185, 49, 0.12)",
                  color: "#E8B931",
                  border: "1px solid rgba(232, 185, 49, 0.35)",
                }}
              >
                {step.num}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.16em] mb-1"
                style={{ color: "#E8B931" }}
              >
                {step.phase}
              </p>
              <p
                className="font-headline text-[20px] font-bold leading-[1.1] mb-2"
                style={{ color: "#F5F0E1" }}
              >
                {step.offer}
              </p>
              <p
                className="text-[13px] italic leading-relaxed"
                style={{ color: "rgba(245, 240, 225, 0.68)" }}
              >
                {step.when}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: horizontal strip */}
      <div className="hidden md:block mt-14 relative">
        {/* Dotted connector line */}
        <motion.div
          className="absolute top-5 left-[4%] right-[4%] h-[2px] pointer-events-none"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            background:
              "repeating-linear-gradient(to right, rgba(232, 185, 49, 0.5) 0 6px, transparent 6px 12px)",
            transformOrigin: "left",
          }}
        />

        <div className="grid grid-cols-5 gap-4 relative">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: [...MOTION.easeOut],
                delay: 0.2 + i * 0.1,
              }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-mono text-[11px] font-semibold mb-4"
                style={{
                  background: "#0B1E38",
                  border: "1.5px solid #E8B931",
                  color: "#E8B931",
                  boxShadow: "0 0 0 4px #0B1E38",
                }}
              >
                {step.num}
              </div>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.16em] mb-2"
                style={{ color: "#E8B931" }}
              >
                {step.phase}
              </p>
              <p
                className="font-headline text-[18px] font-bold leading-[1.1] mb-3"
                style={{ color: "#F5F0E1" }}
              >
                {step.offer}
              </p>
              <p
                className="text-[12px] italic leading-relaxed"
                style={{ color: "rgba(245, 240, 225, 0.6)" }}
              >
                {step.when}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
