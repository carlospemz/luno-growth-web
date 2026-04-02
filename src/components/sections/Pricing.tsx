"use client";

import { Check } from "lucide-react";
import { motion, type Variants, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import GlitchButton from "@/components/ui/GlitchButton";
import SectionNote from "@/components/ui/SectionNote";
import { MOTION } from "@/lib/motion";

type Tier = "silver" | "gold" | "onyx";

const PACKAGES: {
  name: string;
  setup: string;
  monthly: string;
  tagline: string;
  features: string[];
  tier: Tier;
  badge?: string;
}[] = [
  {
    name: "Señal",
    setup: "$6,000",
    monthly: "$14,000",
    tagline: "Sistema de leads básico. Presencia + conversación + seguimiento.",
    features: [
      "Landing page de conversión",
      "WhatsApp funnel + bot básico",
      "Instagram + Facebook (12 posts/mes)",
      "Google Business Profile optimizado",
      "Automatización de seguimiento",
      "Reporte mensual de resultados",
    ],
    tier: "silver",
  },
  {
    name: "Sistema",
    setup: "$10,000",
    monthly: "$25,000",
    tagline: "Demanda + conversión. Ads activos que traen mensajes todos los días.",
    features: [
      "Todo de Señal",
      "Meta Ads + Google Ads gestionados",
      "Estrategia mensual de contenido",
      "16 posts/mes + 2 Reels",
      "Chatbot WhatsApp 24/7",
      "Seguimiento automático de prospectos",
      "Reporte de leads y conversión",
    ],
    tier: "gold",
    badge: "Más popular",
  },
  {
    name: "Motor",
    setup: "$15,000",
    monthly: "$45,000",
    tagline: "Departamento de marketing completo operando sin que tú muevas un dedo.",
    features: [
      "Todo de Sistema",
      "SEO + posicionamiento local",
      "Freelancer de contenido coordinado",
      "Dirección creativa remota",
      "Automatización del funnel de ventas",
      "Dashboard de resultados en tiempo real",
      "Reunión de estrategia mensual",
    ],
    tier: "onyx",
    badge: "Full stack",
  },
];

/* Tier-specific style tokens */
const TIER_STYLES: Record<Tier, { checkClass: string; badgeClass: string }> = {
  silver: {
    checkClass: "text-purple-400",
    badgeClass: "",
  },
  gold: {
    checkClass: "text-purple-400",
    badgeClass: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-bold rounded-full px-3 py-1",
  },
  onyx: {
    checkClass: "text-cyan-400",
    badgeClass: "bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold rounded-full px-3 py-1",
  },
};

const cardDirections = [{ x: -24 }, { y: 24 }, { x: 24 }];

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [...MOTION.ease] },
  },
};

/* ── Count-up number animation ── */
function CountUp({ target, prefix = "$", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    prefix + Math.round(v).toLocaleString("es-MX") + suffix
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [inView, count, target]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeader kicker="Planes" title={"Todo incluido. Sin\u00A0sorpresas."} accentWord="incluido." />

      <div className="grid gap-5 md:grid-cols-3">
        {PACKAGES.map((pkg, i) => {
          const dir = cardDirections[i];
          const style = TIER_STYLES[pkg.tier];
          // Extract numeric value for count-up (strip $ and commas)
          const monthlyNum = parseInt(pkg.monthly.replace(/[$,]/g, ""), 10);
          return (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, x: dir.x ?? 0, y: dir.y ?? 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 0.38, ease: [...MOTION.ease], delay: 0.03 + i * 0.06 }}
              style={{ willChange: "transform, opacity" }}
            >
              <Card variant={pkg.tier} collider shine={pkg.tier === "gold"} className={`flex flex-col ${pkg.tier === "gold" ? "md:scale-[1.03] md:origin-center" : ""}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[18px] font-semibold text-zinc-100">{pkg.name}</h3>
                  {pkg.badge && (
                    <span className={style.badgeClass}>{pkg.badge}</span>
                  )}
                </div>

                {/* Price with count-up */}
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-[32px] font-bold tracking-tight text-zinc-100">
                    <CountUp target={monthlyNum} />
                  </span>
                  <span className="text-[13px] text-zinc-500">MXN/mes</span>
                </div>
                <p className="text-[12px] text-zinc-500 mt-0.5">
                  + {pkg.setup} setup fee único
                </p>

                <p className="mt-3 text-[13px] leading-[1.5] text-zinc-400">{pkg.tagline}</p>

                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
                  className="mt-5 flex-1 space-y-2.5"
                >
                  {pkg.features.map((f) => (
                    <motion.li key={f} variants={featureVariants} className="flex items-start gap-2.5 text-[13.5px] text-zinc-300">
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
        summary="Setup fee único. Sin contratos de largo plazo. Pauta publicitaria siempre aparte."
        detail="El setup fee cubre discovery, onboarding y configuración inicial. El presupuesto de ads (Meta/Google) va directo a las plataformas — tú decides cuánto invertir."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.1 }}
        className="mt-10 flex justify-center"
      >
        <GlitchButton href="#brief">Llenar brief</GlitchButton>
      </motion.div>
    </Section>
  );
}
