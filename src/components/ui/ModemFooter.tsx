"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  brandName?: string;
  brandDescription?: string;
  socialLinks?: SocialLink[];
  navLinks?: FooterLink[];
  creatorName?: string;
  creatorUrl?: string;
  brandIcon?: React.ReactNode;
  className?: string;
}

/**
 * ModemFooter — VINCENT-themed adaptation of the modem animated footer.
 *
 * Big wordmark behind + floating brand tile in front. Colors mapped to
 * the VINCENT palette (indigo floor, cream text, gold accents).
 */
export const ModemFooter = ({
  brandName = "VINCENT",
  brandDescription = "Pintamos con código y con IA para que tu marca trabaje de noche y tú recuperes el día.",
  socialLinks = [],
  navLinks = [],
  creatorName,
  creatorUrl,
  brandIcon,
  className,
}: FooterProps) => {
  return (
    <section className={cn("relative w-full mt-0 overflow-hidden", className)}>
      <footer
        className="relative mt-20"
        style={{
          background: "#0B1E38",
          borderTop: "1px solid rgba(245, 240, 225, 0.08)",
        }}
      >
        <div className="max-w-7xl flex flex-col justify-between mx-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[40rem] relative p-4 py-10">
          <div className="flex flex-col mb-12 sm:mb-20 md:mb-0 w-full">
            <div className="w-full flex flex-col items-center">
              <div className="space-y-3 flex flex-col items-center flex-1">
                <img
                  src="/vincent-logo.png"
                  alt="Vincent"
                  className="h-16 md:h-20 w-auto"
                  draggable={false}
                />
                <p
                  className="font-semibold text-center w-full max-w-sm sm:w-96 px-4 sm:px-0 text-[14px] md:text-[15px] leading-relaxed"
                  style={{ color: "rgba(245, 240, 225, 0.62)" }}
                >
                  {brandDescription}
                </p>
              </div>

              {socialLinks.length > 0 && (
                <div className="flex mb-8 mt-5 gap-4">
                  {socialLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="transition-colors"
                      style={{ color: "rgba(245, 240, 225, 0.55)" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="w-6 h-6 hover:scale-110 duration-300">
                        {link.icon}
                      </div>
                      <span className="sr-only">{link.label}</span>
                    </Link>
                  ))}
                </div>
              )}

              {navLinks.length > 0 && (
                <div
                  className="flex flex-wrap justify-center gap-5 text-[13px] font-medium max-w-full px-4 mt-2"
                  style={{ color: "rgba(245, 240, 225, 0.55)" }}
                >
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      className="duration-300 hover:font-semibold transition-colors hover:text-[#E8B931]"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-20 md:mt-24 flex flex-col gap-2 md:gap-1 items-center justify-center md:flex-row md:items-center md:justify-between px-4 md:px-0">
            <p
              className="text-[13px] font-mono uppercase tracking-[0.18em] text-center md:text-left"
              style={{ color: "rgba(245, 240, 225, 0.48)" }}
            >
              © {new Date().getFullYear()} {brandName}. Todos los derechos
              reservados.
            </p>
            {creatorName && creatorUrl && (
              <nav className="flex gap-4">
                <Link
                  href={creatorUrl}
                  target="_blank"
                  className="text-[13px] font-mono uppercase tracking-[0.18em] transition-colors duration-300 hover:text-[#E8B931]"
                  style={{ color: "rgba(245, 240, 225, 0.48)" }}
                >
                  Pintado por {creatorName}
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Large background brand text */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-40 md:bottom-32 font-extrabold tracking-tighter pointer-events-none select-none text-center px-4 font-headline uppercase"
          style={{
            fontSize: "clamp(3rem, 13vw, 11rem)",
            maxWidth: "95vw",
            lineHeight: 0.85,
            background:
              "linear-gradient(to bottom, rgba(245, 240, 225, 0.18) 0%, rgba(245, 240, 225, 0.08) 45%, rgba(245, 240, 225, 0) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          {brandName.toUpperCase()}
        </div>

        {/* Floating brand tile */}
        <div
          className="absolute duration-400 bottom-24 md:bottom-20 backdrop-blur-sm rounded-3xl left-1/2 flex items-center justify-center p-3 -translate-x-1/2 z-10 transition-colors"
          style={{
            background: "rgba(11, 30, 56, 0.72)",
            border: "2px solid rgba(232, 185, 49, 0.35)",
            boxShadow:
              "0 0 28px rgba(232, 185, 49, 0.18), inset 0 1px 0 rgba(232, 185, 49, 0.22)",
          }}
        >
          <div
            className="w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #E8B931 0%, #F5D06A 100%)",
            }}
          >
            {brandIcon || (
              <span
                className="font-headline font-extrabold"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.75rem)",
                  color: "#0B1E38",
                  lineHeight: 1,
                }}
              >
                V
              </span>
            )}
          </div>
        </div>

        {/* Bottom line */}
        <div
          className="absolute bottom-32 sm:bottom-34 backdrop-blur-sm h-[1px] w-full left-1/2 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(232, 185, 49, 0.32) 50%, transparent 100%)",
          }}
        />

        {/* Bottom shadow fade */}
        <div
          className="absolute bottom-28 w-full h-24 blur-[1em]"
          style={{
            background:
              "linear-gradient(to top, #0B1E38 0%, rgba(11, 30, 56, 0.8) 50%, rgba(11, 30, 56, 0.4) 100%)",
          }}
        />
      </footer>
    </section>
  );
};
