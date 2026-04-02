"use client";

import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";

// LUNO brand colors: purple (#a855f7), cyan (#06b6d4), deep purple (#9333ea), magenta (#c026d3)
// Gradient goes from soft white-purple center → brand washes → back to fafafa
const LUNO_GRADIENT_COLORS = [
  "#fafafa",                     // center: clean white
  "#f5f3ff",                     // soft violet tint
  "rgba(168,85,247,0.09)",        // purple wash
  "rgba(192,38,211,0.05)",        // magenta tint
  "rgba(6,182,212,0.07)",         // cyan wash
  "rgba(168,85,247,0.03)",        // faint purple
  "#fafafa",                     // edge: back to bg
];

const LUNO_GRADIENT_STOPS = [15, 32, 48, 62, 76, 88, 100];

export default function PageBackdrop() {
  return (
    <AnimatedGradientBackground
      Breathing={true}
      gradientColors={LUNO_GRADIENT_COLORS}
      gradientStops={LUNO_GRADIENT_STOPS}
      startingGap={120}
      breathingRange={8}
      animationSpeed={0.012}
      topOffset={5}
      containerClassName="z-0"
    />
  );
}
