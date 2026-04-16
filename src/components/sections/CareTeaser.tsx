"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import { MOTION } from "@/lib/motion";

/**
 * CareTeaser — próximo lanzamiento.
 *
 * Vincent Care NO se vende aquí. Solo se anuncia como próximo
 * lanzamiento con CTA a una página externa o lista de espera.
 * La honestidad de "todavía no está abierto" es deliberada.
 */

const CARE_URL = "/care";

export default function CareTeaser() {
  return (
    <Section id="care" className="relative">
      <SectionHeader
        kicker="Próximo lanzamiento"
        title="Estamos preparando algo específico para consultorios."
        accentWord="para consultorios."
        subcopy="Hoy Vincent Growth ya está trabajando con consultorios y clínicas desde marketing. Vincent Care abre después: una solución creada exclusivamente para salud, con otra lógica, otro lenguaje y otra profundidad."
        compact
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [...MOTION.easeOut] }}
        className="mt-10 md:mt-14 mx-auto max-w-[680px]"
        style={{
          borderRadius: "20px",
          padding: "28px 26px",
          background:
            "linear-gradient(180deg, rgba(232, 185, 49, 0.05) 0%, rgba(16, 35, 63, 0.2) 100%)",
          border: "1px solid rgba(232, 185, 49, 0.22)",
          boxShadow:
            "inset 0 1px 0 rgba(232, 185, 49, 0.18), 0 14px 32px rgba(0, 0, 0, 0.35)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "#E8B931" }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.24em]"
            style={{ color: "#E8B931" }}
          >
            Vincent Care · en preparación
          </span>
        </div>

        <p
          className="text-[15px] md:text-[16px] leading-[1.6] font-medium"
          style={{ color: "#F5F0E1" }}
        >
          Todavía no está abierto. Lo estamos preparando bien.
        </p>

        <p
          className="mt-3 text-[13px] md:text-[14px] leading-[1.6]"
          style={{ color: "rgba(245, 240, 225, 0.6)" }}
        >
          Si quieres ser de los primeros en enterarte, deja tu correo y te
          avisamos antes del lanzamiento.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={CARE_URL}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-transform active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #E8B931, #F5D06A)",
              color: "#0B1E38",
              boxShadow:
                "0 4px 14px rgba(232, 185, 49, 0.22), 0 0 0 1px rgba(232, 185, 49, 0.5)",
            }}
          >
            Ver Vincent Care
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/care#waitlist"
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold transition-colors"
            style={{
              background: "transparent",
              color: "#F5F0E1",
              border: "1px solid rgba(245, 240, 225, 0.22)",
            }}
          >
            Entrar a la lista
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
