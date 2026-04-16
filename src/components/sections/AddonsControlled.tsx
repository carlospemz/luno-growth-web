"use client";

import { motion } from "framer-motion";
import { Globe, MapPin, GitMerge, Lock, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { MOTION } from "@/lib/motion";
import { offerWaAnchorProps, type OFFER_PREFILLS } from "@/config/contact";

type Addon = {
  badge: string;
  icon: LucideIcon;
  title: string;
  oneLiner: string;
  price: string;
  offerKey: keyof typeof OFFER_PREFILLS;
  restricted?: boolean;
  accent: string;
  accentGlow: string;
  accentSoft: string;
  accentBorder: string;
};

const ADDONS: Addon[] = [
  {
    badge: "Conversión",
    icon: Globe,
    title: "Website Execution",
    oneLiner: "El lienzo donde tu marca convence y convierte.",
    price: "$6K – $35K",
    offerKey: "website",
    accent: "#22D3EE",
    accentGlow: "rgba(34, 211, 238, 0.2)",
    accentSoft: "rgba(34, 211, 238, 0.06)",
    accentBorder: "rgba(34, 211, 238, 0.25)",
  },
  {
    badge: "Retención",
    icon: MapPin,
    title: "Local Search",
    oneLiner: "No regales tus búsquedas locales a la competencia.",
    price: "$3.5K – $7K/mes",
    offerKey: "local_search",
    accent: "#34D399",
    accentGlow: "rgba(52, 211, 153, 0.2)",
    accentSoft: "rgba(52, 211, 153, 0.06)",
    accentBorder: "rgba(52, 211, 153, 0.25)",
  },
  {
    badge: "Bundle",
    icon: GitMerge,
    title: "Lead Ops",
    oneLiner: "Seguimiento del lead. Solo con contexto de Growth o Website.",
    price: "$2K – $5K/mes",
    offerKey: "brand_system",
    restricted: true,
    accent: "#E8B931",
    accentGlow: "rgba(232, 185, 49, 0.2)",
    accentSoft: "rgba(232, 185, 49, 0.06)",
    accentBorder: "rgba(232, 185, 49, 0.3)",
  },
];

function AddonRow({ addon, index }: { addon: Addon; index: number }) {
  const Icon = addon.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.45,
        ease: [...MOTION.easeOut],
        delay: index * 0.08,
      }}
      className="group relative"
    >
      {/* Hover glow */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-600 blur-xl pointer-events-none"
        style={{ background: addon.accentGlow }}
      />

      {/* Row with gradient border */}
      <div
        className="relative rounded-xl p-[1px] overflow-hidden"
        style={{
          background: `linear-gradient(90deg, ${addon.accentBorder}, transparent 40%, transparent 60%, ${addon.accentBorder})`,
        }}
      >
        {/* Shimmer on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${addon.accentGlow} 50%, transparent 60%)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />

        <div
          className="relative rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 px-5 py-4 md:px-6 md:py-4"
          style={{
            background: "rgba(11, 30, 56, 0.96)",
            boxShadow: `0 4px 20px -8px rgba(0, 0, 0, 0.4), 0 0 0 1px ${addon.accentSoft}`,
          }}
        >
          {/* Left accent line (vertical, desktop only) */}
          <div
            className="hidden sm:block absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
            style={{
              background: `linear-gradient(180deg, transparent, ${addon.accent}, transparent)`,
            }}
          />

          {/* Icon + Info */}
          <div className="flex items-center gap-3 sm:flex-1 min-w-0">
            <motion.span
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg shrink-0 relative"
              style={{
                background: addon.accentSoft,
                border: `1px solid ${addon.accentBorder}`,
                color: addon.accent,
              }}
              whileHover={{ scale: 1.1, rotate: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    `0 0 0px ${addon.accentGlow}`,
                    `0 0 10px ${addon.accentGlow}`,
                    `0 0 0px ${addon.accentGlow}`,
                  ],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <Icon className="h-4 w-4 relative z-10" />
            </motion.span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3
                  className="font-headline text-[16px] md:text-[18px] font-bold tracking-tight leading-[1.1]"
                  style={{ color: "#F5F0E1" }}
                >
                  {addon.title}
                </h3>
                {addon.restricted && (
                  <Lock
                    className="h-3 w-3 shrink-0"
                    style={{ color: `${addon.accent}88` }}
                  />
                )}
              </div>
              <p
                className="text-[11px] md:text-[12px] leading-snug mt-0.5 truncate"
                style={{ color: "rgba(245, 240, 225, 0.5)" }}
              >
                {addon.oneLiner}
              </p>
            </div>
          </div>

          {/* Badge */}
          <span
            className="hidden md:inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-semibold shrink-0 mx-4"
            style={{
              background: addon.accentSoft,
              border: `1px solid ${addon.accentBorder}`,
              color: addon.accent,
              letterSpacing: "0.05em",
            }}
          >
            {addon.badge}
          </span>

          {/* Price */}
          <span
            className="font-headline text-[18px] md:text-[20px] font-bold tracking-tight shrink-0 sm:mx-4"
            style={{ color: addon.accent, lineHeight: 1 }}
          >
            {addon.price}
          </span>

          {/* CTA */}
          {!addon.restricted ? (
            <motion.a
              {...offerWaAnchorProps(addon.offerKey)}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[11px] font-semibold shrink-0 transition-all duration-300"
              style={{
                background: addon.accent,
                color: "#0B1E38",
                boxShadow: `0 2px 10px -3px ${addon.accentGlow}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <MessageCircle className="h-3 w-3" />
              Preguntar
            </motion.a>
          ) : (
            <span
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[10px] font-medium shrink-0"
              style={{
                background: addon.accentSoft,
                border: `1px solid ${addon.accentBorder}`,
                color: `${addon.accent}cc`,
              }}
            >
              <Lock className="h-2.5 w-2.5" />
              Solo bundle
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AddonsControlled() {
  return (
    <section id="addons" className="relative z-[3] vin-bay-shell is-calm">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
          className="mx-auto max-w-[820px] text-center mb-8 md:mb-12"
        >
          <p className="vin-kicker text-[10px] md:text-[11px] mb-3">
            Complementos
          </p>
          <p
            className="font-headline text-[26px] md:text-[34px] font-extrabold uppercase leading-[1] tracking-tight"
            style={{ color: "#F5F0E1" }}
          >
            Y tres complementos,{" "}
            <span className="vin-gradient-gold-text">cuando tenga sentido.</span>
          </p>
          <p className="mt-4 text-[14px] md:text-[15px] vin-text-muted">
            Se activan cuando el contexto comercial ya existe. No son la
            entrada. Son la siguiente capa.
          </p>
        </motion.div>

        <div className="mx-auto max-w-[820px] space-y-3">
          {ADDONS.map((addon, i) => (
            <AddonRow key={addon.title} addon={addon} index={i} />
          ))}
        </div>

        <p
          className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "rgba(245, 240, 225, 0.38)" }}
        >
          Lead Ops solo se vende como complemento de Demand Engine o Website
        </p>
      </Container>
    </section>
  );
}
