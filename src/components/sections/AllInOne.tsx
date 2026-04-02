"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap, BookOpen, Users, BarChart3, MessageSquare, Globe, Target, Shield } from "lucide-react";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GlitchButton from "@/components/ui/GlitchButton";
import { MOTION } from "@/lib/motion";

/* ── Value stack items ── */
const STACK = [
  { icon: MessageSquare, title: "Gestión completa de redes sociales", desc: "Instagram + Facebook. Diseños con IA, copy estratégico, programación y análisis mensual.", value: "$12,000/mes" },
  { icon: Zap, title: "Chatbot WhatsApp 24/7", desc: "Atiende, califica y cierra prospectos automáticamente mientras duermes.", value: "$8,000/mes" },
  { icon: Globe, title: "Landing page de conversión", desc: "Una página diseñada para convertir — integrada con tu chatbot.", value: "$18,000 único" },
  { icon: BarChart3, title: "Estrategia de contenido mensual", desc: "Qué publicar, cuándo y por qué. Basado en tendencias y tu audiencia real.", value: "$6,000/mes" },
  { icon: Target, title: "Gestión de Meta Ads", desc: "Campañas que generan leads reales. Optimizadas semana a semana.", value: "$10,000/mes" },
  { icon: BarChart3, title: "Reporte mensual de resultados", desc: "Alcance, leads, conversiones. Números reales, no promesas.", value: "$3,000/mes" },
];

/* ── Bonuses ── */
const BONUSES = [
  { icon: BookOpen, label: "BONO 1", title: "Curso privado: IA para tu negocio", desc: "Aprende a usar IA en tu industria. A tu ritmo. Acceso de por vida mientras seas cliente.", value: "Val. $4,500" },
  { icon: Users, label: "BONO 2", title: "Comunidad privada de dueños LUNO", desc: "Grupo exclusivo de dueños que escalan con IA + notificaciones semanales de tendencias.", value: "Val. $2,400/año" },
  { icon: Shield, label: "GARANTÍA", title: "Prueba 30 días con resultados medibles", desc: "Al mes te entregamos reporte con alcance, leads y conversiones reales. Si no ves movimiento, no renuevas.", value: "Riesgo = 0" },
];

/* ── Pain points ── */
const PAINS = [
  { emoji: "😰", title: "\"Mi competencia me está ganando clientes\"", desc: "Mientras tú no estás en redes, ellos sí. El cliente que no te encontró a ti, le compró a alguien más." },
  { emoji: "🤑", title: "\"Las agencias cobran caro y no entregan\"", desc: "Pagaste $30,000 por una campaña que no sirvió. Nunca supiste qué hicieron ni si valió la pena." },
  { emoji: "🤖", title: "\"No entiendo la IA y me estoy quedando atrás\"", desc: "Todo el mundo habla de IA pero nadie te explica cómo usarla en tu negocio específico." },
  { emoji: "⏰", title: "\"No tengo tiempo para hacer todo yo solo\"", desc: "Eres el dueño, el vendedor, el contador y el community manager. Y el marketing no avanza." },
];

