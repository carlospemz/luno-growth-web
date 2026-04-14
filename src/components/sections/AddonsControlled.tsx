"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";
import { offerWhatsappUrl, type OFFER_PREFILLS } from "@/config/contact";

type Addon = {
  badge: string;
  title: string;
  description: string;
  price: string;
  priceSub?: string;
  offerKey: keyof typeof OFFER_PREFILLS;
  restricted?: boolean;
};

const ADDONS: Addon[] = [
  {
    badge: "Conversión",
    title: "Website Execution",
    description:
      "Landing o sitio como proceso downstream del Brand System. Copy estructurado, diseño responsive, formularios, SEO on-page.",
    price: "Landing $6–12K",
    priceSub: "Sitio $12–35K MXN",
    offerKey: "website",
  },
  {
    badge: "Retención",
    title: "Local Search",
    description:
      "Google Business + SEO local básico para negocios con presencia física. Optimización, estructura para reseñas y señales locales.",
    price: "Setup $2–5K",
    priceSub: "$3.5–7K MXN / mes",
    offerKey: "local_search",
  },
  {
    badge: "Restringido",
    title: "Lead Ops",
    description:
      "CRM simple con pipeline básico, formularios conectados y handoff a WhatsApp. Solo disponible junto con Demand Engine o Website.",
    price: "Setup $4–10K",
    priceSub: "$2–5K MXN / mes",
    offerKey: "brand_system",
    restricted: true,
  },
];

export default function AddonsControlled() {
  return (
    <Section id="addons" className="relative">
      <SectionHeader
        kicker="Complementos"
        title="Complementos controlados."
        accentWord="controlados."
        subcopy="Agregan valor y ticket, pero solo cuando el contexto comercial ya existe. No son puerta de entrada."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 mt-8">
        {ADDONS.map((addon, i) => (
          <motion.div
            key={addon.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.5,
              ease: [...MOTION.easeOut],
              delay: i * 0.08,
            }}
            className="flex flex-col rounded-[20px] border p-6 transition-all hover:-translate-y-0.5"
            style={{
              borderColor: addon.restricted
                ? "rgba(232, 185, 49, 0.3)"
                : "rgba(245, 240, 225, 0.08)",
              background: addon.restricted
                ? "rgba(232, 185, 49, 0.04)"
                : "rgba(245, 240, 225, 0.025)",
            }}
          >
            {/* Badge row */}
            <div className="mb-4 flex items-center gap-2">
              <span
                className="inline-block rounded-full border px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em]"
                style={{
                  borderColor: addon.restricted
                    ? "rgba(232, 185, 49, 0.5)"
                    : "rgba(245, 240, 225, 0.18)",
                  background: addon.restricted
                    ? "rgba(232, 185, 49, 0.1)"
                    : "rgba(245, 240, 225, 0.04)",
                  color: addon.restricted ? "#E8B931" : "rgba(245, 240, 225, 0.75)",
                }}
              >
                {addon.badge}
              </span>
              {addon.restricted && (
                <span
                  className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em]"
                  style={{ color: "rgba(232, 185, 49, 0.7)" }}
                >
                  <Lock className="h-2.5 w-2.5" />
                  add-on restringido
                </span>
              )}
            </div>

            <h3
              className="font-headline text-[22px] md:text-[24px] font-bold leading-[1.05] mb-3"
              style={{ color: "#F5F0E1" }}
            >
              {addon.title}
            </h3>

            <p
              className="text-[13px] leading-relaxed mb-5 flex-1"
              style={{ color: "rgba(245, 240, 225, 0.7)" }}
            >
              {addon.description}
            </p>

            <div className="pt-4 border-t" style={{ borderColor: "rgba(245, 240, 225, 0.08)" }}>
              <p
                className="font-mono text-[16px] font-medium"
                style={{ color: "#F5F0E1" }}
              >
                {addon.price}
              </p>
              {addon.priceSub && (
                <p
                  className="font-mono text-[11px]"
                  style={{ color: "rgba(245, 240, 225, 0.5)" }}
                >
                  {addon.priceSub}
                </p>
              )}

              {!addon.restricted && (
                <a
                  href={offerWhatsappUrl(addon.offerKey)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-[12px] font-semibold transition-colors"
                  style={{ color: "#E8B931" }}
                >
                  Preguntar por {addon.title} →
                </a>
              )}

              {addon.restricted && (
                <p
                  className="mt-4 text-[11px] italic leading-relaxed"
                  style={{ color: "rgba(245, 240, 225, 0.5)" }}
                >
                  Se vende solo como complemento de Demand Engine o Website. Nunca suelto.
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
