"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, isActive] where isActive is true when the element
 * is in the viewport AND reduced-motion is NOT preferred.
 * Used to gate cadence animations (glitch, drift).
 */
export function useInViewActive<T extends HTMLElement = HTMLElement>(
  threshold = 0.05,
): [React.RefObject<T | null>, boolean, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView && !reduced, reduced];
}
