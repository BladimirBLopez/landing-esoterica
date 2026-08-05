"use client";

import { useState } from "react";

interface FloatingWhatsAppProps {
  numero: string;
  mensaje: string;
  nombre?: string;
}

export default function FloatingWhatsApp({
  numero,
  mensaje,
  nombre = "Maestro Juan Santiago",
}: FloatingWhatsAppProps) {
  const [abierto, setAbierto] = useState(false);
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {abierto && (
        <div className="w-80 overflow-hidden rounded-2xl shadow-2xl">
          {/* Header estilo WhatsApp */}
          <div className="flex items-center gap-3 bg-[#075e54] px-3 py-3">
            <button onClick={() => setAbierto(false)} aria-label="Cerrar" className="text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a24b] text-sm font-bold text-[#1a0505]">
              MJ
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">{nombre}</span>
              <span className="text-xs text-white/70">en línea</span>
            </div>
            <div className="ml-auto flex items-center gap-4 text-white/90">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/></svg>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.01l-2.2 2.21z"/></svg>
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z"/></svg>
            </div>
          </div>

          {/* Fondo de chat con la burbuja */}
          <div
            className="px-4 py-5"
            style={{
              backgroundColor: "#e5ddd5",
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(0,0,0,0.03) 1px, transparent 1px), radial-gradient(circle at 60% 70%, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div className="relative max-w-[85%] rounded-lg rounded-tl-none bg-white p-3 text-sm leading-relaxed text-gray-800 shadow">
              <div className="whitespace-pre-line">{mensaje}</div>
              <div className="mt-1 flex justify-end text-[10px] text-gray-400">
                {new Date().toLocaleTimeString("es-BO", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <span className="absolute -left-[7px] top-0 h-0 w-0 border-b-[10px] border-r-[10px] border-b-transparent border-r-white" />
            </div>
          </div>

          {/* Input simulado que lleva al chat real */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#f0f0f0] px-3 py-3"
          >
            <span className="flex-1 truncate rounded-full bg-white px-4 py-2 text-sm text-gray-400 shadow-inner">
              Escribe un mensaje
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
            </span>
          </a>
        </div>
      )}

      <button
        onClick={() => setAbierto(!abierto)}
        aria-label="Abrir WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] shadow-lg transition-transform hover:scale-105 hover:bg-[#1fb855]"
      >
        {!abierto && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            1
          </span>
        )}
        <svg viewBox="0 0 32 32" className="h-9 w-9 fill-white">
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.7 4.605 1.906 6.47L4 29l7.72-1.87A11.94 11.94 0 0 0 16.001 27C22.63 27 28 21.627 28 15S22.63 3 16.001 3zm0 21.6a9.55 9.55 0 0 1-4.87-1.33l-.35-.21-4.58 1.11 1.13-4.46-.23-.36A9.56 9.56 0 1 1 16.001 24.6z"/>
        </svg>
      </button>
    </div>
  );
}
