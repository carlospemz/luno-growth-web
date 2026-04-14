"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "@/styles/luno-landing.css";
import { VincentDiamond } from "@/components/ui/VincentWordmark";

/**
 * VincentSplit — the signature visual piece of the brand.
 *
 * A full-screen section divided by a soft diagonal. The top half is
 * the night (indigo, cream text — "where Vincent works"). The bottom
 * half is the day (cream, indigo text — "where you live"). A gold
 * tagline pill sits on the intersection: "Vincent vive en la
 * intersección."
 *
 * Mobile-first. No mouse tracking. The diagonal is materialized with
 * a clip-path that is animated once from flat horizontal to its
 * final angle when the section enters the viewport.
 *
 * Per the brand bible: "the diagonal is not decoration — it's the
 * value proposition turned into an image."
 */
export default function VincentSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      id="split"
      aria-labelledby="split-heading"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh" }}
    >
      <h2 id="split-heading" className="sr-only">
        Vincent vive en la intersección de la noche y el día
      </h2>

      {/* Bottom half — day (cream, indigo text) — rendered first, */}
      {/* sits behind and fills the whole section. */}
      <div
        className="absolute inset-0 flex items-end md:items-center"
        style={{ background: "#F5F0E1" }}
      >
        <div className="w-full px-6 pb-[18svh] md:pb-0 md:pr-[7%] md:pl-[54%] max-w-[1280px] mx-auto">
          <div className="max-w-[520px] md:ml-auto">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(11, 30, 56, 0.55)" }}
            >
              El día
            </p>
            <p
              className="font-headline text-[30px] md:text-[44px] leading-[1.05] font-bold"
              style={{ color: "#0B1E38" }}
            >
              Donde tú vives.
            </p>
            <p
              className="mt-4 text-[15px] md:text-[17px] leading-relaxed"
              style={{ color: "rgba(11, 30, 56, 0.78)" }}
            >
              El desayuno sin celular. El fin de semana de verdad. Las vacaciones que llevas dos años posponiendo. La vida que tu negocio te debe.
            </p>
          </div>
        </div>
      </div>

      {/* Top half — night (indigo, cream text), with diagonal clip */}
      <motion.div
        className="absolute inset-0 flex items-start md:items-center"
        style={{ background: "#0B1E38" }}
        initial={{
          clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
        }}
        animate={
          inView
            ? {
                clipPath: [
                  "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                  "polygon(0 0, 100% 0, 100% 52%, 0 48%)",
                ],
              }
            : undefined
        }
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subtle gold pattern over the night half */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #E8B931 0, transparent 40%)",
          }}
        />

        <div className="w-full px-6 pt-[18svh] md:pt-0 md:pl-[7%] md:pr-[54%] max-w-[1280px] mx-auto">
          <div className="max-w-[520px]">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3"
              style={{ color: "rgba(232, 185, 49, 0.75)" }}
            >
              La noche
            </p>
            <p
              className="font-headline text-[30px] md:text-[44px] leading-[1.05] font-bold"
              style={{ color: "#F5F0E1" }}
            >
              Donde Vincent trabaja.
            </p>
            <p
              className="mt-4 text-[15px] md:text-[17px] leading-relaxed"
              style={{ color: "rgba(245, 240, 225, 0.78)" }}
            >
              Tu negocio respondiendo mensajes, agendando citas, publicando contenido, gestionando leads. En silencio. Sin que tú tengas que estar ahí.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tagline pill — sits exactly on the intersection */}
      <motion.div
        className="vin-split-tagline"
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
      >
        <VincentDiamond size={10} className="inline-block mr-2 align-middle" />
        Vincent vive en la intersección
        <VincentDiamond size={10} className="inline-block ml-2 align-middle" />
      </motion.div>
    </section>
  );
}
