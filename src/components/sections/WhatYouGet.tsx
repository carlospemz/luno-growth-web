"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

const TILES: { title: string; desc: string; chips?: string[] }[] = [
  { title: "Marketing gestionado con IA", desc: "Contenido, diseño y estrategia generados y ejecutados automáticamente.", chips: ["Instagram", "Facebook"] },
  { title: "Chatbot que cierra ventas", desc: "Atiende, califica y cierra prospectos por WhatsApp las 24 horas." },
  { title: "Leads que llegan solos", desc: "Anuncios en Meta optimizados semana a semana para que los clientes te encuentren.", chips: ["Meta Ads", "Google Ads"] },
  { title: "Web que convierte", desc: "Landing page integrada con tu chatbot y tus campañas." },
  { title: "Resultados medibles", desc: "Reporte mensual con números reales: alcance, leads, conversiones." },
  { title: "Estrategia, no solo ejecución", desc: "Calendario de contenido, tendencias y plan mensual. No improvisamos." },
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
        title="Lo que hacemos por tu negocio."
        accentWord="negocio."
        subcopy="Un equipo completo trabajando para ti — sin que tú tengas que hacer nada."
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
            whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.06), 0 0 24px rgba(168,85,247,0.06)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-[14px] rounded-[18px] border border-zinc-200/50 bg-white/80 px-[18px] py-[16px] shadow-sm backdrop-blur-xl transition-colors"
          >
            <span className={`mt-[2px] flex h-[26px] w-[26px] flex-shrink-0 items-center justify-center rounded-[8px] ${
              ACCENT_IDX.has(i) ? "bg-purple-50 text-purple-500" : "bg-zinc-100 text-zinc-500"
            }`}>
              <Check className="h-[14px] w-[14px]" />
            </span>
            <div>
              <p className="text-[15px] font-semibold leading-[1.3] text-zinc-800">
                {tile.title}
              </p>
              <p className="mt-[4px] text-[13.5px] leading-[1.45] text-zinc-500">
                {tile.desc}
              </p>
              {tile.chips && (
                <div className="mt-[6px] flex gap-[6px]">
                  {tile.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-purple-200/50 bg-purple-50/60 px-[8px] py-[2px] text-[11px] font-medium text-purple-600/80"
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
