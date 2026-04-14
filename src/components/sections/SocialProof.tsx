"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * SocialProof — honest version.
 *
 * No fake numbers. Just a mono-typography block stating what is
 * real right now: we have clients, they're active, we're here.
 * The vanity numbers come later when we have them.
 */

const STATS = [
  { value: "03", label: "clientes Growth activos" },
  { value: "100%", label: "retención mes a mes" },
  { value: "—", label: "agencia tradicional" },
];

export default function SocialProof() {
  return (
    <Section id="resultados" className="py-14 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
        className="mx-auto max-w-[820px]"
      >
        <div
          className="rounded-[24px] border px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-around gap-6 md:gap-4"
          style={{
            borderColor: "rgba(245, 240, 225, 0.1)",
            background: "rgba(245, 240, 225, 0.025)",
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p
                className="font-mono text-[40px] md:text-[52px] font-medium leading-none mb-2"
                style={{ color: "#E8B931" }}
              >
                {s.value}
              </p>
              <p
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(245, 240, 225, 0.55)" }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p
          className="mt-5 text-center font-mono text-[11px] uppercase tracking-[0.14em]"
          style={{ color: "rgba(245, 240, 225, 0.42)" }}
        >
          Los números vanidosos llegan cuando sean reales. Preferimos esto a inventar.
        </p>
      </motion.div>
    </Section>
  );
}
