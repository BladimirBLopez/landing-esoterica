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
        <div className="w-72 overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex items-center justify-between bg-green-600 px-4 py-3">
            <span className="font-semibold text-white">WhatsApp</span>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="text-white/90 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="bg-[#f5e6d3] px-4 py-4">
            <div className="rounded-xl rounded-tl-none bg-white p-3 text-sm text-gray-800 shadow">
              Hola, soy {nombre} 🙏
              <br />
              <br />
              Estoy aquí para escuchar tu caso y brindarte orientación
              personalizada y totalmente confidencial.
              <br />
              <br />
              Cuéntame: ¿quieres recuperar a tu ex, fortalecer tu relación o
              necesitas un amarre de amor?
            </div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
            >
              Escríbeme ahora
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setAbierto(!abierto)}
        aria-label="Abrir WhatsApp"
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-600 shadow-lg transition-transform hover:scale-105 hover:bg-green-700"
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
