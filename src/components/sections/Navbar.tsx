"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { waAnchorProps } from "@/config/contact";

const LINKS = [
  { label: "Oferta", href: "#offers" },
  { label: "Proceso", href: "#process" },
  { label: "Casos", href: "#work" },
  { label: "Preguntas", href: "#faq" },
  { label: "Brief", href: "#brief" },
];

/* Navbar shell height — used by:
   - padding-top offset in the main document
   - scroll-margin-top on section anchors
   Keep in sync with the h-14 / md:h-16 Tailwind classes below. */
export const NAVBAR_H_MOBILE = 56;
export const NAVBAR_H_DESKTOP = 64;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0"
      style={{
        /* Mobile: hard solid indigo. Desktop uses a subtle blur layer. */
        background: scrolled
          ? "#0A1B33"
          : "#0B1E38",
        borderBottom: scrolled
          ? "1px solid rgba(232, 185, 49, 0.12)"
          : "1px solid rgba(245, 240, 225, 0.06)",
        boxShadow: scrolled
          ? "0 8px 28px rgba(0, 0, 0, 0.4)"
          : "none",
        transition: "background 0.2s ease, box-shadow 0.25s ease",
        zIndex: 60,
      }}
    >
      <Container>
        <nav className="flex h-14 md:h-16 items-center justify-between gap-4">
          {/* Wordmark with diamond */}
          <a
            href="#"
            aria-label="VINCENT Growth"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
          >
            <img
              src="/vincent-logo.png"
              alt="Vincent"
              className="h-12 md:h-14 w-auto"
              draggable={false}
            />
            <span className="hidden sm:inline text-[10px] font-mono uppercase tracking-[0.22em] text-[rgba(245,240,225,0.45)]">
              Growth
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 md:flex">
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
          <div className="hidden md:block shrink-0">
            <a
              {...waAnchorProps()}
              className="inline-flex items-center rounded-full px-5 py-2.5 text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                color: "#0B1E38",
                boxShadow: "0 2px 10px rgba(232, 185, 49, 0.12)",
              }}
            >
              Habla con Vincent
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0"
            style={{
              color: "#F5F0E1",
              background: open ? "rgba(232, 185, 49, 0.1)" : "transparent",
              border: open ? "1px solid rgba(232, 185, 49, 0.3)" : "1px solid transparent",
            }}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              background: "#0A1B33",
              borderTop: "1px solid rgba(245, 240, 225, 0.06)",
              borderBottom: "1px solid rgba(232, 185, 49, 0.18)",
            }}
          >
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-xl px-3 py-3 text-[14px] font-medium transition-all active:scale-[0.98]"
                    style={{ color: "rgba(245, 240, 225, 0.82)" }}
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2"
                >
                  <a
                    {...waAnchorProps()}
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.98]"
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
