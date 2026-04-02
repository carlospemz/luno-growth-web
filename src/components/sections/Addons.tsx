"use client";

import { type ReactNode } from "react";
import { FilePlus, LayoutGrid, ClipboardList, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

const ADDONS: { name: string; price: string; desc: string; icon: ReactNode }[] = [
  { name: "Pagina extra", price: "$3,900", desc: "Menu, ubicacion, contacto o servicios", icon: <FilePlus className="h-6 w-6 text-purple-500" /> },
  { name: "Catalogo por categorias", price: "$5,900", desc: "Productos organizados por categoria", icon: <LayoutGrid className="h-6 w-6 text-purple-500" /> },
  { name: "Formulario de cotizacion", price: "$2,400", desc: "Cotizacion directa por WhatsApp", icon: <ClipboardList className="h-6 w-6 text-purple-500" /> },
  { name: "Medicion basica", price: "$3,400", desc: "Visitas, clics y eventos clave", icon: <Activity className="h-6 w-6 text-purple-500" /> },
];

export default function Addons() {
  return (
    <Section id="addons">
      <SectionHeader kicker="Extras" title="Potencia tu proyecto." accentWord="proyecto." />

      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {ADDONS.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: 0.35,
              ease: [...MOTION.ease],
              delay: 0.03 + i * 0.06,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            <Card collider className="flex flex-col !p-4 md:!p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[12px] bg-purple-50">
                {a.icon}
              </div>
              <h3 className="text-[14px] font-semibold text-zinc-900 md:text-[16px]">{a.name}</h3>
              <p className="mt-1 text-[12px] leading-[1.5] text-zinc-500 md:text-[13px]">{a.desc}</p>
              <div className="mt-auto flex items-baseline gap-1 pt-4">
                <span className="text-[20px] font-semibold tracking-tight text-zinc-900 md:text-[24px]">
                  {a.price}
                </span>
                <span className="text-[12px] text-zinc-400 md:text-[13px]">MXN</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
