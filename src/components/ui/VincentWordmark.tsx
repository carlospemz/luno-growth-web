"use client";

/**
 * VINCENT Wordmark — single <text> element + overlaid diamond.
 *
 * Prior versions tried to split "V" + rect-I + "NCENT" into three
 * separate SVG primitives so the diamond could sit exactly above
 * a hand-drawn I rectangle. That approach broke in mobile Safari
 * because text metrics for the "V" and "NCENT" glyphs don't align
 * with the hard-coded rect position — you'd see "V i NCENT" with
 * a visible gap and a misaligned I stem.
 *
 * New approach: render "VINCENT" as ONE text element with textLength
 * and lengthAdjust so the glyph geometry is guaranteed across fonts.
 * The diamond is then positioned at the exact pixel x of the I stem
 * in the normalized text width. When Barlow Condensed hasn't loaded
 * yet, the fallback sans still produces the correct visual because
 * the text stretches to fill the declared textLength.
 */

type VincentWordmarkProps = {
  height?: number;
  /** Text color — defaults to cream; pass #0B1E38 for light surfaces. */
  color?: string;
  /** Diamond accent color — defaults to gold. */
  accent?: string;
  /** Hide the breathe animation. */
  still?: boolean;
  className?: string;
  "aria-label"?: string;
};

export default function VincentWordmark({
  height = 48,
  color = "var(--vin-cream, #F5F0E1)",
  accent = "var(--vin-gold, #E8B931)",
  still = false,
  className = "",
  "aria-label": ariaLabel = "VINCENT",
}: VincentWordmarkProps) {
  // viewBox proportional to VINCENT in Barlow Condensed ExtraBold.
  // 7 letters, ratio ~4.6:1 width:height.
  const vbHeight = 100;
  const vbWidth = 460;
  const width = Math.round((vbWidth / vbHeight) * height);

  // Position of the I dot as a fraction of total text width.
  // "VINCENT" — V(0) I(1) N(2) C(3) E(4) N(5) T(6) → I is ~18% across
  // the baseline width. The number was calibrated visually.
  const diamondXFraction = 0.195;
  const diamondX = vbWidth * diamondXFraction;
  // Diamond sits just above the cap line, which in a 100-unit box is ~16.
  const diamondY = 12;
  const diamondSize = 14;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <title>{ariaLabel}</title>

      {/* Full word — one text element, normalized width */}
      <text
        x={vbWidth / 2}
        y="82"
        textAnchor="middle"
        fill={color}
        fontFamily="'Barlow Condensed', 'Arial Narrow', system-ui, sans-serif"
        fontSize="100"
        fontWeight="800"
        letterSpacing="-2"
        textLength={vbWidth - 12}
        lengthAdjust="spacingAndGlyphs"
        style={{ textTransform: "uppercase" }}
      >
        VINCENT
      </text>

      {/* Diamond dot over the I — rotated square, breathing if enabled */}
      <g
        transform={`translate(${diamondX} ${diamondY})`}
        className={still ? undefined : "animate-diamond-breathe"}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x={-diamondSize / 2}
          y={-diamondSize / 2}
          width={diamondSize}
          height={diamondSize}
          transform="rotate(45)"
          fill={accent}
        />
      </g>
    </svg>
  );
}

/**
 * Mini mark — just the diamond. Used in footer, favicons, and anywhere
 * the full wordmark is too long. A gold diamond on indigo already
 * reads as VINCENT in this world.
 */
export function VincentDiamond({
  size = 16,
  color = "var(--vin-gold, #E8B931)",
  breathe = false,
  className = "",
}: {
  size?: number;
  color?: string;
  breathe?: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-12 -12 24 24"
      width={size}
      height={size}
      role="presentation"
      aria-hidden="true"
      className={`${breathe ? "animate-diamond-breathe" : ""} ${className}`}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      <rect
        x="-8"
        y="-8"
        width="16"
        height="16"
        transform="rotate(45)"
        fill={color}
      />
    </svg>
  );
}
