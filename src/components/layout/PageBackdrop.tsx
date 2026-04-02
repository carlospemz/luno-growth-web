"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import "@/styles/hero.css";

/**
 * PageBackdrop — fixed global background with scroll-reactive aurora.
 * Light theme: clean #fafafa → white with barely-there color washes.
 * Opal-on-light aesthetic: gentle, subtle, premium.
 */
export default function PageBackdrop() {
  const { scrollYProgress } = useScroll();

  /* Subtle gradient shift as user scrolls */
  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  /* Gentle scroll-reactive opacity — tiny range, never jarring */
  const purpleOp = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.04, 0.03, 0.035, 0.04],
  );
  const cyanOp = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.03, 0.04, 0.03],
  );
  const magentaOp = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.03, 0.025, 0.035, 0.03],
  );

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base gradient — light gray to white, shifts subtly with scroll */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: "-15%",
          bottom: "-15%",
          background:
            "linear-gradient(180deg, #fafafa 0%, #fafafa 25%, #ffffff 50%, #fafafa 75%, #fafafa 100%)",
          y: gradientY,
        }}
      />

      {/* Aurora blob 1 — purple, largest, centered-top */}
      <motion.div
        className="hero-blob"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 900,
          maxHeight: 900,
          top: "5%",
          left: "50%",
          marginLeft: "-35vw",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.04), transparent 70%)",
          filter: "blur(180px)",
          animation: "aurora-1 20s ease-in-out infinite alternate",
          opacity: purpleOp,
        }}
      />

      {/* Aurora blob 2 — cyan, mid-right */}
      <motion.div
        className="hero-blob"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 750,
          maxHeight: 750,
          top: "35%",
          left: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.03), transparent 70%)",
          filter: "blur(200px)",
          animation: "aurora-2 16s ease-in-out infinite alternate",
          opacity: cyanOp,
        }}
      />

      {/* Aurora blob 3 — magenta, bottom-left */}
      <motion.div
        className="hero-blob"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "55%",
          left: "10%",
          background:
            "radial-gradient(circle, rgba(192,38,211,0.03), transparent 70%)",
          filter: "blur(150px)",
          animation: "aurora-3 18s ease-in-out infinite alternate",
          opacity: magentaOp,
        }}
      />
    </div>
  );
}
