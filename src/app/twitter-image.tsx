/* Twitter card reuses the same OG image. Re-declares the static
   config fields inline because Next.js doesn't allow re-exporting
   `runtime` and friends from another route segment. */

import OGImage from "./opengraph-image";

export const runtime = "edge";
export const alt =
  "VINCENT Growth — Tu negocio nunca duerme. Tú sí.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OGImage;
