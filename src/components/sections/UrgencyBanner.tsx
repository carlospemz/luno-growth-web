"use client";

import { motion } from "framer-motion";
import { VincentDiamond } from "@/components/ui/VincentWordmark";

/**
 * UrgencyBanner — rebranded to "soft kicker" per brand bible voice.
 * Calm confidence, not shouting. "Urgency" in VINCENT's voice means
 * "we're open and we're here", not "buy now, 5 spots left!".
 */
export default function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1 }}
      className="relative z-30 w-full overflow-hidden"
    >
      <div
        className="flex items-center justify-center gap-2.5 px-4 py-2.5 text-center"
        style={{
          background:
            "linear-gradient(to right, rgba(11, 30, 56, 0.9), rgba(45, 78, 142, 0.45), rgba(11, 30, 56, 0.9))",
          borderBottom: "1px solid rgba(232, 185, 49, 0.18)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <VincentDiamond size={8} breathe className="flex-shrink-0" />
        <p
          className="font-mono text-[10px] md:text-[11px] font-medium uppercase tracking-[0.16em]"
          style={{ color: "rgba(245, 240, 225, 0.72)" }}
        >
          Abril 2026 · Nuevos casos en Monclova y Monterrey ·{" "}
          <a
            href="#offers"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "#E8B931" }}
          >
            Ver la oferta
          </a>
        </p>
      </div>
    </motion.div>
  );
}
