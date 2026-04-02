"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import "@/styles/hero.css";

/**
 * PageBackdrop — fixed global background with rich aurora field.
 * Light theme: #fafafa canvas with visible, layered color washes.
 * Opal-inspired — iridescent, alive, premium.
 */
export default function PageBackdrop() {
  const { scrollYProgress } = useScroll();

  const gradientY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  /* Scroll-reactive opacities — noticeable and alive */
  const purpleOp = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.22, 0.16, 0.20, 0.18, 0.24],
  );
  const cyanOp = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.16, 0.22, 0.18, 0.20],
  );
  const magentaOp = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0.14, 0.10, 0.18, 0.14],
  );
  const roseOp = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.10, 0.16, 0.12, 0.14],
  );
  const tealOp = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.12, 0.18, 0.14],
  );
  const indigoOp = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.10, 0.14, 0.10, 0.16],
  );

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base gradient — shifts with scroll */}
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: "-15%",
          bottom: "-15%",
          background:
            "linear-gradient(180deg, #fafafa 0%, #f8f6ff 20%, #ffffff 45%, #f6fffe 65%, #fafafa 85%, #fafafa 100%)",
          y: gradientY,
        }}
      />

      {/* ─── Primary blobs ─── */}

      {/* 1. Large purple — hero area, centered */}
      <motion.div
        className="hero-blob"
        style={{
          width: "80vw",
          height: "80vw",
          maxWidth: 1100,
          maxHeight: 1100,
          top: "-5%",
          left: "50%",
          marginLeft: "-40vw",
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(168,85,247,0.18), rgba(168,85,247,0.06) 50%, transparent 75%)",
          filter: "blur(100px)",
          animation: "aurora-1 20s ease-in-out infinite alternate",
          opacity: purpleOp,
        }}
      />

      {/* 2. Cyan — mid-right, overlapping content */}
      <motion.div
        className="hero-blob"
        style={{
          width: "65vw",
          height: "65vw",
          maxWidth: 900,
          maxHeight: 900,
          top: "28%",
          left: "45%",
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, rgba(6,182,212,0.16), rgba(6,182,212,0.04) 55%, transparent 75%)",
          filter: "blur(120px)",
          animation: "aurora-2 16s ease-in-out infinite alternate",
          opacity: cyanOp,
        }}
      />

      {/* 3. Magenta — bottom-left */}
      <motion.div
        className="hero-blob"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 800,
          maxHeight: 800,
          top: "52%",
          left: "5%",
          background:
            "radial-gradient(circle, rgba(192,38,211,0.14), rgba(192,38,211,0.04) 50%, transparent 70%)",
          filter: "blur(100px)",
          animation: "aurora-3 18s ease-in-out infinite alternate",
          opacity: magentaOp,
        }}
      />

      {/* ─── Secondary blobs — more depth and coverage ─── */}

      {/* 4. Rose/pink — top-right, creates warmth */}
      <motion.div
        className="hero-blob"
        style={{
          width: "45vw",
          height: "50vw",
          maxWidth: 650,
          maxHeight: 700,
          top: "8%",
          right: "0%",
          background:
            "radial-gradient(ellipse 50% 60% at 50% 40%, rgba(244,114,182,0.12), rgba(244,114,182,0.03) 55%, transparent 75%)",
          filter: "blur(110px)",
          animation: "aurora-4 22s ease-in-out infinite alternate",
          opacity: roseOp,
        }}
      />

      {/* 5. Deep teal — mid-left, cool contrast */}
      <motion.div
        className="hero-blob"
        style={{
          width: "50vw",
          height: "45vw",
          maxWidth: 700,
          maxHeight: 650,
          top: "40%",
          left: "-8%",
          background:
            "radial-gradient(ellipse 55% 50% at 55% 50%, rgba(20,184,166,0.12), rgba(20,184,166,0.03) 50%, transparent 70%)",
          filter: "blur(130px)",
          animation: "aurora-5 19s ease-in-out infinite alternate",
          opacity: tealOp,
        }}
      />

      {/* 6. Indigo — bottom-right, depth anchor */}
      <motion.div
        className="hero-blob"
        style={{
          width: "55vw",
          height: "50vw",
          maxWidth: 750,
          maxHeight: 700,
          top: "60%",
          right: "-5%",
          background:
            "radial-gradient(ellipse 50% 55% at 45% 50%, rgba(99,102,241,0.10), rgba(99,102,241,0.03) 50%, transparent 70%)",
          filter: "blur(120px)",
          animation: "aurora-6 24s ease-in-out infinite alternate",
          opacity: indigoOp,
        }}
      />

      {/* 7. Small hot spot — purple concentrated, near hero for punch */}
      <motion.div
        className="hero-blob"
        style={{
          width: "25vw",
          height: "25vw",
          maxWidth: 400,
          maxHeight: 400,
          top: "15%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.20), transparent 60%)",
          filter: "blur(80px)",
          animation: "aurora-7 14s ease-in-out infinite alternate",
          opacity: purpleOp,
        }}
      />

      {/* 8. Small cyan hot spot — pricing area accent */}
      <motion.div
        className="hero-blob"
        style={{
          width: "20vw",
          height: "20vw",
          maxWidth: 350,
          maxHeight: 350,
          top: "45%",
          right: "15%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.16), transparent 55%)",
          filter: "blur(70px)",
          animation: "aurora-2 12s ease-in-out infinite alternate-reverse",
          opacity: cyanOp,
        }}
      />
    </div>
  );
}
