"use client";

import { motion } from "framer-motion";
import { UserRound, Timer, FileText, Radio } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * SocialProof — honest proof, not vanity.
 *
 * Four statements about *how we work* that are true on day one
 * of the company, not numbers that have to reach a threshold first:
 *
 *   1. Direct founder access
 *   2. Setup en días, no en meses
 *   3. Sin contratos largos
 *   4. Sistemas vivos, no decks
 *
 * The "3 clientes / 100% retention / — agencia tradicional" row
 * was replaced because it read as placeholder sticker.
 */

const PROOFS = [
  {
    icon: UserRound,
    title: "Hablas con los founders",
    body: "No delegamos criterio al principio.",
  },
  {
    icon: Timer,
    title: "Setup en días, no en meses",
    body: "La velocidad importa cuando el negocio ya va tarde.",
  },
  {
    icon: FileText,
    title: "Sin contratos largos",
    body: "Preferimos sostenernos por valor, no por candados.",
  },
  {
    icon: Radio,
    title: "Sistemas vivos",
    body: "No piezas bonitas que se mueren al mes.",
  },
];

export default function SocialProof() {
  return (
    <Section id="como-trabajamos" className="relative">
      <SectionHeader
        kicker="Lo que cuidamos"
        title="Menos humo. Más sistema."
        accentWord="Más sistema."
        subcopy="Cuatro promesas que sostienen el trato desde el primer día."
        compact
      />

      <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
        {PROOFS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              ease: [...MOTION.easeOut],
              delay: i * 0.07,
            }}
            className="vin-module relative flex flex-col"
          >
            <div className="vin-module-header">
              <span>Promise</span>
              <span className="vin-module-id">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="flex gap-5 p-6 md:p-7">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(232, 185, 49, 0.14), rgba(8, 16, 32, 0.9))",
                  boxShadow:
                    "inset 0 1px 0 rgba(245, 240, 225, 0.14), inset 0 -2px 6px rgba(0,0,0,0.55), 0 0 0 1px rgba(232, 185, 49, 0.28)",
                  color: "#E8B931",
                }}
                aria-hidden="true"
              >
                <p.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p
                  className="font-headline text-[18px] md:text-[20px] font-bold leading-[1.1] mb-2"
                  style={{ color: "#F5F0E1" }}
                >
                  {p.title}
                </p>
                <p className="text-[13px] md:text-[14px] leading-relaxed vin-text-muted">
                  {p.body}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
