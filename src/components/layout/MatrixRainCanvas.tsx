"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════
   ParticleField — Light Theme
   Subtle dust motes floating upward
   Purple rgba(168,85,247) + Cyan rgba(6,182,212)
   Low alpha on #fafafa background
   ═══════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  radius: number;
  r: number;
  g: number;
  b: number;
  vy: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
  opacityMin: number;
  opacityMax: number;
  opacitySpeed: number;
  opacityOffset: number;
  glow: boolean;
}

const COLOR_CHANNELS: [number, number, number][] = [
  [168, 85, 247], // purple
  [6, 182, 212],  // cyan
];

function createParticles(width: number, height: number, count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const isLarge = Math.random() < 0.15;
    const [r, g, b] = COLOR_CHANNELS[Math.floor(Math.random() * COLOR_CHANNELS.length)];
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: isLarge ? 5 + Math.random() : 2 + Math.random() * 2,
      r,
      g,
      b,
      vy: 0.1 + Math.random() * 0.2,
      swayAmplitude: 0.5 + Math.random() * 0.5,
      swaySpeed: 0.005 + Math.random() * 0.01,
      swayOffset: Math.random() * Math.PI * 2,
      opacityMin: 0.08,
      opacityMax: 0.10 + Math.random() * 0.05, // 0.10-0.15
      opacitySpeed: 0.008 + Math.random() * 0.012,
      opacityOffset: Math.random() * Math.PI * 2,
      glow: isLarge,
    });
  }
  return particles;
}

export default function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const reducedRef = useRef(false);
  const hiddenRef = useRef(false);
  const rafRef = useRef(0);
  const frameRef = useRef(0);

  // Prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const handler = () => {
      hiddenRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let prevWidth = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (w !== prevWidth) {
        prevWidth = w;
        const count = w < 768 ? 20 : 40;
        particlesRef.current = createParticles(w, h, count);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      if (hiddenRef.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;
      const frame = frameRef.current++;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedRef.current) {
          p.y -= p.vy;

          if (p.y < -p.radius * 2) {
            p.y = h + p.radius * 2;
            p.x = Math.random() * w;
          }
        }

        const swayX = reducedRef.current
          ? 0
          : Math.sin(frame * p.swaySpeed + p.swayOffset) * p.swayAmplitude;
        const drawX = p.x + swayX;

        const breathFactor = reducedRef.current
          ? 0.5
          : (Math.sin(frame * p.opacitySpeed + p.opacityOffset) + 1) / 2;
        const opacity =
          p.opacityMin + (p.opacityMax - p.opacityMin) * breathFactor;

        if (p.glow) {
          const gradient = ctx.createRadialGradient(
            drawX,
            p.y,
            0,
            drawX,
            p.y,
            p.radius * 3
          );
          gradient.addColorStop(
            0,
            `rgba(${p.r}, ${p.g}, ${p.b}, ${opacity * 0.5})`
          );
          gradient.addColorStop(1, "transparent");
          ctx.globalAlpha = 1;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(drawX, p.y, p.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core circle
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(drawX, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
