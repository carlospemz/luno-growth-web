"use client";

import { motion } from "framer-motion";

/**
 * VincentWarpCSS — radial speed-lines effect using pure CSS.
 *
 * Three layered conic-gradients rotating at different speeds
 * create the illusion of hyperspace/warp streaks radiating
 * from the center. Palette: indigo → cobalt → gold → cream.
 *
 * No WebGL, no three.js — works on every device including iOS Safari.
 */
export default function VincentWarpShader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1 — wide gold streaks, slow rotation */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            rgba(232, 185, 49, 0.15) 8deg,
            transparent 16deg,
            transparent 40deg,
            rgba(45, 78, 142, 0.12) 48deg,
            transparent 56deg,
            transparent 80deg,
            rgba(232, 185, 49, 0.1) 88deg,
            transparent 96deg,
            transparent 120deg,
            rgba(245, 240, 225, 0.08) 128deg,
            transparent 136deg,
            transparent 160deg,
            rgba(45, 78, 142, 0.14) 168deg,
            transparent 176deg,
            transparent 200deg,
            rgba(232, 185, 49, 0.12) 208deg,
            transparent 216deg,
            transparent 240deg,
            rgba(75, 139, 245, 0.1) 248deg,
            transparent 256deg,
            transparent 280deg,
            rgba(232, 185, 49, 0.08) 288deg,
            transparent 296deg,
            transparent 320deg,
            rgba(245, 240, 225, 0.06) 328deg,
            transparent 336deg,
            transparent 360deg
          )`,
          filter: "blur(1px)",
        }}
      />

      {/* Layer 2 — tight cobalt/gold streaks, medium speed, counter-rotate */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(
            from 45deg at 50% 50%,
            transparent 0deg,
            rgba(75, 139, 245, 0.18) 4deg,
            transparent 8deg,
            transparent 24deg,
            rgba(232, 185, 49, 0.2) 28deg,
            transparent 32deg,
            transparent 48deg,
            rgba(45, 78, 142, 0.16) 52deg,
            transparent 56deg,
            transparent 72deg,
            rgba(245, 240, 225, 0.1) 76deg,
            transparent 80deg,
            transparent 96deg,
            rgba(232, 185, 49, 0.14) 100deg,
            transparent 104deg,
            transparent 120deg,
            rgba(75, 139, 245, 0.12) 124deg,
            transparent 128deg,
            transparent 150deg,
            rgba(232, 185, 49, 0.18) 154deg,
            transparent 158deg,
            transparent 180deg,
            rgba(45, 78, 142, 0.14) 184deg,
            transparent 188deg,
            transparent 210deg,
            rgba(245, 240, 225, 0.08) 214deg,
            transparent 218deg,
            transparent 240deg,
            rgba(232, 185, 49, 0.16) 244deg,
            transparent 248deg,
            transparent 270deg,
            rgba(75, 139, 245, 0.1) 274deg,
            transparent 278deg,
            transparent 300deg,
            rgba(232, 185, 49, 0.12) 304deg,
            transparent 308deg,
            transparent 330deg,
            rgba(45, 78, 142, 0.1) 334deg,
            transparent 338deg,
            transparent 360deg
          )`,
          filter: "blur(0.5px)",
        }}
      />

      {/* Layer 3 — fast fine cream/gold highlights */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(
            from 120deg at 50% 50%,
            transparent 0deg,
            rgba(245, 240, 225, 0.14) 2deg,
            transparent 4deg,
            transparent 20deg,
            rgba(232, 185, 49, 0.22) 22deg,
            transparent 24deg,
            transparent 45deg,
            rgba(245, 240, 225, 0.1) 47deg,
            transparent 49deg,
            transparent 70deg,
            rgba(232, 185, 49, 0.16) 72deg,
            transparent 74deg,
            transparent 95deg,
            rgba(75, 139, 245, 0.12) 97deg,
            transparent 99deg,
            transparent 120deg,
            rgba(232, 185, 49, 0.2) 122deg,
            transparent 124deg,
            transparent 145deg,
            rgba(245, 240, 225, 0.12) 147deg,
            transparent 149deg,
            transparent 170deg,
            rgba(232, 185, 49, 0.14) 172deg,
            transparent 174deg,
            transparent 200deg,
            rgba(75, 139, 245, 0.1) 202deg,
            transparent 204deg,
            transparent 225deg,
            rgba(232, 185, 49, 0.18) 227deg,
            transparent 229deg,
            transparent 250deg,
            rgba(245, 240, 225, 0.08) 252deg,
            transparent 254deg,
            transparent 280deg,
            rgba(232, 185, 49, 0.16) 282deg,
            transparent 284deg,
            transparent 310deg,
            rgba(45, 78, 142, 0.12) 312deg,
            transparent 314deg,
            transparent 340deg,
            rgba(232, 185, 49, 0.1) 342deg,
            transparent 344deg,
            transparent 360deg
          )`,
        }}
      />

      {/* Center vignette — dark hole so the text area stays clean */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse 50% 45% at 50% 50%,
            rgba(11, 30, 56, 0.95) 0%,
            rgba(11, 30, 56, 0.7) 35%,
            rgba(11, 30, 56, 0.2) 65%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}
