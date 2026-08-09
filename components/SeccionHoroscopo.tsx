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

  const signoInfo = SIGNOS.find((s) => s.valor === signoSeleccionado);

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
      className="relative overflow-hidden px-6"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(46,10,28,0.35), rgba(26,5,5,0.55)), url(https://res.cloudinary.com/dkq95jus0/image/upload/fon-horoscopo)",
        backgroundSize: "cover",
        backgroundPosition: "center -5%",
        height: "820px",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/60 to-transparent" />
      <div className="h-[560px]" />

      <div className="relative mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
        {SIGNOS.map((s) => (
          <button
            key={s.valor}
            onClick={() => elegirSigno(s.valor)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 transition ${
              signoSeleccionado === s.valor
                ? "border-[#c9a24b] bg-[#c9a24b]/10"
                : "border-[#8b5cf6]/30 bg-[#2a1a4a]/60 hover:bg-[#3a2560]/70"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] text-[#f5e6d3]/80">{s.label}</span>
          </button>
        ))}
      </div>

      {signoSeleccionado && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl border border-[#c9a24b]/40 bg-gradient-to-b from-[#3d0f1a] to-[#2a0a12] p-7 text-center max-h-[85%] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSignoSeleccionado(null)}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a0505]/60 text-[#f5e6d3]/70 hover:text-[#f5e6d3] transition"
            >
              ✕
            </button>

            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#c9a24b]/50 bg-[#c9a24b]/10 text-3xl">
              {signoInfo?.emoji}
            </div>
            <h3
              className="mb-1 text-xl text-[#f0d78c]"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {signoInfo?.label}
            </h3>
            <p className="mb-4 text-[10px] uppercase tracking-widest text-[#c9a24b]/70">
              Horóscopo de hoy
            </p>

            {cargando ? (
              <p className="text-sm text-[#f5e6d3]/60 py-6">Consultando los astros...</p>
            ) : (
              <>
                <div className="h-[1px] w-16 mx-auto mb-4 bg-[#c9a24b]/40" />
                <p className="text-[#f5e6d3]/90 leading-relaxed text-[15px]">{texto}</p>

                <div className="mt-6 rounded-xl border border-[#c9a24b]/25 bg-[#1a0505]/40 p-4">
                  <p className="text-sm text-[#c9a24b] mb-3">
                    ¿Quieres saber qué dicen las cartas sobre tu situación de amor?
                  </p>
                  <a
                    href={`https://wa.me/59175928656?text=${encodeURIComponent("Hola Maestro Juan Santiago, vi mi horóscopo y quiero saber más sobre mi situación de amor")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-semibold text-white shadow-lg"
                  >
                    💬 Hablar con el Maestro
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
