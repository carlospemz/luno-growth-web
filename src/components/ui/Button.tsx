"use client";

import { type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { MOTION } from "@/lib/motion";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

interface ButtonProps extends HTMLMotionProps<"a"> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
  icon?: ReactNode;
}

const v: Record<Variant, string> = {
  primary:  "bg-violet-500 text-[#0a0a1a] font-semibold hover:brightness-110",
  secondary: "border border-border text-zinc-900 hover:border-white/[0.16] hover:text-white",
  ghost:    "text-zinc-500 hover:text-zinc-900",
};

const s: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] rounded-[12px]",
  md: "h-11 px-6 text-[15px] rounded-[14px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <motion.a
      className={`inline-flex items-center justify-center gap-2 transition-all duration-150 ${v[variant]} ${s[size]} ${className}`}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: MOTION.duration.fast, ease: [...MOTION.ease] }}
      {...props}
    >
      {icon}
      {children}
    </motion.a>
  );
}
