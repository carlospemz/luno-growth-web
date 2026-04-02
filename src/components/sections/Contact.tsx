"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import GlitchText from "@/components/ui/GlitchText";
import GlitchButton from "@/components/ui/GlitchButton";
import { useInViewActive } from "@/hooks/useInViewActive";
import { whatsappUrl, contactEmail, contactEmailUrl } from "@/config/contact";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

export default function Contact() {
  const [, active, reduced] = useInViewActive();

  return (
    <section id="contact" className="relative z-[3] py-[32px] md:py-[56px]">
      <Container>
        {/* CTA block with subtle gradient background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
          className="relative mx-auto max-w-[680px] overflow-hidden rounded-[24px] border border-zinc-200/50 bg-white px-8 py-14 text-center shadow-lg shadow-purple-500/[0.03] md:px-16 md:py-20"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-transparent to-cyan-50/30 pointer-events-none" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, ease: [...MOTION.ease], delay: 0.06 }}
              className="text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-zinc-900 md:text-[48px]"
            >
              Tu próximo{" "}
              <GlitchText
                className="text-purple-600"
                style={{ textShadow: "0 0 24px rgba(147,51,234,0.20)" }}
                active={active}
                reduced={reduced}
                cadence={{ base: 1000, jitter: 300, duration: 160 }}
              >
                proyecto
              </GlitchText>{" "}
              empieza aquí.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-4 text-[16px] text-zinc-500"
            >
              Dinos qué necesitas. Respondemos en menos de 24h.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.12 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <GlitchButton href="#brief">
                Llenar brief
              </GlitchButton>
              <Button
                variant="secondary"
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp directo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.15 }}
      >
        <Container className="mt-16 border-t border-zinc-200/60 pt-8 pb-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 text-[12px] font-bold text-white">
                L
              </span>
              <span className="text-[14px] font-semibold text-zinc-800">Luno Growth</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a
                href={contactEmailUrl()}
                className="text-[13px] text-zinc-400 transition-colors hover:text-purple-600"
              >
                {contactEmail}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-zinc-400 transition-colors hover:text-purple-600"
              >
                WhatsApp
              </a>
            </div>

            {/* Copyright */}
            <p className="text-[12px] text-zinc-300">
              &copy; {new Date().getFullYear()} Luno Growth &middot; Next.js + Vercel
            </p>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
