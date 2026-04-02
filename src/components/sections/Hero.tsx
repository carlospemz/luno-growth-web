"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import "@/styles/luno-landing.css";
import Container from "@/components/ui/Container";
import { quoteUrl } from "@/config/contact";

const pop: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── Floating browser mockup ─────────────────────────── */
function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: pop, delay: 0.5 }}
      className="relative mx-auto mt-12 w-full max-w-[520px]"
    >
      {/* Glow behind */}
      <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-br from-purple-400/10 via-cyan-400/8 to-purple-400/6 blur-2xl" />

      {/* Browser chrome */}
      <div className="relative overflow-hidden rounded-[16px] border border-zinc-200/70 bg-white shadow-lg shadow-purple-500/[0.04]">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-[10px] w-[10px] rounded-full bg-zinc-200" />
            <span className="h-[10px] w-[10px] rounded-full bg-zinc-200" />
            <span className="h-[10px] w-[10px] rounded-full bg-zinc-200" />
          </div>
          <div className="mx-auto flex h-6 w-48 items-center justify-center rounded-md bg-zinc-100/80 px-3">
            <span className="text-[10px] text-zinc-400">tunegocio.com</span>
          </div>
        </div>

        {/* Mockup content — abstract UI blocks */}
        <div className="relative p-5">
          {/* Hero area */}
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="h-2.5 w-32 rounded-full bg-gradient-to-r from-purple-400/30 to-cyan-400/30" />
            <div className="h-4 w-56 rounded-full bg-zinc-200/70" />
            <div className="h-3 w-44 rounded-full bg-zinc-100/80" />
            <div className="mt-2 flex gap-2">
              <div className="h-7 w-24 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 opacity-80" />
              <div className="h-7 w-20 rounded-lg border border-zinc-200 bg-white" />
            </div>
          </div>

          {/* Cards row */}
          <div className="flex gap-2.5 px-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex-1 rounded-lg border border-zinc-100 bg-zinc-50/50 p-3">
                <div className="h-2 w-12 rounded-full bg-purple-300/30" />
                <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-100" />
                <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-zinc-100" />
              </div>
            ))}
          </div>

          {/* Iridescent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.02] via-transparent to-cyan-500/[0.03]" />
        </div>
      </div>
    </motion.div>
  );
}

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

  const handleScrollToWork = useCallback(() => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col">
      <Container className="relative z-20 flex flex-1 flex-col items-center pb-5 md:pb-6">
        <div
          ref={revealRef}
          className="flex flex-1 flex-col items-center w-full"
        >
          {/* ——— Main content — vertically centered ——— */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {/* Logo badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: pop }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/50 bg-purple-50/60 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-purple-600">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
                Luno Growth
              </span>
            </motion.div>

            {/* H1 + sub + CTAs + microcopy */}
            <div className="flex max-w-[720px] flex-col items-center text-center">
              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: pop, delay: 0.1 }}
                className="text-[36px] md:text-[56px] lg:text-[64px] font-bold tracking-[-0.03em] text-zinc-900 leading-[1.05]"
                style={{ textWrap: "balance" }}
              >
                Interfaces de alto{" "}
                <span className="brand-gradient-text">impacto</span>{" "}
                que convierten en{" "}
                <span className="brand-gradient-text">clientes.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.25 }}
                className="mt-6 max-w-[460px] text-[16px] md:text-[18px] text-zinc-500 leading-relaxed"
              >
                Diseño, desarrollo y lanzamiento en 48–72h.{" "}
                <span className="text-zinc-400">Ruta directa a cotizar por WhatsApp.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: pop, delay: 0.35 }}
                className="mt-9 flex items-center gap-3.5"
              >
                <a
                  href="#pricing"
                  className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-[14px] font-semibold text-white shadow-md shadow-purple-500/15 transition-all hover:shadow-lg hover:shadow-purple-500/20 hover:brightness-105"
                >
                  Ver precios
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={quoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-zinc-200 bg-white px-6 py-3 text-[14px] font-semibold text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-900 hover:shadow-md"
                >
                  WhatsApp
                </a>
              </motion.div>

              {/* Microcopy */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.45 }}
                className="mt-4 text-[13px] text-zinc-400"
              >
                Respuesta en menos de 24h.
              </motion.p>
            </div>

            {/* Browser mockup */}
            <BrowserMockup />
          </div>

          {/* ——— Scroll cue ——— */}
          <motion.button
            type="button"
            onClick={handleScrollToWork}
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease, delay: 0.75 }}
            className="group mt-8 flex flex-col items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-600"
            aria-label="Ver evidencia"
          >
            <span className="text-[12px] font-medium tracking-wide uppercase">
              Mira la evidencia
            </span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </motion.button>
        </div>
      </Container>
    </section>
  );
}
