"use client";

import { useRef, useCallback } from "react";
import { gsap } from "@/lib/gsap-config";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrambleTextProps {
  children: string;
  className?: string;
  chars?: string;
  speed?: number;
}

export default function ScrambleText({
  children,
  className,
  chars = "!<>-_\\/[]{}=+*^?#",
  speed = 0.8,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const handleEnter = useCallback(() => {
    if (!ref.current || reduced) return;
    gsap.to(ref.current, {
      duration: speed,
      scrambleText: { text: children, chars, speed: 0.5 },
    });
  }, [children, chars, speed, reduced]);

  return (
    <span ref={ref} className={className} onMouseEnter={handleEnter}>
      {children}
    </span>
  );
}
