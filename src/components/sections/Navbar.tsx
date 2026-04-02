"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";

const LINKS = [
  { label: "Proyectos", href: "#work" },
  { label: "Paquetes", href: "#pricing" },
  { label: "Método", href: "#process" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-white/60 backdrop-blur-2xl"
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
    >
      <Container>
        <nav className="flex h-14 items-center justify-between">
          {/* Brand — matches Luno sidebar */}
          <a href="#" aria-label="Inicio" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl brand-gradient text-[14px] font-bold text-white">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold tracking-wide text-zinc-900">
                Luno
              </span>
              <span className="text-[10px] font-light uppercase tracking-[0.15em] text-zinc-400">
                Growth
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-700"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href="#brief"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm shadow-purple-500/15 transition-all hover:shadow-md hover:shadow-purple-500/20 hover:brightness-105 active:scale-[0.98]"
            >
              Llenar brief
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="text-zinc-700 md:hidden"
            aria-label={open ? "Cerrar" : "Menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-zinc-100 bg-white/95 backdrop-blur-2xl md:hidden"
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl px-3 py-2.5 text-[13px] font-medium text-zinc-400 transition-all hover:bg-zinc-50 hover:text-zinc-700 active:scale-[0.98]"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2"
                >
                  <a
                    href="#brief"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:from-purple-700 hover:to-cyan-600 active:scale-[0.98]"
                  >
                    Llenar brief
                  </a>
                </motion.div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
