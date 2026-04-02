"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap, BookOpen, Users, BarChart3, MessageSquare, Globe, Target, Shield } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GlitchButton from "@/components/ui/GlitchButton";
import { MOTION } from "@/lib/motion";

/* ── Value stack items ── */
const STACK = [
  { icon: MessageSquare, title: "Gestión completa de redes sociales", desc: "Instagram + Facebook. Diseños con IA, copy estratégico, programación y análisis mensual.", value: "$12,000/mes" },
  { icon: Zap, title: "Chatbot WhatsApp 24/7", desc: "Atiende, califica y cierra prospectos automáticamente mientras duermes.", value: "$8,000/mes" },
  { icon: Globe, title: "Landing page de conversión", desc: "Una página diseñada para convertir — integrada con tu chatbot.", value: "$18,000 único" },
  { icon: BarChart3, title: "Estrategia de contenido mensual", desc: "Qué publicar, cuándo y por qué. Basado en tendencias y tu audiencia real.", value: "$6,000/mes" },
  { icon: Target, title: "Gestión de Meta Ads", desc: "Campañas que generan leads reales. Optimizadas semana a semana. (Presupuesto de ads aparte.)", value: "$10,000/mes" },
  { icon: BarChart3, title: "Reporte mensual de resultados", desc: "Alcance, leads, conversiones. Números reales, no promesas.", value: "$3,000/mes" },
];

/* ── Bonuses ── */
const BONUSES = [
  { icon: BookOpen, label: "BONO 1", title: "Curso privado: IA para tu negocio", desc: "Aprende a usar IA en tu industria. A tu ritmo, cuando quieras. Acceso de por vida mientras seas cliente.", value: "Val. $4,500" },
  { icon: Users, label: "BONO 2", title: "Comunidad privada de dueños LUNO", desc: "Grupo exclusivo de dueños que escalan con IA + notificaciones semanales de tendencias.", value: "Val. $2,400/año" },
  { icon: Shield, label: "GARANTÍA", title: "Prueba 30 días con resultados medibles", desc: "Al mes te entregamos reporte con alcance, leads y conversiones reales. Si no ves movimiento, no renuevas.", value: "Riesgo = 0" },
];

/* ── Pain points ── */
const PAINS = [
  { emoji: "😰", title: "\"Mi competencia me está ganando clientes\"", desc: "Mientras tú no estás en redes o no publicas seguido, ellos sí. El cliente que no te encontró a ti, le compró a alguien más." },
  { emoji: "🤑", title: "\"Las agencias cobran caro y no entregan\"", desc: "Pagaste $30,000 por una campaña que no sirvió. Nunca supiste qué hicieron ni si valió la pena." },
  { emoji: "🤖", title: "\"No entiendo la IA y me estoy quedando atrás\"", desc: "Todo el mundo habla de IA pero nadie te explica cómo usarla en tu negocio específico. El tiempo corre." },
  { emoji: "⏰", title: "\"No tengo tiempo para hacer todo yo solo\"", desc: "Eres el dueño, el vendedor, el contador y el community manager. Y aun así el marketing no avanza." },
];

/* ── Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.45, ease: [...MOTION.ease], delay: i * 0.07 },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export default function AllInOne() {
  return (
    <>
      {/* ── Pain ── */}
      <Section id="allinone" className="pt-[48px] pb-0">
        <SectionHeader
          kicker="Por qué los negocios no crecen"
          title="¿Te suena familiar?"
          accentWord="familiar?"
          subcopy="Estos son los 4 miedos que frenan a los dueños de negocio en México y LATAM."
          compact
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {PAINS.map((p, i) => (
            <motion.div key={p.title} custom={i} variants={fadeUp}>
              <Card variant="default">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{p.emoji}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-zinc-800 leading-[1.3] mb-1">{p.title}</p>
                    <p className="text-[13px] text-zinc-500 leading-[1.5]">{p.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Solution banner ── */}
      <Section className="py-[32px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
        >
          <Card variant="gold" className="text-center">
            <div className="inline-block rounded-full bg-purple-50 border border-purple-100 px-4 py-1.5 text-[11px] font-semibold tracking-widest text-purple-600 uppercase mb-4">
              La solución
            </div>
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-[-0.02em] text-zinc-900 leading-[1.15] max-w-[500px] mx-auto">
              LUNO convierte tu negocio en uno que trabaja{" "}
              <span className="brand-gradient-text">cuando tú no puedes.</span>
            </h2>
            <p className="mt-3 text-[15px] text-zinc-500 max-w-[440px] mx-auto leading-relaxed">
              Combinamos agentes de inteligencia artificial con estrategas humanos para manejar tu
              marketing completo — desde el diseño hasta la venta — por una sola mensualidad fija.
            </p>
          </Card>
        </motion.div>
      </Section>

      {/* ── Value Stack ── */}
      <Section className="py-0 pb-[24px]">
        <SectionHeader
          kicker="Qué obtienes"
          title="Todo esto. En una sola suscripción."
          accentWord="sola"
          subcopy="Lo que antes costaba un equipo de 5 personas."
          compact
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="mt-8 flex flex-col gap-[10px]"
        >
          {STACK.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} custom={i} variants={fadeUp}>
                <motion.div
                  whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(168,85,247,0.08)" }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start gap-4 rounded-[18px] border border-zinc-200/50 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-xl"
                >
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-purple-50 text-purple-500">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-zinc-800 leading-[1.3]">{item.title}</p>
                    <p className="mt-0.5 text-[13px] text-zinc-500 leading-[1.45]">{item.desc}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-[14px] font-bold text-zinc-700 whitespace-nowrap">{item.value}</p>
                    <p className="text-[11px] text-zinc-400">valor de mercado</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Total */}
          <motion.div custom={STACK.length} variants={fadeUp}
            className="flex items-center justify-between rounded-[16px] bg-zinc-100 px-5 py-4 mt-1">
            <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide">Valor total mensual</span>
            <span className="text-[22px] font-bold text-zinc-400 line-through">$57,000/mes</span>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Price reveal ── */}
      <Section className="py-[40px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
        >
          <Card variant="gold" className="text-center">
            <p className="text-[11px] font-bold tracking-[0.2em] text-purple-500 uppercase mb-3">Tú pagas solo</p>
            <div className="flex items-start justify-center gap-1">
              <span className="text-[24px] font-bold text-zinc-900 mt-3">$</span>
              <span className="text-[72px] md:text-[88px] font-black text-zinc-900 tracking-[-0.04em] leading-none">19,500</span>
              <span className="text-[18px] font-normal text-zinc-400 mt-5">/mes</span>
            </div>
            <p className="mt-2 text-[13px] text-zinc-400">+ $8,000 setup fee único · Sin contratos de largo plazo</p>
            <div className="mt-4 inline-block rounded-full border border-purple-200 bg-purple-50 px-5 py-2 text-[13px] font-semibold text-purple-700">
              Ahorra $37,500 al mes vs. contratar un equipo
            </div>
          </Card>
        </motion.div>
      </Section>

      {/* ── Bonuses ── */}
      <Section className="py-0 pb-[48px]">
        <SectionHeader
          kicker="Bonos exclusivos para suscriptores"
          title="Espera, hay más."
          accentWord="más."
          subcopy="Solo para los que entran al plan Sistema o Motor."
          compact
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="mt-8 flex flex-col gap-4"
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
                      <p className="text-[16px] font-bold text-zinc-900">{bonus.title}</p>
                      <p className="mt-1 text-[13px] text-zinc-500 leading-[1.5]">{bonus.desc}</p>
                    </div>
                    <p className="flex-shrink-0 text-[13px] font-semibold text-purple-600 whitespace-nowrap">{bonus.value}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.1 }}
          className="mt-10 flex flex-col items-center gap-3 text-center"
        >
          <h3 className="text-[20px] font-bold text-zinc-900 max-w-[400px] leading-[1.2]">
            Tu competencia ya tiene IA trabajando para ella.{" "}
            <span className="brand-gradient-text">¿Tú qué esperas?</span>
          </h3>
          <p className="text-[13px] text-zinc-400">Setup en 48h · Sin compromiso · Resultados en 30 días</p>
          <GlitchButton href="https://wa.me/528661234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20de%20LUNO">
            Quiero este plan →
          </GlitchButton>
        </motion.div>
      </Section>
    </>
  );
}
