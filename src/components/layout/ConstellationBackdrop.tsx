"use client";

import { useEffect, useRef } from "react";

/**
 * ConstellationBackdrop — persistent canvas behind the whole page.
 *
 * Renders 30 stars on mobile / 60 on desktop over the deep indigo
 * background. Each star has a random twinkle phase (3–8s loop) and
 * ~15% of the stars are gold (bright), the rest are cream.
 *
 * Respects prefers-reduced-motion: freezes stars at their "on" state.
 * Cleans up requestAnimationFrame on unmount.
 *
 * Designed to be mounted ONCE at the root of the page, with
 * `position: fixed; inset: 0; z-index: -1`. It does NOT scroll with
 * the page — it sits still while content passes over it, reinforcing
 * the "night sky" backdrop metaphor.
 */
export default function ConstellationBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    type Star = {
      x: number;
      y: number;
      r: number;
      phase: number;
      period: number;
      gold: boolean;
    };

    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seed = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 768;
      const count = isMobile ? 30 : 60;

      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.6 + Math.random() * 1.4,
          phase: Math.random() * Math.PI * 2,
          period: 3 + Math.random() * 5, // 3–8s
          gold: Math.random() < 0.15,
        });
      }
    };

    seed();

    let rafId = 0;
    let start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        // Twinkle: opacity 0.3 → 1 → 0.3
        const opacity = prefersReducedMotion
          ? 0.75
          : 0.3 + (0.7 * (0.5 + 0.5 * Math.sin((t * (2 * Math.PI)) / s.period + s.phase)));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = `rgba(232, 185, 49, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(245, 240, 225, ${opacity * 0.8})`;
        }
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      cancelAnimationFrame(rafId);
      seed();
      start = performance.now();
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      } else {
        draw(performance.now());
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "#0B1E38" }}
    />
  );
}
