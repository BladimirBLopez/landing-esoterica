"use client";

import { useState } from "react";

const SIGNOS = [
  { valor: "aries", label: "Aries", emoji: "♈" },
  { valor: "taurus", label: "Tauro", emoji: "♉" },
  { valor: "gemini", label: "Géminis", emoji: "♊" },
  { valor: "cancer", label: "Cáncer", emoji: "♋" },
  { valor: "leo", label: "Leo", emoji: "♌" },
  { valor: "virgo", label: "Virgo", emoji: "♍" },
  { valor: "libra", label: "Libra", emoji: "♎" },
  { valor: "scorpio", label: "Escorpio", emoji: "♏" },
  { valor: "sagittarius", label: "Sagitario", emoji: "♐" },
  { valor: "capricorn", label: "Capricornio", emoji: "♑" },
  { valor: "aquarius", label: "Acuario", emoji: "♒" },
  { valor: "pisces", label: "Piscis", emoji: "♓" },
];

export default function SeccionHoroscopo() {
  const [signoSeleccionado, setSignoSeleccionado] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);

  async function elegirSigno(signo: string) {
    setSignoSeleccionado(signo);
    setCargando(true);
    setTexto("");

    try {
      const res = await fetch(`/api/horoscopo?sign=${signo}`);
      const data = await res.json();
      setTexto(data?.texto ?? "No pudimos cargar el horóscopo. Intenta de nuevo.");
    } catch {
      setTexto("No pudimos cargar el horóscopo. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#2e0a1c] to-[#1a0505] px-6 py-16">
      <div className="relative z-10 mx-auto mb-8 flex items-center justify-center gap-2 text-[#c9a24b]">
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
        <span>✦</span>
        <span className="h-[1px] w-10 bg-[#c9a24b]/60" />
      </div>
      <h2
        className="mb-2 text-center text-4xl font-bold text-white"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Horóscopo del Día
      </h2>
      <p className="mb-8 text-center text-sm text-[#f5e6d3]/70">
        Elige tu signo y descubre qué dicen los astros hoy
      </p>

      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
        {SIGNOS.map((s) => (
          <button
            key={s.valor}
            onClick={() => elegirSigno(s.valor)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
              signoSeleccionado === s.valor
                ? "border-[#c9a24b] bg-[#c9a24b]/10"
                : "border-[#c9a24b]/20 bg-[#3d0f1a] hover:bg-[#4a0916]"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] text-[#f5e6d3]/80">{s.label}</span>
          </button>
        ))}
      </div>

      {signoSeleccionado && (
        <div className="mx-auto mt-6 max-w-xl rounded-2xl border border-[#c9a24b]/30 bg-[#3d0f1a] p-6 text-center">
          {cargando ? (
            <p className="text-sm text-[#f5e6d3]/60">Consultando los astros...</p>
          ) : (
            <p className="text-[#f5e6d3]/90 leading-relaxed">{texto}</p>
          )}
        </div>
      )}
    </section>
  );
}
