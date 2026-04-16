"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import { VincentDiamond } from "@/components/ui/VincentWordmark";

/**
 * ManifestoQuote — Angel's quote, rendered on cream background.
 *
 * This is the ONE block in the whole scroll that breaks from indigo
 * to cream. It's a rhythm break that forces the reader to slow down
 * and read.
 */
export default function ManifestoQuote() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      id="manifesto"
      className="relative py-24 md:py-32"
      style={{ background: "#F5F0E1", color: "#0B1E38" }}
      aria-labelledby="manifesto-heading"
    >
      <Container>
        <div className="mx-auto max-w-[860px] text-center">
          {/* Top kicker */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-10 vin-text-on-cream-dim"
          >
            Manifiesto · Abril 2026
          </motion.p>

          {/* Diamond ornament — top */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="flex justify-center mb-10"
            aria-hidden="true"
          >
            <VincentDiamond size={16} color="#0B1E38" />
          </motion.div>

          {/* Quote */}
          <motion.h2
            id="manifesto-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-headline text-[36px] md:text-[60px] lg:text-[72px] font-extrabold uppercase leading-[0.96] tracking-tight mb-10 vin-text-on-cream-strong"
            style={{ textWrap: "balance" }}
          >
            “Somos el estudio de Van Gogh si Van Gogh hubiera nacido en 2026.”
          </motion.h2>

          {/* Attribution */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="italic text-[14px] md:text-[16px] vin-text-on-cream-muted"
          >
            — Ángel Villarreal, Abril 2026
          </motion.p>

          {/* Diamond ornament row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 flex justify-center gap-4"
            aria-hidden="true"
          >
            <VincentDiamond size={8} color="rgba(232, 185, 49, 0.6)" />
            <VincentDiamond size={10} color="#E8B931" />
            <VincentDiamond size={8} color="rgba(232, 185, 49, 0.6)" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
