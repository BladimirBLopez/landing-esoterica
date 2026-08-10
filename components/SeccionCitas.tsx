"use client";

import { useState, useEffect } from "react";

const API_BASE = "https://juan-santiago-admin.vercel.app";

const SERVICIOS_CITA = [
  { value: "CONSULTA_TAROT", label: "Consulta de Tarot", desc: "Lectura de cartas en vivo" },
  { value: "CONSULTA_COCA", label: "Hojas de Coca", desc: "Lectura tradicional en vivo" },
];

function formatearHora(iso: string) {
  return new Date(iso).toLocaleTimeString("es-BO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatearDiaChip(date: Date) {
  return {
    dia: date.toLocaleDateString("es-BO", { weekday: "short" }),
    numero: date.toLocaleDateString("es-BO", { day: "numeric" }),
    mes: date.toLocaleDateString("es-BO", { month: "short" }),
  };
}

function formatearFechaLarga(date: Date) {
  return date.toLocaleDateString("es-BO", { weekday: "long", day: "numeric", month: "long" });
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
      className="relative overflow-hidden px-4 py-16"
      style={{
        background: "radial-gradient(circle at 50% 10%, #2a1a4a 0%, #1a0f30 40%, #1a0505 80%)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-md text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-[#c9a24b]">Consulta por Videollamada</p>
        <h2 className="mt-2 text-3xl text-[#f0d78c]" style={{ fontFamily: "var(--font-cinzel)" }}>
          Agenda tu Cita
        </h2>
        <p className="mt-2 text-sm text-[#f5e6d3]/60 mb-8">
          Elige tu servicio y el horario que más te acomode
        </p>

        {/* Tarjeta clara con la paleta vino/dorado del sitio */}
        <div
          className="rounded-2xl bg-[#fdfaf5] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden text-left border-t-4 border-[#c9a24b]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >

          {paso === "servicio" && (
            <div className="p-5">
              <p
                className="text-xs font-semibold uppercase tracking-widest text-[#8a1f3f] mb-3"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Paso 1 · Servicio
              </p>
              <div className="flex flex-col gap-2.5">
                {SERVICIOS_CITA.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => {
                      setServicio(s.value);
                      setPaso("horario");
                    }}
                    className="flex items-center justify-between rounded-xl border border-[#e8dfc8] px-4 py-3.5 text-left transition hover:border-[#8a1f3f] hover:bg-[#8a1f3f]/5"
                  >
                    <div>
                      <p className="text-[15px] font-semibold text-[#2a0a12]">{s.label}</p>
                      <p className="text-[13px] text-[#6b5d4f] mt-0.5">{s.desc}</p>
                    </div>
                    <span className="text-[#8a1f3f] text-lg">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {paso === "horario" && (
            <div>
              <div className="flex items-center justify-between px-5 pt-4">
                <button
                  onClick={() => setPaso("servicio")}
                  className="text-[13px] text-[#8a1f3f] font-semibold"
                >
                  ← Cambiar servicio
                </button>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-[#8a1f3f]"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Paso 2 · Horario
                </p>
              </div>

              <div className="flex gap-1.5 overflow-x-auto px-5 py-4">
                {dias.map((d) => {
                  const { dia, numero, mes } = formatearDiaChip(d);
                  const activo = fechaISOSinHora(d) === fechaISOSinHora(diaSeleccionado);
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDiaSeleccionado(d)}
                      className={`shrink-0 flex flex-col items-center rounded-xl px-3 py-2 min-w-[56px] transition ${
                        activo
                          ? "bg-[#4a0916] text-white"
                          : "bg-[#f3ede0] text-[#2a0a12] hover:bg-[#e8dfc8]"
                      }`}
                    >
                      <span className={`text-[10px] uppercase ${activo ? "text-[#f0d78c]" : "text-[#6b5d4f]"}`}>{dia}</span>
                      <span className="text-base font-semibold leading-tight">{numero}</span>
                      <span className={`text-[10px] uppercase ${activo ? "text-[#f0d78c]" : "text-[#6b5d4f]"}`}>{mes}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-2 px-5 pb-5 max-h-64 overflow-y-auto">
                {cargandoSlots && (
                  <p className="col-span-3 py-8 text-sm text-[#6b5d4f] text-center">Cargando horarios...</p>
                )}
                {!cargandoSlots && slots.length === 0 && (
                  <p className="col-span-3 py-8 text-sm text-[#6b5d4f] text-center">No hay horarios libres este día</p>
                )}
                {!cargandoSlots &&
                  slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setHorarioElegido(s);
                        setPaso("datos");
                      }}
                      className="rounded-lg border border-[#e8dfc8] py-2.5 text-[13px] font-semibold text-[#2a0a12] transition hover:border-[#8a1f3f] hover:bg-[#8a1f3f]/5"
                    >
                      {formatearHora(s)}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {paso === "datos" && horarioElegido && (
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setPaso("horario")}
                  className="text-[13px] text-[#8a1f3f] font-semibold"
                >
                  ← Cambiar horario
                </button>
                <p
                  className="text-xs font-semibold uppercase tracking-widest text-[#8a1f3f]"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Paso 3 · Tus datos
                </p>
              </div>

              <div className="rounded-xl bg-[#4a0916]/8 border border-[#4a0916]/20 px-4 py-3 mb-4">
                <p className="text-[15px] font-semibold text-[#2a0a12] capitalize">
                  {formatearFechaLarga(new Date(horarioElegido))}
                </p>
                <p className="text-[13px] text-[#8a1f3f] font-semibold mt-0.5">{formatearHora(horarioElegido)} · 30 min</p>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[13px] font-medium text-[#6b5d4f]">Nombre completo</label>
                  <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: María Pérez"
                    className="w-full mt-1 rounded-lg border border-[#e8dfc8] px-3.5 py-2.5 text-[15px] text-[#2a0a12] outline-none focus:border-[#8a1f3f]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-medium text-[#6b5d4f]">Número de WhatsApp</label>
                  <input
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Ej: 70000000"
                    type="tel"
                    className="w-full mt-1 rounded-lg border border-[#e8dfc8] px-3.5 py-2.5 text-[15px] text-[#2a0a12] outline-none focus:border-[#8a1f3f]"
                  />
                </div>
              </div>

              {error && <p className="mt-3 text-[13px] text-[#c2410c]">{error}</p>}

              <button
                onClick={confirmarReserva}
                disabled={enviando}
                className="mt-5 w-full rounded-lg bg-[#4a0916] px-6 py-3 text-[15px] font-semibold text-[#f0d78c] transition hover:bg-[#3a0710] disabled:opacity-60"
              >
                {enviando ? "Reservando..." : "Reservar y pagar Bs 50"}
              </button>

              <p className="mt-3 text-center text-[11px] text-[#6b5d4f]">
                Tu horario se guarda por 40 minutos mientras confirmas el pago
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
