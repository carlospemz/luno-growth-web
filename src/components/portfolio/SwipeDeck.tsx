"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PortfolioCard, { type Project } from "@/components/portfolio/PortfolioCard";
import SwipeHint from "@/components/portfolio/SwipeHint";
import Dots from "@/components/portfolio/Dots";

/* ═══════════════════════════════════════
   Constants
   ═══════════════════════════════════════ */

const SWIPE_PX = 50;
const SWIPE_VEL = 300;
const LOCK_DIST = 6;
const LOCK_RATIO = 1.4;

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

/* ═══════════════════════════════════════
   Velocity tracker
   ═══════════════════════════════════════ */

interface Sample { x: number; t: number }

function velocity(s: Sample[]) {
  if (s.length < 2) return 0;
  const dt = s[s.length - 1].t - s[0].t;
  return dt ? ((s[s.length - 1].x - s[0].x) / dt) * 1000 : 0;
}

/* ═══════════════════════════════════════
   Component
   ═══════════════════════════════════════ */

interface SwipeDeckProps {
  projects: Project[];
  reduced?: boolean;
}

export default function SwipeDeck({
  projects,
  reduced = false,
}: SwipeDeckProps) {
  const n = projects.length;

  const [cards, setCards] = useState(() => projects.map((_, i) => i));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [swapKey, setSwapKey] = useState(0);
  const busy = useRef(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 0, 250], [-5, 0, 5]);

  const phase = useRef<"idle" | "pending" | "h" | "v">("idle");
  const start = useRef({ x: 0, y: 0 });
  const samples = useRef<Sample[]>([]);

  /* ——— Cycle the deck ——— */

  const cycle = useCallback(
    (dir: 1 | -1) => {
      if (busy.current) return;
      busy.current = true;
      setHasInteracted(true);

      animate(x, dir * -240, {
        type: "tween",
        duration: 0.16,
        ease: EASE,
        onComplete() {
          x.jump(0);
          setCards((prev) =>
            dir === 1
              ? [...prev.slice(1), prev[0]]
              : [prev[prev.length - 1], ...prev.slice(0, -1)]
          );
          setSwapKey((k) => k + 1);
          setTimeout(() => { busy.current = false; }, 280);
        },
      });
    },
    [x],
  );

  /* ——— Pointer handlers (direction-locked) ——— */

  const onDown = useCallback(
    (e: ReactPointerEvent) => {
      if (busy.current || reduced || e.button !== 0) return;
      phase.current = "pending";
      start.current = { x: e.clientX, y: e.clientY };
      samples.current = [{ x: e.clientX, t: e.timeStamp }];
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [reduced],
  );

  const onMove = useCallback(
    (e: ReactPointerEvent) => {
      const p = phase.current;
      if (p === "idle" || p === "v") return;

      const dx = e.clientX - start.current.x;
      const dy = e.clientY - start.current.y;

      if (p === "pending") {
        const ax = Math.abs(dx);
        const ay = Math.abs(dy);
        if (ax > LOCK_DIST && ax > ay * LOCK_RATIO) {
          phase.current = "h";
        } else if (ay > LOCK_DIST && ay > ax * LOCK_RATIO) {
          phase.current = "v";
          return;
        } else {
          return;
        }
      }

      e.preventDefault();
      samples.current.push({ x: e.clientX, t: e.timeStamp });
      if (samples.current.length > 5) samples.current.shift();
      x.set(dx);
    },
    [x],
  );

  const onUp = useCallback(
    (e: ReactPointerEvent) => {
      const p = phase.current;
      phase.current = "idle";

      if (p !== "h") {
        if (x.get()) animate(x, 0, { type: "tween", duration: 0.18, ease: EASE });
        return;
      }

      const dx = e.clientX - start.current.x;
      const v = velocity(samples.current);

      if (Math.abs(dx) > SWIPE_PX || Math.abs(v) > SWIPE_VEL) {
        cycle(dx < 0 ? 1 : -1);
      } else {
        animate(x, 0, { type: "tween", duration: 0.18, ease: EASE });
      }
    },
    [x, cycle],
  );

  const onCancel = useCallback(() => {
    phase.current = "idle";
    animate(x, 0, { type: "tween", duration: 0.15, ease: EASE });
  }, [x]);

  /* ——— Keyboard ——— */

  const onKey = useCallback(
    (e: ReactKeyboardEvent) => {
      if (busy.current || reduced) return;
      if (e.key === "ArrowRight") cycle(1);
      if (e.key === "ArrowLeft") cycle(-1);
    },
    [reduced, cycle],
  );

  /* ——— A11y ——— */

  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    setAnnouncement(
      `Proyecto ${cards[0] + 1} de ${n}: ${projects[cards[0]].name}`,
    );
  }, [cards, n, projects]);

  /* ——— Reduced motion ——— */

  if (reduced) {
    return (
      <div className="flex flex-col gap-6">
        {projects.map((p) => (
          <PortfolioCard key={p.name} project={p} highlight />
        ))}
      </div>
    );
  }

  /* ═══════════════════════════════════════
     Render
     - ONLY the top card shows real content.
     - Behind cards are solid shapes (no images, no compositing).
     - Behind cards' DOM is hidden but kept mounted for image preload.
     ═══════════════════════════════════════ */

  return (
    <div>
      <SwipeHint visible={!hasInteracted} />

      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Portafolio de proyectos"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onCancel}
        className="relative mx-auto max-w-[640px] cursor-grab select-none outline-none active:cursor-grabbing"
        style={{ touchAction: "pan-y" }}
      >
        {/* ——— Stack indicators: solid card shapes, zero content ——— */}
        {n > 2 && (
          <div
            className="absolute inset-x-0 top-0 h-full rounded-[20px] border border-border"
            style={{
              backgroundColor: "var(--surface-1)",
              transform: "scale(0.92) translateY(24px)",
              transformOrigin: "top center",
              zIndex: 1,
            }}
            aria-hidden="true"
          />
        )}
        {n > 1 && (
          <div
            className="absolute inset-x-0 top-0 h-full rounded-[20px] border border-border"
            style={{
              backgroundColor: "var(--surface-1)",
              transform: "scale(0.96) translateY(12px)",
              transformOrigin: "top center",
              zIndex: 2,
            }}
            aria-hidden="true"
          />
        )}

        {/* ——— All cards rendered (images stay loaded), only top visible ——— */}
        {cards.map((projectIdx, slot) => {
          const isTop = slot === 0;
          return (
            <motion.div
              key={projectIdx}
              className={isTop ? "relative" : "absolute inset-x-0 top-0 pointer-events-none"}
              style={{
                zIndex: isTop ? 10 : 0,
                visibility: isTop ? "visible" : "hidden",
                ...(isTop ? { x, rotate } : {}),
              }}
            >
              <PortfolioCard project={projects[projectIdx]} highlight={isTop} glitchKey={isTop ? swapKey : undefined} />
            </motion.div>
          );
        })}

        <button type="button" onClick={() => cycle(1)} className="sr-only" aria-label="Siguiente proyecto">
          Siguiente
        </button>
        <button type="button" onClick={() => cycle(-1)} className="sr-only" aria-label="Proyecto anterior">
          Anterior
        </button>
      </div>

      <div className="mt-6">
        <Dots count={n} active={cards[0]} />
      </div>

      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
    </div>
  );
}
