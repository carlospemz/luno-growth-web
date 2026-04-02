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
   Project data
   ═══════════════════════════════════════ */

const PROJECTS: Project[] = [
  {
    name: "Jugos del Sur",
    line1: "Mini-sitio para pedir rápido.",
    line2: "Menú, ubicación y catering por WhatsApp.",
    url: "https://jugos-del-sur-theta.vercel.app",
    image: "/portfolio/jugosdelsur.jpg",
    gradient: {
      from: "rgba(228,152,43,0.55)",
      via: "rgba(245,184,77,0.35)",
      to: "rgba(168,85,247,0.40)",
    },
    service: "Enterprise",
    extras: "Pedir + Catering",
  },
  {
    name: "TAKANI",
    line1: "Catálogo con promos listo para cotizar por WhatsApp.",
    line2: "",
    url: "https://takani-uniforms.vercel.app",
    image: "/portfolio/takani.jpg",
    gradient: {
      from: "rgba(34,211,238,0.50)",
      via: "rgba(168,85,247,0.35)",
      to: "rgba(124,58,237,0.40)",
    },
    service: "Pro",
    extras: "Cotizar por WhatsApp",
  },
  {
    name: "FALCONMUSIC",
    line1: "Press kit para cerrar eventos.",
    line2: "WhatsApp directo y propuesta clara.",
    url: "https://falcon-music-presskit.vercel.app",
    image: "/portfolio/falconmusic.jpg",
    gradient: {
      from: "rgba(124,58,237,0.55)",
      via: "rgba(168,85,247,0.40)",
      to: "rgba(147,51,234,0.45)",
    },
    service: "Express",
    extras: "Cerrar eventos",
  },
];

/* ═══════════════════════════════════════
   Aurora background (low intensity)
   ═══════════════════════════════════════ */

function AuroraBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="showcase-blob"
        style={{
          width: 300,
          height: 300,
          top: "20%",
          left: "55%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.07), transparent 70%)",
          filter: "blur(100px)",
          animation: "showcase-aurora-1 22s ease-in-out infinite alternate",
        }}
      />
      <div
        className="showcase-blob"
        style={{
          width: 260,
          height: 260,
          top: "50%",
          left: "15%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.05), transparent 70%)",
          filter: "blur(90px)",
          animation: "showcase-aurora-2 18s ease-in-out infinite alternate",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════
   Work section
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

  return (
    <section id="work" className="relative z-[3] overflow-hidden pt-[12px] pb-[28px] md:pt-[20px] md:pb-[40px]">
      {/* Background handled by PageBackdrop */}

      <Container className="relative z-10">
        <SectionHeader kicker="Proyectos" title="Casos reales en vivo." accentWord="reales" subcopy="Abre los sitios y comprueba el nivel." compact />

        {/* Mobile: SwipeDeck fades in smoothly — no scale/blur to avoid jank */}
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

      {/* Desktop: horizontal scroll gallery — full viewport width (outside Container) */}
      {isDesktop && (
        <div className="relative z-10">
          <HorizontalGallery projects={PROJECTS} />
        </div>
      )}
    </section>
  );
}
