/**
 * RAF loop with capped delta.
 * Calls tick(dtMs) every animation frame.
 */

export interface RafHandle {
  start: () => void;
  stop: () => void;
  readonly running: boolean;
}

export function createRafLoop(tick: (dtMs: number) => void): RafHandle {
  let id = 0;
  let prev = 0;

  const frame = (now: number) => {
    if (!prev) prev = now;
    const dt = Math.min(now - prev, 33.33); // cap at ~30fps
    prev = now;
    tick(dt);
    id = requestAnimationFrame(frame);
  };

  return {
    start() {
      if (id) return;
      prev = 0;
      id = requestAnimationFrame(frame);
    },
    stop() {
      if (id) {
        cancelAnimationFrame(id);
        id = 0;
      }
    },
    get running() {
      return id !== 0;
    },
  };
}
