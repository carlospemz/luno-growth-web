"use client";

/**
 * VINCENT Wordmark — "VINCENT" rendered in Barlow Condensed ExtraBold
 * with the dot of the "i" replaced by a gold diamond (the brand's
 * hidden isotype: a star in the night sky).
 *
 * The text itself is rendered as an <svg><text> so we don't depend on
 * font loading for the glyph geometry, and the diamond is a rotated
 * square sitting exactly where the dot of the "i" would be.
 *
 * All four brand colors come from CSS vars. Size is controlled by
 * the `height` prop (the SVG uses viewBox, so it scales cleanly).
 */

type VincentWordmarkProps = {
  height?: number;
  /** Text color — defaults to cream; pass #0B1E38 for light surfaces. */
  color?: string;
  /** Diamond accent color — defaults to gold. */
  accent?: string;
  /** Hide the breathe animation (used when it would clash, e.g. navbar). */
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
  // Proportional viewBox: width:height ≈ 4.9:1 for "VINCENT"
  const vbHeight = 100;
  const vbWidth = 490;
  const width = Math.round((vbWidth / vbHeight) * height);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <title>{ariaLabel}</title>

      {/* Word part 1: "V" "I" — the "I" has NO dot (we replace it) */}
      {/* We render letter by letter so we can leave a gap for the diamond */}
      <text
        x="0"
        y="78"
        fill={color}
        fontFamily="'Barlow Condensed', system-ui, sans-serif"
        fontSize="100"
        fontWeight="800"
        letterSpacing="-2"
        style={{ textTransform: "uppercase" }}
      >
        V
      </text>

      {/* The "I" is drawn as a simple rectangle so we have full control */}
      {/* and so we can position the diamond exactly above it regardless */}
      {/* of whether the custom font has loaded yet. */}
      <rect x="72" y="20" width="14" height="58" fill={color} rx="1" />

      {/* Diamond that replaces the dot of the "i" */}
      <g
        transform="translate(79 8)"
        className={still ? "" : "animate-diamond-breathe"}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <rect
          x="-7"
          y="-7"
          width="14"
          height="14"
          transform="rotate(45)"
          fill={accent}
        />
      </g>

      {/* Rest of the word: "NCENT" */}
      <text
        x="100"
        y="78"
        fill={color}
        fontFamily="'Barlow Condensed', system-ui, sans-serif"
        fontSize="100"
        fontWeight="800"
        letterSpacing="-2"
        style={{ textTransform: "uppercase" }}
      >
        NCENT
      </text>
    </svg>
  );
}

/**
 * Mini mark — just the diamond, for favicons, footer ornaments, and
 * places where the full wordmark is too long. The diamond alone is
 * enough: in the VINCENT world, a gold diamond on indigo means a
 * star in the night sky — it reads as VINCENT even without the letters.
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
