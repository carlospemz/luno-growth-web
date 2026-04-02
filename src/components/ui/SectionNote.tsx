"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronDown } from "lucide-react";

interface SectionNoteProps {
  summary: string;
  detail?: string;
  className?: string;
}

export default function SectionNote({ summary, detail, className = "" }: SectionNoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`mt-4 mx-auto max-w-[640px] rounded-[14px] border border-white/[0.06]
        bg-[rgba(36,17,47,0.5)] backdrop-blur-[12px] px-4 py-3 ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-cyan/40" />
        <div className="flex-1">
          <p className="text-[12px] leading-[1.5] text-muted/60">{summary}</p>
          {detail && (
            <>
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="mt-1 inline-flex items-center gap-1 text-[12px] font-medium
                  text-cyan/50 transition-colors hover:text-cyan/70"
              >
                Ver detalle
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown className="h-3 w-3" />
                </motion.span>
              </button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2 text-[12px] leading-[1.6] text-muted/50">
                      {detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
