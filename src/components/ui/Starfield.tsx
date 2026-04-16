"use client";

import { useEffect, useRef } from "react";

/**
 * Starfield — animated 3D-projected star tunnel.
 *
 * Adapted from a canvas-based starfield for VINCENT. Dropped
 * prop-types (project is TypeScript), kept the original math.
 * Stars are drawn as streaks from previous to current projection,
 * giving the "flying through space" feeling. No mouse tracking by
 * default — the hero wants calm motion, not interactivity.
 */

type StarTuple = [number, number, number, number, number, number, number, boolean];

interface StarfieldProps {
  starColor?: string;
  bgColor?: string;
  speed?: number;
  quantity?: number;
}

export function Starfield({
  starColor = "rgba(245, 240, 225, 1)",
  bgColor = "rgba(11, 30, 56, 0)",
  speed = 0.4,
  quantity = 260,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = parent.clientWidth;
    let h = parent.clientHeight;
    let cx = Math.round(w / 2);
    let cy = Math.round(h / 2);
    let cz = (w + h) / 2;
    let colorRatio = 1 / cz;
    const ratio = quantity / 2;

    const measure = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      cx = Math.round(w / 2);
      cy = Math.round(h / 2);
      cz = (w + h) / 2;
      colorRatio = 1 / cz;
    };

    const bigBang = (): StarTuple[] =>
      Array.from({ length: quantity }, () => [
        Math.random() * w * 2 - cx * 2,
        Math.random() * h * 2 - cy * 2,
        Math.round(Math.random() * cz),
        0,
        0,
        0,
        0,
        true,
      ]);

    let stars: StarTuple[] = bigBang();

    const setupCanvas = () => {
      measure();
      canvas.width = w;
      canvas.height = h;
      ctx.fillStyle = bgColor;
      ctx.strokeStyle = starColor;
    };
    setupCanvas();

    const resize = () => {
      const pw = parent.clientWidth;
      const ph = parent.clientHeight;
      if (pw === w && ph === h) return;
      const oldW = w;
      const oldH = h;
      measure();
      const rw = w / oldW;
      const rh = h / oldH;
      canvas.width = w;
      canvas.height = h;
      stars = stars.map((star) => {
        const ns: StarTuple = [...star] as StarTuple;
        ns[0] = star[0] * rw;
        ns[1] = star[1] * rh;
        ns[3] = cx + (ns[0] / ns[2]) * ratio;
        ns[4] = cy + (ns[1] / ns[2]) * ratio;
        return ns;
      });
      ctx.fillStyle = bgColor;
      ctx.strokeStyle = starColor;
    };

    const update = () => {
      stars = stars.map((star) => {
        const ns: StarTuple = [...star] as StarTuple;
        ns[7] = true;
        ns[5] = ns[3];
        ns[6] = ns[4];

        ns[2] -= speed;
        if (ns[2] > cz) {
          ns[2] -= cz;
          ns[7] = false;
        }
        if (ns[2] < 0) {
          ns[2] += cz;
          ns[7] = false;
        }

        ns[3] = cx + (ns[0] / ns[2]) * ratio;
        ns[4] = cy + (ns[1] / ns[2]) * ratio;
        return ns;
      });
    };

    const draw = () => {
      ctx.fillStyle = bgColor;
      ctx.clearRect(0, 0, w, h);
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = starColor;

      for (const star of stars) {
        if (
          star[5] > 0 &&
          star[5] < w &&
          star[6] > 0 &&
          star[6] < h &&
          star[7]
        ) {
          ctx.lineWidth = (1 - colorRatio * star[2]) * 2;
          ctx.beginPath();
          ctx.moveTo(star[5], star[6]);
          ctx.lineTo(star[3], star[4]);
          ctx.stroke();
          ctx.closePath();
        }
      }
    };

    let rafId = 0;
    const loop = () => {
      resize();
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [starColor, bgColor, speed, quantity]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
