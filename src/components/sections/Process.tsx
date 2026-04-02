"use client";

import { useRef } from "react";
import { MessageSquare, Paintbrush, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import { MOTION } from "@/lib/motion";

/* ═══════════════════════════════════════
   Step data + per-icon ambient config
   ═══════════════════════════════════════ */

const STEPS = [
  {
    icon: MessageSquare,
    title: "Diagnóstico (15 min)",
    desc: "Entendemos qué vendes, a quién y qué debe pasar para que te escriban.",
    ambient: {
      animate: {
        y: [0, -4, 1, -3, 0],
        rotate: [0, -4, 3, -2, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
      },
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    /** Show a reply chat bubble next to the icon */
    replyBubble: true,
  },
  {
    icon: Paintbrush,
    title: "Construcción (48–72h)",
    desc: "Primera versión en 48–72h después de recibir contenido. Tiempo total depende del paquete y de que entregues assets.",
    ambient: {
      animate: {
        x: [0, 14, 0],
        rotate: [0, -6, 0],
        scale: [1, 1.04, 1],
      },
      transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
  {
    icon: Rocket,
    title: "Lanzamiento (mismo día)",
    desc: "Se publica, se prueba WhatsApp/llamada y queda lista para operar.",
    ambient: {
      animate: {
        x: [0, 22, 0],
        rotate: [0, -10, 0],
        scale: [1, 1.08, 1],
      },
      transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
    },
  },
];

/* Each card enters from a different direction — moderate offsets for fluidity */
const cardEntrances = [
  { x: -40, rotate: -2 },   /* Card 1: from left */
  { y: 30 },                 /* Card 2: from below */
  { x: 40, rotate: 2 },     /* Card 3: from right */
];

/* Reply bubble animation — appears as if someone is replying */
function ReplyBubble({ inView }: { inView: boolean }) {
  return (
    <motion.span
      className="absolute -right-2 -top-1"
      initial={{ opacity: 0, scale: 0, x: -4 }}
      animate={
        inView
          ? {
              opacity: [0, 0.7, 0.7, 0],
              scale: [0, 1, 1, 0.8],
              x: [  -4, 2, 2, 4],
            }
          : {}
      }
      transition={{
        duration: 2.4,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeInOut",
      }}
    >
      <MessageSquare className="h-3.5 w-3.5 -scale-x-100 text-cyan-400/60" />
    </motion.span>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <Section id="process">
      <div ref={sectionRef}>
        <SectionHeader kicker="Método" title={"Ejecución precisa. Sin\u00A0fricción."} accentWord="precisa." />

        {/* Timeline container with vertical line */}
        <div className="relative">
          {/* Vertical timeline line — draws downward */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [...MOTION.easeOut], delay: 0.2 }}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top bg-gradient-to-b from-cyan-400/30 via-violet-500/20 to-transparent md:block"
            aria-hidden="true"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => {
              const entrance = cardEntrances[i];
              return (
                <motion.div
                  key={s.title}
                  initial={{
                    opacity: 0,
                    x: entrance.x ?? 0,
                    y: entrance.y ?? 24,
                    rotate: entrance.rotate ?? 0,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.4,
                    ease: [...MOTION.ease],
                    delay: 0.05 + i * 0.08,
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <Card collider>
                    {/* Step number indicator */}
                    <div
                      className={`mb-3 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${i === 1 ? "bg-cyan-400/10 text-cyan-400" : "bg-violet-100 text-violet-400"}`}
                    >
                      {i + 1}
                    </div>

                    <span className="relative inline-block">
                      <motion.span
                        className="inline-block"
                        animate={inView ? s.ambient.animate : {}}
                        transition={inView ? s.ambient.transition : { duration: 0.3 }}
                      >
                        <s.icon className={`h-7 w-7 ${i === 1 ? "text-cyan-400" : "text-violet-400"}`} />
                      </motion.span>
                      {"replyBubble" in s && s.replyBubble && (
                        <ReplyBubble inView={inView} />
                      )}
                    </span>
                    <h3 className="mt-4 font-heading text-[17px] font-bold">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-[1.6] text-zinc-500">{s.desc}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
