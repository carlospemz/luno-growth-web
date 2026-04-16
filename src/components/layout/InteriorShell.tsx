"use client";

import { type ReactNode } from "react";

/**
 * InteriorShell — the built architecture inside Vincent.
 *
 * Everything after the VincentSplit umbral lives inside this shell.
 * The shell provides a single, continuous interior atmosphere:
 *
 *   - a warm overhead wash at the top (like soft indirect light
 *     from a cove ceiling)
 *   - a very subtle vertical wall gradient (cobalt-warmed at the
 *     top of each viewport, fading into the deep indigo floor)
 *   - two barely-visible vertical seams hugging the left/right
 *     edges of the reading column, suggesting built walls
 *   - an ambient inner vignette that softens the edges of every
 *     section so nothing reads as "floating on background"
 *
 * No labels. No rails. No brackets. No HUD. No sci-fi.
 * Only architecture.
 */

export default function InteriorShell({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
