"use client";

import { useRef } from "react";
import { MessageSquare, Paintbrush, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Section, { SectionHeader } from "@/components/ui/Section";
import { GlowCard } from "@/components/ui/spotlight-card";
import { MOTION } from "@/lib/motion";

/* ═══════════════════════════════════════
   Step data + per-icon ambient config
   Ambient animations preserved from original — they're the strongest
   visual element of the repo. Only copy was rewritten to match the
   brand bible voice (calm, surgical, not urgent).
   ═══════════════════════════════════════ */

const STEPS = [
  {
    icon: MessageSquare,
    title: "Diagnóstico",
    desc: "Una llamada corta con Vincent. Entendemos tu negocio antes de tocar un píxel — qué vendes, a quién, qué te duele.",
    ambient: {
      animate: {
        y: [0, -4, 1, -3, 0],
        rotate: [0, -4, 3, -2, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
      },
      transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const },
    },
    replyBubble: true,
  },
  {
    icon: Paintbrush,
    title: "Construcción",
    desc: "IA y humanos trabajando en paralelo. Producimos en días lo que una agencia tradicional tarda semanas. Tú apruebas, nosotros pintamos.",
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
    title: "Lanzamiento",
    desc: "Todo vivo, con acompañamiento las primeras semanas. Vincent se queda cerca hasta que la noche empieza a trabajar sola.",
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

const cardEntrances = [
  { x: -40, rotate: -2 },
  { y: 30 },
  { x: 40, rotate: 2 },
];

/* Reply bubble — simulates someone replying */
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
              x: [-4, 2, 2, 4],
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
      <MessageSquare
        className="h-3.5 w-3.5 -scale-x-100"
        style={{ color: "rgba(232, 185, 49, 0.7)" }}
      />
    </motion.span>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <Section id="process">
      <div ref={sectionRef}>
        <SectionHeader
          kicker="Método"
          title="Tres pasos. Sin misterio."
          accentWord="Sin misterio."
          subcopy="Entendemos. Construimos. Acompañamos. En ese orden. Con calma."
        />

        {/* Timeline container with vertical line */}
        <div className="relative mt-10">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease: [...MOTION.easeOut], delay: 0.2 }}
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 origin-top md:block"
            style={{
              background:
                "linear-gradient(to bottom, rgba(232, 185, 49, 0.4), rgba(232, 185, 49, 0.15), transparent)",
            }}
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
                    duration: 0.5,
                    ease: [...MOTION.ease],
                    delay: 0.05 + i * 0.1,
                  }}
                  style={{ willChange: "transform, opacity" }}
                >
                  <GlowCard glowColor="orange" className="p-6">
                    {/* Step number */}
                    <div
                      className="mb-3 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold"
                      style={{
                        background: "rgba(232, 185, 49, 0.12)",
                        color: "#E8B931",
                        border: "1px solid rgba(232, 185, 49, 0.4)",
                      }}
                    >
                      {i + 1}
                    </div>

                    <span className="relative inline-block">
                      <motion.span
                        className="inline-block"
                        animate={inView ? s.ambient.animate : {}}
                        transition={inView ? s.ambient.transition : { duration: 0.3 }}
                      >
                        <s.icon className="h-7 w-7" style={{ color: "#E8B931" }} />
                      </motion.span>
                      {"replyBubble" in s && s.replyBubble && (
                        <ReplyBubble inView={inView} />
                      )}
                    </span>

                    <h3
                      className="mt-4 font-headline text-[22px] font-bold leading-[1.05]"
                      style={{ color: "#F5F0E1" }}
                    >
                      {s.title}
                    </h3>
                    <p
                      className="mt-3 text-[14px] leading-[1.55]"
                      style={{ color: "rgba(245, 240, 225, 0.68)" }}
                    >
                      {s.desc}
                    </p>
                  </GlowCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
