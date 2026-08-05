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
  telefonoVisible: string;
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
  telefonoVisible,
}: ServicioDetalladoProps) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-[#c9a24b]/20 shadow-xl">
      {/* Título arriba de la imagen */}
      <div className="bg-[#3d1414] px-6 pb-4 pt-8 text-center">
        <div className="mb-2 text-4xl">{icono}</div>
        <h3 className="text-2xl font-bold uppercase tracking-wide text-[#c9a24b]">
          {titulo}
        </h3>
        <div className="mx-auto mt-3 h-[2px] w-16 bg-[#c9a24b]/60" />
      </div>

      {/* Imagen grande */}
      <div className="relative h-72 w-full">
        <Image src={imagen} alt={titulo} fill className="object-cover" />
      </div>

      {/* Bloque de contenido */}
      <div className="flex flex-col items-center gap-4 bg-[#3d1414] px-6 py-8 text-center">
        <p className="text-[#f5e6d3]/90">{descripcion}</p>

        <span className="rounded-full border border-[#c9a24b]/40 px-4 py-1 text-xs text-[#c9a24b]">
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
        <p className="text-lg font-bold text-[#f5e6d3]">{telefonoVisible}</p>
      </div>
    </div>
  );
}
