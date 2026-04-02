"use client";

import { motion } from "framer-motion";
import { Clock, MessageSquare, TrendingUp } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

const INCOMING = [
  {
    business: "HOK Nightclub",
    location: "Monclova, Coah.",
    service: "Sistema + Demand Engine",
    status: "En proceso — Semana 1",
    icon: "🍺",
  },
  {
    business: "Brincando Ando",
    location: "Monclova, Coah.",
    service: "Señal + Contenido mensual",
    status: "En proceso — Semana 1",
    icon: "🎉",
  },
];

export default function SocialProof() {
  return (
    <Section id="resultados">
      <SectionHeader
        kicker="Primeros clientes activos"
        title="Casos en proceso. Resultados en Mayo."
        accentWord="Resultados"
        subcopy="Arrancamos en Abril con los primeros clientes. Aquí actualizamos los resultados reales conforme lleguen — sin inventar nada."
        compact
      />

      <div className="grid gap-4 md:grid-cols-2 mb-8">
        {INCOMING.map((c, i) => (
          <motion.div
            key={c.business}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: 0.4, ease: [...MOTION.ease], delay: i * 0.07 }}
          >
            <GlowCard glowColor={i === 0 ? "purple" : "cyan"} className="p-5 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{c.icon}</span>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-zinc-100">{c.business}</p>
                <p className="text-[12px] text-zinc-500">{c.location} · {c.service}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1">
                  <Clock className="h-3 w-3 text-cyan-400" />
                  <span className="text-[11px] font-semibold text-cyan-300">{c.status}</span>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Honest message */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={MOTION.viewport}
        transition={{ duration: 0.4, ease: [...MOTION.ease], delay: 0.15 }}
        className="rounded-[20px] border border-white/[0.07] bg-white/[0.03] px-6 py-6 text-center"
      >
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex flex-col items-center">
            <MessageSquare className="h-5 w-5 text-purple-400 mb-1" />
            <p className="text-[11px] text-zinc-500">Mensajes/mes</p>
            <p className="text-[22px] font-black text-zinc-400">— —</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="h-5 w-5 text-cyan-400 mb-1" />
            <p className="text-[11px] text-zinc-500">Leads calificados</p>
            <p className="text-[22px] font-black text-zinc-400">— —</p>
          </div>
        </div>
        <p className="text-[13px] text-zinc-500 max-w-[380px] mx-auto">
          Preferimos mostrarte números reales cuando los tengamos. Vuelve en Mayo —
          o escríbenos y te contamos cómo va el proceso en tiempo real.
        </p>
      </motion.div>
    </Section>
  );
}
