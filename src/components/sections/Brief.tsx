"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Section, { SectionHeader } from "@/components/ui/Section";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import { whatsappUrl } from "@/config/contact";
import { MOTION } from "@/lib/motion";
import "@/styles/luno-landing.css";

/* ═══════════════════════════════════════
   Constants
   ═══════════════════════════════════════ */

const INPUT =
  "w-full rounded-lg border border-zinc-200/80 bg-white px-3 py-2 text-[13px] text-zinc-900 placeholder-zinc-400 focus:border-purple-400/40 focus:outline-none focus:ring-2 focus:ring-purple-400/15";
const LABEL = "text-[13px] font-medium text-zinc-700 mb-2 block";
const ERR = "text-[13px] text-pink mt-1";

const DESIRED_ACTIONS = ["Cotizar", "Reservar", "Pedir"] as const;
const ORDER_CHANNELS = ["WhatsApp", "Instagram", "Llamada"] as const;
const EXTRA_PAGES = ["Menú", "Ubicación", "Servicios"] as const;
const ADVANCED = ["Catálogo", "Citas", "Pagos", "Formulario avanzado"] as const;

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
  businessName: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  businessType: string;
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

  if (!d.whatYouSell || d.whatYouSell.trim().length < 10)
    e.whatYouSell = "Cuéntanos un poco más (mínimo 10 caracteres).";

  if (!d.whoYouSellTo || d.whoYouSellTo.trim().length < 3)
    e.whoYouSellTo = "Describe a quién le vendes.";

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
    businessType: "",
    whatYouSell: "",
    whoYouSellTo: "",
    desiredActions: [],
    orderChannels: [],
    paymentPreference: "",
    hasDomain: "",
    domainWish: "",
    hasLogo: "",
    logoLinks: "",
    extraPages: [],
    advancedFeatures: [],
    timeline: "",
  };
}

/* ═══════════════════════════════════════
   Build notes from form fields
   ═══════════════════════════════════════ */

