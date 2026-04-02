"use client";

import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap-config";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface KineticHeadingProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** Scrub-linked scroll reveal vs intersection-triggered */
  scrub?: boolean;
  /** Delay before animation starts (seconds). Useful for above-the-fold content. */
  delay?: number;
}

export default function KineticHeading({
  children,
  className,
  as: Tag = "h2",
  scrub = true,
  delay = 0,
}: KineticHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    /* Add perspective to parent for 3D rotation effect */
    el.style.perspective = "800px";

    const ctx = gsap.context(() => {
      const split = new SplitText(el, {
        type: "lines",
        linesClass: "luno-line",
      });

      /* Wrap each line in overflow-hidden container for clip effect */
      split.lines.forEach((line) => {
        const lineEl = line as HTMLElement;
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.perspective = "800px";
        lineEl.parentNode?.insertBefore(wrapper, lineEl);
        wrapper.appendChild(lineEl);
      });

      /* Start lines: translated down, rotated back, invisible */
      gsap.set(split.lines, {
        yPercent: 130,
        opacity: 0,
        rotateX: -35,
        transformOrigin: "0% 50%",
      });

      if (scrub) {
        /* Scroll-linked reveal — dramatic "building" entrance */
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "bottom 55%",
            scrub: 1,
          },
        }).to(split.lines, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        });
      } else {
        /* Triggered entrance (for above-the-fold or non-scrub) */
        gsap.to(split.lines, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.85,
          stagger: 0.15,
          delay: delay || 0.3,
          ease: "power3.out",
        });
      }
    }, el);

    return () => ctx.revert();
  }, [children, scrub, delay, reduced]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
