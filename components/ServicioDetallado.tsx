"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioDetalladoProps {
  titulo: string;
  descripcion: string;
  detalleExtra?: string;
  duracion: string;
  imagen: string;
  numero: string;
  mensaje: string;
  cta: string;
}

export default function ServicioDetallado({
  titulo,
  descripcion,
  detalleExtra,
  duracion,
  imagen,
  numero,
  mensaje,
  cta,
}: ServicioDetalladoProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#c9a24b]/20 shadow-xl">
      {/* Imagen con título superpuesto */}
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

      {/* Bloque de contenido */}
      <div className="flex flex-col items-center gap-4 bg-[#3d1414] px-6 py-8 text-center">
        <p className="text-[#f5e6d3]/90">{descripcion}</p>

        <span className="rounded-full border border-[#c9a24b]/40 px-4 py-1 text-xs text-[#c9a24b]">
          Resultados en {duracion}
        </span>

        {detalleExtra && (
          <>
            {abierto && (
              <p className="rounded-lg bg-[#2b0d0d] p-4 text-sm text-[#f5e6d3]/70">
                {detalleExtra}
              </p>
            )}
            <button
              onClick={() => setAbierto(!abierto)}
              className="text-sm text-[#c9a24b] underline"
            >
              {abierto ? "Ver menos" : "Ver más detalles"}
            </button>
          </>
        )}

        <div className="relative mt-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-40" />
          <WhatsAppButton
            numero={numero}
            mensaje={mensaje}
            texto={cta}
            className="relative text-base px-8 py-3"
          />
        </div>
        <p className="text-xs text-[#f5e6d3]/60">
          Toca para consultar directo por WhatsApp
        </p>
      </div>
    </div>
  );
}
