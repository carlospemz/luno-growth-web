"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

const FAQS = [
  {
    q: "¿En cuánto tiempo empieza a funcionar?",
    a: "Setup completo en 48 horas después de firmar. Primera semana ya tienes contenido publicado, chatbot activo y campañas corriendo.",
  },
  {
    q: "¿Qué pasa si no veo resultados en 30 días?",
    a: "Al mes te entregamos un reporte con alcance, leads y conversiones reales. Si no hay movimiento visible, no tienes que renovar. Tu riesgo es cero.",
  },
  {
    q: "¿El presupuesto de anuncios está incluido?",
    a: "La gestión de ads está incluida. El presupuesto que se invierte en Meta/Google va aparte — tú decides cuánto. Nosotros lo optimizamos al máximo.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí. Puedes subir de Señal a Sistema o de Sistema a Motor en cualquier momento. Los cambios aplican al siguiente ciclo mensual.",
  },
  {
    q: "¿Cómo generan contenido si no están aquí?",
    a: "Nuestros agentes IA generan la estrategia, copy y diseños. Para video coordinamos un freelancer local en tu ciudad con el brief exacto — tú no tienes que hacer nada.",
  },
  {
    q: "¿Funciona para mi tipo de negocio?",
    a: "Trabajamos con consultorios, restaurantes, antros, clínicas, salones de fiestas y cualquier negocio donde los clientes lleguen por canales digitales. Si la gente te busca en línea, LUNO funciona.",
  },
];

function Item({ faq, index }: { faq: (typeof FAQS)[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const fromRight = index % 2 === 1;
  const isEven = index % 2 === 0;

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
        duration: 0.3,
        ease: [...MOTION.ease],
        delay: index * 0.04,
      }}
      style={{ willChange: "transform, opacity" }}
      className={`border-b border-zinc-100 transition-colors duration-300 ${
        open
          ? `border-l-2 ${isEven ? "border-l-violet-500/40" : "border-l-cyan-400/40"} bg-purple-50/30 pl-4`
          : "border-l-2 border-l-transparent pl-4"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <div className="flex items-baseline gap-2.5 pr-4">
          <span className={`text-[11px] font-bold tabular-nums ${isEven ? "text-violet-400/60" : "text-cyan-400/50"}`}>
            0{index + 1}
          </span>
          <span className="text-[15px] font-semibold md:text-[16px]">{faq.q}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <ChevronDown
            className={`h-4 w-4 flex-shrink-0 transition-all duration-300 ${
              open
                ? "text-cyan-400/60 drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]"
                : "text-cyan-400/40"
            }`}
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
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="pb-5 text-[14px] leading-[1.7] text-zinc-300"
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
      <SectionHeader kicker="FAQ" title="Preguntas frecuentes" accentWord="frecuentes" />
      <div className="mx-auto max-w-[640px]">
        {FAQS.map((faq, i) => (
          <Item key={i} faq={faq} index={i} />
        ))}
      </div>
    </Section>
  );
}
