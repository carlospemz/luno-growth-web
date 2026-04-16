"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { MOTION } from "@/lib/motion";

/**
 * SalesSequence — compact map.
 *
 * One compact row on desktop, one compact vertical list on mobile.
 * Five steps, one line each. No duplicated titles, no fake
 * connectors that look like broken UI. Reads in under 10 seconds.
 */

const STEPS = [
  {
    num: "01",
    phase: "Entrada",
    offer: "Brand System",
    detail: "Cuando el negocio está ambiguo, desordenado o sin canon claro.",
  },
  {
    num: "02",
    phase: "Recurrencia",
    offer: "Content Engine",
    detail: "Cuando ya existe dirección y toca sostener presencia.",
  },
  {
    num: "03",
    phase: "Aceleración",
    offer: "Demand Engine",
    detail: "Cuando el cliente quiere volumen, leads o citas.",
  },
  {
    num: "04",
    phase: "Conversión",
    offer: "Website Execution",
    detail: "Cuando el sitio sí va a elevar credibilidad o resultados.",
  },
  {
    num: "05",
    phase: "Retención",
    offer: "Local Search / Lead Ops",
    detail: "Solo cuando de verdad hacen sentido.",
  },
];

export default function SalesSequence() {
  return (
    <section id="sequence" className="relative z-[3] vin-bay-shell">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
          className="mx-auto max-w-[720px] text-center mb-12 md:mb-16"
        >
          <p className="vin-kicker text-[10px] md:text-[11px] mb-3">
            Secuencia
          </p>
          <p
            className="font-headline text-[28px] md:text-[40px] font-extrabold uppercase leading-[1] tracking-tight"
            style={{ color: "#F5F0E1" }}
          >
            Una secuencia,{" "}
            <span className="vin-gradient-gold-text">no un catálogo.</span>
          </p>
          <p className="mt-4 text-[14px] md:text-[15px] vin-text-muted">
            Entras por donde más duele. Avanzas cuando ya existe contexto.
            Así se crece con más claridad y menos desperdicio.
          </p>
        </motion.div>

        {/* Mobile: vertical spine with dashed connector */}
        <div className="md:hidden relative max-w-[420px] mx-auto">
          <div
            aria-hidden="true"
            className="absolute left-5 top-3 bottom-3 w-px"
            style={{
              background:
                "repeating-linear-gradient(to bottom, rgba(232, 185, 49, 0.45) 0 4px, transparent 4px 10px)",
            }}
          />
          <ol className="relative space-y-5">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  ease: [...MOTION.easeOut],
                  delay: i * 0.06,
                }}
                className="relative flex items-center gap-4 pl-1"
              >
                <div className="vin-node relative z-10 shrink-0">{step.num}</div>
                <div className="min-w-0 flex-1">
                  <p className="vin-kicker text-[10px] mb-0.5">
                    {step.phase}
                  </p>
                  <p
                    className="font-headline text-[17px] font-bold leading-tight"
                    style={{ color: "#F5F0E1" }}
                  >
                    {step.offer}
                  </p>
                  <p
                    className="mt-1 text-[12px] leading-[1.45]"
                    style={{ color: "rgba(245, 240, 225, 0.55)" }}
                  >
                    {step.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Desktop: horizontal strip, compact */}
        <div className="hidden md:block relative">
          <motion.div
            className="absolute top-5 left-[6%] right-[6%] h-[2px] pointer-events-none"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              background:
                "repeating-linear-gradient(to right, rgba(232, 185, 49, 0.55) 0 5px, transparent 5px 11px)",
              transformOrigin: "left",
            }}
          />
          <ol className="grid grid-cols-5 gap-4 relative">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.num}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: [...MOTION.easeOut],
                  delay: 0.15 + i * 0.08,
                }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="vin-node relative z-10 mb-4">{step.num}</div>
                <p className="vin-kicker text-[10px] mb-1.5">
                  {step.phase}
                </p>
                <p
                  className="font-headline text-[16px] font-bold leading-tight"
                  style={{ color: "#F5F0E1" }}
                >
                  {step.offer}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
