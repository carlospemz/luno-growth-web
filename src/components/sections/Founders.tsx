"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

/**
 * Founders — client-facing block.
 *
 * Per ticket VINCENT-WEB-FOUNDERS-014: zero references to repos,
 * multi-tenant, Ticket Creation OS, motor de agentes, or any
 * internal tooling language. Every sentence explains what each
 * founder does FOR THE CLIENT, not what they do inside the repo.
 *
 * Cargos fixed:
 *   Ángel Villarreal  — CEO & CMO
 *   Carlos Peña       — COO & CPO
 */

const FOUNDERS = [
  {
    name: "Ángel Villarreal",
    role: "CEO & CMO",
    bio: "Define la dirección de Vincent: la marca, la narrativa y la estrategia comercial. Ordena la forma en que nos vemos, sonamos y vendemos para que cada pieza tenga intención y cada oferta salga al mercado con claridad.",
    initials: "ÁV",
    color: "#E8B931",
    tags: ["Marca", "Narrativa", "Crecimiento"],
  },
  {
    name: "Carlos Peña",
    role: "COO & CPO",
    bio: "Convierte la estrategia en sistema. Diseña la operación, estructura el producto y aterriza la experiencia para que Vincent no dependa de ocurrencias, sino de criterio, proceso y ejecución real.",
    initials: "CP",
    color: "#2D4E8E",
    tags: ["Operación", "Producto", "Sistema"],
  },
];

export default function Founders() {
  return (
    <Section id="nosotros">
      <SectionHeader
        kicker="Founders"
        title="Dos lados del mismo sistema."
        accentWord="del mismo sistema."
        subcopy="No hay intermediarios. Cuando escribes a Vincent, responde uno de los dos."
        compact
      />

      <div className="grid gap-5 md:grid-cols-2 mt-8 md:mt-10">
        {FOUNDERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: 0.5, ease: [...MOTION.ease], delay: i * 0.1 }}
          >
            <GlowCard glowColor="orange" className="p-7 md:p-8 flex flex-col gap-6 h-full">
              {/* Avatar + name + role */}
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
                <div className="min-w-0">
                  <p
                    className="font-headline text-[22px] md:text-[24px] font-extrabold leading-[1] tracking-tight"
                    style={{ color: "#F5F0E1" }}
                  >
                    {f.name}
                  </p>
                  <p
                    className="mt-1.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-medium"
                    style={{ color: f.color }}
                  >
                    {f.role}
                  </p>
                </div>
              </div>

              {/* Bio — client-facing only */}
              <p className="text-[14.5px] md:text-[15px] leading-[1.7] flex-1 vin-text-muted">
                {f.bio}
              </p>

              {/* Tags — business functions, not tooling */}
              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] font-medium"
                    style={{
                      borderColor: "rgba(245, 240, 225, 0.14)",
                      background: "rgba(245, 240, 225, 0.03)",
                      color: "rgba(245, 240, 225, 0.7)",
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
        className="mt-10 text-center vin-kicker text-[10px] md:text-[11px]"
        style={{ color: "rgba(245, 240, 225, 0.48)" }}
      >
        Si tienes preguntas antes de empezar, escríbenos. Respondemos nosotros.
      </motion.p>
    </Section>
  );
}
