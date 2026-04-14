"use client";

import { useState, useRef, useCallback, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Stethoscope } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import { whatsappUrl } from "@/config/contact";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

/* ═══════════════════════════════════════
   Industry taxonomy — salud-first (dual positioning)
   ═══════════════════════════════════════ */

const SALUD_INDUSTRIES = [
  { value: "dental", label: "Consultorio dental" },
  { value: "medico", label: "Consultorio médico" },
  { value: "estetica", label: "Clínica estética" },
  { value: "fisio", label: "Fisioterapia / rehabilitación" },
  { value: "psicologia", label: "Psicología / salud mental" },
  { value: "pediatria", label: "Pediatría" },
  { value: "otro_salud", label: "Otro (salud)" },
] as const;

const OTROS_INDUSTRIES = [
  { value: "restaurante", label: "Restaurante / café" },
  { value: "inmobiliaria", label: "Inmobiliaria" },
  { value: "gimnasio", label: "Gimnasio / estudio" },
  { value: "servicios_prof", label: "Servicios profesionales" },
  { value: "retail", label: "Retail local" },
  { value: "otro", label: "Otro" },
] as const;

const SALUD_VALUES = new Set(SALUD_INDUSTRIES.map((i) => i.value));

function industryBucket(value: string): "salud" | "otros" | "" {
  if (!value) return "";
  return SALUD_VALUES.has(value as typeof SALUD_INDUSTRIES[number]["value"])
    ? "salud"
    : "otros";
}

/* ═══════════════════════════════════════
   Constants
   ═══════════════════════════════════════ */

const INPUT =
  "input-glass w-full px-3.5 py-3 text-[14px] placeholder-[rgba(245,240,225,0.38)] focus:outline-none";
const LABEL = "text-[13px] font-medium mb-2 block";
const ERR = "text-[12px] mt-2";

const SERVICE_TYPES = ["Website", "Marketing", "SEO", "Todo junto"] as const;
const DESIRED_ACTIONS = ["Cotizar", "Reservar", "Pedir", "Agendar", "Contactar"] as const;
const ORDER_CHANNELS = ["WhatsApp", "Instagram", "Llamada", "Formulario"] as const;
const EXTRA_PAGES = ["Menú", "Ubicación", "Servicios", "Galería", "Equipo"] as const;
const ADVANCED = ["Catálogo", "Citas", "Pagos", "Formulario avanzado", "Analytics"] as const;
const BUDGET_RANGES = [
  { value: "under_8k", label: "Menos de $8,000" },
  { value: "8k_15k", label: "$8,000 – $15,000" },
  { value: "15k_25k", label: "$15,000 – $25,000" },
  { value: "above_25k", label: "Más de $25,000" },
  { value: "unsure", label: "No sé todavía" },
] as const;
const TIMELINES = [
  { value: "urgent", label: "Lo antes posible" },
  { value: "normal", label: "2-4 semanas" },
  { value: "flexible", label: "Sin prisa" },
] as const;

