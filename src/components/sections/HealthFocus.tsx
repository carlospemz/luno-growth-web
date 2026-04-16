"use client";

import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * HealthFocus — where health-first positioning finally speaks.
 *
 * One explicit section that declares the current focus without
 * closing the door on other sectors. Short, confident, no carousel,
 * no count UI, no fake labels.
 */

const SECTORS = [
  "Consultorios dentales",
  "Consultorios médicos",
  "Clínicas estéticas",
  "Fisioterapia",
  "Psicología",
  "Pediatría",
];

export default function HealthFocus() {
  return (
    <Section id="health-focus" className="relative">
      <SectionHeader
        kicker="Foco actual"
        title="Hoy trabajamos mejor con los que cuidan de otros."
        accentWord="cuidan de otros."
        subcopy="Vincent Growth funciona para cualquier negocio serio, pero en esta etapa estamos enfocándonos activamente en consultorios, clínicas y especialistas. No porque cerremos puertas, sino porque ahí estamos construyendo algo más profundo."
        compact
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [...MOTION.easeOut] }}
        className="mt-10 md:mt-12 mx-auto max-w-[820px]"
      >
        <p
          className="text-center font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] mb-6"
          style={{ color: "rgba(232, 185, 49, 0.7)" }}
        >
          Más cerca de nuestro núcleo de trabajo
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
          {SECTORS.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                ease: [...MOTION.easeOut],
                delay: 0.1 + i * 0.04,
              }}
              className="inline-flex items-center rounded-full border px-4 py-2 text-[12px] md:text-[13px] font-medium"
              style={{
                borderColor: "rgba(232, 185, 49, 0.32)",
                background: "rgba(232, 185, 49, 0.06)",
                color: "#F5F0E1",
              }}
            >
              {s}
            </motion.span>
          ))}
        </div>

        <p
          className="mt-10 text-center text-[14px] md:text-[15px] leading-relaxed mx-auto max-w-[560px]"
          style={{ color: "rgba(245, 240, 225, 0.6)" }}
        >
          Lo demás también cabe a bordo. Pero aquí está nuestro foco.
        </p>
      </motion.div>
    </Section>
  );
}
