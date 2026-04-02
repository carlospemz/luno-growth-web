"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { revealVariants, revealSlowVariants, MOTION } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  slow?: boolean;
}

export default function Reveal({ children, className, delay, slow }: RevealProps) {
  const variants = slow ? revealSlowVariants : revealVariants;
  const dur = slow ? MOTION.duration.slow : MOTION.duration.base;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION.viewport}
      transition={
        delay
          ? { duration: dur, ease: [...MOTION.ease], delay }
          : undefined
      }
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
