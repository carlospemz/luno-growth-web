"use client";

import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";

// LUNO brand colors: purple (#a855f7), cyan (#06b6d4), deep purple (#9333ea), magenta (#c026d3)
// Gradient goes from soft white-purple center → brand washes → back to fafafa
// Dark theme: deep black center → deep purple → purple → cyan → fade to black
const LUNO_GRADIENT_COLORS = [
  "#080810",                      // center: deep dark
  "#0f0a1e",                      // dark purple-black
  "rgba(147,51,234,0.55)",        // deep purple ring
  "rgba(168,85,247,0.38)",        // purple
  "rgba(192,38,211,0.22)",        // magenta-purple
  "rgba(6,182,212,0.28)",         // cyan ring
  "rgba(168,85,247,0.08)",        // faint purple edge
  "#080810",                      // edge: back to dark
];

const LUNO_GRADIENT_STOPS = [8, 22, 38, 54, 66, 78, 90, 100];

export default function PageBackdrop() {
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
