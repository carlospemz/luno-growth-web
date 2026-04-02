"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

const VERTICALS = [
  { emoji: "🍺", name: "Antros & Bares" },
  { emoji: "🍽️", name: "Restaurantes" },
  { emoji: "🎉", name: "Salones de Fiestas" },
  { emoji: "🏥", name: "Clínicas & Consultorios" },
  { emoji: "💅", name: "Salones de Belleza" },
  { emoji: "💪", name: "Gimnasios & Wellness" },
  { emoji: "🏠", name: "Inmobiliarias" },
  { emoji: "📸", name: "Estudios & Creadores" },
  { emoji: "🎤", name: "Venues & Eventos" },
  { emoji: "🛍️", name: "Retail Local" },
];

// Duplicate for infinite scroll effect
const ITEMS = [...VERTICALS, ...VERTICALS];

export default function ForWhom() {
  return (
    <Section id="para-quien" className="pb-[48px] overflow-hidden">
      <SectionHeader
        kicker="Para quién es LUNO"
        title="¿Clientes llegan por conversación?"
        accentWord="conversación?"
        subcopy="Si tu negocio vive de que la gente te escriba, te llame o te busque en Google — LUNO es para ti."
        compact
      />

      {/* Differentiator pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [...MOTION.ease] }}
        className="flex justify-center mb-10"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-5 py-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[13px] font-semibold text-purple-300">
            No somos agencia. Instalamos y operamos tu sistema de crecimiento.
          </span>
        </div>
      </motion.div>

      {/* Infinite scroll strip */}
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          className="flex gap-3 w-max"
        >
          {ITEMS.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.05] px-5 py-3 whitespace-nowrap backdrop-blur-sm"
            >
              <span className="text-lg leading-none">{v.emoji}</span>
              <span className="text-[14px] font-medium text-zinc-300">{v.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ROI pitch */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [...MOTION.ease], delay: 0.15 }}
        className="mt-12 rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-6 md:px-10 md:py-8 text-center"
      >
        <p className="text-[18px] md:text-[22px] font-bold text-zinc-100 leading-[1.3] max-w-[560px] mx-auto">
          Cada mensaje sin responder es una venta perdida.{" "}
          <span className="brand-gradient-text">Te instalamos el sistema que responde, califica y cierra</span>
          {" "}— cuando tú no puedes.
        </p>
        <p className="mt-3 text-[14px] text-zinc-500">Sin equipo · Sin contrato largo · Resultados medibles en 30 días o no renuevas</p>
      </motion.div>
    </Section>
  );
}
