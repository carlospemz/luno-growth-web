"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarCheck,
  MessageSquareHeart,
  Shield,
  Sparkles,
  Bell,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { MOTION } from "@/lib/motion";

/**
 * CarePage — teaser / waitlist for Vincent Care.
 *
 * This page deliberately does NOT sell Care as a live product.
 * It explains what it will be, who it's for, how it's different
 * from Growth, and lets users register to be notified when it
 * opens. No pricing, no buy button, no "agenda ya" CTA.
 */

const WHAT_IT_IS = [
  {
    icon: MessageSquareHeart,
    title: "Recepción conversacional",
    body: "Responde, filtra y agenda pacientes por WhatsApp con lenguaje clínico cuidado. Sin formularios, sin fricción.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda sincronizada",
    body: "Confirma, reagenda y recuerda citas sin que dependas de una recepcionista disponible las 24 horas.",
  },
  {
    icon: Shield,
    title: "Confidencialidad clínica",
    body: "Diseñado desde el primer día para cuidar datos sensibles: tono, permisos, manejo y trazabilidad.",
  },
  {
    icon: Sparkles,
    title: "Una lógica propia",
    body: "Care no es una capa sobre un CRM genérico. Es un sistema nuevo pensado para cómo opera un consultorio real.",
  },
];

const FOR_WHO = [
  "Consultorios dentales",
  "Consultorios médicos",
  "Clínicas estéticas",
  "Fisioterapia y rehabilitación",
  "Psicología y salud mental",
  "Pediatría",
  "Consultorios de especialidad",
];

