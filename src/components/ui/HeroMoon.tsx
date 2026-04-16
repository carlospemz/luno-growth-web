"use client";

import { useEffect, useRef } from "react";

/**
 * HeroMoon — realistic moon render on a local canvas.
 *
 * The canvas renders ONLY the lunar disc (clipped). The outer
 * atmospheric glow / warm halo are rendered as CSS radial-gradients
 * in a parent div so they blend seamlessly with whatever sky is
 * behind the component — no rectangular glow artifacts.
 *
 * Layers drawn on canvas:
 *   1. Base disc with directional light gradient
 *   2. Terminator shadow — soft cool shadow on the unlit side
 *   3. Mare (dark plains) — 5–7 large soft dark patches
 *   4. Crater field — ~60 craters
 *   5. Gold rim arc on the lit edge
 *   6. Cream specular highlight
 */

interface HeroMoonProps {
  size?: number;
}

type Crater = {
  x: number;
  y: number;
  r: number;
  depth: number;
};

export function HeroMoon({ size = 360 }: HeroMoonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = size;
    const H = size;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // Moon disc occupies ~88% of the canvas; the rest is tight safe
    // margin so the rim arc + specular don't clip.
    const cx = W / 2;
    const cy = H / 2;
    const moonR = W * 0.44;

    // Deterministic pseudo-random
    let seed = 13721;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const craters: Crater[] = [];
    while (craters.length < 64) {
      // Points uniformly inside the moon disc (sqrt for radial dist)
      const ang = rand() * Math.PI * 2;
      const rad = Math.sqrt(rand()) * moonR * 0.92;
      const r = 2 + rand() * 14;
      craters.push({
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad,
        r,
        depth: 0.4 + rand() * 0.6,
      });
    }

    const mare: Crater[] = [];
    while (mare.length < 6) {
      const ang = rand() * Math.PI * 2;
      const rad = Math.sqrt(rand()) * moonR * 0.7;
      mare.push({
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad,
        r: 14 + rand() * 26,
        depth: 0.15 + rand() * 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // ── 1. Base disc with directional light ──
      // Light source at top-right: gradient center offset
      const lightX = cx + moonR * 0.35;
      const lightY = cy - moonR * 0.4;
      const baseDisc = ctx.createRadialGradient(
        lightX,
        lightY,
        moonR * 0.1,
        cx,
        cy,
        moonR * 1.3,
      );
      baseDisc.addColorStop(0, "#FFFDF1"); // specular highlight
      baseDisc.addColorStop(0.12, "#F5EEDA"); // warm white
      baseDisc.addColorStop(0.35, "#DDD3B8"); // beige
      baseDisc.addColorStop(0.6, "#928770"); // mid shadow
      baseDisc.addColorStop(0.85, "#3D3A36"); // terminator dark
      baseDisc.addColorStop(1, "#1A1F2E"); // dissolved edge

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = baseDisc;
      ctx.fill();

      // ── 4. Terminator shadow — soft cool shadow on the
      // unlit side (bottom-left) ──
      const termX = cx - moonR * 0.5;
      const termY = cy + moonR * 0.45;
      const terminator = ctx.createRadialGradient(
        termX,
        termY,
        moonR * 0.2,
        termX,
        termY,
        moonR * 1.6,
      );
      terminator.addColorStop(0, "rgba(20, 25, 45, 0.75)");
      terminator.addColorStop(0.4, "rgba(20, 25, 45, 0.35)");
      terminator.addColorStop(0.9, "rgba(20, 25, 45, 0)");
      ctx.fillStyle = terminator;
      ctx.fill();

      // Clip to disc for craters + mare
      ctx.clip();

      // ── 5. Mare (dark plains) ──
      mare.forEach((m) => {
        const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
        grd.addColorStop(0, `rgba(55, 52, 48, ${m.depth})`);
        grd.addColorStop(0.7, `rgba(55, 52, 48, ${m.depth * 0.5})`);
        grd.addColorStop(1, "rgba(55, 52, 48, 0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });

      // ── 6. Crater field ──
      craters.forEach((c) => {
        // Shadow side (bottom-left of crater)
        const shadowOffset = c.r * 0.35;
        const pit = ctx.createRadialGradient(
          c.x - shadowOffset * 0.3,
          c.y - shadowOffset * 0.3,
          0,
          c.x,
          c.y,
          c.r,
        );
        pit.addColorStop(0, `rgba(255, 251, 235, ${0.35 * c.depth})`);
        pit.addColorStop(0.35, `rgba(220, 210, 185, ${0.18 * c.depth})`);
        pit.addColorStop(0.7, `rgba(35, 30, 25, ${0.45 * c.depth})`);
        pit.addColorStop(1, "rgba(35, 30, 25, 0)");
        ctx.fillStyle = pit;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();

        // Rim highlight on the lit side (top-right)
        const rim = ctx.createRadialGradient(
          c.x + shadowOffset * 0.4,
          c.y - shadowOffset * 0.4,
          c.r * 0.6,
          c.x + shadowOffset * 0.4,
          c.y - shadowOffset * 0.4,
          c.r * 0.95,
        );
        rim.addColorStop(0, "rgba(255, 252, 240, 0)");
        rim.addColorStop(0.85, `rgba(255, 252, 240, ${0.3 * c.depth})`);
        rim.addColorStop(1, "rgba(255, 252, 240, 0)");
        ctx.fillStyle = rim;
        ctx.beginPath();
        ctx.arc(c.x + shadowOffset * 0.4, c.y - shadowOffset * 0.4, c.r * 0.95, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();

      // ── 7. Gold rim arc on the lit edge ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, moonR, -Math.PI * 0.85, -Math.PI * 0.1);
      ctx.strokeStyle = "rgba(232, 185, 49, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ── 8. Cream specular highlight (top-right) ──
      const specular = ctx.createRadialGradient(
        cx + moonR * 0.35,
        cy - moonR * 0.45,
        0,
        cx + moonR * 0.35,
        cy - moonR * 0.45,
        moonR * 0.3,
      );
      specular.addColorStop(0, "rgba(255, 253, 242, 0.45)");
      specular.addColorStop(1, "rgba(255, 253, 242, 0)");
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, moonR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = specular;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [size]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: `${size * 2.2}px`,
        height: `${size * 2.2}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {/* Atmospheric bloom — rendered as CSS radial so it blends
          seamlessly with whatever sky sits behind. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(closest-side, rgba(255, 252, 238, 0.22) 0%, rgba(245, 240, 225, 0.12) 18%, rgba(180, 200, 235, 0.06) 40%, rgba(11, 30, 56, 0) 75%)",
          filter: "blur(2px)",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "relative",
        }}
      />
    </div>
  );
}
