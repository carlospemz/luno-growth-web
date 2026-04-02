"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

const FOUNDERS = [
  {
    name: "Lalo Villarreal",
    role: "CEO & CMO",
    bio: "Estrategia, ventas y narrativa de marca. Llevo años construyendo sistemas de crecimiento para negocios locales en México. LUNO es la versión que siempre quise tener disponible para cualquier dueño.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
    tags: ["Estrategia", "Ventas", "IA aplicada"],
  },
  {
    name: "Carlos Pemz",
    role: "COO & CPO",
    bio: "Arquitectura, producto y tecnología. Construyo los sistemas que hacen que todo funcione sin que el cliente tenga que tocar nada. Si no escala, no lo construyo.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face",
    tags: ["Producto", "Automatización", "Seguridad"],
  },
];

export default function Founders() {
  return (
    <Section id="nosotros">
      <SectionHeader
        kicker="Quiénes somos"
        title="Le compras a personas, no a una agencia."
        accentWord="personas,"
        subcopy="Somos dos fundadores que construyen y operan LUNO directamente. No hay intermediarios. Tú nos conoces a nosotros."
        compact
      />

      <div className="grid gap-5 md:grid-cols-2">
        {FOUNDERS.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={MOTION.viewport}
            transition={{ duration: 0.45, ease: [...MOTION.ease], delay: i * 0.08 }}
          >
            <GlowCard glowColor={i === 0 ? "purple" : "cyan"} className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="h-16 w-16 rounded-full object-cover flex-shrink-0 ring-2 ring-purple-500/20"
                />
                <div>
                  <p className="text-[17px] font-bold text-zinc-100">{f.name}</p>
                  <p className="text-[13px] text-purple-400 font-medium">{f.role}</p>
                </div>
              </div>

              <p className="text-[14px] text-zinc-400 leading-[1.65]">{f.bio}</p>

              <div className="flex flex-wrap gap-2">
                {f.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-zinc-400">
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
        className="mt-6 text-center text-[13px] text-zinc-500"
      >
        Si tienes preguntas antes de empezar, escríbenos directamente por WhatsApp. Respondemos nosotros.
      </motion.p>
    </Section>
  );
}
