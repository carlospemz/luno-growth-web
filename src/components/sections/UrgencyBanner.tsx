"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function UrgencyBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
      className="relative z-30 w-full overflow-hidden"
    >
      <div className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-purple-600/90 via-purple-500/90 to-cyan-500/80 px-4 py-2.5 text-center backdrop-blur-sm">
        <Zap className="h-3.5 w-3.5 text-white flex-shrink-0 animate-pulse" />
        <p className="text-[12px] md:text-[13px] font-semibold text-white">
          <span className="font-black">Oferta de lanzamiento:</span>
          {" "}Setup gratuito para los primeros 5 clientes de Abril.
          {" "}<a href="#pricing" className="underline underline-offset-2 hover:no-underline">Ver planes →</a>
        </p>
      </div>
    </motion.div>
  );
}
