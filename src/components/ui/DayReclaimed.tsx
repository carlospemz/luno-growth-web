"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";

/**
 * DayReclaimed — split-screen "antes / después" del día.
 *
 * Top half (antes): list of life items you keep postponing, each
 * with a sad empty checkbox and crossed-out status like "no hoy".
 * Bottom half (después): same items, but fulfilling in loop. One
 * by one a check lands, timestamp + "✓ hecho" appears.
 *
 * Loops forever inside the ContainerScroll phone frame.
 */

type Item = {
  id: string;
  label: string;
  antes: string;
  despues: string;
};

const ITEMS: Item[] = [
  {
    id: "breakfast",
    label: "Desayunar sin celular",
    antes: "Otra mañana revisando mensajes",
    despues: "Café caliente. Nada urgente.",
  },
  {
    id: "gym",
    label: "Ir al gym",
    antes: "Para mañana sí",
    despues: "45 min. Listo.",
  },
  {
    id: "weekend",
    label: "Fin de semana de verdad",
    antes: "En llamadas todo el sábado",
    despues: "Desconectado 48 horas.",
  },
  {
    id: "dinner",
    label: "Cenar con tu pareja",
    antes: "Sin revisar el teléfono",
    despues: "Dos horas. Cero notificaciones.",
  },
  {
    id: "vacation",
    label: "Las vacaciones que pospones",
    antes: "Dos años seguidos",
    despues: "Reservadas. En serio.",
  },
];

const STEP_MS = 900;
const HOLD_MS = 4200;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function DayReclaimed() {
  // 0..ITEMS.length — how many have been checked in the "después" half.
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        // reset
        setCheckedCount(0);
        await wait(1200);
        if (cancelled) return;

        // check one by one
        for (let i = 1; i <= ITEMS.length; i++) {
          setCheckedCount(i);
          await wait(STEP_MS);
          if (cancelled) return;
        }

        // hold fully checked
        await wait(HOLD_MS);
        if (cancelled) return;
      }
    };
    loop();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        background: "#F5F0E1",
      }}
    >
      {/* ── Header bar — ivory with a date ── */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{
          background: "#EDE4CC",
          borderBottom: "1px solid rgba(16, 35, 63, 0.1)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#E8B931" }}
          />
          <p
            className="font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ color: "rgba(16, 35, 63, 0.62)" }}
          >
            Tu día recuperado
          </p>
        </div>
        <p
          className="font-mono text-[10px] tabular-nums"
          style={{ color: "rgba(16, 35, 63, 0.52)" }}
        >
          {checkedCount}/{ITEMS.length}
        </p>
      </div>

      {/* ── Split ── */}
      <div className="relative flex-1 flex flex-col">
        {/* ─── ANTES half ─── */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #F0E7D0 0%, #E8DEC4 100%)",
          }}
        >
          <div className="absolute inset-0 px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-3">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(120, 80, 40, 0.75)" }}
              >
                Antes
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1"
                style={{ background: "rgba(120, 80, 40, 0.25)" }}
              />
            </div>
            <ul className="space-y-2">
              {ITEMS.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-2.5"
                >
                  <span
                    className="flex h-[14px] w-[14px] items-center justify-center rounded-sm shrink-0 mt-0.5"
                    style={{
                      background: "rgba(150, 100, 60, 0.12)",
                      border: "1px solid rgba(120, 80, 40, 0.35)",
                    }}
                    aria-hidden="true"
                  >
                    <X
                      className="h-2.5 w-2.5"
                      style={{ color: "rgba(150, 80, 50, 0.7)" }}
                      strokeWidth={3}
                    />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-[11.5px] font-semibold leading-tight"
                      style={{
                        color: "rgba(90, 60, 30, 0.75)",
                        textDecoration: "line-through",
                        textDecorationColor: "rgba(150, 80, 50, 0.5)",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-[10px] mt-0.5 leading-tight"
                      style={{ color: "rgba(120, 80, 40, 0.6)" }}
                    >
                      {item.antes}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ─── Divider — gold hairline ─── */}
        <div
          aria-hidden="true"
          className="relative h-[2px] shrink-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(232, 185, 49, 0.55) 50%, transparent 100%)",
            boxShadow: "0 0 14px rgba(232, 185, 49, 0.32)",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{
              background: "#10233F",
              color: "#E8B931",
              border: "1px solid rgba(232, 185, 49, 0.5)",
              boxShadow: "0 4px 10px rgba(16, 35, 63, 0.22)",
            }}
          >
            Con Vincent
          </div>
        </div>

        {/* ─── DESPUÉS half ─── */}
        <div
          className="relative flex-1 overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #F9F3DF 0%, #FCF7E5 100%)",
          }}
        >
          <div className="absolute inset-0 px-4 pt-4 pb-2">
            <div className="flex items-center gap-2 mb-3">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(16, 35, 63, 0.72)" }}
              >
                Después
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1"
                style={{ background: "rgba(16, 35, 63, 0.25)" }}
              />
            </div>
            <ul className="space-y-2">
              {ITEMS.map((item, i) => {
                const done = i < checkedCount;
                return (
                  <li
                    key={item.id}
                    className="flex items-start gap-2.5"
                  >
                    <motion.span
                      className="flex h-[14px] w-[14px] items-center justify-center rounded-sm shrink-0 mt-0.5"
                      initial={false}
                      animate={{
                        background: done
                          ? "#E8B931"
                          : "rgba(16, 35, 63, 0.06)",
                        borderColor: done
                          ? "rgba(232, 185, 49, 0.9)"
                          : "rgba(16, 35, 63, 0.3)",
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        border: "1px solid",
                      }}
                      aria-hidden="true"
                    >
                      <AnimatePresence>
                        {done && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Check
                              className="h-2.5 w-2.5"
                              style={{ color: "#0B1E38" }}
                              strokeWidth={4}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.span>
                    <div className="min-w-0 flex-1">
                      <motion.p
                        className="text-[11.5px] font-semibold leading-tight"
                        animate={{
                          color: done
                            ? "rgba(16, 35, 63, 1)"
                            : "rgba(16, 35, 63, 0.45)",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        {item.label}
                      </motion.p>
                      <motion.p
                        className="text-[10px] mt-0.5 leading-tight"
                        animate={{
                          color: done
                            ? "rgba(16, 35, 63, 0.65)"
                            : "rgba(16, 35, 63, 0.3)",
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        {item.despues}
                      </motion.p>
                    </div>
                    {done && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="font-mono text-[8.5px] uppercase tracking-[0.18em] shrink-0 mt-1"
                        style={{ color: "#38A169" }}
                      >
                        ✓ hecho
                      </motion.span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Footer strip — subtle brand close ── */}
      <div
        className="flex items-center justify-center px-4 py-2.5 shrink-0"
        style={{
          background: "#EDE4CC",
          borderTop: "1px solid rgba(16, 35, 63, 0.1)",
        }}
      >
        <p
          className="font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ color: "rgba(16, 35, 63, 0.52)" }}
        >
          Vincent sostiene la noche · tú recuperas el día
        </p>
      </div>
    </div>
  );
}
