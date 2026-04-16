"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { VincentDiamond } from "@/components/ui/VincentWordmark";
import {
  ContainerScroll,
  ContainerScrollReverse,
} from "@/components/ui/container-scroll-animation";
import { WhatsAppChat } from "@/components/ui/WhatsAppChat";
import { DayReclaimed } from "@/components/ui/DayReclaimed";
import { waAnchorProps } from "@/config/contact";

/**
 * VincentSplit — beats 2 + 3 of the arrival sequence.
 *
 *   Beat 2 · Noche ribbon — last dark chamber. "Donde Vincent trabaja."
 *   Hull plate — banded transition through the ship's skin. Hosts the
 *                intersection pill embedded into the navy core.
 *   Beat 3 · Día lounge   — first beige interior chamber. "Donde tú vives."
 *                           Navy CTA inside a warm bone room.
 */
export default function VincentSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const waProps = waAnchorProps();

  return (
    <section
      ref={sectionRef}
      id="split"
      aria-labelledby="split-heading"
      className="relative w-full overflow-hidden"
    >
      <h2 id="split-heading" className="sr-only">
        Vincent vive en la intersección de la noche y el día
      </h2>

      {/* ── BEAT 2 · Noche ribbon ── */}
      <div className="relative overflow-hidden">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 pt-8 md:pt-14 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 md:gap-4"
          >
            <span className="vin-kicker text-[10px] md:text-[11px] shrink-0">
              La noche
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(to right, rgba(232, 185, 49, 0.55), transparent)",
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-5 md:mt-6 font-headline text-[38px] md:text-[68px] lg:text-[80px] font-extrabold uppercase leading-[0.92] tracking-tight"
            style={{ color: "#F5F0E1", textWrap: "balance" }}
          >
            Donde Vincent trabaja.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.22 }}
            className="mt-5 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed vin-text-muted"
          >
            Respondiendo, agendando, publicando, cerrando. En silencio. Sin que
            tú tengas que estar ahí.
          </motion.p>
        </div>

        {/* ── Scroll-reveal WhatsApp demo ──
            Phone device rotates into view while the chat inside
            plays a loop: pain → resolution. The user literally sees
            Vincent working. */}
        <ContainerScroll
          titleComponent={
            <div className="px-6">
              <p
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] mb-3"
                style={{ color: "rgba(232, 185, 49, 0.7)" }}
              >
                Así trabaja Vincent mientras tú duermes
              </p>
              <p
                className="font-headline text-[26px] md:text-[44px] font-extrabold uppercase leading-[1] tracking-tight"
                style={{ color: "#F5F0E1", textWrap: "balance" }}
              >
                Cada mensaje sin responder{" "}
                <span className="vin-gradient-gold-text">
                  es una venta perdida.
                </span>
              </p>
            </div>
          }
        >
          <WhatsAppChat />
        </ContainerScroll>
      </div>

      {/* ── BEAT 3 · Día lounge with DIAGONAL SEAM ──
          clip-path polygon lifts the top-right corner, so the seam
          between noche and día reads as a sunrise horizon (west→east). */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative overflow-hidden"
        style={{
          background: "#F5F0E1",
          clipPath: "polygon(0 0, 100% 36px, 100% 100%, 0 100%)",
          paddingTop: "calc(36px + 12px)",
        }}
      >
        {/* Intersection pill — sits on the diagonal seam */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -2 } : undefined}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="pointer-events-none absolute left-1/2 top-0 z-30"
          style={{
            transform: "translate(-50%, -50%) rotate(-2deg)",
          }}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full whitespace-nowrap px-3.5 py-1.5 md:px-5 md:py-2"
            style={{
              background: "#0B1E38",
              border: "1px solid rgba(232, 185, 49, 0.55)",
              boxShadow:
                "0 10px 28px rgba(0, 0, 0, 0.45), 0 0 0 4px rgba(245, 240, 225, 0.94)",
            }}
          >
            <VincentDiamond size={8} />
            <span
              className="font-headline font-bold uppercase text-[9px] md:text-[12px] tracking-[0.14em]"
              style={{ color: "#E8B931" }}
            >
              Vive en la intersección
            </span>
            <VincentDiamond size={8} />
          </div>
        </motion.div>

        {/* Lounge content — right aligned like the reference screenshot */}
        <div className="relative mx-auto w-full max-w-[1120px] px-5 sm:px-8 pt-4 md:pt-8 pb-12 md:pb-16 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex items-center gap-3 md:gap-4 justify-end"
          >
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[220px] md:max-w-[260px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(11, 30, 56, 0.38))",
              }}
            />
            <span
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] shrink-0"
              style={{ color: "rgba(11, 30, 56, 0.66)" }}
            >
              El día
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
            className="mt-3 md:mt-5 font-headline text-[46px] md:text-[84px] lg:text-[104px] font-extrabold uppercase leading-[0.88] tracking-tight text-right"
            style={{ color: "#0B1E38", textWrap: "balance" }}
          >
            Donde tú vives.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.72 }}
            className="mt-6 md:mt-9 ml-auto max-w-[520px] text-right"
          >
            <p
              className="text-[16px] md:text-[19px] leading-relaxed font-medium"
              style={{ color: "rgba(11, 30, 56, 0.82)" }}
            >
              El desayuno sin celular. El fin de semana de verdad. Las
              vacaciones que llevas dos años posponiendo.
            </p>
            <p
              className="mt-3 text-[15px] md:text-[17px] leading-relaxed"
              style={{ color: "rgba(11, 30, 56, 0.58)" }}
            >
              La vida que tu negocio te debe, de vuelta.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.88 }}
            className="mt-8 md:mt-12 flex items-center justify-end gap-3 md:gap-4"
          >
            <span
              aria-hidden="true"
              className="hidden sm:block h-px flex-1 max-w-[140px]"
              style={{ background: "rgba(11, 30, 56, 0.22)" }}
            />
            <a
              {...waProps}
              className="inline-flex items-center gap-2 rounded-full text-[13px] font-semibold transition-transform active:scale-[0.98]"
              style={{
                paddingInline: "22px",
                paddingBlock: "12px",
                background: "#0B1E38",
                color: "#E8B931",
                border: "1px solid rgba(232, 185, 49, 0.5)",
                boxShadow: "0 4px 14px rgba(11, 30, 56, 0.18)",
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Habla con Vincent
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="mt-10 md:mt-14 flex items-center justify-center gap-4"
            aria-hidden="true"
          >
            <VincentDiamond size={6} color="rgba(11, 30, 56, 0.28)" />
            <VincentDiamond size={9} color="rgba(11, 30, 56, 0.5)" />
            <VincentDiamond size={6} color="rgba(11, 30, 56, 0.28)" />
          </motion.div>
        </div>

        {/* ── Scroll-reveal día demo · REVERSE gesture ──
            Inverse of the noche phone: starts flat in-hand, then
            tilts away and shrinks as you scroll — reading as "you
            finished the checklist, you put the phone down, day
            recovered". Day variant frame (cream/ivory). */}
        <ContainerScrollReverse
          titleComponent={
            <div className="px-6">
              <p
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] mb-3"
                style={{ color: "rgba(11, 30, 56, 0.62)" }}
              >
                Mientras Vincent sostiene la noche
              </p>
              <p
                className="font-headline text-[26px] md:text-[44px] font-extrabold uppercase leading-[1] tracking-tight"
                style={{ color: "#10233F", textWrap: "balance" }}
              >
                Tú recuperas{" "}
                <span className="vin-gradient-gold-text">
                  lo que te debe el día.
                </span>
              </p>
            </div>
          }
        >
          <DayReclaimed />
        </ContainerScrollReverse>
      </motion.div>
    </section>
  );
}
