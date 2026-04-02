import { NextResponse } from "next/server";

/**
 * POST /api/growth/intake
 *
 * Receives brief data from the landing page form.
 * Forwards to luno-platform ops-sync to create a lead + project.
 * Returns submission_id for tracking.
 *
 * Environment:
 *   LUNO_PLATFORM_URL — base URL of luno-platform (e.g. https://luno-white.vercel.app)
 *   LUNO_OPS_SYNC_KEY — shared secret (SUPABASE_SERVICE_ROLE_KEY from luno-platform)
 */

/* ── Types ─────────────────────────── */

interface BriefPayload {
  // Negocio
  business_name: string;
  contact_name: string;
  contact_phone: string;
  contact_email?: string;
  business_type: string;
  business_description: string;
  target_audience: string;
  location_city?: string;
  location_zone?: string;

  // Servicio
  service_types: string[];
  package_interest?: string;
  payment_preference: string;
  desired_actions: string[];
  primary_channels: string[];
  timeline?: string;
  budget_range?: string;

  // Assets
  has_domain: boolean;
  domain_name?: string;
  has_logo: boolean;
  logo_url?: string;
  has_photos?: boolean;
  photos_url?: string;
  competitors?: string;
  reference_sites?: string;
  extra_pages: string[];
  advanced_features: string[];
  additional_notes?: string;

  // Metadata
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;

  // Honeypot
  _hp?: string;
}

/* ── Normalization ─────────────────── */

const BUSINESS_TYPE_MAP: Record<string, string> = {
  restaurante: "restaurant",
  restaurant: "restaurant",
  comida: "restaurant",
  food: "restaurant",
  consultorio: "healthcare",
  clinica: "healthcare",
  clínica: "healthcare",
  doctor: "healthcare",
  dental: "healthcare",
  bar: "nightlife",
  antro: "nightlife",
  club: "nightlife",
  nightlife: "nightlife",
  eventos: "nightlife",
  tienda: "ecommerce",
  shop: "ecommerce",
  ecommerce: "ecommerce",
  productos: "ecommerce",
  profesional: "professional",
  freelance: "professional",
  servicios: "professional",
  despacho: "professional",
};

function normalizeBusinessType(raw: string): string {
  const lower = raw.toLowerCase().trim();
  for (const [keyword, normalized] of Object.entries(BUSINESS_TYPE_MAP)) {
    if (lower.includes(keyword)) return normalized;
  }
  return "other";
}

function inferPackage(brief: BriefPayload): string {
  if (brief.package_interest && brief.package_interest !== "unsure") {
    return brief.package_interest;
  }
  const hasMultiPage = brief.extra_pages.length > 0;
  const hasAdvanced = brief.advanced_features.length > 1;
  if (hasMultiPage && hasAdvanced) return "enterprise";
  if (hasAdvanced || brief.advanced_features.length > 0) return "pro";
  return "express";
}

/* ── Validation ────────────────────── */

function validateBrief(body: BriefPayload): string | null {
  if (!body.business_name || body.business_name.trim().length < 2) return "business_name requerido";
  if (!body.contact_name || body.contact_name.trim().length < 2) return "contact_name requerido";
  const digits = (body.contact_phone || "").replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15) return "contact_phone invalido";
  if (!body.business_description || body.business_description.trim().length < 10) return "business_description requerido";
  if (!body.target_audience || body.target_audience.trim().length < 3) return "target_audience requerido";
  if (!body.desired_actions || body.desired_actions.length === 0) return "desired_actions requerido";
  if (!body.primary_channels || body.primary_channels.length === 0) return "primary_channels requerido";
  return null;
}

/* ── Build ops-sync payload ────────── */

