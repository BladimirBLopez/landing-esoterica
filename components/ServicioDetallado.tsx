"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioDetalladoProps {
  titulo: string;
  icono?: string;
  descripcion: string;
  beneficios?: string[];
  incluyeTitulo?: string;
  incluye?: string[];
  notaFinal?: string;
  duracion: string;
  imagen: string;
  numero: string;
  mensaje: string;
  cta: string;
  colorFondo?: string;
}

export default function ServicioDetallado({
  titulo,
  icono,
  descripcion,
  beneficios,
  incluyeTitulo,
  incluye,
  notaFinal,
  duracion,
  imagen,
  numero,
  mensaje,
  cta,
  colorFondo = "#3d1414",
}: ServicioDetalladoProps) {
  const [abierto, setAbierto] = useState(false);
  const tieneDetalle = beneficios && beneficios.length > 0;

  return (
    <div className="group relative mx-auto w-full max-w-xl transition-transform duration-300 hover:-translate-y-1">
      {/* Resplandor detras */}
      <div className="absolute -inset-3 rounded-[32px] bg-[#c9a24b]/25 blur-2xl transition-opacity duration-300 group-hover:opacity-80" />

      {/* Marco degradado dorado */}
      <div className="relative rounded-[28px] bg-gradient-to-br from-[#f0d78c] via-[#c9a24b] to-[#8a651f] p-[3px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-[25px]">
          {/* Imagen con titulo */}
          <div className="relative aspect-video w-full">
            <Image src={imagen} alt={titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            {icono && (
              <span className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#c9a24b] bg-[#1a0505]/80 text-2xl shadow-lg">
                {icono}
              </span>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <h3 className="text-4xl font-bold uppercase tracking-wide text-white drop-shadow-lg">
                {titulo}
              </h3>
              <div className="h-[2px] w-16 bg-[#c9a24b]" />
            </div>
          </div>

          {/* Joyero decorativo entre imagen y contenido */}
          <div className="relative flex justify-center" style={{ backgroundColor: colorFondo }}>
            <span className="absolute -top-3 flex h-6 w-6 rotate-45 items-center justify-center bg-gradient-to-br from-[#f0d78c] to-[#8a651f] shadow-md">
              <span className="-rotate-45 text-[10px] text-[#1a0505]">✦</span>
            </span>
          </div>

          {/* Contenido */}
          <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-6 text-center" style={{ backgroundColor: colorFondo }}>
            <p className="leading-relaxed text-[#f5e6d3]/90">{descripcion}</p>

            <span className="rounded-full border-2 border-red-500 bg-red-500/10 px-4 py-1 text-sm font-bold text-red-400">
              Resultados en {duracion}
            </span>

            {tieneDetalle && (
              <>
                {abierto && (
                  <div className="w-full rounded-lg bg-black/30 p-5 text-left text-sm text-[#f5e6d3]/80">
                    <ul className="flex flex-col gap-2">
                      {beneficios!.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-[#c9a24b]">✦</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {incluye && incluye.length > 0 && (
                      <>
                        <p className="mt-4 mb-2 font-semibold text-[#c9a24b]">
                          {incluyeTitulo || "¿Qué incluye el trabajo?"}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {incluye.map((i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-[#c9a24b]">✦</span>
                              <span>{i}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {notaFinal && (
                      <p className="mt-4 border-t border-[#c9a24b]/20 pt-4 text-xs italic text-[#f5e6d3]/60">
                        {notaFinal}
                      </p>
                    )}
                  </div>
                )}
                <button
                  onClick={() => setAbierto(!abierto)}
                  className="rounded-full border border-[#c9a24b]/50 px-5 py-1.5 text-sm text-[#c9a24b] transition-colors hover:bg-[#c9a24b]/10"
                >
                  {abierto ? "Ver menos" : "Ver más detalles"}
                </button>
              </>
            )}

            <div className="mt-2 h-px w-16 bg-[#c9a24b]/30" />

            <WhatsAppButton
              numero={numero}
              mensaje={mensaje}
              texto={cta}
              className="text-base px-8 py-3"
            />
            <p className="text-xs text-[#f5e6d3]/60">
              Toca para consultar directo por WhatsApp
            </p>
          </div>
        </div>
      </div>

      {/* Destellos decorativos en las esquinas */}
      <span className="absolute -left-2 -top-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">✦</span>
      <span className="absolute -right-2 -top-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">✦</span>
      <span className="absolute -bottom-2 -left-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">✦</span>
      <span className="absolute -bottom-2 -right-2 text-xl text-[#f0d78c] drop-shadow-[0_0_6px_rgba(240,215,140,0.9)]">✦</span>
    </div>
  );
}
