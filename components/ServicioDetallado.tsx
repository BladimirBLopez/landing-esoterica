"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioDetalladoProps {
  titulo: string;
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
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#c9a24b]/20 shadow-xl">
      <div className="relative h-72 w-full">
        <Image src={imagen} alt={titulo} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <h3 className="text-3xl font-bold uppercase tracking-wide text-[#c9a24b] drop-shadow-lg">
            {titulo}
          </h3>
          <div className="h-[2px] w-16 bg-[#c9a24b]/80" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 px-6 py-8 text-center" style={{ backgroundColor: colorFondo }}>
        <p className="text-[#f5e6d3]/90">{descripcion}</p>

        <span className="rounded-full border border-[#c9a24b]/40 px-4 py-1 text-xs text-[#c9a24b]">
          Resultados en {duracion}
        </span>

        {tieneDetalle && (
          <>
            {abierto && (
              <div className="w-full rounded-lg bg-[#2b0d0d] p-5 text-left text-sm text-[#f5e6d3]/80">
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
              className="text-sm text-[#c9a24b] underline"
            >
              {abierto ? "Ver menos" : "Ver más detalles"}
            </button>
          </>
        )}

        <WhatsAppButton
          numero={numero}
          mensaje={mensaje}
          texto={cta}
          className="mt-2 text-base px-8 py-3"
        />
        <p className="text-xs text-[#f5e6d3]/60">
          Toca para consultar directo por WhatsApp
        </p>
      </div>
    </div>
  );
}
