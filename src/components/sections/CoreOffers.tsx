"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Compass, Waves, Flame } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";
import { offerWaAnchorProps, type OFFER_PREFILLS } from "@/config/contact";

type Offer = {
  badge: string;
  icon: LucideIcon;
  title: string;
  promise: string;
  features: string[];
  price: string;
  priceSub: string;
  note?: string;
  offerKey: keyof typeof OFFER_PREFILLS;
  accent: string;
  accentGlow: string;
  accentSoft: string;
  accentBorder: string;
  ribbon: string;
  ribbonStyle: "cobalt" | "gold" | "ember";
};

const OFFERS: Offer[] = [
  {
    badge: "Entrada",
    icon: Compass,
    title: "Brand System",
    promise: "Ordena tu marca antes de ejecutar.",
    features: [
      "Diagnóstico del negocio",
      "Research de mercado",
      "Strategic core + brand audit",
      "Brand Kit + strategic brief",
    ],
    price: "$8K – $18K",
    priceSub: "MXN · one-time",
    offerKey: "brand_system",
    accent: "#7B9CC4",
    accentGlow: "rgba(123, 156, 196, 0.2)",
    accentSoft: "rgba(123, 156, 196, 0.07)",
    accentBorder: "rgba(123, 156, 196, 0.28)",
    ribbon: "Punto de entrada",
    ribbonStyle: "cobalt",
  },
  {
    badge: "Recurrencia",
    icon: Waves,
    title: "Content Engine",
    promise: "Mantiene tu marca operando todo el mes.",
    features: [
      "Planeación + calendario",
      "Piezas, copies y stories",
      "Dirección visual continua",
      "Entregables recurrentes",
    ],
    price: "$4.5K – $16K",
    priceSub: "MXN / mes",
    offerKey: "content_engine",
    accent: "#E8B931",
    accentGlow: "rgba(232, 185, 49, 0.28)",
    accentSoft: "rgba(232, 185, 49, 0.08)",
    accentBorder: "rgba(232, 185, 49, 0.45)",
    ribbon: "Más elegido",
    ribbonStyle: "gold",
  },
  {
    badge: "Aceleración",
    icon: Flame,
    title: "Demand Engine",
    promise: "Convierte atención en leads.",
    features: [
      "Estrategia + Meta Ads",
      "Creativos y copies",
      "Landing de destino",
      "Seguimiento básico",
    ],
    price: "Setup $5K",
    priceSub: "+ $6K–$15K / mes",
    note: "Media spend aparte",
    offerKey: "demand_engine",
    accent: "#C9A267",
    accentGlow: "rgba(201, 162, 103, 0.2)",
    accentSoft: "rgba(201, 162, 103, 0.07)",
    accentBorder: "rgba(201, 162, 103, 0.3)",
    ribbon: "Alto impacto",
    ribbonStyle: "ember",
  },
];

