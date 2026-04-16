/* ═══════════════════════════════════════
   Brief form data shape
   ═══════════════════════════════════════ */

export interface BriefData {
  businessName: string;
  whatsapp: string;
  whatYouSell: string;
  whoYouSellTo: string;
  desiredActions: string[];
  orderChannels: string[];
  paymentPreference: string;
  hasDomain: string;
  domainWish: string;
  hasLogo: string;
  logoLinks: string;
  extraPages: string[];
  advancedFeatures: string[];
  timeline: string;
}

/* ═══════════════════════════════════════
   VINCENT contact — env-driven, degrades safely
   ═══════════════════════════════════════ */

/**
 * Raw values from env (or defaults). NEVER read these directly in
 * components — always go through the helpers below, which enforce
 * "no broken channels in production".
 */
const RAW_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const RAW_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const RAW_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "";

/** Base WA prefill used when no specific message is given. */
export const WHATSAPP_PREFILL = "Hola Vincent, quiero recuperar el día.";

/* ── Capability checks ─────────────────── */

/**
 * True only when a real WhatsApp E.164 number is set. Placeholders
 * with any X/x, empty strings, and non-digit strings all return false.
 */
export function isWhatsappConfigured(): boolean {
  if (!RAW_WHATSAPP) return false;
  if (/[Xx]/.test(RAW_WHATSAPP)) return false;
  return /^\d{10,15}$/.test(RAW_WHATSAPP);
}

/**
 * True only when a real-looking email is set. Placeholders and empty
 * strings return false.
 */
export function isEmailConfigured(): boolean {
  if (!RAW_EMAIL) return false;
  // Very loose email check — enough to catch empty / typos / placeholders.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(RAW_EMAIL) &&
    !/example|placeholder|xxxxx/i.test(RAW_EMAIL);
}

/**
 * True only when a real phone is set. Placeholders with X/x return false.
 */
export function isPhoneConfigured(): boolean {
  if (!RAW_PHONE) return false;
  if (/[Xx]/.test(RAW_PHONE)) return false;
  return /\d{7,}/.test(RAW_PHONE);
}

/* ── Exported values (safe to read) ────── */

/** Public email string if configured, otherwise null. Never a placeholder. */
export const contactEmail: string | null = isEmailConfigured()
  ? RAW_EMAIL
  : null;

/** Public phone string if configured, otherwise null. */
export const contactPhone: string | null = isPhoneConfigured()
  ? RAW_PHONE
  : null;

export const CONTACT = {
  whatsappNumber: isWhatsappConfigured() ? RAW_WHATSAPP : null,
  phoneNumber: contactPhone,
  whatsappPrefill: WHATSAPP_PREFILL,
} as const;

/* ── URL builders — always degrade to #brief for broken WA ─── */

/**
 * Build a wa.me link with an optional prefilled message. If WA is
 * not configured, returns "#brief" so any <a href> lands on the
 * in-page form instead of a broken wa.me page.
 */
export function whatsappUrl(message?: string): string {
  if (!isWhatsappConfigured()) {
    return "#brief";
  }
  const msg = encodeURIComponent(message ?? WHATSAPP_PREFILL);
  return `https://wa.me/${RAW_WHATSAPP}?text=${msg}`;
}

/** Returns a tel: URL or null if no real phone is configured. */
export function phoneUrl(): string | null {
  if (!contactPhone) return null;
  return `tel:${contactPhone.replace(/\s/g, "")}`;
}

/** Returns a mailto: URL or null if no real email is configured. */
export function contactEmailUrl(): string | null {
  if (!contactEmail) return null;
  return `mailto:${contactEmail}`;
}

/* ── Offer prefills — per-núcleo ───────── */

export const QUOTE_PREFILL = `Hola Vincent, quiero saber más de la oferta.
Negocio:
Ciudad:
¿Qué te interesa? (Brand System / Content Engine / Demand Engine):`;

export function quoteUrl(): string {
  return whatsappUrl(QUOTE_PREFILL);
}

export const OFFER_PREFILLS = {
  brand_system: "Hola Vincent, cuéntame del Brand System.",
  content_engine: "Hola Vincent, cuéntame del Content Engine.",
  demand_engine: "Hola Vincent, cuéntame del Demand Engine.",
  website: "Hola Vincent, necesito una landing o sitio.",
  local_search: "Hola Vincent, necesito presencia en Google Maps.",
  health: "Hola Vincent, tengo un consultorio y quiero saber más.",
} as const;

export function offerWhatsappUrl(offer: keyof typeof OFFER_PREFILLS): string {
  return whatsappUrl(OFFER_PREFILLS[offer]);
}

/* ── Anchor props that spread cleanly onto <a> ───────────── */

/**
 * Returns href + target + rel so the call site doesn't have to
 * remember them. When the link is the #brief fallback, target and
 * rel are omitted so the browser scrolls in-page instead of opening
 * a blank tab.
 */
export function waAnchorProps(message?: string): {
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
} {
  const href = whatsappUrl(message);
  if (href.startsWith("#")) {
    return { href };
  }
  return { href, target: "_blank", rel: "noopener noreferrer" };
}

export function offerWaAnchorProps(offer: keyof typeof OFFER_PREFILLS) {
  return waAnchorProps(OFFER_PREFILLS[offer]);
}

/* ═══════════════════════════════════════
   Brief → WhatsApp message builder (backup channel only)
   ═══════════════════════════════════════ */

function cap(s: string, max = 200) {
  return s.length > max ? s.slice(0, max) + "…" : s;
}

export function buildBriefMessage(d: BriefData): string {
  const lines: string[] = [
    `Hola Vincent, soy ${d.businessName}.`,
    "",
    `Vendo: ${cap(d.whatYouSell)}`,
    `Mi cliente ideal: ${cap(d.whoYouSellTo)}`,
    `Quiero que el usuario: ${d.desiredActions.join(", ")}`,
    `Recibo pedidos por: ${d.orderChannels.join(", ")}`,
    `Prefiero: ${d.paymentPreference}`,
    `Dominio: ${d.hasDomain === "si" ? "Ya tengo" : d.hasDomain === "no" ? `No tengo${d.domainWish ? ` (me gustaría: ${d.domainWish})` : ""}` : "No sé qué es"}`,
  ];

  if (d.hasLogo === "si" && d.logoLinks) {
    lines.push(`Logo/fotos: ${cap(d.logoLinks)}`);
  }
  if (d.extraPages.length > 0) {
    lines.push(`Páginas extra: ${d.extraPages.join(", ")}`);
  }
  if (d.advancedFeatures.length > 0) {
    lines.push(`Funciones avanzadas: ${d.advancedFeatures.join(", ")}`);
  }
  if (d.timeline) {
    lines.push(`Lo quiero listo para: ${d.timeline}`);
  }

  lines.push("", "Enviado desde vincent.mx/growth");

  return whatsappUrl(lines.join("\n"));
}
