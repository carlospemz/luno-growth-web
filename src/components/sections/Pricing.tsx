"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GlitchButton from "@/components/ui/GlitchButton";
import SectionNote from "@/components/ui/SectionNote";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

type Tier = "silver" | "gold" | "onyx";

const PACKAGES: {
  name: string;
  price: string;
  monthly: string;
  tagline: string;
  features: string[];
  tier: Tier;
  badge?: string;
}[] = [
  {
    name: "Señal",
    price: "$5,000",
    monthly: "$8,500",
    tagline: "Presencia digital sólida sin contratar equipo propio.",
    features: [
      "Instagram + Facebook (12 posts/mes)",
      "Diseños con IA por marca",
      "Copy + hashtags + programación",
      "Calendario de contenido mensual",
      "Historias semanales (4/semana)",
      "Reporte mensual de resultados",
    ],
    tier: "silver",
  },
  {
    name: "Sistema",
    price: "$8,000",
    monthly: "$19,500",
    tagline: "Genera leads y automatiza la atención al cliente.",
    features: [
      "Todo de Señal",
      "Landing page de conversión",
      "Chatbot WhatsApp 24/7",
      "Gestión de Meta Ads",
      "16 posts/mes + 2 Reels",
      "Seguimiento automático de prospectos",
      "Reporte de leads y conversión",
    ],
    tier: "gold",
    badge: "Más popular",
  },
  {
    name: "Motor",
    price: "$15,000",
    monthly: "$38,000",
    tagline: "Departamento de marketing completo. Sin contratar a nadie.",
    features: [
      "Todo de Sistema",
      "SEO + posicionamiento local",
      "Automatización del funnel de ventas",
      "Dashboard de resultados en tiempo real",
      "Google Ads + Meta Ads gestionados",
      "Freelancer de contenido local coordinado",
      "Reunión de estrategia mensual",
    ],
    tier: "onyx",
    badge: "Escala global",
  },
];

/* Tier-specific style tokens */
const TIER_STYLES: Record<Tier, {
  checkClass: string;
  badgeClass: string;
}> = {
  silver: {
    checkClass: "text-purple-500",
    badgeClass: "",
  },
  gold: {
    checkClass: "text-purple-500",
    badgeClass: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-bold rounded-full px-3 py-1 shadow-sm shadow-purple-500/20",
  },
  onyx: {
    checkClass: "text-cyan-500",
    badgeClass: "bg-zinc-900 text-white text-[10px] font-bold rounded-full px-3 py-1",
  },
};

/* Cards fan out: left from left, center rises, right from right */
const cardDirections = [
  { x: -24 },
  { y: 24 },
  { x: 24 },
];

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [...MOTION.ease] },
  },
};

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader kicker="Planes" title={"Todo incluido. Sin\u00A0sorpresas."} accentWord="incluido." />

      <div className="grid gap-5 md:grid-cols-3">
        {PACKAGES.map((pkg, i) => {
          const dir = cardDirections[i];
          const style = TIER_STYLES[pkg.tier];
          return (
            <motion.div
              key={pkg.name}
              initial={{
                opacity: 0,
                x: dir.x ?? 0,
                y: dir.y ?? 12,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.38,
                ease: [...MOTION.ease],
                delay: 0.03 + i * 0.06,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <Card variant={pkg.tier} collider shine={pkg.tier === "gold"} className={`flex flex-col ${pkg.tier === "gold" ? "md:scale-[1.03] md:origin-center" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[18px] font-semibold text-zinc-900">{pkg.name}</h3>
                  {pkg.badge && (
                    <span className={style.badgeClass}>
                      {pkg.badge}
                    </span>
                  )}
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: [...MOTION.ease], delay: 0.08 }}
                  className="mt-1 flex items-baseline gap-1"
                >
                  <span>
                    {pkg.tier === "onyx" && <span className="block text-[12px] font-normal text-zinc-400 tracking-normal leading-none">desde</span>}
                    <span className="text-3xl font-semibold tracking-tight text-zinc-900">{pkg.price}</span>
                    <span className="ml-1 text-[13px] font-normal text-zinc-400">MXN</span>
                  </span>
                </motion.div>
                <p className="mt-1 text-[13px] leading-[1.4] text-zinc-400">
                  <span className="font-semibold text-zinc-900">{pkg.monthly}/mes</span>{" "}
                  <span className="text-zinc-400">· setup fee: {pkg.price}</span>
                </p>
                <p className="mt-2 text-[13px] leading-[1.5] text-zinc-500">{pkg.tagline}</p>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
                  className="mt-5 flex-1 space-y-2.5"
                >
                  {pkg.features.map((f) => (
                    <motion.li key={f} variants={featureVariants} className="flex items-start gap-2.5 text-[14px] text-zinc-700">
                      <span className="mt-0.5 flex-shrink-0">
                        <Check className={`h-4 w-4 ${style.checkClass}`} />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </motion.ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <SectionNote
        summary="Setup fee único. Sin contratos de largo plazo. Cancela cuando quieras."
        detail="El setup fee cubre discovery, onboarding y configuración inicial. La mensualidad cubre la ejecución completa mes a mes."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <GlitchButton href="#brief">
          Llenar brief
        </GlitchButton>
      </motion.div>
    </Section>
  );
}
