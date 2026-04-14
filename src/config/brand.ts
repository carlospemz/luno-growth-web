/* ═══════════════════════════════════════
   VINCENT — Brand tokens
   Noche Estrellada palette (from brand bible, April 2026)
   ═══════════════════════════════════════ */

export const VINCENT = {
  // Primary — night sky, where Vincent works
  deepIndigo: "#0B1E38",
  // Secondary — swirls, depth
  cobalt: "#2D4E8E",
  // Accent — stars, moon, CTAs, highlights
  starGold: "#E8B931",
  // Light surface — moonlight on the village
  moonCream: "#F5F0E1",
} as const;

/* Care subpalette — only used in Care-specific blocks */
export const VINCENT_CARE = {
  clinicalLight: "#EEF4FB",
  ctaBlue: "#378ADD",
} as const;

/* Back-compat alias so existing imports keep working while we rebrand */
export const LUNO = VINCENT;

/** Convert a VINCENT hex token to rgba */
export function vincentRgba(
  color: keyof typeof VINCENT,
  alpha: number,
): string {
  const hex = VINCENT[color];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* Back-compat */
export const lunoRgba = (color: string, alpha: number): string => {
  const key = color as keyof typeof VINCENT;
  if (VINCENT[key]) return vincentRgba(key, alpha);
  return `rgba(245, 240, 225, ${alpha})`;
};
