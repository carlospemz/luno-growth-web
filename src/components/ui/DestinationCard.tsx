"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * DestinationCard — full-bleed image + themed gradient overlay.
 * Adapted for VINCENT to represent health-first verticals.
 */
interface DestinationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  location: string;
  icon: string;
  stats: string;
  href: string;
  /** HSL value without hsl() wrapper, e.g. "150 50% 25%" */
  themeColor: string;
  ctaLabel?: string;
}

export const DestinationCard = React.forwardRef<
  HTMLDivElement,
  DestinationCardProps
>(
  (
    {
      className,
      imageUrl,
      location,
      icon,
      stats,
      href,
      themeColor,
      ctaLabel = "Explorar",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={
          {
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ease-in-out group-hover:scale-[1.02]"
          aria-label={`Ver detalles para ${location}`}
          style={{
            boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.55)`,
          }}
        >
          {/* Background image with parallax zoom */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.95) 0%, hsl(var(--theme-color) / 0.65) 35%, hsl(var(--theme-color) / 0.15) 70%, transparent 100%)`,
            }}
          />

          {/* Dark bottom shadow for text legibility */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[70%]"
            style={{
              background:
                "linear-gradient(to top, rgba(11, 30, 56, 0.72) 0%, rgba(11, 30, 56, 0.3) 50%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div className="relative flex flex-col justify-end h-full p-5 md:p-6">
            <h3
              className="font-headline text-[22px] md:text-[24px] font-extrabold uppercase tracking-tight leading-[1.02]"
              style={{
                color: "#F5F0E1",
                textShadow: "0 2px 12px rgba(0, 0, 0, 0.55)",
              }}
            >
              {location}{" "}
              <span className="text-[20px] md:text-[22px] ml-1" aria-hidden="true">
                {icon}
              </span>
            </h3>
            <p
              className="text-[13px] md:text-[14px] mt-2 font-medium leading-snug"
              style={{
                color: "rgba(245, 240, 225, 0.85)",
                textShadow: "0 1px 6px rgba(0, 0, 0, 0.55)",
              }}
            >
              {stats}
            </p>

            <div
              className="mt-5 flex items-center justify-between rounded-lg px-4 py-3 backdrop-blur-md border transition-all duration-300"
              style={{
                background: "hsl(var(--theme-color) / 0.22)",
                borderColor: "hsl(var(--theme-color) / 0.38)",
              }}
            >
              <span
                className="text-[12px] md:text-[13px] font-semibold tracking-wide"
                style={{ color: "#F5F0E1" }}
              >
                {ctaLabel}
              </span>
              <ArrowRight
                className="h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#F5F0E1" }}
              />
            </div>
          </div>
        </a>
      </div>
    );
  },
);
DestinationCard.displayName = "DestinationCard";
