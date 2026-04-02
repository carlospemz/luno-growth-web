export const LUNO = {
  DARK_0: "#0f0f1a",
  DARK_1: "#111127",
  DARK_2: "#13132e",
  PEACH: "#a855f7",
  PINK: "#7c3aed",
  MAGENTA: "#9333ea",
  CYAN: "#22d3ee",
} as const;

/** Convert a LUNO hex token to rgba */
export function lunoRgba(
  color: keyof typeof LUNO,
  alpha: number,
): string {
  const hex = LUNO[color];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
