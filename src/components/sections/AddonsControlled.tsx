"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Container from "@/components/ui/Container";
import { MOTION } from "@/lib/motion";
import { offerWaAnchorProps, type OFFER_PREFILLS } from "@/config/contact";

/**
 * AddonsControlled — subordinated to the 3 núcleos.
 *
 * Not a second "cards grid" that fights CoreOffers for attention.
 * A compact, lower-visual-weight strip of three rows, one per
 * add-on, with a clear "Complementos cuando tenga sentido" framing.
 * Lead Ops is marked as restricted (locked, sold only as bundle).
 */

type Addon = {
  badge: string;
  title: string;
  description: string;
  price: string;
  offerKey: keyof typeof OFFER_PREFILLS;
  restricted?: boolean;
};

const ADDONS: Addon[] = [
  {
    badge: "Conversión",
    title: "Website Execution",
    description:
      "Tu sitio no debe ser un folleto digital. Debe ser el lienzo donde tu marca convence y convierte.",
    price: "Landing $6K–$12K · Sitio $12K–$35K",
    offerKey: "website",
  },
  {
    badge: "Retención",
    title: "Local Search",
    description:
      "Si te buscan en Google Maps o búsquedas locales, Local Search evita regalar esa intención a la competencia.",
    price: "Setup $2K–$5K · $3.5K–$7K / mes",
    offerKey: "local_search",
  },
  {
    badge: "Bundle",
    title: "Lead Ops",
    description:
      "Seguimiento básico del lead para que no se enfríe. Solo con contexto de Growth o Website.",
    price: "Setup $4K–$10K · $2K–$5K / mes",
    offerKey: "brand_system",
    restricted: true,
  },
];

export default function AddonsControlled() {
  return (
    <section id="addons" className="relative z-[3] vin-bay-shell is-calm">
      <Container>
        {/* Light kicker — signals subordination */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
          className="mx-auto max-w-[720px] text-center mb-10 md:mb-12"
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

        {/* Stacked rows — one per addon */}
        <div className="mx-auto max-w-[780px] space-y-3 md:space-y-4">
          {ADDONS.map((addon, i) => (
            <motion.div
              key={addon.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                ease: [...MOTION.easeOut],
                delay: i * 0.06,
              }}
              className="relative rounded-2xl border px-5 py-5 md:px-7 md:py-6"
              style={{
                borderColor: addon.restricted
                  ? "rgba(232, 185, 49, 0.28)"
                  : "rgba(245, 240, 225, 0.08)",
                background: addon.restricted
                  ? "rgba(232, 185, 49, 0.035)"
                  : "rgba(245, 240, 225, 0.02)",
              }}
            >
              <div className="flex items-start justify-between gap-4 md:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.22em]"
                      style={{
                        color: addon.restricted
                          ? "rgba(232, 185, 49, 0.88)"
                          : "rgba(245, 240, 225, 0.5)",
                      }}
                    >
                      {addon.badge}
                    </span>
                    {addon.restricted && (
                      <Lock
                        className="h-2.5 w-2.5"
                        style={{ color: "rgba(232, 185, 49, 0.7)" }}
                        aria-label="Add-on restringido"
                      />
                    )}
                  </div>
                  <h3
                    className="font-headline text-[20px] md:text-[22px] font-bold leading-[1.05] mb-2"
                    style={{ color: "#F5F0E1" }}
                  >
                    {addon.title}
                  </h3>
                  <p className="text-[13px] md:text-[14px] leading-relaxed vin-text-muted">
                    {addon.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="vin-data text-[14px] md:text-[15px] font-medium leading-tight">
                    {addon.price}
                  </p>
                  {!addon.restricted && (
                    <a
                      {...offerWaAnchorProps(addon.offerKey)}
                      className="mt-2 inline-block text-[11px] font-semibold transition-colors"
                      style={{ color: "#E8B931" }}
                    >
                      Preguntar →
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center vin-kicker text-[10px]" style={{ color: "rgba(245, 240, 225, 0.45)" }}>
          Lead Ops solo se vende como complemento de Demand Engine o Website
        </p>
      </Container>
    </section>
  );
}
