"use client";

import { Check, Clock } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

const PLANS = [
  {
    name: "Cuidado",
    price: "$990",
    sla: "72h",
    hours: "30 min",
    features: [
      "Fixes menores y correcciones",
      "Chequeos basicos de salud",
    ],
  },
  {
    name: "Operativo",
    price: "$1,990",
    sla: "48h",
    hours: "2h",
    features: [
      "1 mejora mensual de conversion",
      "Metricas basicas",
    ],
  },
  {
    name: "Crecimiento",
    price: "$3,990",
    sla: "24h",
    hours: "5h",
    features: [
      "Mini-landing trimestral",
      "Roadmap mensual breve",
    ],
  },
];

const cardDirections = [{ x: -24 }, { y: 24 }, { x: 24 }];

const featureVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [...MOTION.ease] },
  },
};

export default function Maintenance() {
  return (
    <Section id="maintenance">
      <SectionHeader
        kicker="Mantenimiento"
        title={"Tu sitio siempre en\u00A0forma."}
        accentWord="forma."
        subtitle="Para sitios ya publicados (si ya tienes tu web)."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {PLANS.map((plan, i) => {
          const dir = cardDirections[i];
          return (
            <motion.div
              key={plan.name}
              initial={{
                opacity: 0,
                x: dir.x ?? 0,
                y: dir.y ?? 12,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 0.38,
                ease: [...MOTION.ease],
                delay: 0.03 + i * 0.06,
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <Card collider className="flex flex-col">
                <h3 className="text-[18px] font-semibold text-zinc-900">{plan.name}</h3>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-900">
                    {plan.price}
                  </span>
                  <span className="text-[13px] text-zinc-400">/mes</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-medium text-purple-700">
                    <Clock className="h-3 w-3" /> {plan.sla}
                  </span>
                  <span className="text-[12px] text-zinc-400">{plan.hours} de cambios / mes</span>
                </div>
                <motion.ul
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.04, delayChildren: 0.08 },
                    },
                  }}
                  className="mt-5 flex-1 space-y-2.5"
                >
                  {plan.features.map((f) => (
                    <motion.li
                      key={f}
                      variants={featureVariants}
                      className="flex items-start gap-2.5 text-[13px] text-zinc-900"
                    >
                      <span className="mt-0.5 flex-shrink-0">
                        <Check className="h-4 w-4 text-purple-500" />
                      </span>
                      {f}
                    </motion.li>
                  ))}
                </motion.ul>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[12px] leading-[1.5] text-zinc-400">
        Minimo 3 meses. Horas no usadas se acumulan 1 mes. Fuera de plan: se cobra por bloque.
      </p>
    </Section>
  );
}
