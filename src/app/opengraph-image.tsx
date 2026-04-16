import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "VINCENT Growth — Tu negocio nunca duerme. Tú sí.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OpenGraph image — generated at the edge.
 *
 * Wordmark "VINCENT" on deep indigo, with the "i" dot replaced by
 * a gold diamond. The tagline reads "Tu negocio nunca duerme. Tú sí."
 * A thin gold rule separates brand from claim. No dependencies on
 * external fonts — falls back to system sans for reliability.
 */
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "#0B1E38",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle constellation dots — top/bottom only */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 120,
            width: 6,
            height: 6,
            borderRadius: 6,
            background: "#E8B931",
            opacity: 0.8,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 280,
            width: 4,
            height: 4,
            borderRadius: 4,
            background: "#F5F0E1",
            opacity: 0.5,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 90,
            right: 440,
            width: 3,
            height: 3,
            borderRadius: 3,
            background: "#F5F0E1",
            opacity: 0.4,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 160,
            width: 5,
            height: 5,
            borderRadius: 5,
            background: "#E8B931",
            opacity: 0.7,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: 340,
            width: 3,
            height: 3,
            borderRadius: 3,
            background: "#F5F0E1",
            opacity: 0.4,
            display: "flex",
          }}
        />

        {/* Kicker pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 18px",
            borderRadius: 9999,
            border: "1px solid rgba(232, 185, 49, 0.45)",
            background: "rgba(232, 185, 49, 0.06)",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 8,
              background: "#E8B931",
              display: "flex",
            }}
          />
          <span
            style={{
              color: "#E8B931",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "ui-monospace, monospace",
            }}
          >
            VINCENT Growth
          </span>
        </div>

        {/* Wordmark — "VINC" + gold diamond as dot + "CENT" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 56,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: "#F5F0E1",
              letterSpacing: -6,
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            V
          </span>
          {/* "I" stem */}
          <div
            style={{
              width: 18,
              height: 90,
              background: "#F5F0E1",
              marginLeft: 4,
              marginTop: 38,
              display: "flex",
            }}
          />
          {/* Diamond dot over the I */}
          <div
            style={{
              width: 22,
              height: 22,
              background: "#E8B931",
              transform: "rotate(45deg)",
              position: "absolute",
              marginTop: 16,
              marginLeft: 4,
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 140,
              fontWeight: 900,
              color: "#F5F0E1",
              letterSpacing: -6,
              lineHeight: 1,
              textTransform: "uppercase",
              marginLeft: 14,
            }}
          >
            NCENT
          </span>
        </div>

        {/* Gold rule */}
        <div
          style={{
            width: 140,
            height: 2,
            background: "#E8B931",
            opacity: 0.7,
            marginBottom: 36,
            display: "flex",
          }}
        />

        {/* Claim */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#F5F0E1",
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1,
          }}
        >
          <span style={{ display: "flex" }}>Tu negocio nunca duerme.</span>
          <span style={{ display: "flex", color: "#E8B931" }}>Tú sí.</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