function buildOpsSyncPayload(brief: BriefPayload) {
  const normalizedType = normalizeBusinessType(brief.business_type || "otro");
  const inferredPackage = inferPackage(brief);

  const notes = [
    `[Brief desde landing page]`,
    ``,
    `Descripcion: ${brief.business_description}`,
    `Audiencia: ${brief.target_audience}`,
    `Tipo: ${brief.business_type} (normalizado: ${normalizedType})`,
    ``,
    `Servicios: ${brief.service_types.join(", ") || "website"}`,
    `Paquete sugerido: ${inferredPackage}`,
    `Pago: ${brief.payment_preference}`,
    `Acciones: ${brief.desired_actions.join(", ")}`,
    `Canales: ${brief.primary_channels.join(", ")}`,
    `Timeline: ${brief.timeline || "flexible"}`,
    `Budget: ${brief.budget_range || "no especificado"}`,
    ``,
    brief.has_domain ? `Dominio: si${brief.domain_name ? ` (${brief.domain_name})` : ""}` : "Dominio: no",
    brief.has_logo ? `Logo: si${brief.logo_url ? ` — ${brief.logo_url}` : ""}` : "Logo: no",
    brief.has_photos ? `Fotos: si${brief.photos_url ? ` — ${brief.photos_url}` : ""}` : "",
    brief.competitors ? `Competencia: ${brief.competitors}` : "",
    brief.reference_sites ? `Referencia visual: ${brief.reference_sites}` : "",
    brief.extra_pages.length > 0 ? `Paginas extra: ${brief.extra_pages.join(", ")}` : "",
    brief.advanced_features.length > 0 ? `Features: ${brief.advanced_features.join(", ")}` : "",
    brief.additional_notes ? `Notas: ${brief.additional_notes}` : "",
  ].filter(Boolean).join("\n");

  return {
    action: "create_lead",
    name: brief.business_name,
    contact_name: brief.contact_name,
    contact_phone: brief.contact_phone,
    contact_email: brief.contact_email || null,
    business_type: normalizedType,
    source: brief.source || "landing_page",
    monthly_value: 0,
    plan_name: inferredPackage,
    notes,
  };
}

/* ── Rate limiting (simple in-memory) ─ */

const submissions = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const lastTime = submissions.get(ip);
  if (!lastTime) {
    submissions.set(ip, now);
    return false;
  }
  if (now - lastTime < RATE_LIMIT_WINDOW) {
    const count = Array.from(submissions.entries()).filter(
      ([k, v]) => k === ip && now - v < RATE_LIMIT_WINDOW
    ).length;
    if (count >= RATE_LIMIT_MAX) return true;
  }
  submissions.set(ip + ":" + now, now);
  // Cleanup old entries
  for (const [key, time] of submissions) {
    if (now - time > RATE_LIMIT_WINDOW * 5) submissions.delete(key);
  }
  return false;
}

/* ── Handler ───────────────────────── */

export async function POST(request: Request) {
  try {
    // Rate limit
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Demasiados envios. Intenta en 1 minuto." },
        { status: 429 }
      );
    }

    const body: BriefPayload = await request.json();

    // Honeypot check
    if (body._hp) {
      return NextResponse.json({ success: true, submission_id: "spam" });
    }

    // Validate
    const validationError = validateBrief(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Build ops-sync payload
    const payload = buildOpsSyncPayload(body);

    // Forward to luno-platform
    const platformUrl = process.env.LUNO_PLATFORM_URL;
    const syncKey = process.env.LUNO_OPS_SYNC_KEY;

    let synced = false;
    let syncError: string | null = null;

    if (platformUrl && syncKey) {
      try {
        const res = await fetch(`${platformUrl}/api/ops-sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${syncKey}`,
          },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          synced = true;
        } else {
          const errBody = await res.text();
          syncError = `ops-sync ${res.status}: ${errBody.slice(0, 200)}`;
          console.error("[intake] ops-sync failed:", syncError);
        }
      } catch (err) {
        syncError = `ops-sync network error: ${err instanceof Error ? err.message : "unknown"}`;
        console.error("[intake]", syncError);
      }
    } else {
      syncError = "LUNO_PLATFORM_URL or LUNO_OPS_SYNC_KEY not configured";
      console.warn("[intake]", syncError);
    }

    // Generate submission ID
    const submissionId = crypto.randomUUID();

    // Log submission (always, even if sync fails)
    console.log("[intake] Brief received:", {
      submission_id: submissionId,
      business: body.business_name,
      phone: body.contact_phone?.slice(-4),
      synced,
      sync_error: syncError,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      submission_id: submissionId,
      synced,
      // Don't leak sync errors to client
    });
  } catch (err) {
    console.error("[intake] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error interno. Tu brief fue recibido por WhatsApp." },
      { status: 500 }
    );
  }
}
