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

/* ── Inline styles per variant (dark theme) ───────────────────────── */
const BASE_STYLE: React.CSSProperties = {
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  willChange: "transform",
};

const VARIANT_STYLE: Record<CardVariant, React.CSSProperties> = {
  default: {
    ...BASE_STYLE,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
  },
  silver: {
    ...BASE_STYLE,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
  },
  gold: {
    ...BASE_STYLE,
    background: "rgba(168,85,247,0.1)",
    border: "1.5px solid rgba(168,85,247,0.3)",
    boxShadow: "0 4px 24px rgba(168,85,247,0.15), 0 0 48px rgba(168,85,247,0.08)",
  },
  onyx: {
    ...BASE_STYLE,
    background: "rgba(6,182,212,0.07)",
    border: "1px solid rgba(6,182,212,0.25)",
    boxShadow: "0 2px 16px rgba(0,0,0,0.3), 0 0 40px rgba(6,182,212,0.08)",
  },
};

const HOVER_SHADOW: Record<CardVariant, string> = {
  default: "0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.06)",
  silver: "0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.06)",
  gold: "0 8px 36px rgba(168,85,247,0.2), 0 0 56px rgba(168,85,247,0.1)",
  onyx: "0 6px 28px rgba(6,182,212,0.15), 0 0 48px rgba(6,182,212,0.08)",
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
