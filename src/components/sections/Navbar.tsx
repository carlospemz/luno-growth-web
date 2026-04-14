"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import VincentWordmark from "@/components/ui/VincentWordmark";
import { whatsappUrl } from "@/config/contact";

const LINKS = [
  { label: "Oferta", href: "#offers" },
  { label: "Proceso", href: "#process" },
  { label: "Casos", href: "#work" },
  { label: "Preguntas", href: "#faq" },
  { label: "Brief", href: "#brief" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: "rgba(11, 30, 56, 0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(245, 240, 225, 0.08)",
      }}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Wordmark with diamond */}
          <a
            href="#"
            aria-label="VINCENT Growth"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <VincentWordmark height={26} still aria-label="VINCENT" />
            <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.22em] text-[rgba(245,240,225,0.45)]">
              Growth
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[13px] font-medium text-[rgba(245,240,225,0.65)] transition-colors hover:text-[#E8B931]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                color: "#0B1E38",
                boxShadow: "0 2px 14px rgba(232, 185, 49, 0.22)",
              }}
            >
              Habla con Vincent
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ color: "#F5F0E1" }}
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
            className="overflow-hidden border-t md:hidden"
            style={{
              background: "rgba(11, 30, 56, 0.95)",
              borderTopColor: "rgba(245, 240, 225, 0.08)",
            }}
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
                    className="rounded-xl px-3 py-3 text-[14px] font-medium transition-all active:scale-[0.98]"
                    style={{ color: "rgba(245, 240, 225, 0.8)" }}
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
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl px-4 py-3 text-[14px] font-semibold transition-all active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                      color: "#0B1E38",
                    }}
                  >
                    Habla con Vincent
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
