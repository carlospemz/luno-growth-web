"use client";

import { motion } from "framer-motion";
import { Star, TrendingUp, MessageSquare, Users } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

const STATS = [
  { icon: MessageSquare, value: "247", label: "mensajes en 30 días", color: "text-purple-400" },
  { icon: TrendingUp, value: "3.2x", label: "más reservaciones", color: "text-cyan-400" },
  { icon: Users, value: "68", label: "leads calificados", color: "text-purple-400" },
];

const TESTIMONIALS = [
  {
    name: "Roberto Martínez",
    role: "Dueño, HOK Nightclub — Monclova",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    quote: "Antes respondíamos a mano cada mensaje y perdíamos clientes en fin de semana. Con LUNO el chatbot atiende a las 3am cuando nosotros no podemos. En el primer mes tuvimos 247 mensajes y cerramos 68 reservaciones.",
    stars: 5,
  },
  {
    name: "Annia Villarreal",
    role: "Directora, Brincando Ando — Salón de Fiestas",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    quote: "Yo pensaba que era para negocios grandes. Pero desde la primera semana ya teníamos contenido publicado y mensajes llegando. No tuve que hacer nada — ellos se encargaron de todo.",
    stars: 5,
  },
];

export default function SocialProof() {
  return (
    <Section id="resultados">
      <SectionHeader
        kicker="Resultados reales"
        title="Lo que dicen nuestros primeros clientes."
        accentWord="primeros"
        subcopy="Estos son los negocios que ya operan con LUNO. Resultados en los primeros 30 días."
        compact
      />

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={MOTION.viewport}
        transition={{ duration: 0.5, ease: [...MOTION.ease] }}
        className="mb-8 grid grid-cols-3 gap-3"
      >
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex flex-col items-center text-center rounded-[16px] border border-white/[0.07] bg-white/[0.03] px-3 py-4">
              <Icon className={`h-4 w-4 mb-2 ${s.color}`} />
              <p className={`text-[28px] md:text-[36px] font-black leading-none ${s.color}`}>{s.value}</p>
              <p className="text-[11px] text-zinc-500 mt-1 leading-tight">{s.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Testimonials */}
      <div className="grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: 0.4, ease: [...MOTION.ease], delay: i * 0.08 }}
          >
            <GlowCard glowColor={i % 2 === 0 ? "purple" : "cyan"} className="p-6 flex flex-col gap-4 h-full">
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star key={si} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-[14px] text-zinc-300 leading-[1.65] flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-[14px] font-semibold text-zinc-100">{t.name}</p>
                  <p className="text-[12px] text-zinc-500">{t.role}</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
