/**
 * PageBackdrop — intentionally empty.
 *
 * Originally this component mounted a global constellation canvas
 * behind everything. It created a noisy overlay between sections and
 * fought content backgrounds on mobile. We now scope the starfield
 * to the Hero section only (ConstellationBackdrop is imported there),
 * leaving the rest of the scroll with clean solid indigo surfaces.
 *
 * Kept as a no-op alias so existing imports from page.tsx still work.
 */
export default function PageBackdrop() {
  return null;
}
