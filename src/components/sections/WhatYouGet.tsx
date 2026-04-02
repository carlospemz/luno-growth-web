"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

const TILES: { title: string; desc: string; chips?: string[] }[] = [
  { title: "Copy que vende", desc: "Explica tu oferta y empuja a cotizar." },
  { title: "Diseño que da confianza", desc: "Se ve serio y se entiende rápido." },
  { title: "Ruta directa a contacto", desc: "Botón principal claro y canal listo para responder.", chips: ["WhatsApp", "Llamada", "Formulario"] },
  { title: "Lista para Google", desc: "Base técnica para aparecer y ser encontrado." },
  { title: "Rápida en celular", desc: "Optimizada para el dispositivo real." },
  { title: "Estructura sin pensar", desc: "Orden lógico para decidir en segundos." },
];

const ACCENT_IDX = new Set([0, 3]);

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [...MOTION.ease] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export default function WhatYouGet() {
  return (
    <Section id="features" className="pb-[32px]">
      <SectionHeader
        kicker="Capacidades"
        title="Lo que hacemos para que te compren."
        accentWord="compren"
        subcopy="Seis cosas que dejamos listas para que te contacten."
        compact
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="flex flex-col gap-[10px] sm:grid sm:grid-cols-2 sm:gap-[12px] md:grid-cols-3"
      >
        {TILES.map((tile, i) => (
          <motion.div
            key={tile.title}
            variants={rowVariants}
            whileTap={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.18)" }}
            transition={{ duration: 0.15 }}
            className="flex items-start gap-[12px] rounded-[16px] border border-white/[0.10] bg-white/[0.03] px-[14px] py-[12px]"
          >
            <Check
              className={`mt-[3px] h-[14px] w-[14px] flex-shrink-0 ${
                ACCENT_IDX.has(i) ? "text-violet-400/75" : "text-zinc-500"
              }`}
            />
            <div>
              <p className="text-[15px] font-semibold leading-[1.3] text-zinc-900">
                {tile.title}
              </p>
              <p className="mt-[3px] text-[13px] leading-[1.35] text-zinc-500">
                {tile.desc}
              </p>
              {tile.chips && (
                <div className="mt-[6px] flex gap-[6px]">
                  {tile.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-[8px] py-[2px] text-[11px] text-zinc-500"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
