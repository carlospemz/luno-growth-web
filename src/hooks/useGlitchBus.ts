/**
 * GlitchBus — mutex scheduler for hero glitch system.
 * Ensures no two glitches fire simultaneously.
 *
 * Module-level lock (singleton across all components).
 * Lock window: 260ms (covers all burst durations).
 */

let lockedUntil = 0;

/**
 * Request a glitch burst. If the bus is locked, retries after 120-220ms.
 */
export function requestGlitch(
  onStart: () => void,
  onEnd: () => void,
  duration: number,
): void {
  const now = Date.now();
  if (now < lockedUntil) {
    setTimeout(
      () => requestGlitch(onStart, onEnd, duration),
      120 + Math.random() * 100,
    );
    return;
  }
  lockedUntil = now + 260;
  onStart();
  setTimeout(onEnd, duration);
}

/**
 * Hook: runs requestGlitch on a cadence (recursive setTimeout).
 * Respects active + reduced flags.
 */
import { useEffect, useCallback, useRef } from "react";

export function useGlitchCadence(
  active: boolean,
  reduced: boolean,
  config: {
    base: number;
    jitter: number;
    duration: number;
  },
  onStart: () => void,
  onEnd: () => void,
) {
  const onStartRef = useRef(onStart);
  const onEndRef = useRef(onEnd);
  onStartRef.current = onStart;
  onEndRef.current = onEnd;

  const fire = useCallback(() => {
    requestGlitch(
      () => onStartRef.current(),
      () => onEndRef.current(),
      config.duration,
    );
  }, [config.duration]);

  useEffect(() => {
    if (!active || reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay =
        config.base + (Math.random() * 2 - 1) * config.jitter;
      timer = setTimeout(() => {
        fire();
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(timer);
  }, [active, reduced, config.base, config.jitter, fire]);
}
