"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { whatsappUrl, contactEmail, contactEmailUrl } from "@/config/contact";
import { MOTION } from "@/lib/motion";
import VincentWordmark, { VincentDiamond } from "@/components/ui/VincentWordmark";
import "@/styles/luno-landing.css";

export default function Contact() {
  return (
    <section id="contact" className="relative z-[3] py-20 md:py-28">
      <Container>
        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: [...MOTION.easeOut] }}
          className="relative mx-auto max-w-[760px] overflow-hidden rounded-[28px] border px-8 py-16 md:px-16 md:py-20 text-center"
          style={{
            borderColor: "rgba(232, 185, 49, 0.25)",
            background: "rgba(11, 30, 56, 0.5)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            boxShadow:
              "0 10px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(232, 185, 49, 0.04)",
          }}
        >
          {/* Subtle gold glow corner */}
          <div
            className="absolute -top-20 -right-20 h-[240px] w-[240px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232, 185, 49, 0.18) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <VincentDiamond size={20} breathe />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: [...MOTION.ease], delay: 0.06 }}
              className="font-headline text-[36px] md:text-[56px] font-bold leading-[1] mb-4"
              style={{ color: "#F5F0E1", textWrap: "balance" }}
            >
              ¿Listo para recuperar{" "}
              <span className="vin-gradient-gold-text">el día?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.15 }}
              className="mx-auto max-w-[480px] text-[15px] md:text-[16px]"
              style={{ color: "rgba(245, 240, 225, 0.7)" }}
            >
              Cuéntanos tu caso. Vincent responde en horas, no en semanas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.22 }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
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
              <a
                href="#brief"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border px-7 py-3.5 text-[14px] font-semibold transition-colors"
                style={{
                  borderColor: "rgba(245, 240, 225, 0.25)",
                  color: "#F5F0E1",
                  background: "rgba(245, 240, 225, 0.04)",
                }}
              >
                Llenar brief
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(245, 240, 225, 0.42)" }}
            >
              Monclova · Monterrey · México · próximamente USA
            </motion.p>
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
        <div
          className="mt-20 border-t"
          style={{ borderTopColor: "rgba(245, 240, 225, 0.08)" }}
        />
        <Container className="pt-10 pb-6">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <VincentWordmark height={22} still aria-label="VINCENT" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(245,240,225,0.45)]">
                Growth
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
              <a
                href={contactEmailUrl()}
                className="flex items-center gap-1.5 text-[12px] font-mono transition-colors hover:text-[#E8B931]"
                style={{ color: "rgba(245, 240, 225, 0.55)" }}
              >
                <Mail className="h-3 w-3" />
                {contactEmail}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[12px] font-mono transition-colors hover:text-[#E8B931]"
                style={{ color: "rgba(245, 240, 225, 0.55)" }}
              >
                <MessageCircle className="h-3 w-3" />
                WhatsApp
              </a>
            </div>

            {/* Copyright */}
            <p
              className="font-mono text-[10px] tracking-[0.08em]"
              style={{ color: "rgba(245, 240, 225, 0.35)" }}
            >
              VINCENT © {new Date().getFullYear()} · built with ☾
            </p>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}
