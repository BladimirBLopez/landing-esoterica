"use client";

import { useState, useEffect } from "react";

const API_BASE = "https://juan-santiago-admin.vercel.app";

const SERVICIOS_CITA = [
  { value: "CONSULTA_TAROT", label: "Consulta de Tarot", emoji: "🃏" },
  { value: "CONSULTA_COCA", label: "Hojas de Coca", emoji: "🌿" },
];

function formatearHora(iso: string) {
  return new Date(iso).toLocaleTimeString("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatearFechaCorta(date: Date) {
  return date.toLocaleDateString("es-BO", { weekday: "short", day: "numeric", month: "short" });
}

function fechaISOSinHora(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function SeccionCitas() {
  const [paso, setPaso] = useState<"servicio" | "horario" | "datos" | "confirmado">("servicio");
  const [servicio, setServicio] = useState("");
  const [diaSeleccionado, setDiaSeleccionado] = useState<Date>(new Date());
  const [slots, setSlots] = useState<string[]>([]);
  const [cargandoSlots, setCargandoSlots] = useState(false);
  const [horarioElegido, setHorarioElegido] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const dias = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  useEffect(() => {
    if (paso !== "horario") return;
    setCargandoSlots(true);
    setSlots([]);
    fetch(`${API_BASE}/api/citas/disponibilidad?fecha=${fechaISOSinHora(diaSeleccionado)}`)
      .then((res) => res.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setCargandoSlots(false));
  }, [paso, diaSeleccionado]);

  async function confirmarReserva() {
    if (nombre.trim().length < 3) {
      setError("Escribe tu nombre completo");
      return;
    }
    if (telefono.replace(/\D/g, "").length < 8) {
      setError("Escribe un número de WhatsApp válido");
      return;
    }
    setError("");
    setEnviando(true);

    try {
      const res = await fetch(`${API_BASE}/api/citas/reservar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          telefono,
          servicio,
          fechaCita: horarioElegido,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ese horario ya no está disponible, elige otro.");
        setEnviando(false);
        return;
      }

      window.location.href = `${API_BASE}/pago/${data.consultaId}?monto=50`;
    } catch {
      setError("Hubo un problema. Intenta de nuevo.");
      setEnviando(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-16"
      style={{
        background: "radial-gradient(circle at 50% 10%, #2a1a4a 0%, #1a0f30 40%, #1a0505 80%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-sm text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">Consulta por Videollamada</p>
        <h2 className="mt-2 text-3xl text-[#f0d78c]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Agenda tu Cita
        </h2>
        <p className="mt-2 text-sm text-[#f5e6d3]/60">
          Elige tu servicio y el horario que más te acomode
        </p>

        {paso === "servicio" && (
          <div className="mt-8 flex flex-col gap-3">
            {SERVICIOS_CITA.map((s) => (
              <button
                key={s.value}
                onClick={() => {
                  setServicio(s.value);
                  setPaso("horario");
                }}
                className="flex items-center gap-3 rounded-2xl border border-[#c9a24b]/40 bg-[#1a0505]/60 px-5 py-4 text-left text-[#f5e6d3] transition hover:border-[#c9a24b] hover:bg-[#1a0505]/80"
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className="font-semibold">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {paso === "horario" && (
          <div className="mt-8">
            <button
              onClick={() => setPaso("servicio")}
              className="mb-4 text-xs text-[#c9a24b]/70 underline"
            >
              ← Cambiar servicio
            </button>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {dias.map((d) => {
                const activo = fechaISOSinHora(d) === fechaISOSinHora(diaSeleccionado);
                return (
                  <button
                    key={d.toISOString()}
                    onClick={() => setDiaSeleccionado(d)}
                    className={`shrink-0 rounded-xl border px-3 py-2 text-xs capitalize transition ${
                      activo
                        ? "border-[#c9a24b] bg-[#c9a24b]/20 text-[#f0d78c]"
                        : "border-[#c9a24b]/30 text-[#f5e6d3]/60"
                    }`}
                  >
                    {formatearFechaCorta(d)}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
              {cargandoSlots && (
                <p className="col-span-3 py-6 text-sm text-[#f5e6d3]/50">Cargando horarios...</p>
              )}
              {!cargandoSlots && slots.length === 0 && (
                <p className="col-span-3 py-6 text-sm text-[#f5e6d3]/50">No hay horarios libres este día</p>
              )}
              {!cargandoSlots &&
                slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setHorarioElegido(s);
                      setPaso("datos");
                    }}
                    className="rounded-lg border border-[#c9a24b]/40 bg-[#1a0505]/60 py-2 text-xs text-[#f5e6d3] transition hover:border-[#c9a24b] hover:bg-[#c9a24b]/10"
                  >
                    {formatearHora(s)}
                  </button>
                ))}
            </div>
          </div>
        )}

        {paso === "datos" && horarioElegido && (
          <div className="mt-8 text-left">
            <button
              onClick={() => setPaso("horario")}
              className="mb-4 text-xs text-[#c9a24b]/70 underline"
            >
              ← Cambiar horario
            </button>

            <p className="mb-4 rounded-xl border border-[#c9a24b]/30 bg-[#c9a24b]/10 px-4 py-3 text-center text-sm text-[#f0d78c]">
              {formatearFechaCorta(new Date(horarioElegido))} · {formatearHora(horarioElegido)}
            </p>

            <div className="flex flex-col gap-3">
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre completo"
                className="w-full rounded-xl border border-[#c9a24b]/40 bg-[#1a0505]/70 px-4 py-3 text-sm text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 focus:outline-none focus:border-[#c9a24b]"
              />
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Tu número de WhatsApp"
                type="tel"
                className="w-full rounded-xl border border-[#c9a24b]/40 bg-[#1a0505]/70 px-4 py-3 text-sm text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 focus:outline-none focus:border-[#c9a24b]"
              />
            </div>

            {error && <p className="mt-3 text-xs text-[#f97316]">{error}</p>}

            <button
              onClick={confirmarReserva}
              disabled={enviando}
              className="mt-5 w-full rounded-full border-2 border-[#c9a24b] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#f0d78c] transition hover:bg-[#c9a24b]/10 disabled:opacity-60"
            >
              {enviando ? "Reservando..." : "Reservar y pagar 50 Bs"}
            </button>

            <p className="mt-3 text-center text-[10px] text-[#f5e6d3]/40">
              Tu horario se guarda por 40 minutos mientras confirmas el pago
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
