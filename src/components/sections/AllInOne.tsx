"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Zap, BookOpen, Users, BarChart3, MessageSquare, Globe, Target } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowingShadow } from "@/components/ui/GlowingShadow";
import GlitchButton from "@/components/ui/GlitchButton";
import { MOTION } from "@/lib/motion";

/* ── Value stack items ── */
const STACK = [
  {
    icon: MessageSquare,
    title: "Gestión completa de redes",
    desc: "Instagram + Facebook. Diseños, copy, programación y análisis mensual.",
    value: "$12,000",
  },
  {
    icon: Zap,
    title: "Chatbot WhatsApp 24/7",
    desc: "Atiende, califica y cierra prospectos automáticamente mientras duermes.",
    value: "$8,000",
  },
  {
    icon: Globe,
    title: "Landing page de conversión",
    desc: "Una página diseñada para convertir — integrada con tu chatbot.",
    value: "$18,000",
  },
  {
    icon: BarChart3,
    title: "Estrategia de contenido mensual",
    desc: "Qué publicar, cuándo y por qué. Basado en tendencias y tu audiencia real.",
    value: "$6,000",
  },
  {
    icon: Target,
    title: "Gestión de Meta Ads",
    desc: "Campañas que generan leads reales. Optimizadas semana a semana.",
    value: "$10,000",
  },
  {
    icon: BarChart3,
    title: "Reporte mensual de resultados",
    desc: "Alcance, leads, conversiones. Números reales, no promesas.",
    value: "$3,000",
  },
];

/* ── Bonuses ── */
const BONUSES = [
  {
    icon: BookOpen,
    label: "BONO 1",
    title: "Curso privado: IA para tu negocio",
    desc: "Aprende a usar IA en tu industria específica. A tu ritmo, cuando quieras. Acceso de por vida.",
    value: "$4,500",
  },
  {
    icon: Users,
    label: "BONO 2",
    title: "Comunidad privada de dueños LUNO",
    desc: "Grupo exclusivo de dueños que escalan con IA + notificaciones semanales de tendencias.",
    value: "$2,400/año",
  },
];

/* ── Pain points ── */
const PAINS = [
  { emoji: "😰", text: "Tu competencia te está ganando clientes mientras tú no publicas" },
  { emoji: "🤑", text: "Las agencias cobran caro y nunca sabes qué hicieron" },
  { emoji: "🤖", text: "No entiendes la IA y sientes que te quedas atrás" },
  { emoji: "⏰", text: "No tienes tiempo para hacer el marketing tú solo" },
];

