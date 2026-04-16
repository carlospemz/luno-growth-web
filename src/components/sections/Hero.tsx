"use client";

import { useRef, useState, useEffect, useMemo, lazy, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import "@/styles/luno-landing.css";
import Container from "@/components/ui/Container";
import { Starfield } from "@/components/ui/Starfield";
import { waAnchorProps } from "@/config/contact";

const VincentWarpShader = lazy(
  () => import("@/components/ui/VincentWarpShader"),
);

const pop: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/**
 * Hero — beat 1 of the arrival sequence.
 *
 * Composition is now split into three intentional zones:
 *
 *   Zone 1 (top)      · pill badge + wordmark
 *   Zone 2 (center)   · headline + subcopy
 *   Zone 3 (bottom)   · CTA + mono microcopy + "La noche empieza" cue
 *
 * Each zone sits inside a flex column with `justify-between`, so the
 * three blocks push away from each other intentionally instead of
 * clumping in the middle. The min-height is 100svh so the hero owns
 * the first screen in full — an opening scene, not a compact tile.
 */
export default function Hero() {
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInView = useInView(revealRef, { once: true, amount: 0.15 });
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setFontsReady(true), 500);
    document.fonts.ready.then(() => {
      clearTimeout(timeout);
      setFontsReady(true);
    });
    return () => clearTimeout(timeout);
  }, []);

  const show = revealInView && fontsReady;
  const waProps = waAnchorProps();

  // Rotating phrases that follow "Tu negocio". Every phrase has to
  // work as the setup for "Tú sí." — i.e. the business does what
  // you shouldn't have to. "Tú sí" = tú sí puedes parar, descansar,
  // vivir.
  const phrases = useMemo(
    () => [
      "nunca duerme.",
      "no descansa.",
      "no se cansa.",
      "nunca para.",
      "no se apaga.",
    ],
    [],
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 2600);
    return () => clearTimeout(t);
  }, [phraseIdx, phrases, show]);

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "115svh", background: "#0B1E38" }}
    >
      {/* Starfield — local canvas, hero-exclusive. Sits at z-0 so
          the global ConstellationBackdrop (which owns the moon)
          renders on top of it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      >
        <Starfield
          starColor="rgba(255, 253, 245, 1)"
          bgColor="rgba(11, 30, 56, 0)"
          speed={1.55}
          quantity={2200}
        />
      </div>

      {/* Warp shader — radial speed-lines in Vincent palette.
          Sits above the starfield, below atmospheric layers.
          `screen` blend drops the dark center, `opacity` keeps it ambient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      >
        <Suspense fallback={null}>
          <VincentWarpShader className="w-full h-full" />
        </Suspense>
      </div>

      {/* Top atmospheric horizon — soft cobalt haze in the upper
          third, suggesting deep distance. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "radial-gradient(140% 100% at 50% 0%, rgba(45, 78, 142, 0.26) 0%, rgba(45, 78, 142, 0.1) 38%, transparent 78%)",
          zIndex: 14,
        }}
      />

      {/* HeroMoon — distant, static, atmospherically softened.
          The moon sits in fixed position while the starfield
          streaks around it, giving the sense of traveling past
          stars while something far — too far to register motion —
          watches from infinity. Atmospheric blur + amplified glow
          reinforce the distance. */}
      {/* Earth — anchored to the TOP of the hero, flipped vertically.
          `mix-blend-mode: screen` drops the black "space" pixels of the
          photo so only the bright city lights + atmosphere are drawn
          over the starfield. The mask also fades the bottom edge. */}
      <img
        aria-hidden="true"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=85"
        alt=""
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "46%",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center 30%",
          transform: "scaleY(-1)",
          zIndex: 11,
          mixBlendMode: "screen",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 12%, rgba(0,0,0,0.8) 34%, rgba(0,0,0,1) 58%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 12%, rgba(0,0,0,0.8) 34%, rgba(0,0,0,1) 58%)",
        }}
        draggable={false}
      />

      {/* Soft cyan atmospheric rim where the planet dissolves */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0"
        style={{
          top: "44%",
          height: "2px",
          zIndex: 11,
          background:
            "linear-gradient(to right, transparent 0%, rgba(127, 214, 255, 0.24) 30%, rgba(150, 200, 240, 0.34) 50%, rgba(127, 214, 255, 0.24) 70%, transparent 100%)",
          filter: "blur(1px)",
        }}
      />

      {/* Bottom threshold — night deepens into a well so the
          observatory closes downward, giving way to the umbral. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 md:h-64"
        style={{
          background:
            "linear-gradient(to bottom, rgba(11, 30, 56, 0) 0%, rgba(10, 24, 44, 0.55) 32%, rgba(8, 20, 38, 0.9) 70%, #07152B 100%)",
          zIndex: 15,
        }}
      />
      {/* Gold doorframe light — thin warm line at the very bottom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, rgba(232, 185, 49, 0.18) 22%, rgba(232, 185, 49, 0.55) 50%, rgba(232, 185, 49, 0.18) 78%, transparent 100%)",
          boxShadow: "0 0 22px rgba(232, 185, 49, 0.28)",
          zIndex: 16,
        }}
      />

      <Container className="relative z-20 flex flex-1 flex-col items-center">
        <div
          ref={revealRef}
          className="flex flex-1 flex-col items-center w-full pt-[calc(env(safe-area-inset-top,0px)+96px)] md:pt-32 pb-16 md:pb-24"
        >
          {/* ── Badge — top of the observatory ─────────── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: pop }}
            className="mb-8 md:mb-10"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.22em]"
              style={{
                borderColor: "rgba(232, 185, 49, 0.32)",
                background: "rgba(232, 185, 49, 0.045)",
                color: "#E8B931",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "#E8B931" }}
              />
              VINCENT Growth
            </span>
          </motion.div>

          {/* ── Wordmark — observatory authority piece ──── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: pop, delay: 0.05 }}
            className="mb-16 md:mb-24"
          >
            <img
              src="/vincent-wordmark.png"
              alt="Vincent"
              className="h-[72px] md:h-[108px] w-auto"
              draggable={false}
            />
          </motion.div>

          {/* ── Headline — monumental, breathing ────────── */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: pop, delay: 0.15 }}
            className="font-headline text-center text-[48px] md:text-[80px] lg:text-[100px] font-extrabold uppercase leading-[0.9] tracking-tight max-w-[820px]"
            style={{ color: "#F5F0E1", textWrap: "balance" }}
          >
            Tu negocio
            <br />
            <span
              className="relative inline-flex w-full justify-center overflow-hidden"
              style={{
                height: "1em",
                minHeight: "1em",
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={phrases[phraseIdx]}
                  className="absolute left-0 right-0"
                  initial={{ y: "-110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "110%", opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 62,
                    damping: 16,
                    mass: 0.9,
                  }}
                  style={{ color: "#F5F0E1" }}
                >
                  {phrases[phraseIdx]}
                </motion.span>
              </AnimatePresence>
              {/* invisible sizer so the row holds its tallest phrase height */}
              <span className="invisible" aria-hidden="true">
                nunca se detiene.
              </span>
            </span>
            <br />
            <span className="vin-gradient-gold-text">Tú sí.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
            className="mt-10 md:mt-14 max-w-[560px] text-center text-[15px] md:text-[17px] leading-relaxed"
            style={{ color: "rgba(245, 240, 225, 0.72)" }}
          >
            Pintamos con código y con IA para que tu marca siga operando de
            noche: presencia, demanda y sistemas que no dependen de que tú
            improvises todos los días.
          </motion.p>

          {/* ── CTAs — primary dominant + secondary quiet ─ */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: pop, delay: 0.45 }}
            className="mt-14 md:mt-20 flex flex-col items-center gap-4"
          >
            <a
              {...waProps}
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-10 py-[18px] text-[14px] md:text-[15px] font-semibold transition-transform active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                color: "#0B1E38",
                boxShadow:
                  "0 6px 22px rgba(232, 185, 49, 0.22), 0 0 0 1px rgba(232, 185, 49, 0.4)",
                minWidth: "280px",
              }}
            >
              <MessageCircle className="h-4 w-4" />
              Habla con Vincent
            </a>
            <a
              href="#offers"
              className="text-[12px] md:text-[13px] font-mono uppercase tracking-[0.22em] transition-opacity hover:opacity-100"
              style={{ color: "rgba(245, 240, 225, 0.6)" }}
            >
              Ver oferta ↓
            </a>
          </motion.div>

          {/* ── Mono line — quietly anchored under the CTA */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="mt-7 md:mt-8 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-center"
            style={{ color: "rgba(245, 240, 225, 0.45)" }}
          >
            Desde $8,000 MXN · Sin contratos largos
          </motion.p>

          {/* Spacer so the cue floats at the bottom of the hero */}
          <div className="flex-1 min-h-[80px]" aria-hidden="true" />

          {/* ── Scroll cue — bottom of the observatory ──── */}
          <motion.a
            href="#split"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
            className="group flex flex-col items-center gap-2.5 transition-colors"
            style={{ color: "rgba(245, 240, 225, 0.45)" }}
            aria-label="Cruzar al interior del sistema"
          >
            <span className="font-mono text-[9px] md:text-[10px] font-medium tracking-[0.28em] uppercase">
              Entras al sistema
            </span>
            <motion.span
              aria-hidden="true"
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-[18px] w-[1px]"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(232, 185, 49, 0.7))",
              }}
            />
          </motion.a>
        </div>
      </Container>
    </section>
  );
}