function CheckIcon({
  color,
  className = "",
}: {
  color: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.5" stroke={color} strokeWidth="1" fill="none" />
      <path
        d="M5.5 8.5L7 10L11 6"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingDiamond({
  color,
  size = 6,
  delay = 0,
  className = "",
}: {
  color: string;
  size?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        y: [0, -6, 0],
        opacity: [0.3, 0.7, 0.3],
        rotate: [45, 45, 45],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          background: color,
          transform: "rotate(45deg)",
          borderRadius: 1,
        }}
      />
    </motion.div>
  );
}

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const Icon = offer.icon;

  const ribbonColors = {
    cobalt: {
      bg: "rgba(123, 156, 196, 0.1)",
      border: "rgba(123, 156, 196, 0.28)",
      text: "#7B9CC4",
    },
    gold: {
      bg: "rgba(232, 185, 49, 0.1)",
      border: "rgba(232, 185, 49, 0.35)",
      text: "#E8B931",
    },
    ember: {
      bg: "rgba(201, 162, 103, 0.1)",
      border: "rgba(201, 162, 103, 0.28)",
      text: "#C9A267",
    },
  };

  const rc = ribbonColors[offer.ribbonStyle];
  const isCenter = index === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: [...MOTION.easeOut],
        delay: index * 0.1,
      }}
      className="group relative"
    >
      {/* Ambient glow behind card */}
      <div
        className="absolute -inset-3 rounded-[36px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none"
        style={{ background: offer.accentGlow }}
      />

      {/* Floating diamonds */}
      <FloatingDiamond
        color={offer.accent}
        size={5}
        delay={index * 0.5}
        className="top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <FloatingDiamond
        color={offer.accent}
        size={4}
        delay={index * 0.5 + 1.5}
        className="bottom-8 left-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <div
        className={`relative rounded-3xl p-[1.5px] overflow-hidden transition-all duration-500 ${
          isCenter ? "md:-mt-4 md:mb-4" : ""
        }`}
        style={{
          background: `linear-gradient(135deg, ${offer.accentBorder}, transparent 50%, ${offer.accentBorder})`,
        }}
      >
        {/* Shimmer sweep on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${offer.accentGlow} 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />

        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: `linear-gradient(180deg, rgba(11, 30, 56, 0.95) 0%, rgba(11, 30, 56, 0.98) 100%)`,
            boxShadow: `0 16px 48px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px ${offer.accentSoft}`,
          }}
        >
          {/* Top accent line */}
          <div
            className="h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${offer.accent}, transparent)`,
            }}
          />

          {/* Inner card */}
          <div className="p-7 md:p-8 pb-0">
            <div className="mb-6 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {/* Animated icon container */}
                  <motion.span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl shrink-0 relative"
                    style={{
                      background: offer.accentSoft,
                      border: `1px solid ${offer.accentBorder}`,
                      color: offer.accent,
                    }}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Icon glow pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        boxShadow: [
                          `0 0 0px ${offer.accentGlow}`,
                          `0 0 16px ${offer.accentGlow}`,
                          `0 0 0px ${offer.accentGlow}`,
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <Icon className="h-5 w-5 relative z-10" />
                  </motion.span>

                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: `${offer.accent}99` }}
                  >
                    {offer.badge}
                  </span>
                </div>

                <h2
                  className="font-headline text-[28px] md:text-[34px] font-bold tracking-tight leading-[1]"
                  style={{ color: "#F5F0E1" }}
                >
                  {offer.title}
                </h2>
                <p
                  className="mt-2.5 text-[14px] leading-[1.5]"
                  style={{ color: "rgba(245, 240, 225, 0.58)" }}
                >
                  {offer.promise}
                </p>
              </div>

              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold whitespace-nowrap shrink-0 backdrop-blur"
                style={{
                  background: rc.bg,
                  border: `1px solid ${rc.border}`,
                  color: rc.text,
                  letterSpacing: "0.04em",
                }}
              >
                {offer.ribbon}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline mb-7">
              <span
                className="font-headline font-bold tracking-tight"
                style={{
                  color: offer.accent,
                  fontSize: "clamp(38px, 5vw, 50px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                }}
              >
                {offer.price}
              </span>
              <span
                className="text-[14px] ml-2"
                style={{ color: "rgba(245, 240, 225, 0.4)" }}
              >
                {offer.priceSub}
              </span>
            </div>

            {/* CTA */}
            <motion.a
              {...offerWaAnchorProps(offer.offerKey)}
              className="w-full rounded-xl font-semibold text-[14px] py-4 flex items-center justify-center gap-2.5 transition-all duration-300 relative overflow-hidden"
              style={{
                background: offer.accent,
                color: "#0B1E38",
                boxShadow: `0 4px 20px -6px ${offer.accentGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`,
              }}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="h-[18px] w-[18px]" />
              Hablar de {offer.title}
            </motion.a>
          </div>

          {/* Divider */}
          <div
            className="mx-7 md:mx-8 my-5"
            style={{
              height: 1,
              background: `linear-gradient(90deg, transparent, ${offer.accentBorder}, transparent)`,
            }}
          />

          {/* Features panel */}
          <div className="px-7 md:px-8 pb-7 md:pb-8">
            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
              {offer.features.map((f, fi) => (
                <motion.div
                  key={f}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.1 + fi * 0.06,
                    ease: [...MOTION.ease],
                  }}
                >
                  <CheckIcon
                    color={offer.accent}
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span
                    className="text-[12.5px] font-medium leading-[1.4]"
                    style={{ color: "rgba(245, 240, 225, 0.78)" }}
                  >
                    {f}
                  </span>
                </motion.div>
              ))}
            </div>

            {offer.note && (
              <p
                className="mt-6 pt-4 border-t text-[10.5px] font-mono uppercase tracking-[0.18em]"
                style={{
                  borderColor: offer.accentSoft,
                  color: `${offer.accent}77`,
                }}
              >
                {offer.note}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoreOffers() {
  return (
    <Section id="offers" className="relative">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <SectionHeader
        kicker="Oferta actual"
        title="Tres sistemas. No más."
        accentWord="No más."
        subcopy="No vendemos buffet. Cada sistema resuelve una etapa distinta del crecimiento. Lo demás son complementos, no la puerta de entrada."
      />

      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-start">
        {OFFERS.map((offer, i) => (
          <OfferCard key={offer.title} offer={offer} index={i} />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.18em]"
        style={{ color: "rgba(245, 240, 225, 0.45)" }}
      >
        Precios en MXN · Media spend de Demand Engine va aparte · Sin contratos largos
      </motion.p>
    </Section>
  );
}
