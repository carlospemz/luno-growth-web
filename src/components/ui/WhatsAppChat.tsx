"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CheckCheck, Phone, Video, MoreVertical } from "lucide-react";

/**
 * WhatsAppChat — animated dolor → resolución sequence.
 *
 * Phase 1 (pain): Customer writes 3 messages. Delivered (✓✓) but
 * unanswered. Red banner "Sin responder / lead perdido" appears.
 *
 * Phase 2 (resolution): Vincent arrives, typing indicator, auto-reply
 * with available slots, confirmation. Green banner "Respondido en 12s".
 *
 * Loops forever. Lives inside the ContainerScroll device frame.
 */

type Msg = {
  id: string;
  from: "customer" | "vincent";
  body: string;
  time: string;
  read?: boolean;
};

const PAIN_MESSAGES: Msg[] = [
  {
    id: "p1",
    from: "customer",
    body: "Hola, ¿tienen disponibilidad este sábado para limpieza dental?",
    time: "22:47",
    read: true,
  },
  {
    id: "p2",
    from: "customer",
    body: "¿Hola?",
    time: "23:15",
    read: true,
  },
  {
    id: "p3",
    from: "customer",
    body: "Creo que mejor busco en otro lado 😕",
    time: "08:12",
    read: true,
  },
];

const RESOLUTION_MESSAGES: Msg[] = [
  {
    id: "r1",
    from: "customer",
    body: "Hola, ¿tienen disponibilidad este sábado para limpieza dental?",
    time: "22:47",
    read: true,
  },
  {
    id: "r2",
    from: "vincent",
    body: "¡Hola! Sí, tenemos tres horarios libres el sábado:\n\n🕐 10:00 am\n🕐 12:30 pm\n🕐 4:00 pm",
    time: "22:47",
  },
  {
    id: "r3",
    from: "vincent",
    body: "¿Cuál te acomoda? Te la aparto al momento.",
    time: "22:47",
  },
  {
    id: "r4",
    from: "customer",
    body: "Perfecto, la de 12:30 pm",
    time: "22:48",
    read: true,
  },
  {
    id: "r5",
    from: "vincent",
    body: "✅ Listo. Sábado 12:30 pm confirmada.\n\nTe envío recordatorio 24h antes. Dirección: Av. Reforma 210.",
    time: "22:48",
  },
];

const PHASE_HOLD_MS = 5200;
const TYPING_MS = 1100;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Phase = "pain" | "transition" | "resolution";

