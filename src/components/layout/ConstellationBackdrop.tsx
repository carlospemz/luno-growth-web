"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ConstellationBackdrop — GLOBAL fixed night system.
 *
 * Strategic decision: the canvas is `position: fixed`, filling the
 * viewport, mounted ONCE at the top of the page. This solves two
 * problems the per-section approach created:
 *
 *   1. Stars stopped looking "anchored to the page" — because the
 *      canvas never scrolls. Drift is computed against the fixed
 *      viewport, not against a section that moves under the user's
 *      finger.
 *   2. The night now follows the user through EVERY indigo zone
 *      instead of dying between Hero and the next section.
 *
 * The backdrop auto-dims over cream sections (VincentSplit día,
 * ManifestoQuote) via IntersectionObserver + opacity transition.
 * It never invades reading areas on cream.
 *
 * Motion is driven entirely by `performance.now()` inside rAF —
 * completely independent of scroll. If the user stops scrolling,
 * the sky keeps living.
 *
 * Three star layers (far / mid / near) + a persistent moon with
 * its own 60s drift loop. Moon only shows when the viewport is
 * tall enough, to avoid crowding small mobile screens.
 */

type Props = {
  /** Elements whose selectors mark cream zones where the backdrop
   *  should fade out. Defaults to `#split` (día bottom half) and
   *  `#manifesto`. */
  creamZoneIds?: string[];
};

const DEFAULT_CREAM_ZONES = ["manifesto"];

