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
    <section
      className="relative overflow-hidden px-6 py-16"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(46,10,28,0.85), rgba(26,5,5,0.9)), url(https://res.cloudinary.com/dkq95jus0/image/upload/fon-horoscopo)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-64" />

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
            <>
              <p className="text-[#f5e6d3]/90 leading-relaxed">{texto}</p>
              <p className="mt-4 text-sm text-[#c9a24b]">
                ¿Quieres saber qué dicen las cartas sobre tu situación de amor?
              </p>
              <a
                href={`https://wa.me/59175928656?text=${encodeURIComponent("Hola Maestro Juan Santiago, vi mi horóscopo y quiero saber más sobre mi situación de amor")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white"
              >
                💬 Hablar con el Maestro
              </a>
            </>
          )}
        </div>
      )}
    </section>
  );
}
