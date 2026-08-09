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
    <section
      className="relative overflow-hidden px-6 flex items-end justify-center pb-14"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(26,5,5,0.45), rgba(26,5,5,0.75)), url(https://res.cloudinary.com/dkq95jus0/image/upload/fon-tarot)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "600px",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-[#1a0505] to-transparent" />

      {!carta && (
        <button
          onClick={sacarCarta}
          disabled={cargando}
          className="relative z-10 rounded-full bg-gradient-to-b from-[#e6c476] to-[#c9a24b] px-8 py-3 text-sm font-bold text-[#1a0505] shadow-lg disabled:opacity-60"
        >
          {cargando ? "Barajando las cartas..." : "🃏 Sacar una carta"}
        </button>
      )}

      {carta && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-[#c9a24b]/40 bg-gradient-to-b from-[#3d0f1a] to-[#2a0a12] p-7 text-center max-h-[85%] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setCarta(null)}
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
                  `Hola Maestro Juan Santiago, saqué la carta "${carta.nombre}" en el Tarot de la web y quiero saber qué significa para mi situación`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
              >
                💬 Hablar con el Maestro
              </a>
            </div>

            <button
              onClick={() => setCarta(null)}
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
