"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import "@/styles/luno-landing.css";
import Container from "@/components/ui/Container";
import VincentWordmark from "@/components/ui/VincentWordmark";
import { whatsappUrl } from "@/config/contact";

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

  const handleScrollToOffers = useCallback(() => {
    document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <Container className="relative z-20 flex flex-1 flex-col items-center pb-5 md:pb-6">
        <div
          ref={revealRef}
          className="flex flex-1 flex-col items-center w-full"
        >
          {/* Main content — vertically centered */}
          <div className="flex flex-1 flex-col items-center justify-center pt-20 md:pt-28">
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: pop }}
              className="mb-8"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.2em]"
                style={{
                  borderColor: "rgba(232, 185, 49, 0.4)",
                  background: "rgba(232, 185, 49, 0.06)",
                  color: "#E8B931",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: "#E8B931" }}
                />
                VINCENT Growth · Abril 2026
              </span>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: pop, delay: 0.05 }}
              className="mb-8"
            >
              <VincentWordmark
                height={56}
                aria-label="VINCENT"
                className="md:h-20"
              />
            </motion.div>

            {/* H1 */}
            <div className="flex max-w-[780px] flex-col items-center text-center">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: pop, delay: 0.15 }}
                className="font-headline text-[44px] md:text-[68px] lg:text-[84px] font-extrabold uppercase leading-[0.95] tracking-tight"
                style={{ color: "#F5F0E1", textWrap: "balance" }}
              >
                Tu negocio nunca duerme.
                <br />
                <span className="vin-gradient-gold-text">Tú sí.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
                className="mt-7 max-w-[560px] text-[16px] md:text-[19px] leading-relaxed"
                style={{ color: "rgba(245, 240, 225, 0.72)" }}
              >
                Somos los artistas del futuro. Pintamos con código y con IA para que tu marca trabaje de noche y tú recuperes el día.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: pop, delay: 0.42 }}
                className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
              >
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-semibold"
                  style={{
                    background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                    color: "#0B1E38",
                  }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Habla con Vincent
                </a>
                <button
                  type="button"
                  onClick={handleScrollToOffers}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-semibold transition-colors"
                  style={{
                    borderColor: "rgba(245, 240, 225, 0.25)",
                    color: "#F5F0E1",
                    background: "rgba(245, 240, 225, 0.04)",
                  }}
                >
                  Ver la oferta
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>

              {/* Microcopy */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.55 }}
                className="mt-5 font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: "rgba(245, 240, 225, 0.5)" }}
              >
                Desde $8,000 MXN · Sin contratos largos · Setup en días, no meses
              </motion.p>
            </div>
          </div>

          {/* Scroll cue */}
          <motion.button
            type="button"
            onClick={handleScrollToOffers}
            initial={{ opacity: 0, y: 6 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease, delay: 0.8 }}
            className="group mt-10 flex flex-col items-center gap-2 transition-colors"
            style={{ color: "rgba(245, 240, 225, 0.42)" }}
            aria-label="Ver la oferta"
          >
            <span className="font-mono text-[10px] font-medium tracking-[0.2em] uppercase">
              Ver la oferta
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
