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
        <div
          className="flex w-[90vw] max-w-md flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
        >
          <div className="flex items-center gap-2 bg-[#25d366] px-4 py-4">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
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
            <div
              className="relative rounded-2xl rounded-tl-none bg-white p-4 text-sm leading-relaxed text-gray-800 shadow-sm"
              style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
            >
              <span className="absolute -left-2 top-0 h-0 w-0 border-t-[10px] border-r-[10px] border-t-white border-r-transparent" />
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

      {!abierto && (
        <button
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir WhatsApp"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366] shadow-lg transition-transform hover:scale-105 hover:bg-[#1fb855]"
          style={{ animation: "rebote-whatsapp 3s ease-in-out infinite" }}
        >
          <span className="absolute -right-1 -top-1 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            1
          </span>
          <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
          </svg>
        </button>
      )}
    </div>
  );
}
