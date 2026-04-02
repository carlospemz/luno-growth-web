"use client";

import { motion } from "framer-motion";

interface SwipeHintProps {
  visible: boolean;
}

export default function SwipeHint({ visible }: SwipeHintProps) {
  if (!visible) return null;

  return (
    <p className="mb-4 flex items-center justify-center gap-1.5 text-[13px] text-muted/60">
      <span>Desliza para cambiar</span>
      <motion.span
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.8, repeat: 2, ease: "easeInOut" }}
        className="inline-block"
      >
        →
      </motion.span>
    </p>
  );
}
