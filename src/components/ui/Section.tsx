"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "./Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section — structural wrapper.
 */
export default function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative z-[3] py-[24px] md:py-[40px] ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  subtitle,
  subcopy,
  accentWord,
  compact = false,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  subcopy?: string;
  accentWord?: string;
  compact?: boolean;
}) {
  const renderTitle = () => {
    if (!accentWord) return title;
    const idx = title.lastIndexOf(accentWord);
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + accentWord.length);
    return (
      <>
        {before}
        <span className="brand-gradient-text">{accentWord}</span>
        {after}
      </>
    );
  };

  return (
    <div className={`${compact ? "mb-6" : "mb-12"} max-w-[62ch]`}>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...EASE] }}
          className="section-title mb-5"
        >
          {kicker}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [...EASE], delay: 0.06 }}
        className="text-2xl font-semibold leading-[1.15] tracking-tight text-zinc-900 md:text-3xl"
      >
        {renderTitle()}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...EASE], delay: 0.1 }}
          className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-zinc-500"
        >
          {subtitle}
        </motion.p>
      )}
      {subcopy && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.35, ease: [...EASE], delay: 0.12 }}
          className="mt-3 text-[13px] text-zinc-400"
        >
          {subcopy}
        </motion.p>
      )}

      {/* Mint line — Luno platform style */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [...EASE], delay: 0.15 }}
        className="mint-line mt-6 origin-left"
      />
    </div>
  );
}
