"use client";

import { useState } from "react";

function AbanicoCartas({
  activo,
  onElegir,
  cargando,
}: {
  activo: boolean;
  onElegir: () => void;
  cargando: boolean;
}) {
  const [indiceElegido, setIndiceElegido] = useState<number | null>(null);
  const total = 7;
  const centro = (total - 1) / 2;

  function elegir(i: number) {
    if (!activo || indiceElegido !== null) return;
    setIndiceElegido(i);
    onElegir();
  }

  return (
    <div
      className={`absolute inset-x-0 bottom-0 flex items-end justify-center transition-all duration-700 ${
        activo ? "opacity-100 blur-0 z-20" : "opacity-60 blur-[4px] z-0"
      }`}
      style={{ height: "180px" }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const offset = i - centro;
        const angulo = offset * 11;
        const desplazX = offset * 34;
        const desplazY = Math.abs(offset) * 10;
        const elegida = indiceElegido === i;
        const otraElegida = indiceElegido !== null && !elegida;

        return (
          <button
            key={i}
            onClick={() => elegir(i)}
            disabled={!activo || indiceElegido !== null}
            className={`absolute bottom-0 rounded-lg border shadow-lg transition-all duration-500 flex items-center justify-center ${
              activo ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{
              width: "70px",
              height: "112px",
              transform: elegida
                ? "translate(0px, -30px) rotate(0deg) scale(1.3)"
                : `translate(${desplazX}px, ${desplazY}px) rotate(${angulo}deg)`,
              opacity: otraElegida ? 0.2 : 1,
              background: "repeating-linear-gradient(45deg, #5b2a7a, #5b2a7a 6px, #7a3ea3 6px, #7a3ea3 12px)",
              borderColor: "rgba(230,196,118,0.8)",
              boxShadow: "0 0 14px rgba(201,162,75,0.3)",
              zIndex: elegida ? 30 : i,
            }}
          >
            <span className={`text-[#c9a24b] text-xl ${elegida && cargando ? "animate-spin" : ""}`}>
              ✦
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function SeccionTarot() {
  const [carta, setCarta] = useState<{ nombre: string; pista: string; resto: string } | null>(null);
  const [cargando, setCargando] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [mostrarAbanico, setMostrarAbanico] = useState(false);

  async function sacarCarta() {
    setCargando(true);
    setCarta(null);

    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pregunta }),
      });
      const data = await res.json();
      if (data.nombre) {
        setCarta({ nombre: data.nombre, pista: data.pista ?? "", resto: data.resto ?? "" });
      }
    } catch {
      setCarta({ nombre: "Error", pista: "No pudimos consultar las cartas. Intenta de nuevo.", resto: "" });
    } finally {
      setCargando(false);
    }
  }

  return (
    <section
      className="relative overflow-hidden px-6 flex items-end justify-center pb-14"
      style={{
        background: "radial-gradient(circle at 50% 15%, #3d0f2a 0%, #2a0a1a 35%, #1a0505 75%)",
        minHeight: "680px",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#1a0505] to-transparent" />

      <AbanicoCartas activo={mostrarAbanico && !carta} onElegir={sacarCarta} cargando={cargando} />

      {!carta && !mostrarAbanico && (
        <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-5 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xl text-[#c9a24b]">✦</span>
            <h2
              className="text-3xl leading-tight text-[#f0d78c]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              ¡Pregunta<br />lo que sea!
            </h2>
            <p className="max-w-xs text-xs text-[#f5e6d3]/60">
              Concéntrate en tu pregunta y deja que las cartas te guíen
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[#c9a24b]/70">
              Guiado por la sabiduría del Maestro Juan Santiago
            </p>
          </div>

          <div className="flex items-center gap-2 text-[#c9a24b]/50 text-sm">
            <span>🌘</span>
            <span>🌗</span>
            <span>🌑</span>
            <span>🌓</span>
            <span>🌒</span>
          </div>

          <div className="w-full">
            <textarea
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value.slice(0, 150))}
              placeholder="Escriba su pregunta aquí..."
              rows={2}
              className="w-full resize-none rounded-2xl border border-[#c9a24b]/40 bg-[#1a0505]/70 px-5 py-4 text-sm text-[#f5e6d3] placeholder:text-[#f5e6d3]/40 shadow-inner focus:outline-none focus:border-[#c9a24b]"
            />
            <p className="mt-1 text-right text-[10px] text-[#f5e6d3]/40">{pregunta.length}/150</p>
          </div>

          <button
            onClick={() => setMostrarAbanico(true)}
            className="w-full rounded-full border-2 border-[#c9a24b] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#f0d78c] transition hover:bg-[#c9a24b]/10"
          >
            Elegir carta
          </button>
        </div>
      )}

      {!carta && mostrarAbanico && (
        <p className="relative z-10 mb-40 text-sm text-[#f5e6d3]/70">
          Toca una carta cuando estés listo
        </p>
      )}

      {carta && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-[#c9a24b]/40 bg-gradient-to-b from-[#3d0f1a] to-[#2a0a12] p-7 text-center max-h-[85%] overflow-y-auto shadow-2xl">
            <button
              onClick={() => { setCarta(null); setMostrarAbanico(false); }}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a0505]/60 text-[#f5e6d3]/70 hover:text-[#f5e6d3] transition"
            >
              ✕
            </button>

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a24b]/50 bg-[#c9a24b]/10 text-2xl">
              🃏
            </div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#c9a24b]/70">
              Carta revelada
            </p>
            <h3
              className="mb-4 text-2xl text-[#f0d78c]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {carta.nombre}
            </h3>

            <div className="h-[1px] w-16 mx-auto mb-4 bg-[#c9a24b]/40" />

            <p className="text-[#f5e6d3]/90 leading-relaxed text-[15px] mb-3">
              {carta.pista}
            </p>

            {carta.resto && (
              <div className="relative mb-2">
                <p
                  className="text-[#f5e6d3]/90 leading-relaxed select-none text-[15px]"
                  style={{ filter: "blur(5px)" }}
                >
                  {carta.resto}
                </p>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="rounded-full bg-[#1a0505]/90 px-4 py-2 text-xs font-semibold text-[#f0d78c] border border-[#c9a24b]/40">
                    🔒 Contacta al Maestro para más
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-[#c9a24b]/25 bg-[#1a0505]/40 p-4">
              <p className="text-sm text-[#c9a24b] mb-3">
                ¿Qué significa esta carta para tu situación de amor?
              </p>
              <a
                href={`https://wa.me/59175928656?text=${encodeURIComponent(
                  pregunta.trim()
                    ? `Hola Maestro Juan Santiago, mi pregunta era: "${pregunta.trim()}". Saqué la carta "${carta.nombre}" en el Tarot de la web y quiero saber qué significa para mi situación`
                    : `Hola Maestro Juan Santiago, saqué la carta "${carta.nombre}" en el Tarot de la web y quiero saber qué significa para mi situación`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2ee862] to-[#1fb851] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.55)] transition-shadow"
              >
                <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white shrink-0">
                  <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
                </svg>
                Hablar con el Maestro
              </a>
            </div>

            <button
              onClick={() => { setCarta(null); setMostrarAbanico(false); }}
              className="mt-4 text-xs text-[#f5e6d3]/50 underline"
            >
              Sacar otra carta
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
