"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/contact";

/**
 * MobileBar — floating WhatsApp CTA (mobile only).
 * Hides when the hero or work section is in view, or when another
 * WhatsApp CTA button is visible (avoids double-button).
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
      const shouldShow =
        !heroVisibleRef.current &&
        !workVisibleRef.current &&
        ctaVisibleCountRef.current === 0;
      setVisible(shouldShow);
    };

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

    const heroObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          heroVisibleRef.current = entry.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.05 },
    );

    const workObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          workVisibleRef.current = entry.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.05 },
    );

    const timer = setTimeout(() => {
      ctaTargets = Array.from(document.querySelectorAll(ctaSelector)).filter(
        (el) => !el.closest("[data-mobile-bar]"),
      );

      heroEl = document.querySelector("section:first-of-type");
      workEl = document.getElementById("work");

      if (heroEl) heroObserver.observe(heroEl);
      if (workEl) workObserver.observe(workEl);

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
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 rounded-full px-5 py-3.5 text-[13px] font-semibold transition-all active:scale-[0.98]"
        style={{
          background: "linear-gradient(135deg, #E8B931, #F5D06A)",
          color: "#0B1E38",
          boxShadow:
            "0 4px 24px rgba(232, 185, 49, 0.28), 0 2px 8px rgba(0, 0, 0, 0.4)",
        }}
      >
        <MessageCircle className="h-4 w-4" />
        Habla con Vincent
      </a>
    </div>
  );
}
