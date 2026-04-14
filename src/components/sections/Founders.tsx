"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Ángel Villarreal",
    role: "CEO & CMO",
    bio: "Nombrar a VINCENT fue acto uno. Construir la narrativa para que la marca se sintiera inevitable fue acto dos. Escribe el brand bible, define la voz, defiende la disciplina de la oferta cuando el mercado quiere todo barato y todo rápido.",
    initials: "ÁV",
    color: "#E8B931",
    tags: ["Narrativa", "Estrategia", "Ventas"],
  },
  {
    name: "Carlos Peña",
    role: "CTO & CPO",
    bio: "Construye el sistema por debajo: la plataforma multi-tenant, el motor de agentes con IA, el Ticket Creation OS que genera sitios y contenido. La IA es su pincel; el código es el óleo. Si Ángel pinta con palabras, Carlos pinta con arquitectura.",
    initials: "CP",
    color: "#2D4E8E",
    tags: ["Producto", "Arquitectura", "IA"],
  },
];

export default function Founders() {
  return (
    <Section id="nosotros">
      <SectionHeader
        kicker="Quiénes"
        title="Dos fundadores. Un estudio."
        accentWord="Un estudio."
        subcopy="Le compras a dos personas que construyen y operan VINCENT directamente. No hay intermediarios. Cuando escribes, uno de los dos responde."
        compact
      />

      <div className="grid gap-5 md:grid-cols-2 mt-10">
        {FOUNDERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: 0.5, ease: [...MOTION.ease], delay: i * 0.1 }}
          >
            <GlowCard glowColor="orange" className="p-7 flex flex-col gap-5 h-full">
              <div className="flex items-center gap-4">
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full font-headline text-[22px] font-bold"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, #E8B931, #F5D06A)"
                        : "linear-gradient(135deg, #2D4E8E, #1B3160)",
                    color: i === 0 ? "#0B1E38" : "#F5F0E1",
                    border: `2px solid ${f.color}`,
                  }}
                >
                  {f.initials}
                </div>
                <div>
                  <p
                    className="font-headline text-[22px] font-bold leading-[1]"
                    style={{ color: "#F5F0E1" }}
                  >
                    {f.name}
                  </p>
                  <p
                    className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] font-medium"
                    style={{ color: f.color }}
                  >
                    {f.role}
                  </p>
                </div>
              </div>

              <p
                className="text-[14px] leading-[1.7] flex-1"
                style={{ color: "rgba(245, 240, 225, 0.72)" }}
              >
                {f.bio}
              </p>

              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] font-medium"
                    style={{
                      borderColor: "rgba(245, 240, 225, 0.12)",
                      background: "rgba(245, 240, 225, 0.03)",
                      color: "rgba(245, 240, 225, 0.65)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={MOTION.viewport}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.14em]"
        style={{ color: "rgba(245, 240, 225, 0.48)" }}
      >
        Si tienes preguntas antes de empezar, escríbenos. Respondemos nosotros.
      </motion.p>
    </Section>
  );
}
