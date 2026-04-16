"use client";

import { MessageSquare, Paintbrush, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * Process — three-step method.
 *
 * Calm, static icons. No ambient orbital motion, no reply bubble.
 * The brand is nocturnal and precise — the only motion here is
 * the one-time entrance fade-up staggered by index, and the
 * spotlight cursor-follow of GlowCard on hover-capable devices.
 */

const STEPS = [
  {
    icon: MessageSquare,
    title: "Ordenar",
    desc: "Aclaramos marca, oferta y dirección.",
  },
  {
    icon: Paintbrush,
    title: "Operar",
    desc: "Ponemos contenido, estructura y continuidad.",
  },
  {
    icon: Rocket,
    title: "Acelerar",
    desc: "Metemos demanda, conversiones y seguimiento.",
  },
];

export default function Process() {
  return (
    <Section id="process">
      <SectionHeader
        kicker="Método"
        title="Primero ordenamos. Luego operamos. Después aceleramos."
        accentWord="Después aceleramos."
        subcopy="El orden importa. Sin base ordenada, la operación improvisa. Sin operación, la aceleración se pierde."
      />

      {/* Timeline container with vertical line (desktop only) */}
      <div className="relative mt-10 md:mt-14">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: [...MOTION.easeOut], delay: 0.1 }}
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top md:block"
          style={{
            background:
              "linear-gradient(to bottom, rgba(232, 185, 49, 0.3), rgba(232, 185, 49, 0.08), transparent)",
          }}
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  ease: [...MOTION.easeOut],
                  delay: 0.05 + i * 0.08,
                }}
                style={{ willChange: "transform, opacity" }}
                className="vin-module flex flex-col"
              >
                <div className="vin-module-header">
                  <span>Phase</span>
                  <span className="vin-module-id">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 50% 0%, rgba(232, 185, 49, 0.14), rgba(8, 16, 32, 0.9))",
                      boxShadow:
                        "inset 0 1px 0 rgba(245, 240, 225, 0.14), inset 0 -2px 6px rgba(0,0,0,0.55), 0 0 0 1px rgba(232, 185, 49, 0.28)",
                      color: "#E8B931",
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="font-headline text-[22px] md:text-[26px] font-extrabold uppercase leading-[1.02] tracking-tight"
                    style={{ color: "#F5F0E1" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-[1.65] vin-text-muted">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
