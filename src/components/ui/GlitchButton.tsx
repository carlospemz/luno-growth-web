"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlitchButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Legacy prop — kept for compatibility, no longer used */
  collider?: boolean;
}

export default function GlitchButton({
  href,
  children,
  icon,
  target,
  rel,
  className = "",
  style,
  onClick,
}: GlitchButtonProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[13px] font-medium transition-all duration-200 hover:from-purple-700 hover:to-cyan-600 hover:shadow-md active:scale-[0.98] ${className}`}
      style={style}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {icon}
      {children}
    </motion.a>
  );
}
