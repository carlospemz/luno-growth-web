"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * FAQ — dual-positioning aware.
 * Two questions explicitly address (a) the multi-vertical openness
 * and (b) the coming Vincent Care product for clinics — both without
 * closing the door on other sectors.
 */

const FAQS = [
  {
    q: "¿Trabajan con cualquier negocio o solo con ciertos sectores?",
    a: "Trabajamos con cualquier negocio que tenga un dueño harto de improvisar. Tenemos un foco especial en sector salud — consultorios, clínicas, fisio, psicología, pediatría — porque estamos construyendo un sistema específico para ellos. Pero si lo tuyo es un restaurante, una inmobiliaria o una ferretería, también entras.",
  },
  {
    q: "¿Cuánto cuesta arrancar?",
    a: "Brand System, nuestro punto de entrada, va desde $8,000 MXN como proyecto único. Content Engine desde $4,500/mes. Demand Engine con setup desde $5,000 más $6,000/mes. Los precios escalan según alcance — no hay letra chica.",
  },
  {
    q: "¿Tengo que comprar los tres núcleos?",
    a: "No. Cada núcleo resuelve algo distinto. La mayoría arranca con Brand System porque ordena todo. De ahí avanzas a Content Engine cuando necesites operar mes a mes, y Demand Engine cuando quieras volumen.",
  },
  {
    q: "Tengo un consultorio. ¿Qué pasa con Vincent Care?",
    a: "Care es un producto SaaS separado que estamos construyendo específicamente para consultorios y clínicas: recepción conversacional por WhatsApp, confirmaciones automáticas, reactivación de pacientes dormidos. Aún no está público. Si llenas el brief hoy eres de los primeros en entrar cuando abra.",
  },
  {
    q: "¿Por qué tan accesible para lo que entregan?",
    a: "Porque la IA ejecuta en horas lo que un equipo tradicional tarda días. Una agencia con equipo humano completo necesita cobrar $15,000–$25,000 MXN mensuales solo para cubrir nóminas. Vincent entrega lo mismo al precio de un freelancer porque la IA hace el trabajo de mesa.",
  },
  {
    q: "¿Hacen sitios web?",
    a: "Sí, como add-on downstream del Brand System. No vendemos sitios sueltos — si no tienes marca ordenada primero, un sitio solo es un folleto digital caro.",
  },
  {
    q: "¿Y Google Ads o dashboards de atribución?",
    a: "Por ahora no como línea central. Nos enfocamos en Meta Ads (donde hoy tenemos músculo) y seguimiento básico suficiente. Los dashboards premium llegan cuando tengamos datos reales para alimentarlos, no como promesa vacía.",
  },
  {
    q: "¿Dónde están?",
    a: "Monclova (laboratorio y HQ) y Monterrey (mercado principal). Trabajamos remoto con toda México. Monclova prueba, Monterrey vende, nacional crece.",
  },
  {
    q: "¿Qué es Vincent OS y Vincent Ops?",
    a: "Vincent OS es la infraestructura interna multi-tenant. Vincent Ops es el cockpit desde donde los fundadores vemos y operamos todo. No los vendemos directo — los usamos para entregar Growth (y mañana Care) mejor que una agencia tradicional.",
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
              className="pb-5 pr-4 text-[14px] leading-[1.7]"
              style={{ color: "rgba(245, 240, 225, 0.72)" }}
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
