"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "@/styles/luno-landing.css";
import Container from "@/components/ui/Container";
import { quoteUrl } from "@/config/contact";

const pop: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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
    <section className="relative flex min-h-[100svh] flex-col bg-[#fafafa]">
      <Container className="relative z-20 flex flex-1 flex-col items-center pb-5 md:pb-6">
        <div
          ref={revealRef}
          className="flex flex-1 flex-col items-center w-full"
        >
          {/* ——— Main content — vertically centered ——— */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {/* Logo text */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: pop }}
              className="mb-6"
            >
              <span className="brand-gradient-text text-[13px] font-medium uppercase tracking-[0.12em]">
                Luno Growth
              </span>
            </motion.div>

            {/* H1 + sub + CTAs + microcopy */}
            <div className="flex max-w-[640px] flex-col items-center text-center">
              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: pop, delay: 0.1 }}
                className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-900 leading-[1.1]"
                style={{ textWrap: "balance" }}
              >
                Interfaces de alto{" "}
                <span className="brand-gradient-text">impacto</span>{" "}
                que convierten en{" "}
                <span className="brand-gradient-text">clientes.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.25 }}
                className="mt-5 max-w-[420px] text-[15px] md:text-[17px] text-zinc-500 leading-relaxed"
              >
                Claridad y confianza, con ruta directa a cotizar por WhatsApp.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: pop, delay: 0.35 }}
                className="mt-8 flex items-center gap-3"
              >
                <a
                  href="#pricing"
                  className="rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 text-[13px] font-medium text-white shadow-sm transition-shadow hover:shadow-md"
                >
                  Ver precios y paquetes
                </a>
                <a
                  href={quoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-[13px] font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-900"
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
          </div>

          {/* ——— Scroll cue ——— */}
          <motion.button
            type="button"
            onClick={handleScrollToWork}
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease, delay: 0.55 }}
            className="group flex flex-col items-center gap-2 text-zinc-400 transition-colors hover:text-zinc-600"
            aria-label="Ver evidencia"
          >
            <span className="text-[13px] font-medium tracking-wide">
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
