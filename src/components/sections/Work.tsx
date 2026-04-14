"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Stethoscope } from "lucide-react";
import Container from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import SwipeDeck from "@/components/portfolio/SwipeDeck";
import HorizontalGallery from "@/components/portfolio/HorizontalGallery";
import type { Project } from "@/components/portfolio/PortfolioCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MOTION } from "@/lib/motion";
import { VincentDiamond } from "@/components/ui/VincentWordmark";
import { offerWhatsappUrl } from "@/config/contact";
import "@/styles/showcase.css";

/* ═══════════════════════════════════════
   Project data — real clients, gradients rebranded to VINCENT
   ═══════════════════════════════════════ */

const PROJECTS: Project[] = [
  {
    name: "Jugos del Sur",
    line1: "Mini-sitio para pedir rápido.",
    line2: "Menú, ubicación y catering por WhatsApp.",
    url: "https://jugos-del-sur-theta.vercel.app",
    image: "/portfolio/jugosdelsur.jpg",
    gradient: {
      from: "rgba(232, 185, 49, 0.55)",
      via: "rgba(245, 208, 106, 0.35)",
      to: "rgba(45, 78, 142, 0.40)",
    },
    service: "Growth",
    extras: "Pedir + Catering",
  },
  {
    name: "TAKANI",
    line1: "Catálogo con promos listo para cotizar por WhatsApp.",
    line2: "",
    url: "https://takani-uniforms.vercel.app",
    image: "/portfolio/takani.jpg",
    gradient: {
      from: "rgba(45, 78, 142, 0.50)",
      via: "rgba(232, 185, 49, 0.35)",
      to: "rgba(11, 30, 56, 0.45)",
    },
    service: "Growth",
    extras: "Cotizar por WhatsApp",
  },
  {
    name: "FALCONMUSIC",
    line1: "Press kit para cerrar eventos.",
    line2: "WhatsApp directo y propuesta clara.",
    url: "https://falcon-music-presskit.vercel.app",
    image: "/portfolio/falconmusic.jpg",
    gradient: {
      from: "rgba(11, 30, 56, 0.55)",
      via: "rgba(45, 78, 142, 0.40)",
      to: "rgba(232, 185, 49, 0.45)",
    },
    service: "Growth",
    extras: "Cerrar eventos",
  },
];

/* ═══════════════════════════════════════
   Work section — preserved + HealthTeaser sub-block
   ═══════════════════════════════════════ */

export default function Work() {
  const [reduced, setReduced] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const handleHealthCTA = useCallback(() => {
    // Scroll to brief with intent — Brief will read the URL hash on mount
    if (typeof window !== "undefined") {
      window.location.hash = "brief?industry=salud";
      document.getElementById("brief")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      id="work"
      className="relative z-[3] overflow-hidden pt-[12px] pb-[28px] md:pt-[20px] md:pb-[40px]"
    >
      <Container className="relative z-10">
        <SectionHeader
          kicker="Casos"
          title="Casos que ya corren en la noche."
          accentWord="en la noche."
          subcopy="Clientes reales. Sitios vivos. Abre, compara, juzga."
          compact
        />

        {/* Mobile: SwipeDeck */}
        {!isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35, ease: [...MOTION.easeOut] }}
            style={{ willChange: "transform, opacity" }}
            id="work-card-0"
          >
            <SwipeDeck projects={PROJECTS} reduced={reduced} />
          </motion.div>
        )}
      </Container>

      {/* Desktop: horizontal gallery — full viewport width */}
      {isDesktop && (
        <div className="relative z-10">
          <HorizontalGallery projects={PROJECTS} />
        </div>
      )}

      {/* ─── HealthTeaser sub-block ─── */}
      <Container className="relative z-10 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [...MOTION.easeOut] }}
          className="mx-auto max-w-[720px]"
        >
          {/* Gold divider with diamonds */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(232, 185, 49, 0.5))",
              }}
            />
            <VincentDiamond size={8} color="rgba(232, 185, 49, 0.7)" />
            <VincentDiamond size={10} color="#E8B931" />
            <VincentDiamond size={8} color="rgba(232, 185, 49, 0.7)" />
            <div
              className="h-px flex-1 max-w-[120px]"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(232, 185, 49, 0.5))",
              }}
            />
          </div>

          <div
            className="rounded-[24px] border p-7 md:p-9 text-center"
            style={{
              borderColor: "rgba(232, 185, 49, 0.3)",
              background: "rgba(232, 185, 49, 0.035)",
            }}
          >
            <div
              className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                background: "rgba(232, 185, 49, 0.1)",
                border: "1px solid rgba(232, 185, 49, 0.35)",
              }}
            >
              <Stethoscope className="h-5 w-5" style={{ color: "#E8B931" }} />
            </div>

            <h3
              className="font-headline text-[26px] md:text-[32px] font-bold leading-[1.05] mb-4"
              style={{ color: "#F5F0E1" }}
            >
              Y algo especial para consultorios y clínicas.
            </h3>

            <p
              className="mx-auto max-w-[560px] text-[14px] md:text-[15px] leading-relaxed mb-6"
              style={{ color: "rgba(245, 240, 225, 0.72)" }}
            >
              Estamos construyendo un sistema específicamente para el sector salud. Mientras se lanza, Vincent Growth ya está trabajando con consultorios en Monclova y Monterrey.
            </p>

            <button
              type="button"
              onClick={handleHealthCTA}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "rgba(232, 185, 49, 0.12)",
                color: "#E8B931",
                border: "1px solid rgba(232, 185, 49, 0.4)",
              }}
              data-track="health_teaser_cta_click"
            >
              Si tienes un consultorio, cuéntanos
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <p
              className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em]"
              style={{ color: "rgba(232, 185, 49, 0.55)" }}
            >
              Los que llenen el brief hoy entran primero cuando abra Vincent Care.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
