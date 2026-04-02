"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * PageBackdrop — fixed iridescent mesh gradient.
 * NO moving blobs. NO animation loops.
 * Just a rich, static color field that subtly shifts hue on scroll.
 * Opal/Linear-inspired — premium, calm, zero motion sickness.
 */
export default function PageBackdrop() {
  const { scrollYProgress } = useScroll();

  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base — warm off-white */}
      <div
        className="absolute inset-0"
        style={{ background: "#fafafa" }}
      />

      {/* Mesh gradient layer — multiple radial gradients composited */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: gradientY,
          background: `
            radial-gradient(ellipse 80% 50% at 20% 10%, rgba(168,85,247,0.08), transparent 60%),
            radial-gradient(ellipse 60% 70% at 80% 15%, rgba(244,114,182,0.06), transparent 55%),
            radial-gradient(ellipse 70% 50% at 60% 45%, rgba(6,182,212,0.07), transparent 55%),
            radial-gradient(ellipse 50% 60% at 15% 55%, rgba(20,184,166,0.05), transparent 50%),
            radial-gradient(ellipse 80% 60% at 75% 70%, rgba(147,51,234,0.06), transparent 55%),
            radial-gradient(ellipse 60% 40% at 40% 85%, rgba(99,102,241,0.05), transparent 50%)
          `,
        }}
      />

      {/* Top accent — stronger purple wash near hero */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{
          height: "60vh",
          background: `
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(168,85,247,0.06), transparent 70%),
            radial-gradient(ellipse 50% 80% at 25% 20%, rgba(192,38,211,0.04), transparent 60%)
          `,
          y: gradientY,
        }}
      />

      {/* Mid accent — cyan wash at content area */}
      <div
        className="absolute inset-x-0"
        style={{
          top: "35%",
          height: "40vh",
          background: `
            radial-gradient(ellipse 70% 50% at 70% 50%, rgba(6,182,212,0.05), transparent 60%),
            radial-gradient(ellipse 50% 60% at 20% 40%, rgba(168,85,247,0.04), transparent 55%)
          `,
        }}
      />

      {/* Bottom accent — warm close */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "50vh",
          background: `
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(147,51,234,0.05), transparent 65%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20,184,166,0.04), transparent 55%)
          `,
        }}
      />

      {/* Noise texture overlay for depth — very subtle */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
