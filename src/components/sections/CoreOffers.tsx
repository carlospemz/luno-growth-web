"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";
import { offerWhatsappUrl, type OFFER_PREFILLS } from "@/config/contact";

/**
 * CoreOffers — the 3 núcleos from the VINCENT Growth Arquitectura
 * Comercial Inicial (April 2026 PDF).
 *
 * Brand System · Content Engine · Demand Engine
 *
 * No buffet. Three systems, each with a clear commercial role:
 * Entrada → Recurrencia → Aceleración.
 */

type Offer = {
  badge: string;
  title: string;
  tagline: string;
  includes: string[];
  model: string;
  price: string;
  priceSub?: string;
  pitch: string;
  offerKey: keyof typeof OFFER_PREFILLS;
  featured?: boolean;
};

const OFFERS: Offer[] = [
  {
    badge: "Entrada",
    title: "Brand System",
    tagline: "La base estratégica y visual. Ordena el negocio antes de ejecutar.",
    includes: [
      "Diagnóstico del negocio",
      "Research de mercado",
      "Strategic core",
      "Brand audit",
      "Brand Kit",
      "Strategic brief",
    ],
    model: "Proyecto único",
    price: "$8K – $18K MXN",
    priceSub: "one-time",
    pitch:
      "Primero armamos tu Brand System. Sin eso, todo lo demás sale improvisado.",
    offerKey: "brand_system",
  },
  {
    badge: "Recurrencia",
    title: "Content Engine",
    tagline:
      "Operación mensual para que tu marca no desaparezca ni improvise.",
    includes: [
      "Planeación mensual",
      "Calendario editorial",
      "Piezas y copies",
      "Stories y posts",
      "Dirección visual continua",
      "Entregables recurrentes",
    ],
    model: "Mensual recurrente",
    price: "$4.5K – $16K",
    priceSub: "MXN / mes",
    pitch:
      "Content Engine mantiene tu marca operando todo el mes sin depender de que tú inventes qué publicar.",
    offerKey: "content_engine",
    featured: true,
  },
  {
    badge: "Aceleración",
    title: "Demand Engine",
    tagline:
      "Sistema de captación con ads, creativos, destino y seguimiento.",
    includes: [
      "Estrategia de captación",
      "Meta Ads",
      "Creativos y copies",
      "Optimización continua",
      "Landing o destino",
      "Seguimiento básico",
    ],
    model: "Setup + fee mensual",
    price: "Setup $5K–$12K",
    priceSub: "$6K–$15K MXN / mes",
    pitch:
      "Demand Engine no es solo publicidad. Es el sistema completo para convertir atención en leads.",
    offerKey: "demand_engine",
  },
];

export default function CoreOffers() {
  return (
    <Section id="offers" className="relative">
      <SectionHeader
        kicker="Oferta · Abril 2026"
        title="Tres sistemas. No más."
        accentWord="No más."
        subcopy="No vendemos buffet. Vendemos tres núcleos. Lo demás son complementos."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 lg:gap-7 mt-10">
        {OFFERS.map((offer, i) => (
          <motion.div
            key={offer.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.6,
              ease: [...MOTION.easeOut],
              delay: i * 0.1,
            }}
            className="flex"
          >
            <GlowCard
              glowColor="orange"
              className="flex w-full flex-col p-6 md:p-7"
            >
              {offer.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                      color: "#0B1E38",
                      boxShadow: "0 2px 12px rgba(232, 185, 49, 0.3)",
                    }}
                  >
                    Más elegido
                  </span>
                </div>
              )}

              {/* Badge */}
              <span
                className="inline-block w-fit rounded-full border px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] mb-4"
                style={{
                  borderColor: "rgba(232, 185, 49, 0.4)",
                  background: "rgba(232, 185, 49, 0.06)",
                  color: "#E8B931",
                }}
              >
                {offer.badge}
              </span>

              {/* Title */}
              <h3
                className="font-headline text-[28px] md:text-[32px] font-bold leading-[1] mb-2"
                style={{ color: "#F5F0E1" }}
              >
                {offer.title}
              </h3>

              {/* Tagline */}
              <p
                className="text-[14px] leading-relaxed mb-5"
                style={{ color: "rgba(245, 240, 225, 0.72)" }}
              >
                {offer.tagline}
              </p>

              {/* Includes list */}
              <ul className="mb-6 space-y-1.5">
                {offer.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[13px]"
                    style={{ color: "rgba(245, 240, 225, 0.85)" }}
                  >
                    <span
                      className="mt-[7px] h-[5px] w-[5px] rounded-full flex-shrink-0"
                      style={{ background: "#E8B931" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price block */}
              <div className="mt-auto pt-5 border-t" style={{ borderColor: "rgba(245, 240, 225, 0.1)" }}>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.15em] mb-2"
                  style={{ color: "rgba(245, 240, 225, 0.5)" }}
                >
                  {offer.model}
                </p>
                <p
                  className="font-mono text-[20px] md:text-[22px] font-medium leading-[1.1]"
                  style={{ color: "#F5F0E1" }}
                >
                  {offer.price}
                </p>
                {offer.priceSub && (
                  <p
                    className="font-mono text-[12px]"
                    style={{ color: "rgba(245, 240, 225, 0.5)" }}
                  >
                    {offer.priceSub}
                  </p>
                )}

                {/* Pitch line */}
                <p
                  className="mt-4 text-[12px] italic leading-relaxed"
                  style={{ color: "rgba(245, 240, 225, 0.62)" }}
                >
                  “{offer.pitch}”
                </p>

                {/* CTA */}
                <a
                  href={offerWhatsappUrl(offer.offerKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 w-full rounded-full px-5 py-3 text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
                  style={{
                    background: offer.featured
                      ? "linear-gradient(135deg, #E8B931, #F5D06A)"
                      : "rgba(232, 185, 49, 0.08)",
                    color: offer.featured ? "#0B1E38" : "#E8B931",
                    border: offer.featured
                      ? "none"
                      : "1px solid rgba(232, 185, 49, 0.4)",
                  }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Hablar de {offer.title}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.12em]"
        style={{ color: "rgba(245, 240, 225, 0.42)" }}
      >
        Precios en MXN · Media spend para Demand Engine va aparte · Sin contratos largos
      </motion.p>
    </Section>
  );
}