/* ── Animations ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [...MOTION.ease], delay: i * 0.07 },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

/* ── Big narrative question ── */
function NarrativeQuestion({ kicker, question, sub }: { kicker: string; question: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-16 md:py-24 max-w-[760px] mx-auto"
    >
      <p className="section-title mb-5">{kicker}</p>
      <h2 className="text-[42px] md:text-[64px] lg:text-[72px] font-black tracking-[-0.03em] text-zinc-100 leading-[1.05]"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {question}
      </h2>
      {sub && (
        <p className="mt-5 text-[16px] md:text-[18px] text-zinc-400 leading-relaxed max-w-[520px] mx-auto">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export default function AllInOne() {
  return (
    <div id="allinone">

      {/* ══════════════════════════════════════════════════
          BLOQUE 1 — PREGUNTA: ¿Por qué no crecen?
      ══════════════════════════════════════════════════ */}
      <Section className="pb-0">
        <NarrativeQuestion
          kicker="Por qué los negocios no crecen"
          question="¿Te suena familiar?"
          sub="Estos son los 4 miedos que frenan a los dueños de negocio en México y LATAM."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="grid gap-4 sm:grid-cols-2"
        >
          {PAINS.map((p, i) => (
            <motion.div key={p.title} custom={i} variants={fadeUp}>
              <Card variant="default">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-zinc-100 leading-[1.3] mb-1">{p.title}</p>
                    <p className="text-[13px] text-zinc-400 leading-[1.5]">{p.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════
          BLOQUE 2 — PREGUNTA: ¿Y si no es tu culpa?
      ══════════════════════════════════════════════════ */}
      <Section className="pb-0">
        <NarrativeQuestion
          kicker="La solución existe"
          question="¿Y si no es tu culpa?"
          sub="El mercado cambió. Tu competencia ya tiene un sistema. Tú también puedes tenerlo — sin contratar un equipo."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
        >
          <Card variant="gold" className="text-center">
            <h3 className="text-[22px] md:text-[28px] font-bold tracking-[-0.02em] text-zinc-100 leading-[1.2] max-w-[500px] mx-auto">
              LUNO convierte tu negocio en uno que trabaja{" "}
              <span className="brand-gradient-text">cuando tú no puedes.</span>
            </h3>
            <p className="mt-3 text-[15px] text-zinc-400 max-w-[440px] mx-auto leading-relaxed">
              Combinamos agentes de inteligencia artificial con estrategas humanos para manejar tu
              marketing completo — desde el diseño hasta la venta — por una sola mensualidad fija.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════
          BLOQUE 3 — PREGUNTA: ¿Qué obtienes exactamente?
      ══════════════════════════════════════════════════ */}
      <Section className="pb-0">
        <NarrativeQuestion
          kicker="Lo que obtienes"
          question="Todo esto. En una sola suscripción."
          sub="Lo que antes costaba un equipo de 5 personas."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="flex flex-col gap-[10px]"
        >
          {STACK.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} custom={i} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 rounded-[18px] border border-white/[0.08] bg-white/[0.04] px-5 py-4 backdrop-blur-xl"
                >
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-purple-500/15 text-purple-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-zinc-100 leading-[1.3]">{item.title}</p>
                    <p className="mt-0.5 text-[13px] text-zinc-400 leading-[1.45]">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[14px] font-bold text-zinc-300 whitespace-nowrap">{item.value}</p>
                    <p className="text-[11px] text-zinc-500">valor de mercado</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Total tachado */}
          <motion.div custom={STACK.length} variants={fadeUp}
            className="flex items-center justify-between rounded-[16px] border border-white/[0.06] bg-white/[0.03] px-5 py-4 mt-1">
            <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide">Valor total mensual</span>
            <span className="text-[22px] font-bold text-zinc-600 line-through">$57,000/mes</span>
          </motion.div>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════
          BLOQUE 4 — PREGUNTA: ¿Cuánto cuesta?
      ══════════════════════════════════════════════════ */}
      <Section className="pb-0">
        <NarrativeQuestion
          kicker="El precio"
          question="¿Cuánto cuesta tenerlo todo?"
          sub="Menos de lo que pagas en un empleado de medio tiempo."
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
        >
          <Card variant="gold" className="text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] text-purple-400 uppercase mb-3">Tú pagas solo</p>
            <div className="flex items-start justify-center gap-1">
              <span className="text-[24px] font-bold text-zinc-100 mt-3">$</span>
              <span className="text-[72px] md:text-[88px] font-black text-zinc-100 tracking-[-0.04em] leading-none">19,500</span>
              <span className="text-[18px] font-normal text-zinc-400 mt-5">/mes</span>
            </div>
            <p className="mt-2 text-[13px] text-zinc-500">+ $8,000 setup fee único · Sin contratos de largo plazo</p>
            <div className="mt-4 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-5 py-2 text-[13px] font-semibold text-purple-300">
              Ahorra $37,500 al mes vs. contratar un equipo
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* ══════════════════════════════════════════════════
          BLOQUE 5 — Bonos + CTA
      ══════════════════════════════════════════════════ */}
      <Section className="pb-[64px]">
        <NarrativeQuestion
          kicker="Espera, hay más"
          question="Bonos exclusivos para suscriptores."
          sub="Solo para los que entran al plan Sistema o Motor."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="flex flex-col gap-4"
        >
          {BONUSES.map((bonus, i) => {
            const Icon = bonus.icon;
            return (
              <motion.div key={bonus.title} custom={i} variants={fadeUp}>
                <Card variant={i === 1 ? "gold" : "default"} shine={i === 1}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className={`inline-block rounded-md px-3 py-1 text-[11px] font-bold tracking-wide text-white ${i === 2 ? "bg-emerald-500" : "bg-gradient-to-r from-purple-600 to-cyan-500"}`}>
                        {bonus.label}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-bold text-zinc-100">{bonus.title}</p>
                      <p className="mt-1 text-[13px] text-zinc-400 leading-[1.5]">{bonus.desc}</p>
                    </div>
                    <p className="flex-shrink-0 text-[13px] font-semibold text-purple-400 whitespace-nowrap">{bonus.value}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.15 }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <h3 className="text-[22px] font-bold text-zinc-100 max-w-[420px] leading-[1.2]">
            Tu competencia ya tiene IA trabajando para ella.{" "}
            <span className="brand-gradient-text">¿Tú qué esperas?</span>
          </h3>
          <p className="text-[13px] text-zinc-500">Setup en 48h · Sin compromiso · Resultados en 30 días</p>
          <GlitchButton href="https://wa.me/528661234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20LUNO">
            Quiero este plan →
          </GlitchButton>
        </motion.div>
      </Section>

    </div>
  );
}