/* ═══════════════════════════════════════
   Chip toggle
   ═══════════════════════════════════════ */

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
        active
          ? "border-purple-200 bg-purple-100 text-purple-700"
          : "border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300"
      }`}
    >
      {label}
    </button>
  );
}

/* ═══════════════════════════════════════
   Form data type
   ═══════════════════════════════════════ */

interface BriefFormData {
  // Negocio
  businessName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  industry: string;
  businessType: string;
  whatYouSell: string;
  whoYouSellTo: string;
  locationCity: string;
  locationZone: string;
  // Servicio
  serviceTypes: string[];
  desiredActions: string[];
  orderChannels: string[];
  paymentPreference: string;
  budgetRange: string;
  timeline: string;
  // Assets
  hasDomain: string;
  domainWish: string;
  hasLogo: string;
  logoLinks: string;
  hasPhotos: string;
  photosUrl: string;
  competitors: string;
  referenceSites: string;
  extraPages: string[];
  advancedFeatures: string[];
  additionalNotes: string;
}

/* ═══════════════════════════════════════
   Validation
   ═══════════════════════════════════════ */

type Errors = Partial<Record<string, string>>;

function validate(d: BriefFormData): Errors {
  const e: Errors = {};

  if (!d.businessName || d.businessName.trim().length < 2)
    e.businessName = "Escribe el nombre de tu negocio.";

  if (!d.contactName || d.contactName.trim().length < 2)
    e.contactName = "Escribe tu nombre.";

  const digits = d.contactPhone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 15)
    e.contactPhone = "Escribe un WhatsApp válido (10–15 dígitos).";

  if (!d.industry)
    e.industry = "Elige el tipo de negocio.";

  if (!d.whatYouSell || d.whatYouSell.trim().length < 10)
    e.whatYouSell = "Cuéntanos un poco más (mínimo 10 caracteres).";

  if (!d.whoYouSellTo || d.whoYouSellTo.trim().length < 3)
    e.whoYouSellTo = "Describe a quién le vendes.";

  if (d.serviceTypes.length === 0)
    e.serviceTypes = "Elige al menos un servicio.";

  if (d.desiredActions.length === 0)
    e.desiredActions = "Elige al menos una opción.";

  if (d.orderChannels.length === 0)
    e.orderChannels = "Elige al menos un canal.";

  if (!d.paymentPreference)
    e.paymentPreference = "Elige una opción.";

  if (!d.hasDomain)
    e.hasDomain = "Elige una opción.";

  if (
    d.logoLinks &&
    d.logoLinks.trim().length > 0 &&
    !/https?:\/\/|drive\.google|dropbox|wetransfer/i.test(d.logoLinks)
  )
    e.logoLinks = "Pega un link válido (http…) o déjalo vacío.";

  return e;
}

/* ═══════════════════════════════════════
   Initial state
   ═══════════════════════════════════════ */

function emptyBrief(): BriefFormData {
  return {
    businessName: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    industry: "",
    businessType: "",
    whatYouSell: "",
    whoYouSellTo: "",
    locationCity: "",
    locationZone: "",
    serviceTypes: [],
    desiredActions: [],
    orderChannels: [],
    paymentPreference: "",
    budgetRange: "",
    timeline: "",
    hasDomain: "",
    domainWish: "",
    hasLogo: "",
    logoLinks: "",
    hasPhotos: "",
    photosUrl: "",
    competitors: "",
    referenceSites: "",
    extraPages: [],
    advancedFeatures: [],
    additionalNotes: "",
  };
}

/* ═══════════════════════════════════════
   Build WhatsApp message (backup)
   ═══════════════════════════════════════ */

function buildWhatsAppMsg(d: BriefFormData): string {
  const lines: string[] = [
    `Negocio: ${d.businessName}`,
    d.contactName ? `Contacto: ${d.contactName}` : "",
    d.contactPhone ? `WhatsApp: ${d.contactPhone}` : "",
    d.contactEmail ? `Email: ${d.contactEmail}` : "",
    d.businessType ? `Giro: ${d.businessType}` : "",
    d.whatYouSell ? `Qué vende: ${d.whatYouSell}` : "",
    d.whoYouSellTo ? `A quién: ${d.whoYouSellTo}` : "",
    d.serviceTypes.length ? `Servicios: ${d.serviceTypes.join(", ")}` : "",
    d.desiredActions.length ? `Acciones: ${d.desiredActions.join(", ")}` : "",
    d.orderChannels.length ? `Canales: ${d.orderChannels.join(", ")}` : "",
    d.paymentPreference ? `Pago: ${d.paymentPreference}` : "",
    d.budgetRange ? `Budget: ${d.budgetRange}` : "",
    d.timeline ? `Timeline: ${d.timeline}` : "",
    d.hasDomain ? `Dominio: ${d.hasDomain}${d.domainWish ? ` (${d.domainWish})` : ""}` : "",
    d.competitors ? `Competencia: ${d.competitors}` : "",
    d.referenceSites ? `Referencia visual: ${d.referenceSites}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

/* ═══════════════════════════════════════
   Build API payload
   ═══════════════════════════════════════ */