/* ── Variants ── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
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
      <Section id="allinone" className="pt-[60px] pb-[20px]">
        <SectionHeader
          kicker="La razón real"
          title="¿Te suena familiar?"
          accentWord="familiar?"
          subcopy="Los 4 problemas que frenan a los negocios en México."
          compact
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={MOTION.viewport}
          className="mt-8 grid gap-3 sm:grid-cols-2"
        >
          {PAINS.map((p, i) => (
            <motion.div
              key={p.text}
              custom={i}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-[16px] border border-red-200/30 bg-red-50/40 px-5 py-4"
            >
              <span className="text-xl">{p.emoji}</span>
              <p className="text-[14px] leading-[1.5] text-zinc-600">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* ── Solution ── */}
      <Section className="py-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
          className="rounded-[24px] bg-gradient-to-br from-purple-50 via-white to-emerald-50/40 border border-purple-100/60 px-8 py-10 text-center"
        >
          <div className="inline-block rounded-full bg-purple-100/80 px-4 py-1.5 text-[11px] font-700 tracking-widest text-purple-600 uppercase mb-4">
            La solución
          </div>
          <h2 className="text-[28px] md:text-[36px] font-bold tracking-[-0.02em] text-zinc-900 leading-[1.15] max-w-[520px] mx-auto">
            LUNO pone tu negocio a trabajar{" "}
            <span className="text-purple-500">cuando tú no puedes.</span>
          </h2>
          <p className="mt-4 text-[16px] text-zinc-500 max-w-[440px] mx-auto leading-relaxed">
            IA + estrategas humanos manejando tu marketing completo — por una
            sola mensualidad fija.
          </p>
        </motion.div>
      </Section>

      {/* ── Value Stack ── */}
      <Section className="py-[20px]">
        <SectionHeader
          kicker="Todo incluido"
          title="Lo que obtienes."
          accentWord="obtienes."
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
              <motion.div custom={i} variants={fadeUp} key={item.title}>
                <GlowingShadow>
                  <div className="flex w-full items-start gap-4 px-5 py-4">
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] bg-purple-50 text-purple-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-white leading-[1.3]">
                        {item.title}
                      </p>
                      <p className="mt-0.5 text-[13px] text-zinc-400 leading-[1.45]">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-[15px] font-bold text-white whitespace-nowrap">
                        {item.value}
                      </p>
                      <p className="text-[11px] text-zinc-500">valor/mes</p>
                    </div>
                  </div>
                </GlowingShadow>
              </motion.div>
            );
          })}

          {/* Total */}
          <motion.div
            custom={STACK.length}
            variants={fadeUp}
            className="flex items-center justify-between rounded-[16px] bg-zinc-100/80 px-5 py-4 mt-1"
          >
            <span className="text-[13px] font-semibold text-zinc-500 uppercase tracking-wide">
              Valor total mensual
            </span>
            <span className="text-[22px] font-bold text-zinc-400 line-through">
              $57,000/mes
            </span>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Price ── */}
      <Section className="py-[40px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
          className="text-center"
        >
          <p className="text-[11px] font-700 tracking-[0.2em] text-purple-500 uppercase mb-3">
            Tú pagas solo
          </p>
          <div className="flex items-start justify-center gap-1">
            <span className="text-[28px] font-bold text-zinc-900 mt-3">$</span>
            <span className="text-[72px] md:text-[96px] font-black text-zinc-900 tracking-[-0.04em] leading-none">
              19,500
            </span>
            <span className="text-[20px] font-normal text-zinc-400 mt-6">/mes</span>
          </div>
          <p className="mt-2 text-[13px] text-zinc-400">
            + $8,000 setup fee único · Sin contratos de largo plazo
          </p>

          <div className="mt-5 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-[13px] font-semibold text-emerald-700">
            Ahorra $37,500 al mes vs. contratar un equipo
          </div>
        </motion.div>
      </Section>

      {/* ── Bonuses ── */}
      <Section className="py-[20px]">
        <SectionHeader
          kicker="Bonos exclusivos"
          title="Espera, hay más."
          accentWord="más."
          subcopy="Solo para suscriptores del plan Sistema o Motor."
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
              <motion.div custom={i} variants={fadeUp} key={bonus.title}>
                <GlowingShadow>
                  <div className="flex w-full items-start gap-4 px-6 py-5">
                    <div className="flex-shrink-0">
                      <span className="inline-block rounded-md bg-purple-500 px-3 py-1 text-[11px] font-bold text-white tracking-wide">
                        {bonus.label}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-[16px] font-bold text-white">{bonus.title}</p>
                      <p className="mt-1 text-[13px] text-zinc-400 leading-[1.5]">{bonus.desc}</p>
                    </div>
                    <p className="flex-shrink-0 text-[14px] font-semibold text-emerald-400 whitespace-nowrap">
                      {bonus.value}
                    </p>
                  </div>
                </GlowingShadow>
              </motion.div>
            );
          })}

          {/* Risk reversal */}
          <motion.div
            custom={BONUSES.length}
            variants={fadeUp}
          >
            <GlowingShadow>
              <div className="flex w-full items-start gap-4 px-6 py-5">
                <div className="flex-shrink-0">
                  <span className="inline-block rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white tracking-wide">
                    GARANTÍA
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-[16px] font-bold text-white">Prueba 30 días con resultados medibles</p>
                  <p className="mt-1 text-[13px] text-zinc-400 leading-[1.5]">
                    Al mes te entregamos reporte con alcance, leads y conversiones reales. Si no ves movimiento, no renuevas. Tu riesgo = cero.
                  </p>
                </div>
              </div>
            </GlowingShadow>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Final CTA ── */}
      <Section className="py-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={MOTION.viewport}
          transition={{ duration: 0.5, ease: [...MOTION.ease] }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h2 className="text-[28px] md:text-[40px] font-bold tracking-[-0.02em] text-zinc-900 leading-[1.1] max-w-[500px]">
            Tu competencia ya tiene IA trabajando para ella.{" "}
            <span className="text-purple-500">¿Tú qué esperas?</span>
          </h2>
          <p className="text-[15px] text-zinc-500 max-w-[380px] leading-relaxed">
            Setup en 48 horas · Sin compromiso · Resultados en 30 días
          </p>
          <GlitchButton href="https://wa.me/528661234567?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20del%20plan%20All%20In%20One%20de%20LUNO">
            Quiero este plan →
          </GlitchButton>
        </motion.div>
      </Section>
    </>
  );
}
