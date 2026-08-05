"use client";

import { useState } from "react";

interface FloatingWhatsAppProps {
  numero: string;
  mensaje: string;
}

export default function FloatingWhatsApp({
  numero,
  mensaje,
}: FloatingWhatsAppProps) {
  const [abierto, setAbierto] = useState(false);
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {abierto && (
        <div className="flex w-[90vw] max-w-md flex-col overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2 bg-[#25d366] px-4 py-4">
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-white">
              <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
            </svg>
            <span className="text-lg font-semibold text-white">WhatsApp</span>
            <button
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="ml-auto flex h-7 w-7 items-center justify-center rounded-full text-white/90 hover:bg-white/10"
            >
              ✕
            </button>
          </div>
          <div className="max-h-[45vh] overflow-y-auto bg-[#f0f0f0] px-4 py-5">
            <div className="relative rounded-2xl rounded-tl-none bg-white p-4 text-sm leading-relaxed text-gray-800 shadow-sm">
              <div className="whitespace-pre-line">{mensaje}</div>
            </div>
          </div>
          <div className="bg-[#f0f0f0] px-4 pb-4">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25d366] py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#1fb855]"
            >
              Escríbeme ahora
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
              </svg>
            </a>
          </div>
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
          <path d="M16.04 3C9.37 3 3.98 8.39 3.98 15.06c0 2.24.6 4.34 1.65 6.15L3 29l7.98-2.6a12.03 12.03 0 0 0 5.06 1.11h.01c6.67 0 12.06-5.39 12.06-12.06C28.11 8.79 22.71 3 16.04 3zm0 21.9h-.01a10 10 0 0 1-5.12-1.4l-.37-.22-3.8 1.24 1.26-3.71-.24-.38a9.9 9.9 0 0 1-1.52-5.27C6.24 9.5 10.7 5.04 16.05 5.04c2.63 0 5.1 1.03 6.96 2.9a9.78 9.78 0 0 1 2.88 6.96c0 5.35-4.46 9.8-9.85 9.8zm5.4-7.34c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.05 1.02-1.05 2.5 1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/>
        </svg>
      </button>
    </div>
  );
}
