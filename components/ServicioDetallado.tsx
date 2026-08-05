"use client";

import { useState } from "react";
import Image from "next/image";
import WhatsAppButton from "./WhatsAppButton";

interface ServicioDetalladoProps {
  icono: string;
  titulo: string;
  descripcion: string;
  detalleExtra?: string;
  duracion: string;
  imagen: string;
  numero: string;
  mensaje: string;
  cta: string;
  invertido?: boolean;
}

export default function ServicioDetallado({
  icono,
  titulo,
  descripcion,
  detalleExtra,
  duracion,
  imagen,
  numero,
  mensaje,
  cta,
  invertido = false,
}: ServicioDetalladoProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div
      className={`flex flex-col items-center gap-6 sm:flex-row ${
        invertido ? "sm:flex-row-reverse" : ""
      }`}
    >
      <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-[#c9a24b]/20 shadow-lg sm:w-1/2">
        <Image src={imagen} alt={titulo} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505]/60 to-transparent" />
      </div>
      <div className="flex flex-col gap-3 text-center sm:w-1/2 sm:text-left">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="text-3xl">{icono}</span>
          <h3 className="text-2xl font-bold text-[#c9a24b]">{titulo}</h3>
        </div>
        <p className="text-[#f5e6d3]/80">{descripcion}</p>

        <span className="inline-block w-fit self-center rounded-full border border-[#c9a24b]/40 px-3 py-1 text-xs text-[#c9a24b] sm:self-start">
          ⏳ Resultados en {duracion}
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
              className="w-fit self-center text-sm text-[#c9a24b] underline sm:self-start"
            >
              {abierto ? "Ver menos" : "Ver más detalles"}
            </button>
          </>
        )}

        <div className="mt-2 flex flex-col items-center gap-1 sm:items-start">
          <WhatsAppButton numero={numero} mensaje={mensaje} texto={cta} />
          <span className="text-sm text-[#f5e6d3]/60">(+591) 75928656</span>
        </div>
      </div>
    </div>
  );
}
