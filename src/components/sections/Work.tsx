"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/Section";
import SwipeDeck from "@/components/portfolio/SwipeDeck";
import HorizontalGallery from "@/components/portfolio/HorizontalGallery";
import type { Project } from "@/components/portfolio/PortfolioCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MOTION } from "@/lib/motion";
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

  return (
    <section
      id="work"
      className="relative z-[3] overflow-hidden vin-bay-shell is-inset"
    >
      <Container className="relative z-10">
        <SectionHeader
          kicker="Trabajo real"
          title="Marcas y sitios que ya están corriendo."
          accentWord="ya están corriendo."
          subcopy="No te pedimos que nos creas por discurso. Abre, compara y juzga el criterio en ejecución."
          compact
        />

        {/* Mobile: SwipeDeck inside a viewport-framed module */}
        {!isDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.35, ease: [...MOTION.easeOut] }}
            style={{ willChange: "transform, opacity" }}
            id="work-card-0"
            className="vin-module mt-6"
          >
            <div className="vin-module-header">
              <span>Case Terminal</span>
              <span className="vin-module-id">LIVE · 03</span>
            </div>
            <div className="p-4">
              <SwipeDeck projects={PROJECTS} reduced={reduced} />
            </div>
          </motion.div>
        )}
      </Container>

      {/* Desktop: horizontal gallery — full viewport width */}
      {isDesktop && (
        <div className="relative z-10">
          <HorizontalGallery projects={PROJECTS} />
        </div>
      )}
    </section>
  );
}