export default function ConstellationBackdrop({
  creamZoneIds = DEFAULT_CREAM_ZONES,
}: Props = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  /** moonFade: 1 = full moon visible (hero in view), 0 = moon gone.
   *  Tracks how deep the user has scrolled past the hero. */
  const moonFadeRef = useRef(1);
  /** interiorFade: 1 = exterior (hero visible), 0.18 = interior
   *  (user has crossed the umbral; stars are no longer protagonist). */
  const [interiorFade, setInteriorFade] = useState(1);

  // Fade out when any cream zone is in view.
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const state: Record<string, number> = {};

    const update = () => {
      const maxRatio = Math.max(0, ...Object.values(state));
      const target = 1 - Math.min(1, maxRatio * 1.2);
      setOpacity(target);
    };

    for (const id of creamZoneIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      state[id] = 0;
      const obs = new IntersectionObserver(
        ([entry]) => {
          state[id] = entry.intersectionRatio;
          update();
        },
        {
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        },
      );
      obs.observe(el);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [creamZoneIds]);

  // Moon scroll fade — moon is a hero signature element, not a
  // follower. It lives in full opacity while the hero is on screen
  // and fades to zero by the time the user is 1.5 viewports deep.
  // Same scroll listener also drives interiorFade: stars dim to a
  // quiet background presence once the user crosses the umbral.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // Moon: start 0.4vh, done 1.2vh.
      const moonStart = vh * 0.4;
      const moonEnd = vh * 1.2;
      const moonRaw = 1 - (y - moonStart) / (moonEnd - moonStart);
      moonFadeRef.current = Math.max(0, Math.min(1, moonRaw));

      // Interior: stars dissolve as the user crosses the umbral
      // (0.45vh) and reach residual atmosphere (0.05) by 1.0vh.
      // The hero zone keeps the full sky; everything below it
      // becomes interior.
      const interiorStart = vh * 0.45;
      const interiorEnd = vh * 1.0;
      const interiorT = Math.max(
        0,
        Math.min(1, (y - interiorStart) / (interiorEnd - interiorStart)),
      );
      const target = 1 - interiorT * (1 - 0.05);
      setInteriorFade(target);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Main canvas / motion loop.
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
      dx: number;
      dy: number;
      driftPeriod: number;
      driftPhase: number;
    };

    type Moon = {
      baseX: number;
      baseY: number;
      driftX: number;
      driftY: number;
      period: number;
      radius: number;
    };

    let stars: Star[] = [];
    let moon: Moon | null = null;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    const startTime = performance.now();

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
      const count = isMobile ? 42 : 78;

      // Silent band in the vertical middle so stars don't overlap
      // the headline band of any hero-like viewport. 0.32 means the
      // middle 32% is off-limits.
      const halfBand = 0.16;
      const bandTop = 0.5 - halfBand;
      const bandBottom = 0.5 + halfBand;

      stars = [];
      for (let i = 0; i < count; i++) {
        const yNorm =
          Math.random() < 0.5
            ? Math.random() * bandTop
            : bandBottom + Math.random() * (1 - bandBottom);

        // Layers: 55% far, 35% mid, 10% near
        const layerRoll = Math.random();
        let layerR: number;
        let layerDx: number;
        let layerDy: number;
        let layerDriftPeriod: number;

        if (layerRoll < 0.5) {
          // FAR — small but visible, near-still
          layerR = 0.8 + Math.random() * 0.5;
          layerDx = 0;
          layerDy = 0;
          layerDriftPeriod = 0;
        } else if (layerRoll < 0.85) {
          // MID — clearly visible, slow drift
          layerR = 1.1 + Math.random() * 0.7;
          layerDx = (Math.random() - 0.5) * 10;
          layerDy = (Math.random() - 0.5) * 6;
          layerDriftPeriod = 20 + Math.random() * 22;
        } else {
          // NEAR — bright stars with real presence
          layerR = 1.6 + Math.random() * 1.1;
          layerDx = (Math.random() - 0.5) * 14;
          layerDy = (Math.random() - 0.5) * 9;
          layerDriftPeriod = 24 + Math.random() * 24;
        }

        stars.push({
          x: Math.random() * width,
          y: yNorm * height,
          r: layerR,
          phase: Math.random() * Math.PI * 2,
          period: 4 + Math.random() * 6,
          gold: Math.random() < 0.13,
          dx: layerDx,
          dy: layerDy,
          driftPeriod: layerDriftPeriod,
          driftPhase: Math.random() * Math.PI * 2,
        });
      }

      // Moon — always seeded when width is tall enough
      if (height > 480) {
        moon = {
          baseX: 0.78,
          baseY: isMobile ? 0.16 : 0.18,
          driftX: 10,
          driftY: 5,
          period: 72, // 72s independent loop
          radius: isMobile ? 48 : 72,
        };
      } else {
        moon = null;
      }
    };

    const draw = (now: number) => {
      const t = (now - startTime) / 1000;
      ctx.clearRect(0, 0, width, height);

      // ── Moon ── (Van Gogh-inspired, faded out once user scrolls past hero)
      //
      // Layered render:
      //   1. Wide atmospheric glow (4× radius, very soft cream)
      //   2. Inner halo (1.6× radius, warmer)
      //   3. Lunar disc with directional shading (light from upper-left)
      //   4. Terminator shadow on lower-right (makes it feel 3D, not a sticker)
      //   5. A couple of subtle crater hints for texture
      //   6. Thin gold arc on the lit edge
      const moonFade = moonFadeRef.current;
      if (moon && moonFade > 0.01) {
        const mx =
          moon.baseX * width +
          Math.sin((t * (2 * Math.PI)) / moon.period) * moon.driftX;
        const my =
          moon.baseY * height +
          Math.cos((t * (2 * Math.PI)) / moon.period) * moon.driftY;
        const R = moon.radius;

        // 1. Outer atmospheric glow — very wide, very soft
        const outerGlow = ctx.createRadialGradient(mx, my, R * 0.9, mx, my, R * 4);
        outerGlow.addColorStop(0, `rgba(245, 240, 225, ${0.12 * moonFade})`);
        outerGlow.addColorStop(0.4, `rgba(245, 240, 225, ${0.04 * moonFade})`);
        outerGlow.addColorStop(1, "rgba(245, 240, 225, 0)");
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(mx, my, R * 4, 0, Math.PI * 2);
        ctx.fill();

        // 2. Inner halo — warmer gold-ish tint
        const innerHalo = ctx.createRadialGradient(mx, my, R * 0.85, mx, my, R * 1.6);
        innerHalo.addColorStop(0, `rgba(245, 225, 180, ${0.22 * moonFade})`);
        innerHalo.addColorStop(1, "rgba(245, 225, 180, 0)");
        ctx.fillStyle = innerHalo;
        ctx.beginPath();
        ctx.arc(mx, my, R * 1.6, 0, Math.PI * 2);
        ctx.fill();

        // 3. Lunar disc — directional radial, lit from upper-left
        const disc = ctx.createRadialGradient(
          mx - R * 0.32,
          my - R * 0.32,
          0,
          mx,
          my,
          R * 1.05,
        );
        disc.addColorStop(0, `rgba(255, 251, 236, ${0.96 * moonFade})`);
        disc.addColorStop(0.35, `rgba(245, 240, 220, ${0.82 * moonFade})`);
        disc.addColorStop(0.7, `rgba(210, 200, 172, ${0.58 * moonFade})`);
        disc.addColorStop(1, `rgba(155, 140, 110, ${0.22 * moonFade})`);
        ctx.fillStyle = disc;
        ctx.beginPath();
        ctx.arc(mx, my, R, 0, Math.PI * 2);
        ctx.fill();

        // 4. Terminator — soft shadow on lower-right to give it 3D feel
        const terminator = ctx.createRadialGradient(
          mx + R * 0.5,
          my + R * 0.5,
          0,
          mx + R * 0.2,
          my + R * 0.2,
          R * 1.25,
        );
        terminator.addColorStop(0, `rgba(11, 30, 56, ${0.38 * moonFade})`);
        terminator.addColorStop(0.5, `rgba(11, 30, 56, ${0.1 * moonFade})`);
        terminator.addColorStop(1, "rgba(11, 30, 56, 0)");
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.fillStyle = terminator;
        ctx.fillRect(mx - R, my - R, R * 2, R * 2);
        ctx.restore();

        // 5. Crater hints — two small darker circles on the lit face
        ctx.save();
        ctx.beginPath();
        ctx.arc(mx, my, R, 0, Math.PI * 2);
        ctx.clip();

        ctx.fillStyle = `rgba(120, 108, 84, ${0.18 * moonFade})`;
        ctx.beginPath();
        ctx.arc(mx - R * 0.18, my - R * 0.08, R * 0.18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(120, 108, 84, ${0.14 * moonFade})`;
        ctx.beginPath();
        ctx.arc(mx + R * 0.05, my + R * 0.22, R * 0.12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(120, 108, 84, ${0.12 * moonFade})`;
        ctx.beginPath();
        ctx.arc(mx - R * 0.35, my + R * 0.28, R * 0.09, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 6. Thin gold rim arc on the lit side
        ctx.strokeStyle = `rgba(232, 185, 49, ${0.32 * moonFade})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mx, my, R - 0.6, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.stroke();
      }

      // ── Stars ──
      for (const s of stars) {
        const twinkle = prefersReducedMotion
          ? 0.55
          : 0.5 +
            0.5 * Math.sin((t * (2 * Math.PI)) / s.period + s.phase);

        const opacityVal = 0.28 + 0.62 * twinkle;
        const rPulse = s.r * (0.9 + 0.2 * twinkle);

        let x = s.x;
        let y = s.y;
        if (!prefersReducedMotion && s.driftPeriod > 0) {
          x +=
            Math.sin((t * (2 * Math.PI)) / s.driftPeriod + s.driftPhase) *
            s.dx;
          y +=
            Math.cos(
              (t * (2 * Math.PI)) / s.driftPeriod + s.driftPhase * 0.7,
            ) * s.dy;
        }

        ctx.beginPath();
        ctx.arc(x, y, rPulse, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = `rgba(232, 185, 49, ${opacityVal})`;
        } else {
          ctx.fillStyle = `rgba(245, 240, 225, ${opacityVal * 0.78})`;
        }
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };

    seed();
    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      cancelAnimationFrame(rafId);
      seed();
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      } else {
        draw(performance.now());
      }
    };
    window.addEventListener("resize", onResize);

    // Pause rAF when the tab is hidden — battery saver.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{
        /* z-index 2 so it sits above the html bg but below every
           flow element, which are either at z:10 (main) or z:30-60
           (navbar + mobilebar). Sections with explicit backgrounds
           (CTA blocks, cards, cream surfaces) naturally cover it. */
        zIndex: 2,
        opacity: opacity * interiorFade,
        transition: "opacity 0.45s ease",
        willChange: "opacity",
      }}
    />
  );
}