function buildApiPayload(d: BriefFormData) {
  const serviceMap: Record<string, string> = {
    Website: "website",
    Marketing: "marketing",
    SEO: "seo",
    "Todo junto": "bundle",
  };

  return {
    business_name: d.businessName.trim(),
    contact_name: d.contactName.trim(),
    contact_phone: d.contactPhone.trim(),
    contact_email: d.contactEmail.trim() || undefined,
    industry: d.industry || "otro",
    industry_bucket: industryBucket(d.industry),
    business_type: d.businessType.trim() || d.industry || "otro",
    business_description: d.whatYouSell.trim(),
    target_audience: d.whoYouSellTo.trim(),
    location_city: d.locationCity.trim() || undefined,
    location_zone: d.locationZone.trim() || undefined,
    service_types: d.serviceTypes.map((s) => serviceMap[s] || s.toLowerCase()),
    package_interest: "unsure",
    payment_preference: d.paymentPreference === "Pago único" ? "one_time" : d.paymentPreference === "Mensualidad" ? "monthly" : "unsure",
    desired_actions: d.desiredActions.map((a) => a.toLowerCase()),
    primary_channels: d.orderChannels.map((c) => c.toLowerCase()),
    timeline: d.timeline || "flexible",
    budget_range: d.budgetRange || "unsure",
    has_domain: d.hasDomain === "si",
    domain_name: d.domainWish || undefined,
    has_logo: d.hasLogo === "si",
    logo_url: d.logoLinks || undefined,
    has_photos: d.hasPhotos === "si",
    photos_url: d.photosUrl || undefined,
    competitors: d.competitors || undefined,
    reference_sites: d.referenceSites || undefined,
    extra_pages: d.extraPages,
    advanced_features: d.advancedFeatures,
    additional_notes: d.additionalNotes || undefined,
    source: "landing_page",
  };
}

/* ═══════════════════════════════════════
   Component
   ═══════════════════════════════════════ */

