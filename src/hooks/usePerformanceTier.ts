import { useState, useEffect } from "react";

export type PerformanceTier = "high" | "medium" | "low";

/**
 * Detects device performance tier based on hardware signals.
 * Returns "low" during SSR and initial hydration.
 */
export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>("low");

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 2;
    const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;
    const isNarrow = window.innerWidth < 768;

    /* Check WebGL 2 support */
    let hasWebGL2 = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL2 = !!canvas.getContext("webgl2");
    } catch {
      /* no WebGL2 */
    }

    if (isNarrow || cores <= 2 || memory < 4 || !hasWebGL2) {
      setTier("low");
    } else if (cores >= 6 && memory >= 8) {
      setTier("high");
    } else {
      setTier("medium");
    }
  }, []);

  return tier;
}
