"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={
        reduced
          ? { lerp: 1, duration: 0, smoothWheel: false }
          : { lerp: 0.14, duration: 0.9, smoothWheel: true }
      }
    >
      {children}
    </ReactLenis>
  );
}
