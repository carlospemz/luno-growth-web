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
    <section id="contact" className="relative z-[3] py-[24px] md:py-[40px]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [...MOTION.easeOut] }}
          className="mx-auto max-w-[540px] text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.38, ease: [...MOTION.ease], delay: 0.06 }}
            className="font-heading text-[32px] font-bold leading-[1.15] tracking-[-0.02em] text-zinc-900 md:text-[48px]"
          >
            Tu próximo{" "}
            <GlitchText
              className="text-purple-600"
              style={{ textShadow: "0 0 20px rgba(147,51,234,0.25)" }}
              active={active}
              reduced={reduced}
              cadence={{ base: 1000, jitter: 300, duration: 160 }}
            >
              proyecto
            </GlitchText>{" "}
            empieza aquí.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.1 }}
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
              className="btn-secondary-alive"
            >
              WhatsApp directo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="mt-5 text-[13px] text-zinc-400"
          >
            Respuesta en menos de 24h.
          </motion.p>
        </motion.div>
      </Container>

      {/* Footer — slides up from bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.15 }}
      >
        <Container className="mt-16 border-t border-zinc-200/80 pt-6">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-[12px] text-zinc-300">
              &copy; {new Date().getFullYear()} Luno Growth
            </p>
            <a
              href={contactEmailUrl()}
              className="text-[12px] text-zinc-400 transition-colors hover:text-purple-600"
            >
              {contactEmail}
            </a>
            <p className="text-[12px] text-zinc-300">Next.js + Vercel</p>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
