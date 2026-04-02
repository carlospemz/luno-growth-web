"use client";

import "@/styles/luno-landing.css";

interface GlitchTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
  reduced?: boolean;
  /** Kept for API compat — ignored by ShineText (CSS handles cadence) */
  cadence?: { base: number; jitter: number; duration: number };
}

/**
 * ShineText — smooth gradient shimmer sweep across text.
 * Purple→cyan gradient that sweeps like light passing over the surface.
 * Calm, premium, freedom.
 *
 * Exported as default to keep the same import signature as the old GlitchText.
 */
export default function GlitchText({
  children,
  className = "",
  style,
  active = false,
  reduced = false,
}: GlitchTextProps) {
  const shimmerClass =
    active && !reduced ? "shine-text shine-text--active" : "shine-text";

  return (
    <span className={`${shimmerClass} ${className}`} style={style}>
      {children}
    </span>
  );
}
