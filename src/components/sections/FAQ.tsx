"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

const FAQS = [
  {
    q: "¿Trabajan con cualquier negocio o solo con ciertos sectores?",
    a: "Podemos trabajar con cualquier negocio serio, pero hoy estamos enfocándonos activamente en consultorios, clínicas y especialistas. Ese foco nos permite afinar criterio, casos y profundidad sin dejar de abrir espacio a otros sectores.",
  },
  {
    q: "¿Por dónde se empieza?",
    a: "Si tu marca está desordenada, se empieza por Brand System. Si ya existe dirección, puede empezar por Content Engine o Demand Engine según el momento del negocio.",
  },
  {
    q: "¿Demand Engine incluye media spend?",
    a: "No. El media spend siempre va aparte. Demand Engine cubre estrategia, creativos, destino de conversión y optimización.",
  },
  {
    q: "¿Lead Ops se vende solo?",
    a: "No. Lead Ops solo entra cuando ya existe contexto comercial con Growth o Website Execution.",
  },
  {
    q: "¿Necesito sitio para trabajar con ustedes?",
    a: "No siempre. Pero si el sitio hoy está frenando credibilidad o conversión, Website Execution entra como complemento natural.",
  },
  {
    q: "¿Vincent Care ya está abierto?",
    a: "Todavía no. Hoy estamos operando Vincent Growth y preparando una solución específica para consultorios. Puedes entrar a la lista desde aquí para enterarte primero.",
  },
];

function Item({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const fromRight = index % 2 === 1;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: fromRight ? 20 : -20,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.35,
        ease: [...MOTION.ease],
        delay: index * 0.04,
      }}
      style={{ willChange: "transform, opacity" }}
      className="border-b transition-colors duration-300"
      data-open={open}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left transition-colors"
        style={{
          borderLeftWidth: 2,
          borderLeftStyle: "solid",
          borderLeftColor: open ? "#E8B931" : "transparent",
          paddingLeft: 16,
          background: open ? "rgba(232, 185, 49, 0.04)" : "transparent",
        }}
      >
        <div className="flex items-baseline gap-3 pr-4">
          <span
            className="font-mono text-[11px] tabular-nums"
            style={{ color: "rgba(232, 185, 49, 0.55)" }}
          >
            0{index + 1}
          </span>
          <span
            className="text-[15px] font-semibold leading-snug md:text-[16px]"
            style={{ color: "#F5F0E1" }}
          >
            {faq.q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown
            className="h-4 w-4 flex-shrink-0 transition-all duration-300"
            style={{
              color: open ? "#E8B931" : "rgba(232, 185, 49, 0.5)",
            }}
          />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ paddingLeft: 16 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="pb-6 pr-4 text-[14px] md:text-[15px] leading-[1.7] vin-text-muted"
            >
              {faq.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <Section id="faq">
      <SectionHeader
        kicker="Preguntas"
        title="Lo que la gente nos pregunta."
        accentWord="pregunta."
      />
      <div
        className="mx-auto max-w-[720px]"
        style={{ borderTop: "1px solid rgba(245, 240, 225, 0.08)" }}
      >
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottomColor: "rgba(245, 240, 225, 0.08)" }}
          >
            <Item faq={faq} index={i} />
          </div>
        ))}
      </div>
    </Section>
  );
}
