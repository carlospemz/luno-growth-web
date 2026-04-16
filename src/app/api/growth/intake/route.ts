import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * POST /api/growth/intake
 *
 * Receives brief data from the landing page form.
 * 1. Sends email notification to hola@lunolive.com (via Resend)
 * 2. Forwards to luno-platform ops-sync to create a lead + project.
 * Returns submission_id for tracking.
 *
 * Environment:
 *   RESEND_API_KEY — Resend API key for email delivery
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

  return {
    action: "create_brief",
    data: {
      business_name: brief.business_name.trim(),
      contact_name: brief.contact_name.trim(),
      contact_phone: brief.contact_phone.trim(),
      contact_email: brief.contact_email || null,
      business_type: normalizedType,
      business_description: brief.business_description.trim(),
      target_audience: brief.target_audience.trim(),
      location_city: brief.location_city || null,
      location_zone: brief.location_zone || null,
      service_types: brief.service_types,
      package_interest: inferredPackage,
      payment_preference: brief.payment_preference,
      desired_actions: brief.desired_actions,
      primary_channels: brief.primary_channels,
      timeline: brief.timeline || "flexible",
      budget_range: brief.budget_range || "unsure",
      has_domain: brief.has_domain,
      domain_name: brief.domain_name || null,
      has_logo: brief.has_logo,
      logo_url: brief.logo_url || null,
      has_photos: brief.has_photos || false,
      photos_url: brief.photos_url || null,
      competitors: brief.competitors || null,
      reference_sites: brief.reference_sites || null,
      extra_pages: brief.extra_pages,
      advanced_features: brief.advanced_features,
      additional_notes: brief.additional_notes || null,
      source: brief.source || "landing_page",
      utm_source: brief.utm_source || null,
      utm_medium: brief.utm_medium || null,
      utm_campaign: brief.utm_campaign || null,
    },
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

    // ── Send email notification to Eduardo ──
    let emailed = false;
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const services = (body.service_types || []).join(", ") || "No especificado";
        const actions = (body.desired_actions || []).join(", ") || "No especificado";
        const channels = (body.primary_channels || []).join(", ") || "No especificado";
        const extras = (body.extra_pages || []).join(", ");
        const advanced = (body.advanced_features || []).join(", ");

        await resend.emails.send({
          from: "Vincent Growth <onboarding@resend.dev>",
          to: ["hola@lunolive.com"],
          subject: `Nuevo Brief: ${body.business_name} — ${services}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0B1E38; color: #F5F0E1; padding: 32px; border-radius: 16px;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="color: #E8B931; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Vincent Growth · Nuevo Brief</span>
              </div>

              <h1 style="color: #F5F0E1; font-size: 24px; margin: 0 0 4px;">${body.business_name}</h1>
              <p style="color: rgba(245,240,225,0.6); font-size: 14px; margin: 0 0 24px;">ID: ${submissionId}</p>

              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                  <td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px; width: 140px;">Contacto</td>
                  <td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.contact_name}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                  <td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">WhatsApp</td>
                  <td style="padding: 10px 0; color: #E8B931; font-size: 14px; font-weight: 600;">${body.contact_phone}</td>
                </tr>
                ${body.contact_email ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Email</td><td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.contact_email}</td></tr>` : ""}
                <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                  <td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Giro</td>
                  <td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.business_type}</td>
                </tr>
                ${body.location_city ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Ciudad</td><td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.location_city}${body.location_zone ? ` · ${body.location_zone}` : ""}</td></tr>` : ""}
                <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                  <td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Qué vende</td>
                  <td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.business_description}</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                  <td style="padding: 10px 0; color: rgba(245,240,225,0.5); font-size: 13px;">A quién</td>
                  <td style="padding: 10px 0; color: #F5F0E1; font-size: 14px;">${body.target_audience}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(232,185,49,0.3);">
                <h2 style="color: #E8B931; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Servicio</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px; width: 140px;">Interés</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${services}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Acciones</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${actions}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Canales</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${channels}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Pago</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.payment_preference || "No especificado"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Budget</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.budget_range || "No especificado"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Timeline</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.timeline || "Flexible"}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Dominio</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.has_domain ? "Sí" : "No"}${body.domain_name ? ` (${body.domain_name})` : ""}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid rgba(245,240,225,0.1);">
                    <td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Logo</td>
                    <td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.has_logo ? "Sí" : "No"}${body.logo_url ? ` · ${body.logo_url}` : ""}</td>
                  </tr>
                  ${extras ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Páginas extra</td><td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${extras}</td></tr>` : ""}
                  ${advanced ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Funciones</td><td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${advanced}</td></tr>` : ""}
                  ${body.competitors ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Competencia</td><td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.competitors}</td></tr>` : ""}
                  ${body.reference_sites ? `<tr style="border-bottom: 1px solid rgba(245,240,225,0.1);"><td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Referencia visual</td><td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.reference_sites}</td></tr>` : ""}
                  ${body.additional_notes ? `<tr><td style="padding: 8px 0; color: rgba(245,240,225,0.5); font-size: 13px;">Notas</td><td style="padding: 8px 0; color: #F5F0E1; font-size: 14px;">${body.additional_notes}</td></tr>` : ""}
                </table>
              </div>

              <div style="margin-top: 28px; padding: 16px; background: rgba(232,185,49,0.08); border: 1px solid rgba(232,185,49,0.25); border-radius: 10px; text-align: center;">
                <a href="https://wa.me/${body.contact_phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hola ${body.contact_name}, soy Eduardo de Vincent Growth. Recibimos tu brief para ${body.business_name}. ¿Tienes unos minutos para platicar?`)}" style="color: #E8B931; font-size: 14px; font-weight: 600; text-decoration: none;">Responder por WhatsApp →</a>
              </div>

              <p style="margin-top: 24px; text-align: center; color: rgba(245,240,225,0.3); font-size: 11px;">Vincent Growth · ${new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          `,
        });
        emailed = true;
      } catch (emailErr) {
        console.error("[intake] Email failed:", emailErr);
      }
    } else {
      console.warn("[intake] RESEND_API_KEY not configured — email not sent");
    }

    // Log submission (always, even if sync/email fails)
    console.log("[intake] Brief received:", {
      submission_id: submissionId,
      business: body.business_name,
      phone: body.contact_phone?.slice(-4),
      synced,
      emailed,
      sync_error: syncError,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      submission_id: submissionId,
      synced,
      emailed,
    });
  } catch (err) {
    console.error("[intake] Unexpected error:", err);
    return NextResponse.json(
      { error: "Error interno. Tu brief fue recibido por WhatsApp." },
      { status: 500 }
    );
  }
}