function buildNotes(d: BriefFormData): string {
  const lines: string[] = [];
  if (d.whatYouSell) lines.push(`Qué vende: ${d.whatYouSell}`);
  if (d.whoYouSellTo) lines.push(`A quién: ${d.whoYouSellTo}`);
  if (d.desiredActions.length) lines.push(`Acciones deseadas: ${d.desiredActions.join(", ")}`);
  if (d.orderChannels.length) lines.push(`Canales de pedido: ${d.orderChannels.join(", ")}`);
  if (d.paymentPreference) lines.push(`Pago: ${d.paymentPreference}`);
  if (d.hasDomain) lines.push(`Tiene dominio: ${d.hasDomain}`);
  if (d.domainWish) lines.push(`Dominio deseado: ${d.domainWish}`);
  if (d.hasLogo) lines.push(`Tiene logo: ${d.hasLogo}`);
  if (d.logoLinks) lines.push(`Links assets: ${d.logoLinks}`);
  if (d.extraPages.length) lines.push(`Páginas extra: ${d.extraPages.join(", ")}`);
  if (d.advancedFeatures.length) lines.push(`Funciones avanzadas: ${d.advancedFeatures.join(", ")}`);
  if (d.timeline) lines.push(`Fecha deseada: ${d.timeline}`);
  return lines.join("\n");
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
  const formRef = useRef<HTMLFormElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);

  const set = useCallback(
    <K extends keyof BriefFormData>(key: K, value: BriefFormData[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const toggleList = useCallback(
    (key: "desiredActions" | "orderChannels" | "extraPages" | "advancedFeatures", val: string) =>
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

      const msg = [
        `Negocio: ${form.businessName}`,
        form.contactName ? `Contacto: ${form.contactName}` : "",
        form.contactPhone ? `WhatsApp: ${form.contactPhone}` : "",
        form.contactEmail ? `Email: ${form.contactEmail}` : "",
        form.businessType ? `Giro: ${form.businessType}` : "",
        buildNotes(form),
      ].filter(Boolean).join("\n");

      window.open(whatsappUrl(msg), "_blank");
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
            Te escribimos por WhatsApp en menos de 24h.
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
        title="Cuéntanos tu proyecto."
        accentWord="proyecto."
      />

      {/* Conversion intro block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [...MOTION.ease], delay: 0.06 }}
        className="mx-auto mb-8 max-w-[680px] text-center"
      >
        <p className="text-[15px] text-zinc-500 md:text-[16px]">
          Brief 6–8 min. Respuesta en menos de 24h.
        </p>
        <p className="mt-2 text-[14px] text-zinc-500">
          Ten a la mano: logo/fotos, links y precios.
        </p>
      </motion.div>

      <div className="mx-auto max-w-[680px] rounded-[24px] border border-zinc-200/80 bg-white p-6 md:p-10">
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
            <div className="space-y-5">
              <fieldset data-field="businessName">
                <div className="space-y-4">
                  <div>
                    <label className={LABEL} htmlFor="b-name">
                      Nombre del negocio *
                    </label>
                    <input
                      id="b-name"
                      type="text"
                      className={INPUT}
                      placeholder="Ej. Mi Negocio"
                      value={form.businessName}
                      onChange={(e) => set("businessName", e.target.value)}
                    />
                    {errors.businessName && <p className={ERR}>{errors.businessName}</p>}
                  </div>
                  <div data-field="contactName">
                    <label className={LABEL} htmlFor="b-contact-name">
                      Tu nombre *
                    </label>
                    <input
                      id="b-contact-name"
                      type="text"
                      className={INPUT}
                      placeholder="Ej. Juan Pérez"
                      value={form.contactName}
                      onChange={(e) => set("contactName", e.target.value)}
                    />
                    {errors.contactName && <p className={ERR}>{errors.contactName}</p>}
                  </div>
                  <div data-field="contactPhone">
                    <label className={LABEL} htmlFor="b-wa">
                      WhatsApp *
                    </label>
                    <input
                      id="b-wa"
                      type="tel"
                      className={INPUT}
                      placeholder="Ej. 55 1234 5678"
                      value={form.contactPhone}
                      onChange={(e) => set("contactPhone", e.target.value)}
                    />
                    {errors.contactPhone && <p className={ERR}>{errors.contactPhone}</p>}
                  </div>
                  <div data-field="contactEmail">
                    <label className={LABEL} htmlFor="b-email">
                      Email
                    </label>
                    <input
                      id="b-email"
                      type="email"
                      className={INPUT}
                      placeholder="Ej. juan@minegocio.com"
                      value={form.contactEmail}
                      onChange={(e) => set("contactEmail", e.target.value)}
                    />
                  </div>
                  <div data-field="businessType">
                    <label className={LABEL} htmlFor="b-type">
                      Tipo de negocio
                    </label>
                    <input
                      id="b-type"
                      type="text"
                      className={INPUT}
                      placeholder="Ej. Restaurante, Clínica, E-commerce..."
                      value={form.businessType}
                      onChange={(e) => set("businessType", e.target.value)}
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset data-field="whatYouSell">
                <div className="space-y-4">
                  <div>
                    <label className={LABEL} htmlFor="b-sell">
                      ¿Qué vendes? (1–2 frases) *
                    </label>
                    <textarea
                      id="b-sell"
                      rows={3}
                      className={`${INPUT} resize-none`}
                      placeholder="Ej. Vendemos ropa deportiva para gimnasios en Monterrey"
                      value={form.whatYouSell}
                      onChange={(e) => set("whatYouSell", e.target.value)}
                    />
                    {errors.whatYouSell && <p className={ERR}>{errors.whatYouSell}</p>}
                  </div>
                  <div data-field="whoYouSellTo">
                    <label className={LABEL} htmlFor="b-who">
                      ¿A quién le vendes? *
                    </label>
                    <input
                      id="b-who"
                      type="text"
                      className={INPUT}
                      placeholder="Ej. Jóvenes de 18–35 que buscan ropa para gym"
                      value={form.whoYouSellTo}
                      onChange={(e) => set("whoYouSellTo", e.target.value)}
                    />
                    {errors.whoYouSellTo && <p className={ERR}>{errors.whoYouSellTo}</p>}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          <Divider />

          {/* ══════ Block 2: Qué quieres lograr ══════ */}
          <div>
            <h3 className="mb-6 font-heading text-[18px] font-bold text-zinc-900">Qué quieres lograr</h3>
            <div className="space-y-5">
              <fieldset data-field="desiredActions">
                <div className="space-y-4">
                  <div>
                    <p className={LABEL}>¿Qué quieres que haga la gente? *</p>
                    <div className="flex flex-wrap gap-2">
                      {DESIRED_ACTIONS.map((a) => (
                        <Chip
                          key={a}
                          label={a}
                          active={form.desiredActions.includes(a)}
                          onClick={() => toggleList("desiredActions", a)}
                        />
                      ))}
                    </div>
                    {errors.desiredActions && <p className={ERR}>{errors.desiredActions}</p>}
                  </div>
                  <div data-field="orderChannels">
                    <p className={LABEL}>¿Dónde quieres recibir pedidos? *</p>
                    <div className="flex flex-wrap gap-2">
                      {ORDER_CHANNELS.map((c) => (
                        <Chip
                          key={c}
                          label={c}
                          active={form.orderChannels.includes(c)}
                          onClick={() => toggleList("orderChannels", c)}
                        />
                      ))}
                    </div>
                    {errors.orderChannels && <p className={ERR}>{errors.orderChannels}</p>}
                  </div>
                </div>
              </fieldset>

              <fieldset data-field="paymentPreference">
                <p className={LABEL}>¿Pago único o mensualidad? *</p>
                <div className="flex flex-wrap gap-2">
                  {(["Pago único", "Mensualidad"] as const).map((opt) => (
                    <Chip
                      key={opt}
                      label={opt}
                      active={form.paymentPreference === opt}
                      onClick={() => set("paymentPreference", opt)}
                    />
                  ))}
                </div>
                {errors.paymentPreference && <p className={ERR}>{errors.paymentPreference}</p>}
              </fieldset>

              <fieldset data-field="hasDomain">
                <p className={LABEL}>¿Ya tienes dominio? *</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    { value: "si", label: "Sí" },
                    { value: "no", label: "No" },
                  ] as const).map((opt) => (
                    <Chip
                      key={opt.value}
                      label={opt.label}
                      active={form.hasDomain === opt.value}
                      onClick={() => set("hasDomain", opt.value)}
                    />
                  ))}
                </div>
                {errors.hasDomain && <p className={ERR}>{errors.hasDomain}</p>}

                {form.hasDomain === "no" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 overflow-hidden"
                  >
                    <label className={LABEL} htmlFor="b-domain">
                      ¿Qué nombre te gustaría?
                    </label>
                    <input
                      id="b-domain"
                      type="text"
                      className={INPUT}
                      placeholder="Ej. minegocio.mx"
                      value={form.domainWish}
                      onChange={(e) => set("domainWish", e.target.value)}
                    />
                  </motion.div>
                )}
              </fieldset>
            </div>
          </div>

          <Divider />

          {/* ══════ Block 3: Assets y extras ══════ */}
          <div>
            <h3 className="mb-6 font-heading text-[18px] font-bold text-zinc-900">
              Assets y extras{" "}
              <span className="text-[13px] font-normal text-zinc-500">(opcional)</span>
            </h3>
            <div className="space-y-5">
              <div>
                <p className={LABEL}>¿Tienes logo o fotos?</p>
                <div className="flex flex-wrap gap-2">
                  {(["Sí", "No"] as const).map((opt) => (
                    <Chip
                      key={opt}
                      label={opt}
                      active={form.hasLogo === (opt === "Sí" ? "si" : "no")}
                      onClick={() => set("hasLogo", opt === "Sí" ? "si" : "no")}
                    />
                  ))}
                </div>
                {form.hasLogo === "si" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="mt-3 overflow-hidden"
                  >
                    <label className={LABEL} htmlFor="b-logo">
                      Link a tus archivos (Drive, Dropbox, etc.)
                    </label>
                    <input
                      id="b-logo"
                      type="url"
                      className={INPUT}
                      placeholder="https://drive.google.com/..."
                      value={form.logoLinks}
                      data-field="logoLinks"
                      onChange={(e) => set("logoLinks", e.target.value)}
                    />
                    {errors.logoLinks && <p className={ERR}>{errors.logoLinks}</p>}
                  </motion.div>
                )}
              </div>

              <div>
                <p className={LABEL}>¿Necesitas páginas extra?</p>
                <div className="flex flex-wrap gap-2">
                  {EXTRA_PAGES.map((p) => (
                    <Chip
                      key={p}
                      label={p}
                      active={form.extraPages.includes(p)}
                      onClick={() => toggleList("extraPages", p)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className={LABEL}>¿Necesitas alguna de estas funciones?</p>
                <div className="flex flex-wrap gap-2">
                  {ADVANCED.map((f) => (
                    <Chip
                      key={f}
                      label={f}
                      active={form.advancedFeatures.includes(f)}
                      onClick={() => toggleList("advancedFeatures", f)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={LABEL} htmlFor="b-when">
                  ¿Cuándo lo quieres listo?
                </label>
                <input
                  id="b-when"
                  type="date"
                  className={INPUT}
                  value={form.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                />
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 px-8 text-[13px] font-medium text-white disabled:opacity-50"
            >
              {submitting ? "Enviando..." : "Enviar brief \u2192"}
            </button>
          </motion.div>

          <p className="text-center text-[13px] text-zinc-500">
            Tu información se guarda de forma segura. Te contactamos en menos de 24h.
          </p>
        </form>
      </div>
    </Section>
  );
}