export default function Brief() {
  const [form, setForm] = useState<BriefFormData>(emptyBrief);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fromHealthCTA, setFromHealthCTA] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);

  /* If the user arrived via the HealthTeaser CTA (hash contains
     industry=salud), pre-select "Consultorio dental" and show the
     Care-waitlist banner. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash.includes("industry=salud")) {
      setForm((prev) => ({ ...prev, industry: "dental" }));
      setFromHealthCTA(true);
    }
  }, []);

  const set = useCallback(
    <K extends keyof BriefFormData>(key: K, value: BriefFormData[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const toggleList = useCallback(
    (key: "serviceTypes" | "desiredActions" | "orderChannels" | "extraPages" | "advancedFeatures", val: string) =>
      setForm((prev) => ({
        ...prev,
        [key]: prev[key].includes(val)
          ? prev[key].filter((v) => v !== val)
          : [...prev[key], val],
      })),
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      // Honeypot
      if (hpRef.current?.value) {
        setSubmitted(true);
        return;
      }

      const errs = validate(form);
      setErrors(errs);

      if (Object.keys(errs).length > 0) {
        const firstKey = Object.keys(errs)[0];
        const el = formRef.current?.querySelector(`[data-field="${firstKey}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      setSubmitting(true);
      setSubmitError(null);

      // 1. Try API submission first (persists to DB)
      try {
        const res = await fetch("/api/growth/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(buildApiPayload(form)),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.warn("[brief] API submission failed:", data);
        }
      } catch (err) {
        console.warn("[brief] API submission error:", err);
      }

      // 2. Always open WhatsApp as well (backup + immediate channel)
      const msg = buildWhatsAppMsg(form);
      window.open(whatsappUrl(msg), "_blank");

      setSubmitting(false);
      setSubmitted(true);
    },
    [form],
  );

  /* ——— Success state ——— */

  if (submitted) {
    return (
      <Section id="brief">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [...MOTION.ease] }}
          className="mx-auto flex max-w-[480px] flex-col items-center py-16 text-center"
        >
          <CheckCircle className="mb-4 h-12 w-12 text-purple-500" />
          <h2 className="font-heading text-[28px] font-bold text-zinc-900 md:text-[36px]">
            ¡Brief recibido!
          </h2>
          <p className="mt-3 text-[15px] text-zinc-500">
            Tu información quedó registrada. Te escribimos por WhatsApp en menos de 24h.
          </p>
          <div className="mt-8">
            <Button variant="secondary" href="#" className="btn-secondary-alive">
              Volver al inicio
            </Button>
          </div>
        </motion.div>
      </Section>
    );
  }

  /* ——— Form ——— */

  return (
    <Section id="brief">
      <SectionHeader
        kicker="Brief"
        title="Cuéntanos tu caso."
        accentWord="tu caso."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.06 }}
        className="mx-auto mb-8 max-w-[680px] text-center"
      >
        <p
          className="text-[15px] md:text-[16px]"
          style={{ color: "rgba(245, 240, 225, 0.68)" }}
        >
          Brief 6–8 min. Vincent responde en horas, no en semanas.
        </p>
      </motion.div>

      {/* Care waitlist banner — only if user came from HealthTeaser */}
      {fromHealthCTA && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-5 max-w-[680px] rounded-2xl border px-5 py-4 flex items-start gap-3"
          style={{
            borderColor: "rgba(232, 185, 49, 0.45)",
            background: "rgba(232, 185, 49, 0.06)",
          }}
        >
          <Stethoscope
            className="h-5 w-5 mt-0.5 flex-shrink-0"
            style={{ color: "#E8B931" }}
          />
          <div>
            <p
              className="text-[14px] font-semibold mb-1"
              style={{ color: "#E8B931" }}
            >
              Lista de espera VINCENT Care
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(245, 240, 225, 0.75)" }}
            >
              Cuando abra nuestro producto para consultorios, los que llenen este brief entran primero.
            </p>
          </div>
        </motion.div>
      )}

      <div
        className="mx-auto max-w-[680px] rounded-[24px] border p-6 md:p-10"
        style={{
          borderColor: "rgba(245, 240, 225, 0.1)",
          background: "rgba(245, 240, 225, 0.03)",
        }}
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-10"
        >
          {/* Honeypot */}
          <input
            ref={hpRef}
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute h-0 opacity-0"
          />

          {/* ══════ Block 1: Tu negocio ══════ */}
          <div>
            <h3 className="mb-6 font-heading text-[18px] font-bold text-zinc-900">Tu negocio</h3>
            <div className="space-y-4">
              <div data-field="businessName">
                <label className={LABEL} htmlFor="b-name">Nombre del negocio *</label>
                <input id="b-name" type="text" className={INPUT} placeholder="Ej. Mi Negocio" value={form.businessName} onChange={(e) => set("businessName", e.target.value)} />
                {errors.businessName && <p className={ERR}>{errors.businessName}</p>}
              </div>
              <div data-field="contactName">
                <label className={LABEL} htmlFor="b-contact">Tu nombre *</label>
                <input id="b-contact" type="text" className={INPUT} placeholder="Ej. Juan Pérez" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} />
                {errors.contactName && <p className={ERR}>{errors.contactName}</p>}
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div data-field="contactPhone">
                  <label className={LABEL} htmlFor="b-wa">WhatsApp *</label>
                  <input id="b-wa" type="tel" className={INPUT} placeholder="55 1234 5678" value={form.contactPhone} onChange={(e) => set("contactPhone", e.target.value)} />
                  {errors.contactPhone && <p className={ERR}>{errors.contactPhone}</p>}
                </div>
                <div>
                  <label className={LABEL} htmlFor="b-email">Email</label>
                  <input id="b-email" type="email" className={INPUT} placeholder="juan@minegocio.com" value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
                </div>
              </div>
              <div data-field="industry">
                <label className={LABEL} htmlFor="b-industry">Tipo de negocio *</label>
                <select
                  id="b-industry"
                  className={INPUT}
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                >
                  <option value="">— Elige una opción —</option>
                  <optgroup label="── Salud ──">
                    {SALUD_INDUSTRIES.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="── Otros sectores ──">
                    {OTROS_INDUSTRIES.map((i) => (
                      <option key={i.value} value={i.value}>
                        {i.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.industry && <p className={ERR}>{errors.industry}</p>}
                {industryBucket(form.industry) === "salud" && (
                  <p
                    className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em]"
                    style={{ color: "rgba(232, 185, 49, 0.75)" }}
                  >
                    ↓ Vas primero en la lista de VINCENT Care
                  </p>
                )}
              </div>
              <div data-field="businessType">
                <label className={LABEL} htmlFor="b-type">Detalle del giro (opcional)</label>
                <input
                  id="b-type"
                  type="text"
                  className={INPUT}
                  placeholder="Ej. Ortodoncia infantil, dermatología láser, etc."
                  value={form.businessType}
                  onChange={(e) => set("businessType", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="b-city">Ciudad</label>
                  <input id="b-city" type="text" className={INPUT} placeholder="Monterrey" value={form.locationCity} onChange={(e) => set("locationCity", e.target.value)} />
                </div>
                <div>
                  <label className={LABEL} htmlFor="b-zone">Zona</label>
                  <input id="b-zone" type="text" className={INPUT} placeholder="San Pedro, Centro, etc." value={form.locationZone} onChange={(e) => set("locationZone", e.target.value)} />
                </div>
              </div>
              <div data-field="whatYouSell">
                <label className={LABEL} htmlFor="b-sell">¿Qué vendes? (1–2 frases) *</label>
                <textarea id="b-sell" rows={3} className={`${INPUT} resize-none`} placeholder="Ej. Vendemos ropa deportiva para gimnasios en Monterrey" value={form.whatYouSell} onChange={(e) => set("whatYouSell", e.target.value)} />
                {errors.whatYouSell && <p className={ERR}>{errors.whatYouSell}</p>}
              </div>
              <div data-field="whoYouSellTo">
                <label className={LABEL} htmlFor="b-who">¿A quién le vendes? *</label>
                <input id="b-who" type="text" className={INPUT} placeholder="Jóvenes 18–35 que buscan ropa para gym" value={form.whoYouSellTo} onChange={(e) => set("whoYouSellTo", e.target.value)} />
                {errors.whoYouSellTo && <p className={ERR}>{errors.whoYouSellTo}</p>}
              </div>
            </div>
          </div>

          <Divider />

          {/* ══════ Block 2: Qué quieres ══════ */}
          <div>
            <h3 className="mb-6 font-heading text-[18px] font-bold text-zinc-900">Qué necesitas</h3>
            <div className="space-y-5">
              <div data-field="serviceTypes">
                <p className={LABEL}>¿Qué servicio te interesa? *</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_TYPES.map((s) => (
                    <Chip key={s} label={s} active={form.serviceTypes.includes(s)} onClick={() => toggleList("serviceTypes", s)} />
                  ))}
                </div>
                {errors.serviceTypes && <p className={ERR}>{errors.serviceTypes}</p>}
              </div>

              <div data-field="desiredActions">
                <p className={LABEL}>¿Qué quieres que haga la gente? *</p>
                <div className="flex flex-wrap gap-2">
                  {DESIRED_ACTIONS.map((a) => (
                    <Chip key={a} label={a} active={form.desiredActions.includes(a)} onClick={() => toggleList("desiredActions", a)} />
                  ))}
                </div>
                {errors.desiredActions && <p className={ERR}>{errors.desiredActions}</p>}
              </div>

              <div data-field="orderChannels">
                <p className={LABEL}>¿Dónde quieres recibir contacto? *</p>
                <div className="flex flex-wrap gap-2">
                  {ORDER_CHANNELS.map((c) => (
                    <Chip key={c} label={c} active={form.orderChannels.includes(c)} onClick={() => toggleList("orderChannels", c)} />
                  ))}
                </div>
                {errors.orderChannels && <p className={ERR}>{errors.orderChannels}</p>}
              </div>

              <div data-field="paymentPreference">
                <p className={LABEL}>¿Pago único o mensualidad? *</p>
                <div className="flex flex-wrap gap-2">
                  {(["Pago único", "Mensualidad", "No sé todavía"] as const).map((opt) => (
                    <Chip key={opt} label={opt} active={form.paymentPreference === opt} onClick={() => set("paymentPreference", opt)} />
                  ))}
                </div>
                {errors.paymentPreference && <p className={ERR}>{errors.paymentPreference}</p>}
              </div>

              <div>
                <p className={LABEL}>Presupuesto aproximado (MXN)</p>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <Chip key={b.value} label={b.label} active={form.budgetRange === b.value} onClick={() => set("budgetRange", b.value)} />
                  ))}
                </div>
              </div>

              <div>
                <p className={LABEL}>¿Para cuándo lo necesitas?</p>
                <div className="flex flex-wrap gap-2">
                  {TIMELINES.map((t) => (
                    <Chip key={t.value} label={t.label} active={form.timeline === t.value} onClick={() => set("timeline", t.value)} />
                  ))}
                </div>
              </div>

              <div data-field="hasDomain">
                <p className={LABEL}>¿Ya tienes dominio? *</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Sí" active={form.hasDomain === "si"} onClick={() => set("hasDomain", "si")} />
                  <Chip label="No" active={form.hasDomain === "no"} onClick={() => set("hasDomain", "no")} />
                </div>
                {errors.hasDomain && <p className={ERR}>{errors.hasDomain}</p>}
                {form.hasDomain === "no" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }} className="mt-3 overflow-hidden">
                    <label className={LABEL} htmlFor="b-domain">¿Qué nombre te gustaría?</label>
                    <input id="b-domain" type="text" className={INPUT} placeholder="minegocio.mx" value={form.domainWish} onChange={(e) => set("domainWish", e.target.value)} />
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* ══════ Block 3: Assets y contexto ══════ */}
          <div>
            <h3 className="mb-6 font-heading text-[18px] font-bold text-zinc-900">
              Assets y contexto <span className="text-[13px] font-normal text-zinc-500">(opcional pero ayuda mucho)</span>
            </h3>
            <div className="space-y-5">
              <div>
                <p className={LABEL}>¿Tienes logo?</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Sí" active={form.hasLogo === "si"} onClick={() => set("hasLogo", "si")} />
                  <Chip label="No" active={form.hasLogo === "no"} onClick={() => set("hasLogo", "no")} />
                </div>
                {form.hasLogo === "si" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }} className="mt-3 overflow-hidden">
                    <label className={LABEL} htmlFor="b-logo">Link al logo (Drive, Dropbox...)</label>
                    <input id="b-logo" type="url" className={INPUT} placeholder="https://drive.google.com/..." value={form.logoLinks} data-field="logoLinks" onChange={(e) => set("logoLinks", e.target.value)} />
                    {errors.logoLinks && <p className={ERR}>{errors.logoLinks}</p>}
                  </motion.div>
                )}
              </div>

              <div>
                <p className={LABEL}>¿Tienes fotos profesionales?</p>
                <div className="flex flex-wrap gap-2">
                  <Chip label="Sí" active={form.hasPhotos === "si"} onClick={() => set("hasPhotos", "si")} />
                  <Chip label="No" active={form.hasPhotos === "no"} onClick={() => set("hasPhotos", "no")} />
                </div>
                {form.hasPhotos === "si" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.25 }} className="mt-3 overflow-hidden">
                    <label className={LABEL} htmlFor="b-photos">Link a tus fotos</label>
                    <input id="b-photos" type="url" className={INPUT} placeholder="https://drive.google.com/..." value={form.photosUrl} onChange={(e) => set("photosUrl", e.target.value)} />
                  </motion.div>
                )}
              </div>

              <div>
                <label className={LABEL} htmlFor="b-comp">¿Quién es tu competencia? (URLs o nombres)</label>
                <input id="b-comp" type="text" className={INPUT} placeholder="restaurantemarisol.mx, el-camaronfeliz.com" value={form.competitors} onChange={(e) => set("competitors", e.target.value)} />
              </div>

              <div>
                <label className={LABEL} htmlFor="b-ref">¿Hay algún sitio web que te guste? (URLs)</label>
                <input id="b-ref" type="text" className={INPUT} placeholder="me gusta apple.com, airbnb.com" value={form.referenceSites} onChange={(e) => set("referenceSites", e.target.value)} />
              </div>

              <div>
                <p className={LABEL}>¿Necesitas páginas extra?</p>
                <div className="flex flex-wrap gap-2">
                  {EXTRA_PAGES.map((p) => (
                    <Chip key={p} label={p} active={form.extraPages.includes(p)} onClick={() => toggleList("extraPages", p)} />
                  ))}
                </div>
              </div>

              <div>
                <p className={LABEL}>¿Necesitas alguna función especial?</p>
                <div className="flex flex-wrap gap-2">
                  {ADVANCED.map((f) => (
                    <Chip key={f} label={f} active={form.advancedFeatures.includes(f)} onClick={() => toggleList("advancedFeatures", f)} />
                  ))}
                </div>
              </div>

              <div>
                <label className={LABEL} htmlFor="b-notes">¿Algo más que debamos saber?</label>
                <textarea id="b-notes" rows={3} className={`${INPUT} resize-none`} placeholder="Cualquier detalle extra..." value={form.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)} maxLength={500} />
                <p className="mt-1 text-right text-[11px] text-zinc-400">{form.additionalNotes.length}/500</p>
              </div>
            </div>
          </div>

          <Divider />

          {/* ——— Submit ——— */}
          {submitError && (
            <p className="text-center text-[14px] text-red-400">{submitError}</p>
          )}

          <motion.div
            className="flex justify-center pt-2"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION.duration.fast, ease: [...MOTION.ease] }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-8 text-[14px] font-semibold text-white shadow-md shadow-purple-500/15 disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar brief →"}
            </button>
          </motion.div>

          <p className="text-center text-[13px] text-zinc-500">
            Tu información queda registrada de forma segura. Te contactamos en menos de 24h.
          </p>
        </form>
      </div>
    </Section>
  );
}
