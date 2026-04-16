"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Container from "./Container";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Section — canonical wrapper.
 *
 * Enforces the one-system rhythm for every regular content section:
 *  - vertical padding: py-20 mobile, py-28 desktop
 *  - container with shared horizontal padding
 *  - position relative + z-[3] so sticky / overlay layers honor the
 *    explicit z-index system from globals.css
 *
 * Sections that break the rhythm on purpose (Hero, VincentSplit,
 * ManifestoQuote) render their own <section> and don't use this.
 */
export default function Section({
  id,
  children,
  className = "",
  variant = "default",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "calm" | "inset";
}) {
  const variantClass =
    variant === "calm"
      ? "vin-bay-shell is-calm"
      : variant === "inset"
        ? "vin-bay-shell is-inset"
        : "vin-bay-shell";
  return (
    <section
      id={id}
      className={`relative z-[3] ${variantClass} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/**
 * SectionHeader — canonical section intro.
 *
 * Strict typographic contract:
 *  - kicker:  JetBrains Mono, 10-11px, uppercase, tracking 0.22em, gold at 85%
 *  - title:   Barlow Condensed ExtraBold, 32px mobile / 48px desktop,
 *             leading 0.98, uppercase optional via `monumental` prop,
 *             cream color, accentWord picks up gold gradient
 *  - subcopy: DM Sans, 15-16px, cream at 68%, leading relaxed
 *
 * `compact` halves the bottom margin (for sections where the first
 * real block already carries weight — e.g. Process, Founders).
 */
export function SectionHeader({
  kicker,
  title,
  subtitle,
  subcopy,
  accentWord,
  compact = false,
  monumental = true,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  subcopy?: string;
  accentWord?: string;
  compact?: boolean;
  monumental?: boolean;
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
        <span className="vin-gradient-gold-text">{accentWord}</span>
        {after}
      </>
    );
  };

  const titleClass = monumental
    ? "font-headline text-[32px] md:text-[48px] lg:text-[56px] font-extrabold uppercase leading-[0.96] tracking-tight"
    : "font-headline text-[26px] md:text-[36px] font-bold leading-[1.05] tracking-tight";

  return (
    <div className={`${compact ? "mb-6 md:mb-8" : "mb-8 md:mb-12"} max-w-[62ch]`}>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...EASE] }}
          className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-4"
          style={{ color: "rgba(232, 185, 49, 0.82)" }}
        >
          {kicker}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [...EASE], delay: 0.06 }}
        className={titleClass}
        style={{ color: "#F5F0E1", textWrap: "balance" }}
      >
        {renderTitle()}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [...EASE], delay: 0.12 }}
          className="mt-5 max-w-[56ch] text-[15px] md:text-[17px] leading-relaxed"
          style={{ color: "rgba(245, 240, 225, 0.72)" }}
        >
          {subtitle}
        </motion.p>
      )}

      {subcopy && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [...EASE], delay: 0.14 }}
          className="mt-4 max-w-[60ch] text-[14px] md:text-[15px] leading-relaxed"
          style={{ color: "rgba(245, 240, 225, 0.62)" }}
        >
          {subcopy}
        </motion.p>
      )}
    </div>
  );
}
