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
   VINCENT Contact constants
   ═══════════════════════════════════════ */

export const CONTACT = {
  whatsappNumber: "521XXXXXXXXXX",
  phoneNumber: "+52 1 XXX XXX XXXX",
  whatsappPrefill: "Hola Vincent, quiero recuperar el día.",
} as const;

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hola@vincent.mx";

/* ═══════════════════════════════════════
   URL builders
   ═══════════════════════════════════════ */

export function whatsappUrl(message?: string): string {
  const msg = encodeURIComponent(message ?? CONTACT.whatsappPrefill);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${msg}`;
}

export function phoneUrl(): string {
  return `tel:${CONTACT.phoneNumber.replace(/\s/g, "")}`;
}

export function contactEmailUrl(): string {
  return `mailto:${contactEmail}`;
}

/* Quick quote prefill — used by hero CTA, floating button, etc. */
export const QUOTE_PREFILL = `Hola Vincent, quiero saber más de la oferta.
Negocio:
Ciudad:
¿Qué te interesa? (Brand System / Content Engine / Demand Engine):`;

export function quoteUrl(): string {
  return whatsappUrl(QUOTE_PREFILL);
}

/* Per-offer WhatsApp prefills */
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

/* ═══════════════════════════════════════
   Brief → WhatsApp message builder
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
