"use client";

import { useState, useEffect } from "react";

const CLAVE_SIGNOS_VISTOS = "horoscopo_signos_vistos";
const LIMITE_GRATIS = 3;

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
  const [signosVistos, setSignosVistos] = useState<string[]>([]);
  const [limiteAlcanzado, setLimiteAlcanzado] = useState(false);

  useEffect(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem(CLAVE_SIGNOS_VISTOS) ?? "[]");
      if (Array.isArray(guardados)) setSignosVistos(guardados);
    } catch {}
  }, []);

  const signoInfo = SIGNOS.find((s) => s.valor === signoSeleccionado);

  async function elegirSigno(signo: string) {
    setSignoSeleccionado(signo);

    const yaVisto = signosVistos.includes(signo);
    const alcanzaLimite = !yaVisto && signosVistos.length >= LIMITE_GRATIS;

    if (alcanzaLimite) {
      setLimiteAlcanzado(true);
      return;
    }

    setLimiteAlcanzado(false);
    setCargando(true);
    setTexto("");

    try {
      const res = await fetch(`/api/horoscopo?sign=${signo}`);
      const data = await res.json();
      setTexto(data?.texto ?? "No pudimos cargar el horóscopo. Intenta de nuevo.");

      if (!yaVisto) {
        const actualizados = [...signosVistos, signo];
        setSignosVistos(actualizados);
        localStorage.setItem(CLAVE_SIGNOS_VISTOS, JSON.stringify(actualizados));
      }
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
        backgroundImage: "linear-gradient(to bottom, rgba(46,10,28,0.2), rgba(26,5,5,0.35)), url(https://res.cloudinary.com/dkq95jus0/image/upload/fon-horoscopo)",
        backgroundSize: "cover",
        backgroundPosition: "center 15%",
        minHeight: "620px",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-64 bg-gradient-to-b from-[#1a0505] via-[#1a0505]/50 to-transparent" />
      <div className="h-[380px]" />

      <div className="relative mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6">
        {SIGNOS.map((s) => (
          <button
            key={s.valor}
            onClick={() => elegirSigno(s.valor)}
            className={`flex flex-col items-center gap-1 rounded-xl border p-3 shadow-[0_3px_10px_rgba(0,0,0,0.4)] transition-all duration-150 cursor-pointer active:scale-90 active:shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 hover:shadow-[0_5px_14px_rgba(139,92,246,0.35)] ${
              signoSeleccionado === s.valor
                ? "border-[#c9a24b] bg-[#c9a24b]/10"
                : "border-[#8b5cf6]/40 bg-[#2a1a4a]/70 hover:bg-[#3a2560]/80"
            }`}
          >
            <span className="text-2xl">{s.emoji}</span>
            <span className="text-[10px] text-[#f5e6d3]/80">{s.label}</span>
          </button>
        ))}
      </div>

      <div
        className="relative z-10 mt-8 flex items-center justify-center pb-8 pt-6"
        style={{ background: "linear-gradient(to bottom, transparent, #1a0f30 70%)" }}
      >
        <div className="flex items-center gap-3 opacity-80">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a24b]" />
          <span className="text-xl text-[#c9a24b]" style={{ textShadow: "0 0 12px rgba(201,162,75,0.8)" }}>☽ ✦ ☾</span>
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a24b]" />
        </div>
      </div>

      {signoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-sm">
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

            {limiteAlcanzado ? (
              <>
                <div className="h-[1px] w-16 mx-auto mb-4 bg-[#c9a24b]/40" />
                <p className="text-[#f5e6d3]/90 leading-relaxed text-[15px] mb-2">
                  Ya viste tus {LIMITE_GRATIS} horóscopos gratis de hoy 🌙
                </p>
                <p className="text-[#f5e6d3]/60 text-xs mb-4">
                  Para seguir consultando tu signo y saber qué dicen los astros sobre tu situación de amor, escríbele directo al Maestro.
                </p>

                <div className="mt-2 rounded-xl border border-[#c9a24b]/25 bg-[#1a0505]/40 p-4">
                  <a
                    href={`https://wa.me/59175928656?text=${encodeURIComponent("Hola Maestro Juan Santiago, estuve viendo mi horóscopo y quiero saber más sobre mi situación de amor")}`}
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
              </>
            ) : cargando ? (
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#2ee862] to-[#1fb851] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.55)] transition-shadow"
                  >
                    <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white shrink-0">
                      <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
                    </svg>
                    Hablar con el Maestro
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
