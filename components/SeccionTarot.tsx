"use client";

import { useState } from "react";

export default function SeccionTarot() {
  const [carta, setCarta] = useState<{ nombre: string; pista: string; resto: string } | null>(null);
  const [cargando, setCargando] = useState(false);

  async function sacarCarta() {
    setCargando(true);
    setCarta(null);

    try {
      const res = await fetch("/api/tarot");
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#1a0505] to-[#2e0a1c] px-6 py-16 text-center">
      <div className="relative z-10 mx-auto mb-6 flex items-center justify-center gap-2 text-[#c9a24b]">
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
        <span>🔮</span>
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
      </div>
      <h2
        className="mb-2 text-4xl font-bold text-white"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Saca una Carta del Tarot
      </h2>
      <p className="mb-8 text-sm text-[#f5e6d3]/70">
        Deja que el Tarot revele una señal sobre tu situación de amor
      </p>

      {!carta && (
        <button
          onClick={sacarCarta}
          disabled={cargando}
          className="rounded-full bg-gradient-to-b from-[#e6c476] to-[#c9a24b] px-8 py-3 text-sm font-bold text-[#1a0505] shadow-lg disabled:opacity-60"
        >
          {cargando ? "Barajando las cartas..." : "🃏 Sacar una carta"}
        </button>
      )}

      {carta && (
        <div className="mx-auto max-w-xl rounded-2xl border border-[#c9a24b]/30 bg-[#3d0f1a] p-6">
          <h3
            className="mb-3 text-2xl text-[#f0d78c]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {carta.nombre}
          </h3>

          <p className="text-[#f5e6d3]/90 leading-relaxed mb-3">
            {carta.pista}
          </p>

          {carta.resto && (
            <div className="relative">
              <p
                className="text-[#f5e6d3]/90 leading-relaxed select-none"
                style={{ filter: "blur(5px)" }}
              >
                {carta.resto}
              </p>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-full bg-[#1a0505]/80 px-4 py-2 text-sm font-semibold text-[#f0d78c] border border-[#c9a24b]/40">
                  🔒 Para más información contacta al Maestro
                </p>
              </div>
            </div>
          )}

          <a
            href={`https://wa.me/59175928656?text=${encodeURIComponent(
              `Hola Maestro Juan Santiago, saqué la carta "${carta.nombre}" en el Tarot de la web y quiero saber qué significa para mi situación`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
          >
            💬 Hablar con el Maestro
          </a>

          <button
            onClick={() => setCarta(null)}
            className="mt-3 block mx-auto text-xs text-[#f5e6d3]/50 underline"
          >
            Sacar otra carta
          </button>
        </div>
      )}
    </section>
  );
}
