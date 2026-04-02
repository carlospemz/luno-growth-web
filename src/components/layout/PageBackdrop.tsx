"use client";

import { useEffect, useState } from "react";
import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";

const LUNO_GRADIENT_COLORS = [
  "#080810",
  "#0f0a1e",
  "rgba(147,51,234,0.55)",
  "rgba(168,85,247,0.38)",
  "rgba(192,38,211,0.22)",
  "rgba(6,182,212,0.28)",
  "rgba(168,85,247,0.08)",
  "#080810",
];

const LUNO_GRADIENT_STOPS = [8, 22, 38, 54, 66, 78, 90, 100];

export default function PageBackdrop() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  if (isMobile) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(110% 120% at 50% 20%, #080810 8%, #0f0a1e 22%, rgba(147,51,234,0.45) 38%, rgba(168,85,247,0.28) 54%, rgba(6,182,212,0.18) 66%, rgba(168,85,247,0.05) 88%, #080810 100%)",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <AnimatedGradientBackground
      Breathing={true}
      gradientColors={LUNO_GRADIENT_COLORS}
      gradientStops={LUNO_GRADIENT_STOPS}
      startingGap={110}
      breathingRange={12}
      animationSpeed={0.01}
      topOffset={10}
      containerClassName="z-0"
    />
  );
}
