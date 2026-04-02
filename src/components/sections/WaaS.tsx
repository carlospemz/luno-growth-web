"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import SectionNote from "@/components/ui/SectionNote";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

const PLANS = [
  {
    name: "Express Mensual",
    price: "$1,690",
    features: [
      "Todo lo del paquete Express",
      "Hosting incluido",
      "Mantenimiento Cuidado",
    ],
  },
  {
    name: "Pro Mensual",
    price: "$2,690",
    features: [
      "Todo lo del paquete Pro",
      "Hosting incluido",
      "Mantenimiento Operativo",
    ],
  },
  {
    name: "Enterprise Mensual",
    price: "$4,090",
    features: [
      "Todo lo del paquete Enterprise",
      "Hosting incluido",
      "Mantenimiento Operativo",
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

export default function WaaS() {
  return (
    <Section id="waas">
      <SectionHeader
        kicker="Suscripcion"
        title="Web como servicio."
        accentWord="servicio."
        subtitle="Arranca sin pagar todo de golpe. Pagas mensual y tu web se mantiene viva."
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
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] font-semibold text-zinc-900">{plan.name}</h3>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-medium rounded-full px-2.5 py-0.5">12 meses</span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-semibold tracking-tight text-zinc-900">
                    {plan.price}
                  </span>
                  <span className="text-[13px] text-zinc-400">MXN / mes</span>
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

      <SectionNote
        summary="Puedes cancelar. Hay opcion de compra del sitio (ver detalle)."
        detail="Cancelas = se desactiva. Buyout opcional: precio lista - (0.5 x mensualidades pagadas)"
      />
    </Section>
  );
}