export default function CarePage() {
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMsg("Necesitamos un correo válido.");
      return;
    }
    setStatus("sending");
    try {
      // Reuse the existing intake endpoint with a care_waitlist marker
      const res = await fetch("/api/growth/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "care_waitlist",
          email,
          specialty: specialty || null,
          industry: specialty || "salud",
          industry_bucket: "salud",
          message: "care_waitlist_signup",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setStatus("ok");
        setEmail("");
        setSpecialty("");
      } else {
        setStatus("error");
        setErrorMsg(
          data.error || "No pudimos registrarte. Intenta de nuevo en un momento.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Error de red. Intenta de nuevo.");
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-[calc(env(safe-area-inset-top,0px)+96px)] md:pt-32 pb-16 md:pb-24"
        style={{
          background:
            "linear-gradient(180deg, #0B1E38 0%, #0A1B33 60%, #09192F 100%)",
        }}
      >
        <Container className="relative z-10">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-10 transition-colors"
            style={{ color: "rgba(245, 240, 225, 0.55)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Vincent Growth
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [...MOTION.easeOut] }}
            className="max-w-[780px]"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 mb-6"
              style={{
                borderColor: "rgba(232, 185, 49, 0.4)",
                background: "rgba(232, 185, 49, 0.06)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: "#E8B931" }}
              />
              <span
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#E8B931" }}
              >
                Vincent Care · en preparación
              </span>
            </div>

            <h1
              className="font-headline text-[44px] md:text-[72px] lg:text-[88px] font-extrabold uppercase leading-[0.92] tracking-tight"
              style={{ color: "#F5F0E1", textWrap: "balance" }}
            >
              Una solución{" "}
              <span className="vin-gradient-gold-text">
                exclusivamente para salud.
              </span>
            </h1>

            <p
              className="mt-8 md:mt-10 max-w-[620px] text-[16px] md:text-[18px] leading-relaxed"
              style={{ color: "rgba(245, 240, 225, 0.72)" }}
            >
              Vincent Care es una solución creada exclusivamente para
              consultorios, clínicas y especialistas. Otra lógica, otro
              lenguaje y otra profundidad que la venta de marketing que hace
              Vincent Growth hoy.
            </p>

            <p
              className="mt-6 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed font-medium"
              style={{ color: "#F5F0E1" }}
            >
              Todavía no está abierto. Lo estamos preparando bien.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ── Qué será ── */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "#0B1E38" }}
      >
        <Container>
          <div className="max-w-[720px] mb-12 md:mb-16">
            <p
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-4"
              style={{ color: "rgba(232, 185, 49, 0.82)" }}
            >
              Qué será
            </p>
            <h2
              className="font-headline text-[32px] md:text-[48px] font-extrabold uppercase leading-[1] tracking-tight"
              style={{ color: "#F5F0E1", textWrap: "balance" }}
            >
              No es un CRM. No es un bot.{" "}
              <span className="vin-gradient-gold-text">
                Es un sistema propio para salud.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:gap-5 md:grid-cols-2">
            {WHAT_IT_IS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    ease: [...MOTION.easeOut],
                    delay: i * 0.06,
                  }}
                  className="rounded-2xl p-6 md:p-7"
                  style={{
                    background: "rgba(245, 240, 225, 0.03)",
                    border: "1px solid rgba(245, 240, 225, 0.1)",
                  }}
                >
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 50% 0%, rgba(232, 185, 49, 0.14), rgba(8, 16, 32, 0.9))",
                      boxShadow:
                        "inset 0 1px 0 rgba(245, 240, 225, 0.14), inset 0 -2px 6px rgba(0,0,0,0.55), 0 0 0 1px rgba(232, 185, 49, 0.28)",
                      color: "#E8B931",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className="font-headline text-[20px] md:text-[22px] font-bold uppercase leading-[1.05] tracking-tight mb-3"
                    style={{ color: "#F5F0E1" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] md:text-[15px] leading-[1.65]"
                    style={{ color: "rgba(245, 240, 225, 0.68)" }}
                  >
                    {item.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Para quién ── */}
      <section
        className="relative py-20 md:py-24"
        style={{ background: "#0A1B33" }}
      >
        <Container>
          <div className="max-w-[720px] mb-10">
            <p
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-4"
              style={{ color: "rgba(232, 185, 49, 0.82)" }}
            >
              Para quién
            </p>
            <h2
              className="font-headline text-[30px] md:text-[44px] font-extrabold uppercase leading-[1] tracking-tight"
              style={{ color: "#F5F0E1", textWrap: "balance" }}
            >
              Pensado para quien cuida{" "}
              <span className="vin-gradient-gold-text">la salud de otros.</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {FOR_WHO.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.4,
                  ease: [...MOTION.easeOut],
                  delay: 0.1 + i * 0.04,
                }}
                className="inline-flex items-center rounded-full border px-4 py-2 text-[12px] md:text-[13px] font-medium"
                style={{
                  borderColor: "rgba(232, 185, 49, 0.32)",
                  background: "rgba(232, 185, 49, 0.06)",
                  color: "#F5F0E1",
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Care vs Growth ── */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: "#0B1E38" }}
      >
        <Container>
          <div className="max-w-[720px] mb-12">
            <p
              className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-4"
              style={{ color: "rgba(232, 185, 49, 0.82)" }}
            >
              Care vs Growth
            </p>
            <h2
              className="font-headline text-[30px] md:text-[44px] font-extrabold uppercase leading-[1] tracking-tight"
              style={{ color: "#F5F0E1", textWrap: "balance" }}
            >
              Dos soluciones.{" "}
              <span className="vin-gradient-gold-text">
                Dos momentos distintos.
              </span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background: "rgba(245, 240, 225, 0.03)",
                border: "1px solid rgba(245, 240, 225, 0.1)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                style={{ color: "rgba(245, 240, 225, 0.55)" }}
              >
                Disponible hoy
              </p>
              <h3
                className="font-headline text-[26px] md:text-[30px] font-extrabold uppercase leading-[1] tracking-tight mb-4"
                style={{ color: "#F5F0E1" }}
              >
                Vincent Growth
              </h3>
              <p
                className="text-[14px] md:text-[15px] leading-[1.65] mb-4"
                style={{ color: "rgba(245, 240, 225, 0.68)" }}
              >
                Marca, contenido y demanda para cualquier negocio serio. Hoy
                trabajamos mejor con consultorios, clínicas y especialistas
                aunque funciona para cualquier sector.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "#E8B931" }}
              >
                Ver Vincent Growth →
              </Link>
            </div>

            <div
              className="rounded-2xl p-6 md:p-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(232, 185, 49, 0.08) 0%, rgba(16, 35, 63, 0.4) 100%)",
                border: "1px solid rgba(232, 185, 49, 0.3)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                style={{ color: "#E8B931" }}
              >
                Próximo lanzamiento
              </p>
              <h3
                className="font-headline text-[26px] md:text-[30px] font-extrabold uppercase leading-[1] tracking-tight mb-4"
                style={{ color: "#F5F0E1" }}
              >
                Vincent Care
              </h3>
              <p
                className="text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(245, 240, 225, 0.78)" }}
              >
                Solución dedicada al sector salud: recepción conversacional,
                agenda sincronizada, confidencialidad clínica. Otra lógica,
                otro lenguaje. Solo para quien cuida pacientes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Waitlist form ── */}
      <section
        id="waitlist"
        className="relative py-24 md:py-32"
        style={{
          background:
            "linear-gradient(180deg, #09192F 0%, #081628 60%, #06111F 100%)",
        }}
      >
        <Container>
          <div className="mx-auto max-w-[620px]">
            <div className="text-center mb-10">
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-full mb-5"
                style={{
                  background:
                    "radial-gradient(120% 120% at 50% 0%, rgba(232, 185, 49, 0.18), rgba(8, 16, 32, 0.9))",
                  boxShadow:
                    "inset 0 1px 0 rgba(245, 240, 225, 0.18), 0 0 0 1px rgba(232, 185, 49, 0.35), 0 0 24px rgba(232, 185, 49, 0.22)",
                  color: "#E8B931",
                }}
              >
                <Bell className="h-6 w-6" />
              </div>
              <p
                className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.22em] mb-3"
                style={{ color: "rgba(232, 185, 49, 0.82)" }}
              >
                Lista de espera
              </p>
              <h2
                className="font-headline text-[30px] md:text-[44px] font-extrabold uppercase leading-[1] tracking-tight"
                style={{ color: "#F5F0E1", textWrap: "balance" }}
              >
                Entérate primero cuando{" "}
                <span className="vin-gradient-gold-text">abra Care.</span>
              </h2>
              <p
                className="mt-5 text-[14px] md:text-[15px] leading-[1.65]"
                style={{ color: "rgba(245, 240, 225, 0.62)" }}
              >
                Deja tu correo y, si atiendes un consultorio o clínica, el
                tipo de consulta. Te avisamos antes del lanzamiento público.
              </p>
            </div>

            {status === "ok" ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{
                  background: "rgba(56, 178, 113, 0.08)",
                  border: "1px solid rgba(56, 178, 113, 0.35)",
                }}
              >
                <div
                  className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(56, 178, 113, 0.18)",
                    color: "#38B271",
                  }}
                >
                  <CheckCircle className="h-6 w-6" />
                </div>
                <p
                  className="font-headline text-[20px] md:text-[22px] font-bold uppercase tracking-tight mb-2"
                  style={{ color: "#F5F0E1" }}
                >
                  Quedaste registrado.
                </p>
                <p
                  className="text-[14px] leading-relaxed"
                  style={{ color: "rgba(245, 240, 225, 0.68)" }}
                >
                  Te escribimos antes de que Care abra. Mientras tanto, si
                  quieres trabajar tu marca desde hoy, Vincent Growth ya está
                  operando.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                <div>
                  <label
                    htmlFor="care-email"
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: "rgba(245, 240, 225, 0.72)" }}
                  >
                    Correo
                  </label>
                  <input
                    id="care-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@consultorio.com"
                    className="w-full rounded-xl px-4 py-3.5 text-[14px] focus:outline-none"
                    style={{
                      background: "rgba(245, 240, 225, 0.04)",
                      border: "1px solid rgba(245, 240, 225, 0.14)",
                      color: "#F5F0E1",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="care-specialty"
                    className="block text-[13px] font-medium mb-2"
                    style={{ color: "rgba(245, 240, 225, 0.72)" }}
                  >
                    Tipo de consulta <span className="opacity-60">(opcional)</span>
                  </label>
                  <select
                    id="care-specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 text-[14px] focus:outline-none"
                    style={{
                      background: "rgba(245, 240, 225, 0.04)",
                      border: "1px solid rgba(245, 240, 225, 0.14)",
                      color: "#F5F0E1",
                    }}
                  >
                    <option value="">Selecciona…</option>
                    <option value="dental">Consultorio dental</option>
                    <option value="medico">Consultorio médico</option>
                    <option value="estetica">Clínica estética</option>
                    <option value="fisio">Fisioterapia</option>
                    <option value="psicologia">Psicología</option>
                    <option value="pediatria">Pediatría</option>
                    <option value="especialidad">Especialidad</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {status === "error" && errorMsg && (
                  <div
                    className="flex items-start gap-2 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(220, 55, 55, 0.1)",
                      border: "1px solid rgba(220, 55, 55, 0.35)",
                    }}
                  >
                    <AlertTriangle
                      className="h-4 w-4 flex-shrink-0 mt-0.5"
                      style={{ color: "#FF9A9A" }}
                    />
                    <p className="text-[13px]" style={{ color: "#FFB8B8" }}>
                      {errorMsg}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full px-8 py-4 text-[14px] font-semibold transition-transform active:scale-[0.98] disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #E8B931, #F5D06A)",
                    color: "#0B1E38",
                    boxShadow:
                      "0 6px 22px rgba(232, 185, 49, 0.22), 0 0 0 1px rgba(232, 185, 49, 0.4)",
                  }}
                >
                  {status === "sending" ? "Registrando…" : "Avísame cuando abra"}
                </button>

                <p
                  className="text-center font-mono text-[10px] uppercase tracking-[0.2em] pt-2"
                  style={{ color: "rgba(245, 240, 225, 0.42)" }}
                >
                  Sin spam. Solo el aviso del lanzamiento.
                </p>
              </form>
            )}
          </div>
        </Container>
      </section>

      {/* ── Footer back link ── */}
      <section
        className="relative py-12 text-center"
        style={{
          background: "#06111F",
          borderTop: "1px solid rgba(245, 240, 225, 0.06)",
        }}
      >
        <Container>
          <p
            className="text-[14px] mb-4"
            style={{ color: "rgba(245, 240, 225, 0.55)" }}
          >
            ¿Quieres trabajar tu marca desde hoy?
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "#E8B931" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Vincent Growth
          </Link>
        </Container>
      </section>
    </>
  );
}