export function WhatsAppChat() {
  const [phase, setPhase] = useState<Phase>("pain");
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        // Phase 1 — pain
        setPhase("pain");
        setVisibleCount(0);
        for (let i = 0; i < PAIN_MESSAGES.length; i++) {
          await wait(900);
          if (cancelled) return;
          setVisibleCount(i + 1);
        }
        await wait(PHASE_HOLD_MS);
        if (cancelled) return;

        // Transition
        setPhase("transition");
        await wait(1000);
        if (cancelled) return;

        // Phase 2 — resolution
        setPhase("resolution");
        setVisibleCount(1);
        for (let i = 1; i < RESOLUTION_MESSAGES.length; i++) {
          const msg = RESOLUTION_MESSAGES[i];
          if (msg.from === "vincent") {
            setTyping(true);
            await wait(TYPING_MS);
            if (cancelled) return;
            setTyping(false);
          } else {
            await wait(650);
            if (cancelled) return;
          }
          setVisibleCount(i + 1);
          await wait(650);
          if (cancelled) return;
        }
        await wait(PHASE_HOLD_MS);
        if (cancelled) return;
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  const messages =
    phase === "resolution" ? RESOLUTION_MESSAGES : PAIN_MESSAGES;
  const shown = messages.slice(0, visibleCount);

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        background: "linear-gradient(180deg, #0D1418 0%, #111B20 100%)",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 shrink-0"
        style={{
          background: "#1F2C33",
          borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold"
          style={{
            background: "linear-gradient(180deg, #E8B931 0%, #C9A027 100%)",
            color: "#0B1E38",
          }}
        >
          CD
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-tight text-white truncate">
            Consultorio Dental
          </p>
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
              className="text-[10.5px] leading-tight truncate"
              style={{
                color:
                  phase === "resolution"
                    ? "#7FD6FF"
                    : phase === "transition"
                      ? "rgba(255, 255, 255, 0.6)"
                      : "rgba(255, 130, 130, 0.85)",
              }}
            >
              {phase === "pain" && "visto hace 9 horas"}
              {phase === "transition" && "conectando…"}
              {phase === "resolution" &&
                "Vincent · en línea · respondiendo por ti"}
            </motion.p>
          </AnimatePresence>
        </div>
        <Video
          className="h-[18px] w-[18px]"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        />
        <Phone
          className="h-[16px] w-[16px]"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        />
        <MoreVertical
          className="h-[18px] w-[18px]"
          style={{ color: "rgba(255, 255, 255, 0.6)" }}
        />
      </div>

      {/* Conversation */}
      <div
        className="relative flex-1 overflow-hidden px-3 py-4"
        style={{
          backgroundImage:
            "radial-gradient(rgba(127, 214, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      >
        <div className="flex flex-col gap-2 justify-end h-full">
          <AnimatePresence initial={false}>
            {shown.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${
                  msg.from === "customer" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`relative max-w-[78%] rounded-[10px] px-3 py-2 ${
                    msg.from === "customer"
                      ? "rounded-tl-[2px]"
                      : "rounded-tr-[2px]"
                  }`}
                  style={{
                    background:
                      msg.from === "customer" ? "#1F2C33" : "#005C4B",
                    boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.13)",
                  }}
                >
                  <p
                    className="text-[13px] leading-[1.38] text-white whitespace-pre-wrap"
                    style={{ wordBreak: "break-word" }}
                  >
                    {msg.body}
                  </p>
                  <div className="mt-1 flex items-center justify-end gap-1">
                    <span
                      className="text-[9.5px]"
                      style={{ color: "rgba(255, 255, 255, 0.55)" }}
                    >
                      {msg.time}
                    </span>
                    {msg.from === "customer" &&
                      (msg.read ? (
                        <CheckCheck
                          className="h-3 w-3"
                          style={{ color: "rgba(255, 255, 255, 0.55)" }}
                        />
                      ) : (
                        <Check
                          className="h-3 w-3"
                          style={{ color: "rgba(255, 255, 255, 0.55)" }}
                        />
                      ))}
                  </div>
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-end"
              >
                <div
                  className="rounded-[10px] rounded-tr-[2px] px-4 py-3"
                  style={{ background: "#005C4B" }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-white/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Status banner */}
        <AnimatePresence>
          {phase === "pain" && visibleCount === PAIN_MESSAGES.length && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-3 right-3 top-3 rounded-md px-3 py-2 text-center"
              style={{
                background: "rgba(220, 55, 55, 0.14)",
                border: "1px solid rgba(220, 55, 55, 0.4)",
                backdropFilter: "blur(6px)",
              }}
            >
              <p
                className="font-mono text-[10px] uppercase tracking-[0.16em]"
                style={{ color: "#FF9A9A" }}
              >
                3 mensajes · 9 h sin responder · lead perdido
              </p>
            </motion.div>
          )}
          {phase === "resolution" &&
            visibleCount === RESOLUTION_MESSAGES.length && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-3 right-3 top-3 rounded-md px-3 py-2 text-center"
                style={{
                  background: "rgba(127, 214, 255, 0.14)",
                  border: "1px solid rgba(127, 214, 255, 0.45)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: "#7FD6FF" }}
                >
                  Respondido en 12 s · cita confirmada · 0 esfuerzo
                </p>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Fake input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ background: "#1F2C33" }}
      >
        <div
          className="flex-1 rounded-full px-4 py-2 text-[12px]"
          style={{
            background: "#2A3942",
            color: "rgba(255, 255, 255, 0.45)",
          }}
        >
          Escribe un mensaje
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full"
          style={{ background: "#00A884" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1.5a3 3 0 0 0-3 3v7a3 3 0 1 0 6 0v-7a3 3 0 0 0-3-3zM5.5 11.5a.75.75 0 0 0-1.5 0 8 8 0 0 0 7.25 7.96v2.79a.75.75 0 0 0 1.5 0v-2.79A8 8 0 0 0 20 11.5a.75.75 0 0 0-1.5 0 6.5 6.5 0 0 1-13 0z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
