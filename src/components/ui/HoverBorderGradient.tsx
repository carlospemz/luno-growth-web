"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

function getNextDirection(current: Direction): Direction {
  const map: Record<Direction, Direction> = {
    TOP: "RIGHT",
    RIGHT: "BOTTOM",
    BOTTOM: "LEFT",
    LEFT: "TOP",
  };
  return map[current];
}

function getAngle(dir: Direction): number {
  return { TOP: 0, RIGHT: 90, BOTTOM: 180, LEFT: 270 }[dir];
}

export function HoverBorderGradient({
  children,
  containerClassName = "",
  className = "",
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  containerClassName?: string;
  className?: string;
  as?: React.ElementType;
  duration?: number;
  clockwise?: boolean;
  [key: string]: unknown;
}>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRotation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setDirection((prev) => (clockwise ? getNextDirection(prev) : getNextDirection(getNextDirection(getNextDirection(prev)))));
    }, (duration * 1000) / 4);
  }, [duration, clockwise]);

  const stopRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (hovered) {
      startRotation();
    } else {
      stopRotation();
    }
    return stopRotation;
  }, [hovered, startRotation, stopRotation]);

  const angle = getAngle(direction);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit ${containerClassName}`}
      {...props}
    >
      <div
        className={`w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit] ${className}`}
      >
        {children}
      </div>
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{ filter: "blur(2px)" }}
        initial={{ background: `conic-gradient(from ${angle}deg, #a855f7 0deg, transparent 60deg, transparent 300deg, #06b6d4 360deg)` }}
        animate={{
          background: hovered
            ? `conic-gradient(from ${angle}deg, #a855f7 0deg, #9333ea 60deg, transparent 120deg, transparent 240deg, #06b6d4 300deg, #a855f7 360deg)`
            : `conic-gradient(from ${angle}deg, transparent 0deg, #a855f7 60deg, transparent 120deg)`,
        }}
        transition={{ ease: "linear", duration: duration / 4 }}
      />
      <div className="bg-[#080810] absolute inset-[1px] rounded-[inherit] z-1" />
    </Tag>
  );
}
