import type { Variants, Transition } from "framer-motion";

/* ═══════════════════════════════════════
   Luno Motion Tokens — single source of truth
   ═══════════════════════════════════════ */

export const MOTION = {
  /* Easing */
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],

  /* Durations — snappy for fluid feel at any scroll speed */
  duration: { micro: 0.15, fast: 0.22, base: 0.5, slow: 0.7, hero: 0.6 },

  /* Offsets — moderate for clean entrance without jank */
  y: { small: 20, med: 32, large: 56 },
  x: { small: 12 },

  /* Stagger */
  stagger: { small: 0.06, base: 0.1 },

  /* Viewport trigger — lower threshold so animations start early */
  viewport: { once: true, amount: 0.12 } as const,
  viewportEager: { once: true, amount: 0.05 } as const,

  /* Back-compat aliases */
  revealY: 28,
} as const;

/* ——— Transition presets ——— */

export const tBase: Transition = {
  duration: MOTION.duration.base,
  ease: [...MOTION.ease],
};

export const tFast: Transition = {
  duration: MOTION.duration.fast,
  ease: [...MOTION.ease],
};

export const tSlow: Transition = {
  duration: MOTION.duration.slow,
  ease: [...MOTION.easeOut],
};

/* ——— Reveal variants ——— */

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION.y.med,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: MOTION.duration.base, ease: [...MOTION.ease] },
  },
};

export const revealSlowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: MOTION.y.large,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: MOTION.duration.slow, ease: [...MOTION.easeOut] },
  },
};

/* ——— Stagger container + item ——— */

export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: MOTION.stagger.base },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: MOTION.y.small, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: MOTION.duration.base, ease: [...MOTION.ease] },
  },
};

/* ——— Chip / horizontal stagger ——— */

export const chipVariants: Variants = {
  hidden: { opacity: 0, x: -MOTION.x.small, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: MOTION.duration.fast, ease: [...MOTION.ease] },
  },
};
