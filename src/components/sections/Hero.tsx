"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import "@/styles/luno-landing.css";
import Container from "@/components/ui/Container";
import { quoteUrl } from "@/config/contact";
import { HoverBorderGradient } from "@/components/ui/HoverBorderGradient";

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
    <section className="relative flex min-h-[100svh] flex-col">
      <Container className="relative z-20 flex flex-1 flex-col items-center pb-5 md:pb-6">
        <div
          ref={revealRef}
          className="flex flex-1 flex-col items-center w-full"
        >
          {/* ——— Main content — vertically centered ——— */}
          <div className="flex flex-1 flex-col items-center justify-center pt-16 md:pt-20">
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
                Tu negocio trabajando{" "}
                <span className="brand-gradient-text">cuando tú</span>{" "}
                no{" "}
                <span className="brand-gradient-text">puedes.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.25 }}
                className="mt-6 max-w-[460px] text-[16px] md:text-[18px] text-zinc-500 leading-relaxed"
              >
                Más mensajes. Más ventas. Sin contratar equipo.{" "}
                <span className="text-zinc-400">IA + estrategas humanos. Una mensualidad. 30 días.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: pop, delay: 0.35 }}
                className="mt-9 flex items-center gap-3.5"
              >
                <HoverBorderGradient
                  as="a"
                  href="#pricing"
                  containerClassName="rounded-xl"
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold"
                  duration={1.2}
                >
                  Ver la oferta
                  <ArrowRight className="h-4 w-4" />
                </HoverBorderGradient>
                <a
                  href={quoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[14px] font-semibold text-zinc-300 transition-all hover:border-white/20 hover:text-white"
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
                Setup en 48h · Sin contratos · Tu competencia ya tiene esto.
              </motion.p>
            </div>

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
