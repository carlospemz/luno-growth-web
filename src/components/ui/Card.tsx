"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import "@/styles/luno-landing.css";

type CardVariant = "default" | "silver" | "gold" | "onyx";

/* ── Variant → CSS class from luno-landing.css ─────────────────────── */
const VARIANT_CLASS: Record<CardVariant, string> = {
  default: "card-glass card-glass--standard",
  silver: "card-glass card-glass--standard",
  gold: "card-glass card-glass--recommended",
  onyx: "card-glass card-glass--premium",
};

/* ── Inline styles per variant (light theme) ───────────────────────── */
const BASE_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  willChange: "transform",
};

const VARIANT_STYLE: Record<CardVariant, React.CSSProperties> = {
  default: {
    ...BASE_STYLE,
    border: "1px solid rgba(0,0,0,0.04)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  silver: {
    ...BASE_STYLE,
    border: "1px solid rgba(0,0,0,0.04)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  gold: {
    ...BASE_STYLE,
    border: "1.5px solid rgba(168,85,247,0.20)",
    boxShadow: "0 4px 20px rgba(168,85,247,0.08), 0 0 40px rgba(168,85,247,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  },
  onyx: {
    ...BASE_STYLE,
    border: "1px solid rgba(6,182,212,0.18)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05), 0 0 32px rgba(6,182,212,0.06)",
  },
};

const HOVER_SHADOW: Record<CardVariant, string> = {
  default: "0 4px 16px rgba(0,0,0,0.06)",
  silver: "0 4px 16px rgba(0,0,0,0.06)",
  gold: "0 8px 32px rgba(168,85,247,0.12), 0 0 48px rgba(168,85,247,0.08), 0 2px 8px rgba(0,0,0,0.04)",
  onyx: "0 6px 24px rgba(6,182,212,0.10), 0 0 40px rgba(6,182,212,0.06), 0 2px 8px rgba(0,0,0,0.04)",
};

export default function Card({
  children,
  className = "",
  variant = "default",
  collider = false,
  shine = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  collider?: boolean;
  shine?: boolean;
}) {
  return (
    <motion.div
      initial={false}
      whileHover={{ y: -2, boxShadow: HOVER_SHADOW[variant] }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={VARIANT_STYLE[variant]}
      className={`${VARIANT_CLASS[variant]} relative overflow-hidden rounded-[20px] p-6 md:p-7 ${className}`}
    >
      {shine && <div className="card-shine" />}
      <div className="relative z-[2]">{children}</div>
    </motion.div>
  );
}
