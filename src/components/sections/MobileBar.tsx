"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/contact";
import "@/styles/luno-landing.css";

/**
 * MobileBar — floating WhatsApp CTA (mobile only).
 * Hides when:
 * 1. Any other WhatsApp CTA button is visible on screen
 * 2. The hero section is still in view (prevents double-button)
 */
export default function MobileBar() {
  const [visible, setVisible] = useState(false);
  const heroVisibleRef = useRef(true);
  const workVisibleRef = useRef(false);
  const ctaVisibleCountRef = useRef(0);

  useEffect(() => {
    const ctaSelector = [
      'a[href*="wa.me"]',
      'a[href*="whatsapp"]',
    ].join(", ");

    let ctaTargets: Element[] = [];
    let heroEl: Element | null = null;
    let workEl: Element | null = null;

    const updateVisibility = () => {
      const shouldShow = !heroVisibleRef.current && !workVisibleRef.current && ctaVisibleCountRef.current === 0;
      setVisible(shouldShow);
    };

    /* Observer for CTA buttons */
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            ctaVisibleCountRef.current++;
          } else {
            ctaVisibleCountRef.current = Math.max(0, ctaVisibleCountRef.current - 1);
          }
        }
        updateVisibility();
      },
      { threshold: 0.1 },
    );

    /* Observer for hero section — block MobileBar while hero is in view */
    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          heroVisibleRef.current = entry.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.05 },
    );

    /* Observer for work/projects section — hide so it doesn't cover card CTAs */
    const workObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          workVisibleRef.current = entry.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.05 },
    );

    /* Small delay to let DOM hydrate */
    const timer = setTimeout(() => {
      ctaTargets = Array.from(document.querySelectorAll(ctaSelector)).filter(
        (el) => !el.closest("[data-mobile-bar]"),
      );

      heroEl = document.querySelector("section:first-of-type");
      workEl = document.getElementById("work");

      if (heroEl) {
        heroObserver.observe(heroEl);
      }
      if (workEl) {
        workObserver.observe(workEl);
      }

      if (ctaTargets.length === 0 && !heroEl) {
        setVisible(true);
        return;
      }

      for (const el of ctaTargets) {
        ctaObserver.observe(el);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      ctaObserver.disconnect();
      heroObserver.disconnect();
      workObserver.disconnect();
    };
  }, []);

  return (
    <div
      data-mobile-bar
      className={`fixed bottom-5 right-4 z-50 md:hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="card-border-glow flex items-center gap-2.5 rounded-full bg-surface-1/90 backdrop-blur-md px-5 py-3 border border-white/[0.08] text-[13px] font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
      >
        <span className="msg-alive">
          <MessageCircle className="h-4 w-4 text-violet-400" />
        </span>
        Cotizar
      </a>
    </div>
  );
}
